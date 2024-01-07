const router = require('express').Router();
const {
    getAllUSers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    addFriend,
    removeFriend,
} = require('../controllers/userController');
const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../controllers/thoughtController');

// User Routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/:userId/friends/:friendId', addFriend);
router.delete('/users/:userId/friends/:friendId', removeFriend);

// Thought Routes
router.get('/thoughts', getAllThoughts);
router.get('/thoughts/:id', getThoughtsById);
router.post('/thoughts', createThoughts);
router.put('/thoughts/:id', updateThought);
router.delete('/thoughts/:id', deleteThought);
router.post('/thoughts/:thoughtId/reactions', createReaction);
router.delete('/thoughts/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
