import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  History, 
  Trash2, 
  Calendar, 
  Leaf, 
  Heart, 
  AlertTriangle, 
  AlertCircle,
  Download,
  Upload,
  BarChart3
} from 'lucide-react';
import { PlantAnalysis } from '@/types/plant';
import { historyService } from '@/services/historyService';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';

interface PlantHistoryProps {
  onSelectAnalysis: (analysis: PlantAnalysis) => void;
}

export const PlantHistory = ({ onSelectAnalysis }: PlantHistoryProps) => {
  const [history, setHistory] = useState<PlantAnalysis[]>([]);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const loadedHistory = historyService.getHistory();
    setHistory(loadedHistory);
  };

  const handleDelete = (id: string) => {
    try {
      historyService.deleteAnalysis(id);
      loadHistory();
      toast.success('Análise removida do histórico');
    } catch (error) {
      toast.error('Erro ao remover análise');
    }
  };

  const handleClearHistory = () => {
    try {
      historyService.clearHistory();
      loadHistory();
      toast.success('Histórico limpo');
    } catch (error) {
      toast.error('Erro ao limpar histórico');
    }
  };

  const handleExport = () => {
    try {
      const data = historyService.exportHistory();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `plant-vision-history-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Histórico exportado');
    } catch (error) {
      toast.error('Erro ao exportar histórico');
    }
  };

  const getHealthColor = (health: string) => {
    switch (health.toLowerCase()) {
      case 'saudável':
        return 'bg-healthy text-healthy-foreground';
      case 'atenção':
        return 'bg-attention text-attention-foreground';
      case 'crítico':
        return 'bg-critical text-critical-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health.toLowerCase()) {
      case 'saudável':
        return <Heart className="w-3 h-3" />;
      case 'atenção':
        return <AlertTriangle className="w-3 h-3" />;
      case 'crítico':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Leaf className="w-3 h-3" />;
    }
  };

  const stats = historyService.getStatistics();

  if (history.length === 0) {
    return (
      <Card className="p-6 text-center shadow-nature-md">
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <History className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Nenhuma análise ainda
        </h3>
        <p className="text-muted-foreground">
          Comece capturando sua primeira planta para ver o histórico aqui
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho com estatísticas */}
      <Card className="p-4 shadow-nature-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Histórico</h2>
            <Badge variant="outline">{history.length}</Badge>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStats(!showStats)}
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearHistory}
              className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        {showStats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-healthy">{stats.healthyCount}</div>
              <div className="text-sm text-muted-foreground">Saudáveis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-attention">{stats.attentionCount}</div>
              <div className="text-sm text-muted-foreground">Atenção</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-critical">{stats.criticalCount}</div>
              <div className="text-sm text-muted-foreground">Críticas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.uniqueSpecies}</div>
              <div className="text-sm text-muted-foreground">Espécies</div>
            </div>
          </div>
        )}
      </Card>

      {/* Lista do histórico */}
      <div className="space-y-4">
        {history.map((analysis) => (
          <Card key={analysis.id} className="p-4 shadow-nature hover:shadow-nature-md transition-shadow cursor-pointer" onClick={() => onSelectAnalysis(analysis)}>
            <div className="flex gap-4">
              {/* Miniatura da foto */}
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={analysis.photo} 
                  alt={analysis.commonName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Informações */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground truncate">
                      {analysis.commonName}
                    </h3>
                    <p className="text-sm italic text-muted-foreground truncate">
                      {analysis.scientificName}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-2">
                    <Badge className={`${getHealthColor(analysis.healthStatus)} flex items-center gap-1 text-xs`}>
                      {getHealthIcon(analysis.healthStatus)}
                      {analysis.healthStatus}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(analysis.timestamp, 'dd/MM/yy HH:mm', { locale: ptBR })}
                    </div>
                    <div>
                      Confiança: {Math.round(analysis.confidence * 100)}%
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(analysis.id);
                    }}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};