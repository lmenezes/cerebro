package models

import "github.com/RitterHou/cerebro/internal/jsonx"

// NodeRoles 是节点角色。7.10 起 roles 一定存在。
type NodeRoles struct {
	Master, Data, Ingest bool
}

// Coordinating 表示既不是 master、data 也不是 ingest 的节点。
func (r NodeRoles) Coordinating() bool { return !r.Master && !r.Data && !r.Ingest }

var dataRoles = map[string]bool{
	"data": true, "data_content": true, "data_hot": true, "data_warm": true, "data_cold": true, "data_frozen": true,
}

// Roles 从节点信息里读取角色。
func Roles(nodeInfo any) NodeRoles {
	var r NodeRoles
	roles, _ := jsonx.ArrayAt(nodeInfo, "roles")
	for _, role := range roles {
		s, _ := role.(string)
		switch {
		case s == "master":
			r.Master = true
		case s == "ingest":
			r.Ingest = true
		case dataRoles[s]:
			r.Data = true
		}
	}
	return r
}

// 内部属性不在界面上展示；后面几个是 8.x/9.x 新增的。
var internalNodeAttributes = map[string]bool{
	"ml.machine_memory":              true,
	"xpack.installed":                true,
	"transform.node":                 true,
	"ml.max_open_jobs":               true,
	"ml.allocated_processors":        true,
	"ml.allocated_processors_double": true,
	"ml.max_jvm_size":                true,
	"ml.config_version":              true,
	"transform.config_version":       true,
}

// Attrs 返回去掉内部属性后的节点属性。
func Attrs(info any) *jsonx.Object {
	out := jsonx.NewObject()
	attrs := jsonx.ObjectAt(info, "attributes")
	for _, k := range attrs.Keys() {
		if !internalNodeAttributes[k] {
			v, _ := attrs.Get(k)
			out.Set(k, v)
		}
	}
	return out
}

// CommonsIndices 对应 commons.Indices：_cat/indices 里所有 index 字段。
func CommonsIndices(data any) []any { return jsonx.FindAll(data, "index") }

// CommonsNodes 对应 commons.Nodes：_cat/nodes 里所有 name 字段。
func CommonsNodes(data any) []any { return jsonx.FindAll(data, "name") }
