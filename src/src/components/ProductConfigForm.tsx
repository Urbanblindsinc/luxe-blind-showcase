import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart, CartItem } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductConfigFormProps {
  productType: 'zebra' | 'roller' | 'honeycomb';
  productName: string;
  currentStyle?: string;
  currentImage?: string;
  productCode?: string;
  onClose: () => void;
}

const ProductConfigForm = ({ productType, productName, currentStyle, currentImage, productCode, onClose }: ProductConfigFormProps) => {
  const { addItem } = useCart();
  const [config, setConfig] = useState({
    width: '',
    height: '',
    casing: 'square' as 'square' | 'curved' | 'curved-wrapped',
    operation: 'cordless' as 'cordless' | 'corded',
    motor: 'none' as 'none' | 'standard' | 'matter',
    quantity: 1
  });

  const handleAddToCart = () => {
    if (!config.width || !config.height) {
      toast.error('Please enter width and height dimensions');
      return;
    }

    const item: Omit<CartItem, 'id'> = {
      productType,
      productName,
      width: config.width,
      height: config.height,
      casing: config.casing,
      wrapped: false,
      operation: config.operation,
      motor: config.motor,
      quantity: config.quantity,
      style: currentStyle,
      image: currentImage,
      productCode: productCode
    };

    addItem(item);
    toast.success(`Added ${config.quantity} ${productName} to cart`);
    onClose();
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-md mx-auto animate-fade-in">
      <div>
        <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Configure Your {productName}</h3>
        
        {/* Dimensions */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
          <div>
            <Label htmlFor="width" className="text-sm md:text-base">Width (inches)</Label>
            <Input
              id="width"
              type="number"
              placeholder="36"
              value={config.width}
              onChange={(e) => setConfig(prev => ({ ...prev, width: e.target.value }))}
              className="text-sm md:text-base"
            />
          </div>
          <div>
            <Label htmlFor="height" className="text-sm md:text-base">Height (inches)</Label>
            <Input
              id="height"
              type="number"
              placeholder="48"
              value={config.height}
              onChange={(e) => setConfig(prev => ({ ...prev, height: e.target.value }))}
              className="text-sm md:text-base"
            />
          </div>
        </div>

        {/* Casing Type */}
        <div className="mb-4 md:mb-6">
          <Label className="text-sm md:text-base font-medium">Casing Type</Label>
          <RadioGroup
            value={config.casing}
            onValueChange={(value) => setConfig(prev => ({ ...prev, casing: value as 'square' | 'curved' | 'curved-wrapped' }))}
            className="mt-2 space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="square" id="square" />
              <Label htmlFor="square" className="text-sm md:text-base">Square Casing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="curved" id="curved" />
              <Label htmlFor="curved" className="text-sm md:text-base">Curved Casing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="curved-wrapped" id="curved-wrapped" />
              <Label htmlFor="curved-wrapped" className="text-sm md:text-base">Curved Wrapped Casing</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Operation Type */}
        <div className="mb-4 md:mb-6">
          <Label className="text-sm md:text-base font-medium">Operation Type</Label>
          <RadioGroup
            value={config.operation}
            onValueChange={(value) => setConfig(prev => ({ ...prev, operation: value as 'cordless' | 'corded' }))}
            className="mt-2 space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cordless" id="cordless" />
              <Label htmlFor="cordless" className="text-sm md:text-base">Cordless</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="corded" id="corded" />
              <Label htmlFor="corded" className="text-sm md:text-base">Corded</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Motor Options */}
        <div className="mb-4 md:mb-6">
          <Label htmlFor="motor" className="text-sm md:text-base font-medium">Motor Option</Label>
          <Select
            value={config.motor}
            onValueChange={(value) => setConfig(prev => ({ ...prev, motor: value as 'none' | 'standard' | 'matter' }))}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select motor option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Motor</SelectItem>
              <SelectItem value="standard">Standard Motor</SelectItem>
              <SelectItem value="matter">Matter Motor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quantity */}
        <div className="mb-4 md:mb-6">
          <Label className="text-sm md:text-base font-medium">Quantity</Label>
          <div className="flex items-center space-x-2 mt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setConfig(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
            >
              <Minus className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <span className="w-10 md:w-12 text-center font-medium text-sm md:text-base">{config.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setConfig(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
            >
              <Plus className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button onClick={handleAddToCart} className="w-full" size="lg">
          Add to Cart
          <ShoppingCart className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ProductConfigForm;