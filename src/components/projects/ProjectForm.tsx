
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '../../types';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    landSize: 0,
    landSizeUnit: 'hectares' as 'hectares' | 'square_meters',
    budget: 0,
    currency: 'USD',
    duration: '',
    harvestTarget: 0,
    actualHarvest: 0,
    status: 'planning' as 'planning' | 'in_progress' | 'completed',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        landSize: project.landSize,
        landSizeUnit: project.landSizeUnit,
        budget: project.budget,
        currency: project.currency,
        duration: project.duration,
        harvestTarget: project.harvestTarget,
        actualHarvest: project.actualHarvest,
        status: project.status,
      });
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{project ? 'Edit Project' : 'Add New Project'}</CardTitle>
        <CardDescription>
          {project ? 'Update your project details' : 'Create a new agricultural project'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Corn Plantation"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="landSize">Land Size</Label>
              <Input
                id="landSize"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter land size"
                value={formData.landSize || ''}
                onChange={(e) => handleChange('landSize', parseFloat(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="landSizeUnit">Land Size Unit</Label>
              <Select value={formData.landSizeUnit} onValueChange={(value) => handleChange('landSizeUnit', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hectares">Hectares</SelectItem>
                  <SelectItem value="square_meters">Square Meters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter budget amount"
                value={formData.budget || ''}
                onChange={(e) => handleChange('budget', parseFloat(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                type="text"
                placeholder="e.g., USD, EUR"
                value={formData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              type="text"
              placeholder="e.g., 5 months until harvest"
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="harvestTarget">Harvest Target (tons)</Label>
              <Input
                id="harvestTarget"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter target harvest"
                value={formData.harvestTarget || ''}
                onChange={(e) => handleChange('harvestTarget', parseFloat(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualHarvest">Actual Harvest (tons)</Label>
              <Input
                id="actualHarvest"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter actual harvest"
                value={formData.actualHarvest || ''}
                onChange={(e) => handleChange('actualHarvest', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {project ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
