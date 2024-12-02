import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import { useStore } from './store/useStore';

function App() {
  const { settings: { theme } } = useStore();

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen flex bg-white dark:bg-[#1a1a1a] transition-colors duration-200 overflow-hidden max-w-[100vw]">
        <Routes>
          <Route path="/" element={
            <>
              <SignedIn>
                <Sidebar />
                <div className="flex-1 flex flex-col h-screen min-w-0">
                  <Header />
                  <Chat />
                </div>
              </SignedIn>
              <SignedOut>
                <Landing />
              </SignedOut>
            </>
          } />
          <Route path="/settings" element={
            <>
              <SignedIn>
                <Sidebar />
                <div className="flex-1 flex flex-col h-screen min-w-0">
                  <Header />
                  <Settings />
                </div>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route path="/profile" element={
            <>
              <SignedIn>
                <Sidebar />
                <div className="flex-1 flex flex-col h-screen min-w-0">
                  <Header />
                  <Profile />
                </div>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
