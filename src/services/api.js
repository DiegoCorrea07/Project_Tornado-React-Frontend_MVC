
const API_URL = "https://minecore-grades-web.onrender.com";

// Estudiantes
export async function getStudents() {
  const res = await fetch(`${API_URL}/students`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.json();
}

export async function addStudent(nombre, idbanner) {
  const res = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, idbanner }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Error al agregar estudiante: ${errorData.message || res.status}`);
  }
  return await res.json();
}

export async function getStudentPerformance(studentId) {
  const res = await fetch(`${API_URL}/students/${studentId}/performance`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.json();
}

// Calificaciones
export async function addGrade(studentId, progress, grade, date) {
  const res = await fetch(`${API_URL}/grades`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ student_id: parseInt(studentId), progress: parseInt(progress), grade: parseFloat(grade), date }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Error al agregar calificación: ${errorData.message || res.status}`);
  }
  return await res.json();
}

export async function getFilteredGrades(params = {}) {
  const queryParams = new URLSearchParams(params);
  const url = `${API_URL}/grades?${queryParams.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return await res.json();
}