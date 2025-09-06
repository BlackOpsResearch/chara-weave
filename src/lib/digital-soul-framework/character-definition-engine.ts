// Character Definition Engine (CDE) - Foundation layer for creating AI actors

import { UnifiedCharacterOntology, CharacterState, SceneContext } from '../types/character-types';

export interface ExtractedCharacterData {
  basicInfo: {
    name?: string;
    age?: number;
    gender?: string;
    occupation?: string;
    description?: string;
  };
  personalityTraits: string[];
  physicalFeatures: string[];
  behavioralPatterns: string[];
  backgroundElements: string[];
  relationships: string[];
  skills: string[];
}

export interface ArchetypeProfile {
  primary: string;
  secondary: string;
  confidence: number;
  characteristics: string[];
  motivations: string[];
  fears: string[];
  growth_arc: string;
}

export interface PsychometricProfile {
  mbti: {
    type: string;
    confidence: number;
    breakdown: {
      E_I: number; // Extraversion vs Introversion
      S_N: number; // Sensing vs Intuition  
      T_F: number; // Thinking vs Feeling
      J_P: number; // Judging vs Perceiving
    };
  };
  enneagram: {
    type: number;
    wing: number;
    confidence: number;
    description: string;
  };
  ocean: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
}

export class CharacterDefinitionEngine {
  private nlpProcessor: NLPProcessor;
  private archetypeAnalyzer: ArchetypeAnalyzer;
  private psychometricAnalyzer: PsychometricAnalyzer;
  private backstoryProcessor: BackstoryProcessor;
  private validator: CharacterValidator;

  constructor() {
    this.nlpProcessor = new NLPProcessor();
    this.archetypeAnalyzer = new ArchetypeAnalyzer();
    this.psychometricAnalyzer = new PsychometricAnalyzer();
    this.backstoryProcessor = new BackstoryProcessor();
    this.validator = new CharacterValidator();
  }

  /**
   * Main entry point for creating a character from natural language description
   */
  async createCharacter(
    description: string, 
    context?: SceneContext
  ): Promise<UnifiedCharacterOntology> {
    try {
      // Phase 1: Extract character data from natural language
      const extractedData = await this.nlpProcessor.extractCharacterData(description);
      
      // Phase 2: Determine character archetypes
      const archetypeProfile = await this.archetypeAnalyzer.analyzeArchetype(extractedData);
      
      // Phase 3: Generate psychometric profile
      const psychometricProfile = await this.psychometricAnalyzer.generateProfile(
        extractedData, 
        archetypeProfile
      );
      
      // Phase 4: Process backstory and context
      const backstory = await this.backstoryProcessor.generateBackstory(
        extractedData, 
        archetypeProfile, 
        context
      );
      
      // Phase 5: Construct unified character ontology
      const characterOntology = this.constructCharacterOntology(
        extractedData,
        archetypeProfile,
        psychometricProfile,
        backstory
      );
      
      // Phase 6: Validate and enrich character
      const validatedCharacter = await this.validator.validateAndEnrich(characterOntology);
      
      return validatedCharacter;
    } catch (error) {
      throw new Error(`Character creation failed: ${error.message}`);
    }
  }

  /**
   * Update existing character with new information
   */
  async updateCharacter(
    characterId: string, 
    updates: Partial<UnifiedCharacterOntology>
  ): Promise<UnifiedCharacterOntology> {
    const existingCharacter = await this.getCharacter(characterId);
    const updatedCharacter = { ...existingCharacter, ...updates };
    return await this.validator.validateAndEnrich(updatedCharacter);
  }

  /**
   * Get character by ID
   */
  async getCharacter(characterId: string): Promise<UnifiedCharacterOntology> {
    // In a real implementation, this would fetch from database
    throw new Error('Character not found');
  }

