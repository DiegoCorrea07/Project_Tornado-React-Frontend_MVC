import React, { useState } from 'react';
import { addStudent } from '../services/api';
import './AddStudentForm.css';

function AddStudentForm() {
  const [nombre, setNombre] = useState('');
  const [idbanner, setIdbanner] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addStudent(nombre, idbanner); // Llama a la función importada
      setMessage(response.status); // Asumiendo que tu backend devuelve un 'status'
      setNombre('');
      setIdbanner('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error al agregar el estudiante.');
      console.error(error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="add-student-form-container">
      <h2>Agregar Nuevo Estudiante</h2>
      {message && <p className="form-message">{message}</p>}
      <form onSubmit={handleSubmit} className="add-student-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="idbanner">ID Banner:</label>
          <input
            type="text"
            id="idbanner"
            value={idbanner}
            onChange={(e) => setIdbanner(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Agregar Estudiante</button>
      </form>
    </div>
  );
}

export default AddStudentForm;