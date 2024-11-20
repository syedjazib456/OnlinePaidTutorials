const mongoose = require('mongoose');
const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     planId: { type: String, required: true }, // Add planId to the schema
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;
