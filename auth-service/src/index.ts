import {app} from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

const start = async () => {  

    if(!process.env.JWT_KEY) {
        throw new Error("JWT_KEY not set yet !!")
    }

    try {
        await mongoose.connect('mongodb://10.108.191.255:27017/auth');
        
        console.log("Connected with MondoDB !!!");
    } catch (err) {
        console.log(err);
    }

    app.listen(PORT, () => {
        console.log(`Auth server running on ${PORT} !!!!!!`)
    });
}

start();
