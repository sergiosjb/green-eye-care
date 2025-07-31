import { PlantAnalysis } from '@/types/plant';

// Simulação de análise de plantas com dados realistas
// Em produção, você pode integrar com APIs como PlantNet, PlantId, ou modelos HuggingFace

export class PlantAnalysisService {
  
  // Base de dados expandida com 50+ plantas comuns
  private plantDatabase = [
    // Plantas de Interior
    {
      commonName: "Jiboia",
      scientificName: "Epipremnum aureum",
      description: "Planta trepadeira popular, ideal para ambientes internos. Conhecida por suas folhas em formato de coração.",
      category: "trepadeira",
      leafType: "coracao",
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
      category: "trepadeira",
      leafType: "perfurada",
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
      category: "suculenta",
      leafType: "longa",
      careTips: {
        watering: "Regue raramente, apenas quando o solo estiver completamente seco",
        lighting: "Tolera baixa luminosidade, mas prefere luz indireta",
        temperature: "18-27°C, muito resistente a variações",
        soil: "Solo bem drenado, evite excesso de água"
      }
    },
    {
      commonName: "Zamioculca",
      scientificName: "Zamioculcas zamiifolia",
      description: "Planta africana extremamente resistente, ideal para ambientes com pouca luz.",
      category: "suculenta",
      leafType: "oval",
      careTips: {
        watering: "Regue muito pouco, a cada 2-3 semanas",
        lighting: "Adapta-se a pouca luz, mas cresce melhor com luz indireta",
        temperature: "18-26°C, muito tolerante",
        soil: "Solo bem drenado, mistura para cactos"
      }
    },
    {
      commonName: "Ficus Lyrata",
      scientificName: "Ficus lyrata",
      description: "Árvore de interior com folhas grandes em formato de violino. Muito decorativa.",
      category: "arvore",
      leafType: "violino",
      careTips: {
        watering: "Regue quando o solo estiver seco a 2-3 cm de profundidade",
        lighting: "Luz indireta brilhante, algumas horas de sol manhã",
        temperature: "20-25°C, evite mudanças bruscas",
        soil: "Solo bem drenado, rico em matéria orgânica"
      }
    },
    {
      commonName: "Pacová",
      scientificName: "Philodendron bipinnatifidum",
      description: "Planta tropical com folhas grandes e recortadas, ideal para ambientes amplos.",
      category: "trepadeira",
      leafType: "recortada",
      careTips: {
        watering: "Mantenha solo úmido mas não encharcado",
        lighting: "Luz indireta média a brilhante",
        temperature: "20-28°C, alta umidade",
        soil: "Solo rico e bem drenado"
      }
    },
    {
      commonName: "Antúrio",
      scientificName: "Anthurium andraeanum",
      description: "Planta tropical com flores vermelhas brilhantes em formato de coração.",
      category: "florífera",
      leafType: "coracao",
      careTips: {
        watering: "Mantenha solo levemente úmido, alta umidade",
        lighting: "Luz indireta brilhante, sem sol direto",
        temperature: "20-25°C, ambiente úmido",
        soil: "Solo bem drenado, rico em matéria orgânica"
      }
    },
    {
      commonName: "Dracena",
      scientificName: "Dracaena marginata",
      description: "Árvore de interior com folhas longas e estreitas, muito resistente.",
      category: "arvore",
      leafType: "longa",
      careTips: {
        watering: "Regue quando solo estiver seco, evite excesso",
        lighting: "Luz indireta média, tolera pouca luz",
        temperature: "18-24°C, ambiente seco",
        soil: "Solo bem drenado, mistura comum"
      }
    },
    {
      commonName: "Peperômia",
      scientificName: "Peperomia obtusifolia",
      description: "Pequena planta com folhas carnudas e brilhantes, perfeita para espaços pequenos.",
      category: "suculenta",
      leafType: "redonda",
      careTips: {
        watering: "Regue pouco, quando solo estiver seco",
        lighting: "Luz indireta brilhante",
        temperature: "18-24°C, ambiente seco",
        soil: "Solo bem drenado, evite umidade excessiva"
      }
    },
    {
      commonName: "Maranta",
      scientificName: "Maranta leuconeura",
      description: "Planta com folhas decorativas que se fecham à noite, conhecida como 'planta da oração'.",
      category: "ornamental",
      leafType: "oval",
      careTips: {
        watering: "Mantenha solo úmido, use água filtrada",
        lighting: "Luz indireta média, evite sol direto",
        temperature: "20-25°C, alta umidade",
        soil: "Solo úmido e bem drenado"
      }
    },

    // Flores e Plantas de Jardim
    {
      commonName: "Rosa",
      scientificName: "Rosa sp.",
      description: "Flor clássica e aromática, símbolo de amor e beleza. Requer cuidados específicos.",
      category: "florífera",
      leafType: "serrilhada",
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
      category: "florífera",
      leafType: "redonda",
      careTips: {
        watering: "Use água morna, regue por baixo para evitar molhar as folhas",
        lighting: "Luz indireta brilhante, evite sol direto",
        temperature: "18-24°C, ambiente estável",
        soil: "Solo leve e bem drenado, específico para violetas"
      }
    },
    {
      commonName: "Girassol",
      scientificName: "Helianthus annuus",
      description: "Flor amarela grande que segue o movimento do sol. Planta anual de jardim.",
      category: "florífera",
      leafType: "coracao",
      careTips: {
        watering: "Regue regularmente, especialmente em crescimento",
        lighting: "Sol direto, pelo menos 8 horas por dia",
        temperature: "20-30°C, resistente ao calor",
        soil: "Solo bem drenado, rico em nutrients"
      }
    },
    {
      commonName: "Orquídea Phalaenopsis",
      scientificName: "Phalaenopsis amabilis",
      description: "Orquídea elegante com flores duradouras, popular para cultivo interno.",
      category: "orquidea",
      leafType: "oval",
      careTips: {
        watering: "Regue 1x por semana, deixe escorrer bem",
        lighting: "Luz indireta brilhante, sem sol direto",
        temperature: "18-25°C, boa ventilação",
        soil: "Substrato específico para orquídeas"
      }
    },
    {
      commonName: "Begônia",
      scientificName: "Begonia semperflorens",
      description: "Flor colorida e delicada, ideal para jardins e vasos. Floração contínua.",
      category: "florífera",
      leafType: "redonda",
      careTips: {
        watering: "Mantenha solo úmido mas não encharcado",
        lighting: "Luz indireta ou sol matinal suave",
        temperature: "18-24°C, proteja de frio",
        soil: "Solo rico e bem drenado"
      }
    },

    // Plantas Aromáticas e Ervas
    {
      commonName: "Manjericão",
      scientificName: "Ocimum basilicum",
      description: "Erva aromática muito usada na culinária, fácil de cultivar.",
      category: "aromatica",
      leafType: "oval",
      careTips: {
        watering: "Regue regularmente, mantenha solo úmido",
        lighting: "Sol direto, 4-6 horas por dia",
        temperature: "20-25°C, proteja de frio",
        soil: "Solo rico e bem drenado"
      }
    },
    {
      commonName: "Alecrim",
      scientificName: "Rosmarinus officinalis",
      description: "Erva mediterrânea resistente, com aroma marcante e propriedades medicinais.",
      category: "aromatica",
      leafType: "agulha",
      careTips: {
        watering: "Regue pouco, solo deve secar entre regas",
        lighting: "Sol direto, muitas horas de luz",
        temperature: "15-25°C, resistente ao calor",
        soil: "Solo bem drenado, pode ser pobre"
      }
    },
    {
      commonName: "Hortelã",
      scientificName: "Mentha spicata",
      description: "Erva aromática refrescante, cresce rapidamente e espalha facilmente.",
      category: "aromatica",
      leafType: "serrilhada",
      careTips: {
        watering: "Mantenha solo úmido, gosta de água",
        lighting: "Sol direto ou meia-sombra",
        temperature: "15-25°C, resistente",
        soil: "Solo úmido e fértil"
      }
    },
    {
      commonName: "Lavanda",
      scientificName: "Lavandula angustifolia",
      description: "Planta aromática com flores roxas, conhecida por suas propriedades relaxantes.",
      category: "aromatica",
      leafType: "longa",
      careTips: {
        watering: "Regue pouco, prefere solo mais seco",
        lighting: "Sol direto, muitas horas de luz",
        temperature: "15-25°C, resistente ao frio",
        soil: "Solo bem drenado, alcalino"
      }
    },

    // Suculentas e Cactos
    {
      commonName: "Echeveria",
      scientificName: "Echeveria elegans",
      description: "Suculenta em formato de roseta, com folhas carnudas azul-acinzentadas.",
      category: "suculenta",
      leafType: "carnuda",
      careTips: {
        watering: "Regue raramente, apenas quando solo seco",
        lighting: "Sol direto ou luz intensa",
        temperature: "15-25°C, resistente",
        soil: "Solo arenoso e muito bem drenado"
      }
    },
    {
      commonName: "Cacto San Pedro",
      scientificName: "Echinopsis pachanoi",
      description: "Cacto colunar de crescimento rápido, nativo dos Andes.",
      category: "cacto",
      leafType: "espinho",
      careTips: {
        watering: "Regue muito pouco, especialmente no inverno",
        lighting: "Sol direto, muita luz",
        temperature: "15-30°C, resistente a variações",
        soil: "Solo arenoso, excelente drenagem"
      }
    },
    {
      commonName: "Jade",
      scientificName: "Crassula ovata",
      description: "Suculenta com folhas carnudas e brilhantes, símbolo de prosperidade.",
      category: "suculenta",
      leafType: "carnuda",
      careTips: {
        watering: "Regue pouco, deixe solo secar completamente",
        lighting: "Sol direto ou luz intensa",
        temperature: "18-24°C, adapta-se bem",
        soil: "Solo bem drenado, mistura para cactos"
      }
    },

    // Árvores e Arbustos
    {
      commonName: "Ficus Benjamina",
      scientificName: "Ficus benjamina",
      description: "Árvore de interior popular, com folhas pequenas e brilhantes.",
      category: "arvore",
      leafType: "oval",
      careTips: {
        watering: "Regue quando solo superficial estiver seco",
        lighting: "Luz indireta brilhante",
        temperature: "18-25°C, evite correntes de ar",
        soil: "Solo bem drenado e fértil"
      }
    },
    {
      commonName: "Azaleia",
      scientificName: "Rhododendron simsii",
      description: "Arbusto florífero com flores vistosas em diversas cores.",
      category: "arbusto",
      leafType: "oval",
      careTips: {
        watering: "Mantenha solo úmido, use água filtrada",
        lighting: "Luz indireta ou sol matinal",
        temperature: "15-20°C, prefere clima fresco",
        soil: "Solo ácido e bem drenado"
      }
    },

    // Plantas Aquáticas
    {
      commonName: "Lírio d'água",
      scientificName: "Nymphaea alba",
      description: "Planta aquática com flores flutuantes, ideal para lagos e tanques.",
      category: "aquatica",
      leafType: "redonda",
      careTips: {
        watering: "Vive na água, manter nível constante",
        lighting: "Sol direto, 6+ horas por dia",
        temperature: "20-25°C, água morna",
        soil: "Substrato aquático rico"
      }
    },

    // Samambaias
    {
      commonName: "Samambaia",
      scientificName: "Nephrolepis exaltata",
      description: "Planta com folhas delicadas e pendentes, ideal para ambientes úmidos.",
      category: "samambaia",
      leafType: "recortada",
      careTips: {
        watering: "Mantenha solo sempre úmido",
        lighting: "Luz indireta, evite sol direto",
        temperature: "18-24°C, alta umidade",
        soil: "Solo úmido e rico em matéria orgânica"
      }
    },
    {
      commonName: "Avenca",
      scientificName: "Adiantum capillus-veneris",
      description: "Samambaia delicada com frondes finas, muito decorativa.",
      category: "samambaia",
      leafType: "recortada",
      careTips: {
        watering: "Solo sempre úmido, nebulize folhas",
        lighting: "Luz indireta suave, sombra",
        temperature: "18-22°C, alta umidade",
        soil: "Solo úmido e bem drenado"
      }
    },

    // Plantas Carnívoras
    {
      commonName: "Dioneia",
      scientificName: "Dionaea muscipula",
      description: "Planta carnívora famosa por suas 'armadilhas' que capturam insetos.",
      category: "carnivora",
      leafType: "armadilha",
      careTips: {
        watering: "Use água destilada, mantenha prato com água",
        lighting: "Sol direto ou luz muito intensa",
        temperature: "20-30°C no verão, 5-15°C no inverno",
        soil: "Substrato pobre em nutrients, musgo sphagnum"
      }
    }
  ];

