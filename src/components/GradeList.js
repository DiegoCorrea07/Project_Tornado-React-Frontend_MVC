import React from 'react';
import './GradeList.css';

function GradeList({ grades }) {
  if (!grades || grades.length === 0) {
    return <p>No se encontraron calificaciones con los filtros aplicados.</p>;
  }

  return (
    <div className="grade-list-container">
      <h3>Resultados de Filtrado</h3>
      <ul className="grade-list">
        {grades.map((grade, index) => {
          // Formatear la fecha
          const dateObject = new Date(grade.date);
          const formattedDate = dateObject.toLocaleDateString();

          return (
            <li key={index} className="grade-item">
              <span>Estudiante: {grade.student_name}</span>
              <span>Progreso: {grade.progress}</span>
              <span>Nota: {grade.grade}</span>
              <span>Fecha: {formattedDate}</span> {/* Usar la fecha formateada */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GradeList;