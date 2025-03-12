import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import '../src/assets/style/main.scss';
import ErrorPage from './components/pages/ErrorPage.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/user/18" />} />
        <Route path="/user/:id" element={<Home />} />
        <Route path="/error" element={<ErrorPage/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);