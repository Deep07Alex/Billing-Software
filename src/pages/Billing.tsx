import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Printer, 
  Download, 
  Send,
  User,
  Calendar,
  FileText,
  Calculator
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Billing() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: 'Software Development', price: 15000, quantity: 1 }
  ]);
  const [clientName, setClientName] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), name: '', price: 0, quantity: 1 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof Item, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Create Invoice</h1>
          <p className="text-muted-foreground mt-2">Generate professional invoices for your clients.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-border font-medium hover:bg-secondary transition-all flex items-center gap-2">
            <Printer size={18} /> Print
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2">
            <Send size={18} /> Send Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Invoice Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <User size={14} /> Client Name
                </label>
                <input 
                  type="text" 
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter client name"
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar size={14} /> Invoice Date
                </label>
                <input 
                  type="date" 
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="font-bold text-lg">Invoice Items</h3>
                <button 
                  onClick={addItem}
                  className="text-primary hover:bg-primary/10 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors"
                >
                  <Plus size={16} /> Add Item
                </button>
              </div>

              <div className="space-y-3">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="grid grid-cols-12 gap-4 items-center"
                    >
                      <div className="col-span-6">
                        <input 
                          placeholder="Item description"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          className="w-full bg-secondary/30 border border-transparent rounded-lg px-3 py-2 focus:bg-secondary/50 focus:border-border transition-all outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <input 
                          type="number"
                          placeholder="Price"
                          value={item.price || ''}
                          onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value))}
                          className="w-full bg-secondary/30 border border-transparent rounded-lg px-3 py-2 focus:bg-secondary/50 focus:border-border transition-all outline-none"
                        />
                      </div>
                      <div className="col-span-2">
                        <input 
                          type="number"
                          placeholder="Qty"
                          value={item.quantity || ''}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                          className="w-full bg-secondary/30 border border-transparent rounded-lg px-3 py-2 focus:bg-secondary/50 focus:border-border transition-all outline-none text-center"
                        />
                      </div>
                      <div className="col-span-1 text-right font-bold text-sm">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 bg-gradient-to-tr from-primary/5 to-transparent">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FileText size={18} className="text-primary" /> Additional Notes
            </h3>
            <textarea 
              placeholder="Add any specific instructions or terms..."
              className="w-full h-24 bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all"
            />
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="space-y-6">
          <div className="glass rounded-3xl p-8 sticky top-8">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
              <Calculator size={20} className="text-primary" /> Order Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>GST (18%)</span>
                <span className="font-medium text-foreground">₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground border-b border-border pb-4">
                <span>Discount</span>
                <span className="font-medium text-emerald-400">-₹0</span>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-3xl font-black text-primary">₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <Download size={18} /> Generate PDF
              </button>
              <button className="w-full py-3 rounded-2xl bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition-all">
                Save Draft
              </button>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-[10px] text-center text-primary font-bold uppercase tracking-widest leading-relaxed">
                Payments are due within 15 days. Please include invoice number on all correspondence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
