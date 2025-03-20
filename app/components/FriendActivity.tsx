import React from "react";

interface FriendProps {
  name: string;
  activity: string;
  time: string;
}

const FriendActivity: React.FC = () => {
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

  return (
    <div className="w-80 bg-[#121212] border-l border-[#282828] p-4 hidden lg:block">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white text-base font-bold">Friend Activity</h3>
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
