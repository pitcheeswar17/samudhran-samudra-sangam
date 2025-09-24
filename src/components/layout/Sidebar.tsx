import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard,
  Search,
  BarChart3,
  Upload,
  Microscope,
  Dna,
  Database,
  FileText,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { rolePermissions } from '@/types/auth';
import { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview & Analytics'
    },
    {
      id: 'search',
      label: 'Search & Explore',
      icon: Search,
      description: 'Find Marine Data'
    },
    {
      id: 'visualization',
      label: 'Data Visualization',
      icon: BarChart3,
      description: 'Charts & Graphs'
    },
    {
      id: 'data-ingestion',
      label: 'Data Upload',
      icon: Upload,
      description: 'Import Datasets',
      requiresRole: ['researcher', 'admin']
    },
    {
      id: 'otolith',
      label: 'Otolith Analysis',
      icon: Microscope,
      description: 'Morphology Viewer',
      requiresRole: ['researcher', 'admin']
    },
    {
      id: 'edna',
      label: 'eDNA Explorer',
      icon: Dna,
      description: 'Molecular Analysis',
      requiresRole: ['researcher', 'admin']
    },
    {
      id: 'api',
      label: 'API Console',
      icon: Database,
      description: 'Integration Tools',
      requiresRole: ['researcher', 'admin']
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      description: 'Generate Reports'
    },
    {
      id: 'user-management',
      label: 'User Management',
      icon: Users,
      description: 'Manage Access',
      requiresRole: ['admin']
    }
  ];

  const filteredItems = navigationItems.filter(item => {
    if (!item.requiresRole) return true;
    return item.requiresRole.includes(user?.role || '');
  });

  const getItemBadge = (itemId: string) => {
    if (itemId === 'data-ingestion') return { text: 'New', variant: 'default' as const };
    if (itemId === 'edna') return { text: 'Beta', variant: 'secondary' as const };
    return null;
  };

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`bg-card/95 backdrop-blur-sm border-r border-ocean-surface/20 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 h-full flex flex-col">
        {/* Collapse Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {filteredItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const badge = getItemBadge(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 p-3 ${
                    isActive 
                      ? 'bg-gradient-to-r from-ocean-medium to-ocean-shallow text-white' 
                      : 'hover:bg-ocean-surface/10'
                  } ${isCollapsed ? 'px-3' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.label}</span>
                        {badge && (
                          <Badge variant={badge.variant} className="text-xs">
                            {badge.text}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs opacity-70">{item.description}</div>
                    </div>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </nav>

        {/* User Role Badge */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-ocean-surface/10 rounded-lg"
          >
            <div className="text-xs text-muted-foreground">Current Role</div>
            <Badge variant="outline" className="mt-1 capitalize">
              {user?.role}
            </Badge>
          </motion.div>
        )}

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4"
        >
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 p-3 ${isCollapsed ? 'px-3' : ''}`}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Settings</span>}
          </Button>
        </motion.div>
      </div>
    </motion.aside>
  );
};