import { create } from 'zustand';
import Fuse from 'fuse.js';

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface BillingState {
  items: Item[];
  clientName: string;
  invoiceDate: string;
  notes: string;
  setClientName: (name: string) => void;
  setInvoiceDate: (date: string) => void;
  setNotes: (notes: string) => void;
  addItem: (item?: Partial<Item>) => void;
  removeItem: (id: string) => void;
  removeItemByName: (name: string, quantity?: number) => void;
  updateItem: (id: string, field: keyof Item, value: string | number) => void;
  clearInvoice: () => void;
}

export const useBillingStore = create<BillingState>((set) => ({
  items: [{ id: '1', name: 'Software Development', price: 15000, quantity: 1 }],
  clientName: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  notes: '',
  setClientName: (name) => set({ clientName: name }),
  setInvoiceDate: (date) => set({ invoiceDate: date }),
  setNotes: (notes) => set({ notes }),
  addItem: (item) => set((state) => ({
    items: [
      ...state.items,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: item?.name || '',
        price: item?.price || 0,
        quantity: item?.quantity || 1,
        ...item
      }
    ]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),
  removeItemByName: (name, quantity) => set((state) => {
    const fuse = new Fuse(state.items, { keys: ['name'], threshold: 0.4 });
    const results = fuse.search(name);
    if (results.length > 0) {
      const targetItem = results[0].item;
      
      if (quantity && targetItem.quantity > quantity) {
        // Reduce quantity
        return {
          items: state.items.map((item) =>
            item.id === targetItem.id
              ? { ...item, quantity: item.quantity - quantity }
              : item
          ),
        };
      } else {
        // Remove entirely
        return {
          items: state.items.filter((item) => item.id !== targetItem.id),
        };
      }
    }
    return state;
  }),
  updateItem: (id, field, value) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    )
  })),
  clearInvoice: () => set({
    items: [],
    clientName: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    notes: ''
  }),
}));
