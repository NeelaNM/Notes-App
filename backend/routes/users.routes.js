import express from 'express';
import User from '../models/users.model.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    const isUserUnique = await User.findOne({username});
    
    if(isUserUnique){
        res.status(400).json({success: false, message: 'User already exists!'})
    }else{
        const newUser = new User(req.body)
        try{
            await newUser.save();
            res.status(201).json({success: true, data: newUser.username})
        }catch(err){
            res.status(500).json({success: false, message: 'Error in creating user'})
        }
    }
})

router.get('/:username', async (req, res) => {
    // try{
    //     const user
    // }
})


export default router;