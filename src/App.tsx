import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Compass, 
  FileText, 
  HelpCircle, 
  Info, 
  Plane, 
  Train, 
  Utensils, 
  ShoppingBag, 
  Hotel, 
  Navigation, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Check, 
  ListChecks, 
  Ship,
  Sparkles,
  Camera,
  Map,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ITINERARY_DATA, MAP_DATA } from './data/itineraryData';
import { Activity, DayItinerary, Memo, Expense } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'dashboard' | 'timetables' | 'notes'>('itinerary');
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [visitedActivities, setVisitedActivities] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('tohoku_visited');
    return saved ? JSON.parse(saved) : {};
  });
  const [memos, setMemos] = useState<Memo[]>(() => {
    const saved = localStorage.getItem('tohoku_memos');
    return saved ? JSON.parse(saved) : [
      { id: 'm1', content: '記得先上網預約 7/12 返回大石田站的計程車（預計 19:30 出發）', createdAt: '2026-07-08' },
      { id: 'm2', content: '到仙台車站後，記得購買 Loople 巴士一日券（630 日圓）', createdAt: '2026-07-08' },
      { id: 'm3', content: '山寺有 1,015 階石階，記得穿最好走的運動鞋！', createdAt: '2026-07-08' }
    ];
  });
  const [newMemoText, setNewMemoText] = useState('');
  const [activeCameraModal, setActiveCameraModal] = useState<string | null>(null);

  // Expense Tracker states
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('tohoku_expenses');
    return saved ? JSON.parse(saved) : [
      { id: 'e1', dayNumber: 1, title: '機場接駁巴士（往秋田駅）', category: 'transport', amount: 1200, currency: 'JPY', paymentMethod: 'cash', createdAt: '2026-07-09' },
      { id: 'e2', dayNumber: 1, title: '第一天晚餐：比內地雞拉麵', category: 'food', amount: 1800, currency: 'JPY', paymentMethod: 'credit', createdAt: '2026-07-09' },
      { id: 'e3', dayNumber: 2, title: '田澤湖單車租借', category: 'transport', amount: 1000, currency: 'JPY', paymentMethod: 'cash', createdAt: '2026-07-10' },
      { id: 'e4', dayNumber: 3, title: '加茂水族館門票', category: 'ticket', amount: 1000, currency: 'JPY', paymentMethod: 'credit', createdAt: '2026-07-11' },
      { id: 'e5', dayNumber: 4, title: '銀山溫泉計程車（往大石田）', category: 'transport', amount: 2600, currency: 'JPY', paymentMethod: 'cash', createdAt: '2026-07-12' },
      { id: 'e6', dayNumber: 4, title: '銀山溫泉紀念禮品', category: 'gift', amount: 3500, currency: 'JPY', paymentMethod: 'credit', createdAt: '2026-07-12' },
      { id: 'e7', dayNumber: 5, title: '天童溫泉水果派/甜點', category: 'food', amount: 800, currency: 'JPY', paymentMethod: 'cash', createdAt: '2026-07-13' },
      { id: 'e8', dayNumber: 6, title: '藏王御釜山頂午餐', category: 'food', amount: 1200, currency: 'JPY', paymentMethod: 'cash', createdAt: '2026-07-14' },
      { id: 'e9', dayNumber: 7, title: '松島烤牡蠣吃到飽', category: 'food', amount: 3300, currency: 'JPY', paymentMethod: 'credit', createdAt: '2026-07-15' },
    ];
  });

  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<Expense['category']>('food');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCurrency, setExpenseCurrency] = useState<Expense['currency']>('JPY');
  const [expensePayment, setExpensePayment] = useState<Expense['paymentMethod']>('cash');
  const [expenseDay, setExpenseDay] = useState<number>(1);
  const [displayCurrency, setDisplayCurrency] = useState<'TWD' | 'JPY'>('JPY');
  const [selectedExpenseForDetail, setSelectedExpenseForDetail] = useState<Expense | null>(null);

  const JPY_TO_TWD_RATE = 0.2222; // 1 JPY = 0.2222 TWD
  const TWD_TO_JPY_RATE = 4.5;    // 1 TWD = 4.5 JPY

  const getAmountInDisplayCurrency = (amount: number, currency: 'TWD' | 'JPY', targetCurrency: 'TWD' | 'JPY') => {
    if (currency === targetCurrency) return amount;
    if (currency === 'JPY' && targetCurrency === 'TWD') {
      return Math.round(amount * JPY_TO_TWD_RATE);
    } else {
      return Math.round(amount * TWD_TO_JPY_RATE);
    }
  };

  const getExpenseCategoryMeta = (category: Expense['category']) => {
    switch (category) {
      case 'transport':
        return { label: '交通', color: 'bg-emerald-500', textClass: 'text-emerald-600', bgClass: 'bg-emerald-50 border-emerald-100' };
      case 'food':
        return { label: '吃食', color: 'bg-amber-500', textClass: 'text-amber-600', bgClass: 'bg-amber-50 border-amber-100' };
      case 'ticket':
        return { label: '門票', color: 'bg-indigo-500', textClass: 'text-indigo-600', bgClass: 'bg-indigo-50 border-indigo-100' };
      case 'sundry':
        return { label: '雜費', color: 'bg-pink-500', textClass: 'text-pink-600', bgClass: 'bg-pink-50 border-pink-100' };
      case 'gift':
        return { label: '禮品', color: 'bg-purple-500', textClass: 'text-purple-600', bgClass: 'bg-purple-50 border-purple-100' };
      case 'other':
      default:
        return { label: '其他', color: 'bg-slate-500', textClass: 'text-slate-600', bgClass: 'bg-slate-50 border-slate-100' };
    }
  };

  useEffect(() => {
    localStorage.setItem('tohoku_visited', JSON.stringify(visitedActivities));
  }, [visitedActivities]);

  useEffect(() => {
    localStorage.setItem('tohoku_memos', JSON.stringify(memos));
  }, [memos]);

  useEffect(() => {
    localStorage.setItem('tohoku_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const toggleActivityVisited = (id: string) => {
    setVisitedActivities(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddMemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoText.trim()) return;
    const newMemo: Memo = {
      id: Date.now().toString(),
      content: newMemoText.trim(),
      createdAt: new Date().toLocaleDateString()
    };
    setMemos(prev => [newMemo, ...prev]);
    setNewMemoText('');
  };

  const handleDeleteMemo = (id: string) => {
    setMemos(prev => prev.filter(memo => memo.id !== id));
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(expenseAmount);
    if (!expenseTitle.trim() || isNaN(amountNum) || amountNum <= 0) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      dayNumber: expenseDay,
      title: expenseTitle.trim(),
      category: expenseCategory,
      amount: amountNum,
      currency: expenseCurrency,
      paymentMethod: expensePayment,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setExpenses(prev => [newExpense, ...prev]);
    setExpenseTitle('');
    setExpenseAmount('');
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  // Helper to resolve colors and icons per category
  const getCategoryMeta = (category: Activity['category']) => {
    switch (category) {
      case 'flight':
        return { icon: Plane, bg: 'bg-sky-50 text-sky-600 border-sky-200', label: '航班' };
      case 'transport':
        return { icon: Train, bg: 'bg-emerald-50 text-emerald-600 border-emerald-200', label: '交通' };
      case 'hotel':
        return { icon: Hotel, bg: 'bg-indigo-50 text-indigo-600 border-indigo-200', label: '住宿' };
      case 'sightseeing':
        return { icon: MapPin, bg: 'bg-rose-50 text-rose-600 border-rose-200', label: '景點' };
      case 'food':
        return { icon: Utensils, bg: 'bg-amber-50 text-amber-600 border-amber-200', label: '美食' };
      case 'shopping':
        return { icon: ShoppingBag, bg: 'bg-purple-50 text-purple-600 border-purple-200', label: '購物' };
      default:
        return { icon: Info, bg: 'bg-slate-100 text-slate-600 border-slate-200', label: '備忘' };
    }
  };

  const selectedDay = ITINERARY_DATA.find(d => d.dayNumber === selectedDayNum) || ITINERARY_DATA[0];

  // Simple location coordinate mapping for interactive SVG Route Map
  const MAP_NODES = [
    { id: 'akita', label: '秋田', cx: 30, cy: 30, days: [1, 2] },
    { id: 1, label: '田澤湖', cx: 120, cy: 60, days: [2] },
    { id: 2, name: '角館', cx: 200, cy: 90, days: [2] },
    { id: 3, name: '山形', cx: 160, cy: 190, days: [2, 3, 4, 5, 6] },
    { id: 4, name: '鶴岡/加茂', cx: 40, cy: 150, days: [3] },
    { id: 5, name: '銀山溫泉', cx: 260, cy: 140, days: [4] },
    { id: 6, name: '山寺', cx: 240, cy: 220, days: [5] },
    { id: 7, name: '天童', cx: 190, cy: 150, days: [5] },
    { id: 8, name: '藏王御釜', cx: 100, cy: 230, days: [6] },
    { id: 9, name: '松島', cx: 320, cy: 240, days: [7] },
    { id: 10, name: '仙台', cx: 270, cy: 270, days: [2, 6, 7, 8, 9] },
    { id: 11, name: '岩沼/金蛇水', cx: 220, cy: 310, days: [9] },
    { id: 12, name: '仙台機場', cx: 310, cy: 330, days: [9] }
  ];

  return (
    <div className="relative mx-auto max-w-md min-h-screen bg-slate-50 flex flex-col shadow-xl border-x border-slate-200">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
            JP
          </div>
          <div>
            <h1 className="font-sans font-semibold tracking-tight text-slate-800 text-sm">2026 東北 3 縣旅程</h1>
            <p className="font-mono text-[10px] text-slate-500">秋田 ・ 山形 ・ 宮城</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs bg-slate-100 text-slate-700 px-2 py-1.5 rounded-full font-medium">
          <span>⏰ 7/9 - 7/17</span>
        </div>
      </header>

      {/* CORE VIEWPORT */}
      <main className="flex-1 pb-24 overflow-y-auto">
        
        {/* VIEW 1: ITINERARY (DEFAULT) */}
        {activeTab === 'itinerary' && (
          <div>
            {/* Swiper-like Horizontal Days Selector */}
            <div className="sticky top-0 z-30 bg-white border-b border-slate-100 py-3 px-3 shadow-xs">
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar scroll-smooth">
                {ITINERARY_DATA.map((day) => {
                  const isSelected = selectedDayNum === day.dayNumber;
                  return (
                    <button
                      key={day.dayNumber}
                      onClick={() => setSelectedDayNum(day.dayNumber)}
                      className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-xl border transition-all duration-200 ${
                        isSelected 
                          ? 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/30 scale-105' 
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-80">Day {day.dayNumber}</span>
                      <span className="text-sm font-semibold font-mono tracking-tight">{day.date}</span>
                      <span className="text-[10px] font-bold">({day.dayOfWeek})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Day Title Card */}
            <div className="mx-4 mt-4 p-4 bg-gradient-to-br from-amber-500/90 to-amber-600/90 text-white rounded-2xl shadow-md relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
                <Compass size={140} />
              </div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-semibold font-mono">
                  DAY {selectedDay.dayNumber}
                </span>
                <span className="text-xs font-mono text-amber-100 flex items-center gap-1">
                  <Hotel size={13} /> {selectedDay.accommodation.name}
                </span>
              </div>
              <h2 className="text-base font-bold tracking-tight mb-1">{selectedDay.title}</h2>
              <p className="text-xs text-amber-50 font-light flex items-center gap-1">
                🏨 住宿：{selectedDay.accommodation.name} ({selectedDay.accommodation.details})
              </p>
            </div>

            {/* Interactive Progress Meter */}
            <div className="mx-4 mt-3 bg-white px-3 py-2.5 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1"><ListChecks size={14} className="text-amber-500" /> 當日完成進度</span>
              <span className="font-mono font-semibold text-slate-700">
                {selectedDay.activities.filter(a => visitedActivities[a.id]).length} / {selectedDay.activities.length} 已造訪
              </span>
            </div>

            {/* Vertical Timeline Activities */}
            <div className="mx-4 mt-4 relative border-l-2 border-slate-200 pl-4 space-y-5">
              {selectedDay.activities.map((activity, index) => {
                const { icon: Icon, bg, label } = getCategoryMeta(activity.category);
                const isVisited = visitedActivities[activity.id] || false;

                return (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={activity.id} 
                    className={`relative bg-white rounded-xl border p-3.5 transition-all duration-200 ${
                      isVisited ? 'border-slate-100 shadow-none opacity-60' : 'border-slate-200/80 shadow-xs hover:border-amber-300'
                    }`}
                  >
                    {/* Timeline circle dot */}
                    <div className={`absolute -left-[23px] top-4.5 w-3 h-3 rounded-full border-2 transition-all ${
                      isVisited ? 'bg-slate-300 border-white' : 'bg-amber-500 border-white ring-4 ring-amber-50'
                    }`} />

                    {/* Top Row: category and check btn */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-semibold font-mono tracking-tight px-2 py-0.5 rounded-full border ${bg}`}>
                          {label}
                        </span>
                        {activity.time && (
                          <span className="text-xs font-mono font-medium text-slate-500 flex items-center gap-1">
                            <Clock size={12} /> {activity.time}
                          </span>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => toggleActivityVisited(activity.id)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                          isVisited 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : 'border-slate-200 text-slate-400 hover:border-amber-500 hover:text-amber-500'
                        }`}
                      >
                        <Check size={12} strokeWidth={3} />
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className={`text-sm font-bold leading-tight ${isVisited ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {activity.title}
                    </h3>

                    {/* Description */}
                    {activity.description && (
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed whitespace-pre-line font-light">
                        {activity.description}
                      </p>
                    )}

                    {/* Quick Tools & Meta info */}
                    <div className="mt-2.5 pt-2 border-t border-slate-50 flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
                      {activity.cost ? (
                        <span className="font-mono text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                          <DollarSign size={10} /> 預估花費: {activity.cost}
                        </span>
                      ) : <span />}

                      <div className="flex gap-2">
                        {activity.isImportant && (
                          <span className="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-sm font-semibold flex items-center gap-0.5 animate-pulse">
                            ⚠️ 重要注意
                          </span>
                        )}
                        {activity.link && (
                          <a 
                            href={activity.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-sm font-medium flex items-center gap-0.5 hover:underline"
                          >
                            🔗 連結/攻略
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Accommodation card at the end of the timeline (no time) */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: selectedDay.activities.length * 0.05 }}
                className="relative bg-white rounded-xl border p-3.5 border-dashed border-indigo-250 bg-indigo-50/5 shadow-2xs"
              >
                {/* Timeline circle dot */}
                <div className="absolute -left-[23px] top-4.5 w-3 h-3 rounded-full border-2 bg-indigo-500 border-white ring-4 ring-indigo-50" />

                {/* Top Row: category */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold font-mono tracking-tight px-2 py-0.5 rounded-full border bg-indigo-50 text-indigo-600 border-indigo-200/60">
                    住宿飯店
                  </span>
                </div>

                {/* Title (accommodation details or name, no time) */}
                <h3 className="text-sm font-bold leading-tight text-slate-800 flex items-center gap-1">
                  🏠 {selectedDay.accommodation.details || selectedDay.accommodation.name}
                </h3>
                
                {selectedDay.accommodation.details && (
                  <p className="mt-1 text-[11px] text-slate-500 font-mono">
                    {selectedDay.accommodation.name}
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        )}

        {/* VIEW 2: DASHBOARD (OVERVIEW) */}
        {activeTab === 'dashboard' && (
          <div className="p-4 space-y-4">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-white p-3 rounded-2xl border border-slate-100 text-center shadow-2xs">
                <span className="text-[10px] font-medium text-slate-400 block mb-1">總天數</span>
                <span className="font-sans font-bold text-lg text-slate-800 font-mono">9 Days</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-100 text-center shadow-2xs">
                <span className="text-[10px] font-medium text-slate-400 block mb-1">跨足縣市</span>
                <span className="font-sans font-bold text-lg text-slate-800 font-mono">3 縣</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-100 text-center shadow-2xs">
                <span className="text-[10px] font-medium text-slate-400 block mb-1">預估基本交通</span>
                <span className="font-sans font-bold text-sm text-slate-800 font-mono block mt-1">JR Pass</span>
              </div>
            </div>

            {/* Tohoku Route Map Vector Visualizer */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Map size={14} className="text-amber-500" /> 東北跨縣旅程軌跡圖
                </span>
                <span className="text-[10px] text-slate-400 font-mono">2026 東北避暑必備</span>
              </div>
              <div className="relative w-full h-44 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
                {/* Embedded dynamic vector route SVG */}
                <svg className="w-full h-full max-w-[340px]" viewBox="0 0 350 160">
                  {/* Lines connect */}
                  <path d="M 20,30 L 100,50 L 160,50 L 220,110 L 120,110 L 80,110 L 150,110 L 260,110 L 290,60 L 310,130" 
                    fill="none" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Highlighted route path based on selection */}
                  <path d="M 20,30 L 100,50 L 160,50 L 220,110 L 120,110 L 260,110 L 290,60 L 310,130" 
                    fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_10s_linear_infinite]" />

                  {/* Destination Nodes */}
                  <g className="cursor-pointer">
                    <circle cx="20" cy="30" r="6" fill="#f59e0b" />
                    <text x="25" y="24" fontSize="9" fontWeight="bold" fill="#334155">秋田 (D1)</text>

                    <circle cx="100" cy="50" r="5" fill="#f59e0b" />
                    <text x="80" y="42" fontSize="8" fill="#475569">田澤湖</text>

                    <circle cx="160" cy="50" r="5" fill="#f59e0b" />
                    <text x="150" y="42" fontSize="8" fill="#475569">角館</text>

                    <circle cx="220" cy="110" r="6" fill="#3b82f6" />
                    <text x="210" y="125" fontSize="9" fontWeight="bold" fill="#1e3a8a">仙台 (D6-9)</text>

                    <circle cx="120" cy="110" r="6" fill="#10b981" />
                    <text x="105" y="125" fontSize="9" fontWeight="bold" fill="#065f46">山形 (D2-5)</text>

                    <circle cx="80" cy="110" r="5" fill="#10b981" />
                    <text x="65" y="102" fontSize="8" fill="#475569">加茂</text>

                    <circle cx="150" cy="110" r="5" fill="#10b981" />
                    <text x="142" y="102" fontSize="8" fill="#475569">天童</text>

                    <circle cx="260" cy="110" r="5" fill="#f59e0b" />
                    <text x="250" y="102" fontSize="8" fill="#475569">山寺</text>

                    <circle cx="290" cy="60" r="5" fill="#3b82f6" />
                    <text x="282" y="52" fontSize="8" fill="#475569">松島</text>

                    <circle cx="310" cy="130" r="5" fill="#3b82f6" />
                    <text x="270" y="142" fontSize="8" fill="#475569">機場/岩沼</text>
                  </g>
                </svg>
              </div>
              <p className="mt-2 text-[10px] text-slate-400 text-center leading-tight">
                💡 點擊下方 Day 卡片可查看每日對應地圖，主幹道為秋田新幹線與仙山線
              </p>
            </div>

            {/* Travel Prep Note */}
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/60 space-y-2">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                <Sparkles size={14} /> 行前天氣與準備提醒
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                7月為日本東北避暑與初夏季節。山區（如藏王、山寺、羽黑山）日夜溫差大，且有短暫降雨機率，建議帶上一件輕薄防風外套與摺疊傘。
              </p>
              <div className="bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-amber-100 flex items-center justify-between text-[11px] text-amber-900 font-mono">
                <span>🚠 藏王即時影像監控網</span>
                <a href="https://www.town.zao.miyagi.jp/webcamera.html" target="_blank" rel="noopener" className="underline font-bold text-amber-600">
                  即時查看 ➔
                </a>
              </div>
            </div>

            {/* Accommodation Copy Panel */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-slate-700 block">飯店快捷資訊一覽</span>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Richmond Hotel 秋田站前</h4>
                    <p className="text-[10px] text-slate-500 font-mono">住宿日：D1 (7/9)</p>
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText('Richmond Hotel 秋田駅前')}
                    className="text-[10px] font-bold text-amber-500 hover:text-amber-600 font-mono"
                  >
                    複製日文 ➔
                  </button>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">山形站前大和 ROYNET 酒店</h4>
                    <p className="text-[10px] text-slate-500 font-mono">住宿日：D2 - D5 (7/10 - 7/13)</p>
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText('ダイワロイネットホテル山形駅前')}
                    className="text-[10px] font-bold text-amber-500 hover:text-amber-600 font-mono"
                  >
                    複製日文 ➔
                  </button>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">飯店仙台花園宮殿</h4>
                    <p className="text-[10px] text-slate-500 font-mono">住宿日：D6 - D8 (7/14 - 7/16)</p>
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText('ホテルガーデンパレス仙台')}
                    className="text-[10px] font-bold text-amber-500 hover:text-amber-600 font-mono"
                  >
                    複製日文 ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: TIMETABLES (INTERACTIVE SCHEDULES) */}
        {activeTab === 'timetables' && (
          <div className="p-4 space-y-4">
            {/* Matsushima Cruise (Image2 Timetable) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Ship size={15} className="text-sky-500" />
                <span>松島周遊觀光船班次表</span>
              </div>
              <p className="text-[11px] text-slate-500">
                對應原 D6 / D7 行程。推薦 10:00 出航的航班，時間最順。
              </p>
              <div className="divide-y divide-slate-100 font-mono">
                {MAP_DATA.pleasureBoat.map((boat, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-semibold">{boat.time}</span>
                    <span className="text-slate-700">{boat.route}</span>
                    <span className={`px-1.5 py-0.5 text-[9px] rounded font-sans ${
                      boat.type === '推薦' ? 'bg-amber-100 text-amber-800 font-bold' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {boat.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Loople Sendai Stops (Image3 Route Map equivalent) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Navigation size={15} className="text-emerald-500" />
                  <span>LOOPLE 觀光巴士精選站點</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  一日券: 630円
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                仙台市區一日遊首選。每 20 分鐘一班車。
              </p>
              <div className="space-y-3 pt-2">
                {MAP_DATA.loopleSendai.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold font-mono flex-shrink-0">
                      {item.stop}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                      <p className="text-[10px] text-slate-500 font-light mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zao Okama Bus timetable (D5 / D6) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-slate-800 block">藏王御釜公車时刻表</span>
              <p className="text-[11px] text-slate-500 leading-normal">
                刈田停車場（御釜入口）往返「上山溫泉站」與「山形站」班次。
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-1.5 font-bold text-[10px] text-slate-400 font-mono">
                  <span>路線 / 站點</span>
                  <span>午前班次</span>
                  <span>午後班次</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-700">上車：上山溫泉站發</span>
                  <span className="font-bold text-slate-800">09:20</span>
                  <span className="text-slate-600">13:25</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-700">下車：刈田停車場抵</span>
                  <span className="font-bold text-slate-800">10:20</span>
                  <span className="text-slate-600">14:20</span>
                </div>
                <div className="border-t border-slate-200/60 my-2 pt-2 text-[10px] text-amber-600 bg-amber-50/50 p-2 rounded">
                  ⚠️ 御釜停留時間約 40-50 分鐘即可接上第一班回程公車：
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-700">回程：刈田停車場發</span>
                  <span className="font-bold text-slate-800">11:15</span>
                  <span className="text-slate-600">15:30</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-700">回到：上山溫泉站抵</span>
                  <span className="font-bold text-slate-800">12:50</span>
                  <span className="text-slate-600">16:25</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: NOTES & EXPENSE TRACKER */}
        {activeTab === 'notes' && (
          <div className="p-4 space-y-4">
            {/* Expense Tracker Form */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <DollarSign size={15} className="text-amber-500" />
                <span>記帳隨身本 / 新增花費</span>
              </div>
              
              <form onSubmit={handleAddExpense} className="space-y-3">
                {/* Item Name */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">項目名稱</label>
                  <input
                    type="text"
                    required
                    placeholder="例：米棒鍋、計程車、伴手禮..."
                    value={expenseTitle}
                    onChange={(e) => setExpenseTitle(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 bg-slate-50/50"
                  />
                </div>

                {/* Category & Day Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">消費類別</label>
                    <select
                      value={expenseCategory}
                      onChange={(e) => setExpenseCategory(e.target.value as Expense['category'])}
                      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 text-slate-700 focus:outline-none focus:border-amber-500 appearance-none"
                    >
                      <option value="transport">🚗 交通</option>
                      <option value="food">🍲 吃食</option>
                      <option value="ticket">🎫 門票</option>
                      <option value="sundry">🩹 雜費</option>
                      <option value="gift">🎁 禮品</option>
                      <option value="other">☕ 其他</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">消費天數</label>
                    <select
                      value={expenseDay}
                      onChange={(e) => setExpenseDay(Number(e.target.value))}
                      className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 text-slate-700 focus:outline-none focus:border-amber-500 appearance-none"
                    >
                      {Array.from({ length: 9 }, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>Day {day} ({ITINERARY_DATA[day - 1]?.date || ''})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Amount, Currency & Payment */}
                <div className="grid grid-cols-1 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">金額與幣別</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="輸入金額"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 bg-slate-50/50 font-mono"
                      />
                      <div className="flex bg-slate-100 rounded-xl p-0.5 border border-slate-200/60">
                        {(['JPY', 'TWD'] as const).map(curr => (
                          <button
                            key={curr}
                            type="button"
                            onClick={() => setExpenseCurrency(curr)}
                            className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                              expenseCurrency === curr 
                                ? 'bg-white text-amber-600 shadow-3xs' 
                                : 'text-slate-500'
                            }`}
                          >
                            {curr === 'JPY' ? '日幣 (¥)' : '台幣 ($)'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">付款方式</label>
                    <div className="flex bg-slate-100 rounded-xl p-0.5 border border-slate-200/60 w-full">
                      {(['cash', 'credit'] as const).map(method => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setExpensePayment(method)}
                          className={`flex-1 text-center py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                            expensePayment === method 
                              ? 'bg-white text-amber-600 shadow-3xs' 
                              : 'text-slate-500'
                          }`}
                        >
                          {method === 'cash' ? '💵 現金' : '💳 信用卡'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all mt-2 cursor-pointer"
                >
                  <Plus size={14} /> 新增此筆花費
                </button>
              </form>
            </div>

            {/* Expense Settlement & Charts */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  📊 旅程花費統整與結算
                </span>
                
                {/* Display Currency Selector */}
                <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200/60">
                  {(['JPY', 'TWD'] as const).map(curr => (
                    <button
                      key={curr}
                      onClick={() => setDisplayCurrency(curr)}
                      className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${
                        displayCurrency === curr 
                          ? 'bg-white text-slate-800 shadow-3xs' 
                          : 'text-slate-500'
                      }`}
                    >
                      {curr === 'JPY' ? '日幣 (¥)' : '台幣 ($)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Summary */}
              {(() => {
                let totalTWD = 0;
                let totalJPY = 0;
                let cashTWD = 0, cashJPY = 0;
                let creditTWD = 0, creditJPY = 0;

                expenses.forEach(e => {
                  if (e.currency === 'TWD') {
                    totalTWD += e.amount;
                    if (e.paymentMethod === 'cash') cashTWD += e.amount;
                    else creditTWD += e.amount;
                  } else {
                    totalJPY += e.amount;
                    if (e.paymentMethod === 'cash') cashJPY += e.amount;
                    else creditJPY += e.amount;
                  }
                });

                const unifiedTotal = expenses.reduce((acc, e) => {
                  return acc + getAmountInDisplayCurrency(e.amount, e.currency, displayCurrency);
                }, 0);

                const unifiedCash = expenses.reduce((acc, e) => {
                  if (e.paymentMethod !== 'cash') return acc;
                  return acc + getAmountInDisplayCurrency(e.amount, e.currency, displayCurrency);
                }, 0);

                const unifiedCredit = expenses.reduce((acc, e) => {
                  if (e.paymentMethod !== 'credit') return acc;
                  return acc + getAmountInDisplayCurrency(e.amount, e.currency, displayCurrency);
                }, 0);

                return (
                  <div className="space-y-3">
                    <div className="bg-slate-50/85 p-3 rounded-xl border border-slate-100 grid grid-cols-3 gap-2 text-center">
                      <div className="border-r border-slate-200/60 pr-1">
                        <span className="text-[9px] text-slate-400 block">總花費估算</span>
                        <span className="text-sm font-extrabold text-amber-600 font-mono">
                          {displayCurrency === 'JPY' ? '¥' : '$'}{unifiedTotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="border-r border-slate-200/60 px-1">
                        <span className="text-[9px] text-slate-400 block">💵 現金支付</span>
                        <span className="text-xs font-semibold text-slate-700 font-mono">
                          {displayCurrency === 'JPY' ? '¥' : '$'}{unifiedCash.toLocaleString()}
                        </span>
                      </div>
                      <div className="px-1">
                        <span className="text-[9px] text-slate-400 block">💳 信用卡</span>
                        <span className="text-xs font-semibold text-slate-700 font-mono">
                          {displayCurrency === 'JPY' ? '¥' : '$'}{unifiedCredit.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5 font-mono">
                      <span>💡 原始加總：NT$ {totalTWD.toLocaleString()} + ¥{totalJPY.toLocaleString()}</span>
                      <span className="opacity-60">|</span>
                      <span>1 TWD = 4.5 JPY</span>
                    </div>
                  </div>
                );
              })()}

              {/* Chart 1: Daily Expenses Bar Chart */}
              <div className="space-y-2.5 pt-2 border-t border-slate-50">
                <span className="text-[11px] font-bold text-slate-600 block">📅 每日總花費長條圖</span>
                <div className="space-y-2 font-mono text-xs">
                  {(() => {
                    const dailyTotals = Array.from({ length: 9 }, (_, idx) => {
                      const dayNum = idx + 1;
                      const total = expenses
                        .filter(e => e.dayNumber === dayNum)
                        .reduce((sum, e) => sum + getAmountInDisplayCurrency(e.amount, e.currency, displayCurrency), 0);
                      return { dayNum, total };
                    });

                    const maxDaily = Math.max(...dailyTotals.map(d => d.total), 1);

                    return dailyTotals.map(({ dayNum, total }) => {
                      const percentage = (total / maxDaily) * 100;
                      return (
                        <div key={dayNum} className="flex items-center gap-3">
                          <span className="w-12 text-[10px] text-slate-500 font-semibold flex-shrink-0">
                            Day {dayNum} ({ITINERARY_DATA[dayNum - 1]?.date})
                          </span>
                          <div className="flex-1 h-4 bg-slate-50 rounded-lg overflow-hidden border border-slate-100/50 relative flex items-center">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className="h-full bg-amber-400 rounded-r-md"
                            />
                            {total > 0 && (
                              <span className="absolute left-1.5 text-[9px] font-bold text-slate-700 pointer-events-none">
                                {displayCurrency === 'JPY' ? '¥' : '$'}{total.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Chart 2: Category Expenses Bar Chart */}
              <div className="space-y-2.5 pt-2 border-t border-slate-50">
                <span className="text-[11px] font-bold text-slate-600 block">🏷️ 各類別總花費比例</span>
                <div className="space-y-2 font-mono text-xs">
                  {(() => {
                    const categories: Expense['category'][] = ['transport', 'food', 'ticket', 'sundry', 'gift', 'other'];
                    
                    const categoryTotals = categories.map(cat => {
                      const total = expenses
                        .filter(e => e.category === cat)
                        .reduce((sum, e) => sum + getAmountInDisplayCurrency(e.amount, e.currency, displayCurrency), 0);
                      return { cat, total, ...getExpenseCategoryMeta(cat) };
                    });

                    const maxCategory = Math.max(...categoryTotals.map(c => c.total), 1);

                    return categoryTotals.map(({ cat, total, label, color }) => {
                      const percentage = (total / maxCategory) * 100;
                      return (
                        <div key={cat} className="flex items-center gap-3">
                          <span className="w-12 text-[10px] text-slate-500 font-semibold flex-shrink-0">
                            {label}
                          </span>
                          <div className="flex-1 h-4 bg-slate-50 rounded-lg overflow-hidden border border-slate-100/50 relative flex items-center">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              className={`h-full ${color} rounded-r-md`}
                            />
                            {total > 0 && (
                              <span className="absolute left-1.5 text-[9px] font-bold text-slate-700 pointer-events-none">
                                {displayCurrency === 'JPY' ? '¥' : '$'}{total.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>

            {/* Expense Dynamic Data Table */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-slate-800 block">📋 收支動向明細表</span>
              
              <div className="overflow-x-auto rounded-xl border border-slate-150">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-150 text-slate-400 font-semibold text-[10px]">
                      <th className="py-2.5 px-3">項目</th>
                      <th className="py-2.5 px-2 text-center">類別</th>
                      <th className="py-2.5 px-2 text-center">日期</th>
                      <th className="py-2.5 px-3 text-right">金額/支付</th>
                      <th className="py-2.5 px-2 text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {expenses.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-6 text-slate-400 text-[11px] font-sans">
                          暫無記帳紀錄，趕快記錄第一筆吧！
                        </td>
                      </tr>
                    ) : (
                      expenses.map(e => {
                        const catMeta = getExpenseCategoryMeta(e.category);
                        return (
                          <tr 
                            key={e.id} 
                            onClick={() => setSelectedExpenseForDetail(e)}
                            className="hover:bg-amber-50/30 transition-colors cursor-pointer group"
                          >
                            <td className="py-2.5 px-3 font-sans font-medium text-slate-700 max-w-[120px] truncate group-hover:text-amber-600 transition-colors">
                              {e.title}
                            </td>
                            <td className="py-2.5 px-2 text-center">
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${catMeta.bgClass} ${catMeta.textClass} font-sans`}>
                                {catMeta.label}
                              </span>
                            </td>
                            <td className="py-2.5 px-2 text-center text-[10px] text-slate-500">
                              Day {e.dayNumber}
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <div className="font-bold text-slate-850 text-[11px]">
                                {e.currency === 'JPY' ? '¥' : '$'}{e.amount.toLocaleString()}
                              </div>
                              <div className="text-[8.5px] text-slate-400 font-sans">
                                {e.paymentMethod === 'cash' ? '💵 現金' : '💳 刷卡'}
                              </div>
                            </td>
                            <td className="py-2.5 px-2 text-center" onClick={(event) => event.stopPropagation()}>
                              <button
                                onClick={() => handleDeleteExpense(e.id)}
                                className="text-slate-300 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                              >
                                <Trash2 size={12} />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Travel Memos */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-slate-800 block">隨行手記 / 備忘備忘</span>
              <form onSubmit={handleAddMemo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="輸入新的提醒或備忘事項..."
                  value={newMemoText}
                  onChange={(e) => setNewMemoText(e.target.value)}
                  className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 bg-slate-50/50"
                />
                <button
                  type="submit"
                  className="bg-amber-500 text-white rounded-xl px-4 py-2 text-xs font-bold flex items-center gap-1 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
                >
                  <Plus size={14} /> 新增
                </button>
              </form>

              <div className="space-y-2 pt-1">
                {memos.length === 0 ? (
                  <p className="text-center text-xs text-slate-400 py-6">暫無隨行手記，寫點東西吧！</p>
                ) : (
                  memos.map(memo => (
                    <div key={memo.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-slate-700 font-light leading-relaxed">{memo.content}</p>
                        <span className="text-[9px] font-mono text-slate-400 mt-1 block">{memo.createdAt}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteMemo(memo.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER TAB BAR */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 py-2.5 px-4 flex justify-around shadow-lg mx-auto max-w-md">
        <button 
          onClick={() => setActiveTab('itinerary')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            activeTab === 'itinerary' ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Calendar size={18} />
          <span>每日行程</span>
        </button>
        <button 
          onClick={() => {
            setActiveTab('dashboard');
          }}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            activeTab === 'dashboard' ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Compass size={18} />
          <span>旅程指南</span>
        </button>
        <button 
          onClick={() => setActiveTab('timetables')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            activeTab === 'timetables' ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Navigation size={18} />
          <span>轉乘時刻表</span>
        </button>
        <button 
          onClick={() => setActiveTab('notes')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
            activeTab === 'notes' ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <FileText size={18} />
          <span>隨手記</span>
        </button>
      </footer>

      {/* EXPENSE DETAIL OVERLAY MODAL */}
      <AnimatePresence>
        {selectedExpenseForDetail && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-5"
            onClick={() => setSelectedExpenseForDetail(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              className="bg-white rounded-2xl p-5 shadow-xl border border-slate-100 max-w-[290px] w-full relative space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Category Icon & Badge */}
              <div className="flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-xs border ${
                  getExpenseCategoryMeta(selectedExpenseForDetail.category).bgClass
                } mb-2`}>
                  {selectedExpenseForDetail.category === 'transport' ? '🚗' :
                   selectedExpenseForDetail.category === 'food' ? '🍲' :
                   selectedExpenseForDetail.category === 'ticket' ? '🎫' :
                   selectedExpenseForDetail.category === 'sundry' ? '🩹' :
                   selectedExpenseForDetail.category === 'gift' ? '🎁' : '☕'}
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                  getExpenseCategoryMeta(selectedExpenseForDetail.category).bgClass
                } ${getExpenseCategoryMeta(selectedExpenseForDetail.category).textClass}`}>
                  {getExpenseCategoryMeta(selectedExpenseForDetail.category).label}
                </span>
              </div>

              {/* Title / Description */}
              <div className="space-y-1.5 text-center">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">消費項目明細</h4>
                <p className="text-sm font-bold text-slate-800 leading-normal font-sans px-1 break-words whitespace-pre-wrap">
                  {selectedExpenseForDetail.title}
                </p>
              </div>

              {/* Amount Display with Both Currencies */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2 text-center">
                <span className="text-[10px] text-slate-400 block font-sans">實付金額</span>
                <div className="font-mono font-black text-lg text-amber-600">
                  {selectedExpenseForDetail.currency === 'JPY' ? '¥' : '$'}{selectedExpenseForDetail.amount.toLocaleString()}
                </div>
                <div className="text-[9.5px] text-slate-400 font-mono border-t border-slate-200/50 pt-1.5">
                  約 {selectedExpenseForDetail.currency === 'JPY' ? '$' : '¥'}{
                    getAmountInDisplayCurrency(
                      selectedExpenseForDetail.amount, 
                      selectedExpenseForDetail.currency, 
                      selectedExpenseForDetail.currency === 'JPY' ? 'TWD' : 'JPY'
                    ).toLocaleString()
                  }
                </div>
              </div>

              {/* Extra Details Grid */}
              <div className="grid grid-cols-2 gap-2 text-center text-[10px] text-slate-500 font-sans">
                <div className="bg-slate-50/50 rounded-lg p-2 border border-slate-100/50">
                  <span className="text-[9px] text-slate-400 block mb-0.5">花費日期</span>
                  <span className="font-bold text-slate-700 font-mono">Day {selectedExpenseForDetail.dayNumber}</span>
                  <span className="block text-[8.5px] font-mono text-slate-400">({ITINERARY_DATA[selectedExpenseForDetail.dayNumber - 1]?.date})</span>
                </div>
                <div className="bg-slate-50/50 rounded-lg p-2 border border-slate-100/50">
                  <span className="text-[9px] text-slate-400 block mb-0.5">付款管道</span>
                  <span className="font-bold text-slate-700 font-sans">
                    {selectedExpenseForDetail.paymentMethod === 'cash' ? '💵 現金支付' : '💳 信用卡刷卡'}
                  </span>
                </div>
              </div>

              {/* Action Close Buttons */}
              <button
                onClick={() => setSelectedExpenseForDetail(null)}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-xl py-2 text-xs font-bold transition-all active:scale-98 shadow-xs cursor-pointer text-center"
              >
                確認關閉
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