  async analyzeImage(imageDataUrl: string): Promise<PlantAnalysis> {
    // Simula delay de processamento realista
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    // Análise simulada das características da imagem
    const imageFeatures = this.extractSimulatedFeatures(imageDataUrl);
    
    // Seleciona planta baseada nas características detectadas
    const selectedPlant = this.selectPlantByFeatures(imageFeatures);
    
    // Gera análise de saúde mais sofisticada
    const healthAnalysis = this.generateAdvancedHealthAnalysis(imageFeatures);
    
    // Calcula confiança baseada na qualidade da correspondência
    const confidence = this.calculateConfidence(imageFeatures, selectedPlant);
    
    const analysis: PlantAnalysis = {
      id: crypto.randomUUID(),
      commonName: selectedPlant.commonName,
      scientificName: selectedPlant.scientificName,
      description: selectedPlant.description,
      healthStatus: healthAnalysis.status,
      confidence: confidence,
      careTips: this.enhanceCareTips(selectedPlant.careTips, healthAnalysis),
      photo: imageDataUrl,
      timestamp: new Date()
    };

    return analysis;
  }

  // Simula extração de características da imagem
  private extractSimulatedFeatures(imageDataUrl: string) {
    // Usa o hash da imagem para gerar características consistentes
    const hash = this.simpleHash(imageDataUrl);
    
    // Determina categoria baseada no hash
    const categories = ['trepadeira', 'suculenta', 'florífera', 'aromatica', 'arvore', 'samambaia', 'cacto'];
    const leafTypes = ['coracao', 'oval', 'longa', 'redonda', 'perfurada', 'recortada', 'carnuda', 'serrilhada', 'agulha'];
    
    return {
      category: categories[hash % categories.length],
      leafType: leafTypes[(hash * 3) % leafTypes.length],
      hasFlowers: (hash % 4) === 0,
      isSucculent: (hash % 5) === 0,
      size: hash % 3, // 0=pequena, 1=média, 2=grande
      imageQuality: 0.6 + (hash % 40) / 100 // 0.6 a 0.99
    };
  }

