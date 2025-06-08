
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatLandSize = (size: number, unit: string) => {
    const unitLabel = unit === 'hectares' ? 'ha' : 'm²';
    return `${size.toLocaleString()} ${unitLabel}`;
  };

  const harvestPercentage = project.harvestTarget > 0 
    ? Math.round((project.actualHarvest / project.harvestTarget) * 100) 
    : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription>
              {formatLandSize(project.landSize, project.landSizeUnit)} • {project.duration}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(project.status)}>
            {formatStatus(project.status)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Budget</p>
            <p className="font-semibold">{project.budget.toLocaleString()} {project.currency}</p>
          </div>
          <div>
            <p className="text-gray-600">Harvest Progress</p>
            <p className="font-semibold">
              {project.actualHarvest}/{project.harvestTarget} tons ({harvestPercentage}%)
            </p>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(harvestPercentage, 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(project)}
            className="flex items-center space-x-1"
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(project.id)}
            className="flex items-center space-x-1"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
