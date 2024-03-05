import express from 'express'
import cartRouter from './routes/cartRouter.js'
import productsRouter from './routes/productsRouter.js'
import chatRouter from './routes/chatRouter.js'
import upload from './config/multer.js'
import mongoose from 'mongoose'
import messageModel from './models/messages.js'

import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'
import userRouter from "./routes/userRoutes.js"

const app = express()
const PORT = 8080

//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server)

//Middlewares//coneccion a mongodbatlas no pasarle la contraseña al tutuor
mongoose
  .connect(
    "mongodb+srv://lucasrtinte19:coderhouse@cluster0.1mnux6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((mensasje) => console.log(mensasje))
  .catch((error) => console.log(error));
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')


io.on('connection',  (socket) => {
    console.log("Conexion con Socket.io")

    socket.on('mensaje', async (mensaje) => {
        try {
            await messageModel.create(mensaje)
            const mensajes=await messageModel.find()
        io.emit('mensajeLogs', mensajes) 
        } catch (error) {
            io.emit("mensajeLogs",error)
        }
     
    })

})

//Routes
app.use('/public', express.static(__dirname + '/public'))
app.use('/api/products', productsRouter, express.static(__dirname + '/public'))
app.use('/api/cart', cartRouter)
app.use('/api/chat', chatRouter, express.static(__dirname + '/public'))

app.use("/api/users", userRouter);
app.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log(req.file)
        res.status(200).send("Imagen cargada correctamente")
    } catch (e) {
        res.status(500).send("Error al cargar imagen")
    }
})