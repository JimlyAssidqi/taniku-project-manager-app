
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useProjects } from '../../hooks/useProjects';
import ProjectForm from './ProjectForm';
import ProjectCard from './ProjectCard';
import { Project } from '../../types';
import { useToast } from '@/hooks/use-toast';

const ProjectDashboard: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    addProject(projectData);
    setIsFormOpen(false);
    toast({
      title: "Project created",
      description: "Your new project has been added successfully.",
    });
  };

  const handleEditProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
      setEditingProject(undefined);
      setIsFormOpen(false);
      toast({
        title: "Project updated",
        description: "Your project has been updated successfully.",
      });
    }
  };

  const handleDeleteProject = (id: string) => {
    deleteProject(id);
    setDeleteProjectId(null);
    toast({
      title: "Project deleted",
      description: "The project has been removed from your dashboard.",
    });
  };

  const openEditForm = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProject(undefined);
  };

  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'in_progress').length;
  const totalHarvest = projects.reduce((sum, project) => sum + project.actualHarvest, 0);

  if (isFormOpen) {
    return (
      <ProjectForm
        project={editingProject}
        onSubmit={editingProject ? handleEditProject : handleAddProject}
        onCancel={closeForm}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your agricultural projects</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} size="lg">
          Add New Project
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Projects</CardDescription>
            <CardTitle className="text-2xl">{projects.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">All your projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>In Progress</CardDescription>
            <CardTitle className="text-2xl">{inProgressProjects}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-2xl">{completedProjects}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Finished projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Harvest</CardDescription>
            <CardTitle className="text-2xl">{totalHarvest.toFixed(1)}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Tons harvested</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first agricultural project</p>
            <Button onClick={() => setIsFormOpen(true)}>
              Create Your First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={openEditForm}
              onDelete={setDeleteProjectId}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteProjectId} onOpenChange={() => setDeleteProjectId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteProjectId && handleDeleteProject(deleteProjectId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectDashboard;
