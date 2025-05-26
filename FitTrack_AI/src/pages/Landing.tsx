import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, BarChart2, Utensils, Heart } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 md:p-12 shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Track Your Fitness Journey <span className="text-green-600">Effortlessly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Monitor your workouts, nutrition, and progress all in one place.
            Achieve your fitness goals with personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors duration-300 text-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Everything You Need To Track Your Fitness
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Activity className="text-green-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Workout Tracking</h3>
            <p className="text-gray-600">
              Log your daily workouts and track your progress over time. Get personalized recommendations.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Utensils className="text-green-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nutrition Tracking</h3>
            <p className="text-gray-600">
              Log your meals and track your calorie intake. Get recommendations based on your goals.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <BarChart2 className="text-green-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Analytics</h3>
            <p className="text-gray-600">
              Visualize your progress with charts and graphs. Track your improvements over time.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Heart className="text-green-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Health Insights</h3>
            <p className="text-gray-600">
              Get personalized health recommendations based on your activity and nutrition data.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          What Our Users Are Saying
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-600 mb-4">
              "FitTrack has been a game-changer for my fitness journey. The personalized recommendations
              and easy tracking have helped me stay consistent with my workouts."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-800 font-semibold">JD</span>
              </div>
              <div>
                <h4 className="font-semibold">Jane Doe</h4>
                <p className="text-sm text-gray-500">Lost 15 lbs in 3 months</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-600 mb-4">
              "I've tried many fitness apps, but FitTrack stands out with its simple interface and
              comprehensive tracking. The nutrition recommendations are spot on!"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-800 font-semibold">JS</span>
              </div>
              <div>
                <h4 className="font-semibold">John Smith</h4>
                <p className="text-sm text-gray-500">Gained 10 lbs of muscle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white rounded-2xl p-8 md:p-12 max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Fitness Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have achieved their fitness goals with FitTrack.
          </p>
          <Link
            to="/signup"
            className="bg-white text-green-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-lg inline-block"
          >
            Start For Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;