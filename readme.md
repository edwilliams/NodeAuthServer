## Node Auth Server

An authentication server written in NodeJS using JWT and storing data in DynamoDB

---

Create a `.env` file to store sensitive info

```shell
JWT_secret = 'secretstring'
AWS_region = '...'
AWS_accessKeyId = 'XXXXXXXXXXXXXXXXXXXX'
AWS_secretAccessKey = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
```

## API ref

**GET test**
```shell
curl -X GET \
  -H 'Authorization: Bearer [token]' \
  http://localhost:8000/v/1/test
```

---

**GET register**
```shell
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"password":"test123", "username":"user@example.com"}' \
  http://localhost:8000/v/1/auth/register
```

---

**POST login**
```shell
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"password":"test123", "username":"user@example.com"}' \
  http://localhost:8000/v/1/auth/login
```
