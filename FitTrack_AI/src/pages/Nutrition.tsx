import React, { useState } from 'react';
import { useUserData, FoodLog } from '../contexts/UserDataContext';

const Nutrition: React.FC = () => {
  const { foodLogs, addFoodLog, calculateDailyCalories } = useUserData();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    meal: 'breakfast' as 'breakfast' | 'lunch' | 'dinner' | 'snack',
    food: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  
  const commonFoods = {
    'breakfast': [
      { name: 'Oatmeal with fruits', calories: 300, protein: 10, carbs: 50, fat: 5 },
      { name: 'Scrambled eggs with toast', calories: 350, protein: 20, carbs: 30, fat: 15 },
      { name: 'Greek yogurt with granola', calories: 280, protein: 15, carbs: 35, fat: 8 },
      { name: 'Smoothie bowl', calories: 320, protein: 12, carbs: 55, fat: 5 }
    ],
    'lunch': [
      { name: 'Grilled chicken salad', calories: 400, protein: 35, carbs: 20, fat: 18 },
      { name: 'Turkey sandwich', calories: 450, protein: 25, carbs: 45, fat: 15 },
      { name: 'Vegetable soup with bread', calories: 300, protein: 10, carbs: 45, fat: 8 },
      { name: 'Quinoa bowl with veggies', calories: 380, protein: 15, carbs: 50, fat: 12 }
    ],
    'dinner': [
      { name: 'Salmon with roasted vegetables', calories: 480, protein: 30, carbs: 25, fat: 25 },
      { name: 'Pasta with tomato sauce', calories: 450, protein: 15, carbs: 70, fat: 10 },
      { name: 'Stir-fry with rice', calories: 500, protein: 25, carbs: 60, fat: 15 },
      { name: 'Lean beef with potatoes', calories: 520, protein: 35, carbs: 40, fat: 20 }
    ],
    'snack': [
      { name: 'Apple with peanut butter', calories: 200, protein: 5, carbs: 25, fat: 8 },
      { name: 'Protein bar', calories: 220, protein: 15, carbs: 25, fat: 6 },
      { name: 'Mixed nuts', calories: 180, protein: 6, carbs: 6, fat: 16 },
      { name: 'Greek yogurt', calories: 120, protein: 10, carbs: 5, fat: 5 }
    ]
  };
  
  const dailyCalorieGoal = calculateDailyCalories();
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Calculate today's nutrient totals
  const todayLogs = foodLogs.filter(log => log.date === currentDate);
  const todayCalories = todayLogs.reduce((total, log) => total + log.calories, 0);
  const todayProtein = todayLogs.reduce((total, log) => total + log.protein, 0);
  const todayCarbs = todayLogs.reduce((total, log) => total + log.carbs, 0);
  const todayFat = todayLogs.reduce((total, log) => total + log.fat, 0);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle selecting a common food
    if (name === 'food' && value) {
      const selectedMeal = formData.meal;
      const selectedFood = commonFoods[selectedMeal].find(food => food.name === value);
      
      if (selectedFood) {
        setFormData({
          ...formData,
          food: selectedFood.name,
          calories: selectedFood.calories,
          protein: selectedFood.protein,
          carbs: selectedFood.carbs,
          fat: selectedFood.fat
        });
        return;
      }
    }
    
    // Handle regular field changes
    setFormData(prev => ({
      ...prev,
      [name]: ['calories', 'protein', 'carbs', 'fat'].includes(name)
        ? parseFloat(value) 
        : value
    }));
  };
  
  const handleMealChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const meal = e.target.value as 'breakfast' | 'lunch' | 'dinner' | 'snack';
    setFormData({
      ...formData,
      meal,
      food: '', // Reset food selection when meal changes
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFoodLog(formData);
    setShowAddForm(false);
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      meal: 'breakfast',
      food: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
  };
  
  // Group food logs by date
  const groupedLogs: Record<string, FoodLog[]> = {};
  
  // Sort logs by date (newest first)
  const sortedLogs = [...foodLogs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  sortedLogs.forEach(log => {
    if (!groupedLogs[log.date]) {
      groupedLogs[log.date] = [];
    }
    groupedLogs[log.date].push(log);
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Nutrition Tracker</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          {showAddForm ? 'Cancel' : '+ Log Food'}
        </button>
      </div>
      
      {/* Daily Nutrition Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Nutrition</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Calories</p>
            <p className="text-xl font-bold">{todayCalories} / {dailyCalorieGoal}</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${Math.min(100, (todayCalories / dailyCalorieGoal) * 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Protein</p>
            <p className="text-xl font-bold">{todayProtein}g</p>
            <p className="text-xs text-gray-500">Goal: {Math.round(dailyCalorieGoal * 0.3 / 4)}g</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Carbs</p>
            <p className="text-xl font-bold">{todayCarbs}g</p>
            <p className="text-xs text-gray-500">Goal: {Math.round(dailyCalorieGoal * 0.5 / 4)}g</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Fat</p>
            <p className="text-xl font-bold">{todayFat}g</p>
            <p className="text-xs text-gray-500">Goal: {Math.round(dailyCalorieGoal * 0.2 / 9)}g</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600">
          Based on your profile, your recommended daily calorie intake is {dailyCalorieGoal} calories.
        </p>
      </div>
      
      {/* Add Food Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Log a Meal</h2>
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
                <label htmlFor="meal" className="block text-gray-700 font-medium mb-2">
                  Meal
                </label>
                <select
                  id="meal"
                  name="meal"
                  value={formData.meal}
                  onChange={handleMealChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="food" className="block text-gray-700 font-medium mb-2">
                  Food
                </label>
                <select
                  id="food"
                  name="food"
                  value={formData.food}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select or enter a food</option>
                  {commonFoods[formData.meal].map((food, index) => (
                    <option key={index} value={food.name}>{food.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="calories" className="block text-gray-700 font-medium mb-2">
                  Calories
                </label>
                <input
                  type="number"
                  id="calories"
                  name="calories"
                  min="0"
                  value={formData.calories}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label htmlFor="protein" className="block text-gray-700 font-medium mb-2">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    id="protein"
                    name="protein"
                    min="0"
                    step="0.1"
                    value={formData.protein}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="carbs" className="block text-gray-700 font-medium mb-2">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    id="carbs"
                    name="carbs"
                    min="0"
                    step="0.1"
                    value={formData.carbs}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="fat" className="block text-gray-700 font-medium mb-2">
                    Fat (g)
                  </label>
                  <input
                    type="number"
                    id="fat"
                    name="fat"
                    min="0"
                    step="0.1"
                    value={formData.fat}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Food
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Food Logs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Food Log</h2>
          
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
                  
                  <div className="space-y-6">
                    {/* Group by meal type */}
                    {['breakfast', 'lunch', 'dinner', 'snack'].map(mealType => {
                      const mealLogs = groupedLogs[date].filter(log => log.meal === mealType);
                      if (mealLogs.length === 0) return null;
                      
                      return (
                        <div key={mealType} className="mb-4">
                          <h4 className="text-md font-medium capitalize mb-2">{mealType}</h4>
                          <div className="space-y-2">
                            {mealLogs.map(log => (
                              <div key={log.id} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex flex-wrap justify-between items-center">
                                  <div className="mb-2 md:mb-0">
                                    <h5 className="font-semibold">{log.food}</h5>
                                    <p className="text-gray-600 text-sm">
                                      P: {log.protein}g | C: {log.carbs}g | F: {log.fat}g
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium text-green-600">{log.calories} calories</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't logged any meals yet.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Log Your First Meal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nutrition;