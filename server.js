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
	console.log(`User ${socket.id} is connected`);
	let playersCount = 0

	playersCount++

	io.emit('ready', () => {
		console.log(`player ${ socket.id } is ready`);
		
		if(playersCount === 2) {
			io.emit('startGame', socket.id)
		}
	})
})

httpServer.listen(3000, () => console.log("listening on port 3000"))
