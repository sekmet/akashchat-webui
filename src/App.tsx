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
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen flex bg-white dark:bg-[#1a1a1a] transition-colors duration-200 overflow-hidden max-w-[100vw] relative">
        <Routes>
          <Route path="/" element={
            <>
              <SignedIn>
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex-1 flex flex-col h-screen min-w-0">
                  <Header onMenuClick={toggleSidebar} />
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
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex-1 flex flex-col h-screen min-w-0">
                  <Header onMenuClick={toggleSidebar} />
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
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex-1 flex flex-col h-screen min-w-0">
                  <Header onMenuClick={toggleSidebar} />
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
