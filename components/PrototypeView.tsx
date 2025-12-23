
import React, { useState, useMemo } from 'react';
import { InventoryItem, Supplier } from '../types';

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: '1', brand: 'UltraTech', grade: 'PPC', stock: 450, price: 380, unit: 'Bag' },
  { id: '2', brand: 'ACC', grade: 'OPC 43', stock: 120, price: 410, unit: 'Bag' },
  { id: '3', brand: 'Ambuja', grade: 'OPC 53', stock: 45, price: 425, unit: 'Bag' },
  { id: '4', brand: 'JK Lakshmi', grade: 'PPC', stock: 800, price: 365, unit: 'Bag' },
];

const INITIAL_SUPPLIERS: Supplier[] = [
  { id: 's1', name: 'UltraTech Cement Ltd', outstandingBalance: 125000, lastPaymentDate: '2024-03-15' },
  { id: 's2', name: 'ACC Limited', outstandingBalance: 45000, lastPaymentDate: '2024-03-20' },
  { id: 's3', name: 'Ambuja Cements', outstandingBalance: 0, lastPaymentDate: '2024-03-22' },
];

const PrototypeView: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'billing' | 'accounts'>('dashboard');

  // Billing Form State
  const [selectedBrandId, setSelectedBrandId] = useState<string>(inventory[0].id);
  const [quantity, setQuantity] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Credit Card' | 'UPI'>('Cash');
  const [isGenerating, setIsGenerating] = useState(false);
  const [billGenerated, setBillGenerated] = useState<{ id: string; total: number } | null>(null);

  // Restock State
  const [restockBrandId, setRestockBrandId] = useState<string | null>(null);
  const [restockQty, setRestockQty] = useState<number>(0);

  const lowStockCount = inventory.filter(i => i.stock < 100).length;
  const totalOutstanding = suppliers.reduce((acc, curr) => acc + curr.outstandingBalance, 0);

  const selectedItem = useMemo(() => 
    inventory.find(i => i.id === selectedBrandId), 
    [inventory, selectedBrandId]
  );

  const estimatedTotal = useMemo(() => {
    if (!selectedItem || quantity <= 0) return 0;
    return selectedItem.price * quantity;
  }, [selectedItem, quantity]);

  const handleGenerateBill = () => {
    if (quantity <= 0 || !customerName.trim()) {
      alert("Please enter a valid quantity and customer name.");
      return;
    }
    
    setIsGenerating(true);
    setTimeout(() => {
      const newTotal = estimatedTotal;
      setBillGenerated({
        id: `INV-${Math.floor(Math.random() * 100000)}`,
        total: newTotal
      });
      setIsGenerating(false);
      
      setInventory(prev => prev.map(item => 
        item.id === selectedBrandId 
          ? { ...item, stock: Math.max(0, item.stock - quantity) }
          : item
      ));
    }, 1200);
  };

  const handleRestock = () => {
    if (!restockBrandId || restockQty <= 0) return;
    setInventory(prev => prev.map(item => 
      item.id === restockBrandId ? { ...item, stock: item.stock + restockQty } : item
    ));
    setRestockBrandId(null);
    setRestockQty(0);
  };

  const resetForm = () => {
    setBillGenerated(null);
    setQuantity(0);
    setCustomerName('');
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 min-h-[700px] flex flex-col animate-in fade-in zoom-in-95 duration-500">
      {/* Prototype Header */}
      <div className="bg-slate-900 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-sky-500 w-10 h-10 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">CementFlow Manager</h3>
            <p className="text-sky-400 text-xs font-medium uppercase tracking-wider">Live Prototype v1.2</p>
          </div>
        </div>
        <div className="flex space-x-1 bg-slate-800 p-1 rounded-xl">
          {(['dashboard', 'inventory', 'billing', 'accounts'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Prototype Content */}
      <div className="flex-grow p-8 bg-slate-50 relative overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 text-xs font-bold uppercase mb-2">Today's Sales</p>
                <h4 className="text-3xl font-black text-slate-800">₹42,500</h4>
                <div className="mt-2 flex items-center text-emerald-500 text-xs font-bold">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"/></svg>
                  12% ↑
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 text-xs font-bold uppercase mb-2">Outstanding Dues</p>
                <h4 className="text-3xl font-black text-red-600">₹{totalOutstanding.toLocaleString()}</h4>
                <p className="text-slate-500 text-[10px] mt-2 font-bold uppercase tracking-tight text-red-400">Payable to companies</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 text-xs font-bold uppercase mb-2">Low Stock</p>
                <h4 className={`text-3xl font-black ${lowStockCount > 0 ? 'text-amber-500' : 'text-slate-800'}`}>{lowStockCount} Items</h4>
                <p className="text-slate-500 text-xs mt-2">Critical: {inventory.find(i => i.stock < 100)?.brand || 'None'}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 text-xs font-bold uppercase mb-2">Units Sold (30d)</p>
                <h4 className="text-3xl font-black text-slate-800">1,240</h4>
                <p className="text-slate-500 text-xs mt-2">Average 41 bags / day</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Recent Stock-Out (Sales)</h4>
                  <button className="text-sky-600 text-xs font-bold hover:underline">Full Ledger</button>
                </div>
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'Rajesh Constructions', qty: '-50 Bags', brand: 'UltraTech', amt: '₹19,000' },
                      { name: 'Anita Sharma', qty: '-10 Bags', brand: 'ACC', amt: '₹4,100' },
                      { name: 'Modern Builders', qty: '-200 Bags', brand: 'JK Lakshmi', amt: '₹76,000' },
                    ].map((t, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-700">{t.name}</p>
                          <p className="text-[10px] text-slate-400 uppercase">{t.brand}</p>
                        </td>
                        <td className="px-6 py-4 text-red-500 font-bold">{t.qty}</td>
                        <td className="px-6 py-4 font-mono font-bold text-slate-800">{t.amt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Recent Stock-In (Procurement)</h4>
                </div>
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'UltraTech Cement Ltd', qty: '+500 Bags', date: 'Mar 15' },
                      { name: 'ACC Limited', qty: '+300 Bags', date: 'Mar 10' },
                    ].map((t, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-700">{t.name}</td>
                        <td className="px-6 py-4 text-emerald-500 font-bold">{t.qty}</td>
                        <td className="px-6 py-4 text-slate-400 text-xs">{t.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-bold text-slate-800">Inventory Storage</h4>
              <div className="flex space-x-2">
                <button className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors">Export Stock Report</button>
                <button className="bg-sky-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-sky-700 transition-colors shadow-lg shadow-sky-600/20">Add New Product</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventory.map(item => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-sky-300 transition-all group relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h5 className="font-black text-slate-800 text-lg uppercase">{item.brand}</h5>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">{item.grade}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-[10px] font-bold uppercase">MSRP/Bag</p>
                      <p className="text-slate-800 font-mono font-bold">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">Stock Level</p>
                      <p className={`text-2xl font-black ${item.stock < 100 ? 'text-red-500' : 'text-slate-800'}`}>
                        {item.stock} <span className="text-sm font-medium text-slate-400">Bags</span>
                      </p>
                    </div>
                    <button 
                      onClick={() => setRestockBrandId(item.id)}
                      className="bg-sky-50 text-sky-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-sky-500 hover:text-white transition-all border border-sky-100"
                    >
                      Receive Stock
                    </button>
                  </div>
                  {item.stock < 100 && (
                    <div className="absolute top-0 right-0 p-2">
                       <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {restockBrandId && (
               <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                  <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
                    <h5 className="text-xl font-bold text-slate-800 mb-2">Receive Stock</h5>
                    <p className="text-slate-500 text-sm mb-6">Enter the number of bags received from {inventory.find(i => i.id === restockBrandId)?.brand}.</p>
                    <input 
                      autoFocus
                      type="number" 
                      value={restockQty || ''}
                      onChange={(e) => setRestockQty(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold mb-6 focus:ring-2 focus:ring-sky-500 outline-none" 
                      placeholder="Quantity"
                    />
                    <div className="flex space-x-3">
                      <button onClick={() => setRestockBrandId(null)} className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl">Cancel</button>
                      <button onClick={handleRestock} className="flex-1 bg-sky-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-sky-600/20">Confirm</button>
                    </div>
                  </div>
               </div>
            )}
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="animate-in fade-in slide-in-from-right-4 max-w-2xl mx-auto">
            {billGenerated ? (
              <div className="bg-white p-12 rounded-3xl shadow-lg border border-emerald-100 text-center animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-2xl font-black text-slate-800 mb-2">Sale Recorded</h4>
                <p className="text-slate-500 mb-8">Stock has been deducted and payment logged.</p>
                <button onClick={resetForm} className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-12 py-3 rounded-xl transition-all shadow-lg shadow-sky-500/20">
                  Record Another Sale
                </button>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Outgoing Sales Record
                </h4>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Cement Brand</label>
                      <select 
                        value={selectedBrandId}
                        onChange={(e) => setSelectedBrandId(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                      >
                        {inventory.map(i => (
                          <option key={i.id} value={i.id}>{i.brand} ({i.grade})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Qty (Bags)</label>
                      <input 
                        type="number" 
                        value={quantity || ''}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                        placeholder="0" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 outline-none" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Customer Name</label>
                    <input 
                      type="text" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Contractor or Site Name" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 outline-none" 
                    />
                  </div>
                  <div className="bg-slate-900 rounded-2xl p-6 text-white flex justify-between items-center">
                    <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Sale Value</p>
                        <p className="text-3xl font-black text-sky-400">₹{estimatedTotal.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={handleGenerateBill}
                      disabled={isGenerating || quantity <= 0}
                      className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50"
                    >
                      {isGenerating ? 'Logging...' : 'Confirm Sale'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'accounts' && (
          <div className="animate-in fade-in slide-in-from-right-4 space-y-8">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-bold text-slate-800 tracking-tight">Financial Ledger (Companies & Outstanding)</h4>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">Record Payment to Company</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 bg-slate-50 border-b border-slate-100">
                    <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest">Supplier Outstanding Payments</h5>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {suppliers.map(s => (
                      <div key={s.id} className="p-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                         <div>
                            <p className="font-bold text-slate-800">{s.name}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Last Payment: {s.lastPaymentDate}</p>
                         </div>
                         <div className="text-right">
                            <p className={`text-xl font-black ${s.outstandingBalance > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                              ₹{s.outstandingBalance.toLocaleString()}
                            </p>
                            <button className="text-[10px] font-bold text-sky-600 uppercase hover:underline">View History</button>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 bg-slate-50 border-b border-slate-100">
                    <h5 className="font-black text-slate-800 uppercase text-xs tracking-widest">Customer Credit Outstanding</h5>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {[
                      { name: 'Modern Builders', due: 76000, aging: '15 Days' },
                      { name: 'Kushal Contractors', due: 25000, aging: '5 Days' },
                      { name: 'Gopal & Sons', due: 12000, aging: '32 Days' },
                    ].map((c, i) => (
                      <div key={i} className="p-6 flex justify-between items-center">
                         <div>
                            <p className="font-bold text-slate-800">{c.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Aging: {c.aging}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-xl font-black text-slate-800">₹{c.due.toLocaleString()}</p>
                            <button className="text-[10px] font-bold text-emerald-600 uppercase hover:underline">Record Recovery</button>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-100 px-8 py-3 text-center border-t border-slate-200 flex justify-between items-center">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Interactive Prototype - Financial Mockups for Verification</p>
        <p className="text-[10px] text-slate-400">Environment: Sandbox</p>
      </div>
    </div>
  );
};

export default PrototypeView;
