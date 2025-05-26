import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface UserProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  fitnessGoal: 'lose' | 'maintain' | 'gain';
  activityLevel: 'sedentary' | 'lightlyActive' | 'active' | 'veryActive';
  lastLoginDate?: string;
  streak: number;
}

export interface WorkoutLog {
  id: string;
  date: string;
  activity: string;
  duration: number; // in minutes
  caloriesBurned: number;
}

export interface FoodLog {
  id: string;
  date: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  food: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
}

export interface StepLog {
  date: string;
  steps: number;
}

interface UserDataContextType {
  userProfile: UserProfile | null;
  workoutLogs: WorkoutLog[];
  foodLogs: FoodLog[];
  stepLogs: StepLog[];
  updateProfile: (profile: UserProfile) => void;
  addWorkoutLog: (log: Omit<WorkoutLog, 'id'>) => void;
  addFoodLog: (log: Omit<FoodLog, 'id'>) => void;
  updateStepLog: (date: string, steps: number) => void;
  calculateDailyCalories: () => number;
  calculateStepGoal: () => number;
  getRecommendedWorkouts: () => string[];
  streak: number;
  updateStreak: () => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [stepLogs, setStepLogs] = useState<StepLog[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (currentUser) {
      const storedProfile = localStorage.getItem(`profile_${currentUser.id}`);
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setUserProfile(profile);
        
        const today = new Date().toISOString().split('T')[0];
        if (profile.lastLoginDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayString = yesterday.toISOString().split('T')[0];
          
          if (profile.lastLoginDate === yesterdayString) {
            profile.streak = (profile.streak || 0) + 1;
          } else {
            profile.streak = 1;
          }
          profile.lastLoginDate = today;
          localStorage.setItem(`profile_${currentUser.id}`, JSON.stringify(profile));
          setStreak(profile.streak);
        } else {
          setStreak(profile.streak || 0);
        }
      }

      const storedWorkouts = localStorage.getItem(`workouts_${currentUser.id}`);
      if (storedWorkouts) {
        setWorkoutLogs(JSON.parse(storedWorkouts));
      }

      const storedFoods = localStorage.getItem(`foods_${currentUser.id}`);
      if (storedFoods) {
        setFoodLogs(JSON.parse(storedFoods));
      }

      const storedSteps = localStorage.getItem(`steps_${currentUser.id}`);
      if (storedSteps) {
        setStepLogs(JSON.parse(storedSteps));
      }
    } else {
      setUserProfile(null);
      setWorkoutLogs([]);
      setFoodLogs([]);
      setStepLogs([]);
      setStreak(0);
    }
  }, [currentUser]);

  function updateProfile(profile: UserProfile) {
    const today = new Date().toISOString().split('T')[0];
    const updatedProfile = {
      ...profile,
      lastLoginDate: today,
      streak: profile.streak || 1
    };
    setUserProfile(updatedProfile);
    setStreak(updatedProfile.streak);
    if (currentUser) {
      localStorage.setItem(`profile_${currentUser.id}`, JSON.stringify(updatedProfile));
    }
  }

  function updateStreak() {
    if (userProfile && currentUser) {
      const today = new Date().toISOString().split('T')[0];
      if (userProfile.lastLoginDate !== today) {
        const newStreak = userProfile.streak + 1;
        const updatedProfile = {
          ...userProfile,
          lastLoginDate: today,
          streak: newStreak
        };
        setUserProfile(updatedProfile);
        setStreak(newStreak);
        localStorage.setItem(`profile_${currentUser.id}`, JSON.stringify(updatedProfile));
      }
    }
  }

  function addWorkoutLog(log: Omit<WorkoutLog, 'id'>) {
    const newLog = {
      ...log,
      id: Date.now().toString()
    };
    
    const updatedLogs = [...workoutLogs, newLog];
    setWorkoutLogs(updatedLogs);
    
    if (currentUser) {
      localStorage.setItem(`workouts_${currentUser.id}`, JSON.stringify(updatedLogs));
    }
  }

  function addFoodLog(log: Omit<FoodLog, 'id'>) {
    const newLog = {
      ...log,
      id: Date.now().toString()
    };
    
    const updatedLogs = [...foodLogs, newLog];
    setFoodLogs(updatedLogs);
    
    if (currentUser) {
      localStorage.setItem(`foods_${currentUser.id}`, JSON.stringify(updatedLogs));
    }
  }

  function updateStepLog(date: string, steps: number) {
    const existingIndex = stepLogs.findIndex(log => log.date === date);
    let updatedLogs;
    
    if (existingIndex >= 0) {
      updatedLogs = [...stepLogs];
      updatedLogs[existingIndex].steps = steps;
    } else {
      updatedLogs = [...stepLogs, { date, steps }];
    }
    
    setStepLogs(updatedLogs);
    
    if (currentUser) {
      localStorage.setItem(`steps_${currentUser.id}`, JSON.stringify(updatedLogs));
    }
  }

  function calculateDailyCalories() {
    if (!userProfile) return 2000;
    
    let bmr;
    if (userProfile.gender === 'male') {
      bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5;
    } else {
      bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age - 161;
    }
    
    let activityMultiplier;
    switch (userProfile.activityLevel) {
      case 'sedentary': activityMultiplier = 1.2; break;
      case 'lightlyActive': activityMultiplier = 1.375; break;
      case 'active': activityMultiplier = 1.55; break;
      case 'veryActive': activityMultiplier = 1.725; break;
      default: activityMultiplier = 1.2;
    }
    
    let tdee = bmr * activityMultiplier;
    
    switch (userProfile.fitnessGoal) {
      case 'lose': tdee -= 500; break;
      case 'gain': tdee += 500; break;
      default: break;
    }
    
    return Math.round(tdee);
  }

  function calculateStepGoal() {
    if (!userProfile) return 10000;
    
    switch (userProfile.activityLevel) {
      case 'sedentary': return 7500;
      case 'lightlyActive': return 10000;
      case 'active': return 12500;
      case 'veryActive': return 15000;
      default: return 10000;
    }
  }

  function getRecommendedWorkouts() {
    if (!userProfile) return [];
    
    const baseWorkouts = [
      'Walking', 'Jogging', 'Cycling', 'Swimming'
    ];
    
    switch (userProfile.fitnessGoal) {
      case 'lose':
        return [
          ...baseWorkouts,
          'High-Intensity Interval Training (HIIT)',
          'Circuit Training',
          'Aerobic Exercise',
          'Jump Rope'
        ];
      case 'gain':
        return [
          'Weight Training',
          'Resistance Band Training',
          'Bodyweight Exercises',
          'Protein-rich Diet',
          'Progressive Overload Training'
        ];
      case 'maintain':
        return [
          ...baseWorkouts,
          'Yoga',
          'Pilates',
          'Bodyweight Training',
          'Balanced Cardio and Strength'
        ];
      default:
        return baseWorkouts;
    }
  }

  const value = {
    userProfile,
    workoutLogs,
    foodLogs,
    stepLogs,
    updateProfile,
    addWorkoutLog,
    addFoodLog,
    updateStepLog,
    calculateDailyCalories,
    calculateStepGoal,
    getRecommendedWorkouts,
    streak,
    updateStreak
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}