import { Package, Search, Filter, Plus, Edit2, Trash2 } from 'lucide-react';

const InventoryItem = ({ name, category, stock, price }: any) => (
  <tr className="border-b border-border hover:bg-secondary/20 transition-colors group">
    <td className="py-4 px-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
          <Package size={18} className="text-muted-foreground" />
        </div>
        <span className="font-semibold">{name}</span>
      </div>
    </td>
    <td className="py-4 text-muted-foreground">{category}</td>
    <td className="py-4">
      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
        stock < 10 ? 'bg-destructive/10 text-destructive' : 'bg-emerald-400/10 text-emerald-400'
      }`}>
        {stock} in stock
      </span>
    </td>
    <td className="py-4 font-bold">₹{price}</td>
    <td className="py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="flex justify-end gap-2">
        <button className="p-2 hover:bg-secondary rounded-lg"><Edit2 size={16} /></button>
        <button className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg"><Trash2 size={16} /></button>
      </div>
    </td>
  </tr>
);

export default function Inventory() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground mt-2">Manage your stock and product catalog.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="glass rounded-3xl overflow-hidden p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              placeholder="Search products..."
              className="w-full bg-secondary/50 border border-border rounded-xl py-2 pl-10 pr-4 outline-none"
            />
          </div>
          <button className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center gap-2 font-medium">
            <Filter size={18} /> Filters
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-muted-foreground text-sm border-b border-border">
              <th className="pb-4 font-medium">Product Name</th>
              <th className="pb-4 font-medium">Category</th>
              <th className="pb-4 font-medium">Stock Status</th>
              <th className="pb-4 font-medium">Price</th>
              <th className="pb-4"></th>
            </tr>
          </thead>
          <tbody>
            <InventoryItem name="Ultra HD Monitor" category="Electronics" stock={2} price="24,999" />
            <InventoryItem name="Mechanical Keyboard" category="Accessories" stock={45} price="4,500" />
            <InventoryItem name="Wireless Mouse" category="Accessories" stock={120} price="1,200" />
            <InventoryItem name="Ergonomic Chair" category="Furniture" stock={8} price="15,000" />
            <InventoryItem name="MacBook Pro M3" category="Computers" stock={5} price="1,69,900" />
          </tbody>
        </table>
      </div>
    </div>
  );
}
