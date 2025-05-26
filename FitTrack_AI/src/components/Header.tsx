import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, User, BarChart2, Activity, Utensils, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-green-600 flex items-center">
            <Activity className="h-8 w-8 mr-2" />
            <span>FitTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/workouts" className="text-gray-600 hover:text-green-600 transition-colors">
                  Workouts
                </Link>
                <Link to="/nutrition" className="text-gray-600 hover:text-green-600 transition-colors">
                  Nutrition
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button 
                    className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className="mr-1">{currentUser?.fullName}</span>
                    <User className="h-5 w-5" />
                  </button>
                  {dropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-opacity duration-200 ease-in-out"
                      style={{ opacity: dropdownOpen ? 1 : 0 }}
                    >
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-green-600 transition-colors">
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    <BarChart2 className="h-5 w-5 mr-2" />
                    Dashboard
                  </Link>
                  <Link 
                    to="/workouts" 
                    className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    <Activity className="h-5 w-5 mr-2" />
                    Workouts
                  </Link>
                  <Link 
                    to="/nutrition" 
                    className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    <Utensils className="h-5 w-5 mr-2" />
                    Nutrition
                  </Link>
                  <Link 
                    to="/profile" 
                    className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-600 hover:text-green-600 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors inline-block"
                    onClick={toggleMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;