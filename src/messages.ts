import {messageModel} from './repositories/index';

//Normalizr
const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const schema = normalizr.schema;

const schemaAuthor = new schema.Entity('author',{
    email: '',
    nombre: '',
    apellido: '',
    alias: '',
    edad: '',
    avatar: ''
},{idAttribute: 'email'});

const msge = new schema.Entity('messages', {
    author: schemaAuthor,
})

const msgesSchema = new schema.Array(msge)



class Message {
    email: String
    message: String
    time: String

    constructor(email: String, message: String, time: String){
        this.email = email;
        this.message = message;
        this.time = time;
    }
}

class Messages{
    messages: Array<Message>

    constructor(messages: Array<Message>){
        this.messages = messages;
    }

    async getAllMessages(){
        this.messages = await messageModel.find({})
        if(this.messages === null || this.messages === []){
            return []
        }
        //Aca antes devolvia directamente this.messages
        let normalizedMessages = normalize(this.messages, msgesSchema);
        return normalizedMessages;
    }

    async addMessage(msge: Message){
        let messageToSave = new messageModel(msge);
        let savedMessage = await messageToSave.save();
        return savedMessage;
    }
}

export const messages = new Messages([]);