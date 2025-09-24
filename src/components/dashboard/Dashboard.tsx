import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Database, 
  Fish, 
  Waves, 
  Activity,
  Upload,
  Eye,
  BarChart3,
  Users,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import marineHero from '@/assets/marine-hero.jpg';

const biodiversityData = [
  { month: 'Jan', species: 45, samples: 120 },
  { month: 'Feb', species: 52, samples: 145 },
  { month: 'Mar', species: 48, samples: 132 },
  { month: 'Apr', species: 61, samples: 178 },
  { month: 'May', species: 58, samples: 165 },
  { month: 'Jun', species: 67, samples: 201 }
];

const dataSourcesData = [
  { name: 'Field Surveys', value: 45, color: 'hsl(var(--ocean-deep))' },
  { name: 'Satellite Data', value: 30, color: 'hsl(var(--ocean-medium))' },
  { name: 'Laboratory Analysis', value: 15, color: 'hsl(var(--ocean-shallow))' },
  { name: 'Citizen Science', value: 10, color: 'hsl(var(--ocean-surface))' }
];

const recentActivities = [
  { id: 1, type: 'upload', description: 'New eDNA dataset uploaded', time: '2 hours ago', user: 'Dr. Sharma' },
  { id: 2, type: 'analysis', description: 'Species identification completed', time: '4 hours ago', user: 'Marine Team' },
  { id: 3, type: 'report', description: 'Monthly biodiversity report generated', time: '1 day ago', user: 'System' },
  { id: 4, type: 'alert', description: 'Unusual species migration detected', time: '2 days ago', user: 'AI Monitor' }
];

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export const Dashboard = ({ setActiveTab }: DashboardProps) => {
  const { user } = useAuth();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload': return <Upload className="w-4 h-4 text-coral-cool" />;
      case 'analysis': return <Activity className="w-4 h-4 text-ocean-shallow" />;
      case 'report': return <BarChart3 className="w-4 h-4 text-ocean-medium" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-coral-warm" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const quickStats = [
    { 
      title: 'Total Species', 
      value: '1,247', 
      change: '+12%', 
      icon: Fish,
      description: 'Documented marine species'
    },
    { 
      title: 'Active Datasets', 
      value: '89', 
      change: '+5%', 
      icon: Database,
      description: 'Research datasets available'
    },
    { 
      title: 'Data Points', 
      value: '2.3M', 
      change: '+18%', 
      icon: Waves,
      description: 'Oceanographic measurements'
    },
    { 
      title: 'Research Teams', 
      value: '34', 
      change: '+2%', 
      icon: Users,
      description: 'Active research groups'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl"
      >
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${marineHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/80 to-ocean-medium/60" />
          <div className="relative z-10 p-8 text-white">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold mb-2"
            >
              Welcome back, {user?.name}! 🌊
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg opacity-90 mb-4"
            >
              Explore marine biodiversity data and insights from across the Indian Ocean
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-3"
            >
              <Button 
                onClick={() => setActiveTab('search')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
              >
                Start Exploring
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('visualization')}
                className="border-white/30 text-white hover:bg-white/10"
              >
                View Analytics
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <Badge variant="secondary" className="text-xs">
                          {stat.change}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                    </div>
                    <div className="p-3 bg-ocean-surface/20 rounded-lg">
                      <Icon className="w-6 h-6 text-ocean-medium" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Biodiversity Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-ocean-medium" />
                Biodiversity Trends
              </CardTitle>
              <CardDescription>Species discoveries and sample collection over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={biodiversityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="species" 
                    stroke="hsl(var(--ocean-medium))" 
                    fill="hsl(var(--ocean-surface))" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Sources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-ocean-medium" />
                Data Sources
              </CardTitle>
              <CardDescription>Distribution of marine data collection methods</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataSourcesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {dataSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-ocean-medium" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-ocean-surface/5 transition-colors"
                >
                  <div className="p-2 bg-ocean-surface/20 rounded-lg">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">by {activity.user}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};