import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; 

if(!MONGODB_URI) {
    throw new Error("Por favor proporciona la URI de la base de datos")
}

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

const dbConnect = async () => {
    if(cached.conn) {
        return cached.conn;
    } 

    if(!cached.promise){
        const opts = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(MONGODB_URI,opts)
        .then((mongoose)=> {
            return mongoose
        })
        console.log("Conectado a MongoDB");
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect
