import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Camera as CameraIcon, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface PlantCameraProps {
  onPhotoTaken: (photo: string) => void;
  isAnalyzing: boolean;
}

export const PlantCamera = ({ onPhotoTaken, isAnalyzing }: PlantCameraProps) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const takePicture = async () => {
    try {
      setIsCapturing(true);
      
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (image.dataUrl) {
        onPhotoTaken(image.dataUrl);
        toast.success('Foto capturada! Analisando...');
      }
    } catch (error) {
      console.error('Erro ao capturar foto:', error);
      toast.error('Erro ao acessar a câmera. Verifique as permissões.');
    } finally {
      setIsCapturing(false);
    }
  };

  const selectFromGallery = async () => {
    try {
      setIsCapturing(true);
      
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      if (image.dataUrl) {
        onPhotoTaken(image.dataUrl);
        toast.success('Imagem selecionada! Analisando...');
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      toast.error('Erro ao acessar a galeria.');
    } finally {
      setIsCapturing(false);
    }
  };

  const isLoading = isCapturing || isAnalyzing;

  return (
    <Card className="p-6 shadow-nature-md animate-grow">
      <div className="text-center space-y-6">
        <div className="mx-auto w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center animate-leaf-sway">
          <CameraIcon className="w-12 h-12 text-primary-foreground" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Capturar Planta
          </h3>
          <p className="text-muted-foreground">
            Tire uma foto clara da planta para identificação automática
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={takePicture}
            disabled={isLoading}
            size="lg"
            className="bg-gradient-primary hover:bg-primary-hover text-primary-foreground flex items-center gap-2 animate-pulse-green"
          >
            {isCapturing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Capturando...
              </>
            ) : (
              <>
                <CameraIcon className="w-5 h-5" />
                Tirar Foto
              </>
            )}
          </Button>

          <Button
            onClick={selectFromGallery}
            disabled={isLoading}
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2"
          >
            {isCapturing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Selecionando...
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5" />
                Da Galeria
              </>
            )}
          </Button>
        </div>

        {isAnalyzing && (
          <div className="mt-6 p-4 bg-secondary rounded-lg animate-grow">
            <div className="flex items-center justify-center gap-3 text-secondary-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analisando a planta...</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};