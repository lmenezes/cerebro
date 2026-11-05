package models

import (
	"github.com/RitterHou/cerebro/internal/jsonx"
)

// Nodes 对应 nodes.Nodes：节点页数据。
func Nodes(info, stats, master any) (out any, err error) {
	defer recoverFormat(&err)
	ids := jsonx.FindAll(master, "id")
	if len(ids) == 0 {
		fail([]string{"id"})
	}
	masterID, ok := ids[0].(string)
	if !ok {
		fail([]string{"id"})
	}
	infoNodes := mustObj(info, "nodes")
	result := make([]any, 0, infoNodes.Len())
	for _, id := range infoNodes.Keys() {
		nodeInfo, _ := infoNodes.Get(id)
		nodeStats := must(stats, "nodes", id)
		result = append(result, node(id, masterID == id, nodeInfo, nodeStats))
	}
	return result, nil
}

func node(id string, currentMaster bool, info, stats any) any {
	roles := Roles(info)
	return jsonx.Obj(
		"id", id,
		"current_master", currentMaster,
		"name", must(stats, "name"),
		"host", optOrNull(stats, "host"),
		"heap", jsonx.Obj(
			"max", must(stats, "jvm", "mem", "heap_max"),
			"used", must(stats, "jvm", "mem", "heap_used"),
			"percent", must(stats, "jvm", "mem", "heap_used_percent"),
		),
		"disk", nodeDisk(stats),
		"cpu", jsonx.Obj(
			"process", must(stats, "process", "cpu", "percent"),
			"os", optOrNull(stats, "os", "cpu", "percent"),
			"load", optOrNull(stats, "os", "cpu", "load_average", "1m"),
		),
		"uptime", must(stats, "jvm", "uptime_in_millis"),
		"jvm", optStrOrNull(info, "jvm", "version"),
		"attributes", Attrs(info),
		"version", must(info, "version"),
		"master", roles.Master,
		"coordinating", roles.Coordinating(),
		"ingest", roles.Ingest,
		"data", roles.Data,
	)
}

func nodeDisk(stats any) any {
	total, ok1 := int64At(stats, "fs", "total", "total_in_bytes")
	available, ok2 := int64At(stats, "fs", "total", "available_in_bytes")
	if !ok1 || !ok2 {
		return nil
	}
	percent := roundF32((1 - float32(available)/float32(total)) * 100)
	return jsonx.Obj("total", jsonx.Num(total), "available", jsonx.Num(available), "percent", jsonx.Num(percent))
}
