import React, { useState } from 'react';
import { useAuth } from '../../store/Auth';
const baseURL = import.meta.env.VITE_API_URL;
import { toast } from 'react-toastify';
const Subscription = ({ coursePrice }) => {
    const [plan, setPlan] = useState('monthly'); // Default to monthly plan
    const [loading, setLoading] = useState(false);
    const {user} = useAuth();
    const handleSubscription = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token'); // Assuming you store token in localStorage
            const userId = user._id; // Get the actual user ID from the context or session
            const planId = plan; // Selected plan ID

            const response = await fetch(`${baseURL}/api/subscription/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Pass the user token for authentication
                },
                body: JSON.stringify({
                    userId,  // The user ID who is subscribing
                    planId,  // Plan selected by the user (e.g., 'monthly' or 'yearly')
                }),
            });

            const data = await response.json();
            if (response.ok) {
               toast.success(data.message);
            } else {
                toast.error(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error creating subscription:', error);
            alert('An error occurred while creating the subscription.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="subscription-container">
            <h2>Select a Subscription Plan</h2>

            <div className="plans">
                <div>
                    <input
                        type="radio"
                        id="monthly"
                        name="plan"
                        value="monthly"
                        checked={plan === 'monthly'}
                        onChange={(e) => setPlan(e.target.value)}
                    />
                    <label htmlFor="monthly">Monthly Plan - {coursePrice}</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="yearly"
                        name="plan"
                        value="yearly"
                        checked={plan === 'yearly'}
                        onChange={(e) => setPlan(e.target.value)}
                    />
                    <label htmlFor="yearly">Yearly Plan - {coursePrice * 12}</label>
                </div>
            </div>

            <button onClick={handleSubscription} disabled={loading}>
                {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
        </div>
    );
};

export default Subscription;
