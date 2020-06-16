import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    api.get('projects').then(response => {
        setProjects(response.data);
    })
  }, []);  
  async function handleAddRepository() {
    // TODO
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Diego Fernandes"  
    })
    const project = response.data;
    setProjects([...projects, project ]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    // precisa dar F5 apos delecao
    await api.delete('/projects/'+id);
    console.log('Removido '+id);
    return;
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => 
          <li key={project.id}>{project.title}<button onClick={() => handleRemoveRepository(project.id)}>Remover</button></li>
        )}
      </ul>      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
