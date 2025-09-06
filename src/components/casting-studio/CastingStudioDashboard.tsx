import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Wand2, 
  Brain, 
  Palette, 
  Music, 
  Video, 
  BarChart3, 
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { CharacterCreator } from './CharacterCreator';
import { UnifiedCharacterOntology } from '@/lib/types/character-types';

export const CastingStudioDashboard: React.FC = () => {
  const [characters, setCharacters] = useState<UnifiedCharacterOntology[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  const handleCharacterCreated = (character: UnifiedCharacterOntology) => {
    setCharacters(prev => [...prev, character]);
    setActiveTab('characters');
  };

  const statsCards = [
    {
      title: 'Total Characters',
      value: characters.length.toString(),
      icon: Users,
      description: 'Digital souls created'
    },
    {
      title: 'Active Projects',
      value: '0',
      icon: Video,
      description: 'Productions in progress'
    },
    {
      title: 'Generated Media',
      value: '0',
      icon: Palette,
      description: 'Images, audio, animations'
    },
    {
      title: 'Success Rate',
      value: '95%',
      icon: BarChart3,
      description: 'Character consistency'
    }
  ];

  const ecosystemFeatures = [
    {
      title: 'Character Intelligence Core',
      description: 'Multi-dimensional character modeling with psychological depth',
      icon: Brain,
      features: ['Persona Engine', 'Visual Consistency', 'Voice Identity', 'Motion Signatures']
    },
    {
      title: 'Multi-Modal Generation',
      description: 'Comprehensive media creation across all formats',
      icon: Palette,
      features: ['2D/3D Visuals', 'Audio Synthesis', 'Animation', 'Cross-Platform Export']
    },
    {
      title: 'Professional Casting',
      description: 'Industry-grade casting and production management',
      icon: Users,
      features: ['Advanced Sheets', 'Scene Assignment', 'Relationship Management', 'Analytics']
    },
    {
      title: 'AI Orchestration',
      description: 'Intelligent coordination of multiple AI models',
      icon: Settings,
      features: ['Model Selection', 'Prompt Engineering', 'Quality Assurance', 'Cost Optimization']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Wand2 className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Casting Studio Ultimate Ecosystem
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional-grade character casting and management powered by the Digital Soul Framework. 
            Create authentic AI-driven characters with multi-dimensional depth and performance capabilities.
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="create">Create Character</TabsTrigger>
            <TabsTrigger value="characters">Characters ({characters.length})</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Ecosystem Features */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">Ecosystem Components</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ecosystemFeatures.map((feature) => (
                  <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <feature.icon className="h-5 w-5 text-primary" />
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {feature.features.map((item) => (
                          <Badge key={item} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with character creation and management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => setActiveTab('create')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Character
                  </Button>
                  <Button variant="outline">
                    <Video className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                  <Button variant="outline">
                    <Music className="mr-2 h-4 w-4" />
                    Voice Library
                  </Button>
                  <Button variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Character Tab */}
          <TabsContent value="create">
            <CharacterCreator onCharacterCreated={handleCharacterCreated} />
          </TabsContent>

          {/* Characters Tab */}
          <TabsContent value="characters" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Character Library</h2>
              <Button onClick={() => setActiveTab('create')}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Character
              </Button>
            </div>

            {characters.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Characters Yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Create your first character using the Digital Soul Framework to get started.
                  </p>
                  <Button onClick={() => setActiveTab('create')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Character
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {characters.map((character) => (
                  <Card key={character.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{character.coreIdentity.name}</CardTitle>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        {character.coreIdentity.age} years old • {character.coreIdentity.occupation}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {character.coreIdentity.background}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {character.psychologicalProfile.mbtiType}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {character.psychologicalProfile.archetypeProfile.primary}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Created: {new Date(character.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>Manage your production projects and casting assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first project to start assigning characters and managing production.
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>Production metrics and character performance analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Detailed analytics will be available once you have created characters and projects.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};