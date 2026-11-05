# FROM 里用到的参数要在第一个 FROM 之前声明
# Go 版本与 go.mod 的 toolchain 一致（官方镜像设置了 GOTOOLCHAIN=local，不会自动切换）
ARG GO_VERSION=1.27.3

# 1. 构建前端（Vue），与平台无关，只在构建机原生架构上跑一次
FROM --platform=$BUILDPLATFORM node:24-alpine AS web
WORKDIR /web
COPY web/package.json web/package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund
COPY web/ ./
RUN npm run build

# 2. 在构建机原生架构上交叉编译 Go，不经过 QEMU
FROM --platform=$BUILDPLATFORM golang:${GO_VERSION}-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod go mod download
COPY embed.go ./
COPY cmd/ cmd/
COPY internal/ internal/
COPY --from=web /web/dist web/dist
ARG TARGETOS TARGETARCH
ARG VERSION=dev
RUN --mount=type=cache,target=/go/pkg/mod --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=$TARGETOS GOARCH=$TARGETARCH \
    go build -trimpath -ldflags "-s -w -X main.version=${VERSION}" -o /out/cerebro ./cmd/cerebro \
 && mkdir -p /out/data

# 3. distroless：自带 CA 证书和时区数据，非 root，没有 shell
FROM gcr.io/distroless/static:nonroot
COPY --from=build /out/cerebro /cerebro
COPY --from=build --chown=65532:65532 /out/data /data
ENV CEREBRO_DATA_DIR=/data
WORKDIR /data
VOLUME /data
EXPOSE 9000
USER 65532:65532
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD ["/cerebro", "healthcheck"]
ENTRYPOINT ["/cerebro"]
