import {createServer} from 'http'
import {Server} from 'socket.io'

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
		origin: "http://localhost:5173",
		credentials: true,
		  methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
	console.log(socket);
	console.log("has connected successfully");
})

httpServer.listen(3000, () => console.log("listening on port 3000"))
