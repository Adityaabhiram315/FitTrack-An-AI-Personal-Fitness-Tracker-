import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData, UserProfile } from '../contexts/UserDataContext';

const Profile: React.FC = () => {
  const { userProfile, updateProfile } = useUserData();
  const navigate = useNavigate();
  
  // Initialize form state with current profile or defaults
  const [formData, setFormData] = useState<UserProfile>({
    age: userProfile?.age ?? 30,
    gender: userProfile?.gender ?? 'male',
    height: userProfile?.height ?? 170,
    weight: userProfile?.weight ?? 70,
    fitnessGoal: userProfile?.fitnessGoal ?? 'maintain',
    activityLevel: userProfile?.activityLevel ?? 'lightlyActive'
  });
  
  // Update form when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' 
        ? parseFloat(value) 
        : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="1"
                max="120"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="height" className="block text-gray-700 font-medium mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                min="50"
                max="250"
                value={formData.height}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="weight" className="block text-gray-700 font-medium mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                min="20"
                max="500"
                step="0.1"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="fitnessGoal" className="block text-gray-700 font-medium mb-2">
                Fitness Goal
              </label>
              <select
                id="fitnessGoal"
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="lose">Lose Weight</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Gain Weight</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="activityLevel" className="block text-gray-700 font-medium mb-2">
                Activity Level
              </label>
              <select
                id="activityLevel"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="lightlyActive">Lightly Active (light exercise 1-3 days/week)</option>
                <option value="active">Active (moderate exercise 3-5 days/week)</option>
                <option value="veryActive">Very Active (hard exercise 6-7 days/week)</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;