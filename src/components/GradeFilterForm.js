import React, { useState, useEffect } from 'react';
import { getFilteredGrades, getStudents } from '../services/api';
import GradeList from './GradeList';
import './GradeFilterForm.css';
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

function GradeFilterForm() {
  const [studentId, setStudentId] = useState('');
  const [progress, setProgress] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError('Error al cargar la lista de estudiantes.');
      }
    };
    fetchStudents();
  }, []);

  const handleFilter = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (studentId) params.student_id = studentId;
      if (progress) params.progress = progress;
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;

      try {
        const response = await getFilteredGrades(params);
        setFilteredGrades(response);
        setLoading(false);
      } catch (err) {
        setError('Error al filtrar las calificaciones.');
        setLoading(false);
        console.error(err);
      }
      setLoading(false);
    } catch (err) {
      setError('Error al filtrar las calificaciones.');
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="grade-filter-form-container">
      <h2>Filtrar Calificaciones</h2>
      <form onSubmit={handleFilter} className="grade-filter-form">
        <div className="form-group">
          <label htmlFor="studentId">Estudiante:</label>
          <select id="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)}>
            <option value="">Todos</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.nombre} ({student.idbanner})</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="progress">Etapa:</label>
          <select id="progress" value={progress} onChange={(e) => setProgress(e.target.value)}>
            <option value="">Todas</option>
            <option value="1">Etapa 1</option>
            <option value="2">Etapa 2</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Fecha Inicio:</label>
          <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Fecha Fin:</label>
          <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button type="submit" className="filter-button">Filtrar</button>
      </form>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {filteredGrades.length > 0 && <GradeList grades={filteredGrades} />}
    </div>
  );
}

export default GradeFilterForm;