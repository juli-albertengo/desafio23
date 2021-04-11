import express, {Application, Request, Response} from 'express';
import { Socket } from 'node:dgram';
import path from 'path';
import { messages } from './messages';
import {connectToDB} from './repositories/index';

require('dotenv').config();
const app:Application = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
})

io.on('connection', async(socket: Socket) => {
    let msges = await messages.getAllMessages();
    socket.emit('receiveMessages', msges);

    socket.on('newMessage', (msge:any) => {
        messages.addMessage(msge);
        io.emit('newMessage', msge);
    })
})


http.listen(8080 || process.env.PORT, async()=>{
    console.log(await connectToDB())
})