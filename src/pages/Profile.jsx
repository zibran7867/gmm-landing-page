import React, { useState } from "react";
import { Camera, Edit, Eye, EyeOff } from "lucide-react";

const Profile = () => {
  const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [error, setError] = useState("");

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (passwords.new !== passwords.confirm) {
      setError("New password and confirm password must be the same.");
    } else {
      setError("");
      alert("Profile updated successfully!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r hatch p-4">
      <div className="w-full max-w-md p-8 shadow-xl rounded-3xl bg-white">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">PROFILE</h2>
        
        {/* Profile Picture */}
        <div className="flex flex-col items-center relative">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center border-4 border-indigo-500 shadow-md">
            <Camera size={24} className="text-gray-600" />
          </div>
          <button className="text-indigo-600 font-semibold mt-2">Change Photo</button>
        </div>

        {/* Name and Email Fields */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Name" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            />
            <Edit className="absolute top-3 right-3 text-gray-500 cursor-pointer" size={20} />
          </div>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none" 
            disabled 
          />
        </div>

        {/* Change Password Section */}
        <h3 className="mt-6 font-semibold text-gray-800">Change Password</h3>
        <div className="space-y-3 mt-3">
          {["old", "new", "confirm"].map((field) => (
            <div key={field} className="relative">
              <input
                type={showPassword[field] ? "text" : "password"}
                name={field} 
                placeholder={
                  field === "old" ? "Old Password" : field === "new" ? "New Password" : "Confirm New Password"
                }
                value={passwords[field]}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-500"
                onClick={() => togglePasswordVisibility(field)}
              >
                {showPassword[field] ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          ))}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Save Changes Button */}
        <button 
          onClick={handleSubmit}
          className="w-full mt-6 py-2 bg-gradient-to-r nblue text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;