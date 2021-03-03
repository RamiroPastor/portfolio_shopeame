


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