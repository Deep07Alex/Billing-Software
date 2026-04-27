import { Mail, Phone, MapPin, MoreHorizontal } from 'lucide-react';

const CustomerCard = ({ name, email, phone, location }: any) => (
  <div className="glass p-6 rounded-3xl hover:border-primary/50 transition-all group">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
        {name[0]}
      </div>
      <button className="text-muted-foreground hover:text-foreground transition-colors">
        <MoreHorizontal size={20} />
      </button>
    </div>
    
    <h3 className="text-xl font-bold mb-4">{name}</h3>
    
    <div className="space-y-3 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Mail size={14} className="text-primary" /> {email}
      </div>
      <div className="flex items-center gap-2">
        <Phone size={14} className="text-primary" /> {phone}
      </div>
      <div className="flex items-center gap-2">
        <MapPin size={14} className="text-primary" /> {location}
      </div>
    </div>
    
    <button className="w-full mt-6 py-2 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground transition-all font-medium text-sm">
      View Transaction History
    </button>
  </div>
);

export default function Customers() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-2">Maintain relationships with your clients.</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
          + New Customer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CustomerCard name="Rajesh Kumar" email="rajesh@example.com" phone="+91 98765 43210" location="Mumbai, Maharashtra" />
        <CustomerCard name="Anita Sharma" email="anita@example.com" phone="+91 91234 56789" location="Delhi, NCR" />
        <CustomerCard name="Vikram Singh" email="vikram@example.com" phone="+91 90000 11111" location="Bangalore, Karnataka" />
        <CustomerCard name="Priya Patel" email="priya@example.com" phone="+91 88888 77777" location="Ahmedabad, Gujarat" />
      </div>
    </div>
  );
}
