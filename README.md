# Proyecto Integrador Coderhouse

## Apps desplegadas

### API REST
- El servidor se encuentra desplegado en heroku y se puede probar con el siguiente link: https://spenalva-coderhouse.herokuapp.com/

### React APP
- La aplicación hecha con react se encuentra desplegada en vercel y se puede acceder con el siguiente link: https://proyecto-coderhouse-spenalva1.vercel.app/

---

## Ejecutar aplicaciones localmente

### Backend/API REST

- Para ejecutar el servidor dirigirse a la carpeta "backend" y ejecutar el sigiuiente comando en la consola para instalar las dependencias:
```bash
npm i
```
- Y luego el siguiente comando para levantar el servidor:
```bash
npm start
```
- En la carpeta se encuenta un archivo llamado .env.example el cual indica qué variables de entorne se deben incluir en un archivo .env para que el servidor funcione correctamente.

### Aplicacion Frontend

- Para ejecutar la aplicación react dirigirse a la carpeta "frontend" y ejecutar el sigiuiente comando en la consolapara instalar las dependencias:
```bash
npm i
```
- Y luego el siguiente comando para levantar la app:
```bash
npm start
```
- Dentro del archivo de la carpeta environment se puede modificar la url de la api a la cual se le consultaran los datos
---
## Aclaraciones
### AUTH
 - Para la autenticación y autorización se utilizó passport con JWT por lo que no hay sesiones y un usuario se considera logueado cuando en el header de las peticiones manda el Bearer token generado y retornado por el servidor luego del login.
### Swagger
 - La REST API cuenta con la ruta /swagger la cual devuelve la documentacion generada con la herramienta Swagger donde se pueden observar y probar todas las rutas de la API.
 - Para probar las rutas protegidas se deberá hacer una peticion POST a la ruta /token con un email y contraseña ya registrados, copiar el token devuelto, hacer click en el botón verde al principio de la documentacion que dice "Authorize" y pegar el token allí.
### Postman
 - Dentro de la carpeta "backend" se encuentra la colección de postman la cual se puede importar en Postman para poder probar los distintos endpoints.
 - Es necesario setear las variables de entorno "URL" y "Token" para probar todos los servicios.
 - La request de /token posee un script para setear el token recibido automaticamente en el environment
### Aplicación React
 - Se realizó una App React que consume la api para poder interactuar con la mayoria de servicios que esta provee.
 - El usuario puede registrarse puede registrarse y loguearse.
 - Cualquier usuario puede listar todos los productos pero es necesario estar logueado para agregar productos al carrito y concretar una orden de compra.
 - El usuario logueado puede ver su carrito y el listado de órdenes generadas por él.
 - Si se loguea con el usuario de email: "admin" y contraseña: "1234" puede acceder a formularios para editar/crear nuevos productos y le aparecerán botones para eliminarlos.
### Usuarios
- Al registrarse desde la React APP el usuario puede cargar una imagen que luego será guardada (mediante el middleware de Multer) en la carpeta "/public" del servidor.
- Al registrarse desde postman o swagger, se le asignará una imagen por defecto.
### Carrito
- Para implementar el funcionamiento del carrito se creó la colección de MongoDB "CartItems" la cual contiene objetos que representan la relacion entre un usuario y un producto indicando la cantidad del mismo.
- De esta forma cada usuario tiene su propio carrito.
- Si un producto es eliminado de la base de datos, desaparecerá de todos los carritos en los que se encontraba incluido.
- Si un usuario intenta agregar a su carrito un producto que ya se encontraba en él. La cantidad que se intente añadir se sumará a la que ya había.
- Al usuario concretar una orden, su carrito se vaciará.
### Emails
- Cuando un usuario se registra, se manda un email a dicho usuario y al administrador con la información del usuario creado.
- Cuando un usuario concreta una orden, se envía un email al administrador y a dicho usuario con la información de la compra.
