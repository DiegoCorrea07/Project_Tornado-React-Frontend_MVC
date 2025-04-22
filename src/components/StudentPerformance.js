import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStudentPerformance } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './StudentPerformance.css';

function StudentPerformance() {
  const { id } = useParams();
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await getStudentPerformance(id);
        setPerformance(response);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el rendimiento del estudiante.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPerformance();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!performance) {
    return <p>No se encontraron datos de rendimiento para este estudiante.</p>;
  }

  return (
    <div className="performance-container">
      <h2>Rendimiento del Estudiante: {performance.nombre}</h2>
      <p>Promedio Actual: <span
        className={performance.estado === 'aprobado' ? 'aprobado' : 'reprobado'}>{performance.promedio_final}</span>
      </p>

      {/* Tabla de promedios por etapa */}
      {performance.promedios_por_etapa && Object.keys(performance.promedios_por_etapa).length > 0 && (
        <div className="etapas-promedios-table">
          <h3>Promedios por Progresos:</h3>
          <table>
            <thead>
              <tr>
                <th>Progreso</th>
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(performance.promedios_por_etapa).map(([etapa, promedio]) => (
                <tr key={etapa}>
                  <td>{etapa}</td>
                  <td>{promedio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {performance.nota_necesaria_etapa3 !== undefined && (
        <p>Nota Necesaria en Progreso 3: <span>{performance.nota_necesaria_etapa3}</span></p>
      )}
      <p><strong>Para Aprobar con un promedio final de 6</strong></p>
      <Link to="/students" className="back-link">Volver a la Lista de Estudiantes</Link>
    </div>
  );
}

export default StudentPerformance;