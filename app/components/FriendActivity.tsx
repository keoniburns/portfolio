import React, { useState, useEffect } from "react";
import { animate } from "motion";

interface FriendProps {
  name: string;
  activity: string;
  time: string;
}

const FriendActivity: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  const friends: FriendProps[] = [
    {
      name: "Colleague 1",
      activity: "Viewed your React Project",
      time: "2 hr",
    },
    { name: "Mentor", activity: "Commented on your Backend API", time: "1 hr" },
    { name: "Recruiter", activity: "Viewed your Portfolio", time: "45 min" },
    { name: "Friend", activity: "Shared your ML Project", time: "3 hr" },
  ];

  const hidePanel = () => {
    const panel = document.getElementById('friend-activity-panel');
    if (panel) {
      // Animate out
      animate(panel, { opacity: 0, x: 50 }, { duration: 0.3 }).finished.then(() => {
        setIsVisible(false);
      });
    }
  };

  const showPanel = () => {
    setIsVisible(true);
    // We'll animate in after the component renders
  };

  // Handle animation when showing the panel
  useEffect(() => {
    if (isVisible) {
      const panel = document.getElementById('friend-activity-panel');
      if (panel) {
        // Set initial position for animation
        panel.style.opacity = '0';
        panel.style.transform = 'translateX(50px)';
        
        // Animate in
        animate(panel, { opacity: 1, x: 0 }, { duration: 0.3 });
      }
    }
  }, [isVisible]);

  // If not visible, render just the toggle button
  if (!isVisible) {
    return (
      <button 
        onClick={showPanel}
        className="fixed top-4 right-4 text-gray-400 hover:text-white z-10 bg-[#282828] rounded-full p-2"
        title="Show friend activity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </button>
    );
  }

  return (
    <div 
      id="friend-activity-panel"
      className="w-80 bg-[#121212] border-l border-[#282828] p-4 hidden lg:block"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-base font-bold">Friend Activity</h3>
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
          <button 
            onClick={hidePanel}
            className="text-gray-400 hover:text-white"
            title="Close friend activity"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Friend list */}
      <div className="space-y-4">
        {friends.map((friend, i) => (
          <div key={i} className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-[#282828] rounded-full flex-shrink-0 flex items-center justify-center text-white">
              {friend.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center">
                <p className="text-white text-sm font-medium">{friend.name}</p>
                <span className="mx-1 text-gray-400">•</span>
                <p className="text-gray-400 text-xs">{friend.time}</p>
              </div>
              <p className="text-gray-400 text-xs">{friend.activity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Find friends button */}
      <div className="mt-6">
        <button className="text-white text-sm hover:underline">
          Find connections
        </button>
      </div>
    </div>
  );
};

export default FriendActivity;
