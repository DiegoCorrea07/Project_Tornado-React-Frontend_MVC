import React, { useState, useEffect } from 'react';
import { addGrade, getStudents } from '../services/api';
import './AddGradeForm.css';

function AddGradeForm() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [progress, setProgress] = useState('');
  const [grade, setGrade] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await getStudents();
      setStudents(response);
    };
    fetchStudents();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!studentId || !progress || !grade || !date) {
      setMessage('Por favor, complete todos los campos.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    try {
      const response = await addGrade(parseInt(studentId), parseInt(progress), parseFloat(grade), date);
      setMessage(response.status);
      setStudentId('');
      setProgress('');
      setGrade('');
      setDate('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error al agregar la calificación.');
      console.error(error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="add-grade-form-container">
      <h2>Agregar Calificación</h2>
      {message && <p className="form-message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-grade-form">
        <div className="form-group">
          <label htmlFor="studentId">Estudiante:</label>
          <select id="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)} required>
            <option value="">Seleccionar estudiante</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.nombre} ({student.idbanner})</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="progress">Progreso:</label>
          <select id="progress" value={progress} onChange={(e) => setProgress(e.target.value)} required>
            <option value="">Seleccionar etapa</option>
            <option value="1">Progreso 1</option>
            <option value="2">Progreso 2</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="grade">Calificación:</label>
          <input
            type="number"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            min="0"
            max="10"
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Agregar Calificación</button>
      </form>
    </div>
  );
}

export default AddGradeForm;