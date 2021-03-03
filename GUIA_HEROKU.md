# Guía para subir la api a Heroku

Esta guía está específicamente pensada para subir la api a Heroku,
manteniendo json-server (tal y como lo hicimos para la práctica de shopéame) y
con con el requisito adicional de tener un **único repositorio** en el que queramos tener
el código de la aplicación de angular para el frontend, y todo lo relacionado con esta api en una carpeta
dentro de dicho repositorio llamada backend.

Creo que será bastante más fácil si separamos la práctica en 2 repositorios distintos, uno para el back y otro para el front.
Esto se puede hacer con `git submodules` si lo queremos en una sola carpeta pero son un poco tóxicos también (aunque creo que recomendaría usar git submodules antes que lo que describo en la guía).

## Recursos

He tenido que mirar los siguientes tutoriales para conseguirlo, y me dejaré alguno:

- https://devcenter.heroku.com/articles/getting-started-with-nodejs
- https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment
- https://devcenter.heroku.com/articles/git#creating-a-heroku-remote
- https://jtway.co/deploying-subdirectory-projects-to-heroku-f31ed65f3f2
- https://github.com/typicode/json-server#simple-example

## Pasos a seguir:

### Crear la app de heroku

1. Instalar la cli de heroku tal como indican en https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up
2. En caso de hacer abierto el enlace del paso 1, despues de darle al botón que dice "I have installed the Heroku CLI",
   no hay que darle al botón grande y morado que dice "I cloned the app source code", sino al link pequeño de arriba que dice "this article", que nos lleva a https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment
3. Lo siguiente que nos dicen que hay que hacer es tener el código en un repositorio de git, aquí la decisión que yo he tomado es
   tener un único repositorio con todo lo relativo a la app.
4. Add a heroku git remote: hay que seguir las indicaciones de este link https://devcenter.heroku.com/articles/git#creating-a-heroku-remote (hay que haber hecho `heroku login` antes de ejecutar los comandos). En este punto, podemos ir a la web de heroku, hacer login y cambiar el nombre de la app en settings (en mi caso, la he llamado _shopeame-mock-api_)

### Separar el back del front con git

Si pusheamos ahora el código al remoto de heroku, se pondrá a instalar y buildear angular (y puede tardar un ratillo, ya conocemos las cosillas de angular) porque es lo que se encuentra en el directorio raíz de la app (recordemos que lo relativo a la api está escondido en una carpeta llamada backend). Lo que hay que hacer es seguir uno de los dos métodos del 4º link que he puesto en recursos. Yo he optado por el primer método, que es fácil pero un poco incómodo para hacer deploys.

5. Ejecutar `git subtree split --prefix backend -b heroku-deploy` para crear una rama independiente llamada heroku-deploy
   que SOLO tiene el contenido de la carpeta backend dentro. **NOTA IMPORTANTE** a partir de este punto, la nueva rama heroku-deploy no
   podrá ser mergeada con master/main ni desde github ni localmente con git, porque son historiales de commits independientes
   (el error es _fatal: refusing to merge unrelated histories_)
6. Cambiar a la rama heroku-deploy, que solo debería tener lo que había en la carpeta backend. Si se os ha creado una carpeta backend que solo tiene node_modules dentro, podeis borrarla tranquilamente (creo que se crea porque el node_modules de backend estaba siendo gitignorado)

### Adaptar json-server

Los siguientes pasos hay que hacerlos tanto si tenemos el código en un solo repositorio o en varios.
El problema con json-server es que el comando `json-server --watch db.json --port 3000` ya no nos sirve,
porque tal y como indican en el segundo link de arriba, el puerto que hay que usar nos lo proporciona heroku
(cambia dinámicamente), así que hay que currárselo:

7. modificar el package.json para cambiar json-server a dependencia de producción, es decir, cambiar

```
"devDependencies": {
    "json-server": "^0.16.2"
  },
```

a

```
"dependencies": {
    "json-server": "^0.16.2"
  },
```

8. Crear un archivo `heroku-server.js` que es el que ejecutará heroku (se puede poner otro nombre) con el siguiente contenido:

```
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running on port ' + port)
})
```

9. Crear un archivo llamado `Procfile` (sin extensión) que es el que necesita heroku para lanzar procesos,
   el único proceso que puede recibir llamadas http es el que se llama web. Contenido de Procfile:

