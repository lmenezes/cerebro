package server

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/RitterHou/cerebro/internal/es"
	"github.com/RitterHou/cerebro/internal/jsonx"
)

// missingParamError 对应 MissingRequiredParamException。
type missingParamError struct{ name string }

func (e missingParamError) Error() string { return "Missing required parameter " + e.name }

// requestFailedError 对应 RequestFailedException：多个 ES 请求里有一个失败。
type requestFailedError struct {
	url    string
	status int
}

func (e requestFailedError) Error() string { return "Failure for [" + e.url + "]" }

// cerebroRequest 对应 CerebroRequest：前端 POST 的 JSON body 加上解析好的目标集群。
type cerebroRequest struct {
	body     *jsonx.Object
	target   *es.Target
	user     string // 未开启登录时为空
	readOnly bool
	hostName string
}

func (r *cerebroRequest) get(name string) (string, error) {
	if s, ok := jsonx.StringAt(r.body, name); ok {
		return s, nil
	}
	return "", missingParamError{name}
}

func (r *cerebroRequest) getOpt(name string) *string {
	if s, ok := jsonx.StringAt(r.body, name); ok {
		return &s
	}
	return nil
}

func (r *cerebroRequest) getInt(name string) (int64, error) {
	if i, ok := jsonx.Int64(jsonx.At(r.body, name)); ok && i >= -1<<31 && i < 1<<31 {
		return i, nil
	}
	return 0, missingParamError{name}
}

func (r *cerebroRequest) getBool(name string) (bool, error) {
	if b, ok := jsonx.At(r.body, name).(bool); ok {
		return b, nil
	}
	return false, missingParamError{name}
}

func (r *cerebroRequest) getObj(name string) (*jsonx.Object, error) {
	if o := jsonx.ObjectAt(r.body, name); o != nil {
		return o, nil
	}
	return nil, missingParamError{name}
}

// getAny 对应 getObjOpt：任意 JSON 值，键不存在时 ok 为 false。
func (r *cerebroRequest) getAny(name string) (any, bool) {
	return r.body.Get(name)
}

// getStringArrayJoined 对应 getAsStringArray(...).map(_.mkString(","))。
func (r *cerebroRequest) getStringArrayJoined(name string) *string {
	arr, ok := jsonx.ArrayAt(r.body, name)
	if !ok {
		return nil
	}
	parts := make([]string, 0, len(arr))
	for _, v := range arr {
		s, ok := v.(string)
		if !ok {
			return nil
		}
		parts = append(parts, s)
	}
	joined := strings.Join(parts, ",")
	return &joined
}

const maxBodyBytes = 32 << 20

var errNotJSON = errors.New("expecting a JSON request body")

// parseBody 读取 JSON 对象 body；和 Play 的 parse.json 一样要求 JSON 内容类型（顺带防 CSRF）。
func parseBody(w http.ResponseWriter, r *http.Request) (*jsonx.Object, error) {
	ct := strings.ToLower(r.Header.Get("Content-Type"))
	if !strings.HasPrefix(ct, "application/json") && !strings.HasPrefix(ct, "text/json") {
		return nil, errNotJSON
	}
	data, err := readAll(http.MaxBytesReader(w, r.Body, maxBodyBytes))
	if err != nil {
		return nil, err
	}
	v, err := jsonx.Parse(data)
	if err != nil {
		return nil, fmt.Errorf("invalid JSON: %w", err)
	}
	obj, ok := v.(*jsonx.Object)
	if !ok {
		return nil, errors.New("expecting a JSON object")
	}
	return obj, nil
}

// resolveTarget 对应 CerebroRequest.apply：按名字找预设集群，找不到就把 host 当地址。
func (s *Server) resolveTarget(body *jsonx.Object, r *http.Request) (*es.Target, string, bool, error) {
	hostName, ok := jsonx.StringAt(body, "host")
	if !ok {
		return nil, "", false, missingParamError{"host"}
	}
	reqAuth := es.FromRequest(optString(body, "username"), optString(body, "password"))
	if h, ok := s.hosts[hostName]; ok {
		t := &es.Target{URL: h.url, Auth: h.auth, TLS: h.tls}
		if t.Auth.Empty() {
			t.Auth = reqAuth
		}
		if len(h.headersWhitelist) > 0 {
			t.Headers = http.Header{}
			for _, name := range h.headersWhitelist {
				if v := r.Header.Values(name); len(v) > 0 {
					t.Headers[http.CanonicalHeaderKey(name)] = v
				}
			}
		}
		return t, hostName, s.cfg.ReadOnly || h.readOnly, nil
	}
	return &es.Target{URL: hostName, Auth: reqAuth, TLS: s.defaultTLS}, hostName, s.cfg.ReadOnly, nil
}

func optString(o *jsonx.Object, k string) *string {
	if s, ok := jsonx.StringAt(o, k); ok {
		return &s
	}
	return nil
}

// cerebroResponse 对应 CerebroResponse：HTTP 200，真实状态放在 body.status。
func cerebroResponse(w http.ResponseWriter, status int, body any) {
	writeJSON(w, http.StatusOK, jsonx.Obj("status", jsonx.Num(int64(status)), "body", body))
}

func writeJSON(w http.ResponseWriter, httpStatus int, v any) {
	data, err := jsonx.Marshal(v)
	if err != nil {
		httpStatus = http.StatusInternalServerError
		data, _ = json.Marshal(map[string]string{"error": err.Error()})
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-store")
	w.WriteHeader(httpStatus)
	_, _ = w.Write(data)
}

func errorBody(msg string) any { return jsonx.Obj("error", msg) }
