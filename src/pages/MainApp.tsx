import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { SearchExplore } from '@/components/search/SearchExplore';
import { DataVisualization } from '@/components/visualization/DataVisualization';
import { SamudhranAssistant } from '@/components/ai/SamudhranAssistant';

// Placeholder components for other tabs
const DataIngestion = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Data Upload & Ingestion</h1>
    <p className="text-muted-foreground">Upload and process marine datasets...</p>
  </div>
);

const OtolithAnalysis = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Otolith Morphology Analysis</h1>
    <p className="text-muted-foreground">Analyze fish ear stone structures...</p>
  </div>
);

const EdnaExplorer = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">eDNA Explorer</h1>
    <p className="text-muted-foreground">Environmental DNA analysis tools...</p>
  </div>
);

const ApiConsole = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">API Console</h1>
    <p className="text-muted-foreground">Integration and API testing tools...</p>
  </div>
);

const Reports = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Reports & Export</h1>
    <p className="text-muted-foreground">Generate research reports...</p>
  </div>
);

const UserManagement = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">User Management</h1>
    <p className="text-muted-foreground">Manage users and permissions...</p>
  </div>
);

export const MainApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'search':
        return <SearchExplore />;
      case 'visualization':
        return <DataVisualization />;
      case 'data-ingestion':
        return <DataIngestion />;
      case 'otolith':
        return <OtolithAnalysis />;
      case 'edna':
        return <EdnaExplorer />;
      case 'api':
        return <ApiConsole />;
      case 'reports':
        return <Reports />;
      case 'user-management':
        return <UserManagement />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background via-ocean-surface/5 to-ocean-shallow/10">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
      
      {/* Samudhran AI Assistant */}
      <SamudhranAssistant />
      
      {/* Ocean Animation Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-ocean-surface/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};