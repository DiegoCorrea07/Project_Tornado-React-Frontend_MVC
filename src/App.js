import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';
import AddGradeForm from './components/AddGradeForm';
import GradeFilterForm from './components/GradeFilterForm';
import StudentPerformance from './components/StudentPerformance';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Gestión de Estudiantes y Calificaciones</h1>
          <nav>
            <ul>
              <li><Link to="/students">Estudiantes</Link></li>
              <li><Link to="/add-student">Agregar Estudiante</Link></li>
              <li><Link to="/add-grade">Agregar Calificación</Link></li>
              <li><Link to="/filter-grades">Filtrar Calificaciones</Link></li>
            </ul>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/students" element={<StudentList />} />
            <Route path="/add-student" element={<AddStudentForm />} />
            <Route path="/add-grade" element={<AddGradeForm />} />
            <Route path="/filter-grades" element={<GradeFilterForm />} />
            <Route path="/students/:id/performance" element={<StudentPerformance />} />
            <Route path="/" element={<StudentList />} /> {/* Página principal */}
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Sistema de Gestión Académica</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;