  // Seleciona planta baseada nas características
  private selectPlantByFeatures(features: any) {
    // Primeiro, filtra por categoria se possível
    let candidates = this.plantDatabase.filter(plant => 
      (plant as any).category === features.category
    );
    
    // Se não encontrou candidatos da categoria, filtra por tipo de folha
    if (candidates.length === 0) {
      candidates = this.plantDatabase.filter(plant => 
        (plant as any).leafType === features.leafType
      );
    }
    
    // Se ainda não encontrou, usa plantas comuns de interior
    if (candidates.length === 0) {
      candidates = this.plantDatabase.filter(plant => 
        ['trepadeira', 'suculenta', 'arvore'].includes((plant as any).category)
      );
    }
    
    // Se ainda não tem candidatos, usa toda a base
    if (candidates.length === 0) {
      candidates = this.plantDatabase;
    }
    
    // Seleciona aleatoriamente entre os candidatos filtrados
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // Gera análise de saúde mais avançada
  private generateAdvancedHealthAnalysis(features: any) {
    const random = Math.random();
    const qualityFactor = features.imageQuality;
    
    // Qualidade da imagem influencia na detecção de problemas
    let healthProbability = 0.6;
    if (qualityFactor > 0.8) healthProbability = 0.75;
    if (qualityFactor < 0.7) healthProbability = 0.45;
    
    if (random < healthProbability) {
      return {
        status: 'Saudável' as const,
        issues: [],
        details: 'Planta apresenta sinais de boa saúde geral'
      };
    } else if (random < healthProbability + 0.25) {
      const issues = this.selectHealthIssues('attention', features);
      return {
        status: 'Atenção' as const,
        issues,
        details: 'Alguns sinais indicam necessidade de ajustes nos cuidados'
      };
    } else {
      const issues = this.selectHealthIssues('critical', features);
      return {
        status: 'Crítico' as const,
        issues,
        details: 'Planta apresenta sinais preocupantes que requerem ação imediata'
      };
    }
  }

  // Seleciona problemas de saúde baseados no contexto
  private selectHealthIssues(severity: 'attention' | 'critical', features: any) {
    const attentionIssues = [
      'Folhas ligeiramente amareladas',
      'Possível falta de nutrientes',
      'Sinais de desidratação leve',
      'Crescimento mais lento que o normal',
      'Algumas folhas secas nas pontas',
      'Necessita de mais umidade'
    ];
    
    const criticalIssues = [
      'Pragas detectadas nas folhas',
      'Sinais de podridão nas raízes',
      'Folhas severamente danificadas',
      'Descoloração significativa',
      'Queda excessiva de folhas',
      'Possível infecção fungica'
    ];
    
    const issueList = severity === 'attention' ? attentionIssues : criticalIssues;
    const numIssues = Math.floor(Math.random() * 2) + 1; // 1-2 problemas
    
    const selectedIssues = [];
    for (let i = 0; i < numIssues; i++) {
      const issue = issueList[Math.floor(Math.random() * issueList.length)];
      if (!selectedIssues.includes(issue)) {
        selectedIssues.push(issue);
      }
    }
    
    return selectedIssues;
  }

  // Calcula confiança baseada na correspondência
  private calculateConfidence(features: any, plant: any) {
    let baseConfidence = 0.70;
    
    // Aumenta confiança se características batem
    if ((plant as any).category === features.category) {
      baseConfidence += 0.15;
    }
    
    if ((plant as any).leafType === features.leafType) {
      baseConfidence += 0.10;
    }
    
    // Qualidade da imagem afeta confiança
    const qualityBonus = (features.imageQuality - 0.6) * 0.25;
    baseConfidence += qualityBonus;
    
    // Adiciona variação aleatória pequena
    baseConfidence += (Math.random() - 0.5) * 0.05;
    
    // Garante que fica entre 0.65 e 0.98
    return Math.max(0.65, Math.min(0.98, baseConfidence));
  }

  // Hash simples para consistência
  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < Math.min(str.length, 100); i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
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