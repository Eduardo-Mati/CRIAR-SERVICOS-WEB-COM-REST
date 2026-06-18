import userModel from '../models/userModel.js'

const controller = {
    getAll:(req,res) => {
        res.send('get all users')
    },
    getById:(req,res) => {
        res.send(`get user by ID ${req.params.id}`)
    },
    create:(req,res) => {
        const user = req.body;
        const newUser = userModel.create(user)
        res.status(201).send(`create user with name ${JSON.stringify(user.name)}`)
    },
    update:(req,res) => {
        const user = req.body;
        const userId = req.params.id;
        const updatedUser = userModel.update(userId, user)
        res.send(`update user by id ${req.params.id}`)
    },
    delete:(req,res) => {
        const userId = req.params.id;
        const deletedUser = userModel.delete(userId)
        res.send(`delete user by id ${req.params.id}`)
    }
}
export default controller;