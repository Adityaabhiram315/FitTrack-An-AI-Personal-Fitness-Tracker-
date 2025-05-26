import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend 
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { useUserData } from '../contexts/UserDataContext';
import { Calendar, Trophy, TrendingUp, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { 
    userProfile, 
    workoutLogs, 
    foodLogs, 
    stepLogs,
    calculateDailyCalories, 
    calculateStepGoal,
    getRecommendedWorkouts
  } = useUserData();
  
  const [currentDate] = useState(new Date());
  const [dailyQuote, setDailyQuote] = useState("");
  
  // Format current date for display
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentDate);
  
  // Get today's data
  const todayString = currentDate.toISOString().split('T')[0];
  const todaySteps = stepLogs.find(log => log.date === todayString)?.steps || 0;
  const dailyCalorieGoal = calculateDailyCalories();
  const dailyStepGoal = calculateStepGoal();
  
  // Calculate calories consumed today
  const caloriesConsumedToday = foodLogs
    .filter(log => log.date === todayString)
    .reduce((total, log) => total + log.calories, 0);
  
  // Calculate calories burned today
  const caloriesBurnedToday = workoutLogs
    .filter(log => log.date === todayString)
    .reduce((total, log) => total + log.caloriesBurned, 0);
  
  // Prepare data for weight chart
  const weightData = [];
  if (userProfile) {
    // Add the initial weight
    weightData.push({
      date: new Date().toISOString().split('T')[0],
      weight: userProfile.weight
    });
    
    // Add some mock historical data
    for (let i = 1; i <= 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i * 7); // Weekly data points
      
      // Generate a weight value that trends toward the goal
      let weightAdjustment = 0;
      if (userProfile.fitnessGoal === 'lose') {
        weightAdjustment = i * 0.5; // Losing 0.5kg per week
      } else if (userProfile.fitnessGoal === 'gain') {
        weightAdjustment = -i * 0.3; // Gaining 0.3kg per week
      }
      
      weightData.push({
        date: date.toISOString().split('T')[0],
        weight: userProfile.weight + weightAdjustment
      });
    }
  }
  
  // Sort weight data chronologically
  weightData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Prepare data for weekly activity chart
  const activityData = [];
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateString = date.toISOString().split('T')[0];
    
    const daySteps = stepLogs.find(log => log.date === dateString)?.steps || 0;
    const dayWorkoutCalories = workoutLogs
      .filter(log => log.date === dateString)
      .reduce((total, log) => total + log.caloriesBurned, 0);
    
    activityData.push({
      day: daysOfWeek[date.getDay() === 0 ? 6 : date.getDay() - 1],
      steps: daySteps,
      calories: dayWorkoutCalories
    });
  }
  
  // Get workout recommendations
  const recommendedWorkouts = getRecommendedWorkouts();
  
  // Motivational quotes
  const quotes = [
    "The only bad workout is the one that didn't happen.",
    "Fitness is not about being better than someone else, it's about being better than you used to be.",
    "Take care of your body. It's the only place you have to live.",
    "The hardest lift of all is lifting your butt off the couch.",
    "Your body can stand almost anything. It's your mind that you have to convince."
  ];
  
  useEffect(() => {
    // Set a random motivational quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setDailyQuote(randomQuote);
  }, []);

  // If user profile isn't set up yet, redirect to profile setup
  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Welcome to FitTrack!</h1>
        <p className="text-gray-600 mb-8">
          Let's set up your profile to get personalized fitness recommendations.
        </p>
        <Link 
          to="/profile" 
          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
        >
          Set Up Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header and Date */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hello, {currentUser?.fullName}!</h1>
          <p className="text-gray-600">{formattedDate}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm mt-4 md:mt-0">
          <p className="text-gray-700 font-medium">{dailyQuote}</p>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Calories</h3>
            <div className="bg-green-100 p-2 rounded-full">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold">{caloriesConsumedToday}</p>
              <p className="text-sm text-gray-500">of {dailyCalorieGoal} goal</p>
            </div>
            <div className="h-10 w-24 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${Math.min(100, (caloriesConsumedToday / dailyCalorieGoal) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Steps</h3>
            <div className="bg-blue-100 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-3xl font-bold">{todaySteps}</p>
              <p className="text-sm text-gray-500">of {dailyStepGoal} goal</p>
            </div>
            <div className="h-10 w-24 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${Math.min(100, (todaySteps / dailyStepGoal) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Calories Burned</h3>
            <div className="bg-orange-100 p-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{caloriesBurnedToday}</p>
          <p className="text-sm text-gray-500">from workouts</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Current Weight</h3>
            <div className="bg-purple-100 p-2 rounded-full">
              <Trophy className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold">{userProfile.weight} kg</p>
          <p className="text-sm text-gray-500">
            Goal: {userProfile.fitnessGoal === 'maintain' ? 'Maintain' 
              : userProfile.fitnessGoal === 'lose' ? 'Lose weight' 
              : 'Gain weight'}
          </p>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Weight Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return `${d.getMonth() + 1}/${d.getDate()}`;
                  }}
                />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  formatter={(value) => [`${value} kg`, 'Weight']}
                  labelFormatter={(date) => {
                    const d = new Date(date);
                    return d.toLocaleDateString();
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" orientation="left" stroke="#10b981" />
                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="calories" 
                  name="Calories Burned" 
                  fill="#10b981" 
                />
                <Bar 
                  yAxisId="right" 
                  dataKey="steps" 
                  name="Steps" 
                  fill="#3b82f6" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recommendations and Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Workout Recommendations */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recommended Workouts</h3>
          <ul className="space-y-2">
            {recommendedWorkouts.slice(0, 5).map((workout, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>{workout}</span>
              </li>
            ))}
          </ul>
          <Link 
            to="/workouts" 
            className="mt-4 text-green-600 font-medium flex items-center hover:underline"
          >
            Log a workout
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {/* Recent Workouts */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Workouts</h3>
          {workoutLogs.length > 0 ? (
            <ul className="space-y-3">
              {workoutLogs.slice(0, 3).map(log => (
                <li key={log.id} className="border-b pb-2">
                  <p className="font-medium">{log.activity}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{new Date(log.date).toLocaleDateString()}</span>
                    <span>{log.duration} min • {log.caloriesBurned} cal</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No workouts logged yet</p>
          )}
          <Link 
            to="/workouts" 
            className="mt-4 text-green-600 font-medium flex items-center hover:underline"
          >
            View all workouts
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {/* Recent Food Logs */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Meals</h3>
          {foodLogs.length > 0 ? (
            <ul className="space-y-3">
              {foodLogs.slice(0, 3).map(log => (
                <li key={log.id} className="border-b pb-2">
                  <p className="font-medium">{log.food}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{log.meal}</span>
                    <span>{log.calories} cal</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No meals logged yet</p>
          )}
          <Link 
            to="/nutrition" 
            className="mt-4 text-green-600 font-medium flex items-center hover:underline"
          >
            View all meals
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;