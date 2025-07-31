export interface PlantAnalysis {
  id: string;
  commonName: string;
  scientificName: string;
  description: string;
  healthStatus: 'Saudável' | 'Atenção' | 'Crítico';
  confidence: number;
  careTips: {
    watering: string;
    lighting: string;
    temperature: string;
    soil: string;
  };
  photo: string;
  timestamp: Date;
}

export interface PlantIdentificationResult {
  species: {
    commonNames: string[];
    scientificNameWithoutAuthor: string;
    scientificNameAuthorship: string;
    genus: {
      scientificNameWithoutAuthor: string;
    };
    family: {
      scientificNameWithoutAuthor: string;
    };
  };
  score: number;
}

export interface HealthAssessment {
  isHealthy: {
    binary: boolean;
    threshold: number;
  };
  disease: {
    suggestions: Array<{
      name: string;
      probability: number;
      description: string;
    }>;
  };
}