#Project setup 
copy .env.example to .env

create file ormconfig.json with config for mysql connection : 
```
[
  {
    "name": "default",
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "test",
    "password": "test",
    "database": "test"
  }
]

```

```
npm install
```

Run development server:

```
npm run dev
```