  /**
   * Construct the unified character ontology from analyzed components
   */
  private constructCharacterOntology(
    extractedData: ExtractedCharacterData,
    archetypeProfile: ArchetypeProfile,
    psychometricProfile: PsychometricProfile,
    backstory: any
  ): UnifiedCharacterOntology {
    const characterId = this.generateCharacterId();
    const now = new Date();

    return {
      id: characterId,
      version: '1.0.0',
      createdAt: now,
      updatedAt: now,
      
      coreIdentity: {
        name: extractedData.basicInfo.name || 'Unnamed Character',
        age: extractedData.basicInfo.age || 25,
        gender: extractedData.basicInfo.gender || 'Non-binary',
        species: 'Human',
        occupation: extractedData.basicInfo.occupation || 'Unknown',
        background: extractedData.basicInfo.description || 'No description provided'
      },
      
      psychologicalProfile: {
        mbtiType: psychometricProfile.mbti.type,
        enneagramType: `${psychometricProfile.enneagram.type}w${psychometricProfile.enneagram.wing}`,
        oceanTraits: psychometricProfile.ocean,
        archetypeProfile: {
          primary: archetypeProfile.primary,
          secondary: archetypeProfile.secondary,
          shadowArchetype: this.determineShadowArchetype(archetypeProfile.primary)
        }
      },
      
      visualIdentity: {
        physicalFeatures: this.extractPhysicalFeatures(extractedData.physicalFeatures),
        styleProfile: this.generateStyleProfile(extractedData, archetypeProfile),
        facialVector: this.generateFacialVector()
      },
      
      voiceIdentity: {
        voiceType: this.determineVoiceType(psychometricProfile, archetypeProfile),
        pitch: this.determinePitch(extractedData.basicInfo.gender, extractedData.basicInfo.age),
        pace: this.determinePace(psychometricProfile.ocean),
        accent: 'Neutral',
        emotionalRange: this.determineEmotionalRange(psychometricProfile),
        speechPatterns: this.generateSpeechPatterns(psychometricProfile, archetypeProfile),
        voiceDNA: this.generateVoiceDNA()
      },
      
      behavioralPatterns: {
        mannerisms: extractedData.behavioralPatterns,
        habitsAndQuirks: this.generateHabitsAndQuirks(psychometricProfile),
        socialBehavior: this.determineSocialBehavior(psychometricProfile.ocean),
        stressResponses: this.generateStressResponses(psychometricProfile),
        decisionMaking: this.determineDecisionMakingStyle(psychometricProfile)
      },
      
      emotionalProfile: {
        emotionalIntelligence: this.calculateEmotionalIntelligence(psychometricProfile),
        empathy: psychometricProfile.ocean.agreeableness,
        emotionalStability: 100 - psychometricProfile.ocean.neuroticism,
        coreEmotions: this.determineCoreEmotions(psychometricProfile),
        emotionalTriggers: this.generateEmotionalTriggers(archetypeProfile),
        copingMechanisms: this.generateCopingMechanisms(psychometricProfile)
      },
      
      relationships: [],
      
      backstory: backstory,
      
      skillsAndAbilities: {
        coreSkills: extractedData.skills,
        talents: this.generateTalents(psychometricProfile, archetypeProfile),
        weaknesses: this.generateWeaknesses(psychometricProfile, archetypeProfile),
        languages: ['English'],
        hobbies: this.generateHobbies(psychometricProfile)
      }
    };
  }

