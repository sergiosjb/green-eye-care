import { PlantAnalysis } from '@/types/plant';

export class HistoryService {
  private readonly STORAGE_KEY = 'plant-vision-history';

  saveAnalysis(analysis: PlantAnalysis): void {
    try {
      const history = this.getHistory();
      history.unshift(analysis); // Adiciona no início do array
      
      // Mantém apenas os últimos 50 registros para evitar excesso de dados
      if (history.length > 50) {
        history.splice(50);
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Erro ao salvar no histórico:', error);
      throw new Error('Não foi possível salvar no histórico');
    }
  }

  getHistory(): PlantAnalysis[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const history = JSON.parse(stored) as PlantAnalysis[];
      
      // Converte timestamps de string para Date
      return history.map(item => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      return [];
    }
  }

  deleteAnalysis(id: string): void {
    try {
      const history = this.getHistory();
      const filteredHistory = history.filter(item => item.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredHistory));
    } catch (error) {
      console.error('Erro ao deletar análise:', error);
      throw new Error('Não foi possível deletar a análise');
    }
  }

  clearHistory(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
      throw new Error('Não foi possível limpar o histórico');
    }
  }

  exportHistory(): string {
    const history = this.getHistory();
    return JSON.stringify(history, null, 2);
  }

  importHistory(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData) as PlantAnalysis[];
      
      // Validação básica da estrutura dos dados
      if (!Array.isArray(data)) {
        throw new Error('Formato inválido');
      }
      
      // Verifica se os objetos têm a estrutura esperada
      for (const item of data) {
        if (!item.id || !item.commonName || !item.scientificName) {
          throw new Error('Dados incompletos');
        }
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Erro ao importar histórico:', error);
      return false;
    }
  }

  getStatistics() {
    const history = this.getHistory();
    
    const stats = {
      totalAnalyses: history.length,
      healthyCount: history.filter(h => h.healthStatus === 'Saudável').length,
      attentionCount: history.filter(h => h.healthStatus === 'Atenção').length,
      criticalCount: history.filter(h => h.healthStatus === 'Crítico').length,
      averageConfidence: history.length > 0 
        ? history.reduce((sum, h) => sum + h.confidence, 0) / history.length 
        : 0,
      mostRecentAnalysis: history.length > 0 ? history[0].timestamp : null,
      uniqueSpecies: new Set(history.map(h => h.scientificName)).size
    };
    
    return stats;
  }
}

export const historyService = new HistoryService();