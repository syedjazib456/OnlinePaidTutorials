import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PurchaseCourse = ({ courseId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handlePurchase = async () => {
        setLoading(true);
        try {
            if (!stripe || !elements) return alert('Stripe is not loaded');

            const cardElement = elements.getElement(CardElement);
            const { token, error } = await stripe.createToken(cardElement);

            if (error) {
                alert(`Payment error: ${error.message}`);
                return;
            }

            const response = await fetch(`${API_BASE_URL}/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    courseId, // Pass course ID
                    token: token.id, // Stripe token
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Course purchased successfully!');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error during purchase:', error);
            alert('An error occurred while processing the payment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Purchase Course</h2>
            <CardElement />
            <button onClick={handlePurchase} disabled={loading || !stripe}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </div>
    );
};

export default PurchaseCourse;
