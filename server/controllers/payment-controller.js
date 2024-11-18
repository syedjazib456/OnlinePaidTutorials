const stripe = require('stripe')('your-stripe-secret-key');

const purchaseCourse = async (req, res) => {
    const { courseId, token } = req.body;
    try {
        const courseDetails = await CourseDetails.findOne({ courseId });
        if (!courseDetails) return res.status(404).json({ message: "Course not found" });

        const charge = await stripe.charges.create({
            amount: courseDetails.price * 100, // Stripe works in cents
            currency: 'usd',
            source: token,
            description: `Purchase of ${courseDetails.courseId}`
        });

        res.status(200).json({ message: "Payment successful", charge });
    } catch (err) {
        res.status(500).json({ message: "Payment failed", error: err.message });
    }
};


module.exports = {purchaseCourse}