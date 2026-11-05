package config

import "testing"

// 仓库里的示例配置必须能被正常加载。
func TestExampleConfigLoads(t *testing.T) {
	cfg, err := Load("../../cerebro.example.yaml", func(string) string { return "" })
	if err != nil {
		t.Fatal(err)
	}
	if len(cfg.Hosts) != 2 || cfg.Hosts[1].Host != "https://es.example.com/es" || !cfg.Hosts[1].ReadOnly {
		t.Fatalf("unexpected hosts: %+v", cfg.Hosts)
	}
}
