const Subscription = require('../models/subscription-model');

const createSubscription = async (req, res) => {
    const { userId, planId } = req.body;
    console.log(req.body);

    if (!planId || !userId) {
        return res.status(400).json({ message: 'Plan ID and User ID are required' });
    }

    try {
        // Check if the user already has an active subscription
        const existingSubscription = await Subscription.findOne({
            userId,
            isActive: true,
            endDate: { $gte: new Date() }, // Ensure the subscription is still active
        });

        if (existingSubscription) {
            // If the user is upgrading from a monthly to yearly plan (or vice versa)
            if (existingSubscription.planId !== planId) {
                // Option 1: Cancel the current subscription and create a new one
                existingSubscription.isActive = false; // Mark old plan as inactive
                await existingSubscription.save();

                // Calculate the prorated value (if applicable)
                const remainingDays = Math.ceil((existingSubscription.endDate - new Date()) / (1000 * 3600 * 24));
                let amountToApply = 0; // Example: Calculate the remaining amount to apply towards the new plan

                // Example: If user has 10 days left in a 30-day monthly plan, apply the remaining days towards the yearly plan
                // Assuming monthly plan costs $30 and yearly plan costs $300
                const monthlyPlanCost = 30;
                const yearlyPlanCost = 300;
                const proratedAmount = (remainingDays / 30) * monthlyPlanCost;
                amountToApply = proratedAmount; // Apply the prorated amount

                // Create the new subscription (e.g., yearly)
                const subscription = new Subscription({
                    userId,
                    planId, // New yearly plan
                    startDate: new Date(),
                    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // Set for 1-year subscription
                    isActive: true,
                });

                await subscription.save();
                return res.status(201).json({
                    message: 'Subscription upgraded successfully',
                    subscription,
                    proratedAmount, // Optionally send the prorated amount applied
                });
            } else {
                return res.status(400).json({ message: 'You already have an active subscription for this plan.' });
            }
        } else {
            // If the user has no active subscription, create a new one
            const subscription = new Subscription({
                userId,
                planId, // Monthly or yearly plan
                startDate: new Date(),
                endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // For monthly plan
                isActive: true,
            });

            await subscription.save();
            return res.status(201).json({ message: 'Subscription created successfully', subscription });
        }
    } catch (err) {
        console.error('Error creating subscription:', err);
        return res.status(500).json({ message: 'Error creating subscription', error: err.message });
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



module.exports = { createSubscription, checkSubscription };
