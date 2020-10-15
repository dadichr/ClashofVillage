const mongoose = require ('mongoose');

const MarketSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    nameMarket: String,
    lastCollected: {
        type: Number,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Market', MarketSchema);