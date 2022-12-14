import {app} from './app';
import mongoose from 'mongoose';
import config from '../config';

const PORT = 8080 || process.env.PORT;

const start = async () => {  

    if(!process.env.JWT_KEY) {
        throw new Error("JWT_KEY not set yet !!")
    }

    if(!process.env.MONGO_URI) {
        throw new Error("JWT_KEY not set yet !!")
    }

    try {
       // await mongoose.connect(process.env.MONGO_URI);
        await mongoose.connect(`mongodb://${config.auth_mongo_srv}:27017/auth`);
        
        console.log("Connected with MondoDB !!!");
    } catch (err) {
        console.log(err);
    }

    app.listen(PORT, () => {
        console.log(`Auth server running on ${PORT} !!!!!!`)
    });
}

start();
