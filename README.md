# React-LB-MariaDB-Challenge

React Loopback MariaDB Challenge

## El deploy con AWS(EC2) : Nginx + pm2

Link: http://18.228.7.127/

## Inicializando el proyecto:

### Front:

En /client:

```sh
$ npm install
$ npm start
```

### BackEnd:

Config de la DB:

- Instalar MariaDB o MySQL
- Crear base de datos 'db_movies'
- Configurar user y pass en '/api/src/datasources/db.datasource.ts' (en mi caso user:'root' pass:'admin')

Parado en /api:

```sh
$ npm install
$ npm run migrate
$ npm start
```

En /api crear el archivo .env

```sh
PORT=3001
UPLOAD_DIR=uploaded
```

PORT: el puerto del backend (puerto del front es 3000)

UPLOAD_DIR: el nombre de la carpeta donde se irian a guardar los CSV subidos.

## Features:

- Add Movies para agregar peliculas
- Subida de archivos CSV al back, CSV parsing y carga a la DB server side
- Paginado server side (muestra 4 por pagina)
- Filtrado con la searchbar server side
- Edit & Delete button
