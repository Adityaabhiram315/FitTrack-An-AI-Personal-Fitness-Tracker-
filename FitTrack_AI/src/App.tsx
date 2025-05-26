import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserDataProvider } from './contexts/UserDataContext';
import Header from './components/Header';
import StreakNotification from './components/StreakNotification';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Workouts from './pages/Workouts';
import Nutrition from './pages/Nutrition';
import ProtectedRoute from './components/ProtectedRoute';
import { useUserData } from './contexts/UserDataContext';

const AppContent = () => {
  const { streak } = useUserData();
  
  return (
    <div className="min-h-screen bg-green-50 font-sans text-gray-800">
      <Header />
      {streak > 0 && <StreakNotification streak={streak} />}
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/workouts" element={
            <ProtectedRoute>
              <Workouts />
            </ProtectedRoute>
          } />
          <Route path="/nutrition" element={
            <ProtectedRoute>
              <Nutrition />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <footer className="bg-white py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Fitness Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserDataProvider>
          <AppContent />
        </UserDataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;