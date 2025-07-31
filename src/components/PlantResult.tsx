import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  Heart, 
  AlertTriangle, 
  AlertCircle, 
  Droplets, 
  Sun, 
  Thermometer,
  BookOpen,
  Save
} from 'lucide-react';
import { PlantAnalysis } from '@/types/plant';

interface PlantResultProps {
  analysis: PlantAnalysis;
  photo: string;
  onSave: () => void;
  onNewPhoto: () => void;
}

export const PlantResult = ({ analysis, photo, onSave, onNewPhoto }: PlantResultProps) => {
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
        return <Heart className="w-4 h-4" />;
      case 'atenção':
        return <AlertTriangle className="w-4 h-4" />;
      case 'crítico':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Leaf className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-grow">
      {/* Imagem da planta */}
      <Card className="overflow-hidden shadow-nature-md">
        <img 
          src={photo} 
          alt="Planta analisada" 
          className="w-full h-64 object-cover"
        />
      </Card>

      {/* Informações principais */}
      <Card className="p-6 shadow-nature-md">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-1">
                {analysis.commonName}
              </h2>
              <p className="text-lg italic text-muted-foreground mb-3">
                {analysis.scientificName}
              </p>
              <p className="text-muted-foreground">
                {analysis.description}
              </p>
            </div>
            <div className="ml-4">
              <Leaf className="w-8 h-8 text-primary animate-leaf-sway" />
            </div>
          </div>

          {/* Status de saúde */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Status:</span>
            <Badge className={`${getHealthColor(analysis.healthStatus)} flex items-center gap-1`}>
              {getHealthIcon(analysis.healthStatus)}
              {analysis.healthStatus}
            </Badge>
          </div>

          {/* Confiança */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Confiança:</span>
            <Badge variant="outline">
              {Math.round(analysis.confidence * 100)}%
            </Badge>
          </div>
        </div>
      </Card>

      {/* Dicas de cuidados */}
      <Card className="p-6 shadow-nature-md">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Dicas de Cuidados</h3>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
            <Droplets className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-secondary-foreground">Rega</p>
              <p className="text-sm text-muted-foreground">{analysis.careTips.watering}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
            <Sun className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-secondary-foreground">Luz</p>
              <p className="text-sm text-muted-foreground">{analysis.careTips.lighting}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
            <Thermometer className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-secondary-foreground">Temperatura</p>
              <p className="text-sm text-muted-foreground">{analysis.careTips.temperature}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
            <Leaf className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-secondary-foreground">Solo</p>
              <p className="text-sm text-muted-foreground">{analysis.careTips.soil}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Botões de ação */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onSave}
          className="bg-gradient-primary hover:bg-primary-hover text-primary-foreground flex items-center gap-2 flex-1"
        >
          <Save className="w-4 h-4" />
          Salvar no Histórico
        </Button>
        
        <Button
          onClick={onNewPhoto}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1"
        >
          Nova Análise
        </Button>
      </div>
    </div>
  );
};