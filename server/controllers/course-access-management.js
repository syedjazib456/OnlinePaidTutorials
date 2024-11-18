const Subscription = require('../models/subscription-model');
const Purchase = require('../controllers/payment-controller');
const checkAccess = async (req, res) => {
    const { userId, courseId } = req.body;
    try {
        const purchase = await Purchase.findOne({ userId, courseId });
        const subscription = await Subscription.findOne({ userId, isActive: true });

        if (purchase || subscription) {
            return res.status(200).json({ message: "Access granted" });
        }

        res.status(403).json({ message: "Access denied" });
    } catch (err) {
        res.status(500).json({ message: "Error checking access", error: err.message });
    }
};

module.exports = {checkAccess};
