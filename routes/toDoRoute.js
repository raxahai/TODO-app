const toDoRouter = require('express').Router();
const toDoModel = require('../models/toDoModel.js');
const { auth } = require("../middlewares/verifyToken");

toDoRouter.get('/', auth, async (req, res) => {
    try {
        const toDoList = await toDoModel.find({ user: req.user._id });
        res.status(200).json(toDoList);

    } catch (error) {
        res.status(404).json({
            'code': '404',
            'message': 'failed to fetch todo'
        });
    }
});

toDoRouter.post('/add', auth, async (req, res) => {
    try {
        const addToDo = new toDoModel({
            user: req.user._id,
            title: req.body.title,
            description: req.body.description,
        });

        const savedToDo = await addToDo.save();
        res.status(200).json(savedToDo);

    } catch (error) {
        res.status(404).json({
            'code': '404',
            'message': 'failed to add todo'
        });
    }
});

toDoRouter.delete('/delete/:toDoId', auth, async (req, res) => {
    try {
        await toDoModel.findByIdAndDelete(req.params.toDoId);
        res.status(200).json({
            id: req.params.toDoId,
            code: 200,
            message: "To do successfully deleted",
        });

    } catch (error) {
        res.status(404).json({
            'code': '404',
            'message': 'failed to delete todo'
        });
    }
});

toDoRouter.put('/update/:toDoId', auth, async (req, res) => {
    try {
        await toDoModel.findByIdAndUpdate(req.params.toDoId, {
            title: req.body.title,
        });
        res.status(200).json({
            id: req.params.toDoId,
            code: 200,
            message: "To do successfully updated",
        });

    } catch (error) {
        res.status(404).json({
            'code': '404',
            'message': 'failed to update the required todo'
        });
    }
});

module.exports = toDoRouter;