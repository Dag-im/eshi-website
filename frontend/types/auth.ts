export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'client';
  isActive: boolean;
  mustChangePassword: boolean;
}
