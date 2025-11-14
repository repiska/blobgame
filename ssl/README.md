# SSL Certificates Directory

This directory contains SSL certificates for the domain `serv0.atkes.tech`.

**Note:** Currently, self-signed certificates are installed for testing. For production, replace them with valid certificates from Let's Encrypt or your CA.

## Required Files

Place the following files in `ssl/serv0.atkes.tech/`:

- `fullchain.pem` - Full certificate chain (certificate + intermediate certificates)
- `privkey.pem` - Private key file

## Obtaining Certificates

### Option 1: Let's Encrypt (Recommended)

Use certbot to obtain free SSL certificates:

```bash
certbot certonly --standalone -d serv0.atkes.tech
```

Then copy certificates to this directory:
```bash
cp /etc/letsencrypt/live/serv0.atkes.tech/fullchain.pem ssl/serv0.atkes.tech/
cp /etc/letsencrypt/live/serv0.atkes.tech/privkey.pem ssl/serv0.atkes.tech/
```

### Option 2: Custom Certificates

If you have custom SSL certificates, place them in this directory with the names:
- `fullchain.pem`
- `privkey.pem`

## File Permissions

Ensure proper permissions:
```bash
chmod 644 ssl/serv0.atkes.tech/fullchain.pem
chmod 600 ssl/serv0.atkes.tech/privkey.pem
```

## Testing

After placing certificates, restart nginx:
```bash
docker compose -f docker-compose.yml -f nginx/docker-compose.nginx.yml restart nginx
```

