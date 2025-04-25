
'use client';

import { ProjectCard } from './ProjectCard';
import { ProjectListProps } from '@/types';

export function ProjectList({ projects, category, status }: ProjectListProps) {
  const filteredProjects = projects.filter(project => {
    if (category && project.category !== category) return false;
    if (status && project.status !== status) return false;
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