  private generateCharacterId(): string {
    return `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private extractPhysicalFeatures(features: string[]) {
    return {
      height: 'Average',
      build: 'Average',
      hairColor: 'Brown',
      eyeColor: 'Brown',
      skinTone: 'Medium',
      distinctiveFeatures: features
    };
  }

  private generateStyleProfile(data: ExtractedCharacterData, archetype: ArchetypeProfile) {
    return {
      fashionStyle: this.determineFashionStyle(archetype),
      colorPalette: this.generateColorPalette(archetype),
      accessories: this.generateAccessories(archetype)
    };
  }

  private generateFacialVector(): number[] {
    // Generate a 128-dimensional facial feature vector
    return Array.from({ length: 128 }, () => Math.random());
  }

  private determineVoiceType(psychometric: PsychometricProfile, archetype: ArchetypeProfile): string {
    if (psychometric.ocean.extraversion > 70) return 'Confident and Clear';
    if (psychometric.ocean.extraversion < 30) return 'Soft and Thoughtful';
    return 'Balanced and Warm';
  }

  private determinePitch(gender?: string, age?: number): string {
    if (!gender || !age) return 'Medium';
    if (gender.toLowerCase().includes('female')) return age < 30 ? 'Medium-High' : 'Medium';
    if (gender.toLowerCase().includes('male')) return age < 30 ? 'Medium' : 'Medium-Low';
    return 'Medium';
  }

  private determinePace(ocean: any): string {
    if (ocean.conscientiousness > 70) return 'Measured';
    if (ocean.extraversion > 70) return 'Quick';
    return 'Moderate';
  }

  private determineEmotionalRange(psychometric: PsychometricProfile): string[] {
    const range = ['calm', 'happy', 'concerned'];
    if (psychometric.ocean.neuroticism > 60) range.push('anxious', 'worried');
    if (psychometric.ocean.extraversion > 60) range.push('excited', 'enthusiastic');
    if (psychometric.ocean.agreeableness > 60) range.push('compassionate', 'understanding');
    return range;
  }

  private generateSpeechPatterns(psychometric: PsychometricProfile, archetype: ArchetypeProfile): string[] {
    const patterns = [];
    if (psychometric.ocean.conscientiousness > 70) patterns.push('Precise language');
    if (psychometric.ocean.openness > 70) patterns.push('Creative metaphors');
    if (archetype.primary === 'Hero') patterns.push('Decisive statements');
    return patterns;
  }

  private generateVoiceDNA(): string {
    return `voice_${Math.random().toString(36).substr(2, 16)}`;
  }

  private generateHabitsAndQuirks(psychometric: PsychometricProfile): string[] {
    const quirks = [];
    if (psychometric.ocean.neuroticism > 60) quirks.push('Fidgets when nervous');
    if (psychometric.ocean.conscientiousness > 70) quirks.push('Always checks things twice');
    if (psychometric.ocean.openness > 70) quirks.push('Collects interesting objects');
    return quirks;
  }

  private determineSocialBehavior(ocean: any): string {
    if (ocean.extraversion > 70) return 'Highly social and outgoing';
    if (ocean.extraversion < 30) return 'Prefers small groups or solitude';
    return 'Comfortable in most social situations';
  }

  private generateStressResponses(psychometric: PsychometricProfile): string[] {
    const responses = [];
    if (psychometric.ocean.neuroticism > 60) responses.push('Becomes anxious quickly');
    if (psychometric.ocean.conscientiousness > 70) responses.push('Becomes more organized');
    if (psychometric.ocean.extraversion > 60) responses.push('Seeks social support');
    return responses;
  }

  private determineDecisionMakingStyle(psychometric: PsychometricProfile): string {
    if (psychometric.mbti.breakdown.T_F > 50) return 'Logical and analytical';
    return 'Values-based and empathetic';
  }

  private calculateEmotionalIntelligence(psychometric: PsychometricProfile): number {
    return Math.round((psychometric.ocean.agreeableness + (100 - psychometric.ocean.neuroticism)) / 2);
  }

  private determineCoreEmotions(psychometric: PsychometricProfile): string[] {
    const emotions = ['contentment'];
    if (psychometric.ocean.extraversion > 60) emotions.push('joy');
    if (psychometric.ocean.neuroticism > 60) emotions.push('anxiety');
    if (psychometric.ocean.agreeableness > 60) emotions.push('compassion');
    return emotions;
  }

  private generateEmotionalTriggers(archetype: ArchetypeProfile): string[] {
    return archetype.fears.slice(0, 3);
  }

  private generateCopingMechanisms(psychometric: PsychometricProfile): string[] {
    const mechanisms = [];
    if (psychometric.ocean.extraversion > 60) mechanisms.push('Talking to friends');
    if (psychometric.ocean.conscientiousness > 60) mechanisms.push('Making lists and plans');
    if (psychometric.ocean.openness > 60) mechanisms.push('Creative expression');
    return mechanisms;
  }

  private determineShadowArchetype(primaryArchetype: string): string {
    const shadowMap: Record<string, string> = {
      'Hero': 'Destroyer',
      'Lover': 'Addict',
      'Sage': 'Know-it-all',
      'Innocent': 'Victim',
      'Explorer': 'Escapist',
      'Ruler': 'Tyrant',
      'Creator': 'Perfectionist',
      'Caregiver': 'Martyr',
      'Magician': 'Manipulator',
      'Outlaw': 'Criminal',
      'Everyman': 'Victim',
      'Jester': 'Cruel Trickster'
    };
    return shadowMap[primaryArchetype] || 'Shadow';
  }

  private determineFashionStyle(archetype: ArchetypeProfile): string {
    const styleMap: Record<string, string> = {
      'Hero': 'Classic and Strong',
      'Lover': 'Romantic and Flowing',
      'Sage': 'Intellectual and Refined',
      'Innocent': 'Simple and Pure',
      'Explorer': 'Adventurous and Practical',
      'Ruler': 'Authoritative and Luxurious',
      'Creator': 'Artistic and Unique',
      'Caregiver': 'Comfortable and Nurturing',
      'Magician': 'Mysterious and Transformative',
      'Outlaw': 'Rebellious and Edgy',
      'Everyman': 'Relatable and Casual',
      'Jester': 'Playful and Colorful'
    };
    return styleMap[archetype.primary] || 'Casual';
  }

  private generateColorPalette(archetype: ArchetypeProfile): string[] {
    const paletteMap: Record<string, string[]> = {
      'Hero': ['navy', 'gold', 'red'],
      'Lover': ['rose', 'pink', 'cream'],
      'Sage': ['navy', 'gray', 'white'],
      'Innocent': ['white', 'light blue', 'soft yellow'],
      'Explorer': ['khaki', 'forest green', 'brown'],
      'Ruler': ['purple', 'gold', 'black'],
      'Creator': ['orange', 'purple', 'teal'],
      'Caregiver': ['soft green', 'cream', 'light brown'],
      'Magician': ['deep purple', 'silver', 'black'],
      'Outlaw': ['black', 'red', 'dark gray'],
      'Everyman': ['denim blue', 'gray', 'white'],
      'Jester': ['bright yellow', 'orange', 'green']
    };
    return paletteMap[archetype.primary] || ['gray', 'blue', 'white'];
  }

  private generateAccessories(archetype: ArchetypeProfile): string[] {
    const accessoryMap: Record<string, string[]> = {
      'Hero': ['watch', 'medal'],
      'Lover': ['jewelry', 'scarf'],
      'Sage': ['glasses', 'book'],
      'Innocent': ['simple necklace'],
      'Explorer': ['backpack', 'compass'],
      'Ruler': ['crown', 'ring'],
      'Creator': ['art supplies', 'unique jewelry'],
      'Caregiver': ['practical bag', 'comfortable shoes'],
      'Magician': ['mysterious pendant', 'unusual rings'],
      'Outlaw': ['leather jacket', 'boots'],
      'Everyman': ['baseball cap', 'sneakers'],
      'Jester': ['colorful hat', 'fun accessories']
    };
    return accessoryMap[archetype.primary] || ['watch'];
  }

  private generateTalents(psychometric: PsychometricProfile, archetype: ArchetypeProfile): string[] {
    const talents = [];
    if (psychometric.ocean.openness > 70) talents.push('Creative thinking');
    if (psychometric.ocean.conscientiousness > 70) talents.push('Organization');
    if (psychometric.ocean.extraversion > 70) talents.push('Leadership');
    if (psychometric.ocean.agreeableness > 70) talents.push('Empathy');
    return talents;
  }

  private generateWeaknesses(psychometric: PsychometricProfile, archetype: ArchetypeProfile): string[] {
    const weaknesses = [];
    if (psychometric.ocean.neuroticism > 70) weaknesses.push('Anxiety under pressure');
    if (psychometric.ocean.conscientiousness < 30) weaknesses.push('Disorganization');
    if (psychometric.ocean.agreeableness > 80) weaknesses.push('Difficulty saying no');
    return weaknesses;
  }

  private generateHobbies(psychometric: PsychometricProfile): string[] {
    const hobbies = [];
    if (psychometric.ocean.openness > 60) hobbies.push('Reading', 'Art');
    if (psychometric.ocean.extraversion > 60) hobbies.push('Social activities');
    if (psychometric.ocean.conscientiousness > 60) hobbies.push('Organizing');
    return hobbies;
  }
}

// Supporting classes that would be implemented separately
class NLPProcessor {
  async extractCharacterData(description: string): Promise<ExtractedCharacterData> {
    // This would use actual NLP to extract character information
    // For now, return a basic structure
    return {
      basicInfo: {
        name: this.extractName(description),
        age: this.extractAge(description),
        gender: this.extractGender(description),
        occupation: this.extractOccupation(description),
        description: description
      },
      personalityTraits: this.extractPersonalityTraits(description),
      physicalFeatures: this.extractPhysicalFeatures(description),
      behavioralPatterns: this.extractBehavioralPatterns(description),
      backgroundElements: this.extractBackgroundElements(description),
      relationships: this.extractRelationships(description),
      skills: this.extractSkills(description)
    };
  }

  private extractName(description: string): string | undefined {
    const nameMatch = description.match(/(?:named?|called)\s+([A-Z][a-z]+)/i);
    return nameMatch ? nameMatch[1] : undefined;
  }

  private extractAge(description: string): number | undefined {
    const ageMatch = description.match(/(\d+)(?:\s*(?:years?\s*old|yo))/i);
    return ageMatch ? parseInt(ageMatch[1]) : undefined;
  }

  private extractGender(description: string): string | undefined {
    if (/\b(?:he|him|his|man|male|boy)\b/i.test(description)) return 'Male';
    if (/\b(?:she|her|hers|woman|female|girl)\b/i.test(description)) return 'Female';
    return undefined;
  }

  private extractOccupation(description: string): string | undefined {
    const occupationWords = ['teacher', 'doctor', 'engineer', 'artist', 'lawyer', 'chef', 'student'];
    for (const occupation of occupationWords) {
      if (description.toLowerCase().includes(occupation)) {
        return occupation.charAt(0).toUpperCase() + occupation.slice(1);
      }
    }
    return undefined;
  }

  private extractPersonalityTraits(description: string): string[] {
    const traits = [];
    const traitMap = {
      'kind': /\b(?:kind|nice|caring|compassionate|gentle)\b/i,
      'confident': /\b(?:confident|assertive|bold|brave)\b/i,
      'intelligent': /\b(?:smart|intelligent|clever|wise)\b/i,
      'funny': /\b(?:funny|humorous|witty|amusing)\b/i,
      'shy': /\b(?:shy|timid|reserved|quiet)\b/i,
      'energetic': /\b(?:energetic|active|vibrant|lively)\b/i
    };

    for (const [trait, pattern] of Object.entries(traitMap)) {
      if (pattern.test(description)) {
        traits.push(trait);
      }
    }

    return traits;
  }

  private extractPhysicalFeatures(description: string): string[] {
    const features = [];
    const featureMap = {
      'tall': /\b(?:tall|height)\b/i,
      'short': /\b(?:short|petite)\b/i,
      'blonde': /\b(?:blonde?|golden)\s*hair\b/i,
      'brown hair': /\b(?:brown|brunette)\s*hair\b/i,
      'blue eyes': /\b(?:blue)\s*eyes?\b/i,
      'green eyes': /\b(?:green)\s*eyes?\b/i,
      'athletic': /\b(?:athletic|fit|muscular)\b/i
    };

    for (const [feature, pattern] of Object.entries(featureMap)) {
      if (pattern.test(description)) {
        features.push(feature);
      }
    }

    return features;
  }

  private extractBehavioralPatterns(description: string): string[] {
    const patterns = [];
    if (/\b(?:always|often|frequently)\b/i.test(description)) {
      patterns.push('Has consistent habits');
    }
    if (/\b(?:nervous|anxious|worried)\b/i.test(description)) {
      patterns.push('Shows signs of nervousness');
    }
    return patterns;
  }

  private extractBackgroundElements(description: string): string[] {
    const elements = [];
    if (/\b(?:grew up|childhood|family)\b/i.test(description)) {
      elements.push('Has family background mentioned');
    }
    if (/\b(?:school|university|education)\b/i.test(description)) {
      elements.push('Has educational background');
    }
    return elements;
  }

  private extractRelationships(description: string): string[] {
    const relationships = [];
    if (/\b(?:friend|buddy|pal)\b/i.test(description)) {
      relationships.push('Has friends');
    }
    if (/\b(?:family|parent|sibling|brother|sister)\b/i.test(description)) {
      relationships.push('Has family');
    }
    return relationships;
  }

  private extractSkills(description: string): string[] {
    const skills = [];
    const skillMap = {
      'cooking': /\b(?:cook|chef|kitchen)\b/i,
      'music': /\b(?:music|sing|instrument|piano|guitar)\b/i,
      'sports': /\b(?:sport|athletic|football|basketball|soccer)\b/i,
      'art': /\b(?:art|paint|draw|creative)\b/i,
      'technology': /\b(?:computer|tech|programming|coding)\b/i
    };

    for (const [skill, pattern] of Object.entries(skillMap)) {
      if (pattern.test(description)) {
        skills.push(skill);
      }
    }

    return skills;
  }
}

class ArchetypeAnalyzer {
  async analyzeArchetype(data: ExtractedCharacterData): Promise<ArchetypeProfile> {
    // This would use sophisticated analysis to determine character archetype
    // For now, return a basic Hero archetype
    return {
      primary: 'Hero',
      secondary: 'Caregiver',
      confidence: 0.85,
      characteristics: ['Brave', 'Determined', 'Protective'],
      motivations: ['Help others', 'Overcome challenges', 'Make a difference'],
      fears: ['Failure', 'Letting others down', 'Being powerless'],
      growth_arc: 'Learning to balance heroism with self-care'
    };
  }
}

class PsychometricAnalyzer {
  async generateProfile(
    data: ExtractedCharacterData, 
    archetype: ArchetypeProfile
  ): Promise<PsychometricProfile> {
    // This would generate a detailed psychological profile
    // For now, return a balanced profile
    return {
      mbti: {
        type: 'ENFJ',
        confidence: 0.8,
        breakdown: {
          E_I: 70, // Extraverted
          S_N: 60, // Intuitive
          T_F: 30, // Feeling
          J_P: 65  // Judging
        }
      },
      enneagram: {
        type: 2,
        wing: 1,
        confidence: 0.75,
        description: 'The Helper - caring and interpersonally focused'
      },
      ocean: {
        openness: 75,
        conscientiousness: 80,
        extraversion: 70,
        agreeableness: 85,
        neuroticism: 30
      }
    };
  }
}

class BackstoryProcessor {
  async generateBackstory(
    data: ExtractedCharacterData,
    archetype: ArchetypeProfile,
    context?: SceneContext
  ): Promise<any> {
    // This would generate a rich backstory
    return {
      childhood: 'Grew up in a loving family that valued helping others',
      formativeEvents: ['Witnessed someone being helped in a crisis', 'Overcame a personal challenge'],
      education: 'Completed education with focus on helping professions',
      careerHistory: 'Chose career path that allows helping others',
      personalHistory: 'Has maintained close relationships throughout life',
      secrets: ['Sometimes doubts their own abilities'],
      motivations: archetype.motivations,
      fears: archetype.fears,
      desires: ['To make a positive impact', 'To be remembered fondly', 'To help those in need']
    };
  }
}

class CharacterValidator {
  async validateAndEnrich(character: UnifiedCharacterOntology): Promise<UnifiedCharacterOntology> {
    // This would validate the character for consistency and enrich missing details
    // For now, just return the character as-is
    return character;
  }
}