import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './StudentList.css';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        try {
          const response = await getStudents();
          setStudents(response);
          setLoading(false);
        } catch (err) {
          setError('Error al cargar los estudiantes.');
          setLoading(false);
          console.error(err);
        }
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los estudiantes.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="student-list-container">
      <h2>Lista de Estudiantes</h2>
      {students.length > 0 ? (
        <ul className="student-list">
          {students.map(student => (
              <li key={student.id} className="student-item">
                <span><strong>NOMBRE:</strong> {student.nombre}</span>
                <span><strong>ID BANNER:</strong> {student.idbanner}</span>
                <Link to={`/students/${student.id}/performance`} className="performance-link">Ver Rendimiento</Link>
              </li>
          ))}
        </ul>
      ) : (
          <p>No hay estudiantes registrados.</p>
      )}
    </div>
  );
}

export default StudentList;