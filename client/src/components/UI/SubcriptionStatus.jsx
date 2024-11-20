import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";

const SubscriptionStatus = () => {
    const { subscription, isLoadingSubscription, fetchSubscription } = useAuth();
    const [isHovered, setIsHovered] = useState(false);

    if (isLoadingSubscription) {
        return (
            <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
                <p className="ml-4 text-blue-600 font-semibold">Checking subscription status...</p>
            </div>
        );
    }

    if (!subscription) {
        return (
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center transition duration-300 hover:shadow-xl">
                <p className="text-red-600 text-lg font-semibold">
                    No active subscription.
                </p>
                <button
                    onClick={fetchSubscription}
                    className="mt-4 bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-800 transform hover:scale-105 transition duration-300"
                >
                    Refresh
                </button>
            </div>
        );
    }

    const remainingDays = Math.ceil(
        (new Date(subscription.endDate) - new Date()) / (1000 * 3600 * 24)
    );

    return (
        <div
            className="bg-white shadow-xl rounded-lg p-6 max-w-md mx-auto relative overflow-hidden transition-transform transform hover:scale-105 duration-300 hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered && (
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-700 opacity-20 pointer-events-none"></div>
            )}
            <h3 className="text-2xl font-bold text-green-600 text-center">
                Your Subscription
            </h3>
            <div className="mt-4">
                <p className="text-lg font-medium">
                    <strong>Plan:</strong>{" "}
                    {subscription.planId.charAt(0).toUpperCase() +
                        subscription.planId.slice(1)}
                </p>
                <p className="text-lg">
                    <strong>Start Date:</strong>{" "}
                    {new Date(subscription.startDate).toLocaleDateString()}
                </p>
                <p className="text-lg">
                    <strong>End Date:</strong>{" "}
                    {new Date(subscription.endDate).toLocaleDateString()}
                </p>
                <p
                    className={`text-lg font-semibold mt-2 ${
                        remainingDays > 0 ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {remainingDays > 0
                        ? `Remaining Days: ${remainingDays}`
                        : "Your subscription has expired."}
                </p>
            </div>
            <button
                onClick={fetchSubscription}
                className="mt-6 w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition duration-300"
            >
                Refresh
            </button>
        </div>
    );
};

export default SubscriptionStatus;
