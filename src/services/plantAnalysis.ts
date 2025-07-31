import { PlantAnalysis } from '@/types/plant';

// Simulação de análise de plantas com dados realistas
// Em produção, você pode integrar com APIs como PlantNet, PlantId, ou modelos HuggingFace

export class PlantAnalysisService {
  
  // Base de dados simulada de plantas comuns
  private plantDatabase = [
    {
      commonName: "Jiboia",
      scientificName: "Epipremnum aureum",
      description: "Planta trepadeira popular, ideal para ambientes internos. Conhecida por suas folhas em formato de coração.",
      careTips: {
        watering: "Regue quando o solo estiver seco ao toque, geralmente 1-2 vezes por semana",
        lighting: "Luz indireta brilhante, evite sol direto",
        temperature: "18-24°C, proteja de correntes de ar frio",
        soil: "Solo bem drenado, mistura para plantas de interior"
      }
    },
    {
      commonName: "Costela de Adão",
      scientificName: "Monstera deliciosa",
      description: "Planta tropical com folhas grandes e perfuradas características. Muito popular na decoração moderna.",
      careTips: {
        watering: "Mantenha solo levemente úmido, regue quando a superfície estiver seca",
        lighting: "Luz indireta média a brilhante",
        temperature: "20-25°C, alta umidade é preferível",
        soil: "Solo rico em matéria orgânica e bem drenado"
      }
    },
    {
      commonName: "Espada de São Jorge",
      scientificName: "Sansevieria trifasciata",
      description: "Planta suculenta resistente, conhecida por purificar o ar. Ideal para iniciantes.",
      careTips: {
        watering: "Regue raramente, apenas quando o solo estiver completamente seco",
        lighting: "Tolera baixa luminosidade, mas prefere luz indireta",
        temperature: "18-27°C, muito resistente a variações",
        soil: "Solo bem drenado, evite excesso de água"
      }
    },
    {
      commonName: "Rosa",
      scientificName: "Rosa sp.",
      description: "Flor clássica e aromática, símbolo de amor e beleza. Requer cuidados específicos.",
      careTips: {
        watering: "Regue na base da planta, evite molhar as folhas",
        lighting: "Sol direto pela manhã, pelo menos 6 horas de luz",
        temperature: "15-25°C, proteja de geadas",
        soil: "Solo rico, bem drenado e levemente ácido"
      }
    },
    {
      commonName: "Violeta Africana",
      scientificName: "Saintpaulia ionantha",
      description: "Pequena planta com flores coloridas e folhas aveludadas. Popular para cultivo interno.",
      careTips: {
        watering: "Use água morna, regue por baixo para evitar molhar as folhas",
        lighting: "Luz indireta brilhante, evite sol direto",
        temperature: "18-24°C, ambiente estável",
        soil: "Solo leve e bem drenado, específico para violetas"
      }
    }
  ];

  async analyzeImage(imageDataUrl: string): Promise<PlantAnalysis> {
    // Simula delay de processamento
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    // Seleciona uma planta aleatória da base de dados
    const randomPlant = this.plantDatabase[Math.floor(Math.random() * this.plantDatabase.length)];
    
    // Gera análise de saúde baseada em fatores aleatórios
    const healthAnalysis = this.generateHealthAnalysis();
    
    // Simula confiança baseada na "qualidade" da imagem
    const confidence = 0.7 + Math.random() * 0.25; // 70-95%
    
    const analysis: PlantAnalysis = {
      id: crypto.randomUUID(),
      commonName: randomPlant.commonName,
      scientificName: randomPlant.scientificName,
      description: randomPlant.description,
      healthStatus: healthAnalysis.status,
      confidence: confidence,
      careTips: this.enhanceCareTips(randomPlant.careTips, healthAnalysis),
      photo: imageDataUrl,
      timestamp: new Date()
    };

    return analysis;
  }

  private generateHealthAnalysis() {
    const random = Math.random();
    
    if (random < 0.6) {
      return {
        status: 'Saudável' as const,
        issues: []
      };
    } else if (random < 0.85) {
      return {
        status: 'Atenção' as const,
        issues: ['Possível desidratação', 'Folhas amareladas']
      };
    } else {
      return {
        status: 'Crítico' as const,
        issues: ['Pragas detectadas', 'Folhas muito danificadas']
      };
    }
  }

  private enhanceCareTips(baseTips: any, healthAnalysis: any) {
    const tips = { ...baseTips };
    
    if (healthAnalysis.status === 'Atenção') {
      tips.watering = "⚠️ " + tips.watering + " Verifique se não está regando em excesso.";
    } else if (healthAnalysis.status === 'Crítico') {
      tips.watering = "🚨 " + tips.watering + " Necessita atenção imediata!";
      tips.lighting = "🚨 " + tips.lighting + " Pode precisar de reposicionamento.";
    }
    
    return tips;
  }

  // Método para análise usando HuggingFace (pode ser implementado futuramente)
  async analyzeWithHuggingFace(imageDataUrl: string): Promise<PlantAnalysis> {
    // Placeholder para integração futura com modelos reais
    // const { pipeline } = await import('@huggingface/transformers');
    // const classifier = await pipeline('image-classification', 'model-name');
    // const result = await classifier(imageDataUrl);
    
    return this.analyzeImage(imageDataUrl);
  }
}

export const plantAnalysisService = new PlantAnalysisService();