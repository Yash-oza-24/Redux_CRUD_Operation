import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const [accessRights, setAccessRights] = useState([]);

  useEffect(() => {
    try {
      // Fetch user data from local storage when the component mounts
      const userData = JSON.parse(localStorage.getItem("USER"));
      if (userData && userData.user.accessRights && Array.isArray(userData.user.accessRights)) {
        setAccessRights(userData.user.accessRights);
      } else {
        throw new Error("Access rights data is not in the expected format");
      }
    } catch (error) {
      console.error("Error fetching access rights from local storage:", error.message);
    }
  }, []);

  return (
    <div className="sidebar">
      <h2>Access Rights</h2>
      <ul>
        {accessRights.map((accessRight, index) => (
          <li key={index}>{accessRight}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
