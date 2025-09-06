import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2, User, Brain, Heart, Palette } from 'lucide-react';
import { CharacterDefinitionEngine } from '@/lib/digital-soul-framework/character-definition-engine';
import { UnifiedCharacterOntology } from '@/lib/types/character-types';
import { useToast } from '@/hooks/use-toast';

interface CharacterCreatorProps {
  onCharacterCreated?: (character: UnifiedCharacterOntology) => void;
}

export const CharacterCreator: React.FC<CharacterCreatorProps> = ({ onCharacterCreated }) => {
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [character, setCharacter] = useState<UnifiedCharacterOntology | null>(null);
  const { toast } = useToast();

  const characterEngine = new CharacterDefinitionEngine();

  const handleCreateCharacter = async () => {
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please provide a character description to begin creation.",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    try {
      const newCharacter = await characterEngine.createCharacter(description);
      setCharacter(newCharacter);
      onCharacterCreated?.(newCharacter);
      
      toast({
        title: "Character Created Successfully",
        description: `${newCharacter.coreIdentity.name} has been brought to life with the Digital Soul Framework.`
      });
    } catch (error) {
      toast({
        title: "Character Creation Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleReset = () => {
    setCharacter(null);
    setDescription('');
  };

  if (character) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">{character.coreIdentity.name}</h2>
          </div>
          <Button onClick={handleReset} variant="outline">
            Create New Character
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Core Identity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Core Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-sm text-muted-foreground">{character.coreIdentity.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Age</Label>
                <p className="text-sm text-muted-foreground">{character.coreIdentity.age} years old</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Occupation</Label>
                <p className="text-sm text-muted-foreground">{character.coreIdentity.occupation}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Background</Label>
                <p className="text-sm text-muted-foreground line-clamp-3">{character.coreIdentity.background}</p>
              </div>
            </CardContent>
          </Card>

          {/* Psychological Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Psychology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">MBTI Type</Label>
                <Badge variant="secondary">{character.psychologicalProfile.mbtiType}</Badge>
              </div>
              <div>
                <Label className="text-sm font-medium">Enneagram</Label>
                <Badge variant="secondary">{character.psychologicalProfile.enneagramType}</Badge>
              </div>
              <div>
                <Label className="text-sm font-medium">Primary Archetype</Label>
                <Badge variant="outline">{character.psychologicalProfile.archetypeProfile.primary}</Badge>
              </div>
              <div>
                <Label className="text-sm font-medium">OCEAN Traits</Label>
                <div className="space-y-1">
                  {Object.entries(character.psychologicalProfile.oceanTraits).map(([trait, value]) => (
                    <div key={trait} className="flex justify-between items-center">
                      <span className="text-xs capitalize">{trait}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all" 
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emotional Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Emotional Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Emotional Intelligence</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${character.emotionalProfile.emotionalIntelligence}%` }}
                    />
                  </div>
                  <span className="text-sm">{character.emotionalProfile.emotionalIntelligence}%</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Core Emotions</Label>
                <div className="flex flex-wrap gap-1">
                  {character.emotionalProfile.coreEmotions.map((emotion) => (
                    <Badge key={emotion} variant="outline" className="text-xs">
                      {emotion}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Coping Mechanisms</Label>
                <div className="space-y-1">
                  {character.emotionalProfile.copingMechanisms.map((mechanism, index) => (
                    <p key={index} className="text-xs text-muted-foreground">• {mechanism}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Identity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Visual Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Physical Features</Label>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Height: {character.visualIdentity.physicalFeatures.height}</p>
                  <p className="text-xs text-muted-foreground">Build: {character.visualIdentity.physicalFeatures.build}</p>
                  <p className="text-xs text-muted-foreground">Hair: {character.visualIdentity.physicalFeatures.hairColor}</p>
                  <p className="text-xs text-muted-foreground">Eyes: {character.visualIdentity.physicalFeatures.eyeColor}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Style Profile</Label>
                <p className="text-xs text-muted-foreground">{character.visualIdentity.styleProfile.fashionStyle}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Color Palette</Label>
                <div className="flex flex-wrap gap-1">
                  {character.visualIdentity.styleProfile.colorPalette.map((color) => (
                    <Badge key={color} variant="secondary" className="text-xs">
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voice Identity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Voice Identity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Voice Type</Label>
                <p className="text-sm text-muted-foreground">{character.voiceIdentity.voiceType}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Speech Characteristics</Label>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Pitch: {character.voiceIdentity.pitch}</p>
                  <p className="text-xs text-muted-foreground">Pace: {character.voiceIdentity.pace}</p>
                  <p className="text-xs text-muted-foreground">Accent: {character.voiceIdentity.accent}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Speech Patterns</Label>
                <div className="space-y-1">
                  {character.voiceIdentity.speechPatterns.map((pattern, index) => (
                    <p key={index} className="text-xs text-muted-foreground">• {pattern}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Abilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Skills & Abilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Core Skills</Label>
                <div className="flex flex-wrap gap-1">
                  {character.skillsAndAbilities.coreSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Talents</Label>
                <div className="flex flex-wrap gap-1">
                  {character.skillsAndAbilities.talents.map((talent) => (
                    <Badge key={talent} variant="outline" className="text-xs">
                      {talent}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Hobbies</Label>
                <div className="flex flex-wrap gap-1">
                  {character.skillsAndAbilities.hobbies.map((hobby) => (
                    <Badge key={hobby} variant="secondary" className="text-xs">
                      {hobby}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary" />
          Digital Soul Framework - Character Creator
        </CardTitle>
        <CardDescription>
          Describe your character in natural language and watch as the Digital Soul Framework creates 
          a multi-dimensional being with authentic psychological depth, emotional resonance, and 
          performance capabilities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="character-description">Character Description</Label>
          <Textarea
            id="character-description"
            placeholder="Describe your character... For example: 'Maya is a 28-year-old teacher who grew up in a small town. She's naturally empathetic and has a dry sense of humor, but can be quite anxious in new situations. She loves reading mystery novels and has a habit of organizing everything around her when she's stressed. Maya is tall with curly brown hair and expressive green eyes, and she has a warm, melodic voice that puts her students at ease.'"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="resize-none"
          />
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={handleCreateCharacter}
            disabled={isCreating || !description.trim()}
            size="lg"
            className="min-w-[200px]"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Digital Soul...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Create Character
              </>
            )}
          </Button>
        </div>

        <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">What the Digital Soul Framework will create:</h4>
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>Unified Character Ontology</strong> - Complete psychological and behavioral modeling</li>
            <li><strong>MBTI & Enneagram Profiles</strong> - Scientifically-based personality assessment</li>
            <li><strong>Jungian Archetypes</strong> - Deep archetypal character foundation</li>
            <li><strong>Visual Consistency Engine</strong> - Maintaining character appearance across media</li>
            <li><strong>Voice Identity System</strong> - Unique vocal characteristics and speech patterns</li>
            <li><strong>Behavioral AI</strong> - Authentic character decision-making and reactions</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};