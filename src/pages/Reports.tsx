import { BarChart3, PieChart, LineChart, Download, Calendar } from 'lucide-react';

const ReportCard = ({ title, description, icon: Icon }: any) => (
  <div className="glass p-8 rounded-3xl group hover:bg-primary/5 transition-all cursor-pointer">
    <div className="p-4 rounded-2xl bg-primary/10 text-primary w-fit mb-6 group-hover:scale-110 transition-transform">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm">
      Generate Report <Download size={16} />
    </div>
  </div>
);

export default function Reports() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-2">Insights into your business performance.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl border border-border font-medium hover:bg-secondary transition-all flex items-center gap-2">
          <Calendar size={18} /> Last 30 Days
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ReportCard 
          title="Sales Summary" 
          description="Detailed breakdown of all sales, taxes collected, and net revenue." 
          icon={BarChart3} 
        />
        <ReportCard 
          title="Inventory Flow" 
          description="Track stock movement, low stock trends, and product performance." 
          icon={PieChart} 
        />
        <ReportCard 
          title="Customer Growth" 
          description="Analyze acquisition rates and lifetime value of your clients." 
          icon={LineChart} 
        />
      </div>

      <div className="glass rounded-3xl p-12 text-center bg-gradient-to-tr from-primary/10 via-transparent to-transparent border-dashed">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Custom Report Builder</h2>
          <p className="text-muted-foreground mb-8">Need something specific? Build a custom report with the data points that matter to you.</p>
          <button className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
            Launch Builder
          </button>
        </div>
      </div>
    </div>
  );
}
