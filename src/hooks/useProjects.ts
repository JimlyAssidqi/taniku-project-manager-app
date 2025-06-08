
import { useState, useEffect } from 'react';
import { Project } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const userProjects = savedProjects.filter((project: Project) => project.userId === user.id);
      setProjects(userProjects);
    }
  }, [user]);

  const saveProjects = (updatedProjects: Project[]) => {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const otherUserProjects = allProjects.filter((project: Project) => project.userId !== user?.id);
    const newAllProjects = [...otherUserProjects, ...updatedProjects];
    localStorage.setItem('projects', JSON.stringify(newAllProjects));
    setProjects(updatedProjects);
  };

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) return;

    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user.id,
    };

    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);
  };

  const updateProject = (id: string, projectData: Partial<Project>) => {
    const updatedProjects = projects.map(project =>
      project.id === id
        ? { ...project, ...projectData, updatedAt: new Date().toISOString() }
        : project
    );
    saveProjects(updatedProjects);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    saveProjects(updatedProjects);
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
  };
};
