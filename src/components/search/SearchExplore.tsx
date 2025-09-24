import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Fish, 
  Microscope,
  Database,
  Eye,
  Download
} from 'lucide-react';

const mockDatasets = [
  {
    id: '1',
    title: 'Arabian Sea Fish Species Diversity',
    description: 'Comprehensive survey of fish species in the Arabian Sea region',
    type: 'Biodiversity',
    location: 'Arabian Sea',
    date: '2024-01-15',
    samples: 450,
    species: 67,
    image: '🐟',
    tags: ['Fish', 'Diversity', 'Survey']
  },
  {
    id: '2',
    title: 'Coral Reef Health Assessment',
    description: 'Health status and bleaching patterns in coral reefs',
    type: 'Ecology',
    location: 'Lakshadweep',
    date: '2024-02-20',
    samples: 120,
    species: 23,
    image: '🪸',
    tags: ['Coral', 'Health', 'Climate']
  },
  {
    id: '3',
    title: 'Mangrove Ecosystem Analysis',
    description: 'Biodiversity and carbon sequestration in mangrove forests',
    type: 'Ecosystem',
    location: 'Sundarbans',
    date: '2024-03-10',
    samples: 234,
    species: 89,
    image: '🌿',
    tags: ['Mangrove', 'Carbon', 'Biodiversity']
  },
  {
    id: '4',
    title: 'eDNA Metabarcoding Study',
    description: 'Environmental DNA analysis for marine biodiversity assessment',
    type: 'Molecular',
    location: 'Bay of Bengal',
    date: '2024-02-28',
    samples: 78,
    species: 156,
    image: '🧬',
    tags: ['eDNA', 'Molecular', 'Biodiversity']
  }
];

const mockSpecies = [
  {
    id: '1',
    name: 'Lutjanus argentimaculatus',
    commonName: 'Mangrove Red Snapper',
    status: 'Vulnerable',
    habitat: 'Mangrove, Coastal',
    image: '🐟',
    samples: 45
  },
  {
    id: '2',
    name: 'Acropora millepora',
    commonName: 'Staghorn Coral',
    status: 'Endangered',
    habitat: 'Coral Reef',
    image: '🪸',
    samples: 23
  },
  {
    id: '3',
    name: 'Chelonia mydas',
    commonName: 'Green Sea Turtle',
    status: 'Endangered',
    habitat: 'Open Ocean, Coastal',
    image: '🐢',
    samples: 12
  }
];

export const SearchExplore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [activeTab, setActiveTab] = useState('datasets');

  const filteredDatasets = mockDatasets.filter(dataset => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || dataset.type.toLowerCase() === selectedType;
    const matchesLocation = selectedLocation === 'all' || dataset.location.toLowerCase().includes(selectedLocation);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const filteredSpecies = mockSpecies.filter(species => 
    species.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    species.commonName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Search & Explore
          </h1>
          <p className="text-muted-foreground">Discover marine datasets, species, and research findings</p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search datasets, species, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
          <Button className="h-12 px-6 bg-ocean-medium hover:bg-ocean-deep">
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Data Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="biodiversity">Biodiversity</SelectItem>
              <SelectItem value="ecology">Ecology</SelectItem>
              <SelectItem value="ecosystem">Ecosystem</SelectItem>
              <SelectItem value="molecular">Molecular</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="arabian">Arabian Sea</SelectItem>
              <SelectItem value="bay">Bay of Bengal</SelectItem>
              <SelectItem value="lakshadweep">Lakshadweep</SelectItem>
              <SelectItem value="sundarbans">Sundarbans</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="datasets" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Datasets ({filteredDatasets.length})
          </TabsTrigger>
          <TabsTrigger value="species" className="flex items-center gap-2">
            <Fish className="w-4 h-4" />
            Species ({filteredSpecies.length})
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Microscope className="w-4 h-4" />
            Analysis Tools
          </TabsTrigger>
        </TabsList>

        {/* Datasets Tab */}
        <TabsContent value="datasets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDatasets.map((dataset, index) => (
              <motion.div
                key={dataset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{dataset.image}</div>
                        <div>
                          <CardTitle className="group-hover:text-ocean-medium transition-colors">
                            {dataset.title}
                          </CardTitle>
                          <CardDescription>{dataset.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{dataset.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {dataset.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {dataset.date}
                        </div>
                      </div>

                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-ocean-medium">{dataset.samples}</div>
                          <div className="text-muted-foreground">Samples</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-ocean-medium">{dataset.species}</div>
                          <div className="text-muted-foreground">Species</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {dataset.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Species Tab */}
        <TabsContent value="species" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpecies.map((species, index) => (
              <motion.div
                key={species.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center space-y-3">
                      <div className="text-6xl">{species.image}</div>
                      <div>
                        <h3 className="font-semibold italic">{species.name}</h3>
                        <p className="text-lg">{species.commonName}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Badge 
                          variant={species.status === 'Endangered' ? 'destructive' : 'secondary'}
                          className="w-full"
                        >
                          {species.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground">{species.habitat}</p>
                        <p className="text-sm">
                          <span className="font-medium">{species.samples}</span> samples collected
                        </p>
                      </div>

                      <Button size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Analysis Tools Tab */}
        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Species Identification',
                description: 'AI-powered species identification from images',
                icon: '🔍',
                action: 'Start Analysis'
              },
              {
                title: 'Biodiversity Calculator',
                description: 'Calculate Shannon and Simpson diversity indices',
                icon: '📊',
                action: 'Calculate'
              },
              {
                title: 'Phylogenetic Analysis',
                description: 'Build evolutionary trees from molecular data',
                icon: '🌳',
                action: 'Analyze'
              },
              {
                title: 'Habitat Modeling',
                description: 'Predict species distribution based on environmental factors',
                icon: '🗺️',
                action: 'Model'
              },
              {
                title: 'Statistical Tools',
                description: 'Perform statistical analysis on marine datasets',
                icon: '📈',
                action: 'Analyze'
              },
              {
                title: 'Data Visualization',
                description: 'Create interactive charts and maps',
                icon: '📉',
                action: 'Visualize'
              }
            ].map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="text-4xl">{tool.icon}</div>
                    <div>
                      <h3 className="font-semibold group-hover:text-ocean-medium transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                    <Button className="w-full">
                      {tool.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};