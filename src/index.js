import express from 'express'
import mongoose from 'mongoose'
import messageModel from './models/messages.js'
import indexRouter from './routes/indexrouter.js'

import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'

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
    "mongodb+srv://lucasrtinte19:<password>@cluster0.1mnux6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((mensasje) => console.log(mensasje))
    .catch((error) => console.log(error));
    app.use(express.json())
    app.engine('handlebars', engine())
    app.set('view engine', 'handlebars')
    app.set('views', __dirname + '/views')
    app.use("/",indexRouter)
    

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

