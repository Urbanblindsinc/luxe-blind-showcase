import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  children: React.ReactNode;
}

const Cart = ({ children }: CartProps) => {
  const { items, removeItem, updateQuantity, clearCart, getTotalItems } = useCart();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [isValidPromo, setIsValidPromo] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePromoCode = (code: string) => {
    const currentDate = new Date();
    const startDate = new Date('2025-10-01');
    const endDate = new Date('2025-11-30');
    
    const isDateValid = currentDate >= startDate && currentDate <= endDate;
    const isCodeValid = code.toUpperCase() === "FALLMOTOR30";
    const isValid = isCodeValid && isDateValid;
    
    setIsValidPromo(code.length > 0 ? isValid : null);
    return isValid;
  };

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setPromoCode(code);
    if (code.length > 0) {
      validatePromoCode(code);
    } else {
      setIsValidPromo(null);
    }
  };

  const handleQuoteRequest = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    if (!email && !phone) {
      toast.error('Please enter your email or phone number');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Track the cart quote request
      const { trackInteraction } = await import("@/utils/trackInteraction");
      await trackInteraction("Cart Quote Request", {
        email,
        phone,
        itemCount: items.length,
        promoCode: promoCode || 'None'
      });
      
      const promoInfo = promoCode && validatePromoCode(promoCode) 
        ? { promoCode: promoCode.toUpperCase(), discount: '30% OFF MOTORIZED BLINDS - Fall Sale' }
        : null;

      const configuration = items.map((it: any, i: number) => {
        const lines = [
          `Blind #${i + 1}: ${it.productName || it.name || 'Item'}`,
          it.productCode ? `  Code: ${it.productCode}` : '',
          it.width && it.height ? `  Dimensions: ${it.width}" x ${it.height}"` : '',
          it.productType ? `  Type: ${it.productType}` : '',
          it.casing ? `  Casing: ${it.casing}${it.wrapped ? ' (wrapped)' : ''}` : '',
          it.operation ? `  Operation: ${it.operation}` : '',
          it.motor ? `  Motor: ${it.motor}` : '',
          it.style ? `  Style: ${it.style}` : '',
          it.quantity != null ? `  Quantity: ${it.quantity}` : '',
        ].filter(Boolean);
        return lines.join('\n');
      }).join('\n\n');

      const idempotencyKey = `cart-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      const { error } = await supabase.functions.invoke('send-email-resend', {
        body: {
          templateName: 'contact-message',
          recipientEmail: 'urban.blinds.inc@gmail.com',
          idempotencyKey,
          templateData: {
            source: 'Cart Quote Request',
            email: email || 'Not provided',
            phone: phone || 'Not provided',
            promoCode: promoInfo ? `${promoInfo.promoCode} — ${promoInfo.discount}` : 'None',
            numberOfBlinds: String(items.length),
            totalQuantity: String(items.reduce((s: number, it: any) => s + (it.quantity || 1), 0)),
            configuration,
          },
        },
      });

      if (error) throw error;

      toast.success('Quote request sent successfully!');
      clearCart();
      setEmail('');
      setPhone('');
      setPromoCode('');
      setIsValidPromo(null);
      
      // Redirect to thank you page for conversion tracking
      navigate('/thank-you', { replace: true });
    } catch (error) {
      console.error('Error sending quote request:', error);
      toast.error('Failed to send quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative">
          {children}
          {getTotalItems() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
              {getTotalItems()}
            </Badge>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({getTotalItems()} items)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Your cart is empty
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.productName}</h4>
                      {item.style && (
                        <p className="text-sm text-muted-foreground">{item.style}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Dimensions:</span>
                      <p>{item.width}" × {item.height}"</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Casing:</span>
                      <p className="capitalize">{item.casing}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Operation:</span>
                      <p className="capitalize">{item.operation}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Motor:</span>
                      <p className="capitalize">{item.motor === 'none' ? 'No Motor' : item.motor}</p>
                    </div>
                  </div>
                  
                  {item.wrapped && (
                    <div className="text-sm">
                      <Badge variant="secondary">Wrapped Installation</Badge>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="space-y-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="promo">Promo Code (Optional)</Label>
                    <Input
                      id="promo"
                      type="text"
                      placeholder="FALLMOTOR30"
                      value={promoCode}
                      onChange={handlePromoCodeChange}
                      className={isValidPromo === false ? 'border-red-500' : isValidPromo === true ? 'border-green-500' : ''}
                    />
                    {isValidPromo === true && (
                      <p className="text-sm text-green-600">✓ 30% OFF Motorized Blinds applied!</p>
                    )}
                    {isValidPromo === false && (
                      <p className="text-sm text-red-600">Invalid promo code or expired</p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Please enter at least one contact method (email or phone). FALLMOTOR30 valid Oct 1 - Nov 30, 2025.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={clearCart} className="flex-1">
                    Clear Cart
                  </Button>
                  <Button 
                    onClick={handleQuoteRequest} 
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Request Quote'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Cart;