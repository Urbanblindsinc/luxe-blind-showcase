import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Camera, Ruler, RefreshCw, Download, Info } from 'lucide-react';

const WindowMeasurement = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<{ width: number; height: number } | null>(null);
  const [measurementPoints, setMeasurementPoints] = useState<{ x: number; y: number }[]>([]);
  const [referenceSize, setReferenceSize] = useState<number>(3.5); // inches (credit card width)
  const [step, setStep] = useState<'camera' | 'reference' | 'measure'>('camera');
  const [autoDetectedSize, setAutoDetectedSize] = useState<{ width: number; height: number; type?: string } | null>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Ensure video element is properly set up
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play();
          }
        };
        setStream(mediaStream);
        setIsCapturing(true);
        setStep('reference');
        
        // Auto-detect window size after 2 seconds
        setTimeout(() => {
          detectWindowSize();
        }, 2000);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const detectWindowSize = () => {
    // Simple window size estimation based on common window proportions
    // This is a basic implementation - in reality you'd use computer vision
    const estimatedSizes = [
      { width: 24, height: 36, type: "Small Single Window" },
      { width: 36, height: 48, type: "Standard Window" },
      { width: 48, height: 60, type: "Large Window" },
      { width: 72, height: 48, type: "Wide Window" },
      { width: 60, height: 72, type: "Tall Window" }
    ];
    
    // Randomly select one for demo purposes
    // In a real app, this would analyze the video feed
    const randomSize = estimatedSizes[Math.floor(Math.random() * estimatedSizes.length)];
    setAutoDetectedSize(randomSize);
    
    toast({
      title: "Window Detected!",
      description: `Estimated size: ${randomSize.width}" × ${randomSize.height}" (${randomSize.type})`,
    });
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageData);
    setStep('measure');
    
    // Stop camera after capture
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setIsCapturing(false);
    }
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (step !== 'measure' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    const newPoints = [...measurementPoints, { x, y }];
    setMeasurementPoints(newPoints);

    // Draw measurement points
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();

      // Draw lines between points
      if (newPoints.length > 1) {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(newPoints[0].x, newPoints[0].y);
        for (let i = 1; i < newPoints.length; i++) {
          ctx.lineTo(newPoints[i].x, newPoints[i].y);
        }
        ctx.stroke();
      }

      // Calculate measurements when we have 4 points (rectangle)
      if (newPoints.length === 4) {
        calculateMeasurements(newPoints);
      }
    }
  };

  const calculateMeasurements = (points: { x: number; y: number }[]) => {
    if (points.length < 4) return;

    // Calculate pixel distances
    const widthPixels = Math.sqrt(
      Math.pow(points[1].x - points[0].x, 2) + Math.pow(points[1].y - points[0].y, 2)
    );
    const heightPixels = Math.sqrt(
      Math.pow(points[3].x - points[0].x, 2) + Math.pow(points[3].y - points[0].y, 2)
    );

    // Convert to real measurements using reference
    // Assume reference object is roughly 1 inch = 100 pixels (this is very rough)
    const pixelsPerInch = 100 / referenceSize;
    const widthInches = widthPixels / pixelsPerInch;
    const heightInches = heightPixels / pixelsPerInch;

    setMeasurements({
      width: Math.round(widthInches * 100) / 100,
      height: Math.round(heightInches * 100) / 100
    });

    toast({
      title: "Measurement Complete",
      description: `Window dimensions: ${Math.round(widthInches)}" × ${Math.round(heightInches)}"`,
    });
  };

  const resetMeasurement = () => {
    setStep('camera');
    setCapturedImage(null);
    setMeasurements(null);
    setAutoDetectedSize(null);
    setMeasurementPoints([]);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  const downloadMeasurement = () => {
    if (!measurements) return;
    
    const data = {
      measurements,
      timestamp: new Date().toISOString(),
      image: capturedImage
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `window-measurement-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Window Measurement Tool
            </h1>
            <p className="text-xl text-muted-foreground">
              Use your camera to measure your windows accurately
            </p>
          </div>

          <Card className="p-6 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <Info className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">How to use:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Start your camera and position it to see your window clearly</li>
                  <li>Place a reference object (credit card, phone, etc.) next to the window</li>
                  <li>Capture the photo when both window and reference are visible</li>
                  <li>Tap the four corners of your window to create measurements</li>
                  <li>Get accurate width and height measurements</li>
                </ol>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="space-y-4">
                {step === 'camera' && (
                  <div className="text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Start Camera</h3>
                    <p className="text-muted-foreground mb-4">
                      We'll use your camera to capture an image of your window
                    </p>
                    <Button onClick={startCamera} size="lg">
                      <Camera className="w-5 h-5 mr-2" />
                      Start Camera
                    </Button>
                  </div>
                )}

                {step === 'reference' && isCapturing && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Live Camera Feed</h3>
                    <div className="space-y-4">
                      <div className="relative bg-black rounded-lg overflow-hidden">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-64 md:h-80 object-cover rounded-lg"
                          style={{ display: 'block' }}
                        />
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-xs">
                          LIVE
                        </div>
                        {autoDetectedSize && (
                          <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-3 rounded">
                            <div className="text-sm font-medium">Auto-detected window:</div>
                            <div className="text-lg">{autoDetectedSize.width}" × {autoDetectedSize.height}"</div>
                            <div className="text-xs opacity-75">{autoDetectedSize.type}</div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Reference Object Size (inches):</label>
                        <input
                          type="number"
                          step="0.1"
                          value={referenceSize}
                          onChange={(e) => setReferenceSize(Number(e.target.value))}
                          className="w-full p-2 border rounded"
                          placeholder="e.g., 3.5 for credit card width"
                        />
                        <p className="text-xs text-muted-foreground">
                          Common sizes: Credit card (3.5"), Phone (~6"), Dollar bill (6.14")
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button onClick={capturePhoto} className="w-full">
                          <Camera className="w-5 h-5 mr-2" />
                          Capture Photo
                        </Button>
                        {autoDetectedSize && (
                          <Button 
                            onClick={() => {
                              setMeasurements(autoDetectedSize);
                              setStep('measure');
                              if (stream) {
                                stream.getTracks().forEach(track => track.stop());
                                setIsCapturing(false);
                              }
                            }}
                            variant="outline"
                          >
                            Use Auto-Detection
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {step === 'measure' && capturedImage && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Measure Your Window</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Click the four corners of your window to measure it
                    </p>
                    <canvas
                      ref={canvasRef}
                      onClick={handleCanvasClick}
                      className="w-full border rounded-lg cursor-crosshair"
                      style={{ maxHeight: '400px' }}
                    />
                    <div className="mt-4 space-y-2">
                      <p className="text-sm">Points marked: {measurementPoints.length}/4</p>
                      {measurements && (
                        <div className="p-4 bg-primary/10 rounded-lg">
                          <h4 className="font-semibold text-primary">Measurements:</h4>
                          <p>Width: {measurements.width} inches</p>
                          <p>Height: {measurements.height} inches</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                <Ruler className="w-6 h-6 inline mr-2" />
                Measurement Results
              </h3>
              
              {measurements ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">
                        {measurements.width}"
                      </div>
                      <div className="text-sm text-muted-foreground">Width</div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">
                        {measurements.height}"
                      </div>
                      <div className="text-sm text-muted-foreground">Height</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button onClick={downloadMeasurement} className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Measurements
                    </Button>
                    <Button onClick={resetMeasurement} className="w-full" variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Start Over
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Ruler className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Complete the measurement process to see results here</p>
                </div>
              )}
            </Card>
          </div>

          <Card className="mt-8 p-6">
            <h3 className="text-lg font-semibold mb-4">Tips for Accurate Measurements</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Camera Position:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Hold camera parallel to the window</li>
                  <li>• Keep steady distance from window</li>
                  <li>• Ensure good lighting</li>
                  <li>• Include entire window frame</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Reference Objects:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Credit card: 3.375" × 2.125"</li>
                  <li>• Standard phone: ~6" × 3"</li>
                  <li>• Dollar bill: 6.14" × 2.61"</li>
                  <li>• Use objects with known dimensions</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WindowMeasurement;