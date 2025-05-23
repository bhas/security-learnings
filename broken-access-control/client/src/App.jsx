import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import PostOverviewPage from './pages/PostOverviewPage';
import AdminPage from './pages/AdminPage';
import ChallengeDescriptionPage from './pages/ChallengeDescriptionPage';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <nav className="sticky-nav">
        <div className="nav-content">
          <Link to="/challenges" className="nav-link">Challenges</Link>
          <Link to="/" className="nav-link">Webpage</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/" element={user ? <PostOverviewPage user={user} /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="/challenges" element={<ChallengeDescriptionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
