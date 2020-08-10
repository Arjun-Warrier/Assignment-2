const express = require('express')
const User = require('../models/User')
const router = express.Router()

//Add user
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send({ user })
    } catch (error) {
        res.status(400).send(error)
    }
})
//Read user
router.get('/users/get', async(req, res) => {
    try {
    const { email} = req.body
    const user = await User.findByEmail(email)
    if (!user) {
        return res.status(401).send({error: 'No User found'})
    }
    res.send({ user })
} catch (error) {
    res.status(400).send(error)
}

})
//update
router.put('/user/update',async(req,res) =>{
    try {
        const { email} = req.body
        const user = await User.findByEmail(email)
        if (!user) {
            return res.status(401).send({error: 'No User found'})
        }
        user(req.body);
        await user.save()
        res.status(201).send({ user })
    } catch (error) {
        res.status(400).send(error)
    }
})
//delete
router.delete('/user/delete',async(req,res) =>{
    try{
        delete customers["customer" + req.params.email];
    }catch (error) {
        res.status(400).send(error)
    }
})
