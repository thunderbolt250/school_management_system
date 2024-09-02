import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Insert_students from './pages/Insert_students';
import './styles.css';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Sign_Up from './pages/Sign_Up';
import Guess_number from './pages/games/Number_game';
import Match_color from './pages/games/Color_game';
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Sign_Up />} />
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="insert-students" element={<Insert_students />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="users" element={<Users />} />
        <Route path="guess-number" element={<Guess_number />} />
        <Route path="match-color" element={<Match_color />} />
      </Route>
    </Routes>
  );
}

export default App;
