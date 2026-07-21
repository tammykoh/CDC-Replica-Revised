import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import CoursesView from './components/CoursesView';
import BookingView from './components/BookingView';
import AboutUsView from './components/AboutUsView';

export default function App() {
  const [currentView, setView] = useState<string>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView setView={setView} />;
      case 'courses':
        return (
          <CoursesView 
            setView={setView} 
            setSelectedCourseId={setSelectedCourseId} 
          />
        );
      case 'booking':
        return (
          <BookingView 
            selectedCourseId={selectedCourseId} 
            setSelectedCourseId={setSelectedCourseId} 
          />
        );
      case 'about':
        return <AboutUsView />;
      default:
        return <HomeView setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-mist text-on-surface select-none" id="cdc-app">
      {/* Dynamic Header */}
      <Header currentView={currentView} setView={setView} />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto py-8 focus:outline-none" id="main-content-area">
        <div className="px-4 sm:px-6 lg:px-8">
          {renderActiveView()}
        </div>
      </main>

      {/* Footer Details */}
      <Footer />
    </div>
  );
}
