import React, { useState } from 'react';

const Subscribe = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/subscription/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.message || 'Subscription failed.');
            }
        } catch (err) {
            setMessage('Error subscribing to the platform.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Subscribe to Online Tutorials</h2>
            <p>Get unlimited access to all courses with a monthly subscription.</p>
            <button
                className="btn btn-primary"
                onClick={handleSubscribe}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
};

export default Subscribe;
