# Caddy

## Install

- [How to install caddy in Debian/Ubuntu](https://caddyserver.com/docs/install#debian-ubuntu-raspbian)

```shell
sudo systemctl start caddy
```

## File locations

- `Caddyfile` : `/etc/caddy/Caddyfile`

## Troubleshooting

### 1. :80 address already in use

```shell
sudo lsof -i :80​
```

e.g., apache

```shell
sudo systemctl stop apache2
sudo systemctl disable apache2 # 재부팅 시 자동 실행 제거
```

e.g., nginx

```shell
sudo systemctl stop nginx
sudo systemctl disable nginx
```

and so on ...
