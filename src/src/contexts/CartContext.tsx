import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  productType: 'zebra' | 'roller' | 'honeycomb';
  productName: string;
  width: string;
  height: string;
  casing: 'square' | 'curved' | 'curved-wrapped';
  wrapped: boolean;
  operation: 'cordless' | 'corded';
  motor: 'none' | 'standard' | 'matter';
  quantity: number;
  style?: string;
  image?: string;
  productCode?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const id = `${item.productType}-${Date.now()}-${Math.random()}`;
    setItems(prev => [...prev, { ...item, id }]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};