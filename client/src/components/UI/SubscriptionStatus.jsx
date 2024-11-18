import React, { useState, useEffect } from 'react';

const SubscriptionStatus = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/subscription/status', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setStatus(data.subscription);
                } else {
                    setStatus(null);
                }
            } catch (err) {
                setStatus(null);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <h2>Subscription Status</h2>
            {status ? (
                <div>
                    <p>Your subscription is active.</p>
                    <p>
                        <strong>Start Date:</strong> {new Date(status.startDate).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>End Date:</strong> {new Date(status.endDate).toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p>You do not have an active subscription. Please subscribe to access premium courses.</p>
            )}
        </div>
    );
};

export default SubscriptionStatus;
