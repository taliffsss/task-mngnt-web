import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/page/Login';
import Dashboard from './components/page/Dashboard';
import SignupForm from './components/page/SignupForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/signup" element={<SignupForm/>} />
      </Routes>
    </Router>
  );
};

export default App;
