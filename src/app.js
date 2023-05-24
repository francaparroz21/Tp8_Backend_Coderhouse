import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';

import mongoose from 'mongoose';
const MONGO = 'mongodb+srv://francaparroz21:kDMwP4kT3nscyeBZ@cluster0.bzsude5.mongodb.net/?retryWrites=true&w=majority';

const PORT = '8080';

const app = express();
const conection = mongoose.connect(MONGO);

const server = app.listen(PORT, ()=>{
    console.log("Server open on ports: " + PORT);
});
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public')); 
app.use('/', viewsRouter);

io.on('connection', socket =>{
    console.log(`user on: ${socket.id}}`)

    socket.on("messages", data =>{
        logs.push({socketid: socket.id, mesage: data})
        socketServerIO.emit('log', {logs})
    })

});