// Core character type definitions for the Digital Soul Framework

export interface UnifiedCharacterOntology {
  id: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Core Identity
  coreIdentity: {
    name: string;
    age: number;
    gender: string;
    species: string;
    occupation: string;
    background: string;
  };
  
  // Psychological Profile
  psychologicalProfile: {
    mbtiType: string;
    enneagramType: string;
    oceanTraits: {
      openness: number;
      conscientiousness: number;
      extraversion: number;
      agreeableness: number;
      neuroticism: number;
    };
    archetypeProfile: {
      primary: string;
      secondary: string;
      shadowArchetype: string;
    };
  };
  
  // Visual Identity
  visualIdentity: {
    physicalFeatures: {
      height: string;
      build: string;
      hairColor: string;
      eyeColor: string;
      skinTone: string;
      distinctiveFeatures: string[];
    };
    styleProfile: {
      fashionStyle: string;
      colorPalette: string[];
      accessories: string[];
    };
    facialVector: number[]; // Mathematical representation for consistency
  };
  
  // Voice Identity
  voiceIdentity: {
    voiceType: string;
    pitch: string;
    pace: string;
    accent: string;
    emotionalRange: string[];
    speechPatterns: string[];
    voiceDNA: string; // Encoded voice characteristics
  };
  
  // Behavioral Patterns
  behavioralPatterns: {
    mannerisms: string[];
    habitsAndQuirks: string[];
    socialBehavior: string;
    stressResponses: string[];
    decisionMaking: string;
  };
  
  // Emotional Profile
  emotionalProfile: {
    emotionalIntelligence: number;
    empathy: number;
    emotionalStability: number;
    coreEmotions: string[];
    emotionalTriggers: string[];
    copingMechanisms: string[];
  };
  
  // Relationships
  relationships: CharacterRelationship[];
  
  // Backstory
  backstory: {
    childhood: string;
    formativeEvents: string[];
    education: string;
    careerHistory: string;
    personalHistory: string;
    secrets: string[];
    motivations: string[];
    fears: string[];
    desires: string[];
  };
  
  // Skills and Abilities
  skillsAndAbilities: {
    coreSkills: string[];
    talents: string[];
    weaknesses: string[];
    languages: string[];
    hobbies: string[];
  };
}

export interface CharacterRelationship {
  id: string;
  targetCharacterId: string;
  relationshipType: RelationshipType;
  strength: number; // 0-100
  description: string;
  history: string;
  currentStatus: string;
  emotionalTone: string;
}

export enum RelationshipType {
  FAMILY = 'family',
  ROMANTIC = 'romantic',
  FRIENDSHIP = 'friendship',
  PROFESSIONAL = 'professional',
  ANTAGONISTIC = 'antagonistic',
  MENTOR_MENTEE = 'mentor_mentee',
  ACQUAINTANCE = 'acquaintance'
}

export interface CharacterState {
  currentEmotion: string;
  energyLevel: number;
  stressLevel: number;
  healthStatus: string;
  mentalState: string;
  currentGoals: string[];
  currentContext: string;
}

export interface PerformanceInstructionSet {
  characterId: string;
  sceneContext: SceneContext;
  emotionalState: EmotionalState;
  physicalState: PhysicalState;
  motivations: string[];
  objectives: string[];
  actions: ActionInstruction[];
  dialogue: DialogueInstruction[];
  visualInstructions: VisualInstruction[];
  audioInstructions: AudioInstruction[];
}

export interface SceneContext {
  location: string;
  timeOfDay: string;
  weather: string;
  mood: string;
  objectives: string[];
  obstacles: string[];
  otherCharacters: string[];
  previousEvents: string[];
}

export interface EmotionalState {
  primary: string;
  secondary: string[];
  intensity: number; // 0-100
  triggers: string[];
  physicalManifestations: string[];
}

export interface PhysicalState {
  posture: string;
  gestures: string[];
  facialExpression: string;
  eyeContact: string;
  movement: string;
  breathing: string;
}

export interface ActionInstruction {
  type: 'gesture' | 'movement' | 'expression' | 'interaction';
  description: string;
  timing: string;
  intensity: number;
  purpose: string;
}

export interface DialogueInstruction {
  text: string;
  tone: string;
  pace: string;
  volume: string;
  emphasis: string[];
  subtext: string;
}

export interface VisualInstruction {
  type: 'pose' | 'expression' | 'costume' | 'lighting' | 'camera';
  parameters: Record<string, any>;
  priority: number;
}

export interface AudioInstruction {
  type: 'dialogue' | 'sound_effect' | 'music' | 'ambience';
  parameters: Record<string, any>;
  timing: number;
}

export interface SynthesizedPerformance {
  characterId: string;
  timestamp: Date;
  visual: VisualPerformance;
  audio: AudioPerformance;
  animation: AnimationPerformance;
  metadata: PerformanceMetadata;
}

export interface VisualPerformance {
  images: GeneratedImage[];
  quality: QualityMetrics;
  consistency: ConsistencyMetrics;
}

export interface AudioPerformance {
  audioFiles: GeneratedAudio[];
  quality: QualityMetrics;
  voiceConsistency: number;
}

export interface AnimationPerformance {
  animations: GeneratedAnimation[];
  motionData: MotionData[];
  quality: QualityMetrics;
}

export interface GeneratedImage {
  url: string;
  format: string;
  resolution: string;
  style: string;
  prompt: string;
  model: string;
}

export interface GeneratedAudio {
  url: string;
  format: string;
  duration: number;
  model: string;
  voice: string;
}

export interface GeneratedAnimation {
  url: string;
  format: string;
  duration: number;
  frameRate: number;
  model: string;
}

export interface MotionData {
  joints: JointData[];
  timing: number[];
  interpolation: string;
}

export interface JointData {
  name: string;
  position: [number, number, number];
  rotation: [number, number, number, number];
}

export interface QualityMetrics {
  overall: number;
  detail: number;
  consistency: number;
  realism: number;
  artisticValue: number;
}

export interface ConsistencyMetrics {
  facialSimilarity: number;
  styleSimilarity: number;
  colorConsistency: number;
  proportionConsistency: number;
}

export interface PerformanceMetadata {
  generationTime: number;
  modelUsed: string;
  qualityScore: number;
  consistencyScore: number;
  cost: number;
  version: string;
}

export interface CastingSheet {
  id: string;
  projectId: string;
  title: string;
  description: string;
  characters: CharacterCastingInfo[];
  scenes: SceneCastingInfo[];
  requirements: CastingRequirements;
  createdAt: Date;
  updatedAt: Date;
}

export interface CharacterCastingInfo {
  characterId: string;
  role: string;
  importance: 'lead' | 'supporting' | 'background';
  screenTime: number;
  sceneCount: number;
  dialogueLines: number;
  requirements: string[];
}

export interface SceneCastingInfo {
  sceneId: string;
  characters: string[];
  location: string;
  requirements: string[];
  estimatedDuration: number;
}

export interface CastingRequirements {
  technical: {
    resolution: string;
    format: string[];
    quality: string;
  };
  creative: {
    style: string;
    mood: string;
    themes: string[];
  };
  production: {
    timeline: string;
    budget: number;
    deliverables: string[];
  };
}