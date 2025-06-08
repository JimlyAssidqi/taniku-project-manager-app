
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface Project {
  id: string;
  name: string;
  landSize: number;
  landSizeUnit: 'hectares' | 'square_meters';
  budget: number;
  currency: string;
  duration: string;
  harvestTarget: number;
  actualHarvest: number;
  status: 'planning' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string, role: 'user' | 'admin') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}
