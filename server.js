import {createServer} from 'http'
import {Server} from 'socket.io'

const httpServer = createServer()

const io = new Server(httpServer)

io.on('connection', (socket) => {
	console.log(socket);
	console.log("has connected successfully");
})

httpServer.listen(3000, () => console.log("listening on port 3000"))
