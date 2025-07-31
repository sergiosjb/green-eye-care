import { useState } from 'react';
import { PlantCamera } from '@/components/PlantCamera';
import { PlantResult } from '@/components/PlantResult';
import { PlantHistory } from '@/components/PlantHistory';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, History, Leaf } from 'lucide-react';
import { PlantAnalysis } from '@/types/plant';
import { plantAnalysisService } from '@/services/plantAnalysis';
import { historyService } from '@/services/historyService';
import { toast } from 'sonner';
import plantIcon from '@/assets/plant-icon.png';

export const PlantVision = () => {
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<PlantAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('camera');

  const handlePhotoTaken = async (photo: string) => {
    setCurrentPhoto(photo);
    setIsAnalyzing(true);
    
    try {
      const analysis = await plantAnalysisService.analyzeImage(photo);
      setCurrentAnalysis(analysis);
      setActiveTab('result');
    } catch (error) {
      console.error('Erro na análise:', error);
      toast.error('Erro ao analisar a planta. Tente novamente.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveAnalysis = () => {
    if (currentAnalysis) {
      try {
        historyService.saveAnalysis(currentAnalysis);
        toast.success('Análise salva no histórico!');
        setActiveTab('history');
      } catch (error) {
        toast.error('Erro ao salvar análise');
      }
    }
  };

  const handleNewPhoto = () => {
    setCurrentPhoto(null);
    setCurrentAnalysis(null);
    setActiveTab('camera');
  };

  const handleSelectFromHistory = (analysis: PlantAnalysis) => {
    setCurrentAnalysis(analysis);
    setCurrentPhoto(analysis.photo);
    setActiveTab('result');
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <div className="bg-card border-b shadow-nature">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <img 
              src={plantIcon} 
              alt="PlantVision" 
              className="w-10 h-10 animate-leaf-sway"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PlantVision
              </h1>
              <p className="text-sm text-muted-foreground">
                Identifique e cuide das suas plantas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-card">
            <TabsTrigger 
              value="camera" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Camera className="w-4 h-4" />
              Câmera
            </TabsTrigger>
            <TabsTrigger 
              value="result" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              disabled={!currentAnalysis}
            >
              <Leaf className="w-4 h-4" />
              Resultado
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <History className="w-4 h-4" />
              Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="camera" className="space-y-6">
            <PlantCamera 
              onPhotoTaken={handlePhotoTaken}
              isAnalyzing={isAnalyzing}
            />
            
            {/* Dicas rápidas */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-card p-4 rounded-lg shadow-nature text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-1">Foto Clara</h3>
                <p className="text-sm text-muted-foreground">
                  Tire fotos nítidas com boa iluminação
                </p>
              </div>
              
              <div className="bg-card p-4 rounded-lg shadow-nature text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-1">Foque na Folha</h3>
                <p className="text-sm text-muted-foreground">
                  Capture folhas e características únicas
                </p>
              </div>
              
              <div className="bg-card p-4 rounded-lg shadow-nature text-center sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <History className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-1">Histórico</h3>
                <p className="text-sm text-muted-foreground">
                  Acompanhe suas plantas ao longo do tempo
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="result">
            {currentAnalysis && currentPhoto ? (
              <PlantResult 
                analysis={currentAnalysis}
                photo={currentPhoto}
                onSave={handleSaveAnalysis}
                onNewPhoto={handleNewPhoto}
              />
            ) : (
              <div className="text-center py-12">
                <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Nenhuma análise disponível
                </h3>
                <p className="text-muted-foreground mb-4">
                  Capture uma foto para ver os resultados aqui
                </p>
                <Button onClick={() => setActiveTab('camera')}>
                  <Camera className="w-4 h-4 mr-2" />
                  Tirar Foto
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            <PlantHistory onSelectAnalysis={handleSelectFromHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};