import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    console.log("request comes");
    
    res.send('Hi there!!');
});

export {router as currentUserRouter};