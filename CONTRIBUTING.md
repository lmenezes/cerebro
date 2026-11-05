Contributing to cerebro
=============================

You can contribute to cerebro through code, documentation or bug reports.

## Bug reports

For bug reports, make sure you:
- give enough details regarding your cerebro setup
- include versions for elasticsearch and cerebro
- describe steps to reproduce the error, the error itself and expected behaviour

## Pull requests

Before getting started on a pull request (be it a new feature or a bug fix), please open an issue explaining what you would like to achieve and how you would go about this.

Once working on a pull request, please:
- add tests that validate your changes
- make sure `go test ./...` and `golangci-lint run` pass
- for UI changes, make sure the screenshot comparison in `web/` passes (`npm run e2e`)

## Development

Backend (Go 1.27+):

```sh
go run ./cmd/cerebro            # http://localhost:9000
go test ./...
```

Frontend (`web/`, Node 22+):

```sh
cd web
npm ci
npm run dev                     # Vite dev server, proxies API calls to the Go backend on :9000
npm run build                   # output in web/dist, embedded into the Go binary
```

`CEREBRO_UI_DIR=web/dist go run ./cmd/cerebro` serves the frontend from disk instead of the embedded copy.
