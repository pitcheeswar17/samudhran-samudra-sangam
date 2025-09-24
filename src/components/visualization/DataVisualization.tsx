import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Map, 
  TrendingUp, 
  PieChart,
  Activity,
  Waves,
  Fish,
  Thermometer
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  ScatterChart,
  Scatter,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';

const temperatureData = [
  { month: 'Jan', temp: 26.5, depth_5m: 26.2, depth_20m: 25.8 },
  { month: 'Feb', temp: 27.1, depth_5m: 26.8, depth_20m: 26.1 },
  { month: 'Mar', temp: 28.3, depth_5m: 27.9, depth_20m: 27.2 },
  { month: 'Apr', temp: 29.8, depth_5m: 29.4, depth_20m: 28.6 },
  { month: 'May', temp: 30.2, depth_5m: 29.8, depth_20m: 29.1 },
  { month: 'Jun', temp: 29.5, depth_5m: 29.1, depth_20m: 28.4 }
];

const speciesDistribution = [
  { name: 'Fish', count: 67, percentage: 45, color: '#1e40af' },
  { name: 'Corals', count: 23, percentage: 15, color: '#0891b2' },
  { name: 'Mollusks', count: 34, percentage: 23, color: '#0284c7' },
  { name: 'Crustaceans', count: 18, percentage: 12, color: '#06b6d4' },
  { name: 'Others', count: 8, percentage: 5, color: '#67e8f9' }
];

const biodiversityHotspots = [
  { location: 'Andaman Islands', species: 145, endemic: 23, lat: 12.2, lng: 92.9 },
  { location: 'Lakshadweep', species: 89, endemic: 12, lat: 10.6, lng: 72.2 },
  { location: 'Gulf of Mannar', species: 134, endemic: 19, lat: 9.1, lng: 79.1 },
  { location: 'Sundarbans', species: 156, endemic: 31, lat: 21.9, lng: 89.2 },
  { location: 'Western Ghats Coast', species: 98, endemic: 15, lat: 15.3, lng: 74.1 }
];

const depthProfile = [
  { depth: 0, oxygen: 8.2, salinity: 34.5, pressure: 1.0 },
  { depth: 10, oxygen: 7.9, salinity: 34.7, pressure: 2.0 },
  { depth: 20, oxygen: 7.1, salinity: 34.9, pressure: 3.0 },
  { depth: 50, oxygen: 6.3, salinity: 35.1, pressure: 6.0 },
  { depth: 100, oxygen: 5.2, salinity: 35.3, pressure: 11.0 },
  { depth: 200, oxygen: 4.1, salinity: 35.5, pressure: 21.0 }
];

export const DataVisualization = () => {
  const [selectedVisualization, setSelectedVisualization] = useState('temperature');
  const [timeRange, setTimeRange] = useState('6months');

  const visualizations = [
    { id: 'temperature', label: 'Sea Temperature', icon: Thermometer },
    { id: 'species', label: 'Species Distribution', icon: Fish },
    { id: 'hotspots', label: 'Biodiversity Hotspots', icon: Map },
    { id: 'depth', label: 'Depth Profiles', icon: Activity }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-ocean-deep to-ocean-surface bg-clip-text text-transparent">
            Data Visualization
          </h1>
          <p className="text-muted-foreground">Interactive charts and maps for marine data analysis</p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 items-center">
          <Select value={selectedVisualization} onValueChange={setSelectedVisualization}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select Visualization" />
            </SelectTrigger>
            <SelectContent>
              {visualizations.map((viz) => {
                const Icon = viz.icon;
                return (
                  <SelectItem key={viz.id} value={viz.id}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {viz.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="2years">Last 2 Years</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-ocean-medium hover:bg-ocean-deep">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Chart
          </Button>
        </div>
      </motion.div>

      {/* Visualization Tabs */}
      <Tabs value={selectedVisualization} onValueChange={setSelectedVisualization}>
        <TabsList className="grid w-full grid-cols-4">
          {visualizations.map((viz) => {
            const Icon = viz.icon;
            return (
              <TabsTrigger key={viz.id} value={viz.id} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {viz.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Temperature Visualization */}
        <TabsContent value="temperature" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-coral-warm" />
                Sea Surface Temperature Trends
              </CardTitle>
              <CardDescription>Temperature variations across different depths in the Indian Ocean</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={temperatureData}>
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
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="hsl(var(--coral-warm))" 
                    strokeWidth={3}
                    name="Surface Temperature"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="depth_5m" 
                    stroke="hsl(var(--ocean-medium))" 
                    strokeWidth={2}
                    name="5m Depth"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="depth_20m" 
                    stroke="hsl(var(--ocean-deep))" 
                    strokeWidth={2}
                    name="20m Depth"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Species Distribution */}
        <TabsContent value="species" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fish className="w-5 h-5 text-ocean-medium" />
                  Species Composition
                </CardTitle>
                <CardDescription>Distribution of marine species by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={speciesDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="percentage"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {speciesDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-ocean-shallow" />
                  Species Count by Category
                </CardTitle>
                <CardDescription>Absolute numbers of species in each category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={speciesDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar 
                      dataKey="count" 
                      fill="hsl(var(--ocean-medium))"
                      name="Species Count"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Biodiversity Hotspots */}
        <TabsContent value="hotspots" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5 text-ocean-surface" />
                Marine Biodiversity Hotspots
              </CardTitle>
              <CardDescription>Species richness and endemism across different locations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={biodiversityHotspots}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="species" 
                    name="Total Species" 
                    stroke="hsl(var(--muted-foreground))" 
                  />
                  <YAxis 
                    dataKey="endemic" 
                    name="Endemic Species" 
                    stroke="hsl(var(--muted-foreground))" 
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-card p-3 border border-border rounded-lg shadow-lg">
                            <p className="font-semibold">{data.location}</p>
                            <p className="text-sm">Total Species: {data.species}</p>
                            <p className="text-sm">Endemic Species: {data.endemic}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    dataKey="endemic" 
                    fill="hsl(var(--ocean-medium))"
                    name="Biodiversity Hotspots"
                  />
                </ScatterChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {biodiversityHotspots.map((hotspot, index) => (
                  <motion.div
                    key={hotspot.location}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-ocean-surface/10 rounded-lg"
                  >
                    <h4 className="font-semibold text-ocean-deep">{hotspot.location}</h4>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Total: {hotspot.species}</span>
                      <Badge variant="secondary">Endemic: {hotspot.endemic}</Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Depth Profiles */}
        <TabsContent value="depth" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-ocean-deep" />
                Ocean Depth Profiles
              </CardTitle>
              <CardDescription>Oceanographic parameters at different depths</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={depthProfile}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="depth" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="oxygen" 
                    stroke="hsl(var(--coral-cool))" 
                    strokeWidth={2}
                    name="Oxygen (mg/L)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="salinity" 
                    stroke="hsl(var(--ocean-medium))" 
                    strokeWidth={2}
                    name="Salinity (ppt)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pressure" 
                    stroke="hsl(var(--coral-warm))" 
                    strokeWidth={2}
                    name="Pressure (atm)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};