const { Thought, User } = require('../models');

// get all thoughts
const thoughtController = {
    gettAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find().sort({ createdAt: -1 });
            res.json(thoughts);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

// get a specific thought
getAllThoughtsById: async (req,res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' })
        }
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
},

// new thought
createThought: async (req, res) => {
    try { 
        const thought = await Thought.create(req.body);
        await User.findByIdAndUpdate(
            thought.userId,
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
},

// update thought by id
updateThought: async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        await User.findByIdAndUpdate(
            thought.userId,
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found'});
        }
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
},


// delete thought by id
deleteThought: async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        await User.findByIdAndUpdate(
            thought.userId,
            { $pull: { thoughts: thought._id } },
            { new: true }
        );

        res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
},

// create reaction for thought
createReaction: async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
},

// delete specific thought by id
deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};


module.exports = thoughtController;