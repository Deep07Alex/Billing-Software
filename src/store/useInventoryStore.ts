import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface InventoryState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  products: [
    { id: '1', name: 'Ultra HD Keyboard', price: 2500, stock: 50, category: 'Peripherals' },
    { id: '2', name: 'Logitech G Pro Mouse', price: 4500, stock: 30, category: 'Peripherals' },
    { id: '3', name: 'Samsung 27" Monitor', price: 18000, stock: 15, category: 'Display' },
    { id: '4', name: 'Dell XPS 13', price: 95000, stock: 5, category: 'Laptops' },
    { id: '5', name: 'MacBook Air M2', price: 115000, stock: 10, category: 'Laptops' },
    { id: '6', name: 'Classmate Notebook', price: 60, stock: 200, category: 'Stationery' },
    { id: '7', name: 'Parker Jotter Pen', price: 250, stock: 100, category: 'Stationery' },
    { id: '8', name: 'ASUS ROG Strix G16', price: 125000, stock: 8, category: 'Laptops' },
    { id: '9', name: 'NVIDIA RTX 4080', price: 98000, stock: 12, category: 'GPU' },
    { id: '10', name: 'Corsair Vengeance 32GB RAM', price: 12000, stock: 40, category: 'Memory' },
    { id: '11', name: 'Samsung 980 Pro 1TB SSD', price: 9500, stock: 60, category: 'Storage' },
    { id: '12', name: 'Razer BlackWidow V4', price: 15000, stock: 25, category: 'Peripherals' },
    { id: '13', name: 'Intel Core i9-14900K', price: 55000, stock: 15, category: 'CPU' },
    { id: '14', name: 'MSI MPG Z790 Motherboard', price: 32000, stock: 10, category: 'Motherboards' },
    { id: '15', name: 'Logitech C922 Webcam', price: 8500, stock: 20, category: 'Peripherals' },
    { id: '16', name: 'SteelSeries Arctis Nova 7', price: 18000, stock: 18, category: 'Audio' },
    { id: '17', name: 'TP-Link Archer AX6000', price: 22000, stock: 14, category: 'Networking' },
    { id: '18', name: 'HyperX Cloud II', price: 7500, stock: 35, category: 'Audio' },
    { id: '19', name: 'WD My Passport 2TB', price: 6500, stock: 50, category: 'Storage' },
    { id: '20', name: 'Blue Yeti Microphone', price: 11000, stock: 12, category: 'Audio' },
  ],
  setProducts: (products) => set({ products }),
}));
