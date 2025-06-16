
import { useState, useCallback } from 'react';
import { removeBackground, loadImage } from '@/utils/imageProcessing';
import { Button } from '@/components/ui/button';

interface ImageBackgroundRemoverProps {
  originalImageUrl: string;
  onProcessed: (processedImageUrl: string) => void;
  className?: string;
}

const ImageBackgroundRemover = ({ 
  originalImageUrl, 
  onProcessed, 
  className = "" 
}: ImageBackgroundRemoverProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);

  const processImage = useCallback(async () => {
    setIsProcessing(true);
    try {
      // Fetch the original image
      const response = await fetch(originalImageUrl);
      const blob = await response.blob();
      
      // Load image element
      const imageElement = await loadImage(blob);
      
      // Remove background
      const processedBlob = await removeBackground(imageElement);
      
      // Create URL for processed image
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedImageUrl(processedUrl);
      onProcessed(processedUrl);
      
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [originalImageUrl, onProcessed]);

  return (
    <div className={`space-y-4 ${className}`}>
      <img 
        src={processedImageUrl || originalImageUrl}
        alt="Mascot"
        className="w-full h-full object-contain"
      />
      
      {!processedImageUrl && (
        <Button 
          onClick={processImage}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? 'Removendo fundo...' : 'Remover fundo da imagem'}
        </Button>
      )}
    </div>
  );
};

export default ImageBackgroundRemover;
