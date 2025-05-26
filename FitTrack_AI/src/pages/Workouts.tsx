import React, { useState } from 'react';
import { useUserData, WorkoutLog } from '../contexts/UserDataContext';

const Workouts: React.FC = () => {
  const { workoutLogs, addWorkoutLog, getRecommendedWorkouts } = useUserData();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    activity: '',
    duration: 30,
    caloriesBurned: 200
  });
  
  const recommendedWorkouts = getRecommendedWorkouts();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // For predefined workouts, also set estimated calories
    if (name === 'activity' && value) {
      // Rough estimate of calories based on activity and duration
      // In a real app, this would be more sophisticated
      const caloriesPerMinute: Record<string, number> = {
        'Walking': 4,
        'Jogging': 8,
        'Cycling': 7,
        'Swimming': 8,
        'HIIT': 12,
        'Weight Training': 6,
        'Yoga': 3,
        'Pilates': 5,
        'Dance': 6,
        'Boxing': 10
      };
      
      const estimatedCalories = (caloriesPerMinute[value] || 5) * formData.duration;
      
      setFormData({
        ...formData,
        activity: value,
        caloriesBurned: estimatedCalories
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'duration' || name === 'caloriesBurned' 
          ? parseInt(value) 
          : value
      }));
    }
  };
  
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const duration = parseInt(e.target.value);
    
    // Recalculate calories based on new duration
    const caloriesPerMinute: Record<string, number> = {
      'Walking': 4,
      'Jogging': 8,
      'Cycling': 7,
      'Swimming': 8,
      'HIIT': 12,
      'Weight Training': 6,
      'Yoga': 3,
      'Pilates': 5,
      'Dance': 6,
      'Boxing': 10
    };
    
    const estimatedCalories = formData.activity
      ? (caloriesPerMinute[formData.activity] || 5) * duration
      : 5 * duration;
    
    setFormData({
      ...formData,
      duration,
      caloriesBurned: estimatedCalories
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addWorkoutLog(formData);
    setShowAddForm(false);
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      activity: '',
      duration: 30,
      caloriesBurned: 200
    });
  };
  
  // Group workout logs by date
  const groupedLogs: Record<string, WorkoutLog[]> = {};
  
  // Sort logs by date (newest first)
  const sortedLogs = [...workoutLogs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  sortedLogs.forEach(log => {
    if (!groupedLogs[log.date]) {
      groupedLogs[log.date] = [];
    }
    groupedLogs[log.date].push(log);
  });
  
  // Common workout options
  const workoutOptions = [
    'Walking',
    'Jogging',
    'Cycling',
    'Swimming',
    'HIIT',
    'Weight Training',
    'Yoga',
    'Pilates',
    'Dance',
    'Boxing',
    ...recommendedWorkouts.filter(w => 
      !['Walking', 'Jogging', 'Cycling', 'Swimming', 'HIIT', 'Weight Training', 'Yoga', 'Pilates', 'Dance', 'Boxing'].includes(w)
    )
  ];
  
  // Remove duplicates
  const uniqueWorkoutOptions = [...new Set(workoutOptions)];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Workout Tracker</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          {showAddForm ? 'Cancel' : '+ Log Workout'}
        </button>
      </div>
      
      {/* Add Workout Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Log a Workout</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="activity" className="block text-gray-700 font-medium mb-2">
                  Activity
                </label>
                <select
                  id="activity"
                  name="activity"
                  value={formData.activity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select an activity</option>
                  {uniqueWorkoutOptions.map((workout, index) => (
                    <option key={index} value={workout}>{workout}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-gray-700 font-medium mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  min="1"
                  max="1440"
                  value={formData.duration}
                  onChange={handleDurationChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="caloriesBurned" className="block text-gray-700 font-medium mb-2">
                  Calories Burned
                </label>
                <input
                  type="number"
                  id="caloriesBurned"
                  name="caloriesBurned"
                  min="1"
                  max="10000"
                  value={formData.caloriesBurned}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Workout
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Workout Logs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Workout History</h2>
          
          {Object.keys(groupedLogs).length > 0 ? (
            <div className="space-y-8">
              {Object.keys(groupedLogs).map(date => (
                <div key={date}>
                  <h3 className="text-lg font-medium mb-3 border-b pb-2">
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <div className="space-y-4">
                    {groupedLogs[date].map(log => (
                      <div key={log.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="mb-2 md:mb-0">
                            <h4 className="font-semibold text-lg">{log.activity}</h4>
                            <p className="text-gray-600">{log.duration} minutes</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">{log.caloriesBurned} calories burned</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't logged any workouts yet.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Log Your First Workout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workouts;