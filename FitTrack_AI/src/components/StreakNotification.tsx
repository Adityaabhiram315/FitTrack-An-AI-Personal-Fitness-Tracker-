import React, { useState, useEffect } from 'react';

interface StreakNotificationProps {
  streak: number;
}

const StreakNotification: React.FC<StreakNotificationProps> = ({ streak }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Show notification for 5 seconds
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300); // Wait for fade out animation
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed top-4 right-4 bg-white rounded-full shadow-lg px-6 py-3 flex items-center transform transition-all duration-300 ${
        isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      }`}
      style={{
        animation: isAnimating ? 'bounce 0.5s ease-in-out' : 'none',
        zIndex: 1000
      }}
    >
      <span className="text-xl mr-2" role="img" aria-label="fire">🔥</span>
      <div>
        <p className="font-semibold text-gray-800">
          Day {streak} Streak!
        </p>
        <p className="text-sm text-gray-600">
          Keep up the great work! 💪
        </p>
      </div>
    </div>
  );
};

export default StreakNotification;