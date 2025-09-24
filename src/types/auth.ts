export type UserRole = 'user' | 'researcher' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization?: string;
  avatar?: string;
  preferredLanguage: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const rolePermissions = {
  user: {
    canView: ['dashboard', 'search', 'visualization', 'reports'],
    canEdit: [],
    canManage: []
  },
  researcher: {
    canView: ['dashboard', 'search', 'visualization', 'reports', 'data-ingestion', 'otolith', 'edna', 'api'],
    canEdit: ['data-ingestion', 'analysis'],
    canManage: ['datasets']
  },
  admin: {
    canView: ['dashboard', 'search', 'visualization', 'reports', 'data-ingestion', 'otolith', 'edna', 'api', 'user-management'],
    canEdit: ['data-ingestion', 'analysis', 'users', 'roles'],
    canManage: ['datasets', 'users', 'system']
  }
} as const;