```
web: node heroku-server.js
```

En este punto se puede hacer `heroku local web` para probar en local si todo va bien,
si abrimos localhost:5000 en el navegador debería estar json-server funcionando.

Nótese que los cambios que hemos hecho no deberían afectarnos si queremos lanzar la app de angular en local,
primero porque estamos en una rama totalmente independiente en la que no existe nada relacionado con angular,
y aunque no fuese así, lo único que hemos tocado que afecte a la práctica tal y como la teníamos es el cambio de
json-server a dependencia de producción en lugar de dependencia de desarrollo (que no molesta)

### Hacer deploy a heroku

Ya lo tenemos todo preparado para subir la api a heroku y que funcione correctamente

10. Ejecutar `git push heroku heroku-deploy:master` donde _heroku-deploy_ es el nombre de la rama
    que hemos creado para aislar el código de backend

11. OPCIONAL: dado que lo que queremos subir a heroku no es la rama main del repositorio, no hay forma de automatizar los redeploys
    simplemente con pushear a github o gitlab, sino que tenemos que ejecutar el comando del paso 10 desde la rama aislada
    siempre que queramos cambiar algo en la api. Por tanto, recomiendo crear un archivo llamado `deploy.sh` con el contenido:

```
#!/bin/sh
set -e


git push heroku heroku-deploy:master
```

y así podremos simplemente ejecutar `bash deploy.sh` o `sh deploy.sh` (dependiendo de si estamos en linux o windows respectivamente)
cada vez que queramos actualizar la app de heroku.

¡Y ya tendríamos la api de shopéame subida a heroku con json-server! ahora solo queda configurar la
app de angular para que siga usando localhost:3000 para acceder a la api cuando la ejecutamos en local,
pero que use la dirección de heroku cuando la ejecutemos desde netlify.

**Nota sobre persistencia:** En el paso 5 del 2º link de arriba, nos indican que usemos una base de datos externa
en lugar de escribir al sistema de archivos local (el que está en el servidor de heroku) porque los dynos de heroku
tienen un sistema de archivos efímero; pero esto no nos interesa, primero porque ya bastante largo se está haciendo esto,
y segundo porque nos conviene precisamente lo de archivos efímeros, porque si hemos creado el botón de borrar un producto
en la app de angular, y viene un trol y nos borra todos los productos, al día siguiente la api se habrá reiniciado y
volveremos a tener nuestro db.json sin modificar, con los productos que tenga cuando hagamos deploy.

### Configurar la app de angular

12. Modificar los archivos que hay en src/environments poniendo urls distintas para la api en cada uno:

Archivo environment.ts:

```
export const environment = {
  production: false,
  API_URL: 'http://localhost:3000/products'
};
```

Archivo environment.prod.ts (hay que poner la url de la api en heroku):

```
export const environment = {
  production: true,
  API_URL: 'https://shopeame-mock-api.herokuapp.com/products'
};

```

13. En el servicio de productos (que debería estar en src/app/shared/services/products.service.ts)
    hay que importar el archivo environment.ts y cambiar la constante `apiUrl` para que referencie a la que hemos guardado en environment.ts:

```
...
import { environment } from "../../../environments/environment";
...

const apiUrl = environment.API_URL;

@Injectable()

export class ProductsService {
  ... AQUI USAMOS LA CONSTANTE apiUrl PARA LAS LLAMADAS HTTP
}
```

14. Modificar script build en el package.json: `"build": "ng build --prod"`

15. Al subir la app a netlify, el build command es `npm run build`
    y el publish directory es `dist/shopeame` (donde pone shopeame, poned el nombre de la app tal y como está definido en el package.json)

16. OPCIONAL: Para que funcione lo de hacer f5 en cualquier página de la app y no de un error,
    además de añadir el archivo \_redirects dentro de la carpeta src con la línea `/* /index.html 200`,
    también hay que modificar el archivo `angular.json` (que está fuera de src, en la raíz del proyecto)
    para añadir `"src/_redirects"` a la lista de assets:

```
"assets": [
  "src/favicon.ico",
  "src/_redirects",
  "src/assets"
],
```

Y ahora sí que sí, deberíamos tener funcionando el frontend de shopéame en netlify, llamando a la api de back hosteada en heroku.

Suerte ☺
