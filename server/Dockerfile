FROM golang:1.22-bullseye AS builder

WORKDIR /app

COPY server/go.mod server/go.sum ./
RUN go mod download

COPY server .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /tmp/server ./main

FROM gcr.io/distroless/base-debian12

WORKDIR /srv

COPY --from=builder /tmp/server /srv/server

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["/srv/server"]

