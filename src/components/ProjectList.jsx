import React from 'react';
import ProjectItem from './ProjectItem';

function ProjectList({ projects, setProjects }) {
  const sortedProjects = [...projects].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Daftar Proyek</h2>

      {projects.length === 0 ? (
        <p className="text-gray-500">Belum ada proyek yang ditambahkan.</p>
      ) : (
        sortedProjects.map(project => (
          <ProjectItem
            key={project.id}
            project={project}
            setProjects={setProjects}
          />
        ))
      )}
    </div>
  );
}

export default ProjectList;
