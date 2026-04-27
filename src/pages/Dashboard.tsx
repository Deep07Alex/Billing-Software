import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, trend, icon: Icon, color }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass p-6 rounded-2xl relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity bg-${color}`} />

    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl bg-${color}/10 text-${color}`}>
        <Icon size={24} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-medium ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>

    <div>
      <p className="text-muted-foreground text-sm font-medium">{title}</p>
      <h3 className="text-3xl font-bold mt-1 tracking-tight">{value}</h3>
    </div>
  </motion.div>
);

const RecentSale = ({ name, date, amount, status }: any) => (
  <div className="flex items-center justify-between p-4 hover:bg-secondary/30 rounded-xl transition-colors cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
        {name.split(' ').map((n: string) => n[0]).join('')}
      </div>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
    <div className="text-right flex items-center gap-4">
      <div>
        <p className="font-bold">₹{amount}</p>
        <p className={`text-[10px] font-bold uppercase tracking-wider ${status === 'Paid' ? 'text-emerald-400' : 'text-amber-400'
          }`}>{status}</p>
      </div>
      <ChevronRight size={18} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Good evening, Aritra!</h1>
          <p className="text-muted-foreground mt-2">Here's what's happening with your business today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl border border-border font-medium hover:bg-secondary transition-all">
            Download Report
          </button>
          <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
            + New Invoice
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="₹1,24,500" trend={12.5} icon={DollarSign} color="primary" />
        <StatCard title="Invoices Sent" value="84" trend={8.2} icon={TrendingUp} color="emerald-400" />
        <StatCard title="Active Inventory" value="452" trend={-2.4} icon={Package} color="slate-400" />
        <StatCard title="New Customers" value="28" trend={18.5} icon={Users} color="teal-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 glass rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold">Recent Invoices</h2>
              <p className="text-sm text-muted-foreground">Manage your latest transactions</p>
            </div>
            <button className="text-primary font-medium text-sm hover:underline flex items-center gap-1">
              View all <ArrowRight size={16} />
            </button>
          </div>

          <div className="space-y-2">
            <RecentSale name="Rajesh Kumar" date="2 mins ago" amount="12,500" status="Paid" />
            <RecentSale name="Anita Sharma" date="45 mins ago" amount="3,200" status="Pending" />
            <RecentSale name="Vikram Singh" date="3 hours ago" amount="45,000" status="Paid" />
            <RecentSale name="Priya Patel" date="Yesterday" amount="8,900" status="Paid" />
            <RecentSale name="Suresh Gupta" date="Yesterday" amount="2,100" status="Pending" />
          </div>
        </div>

        {/* Quick Insights / Stock Alert */}
        <div className="space-y-8">
          <div className="glass rounded-3xl p-8 border-l-4 border-amber-400">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Low Stock Alert
            </h2>
            <div className="space-y-4">
              {[
                { name: 'Ultra HD Monitor', qty: 2 },
                { name: 'Mechanical Keyboard', qty: 5 },
                { name: 'Wireless Mouse', qty: 3 }
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-xs font-bold bg-amber-400/10 text-amber-400 px-2 py-1 rounded-lg">
                    {item.qty} left
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 rounded-xl bg-secondary font-medium hover:bg-secondary/70 transition-colors">
              Reorder All
            </button>
          </div>

          <div className="glass rounded-3xl p-8 bg-gradient-to-br from-primary/20 to-transparent border-none">
            <h2 className="text-xl font-bold mb-2">Upgrade to Pro</h2>
            <p className="text-sm text-muted-foreground mb-6">Get advanced analytics and multi-user support.</p>
            <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
              Go Professional
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
