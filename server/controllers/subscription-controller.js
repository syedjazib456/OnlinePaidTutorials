const Subscription = require('../models/subscription-model');

const createSubscription = async (req, res) => {
    const { userId, planId } = req.body;
    try {
        // Assuming a successful payment flow has occurred before this step
        const subscription = new Subscription({
            userId,
            startDate: new Date(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // 1-month subscription
            isActive: true
        });
        await subscription.save();

        res.status(201).json({ message: "Subscription created successfully", subscription });
    } catch (err) {
        res.status(500).json({ message: "Error creating subscription", error: err.message });
    }
};


const checkSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findOne({ userId: req.user.id, isActive: true });

        if (subscription) {
            return res.status(200).json({ message: "Subscription is active", subscription });
        }

        res.status(404).json({ message: "No active subscription found" });
    } catch (err) {
        res.status(500).json({ message: "Error checking subscription", error: err.message });
    }
};



module.exports = { createSubscription ,checkSubscription};
