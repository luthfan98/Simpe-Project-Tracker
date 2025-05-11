import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import Report from './components/Report';

function App() {
  const [projects, setProjects] = useState([]);
  const API_URL = 'https://projecttracker.putrapanggiljaya.id:3423/projects';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Gagal mengambil data dari backend:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Router>
      <div className="max-w-4xl mx-auto p-6">
        {/* NAVIGATION MENU */}
        <nav className="flex justify-between items-center mb-6 border-b pb-3">
          <h1 className="text-2xl font-bold text-blue-700">Project Tracker</h1>
          <div className="space-x-4 text-sm">
            <Link to="/" className="text-blue-600 hover:underline">🏠 Home</Link>
            <Link to="/report" className="text-blue-600 hover:underline">📊 Laporan</Link>
          </div>
        </nav>

        {/* ROUTES */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProjectForm setProjects={setProjects} />
                <ProjectList projects={projects} setProjects={setProjects} />
              </>
            }
          />
          <Route path="/report" element={<Report projects={projects} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
