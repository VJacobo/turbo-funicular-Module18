const { Thought, User } = require('../models');

// Get all users
const userController =  {
    getAllUser: async (req,res) => {
        try {
            const users = await User.find().populate('thought friends');
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
// Get single user by id, populate friends and thought
getUserById: async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts friends');
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
},

// creating a new user
createUser: async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
},
// Use id to update User
updateUser: async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch(err) {
console.error(err);
res.status(500).json(err);
    }
},

// Use id to delete a user
deleteUser: async (req, res) => {
    try {
        const User = await User .findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await Thought.deleteMany({ _id: { $in: user.though } });
        res.json({ message: 'Userd deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
},

// add new friend
addFriend: async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ messgae: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
},

// Removing a friend
removeFriend: async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
        }
    },
};

module.exports = userController;