const mongoose = require ('mongoose');

const BarrackSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    nameBarrack: String,
    lastCollected: {
        type: Number,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Barrack', BarrackSchema);