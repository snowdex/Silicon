const Chore = require('../database/choresSchema');

// Creating a new chore
const createChore = async (req, res)=>{
    try {
        const { title, description, dueDate } = req.body;
        const newChore = new Chore({
            title,description,dueDate});

        await newChore.save();
        res.status(201).json({
            message: "Chore created successfully",
            success: true,
            chore: newChore
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

//updating a chore

const updateChore = async (req, res)=>{
    try {
        const { id } = req.params;
        const { title, description, dueDate } = req.body;
        const updatedChore = await Chore.findByIdAndUpdate(id, { title, description, dueDate }, { new: true });
        if(!updatedChore) return res.status(404).json({
            message: "Chore not found",
            success: false
        });
        res.status(200).json({
            message: "Chore updated successfully",
            success: true,
            chore: updatedChore
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

//Deleting a chore
const deleteChore = async (req, res)=>{
    try {
        const { id } = req.params;
        const deletedChore = await Chore.findByIdAndDelete(id);
        if(!deletedChore) return res.status(404).json({
            message: "Chore not found",
            success: false
        }); 
        res.status(200).json({
            message: "Chore deleted successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

//Fetching all chores
const getAllChores = async (req, res)=>{
    try {
        const chores = await Chore.find();
        res.status(200).json({
            message: "Chores fetched successfully",
            success: true,
            chores: chores
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

module.exports = {
    createChore,
    updateChore,
    deleteChore,
    getAllChores
};