import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Video, Sparkles, X, ChevronUp, Share2, Home, Clock, TrendingUp, Star, Phone, Info, Shield, HelpCircle } from "lucide-react";

// --- Video Data ---
interface MediaItem {
  id: string;
  caption: string;
  image: string;
  link: string;
  category: "new" | "popular" | "special";
  status?: "নতুন" | "Hot" | "Trending" | "Popular";
  timeLabel?: string;
  views?: string;
}

const mediaItems: MediaItem[] = [
  {
    id: "1",
    caption: "ইউএনওর আলোচিত ঘটনা—পুরো ঘটনার বিস্তারিত আপডেট",
    image: "https://i.postimg.cc/QNwWZnxp/photo-2026-03-18-17-40-02(1).jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "new",
    status: "Trending",
    timeLabel: "১ ঘণ্টা আগে"
  },
  {
    id: "2",
    caption: "প্রবাসীদের জীবনে ঘটে যাওয়া কিছু বাস্তব ঘটনা যা ভাইরাল",
    image: "https://i.postimg.cc/HnD7GBQr/photo-2026-04-21-11-57-03.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "popular",
    status: "Hot"
  },
  {
    id: "3",
    caption: "প্রতারণা চক্র থেকে বাঁচতে সচেতনতামূলক ভিডিও আপডেট",
    image: "https://i.postimg.cc/0yWM58pn/photo-2026-04-21-13-08-37.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "special"
  },
  {
    id: "4",
    caption: "শিক্ষা প্রতিষ্ঠান কেন্দ্রিক সমসাময়িক আলোচিত ভিডিও",
    image: "https://i.postimg.cc/BZTjL5TP/photo-2026-04-21-13-13-58.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "new",
    status: "নতুন",
    timeLabel: "আজ আপডেট"
  },
  {
    id: "5",
    caption: "সোশ্যাল মিডিয়ায় আলোচিত আজকের সেরা আপডেটগুলো",
    image: "https://i.postimg.cc/RFr0qqN5/photo-2026-04-21-11-40-34.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "popular",
    status: "Popular"
  },
  {
    id: "6",
    caption: "ঘটনার আড়ালের সত্য প্রকাশ—বিস্তারিত ভিডিওতে দেখুন",
    image: "https://i.postimg.cc/Kvc816vy/photo-2026-04-21-11-38-59.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "special",
    status: "Trending"
  }
];

const popularVideos: MediaItem[] = [
  {
    id: "popular-1",
    caption: "গত সপ্তাহের আলোচিত সেরা ভিডিও কালেকশন",
    image: "https://i.postimg.cc/q76khyPB/photo-2026-04-12-06-42-22.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "popular",
    views: "১.২ লক্ষ"
  },
  {
    id: "popular-2",
    caption: "সোশ্যাল মিডিয়ায় সবচেয়ে বেশি দেখা ভিডিও",
    image: "https://i.postimg.cc/cCLGJN7X/photo-2026-04-21-13-17-44.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "popular",
    views: "৯৫ হাজার"
  },
  {
    id: "popular-3",
    caption: "বাছাইকৃত স্পেশাল বিনোদনমূলক ভিডিও",
    image: "https://i.postimg.cc/vHGHq1nF/photo-2025-07-19-15-21-23.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "popular",
    views: "৮০ হাজার"
  },
  {
    id: "popular-4",
    caption: "জনপ্রিয়তার শীর্ষে থাকা সেরা আপডেট",
    image: "https://i.postimg.cc/vmCZ33rt/photo-2025-05-31-10-34-32.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "popular",
    views: "১.৫ লক্ষ"
  }
];

// --- Components ---

const BubbleBackground = () => (
  <>
    <div className="colorful-bg" />
    <div className="glow-blob top-[-10%] left-[-10%] bg-purple-600/5" />
    <div className="glow-blob bottom-[-10%] right-[-10%] bg-blue-600/5" />
  </>
);

const Logo = ({ size = "md", showSubtitle = true }: { size?: "sm" | "md" | "lg"; showSubtitle?: boolean }) => {
  const isSm = size === "sm";
  const isLg = size === "lg";
  
  return (
    <div className="flex items-center gap-3 select-none group">
      {/* Icon Part */}
      <div className={`relative ${isSm ? 'h-8 w-8' : isLg ? 'h-14 w-14' : 'h-10 w-10 md:h-12 md:w-12'} flex-shrink-0`}>
        {/* Glow Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
        
        {/* Main Icon Body */}
        <div className="relative h-full w-full bg-[#111118] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20" />
          
          {/* SVG Play Button Shape */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className={`${isSm ? 'h-4 w-4' : 'h-6 w-6'} transform transition-transform group-hover:scale-110 duration-500`}
          >
            <path 
              d="M18.2574 10.174C19.7468 11.034 19.7468 12.966 18.2574 13.826L8.85058 19.2562C7.36116 20.1162 5.50002 19.1492 5.50002 17.4302L5.50002 6.56981C5.50002 4.85078 7.36116 3.88373 8.85058 4.74373L18.2574 10.174Z" 
              fill="url(#logo-grad)" 
            />
            <defs>
              <linearGradient id="logo-grad" x1="5.5" y1="4" x2="19" y2="19" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9333ea" />
                <stop offset="1" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Text Part */}
      <div className="flex flex-col">
        <h1 className={`font-bengali font-black italic tracking-tighter leading-none text-white ${isSm ? 'text-lg' : isLg ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
          দেশি কালেকশন
        </h1>
        {showSubtitle && (
          <span className={`font-bold tracking-widest uppercase text-purple-400 ${isSm ? 'text-[6px]' : 'text-[8px] md:text-[10px]'}`}>
            PREMIUM VIDEO UPDATES
          </span>
        )}
      </div>
    </div>
  );
};

const SectionHeader = ({ title, icon: Icon }: { title: string; icon: any }) => (
  <div className="flex items-center gap-3 mb-8 px-2">
    <div className="h-10 w-10 bg-purple-900/30 rounded-xl flex items-center justify-center text-xl shadow-inner border border-purple-500/20">
      <Icon className="h-5 w-5 text-purple-400" />
    </div>
    <h2 className="font-bengali text-xl md:text-2xl font-bold text-white tracking-tight">
      {title}
    </h2>
  </div>
);

const VideoCard = ({ item, index, priority = false, onVideoClick }: any) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-orange-500 text-white border border-orange-400/30 shadow-[0_0_10px_rgba(249,115,22,0.3)]';
      case 'Trending': return 'bg-purple-600 text-white border border-purple-400/30 shadow-[0_0_10px_rgba(124,58,237,0.3)]';
      case 'Popular': return 'bg-blue-600 text-white border border-blue-400/30 shadow-[0_0_10px_rgba(37,99,235,0.3)]';
      case 'নতুন': return 'bg-emerald-600 text-white border border-emerald-400/30 shadow-[0_0_10px_rgba(5,150,105,0.3)]';
      default: return 'bg-purple-600 text-white';
    }
  };

  return (
    <motion.button
      onClick={() => onVideoClick(item)}
      initial={priority ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, delay: priority ? 0 : index * 0.02 }}
      whileTap={{ scale: 0.98 }}
      className="video-card group block overflow-hidden rounded-2xl bg-[#111118] border border-white/5"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={item.image}
          alt={item.caption}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="video-badge">ভিডিও</div>
        {item.status && (
          <div className={`absolute top-3 right-3 z-10 font-bengali text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-lg ${getStatusStyle(item.status)}`}>
            {item.status}
          </div>
        )}
      </div>
      <div className="p-4 md:p-5">
        <h3 className="font-bengali text-xs md:text-base font-bold leading-tight line-clamp-2 text-white group-hover:text-purple-400 transition-colors">
          {item.caption}
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-lg border border-purple-500/20 font-bengali">
            {item.category === 'new' ? 'নতুন' : item.category === 'popular' ? 'জনপ্রিয়' : 'বিশেষ'}
          </span>
          <span className="flex items-center gap-1 text-[10px] md:text-sm font-bold text-blue-400 font-bengali">
            ভিডিও দেখুন
            <Video className="h-3 w-3 md:h-4 md:w-4" />
          </span>
        </div>
      </div>
    </motion.button>
  );
};

const SkeletonCard = () => (
  <div className="video-card overflow-hidden rounded-2xl bg-[#111118] border border-white/5">
    <div className="aspect-video bg-[#1a1a25] animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-4 w-3/4 bg-[#1a1a25] rounded animate-pulse" />
      <div className="h-3 w-1/2 bg-[#1a1a25] rounded animate-pulse" />
    </div>
  </div>
);

const AdsterraNativeAd = ({ containerId, scriptUrl }: { containerId: string; scriptUrl: string }) => {
  useEffect(() => {
    const scriptId = `adsterra-script-${containerId}`;
    
    const cleanup = () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
      const container = document.getElementById(containerId);
      if (container) container.innerHTML = '';
    };

    cleanup();

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = scriptUrl;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    
    document.body.appendChild(script);

    return cleanup;
  }, [containerId, scriptUrl]);

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div 
        id={containerId} 
        className="w-full min-h-[180px] bg-white/5 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center text-slate-500 text-[10px] italic"
      >
        <span className="animate-pulse">Loading Recommended Ad...</span>
      </div>
      <p className="text-[9px] text-slate-600 font-medium font-bengali">অ্যাড লোড হচ্ছে অথবা ব্লক করা হয়েছে।</p>
    </div>
  );
};

const HomepageAd = () => (
  <div className="flex flex-col items-center my-12 w-full max-w-2xl mx-auto px-4">
    <p className="font-bengali text-[10px] text-slate-500 mb-2 uppercase tracking-widest opacity-60">Sponsored Advertisement</p>
    <AdsterraNativeAd 
      containerId="container-homepage-ad" 
      scriptUrl="https://liverdopost.com/e17fb030f8c9a301b2c73825ace55c8c/invoke.js" 
    />
  </div>
);

const InfoPage = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-12 px-4 text-center">
    <div className="h-16 w-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
      <Icon className="h-8 w-8 text-purple-400" />
    </div>
    <h2 className="font-bengali text-3xl md:text-4xl font-black text-white mb-8 italic logo-text">{title}</h2>
    <div className="bg-[#111118]/60 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12 font-bengali text-slate-300 leading-relaxed text-left space-y-6">
      {children}
    </div>
  </motion.div>
);

const Footer = ({ onPageChange }: { onPageChange: (page: any) => void }) => (
  <footer className="bg-[#050505] border-t border-white/5 pt-12 pb-8 px-4 shadow-2xl overflow-hidden relative">
    <div className="max-w-7xl mx-auto space-y-12 relative z-10">
      {/* Telegram CTA */}
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-10 text-center relative group overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -z-10" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-2">
            <h3 className="font-bengali text-lg md:text-xl font-black text-white italic">
              নতুন আপডেট পেতে Telegram চ্যানেলে যুক্ত হন
            </h3>
            <p className="font-bengali text-slate-400 text-xs">সব সেরা ভাইরাল ভিডিও সবার আগে পেতে আজই জয়েন করুন</p>
          </div>
          <a 
            href="https://t.me/desi_collection" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:scale-[1.05] active:scale-95 transition-all text-sm"
          >
            <Share2 className="h-4 w-4" />
            Join Telegram
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-2">
            <Logo size="sm" />
          </div>
          <p className="font-bengali text-slate-500 text-sm italic">© ২০২৬ দেশি কালেকশন । সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <button onClick={() => onPageChange("about")} className="text-slate-400 hover:text-white font-bengali text-sm font-medium transition-colors">আমাদের সম্পর্কে</button>
          <button onClick={() => onPageChange("contact")} className="text-slate-400 hover:text-white font-bengali text-sm font-medium transition-colors">যোগাযোগ</button>
          <button onClick={() => onPageChange("privacy")} className="text-slate-400 hover:text-white font-bengali text-sm font-medium transition-colors">গোপনীয়তা নীতিমালা</button>
          <button onClick={() => onPageChange("disclaimer")} className="text-slate-400 hover:text-white font-bengali text-sm font-medium transition-colors">ডিসক্লেইমার</button>
        </div>
      </div>
      
      <p className="text-center text-[10px] text-slate-700 font-medium tracking-widest uppercase opacity-40">
        Premium Entertainment Portal
      </p>
    </div>
  </footer>
);

const NAV_ITEMS = [
  { id: "home", label: "হোম", icon: Home },
  { id: "new", label: "নতুন", icon: Clock },
  { id: "popular", label: "জনপ্রিয়", icon: TrendingUp },
  { id: "special", label: "বিশেষ", icon: Star },
  { id: "contact", label: "যোগাযোগ", icon: Phone }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "contact" | "privacy" | "disclaimer">("home");
  const [activeCategory, setActiveCategory] = useState<"all" | "new" | "popular" | "special">("all");
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [videoClickCounts, setVideoClickCounts] = useState<Record<string, { count: number; lastReset: number }>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("desi_collection_limits_v3");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const now = Date.now();
        const cleaned: Record<string, any> = {};
        Object.keys(parsed).forEach(id => {
          if (now - parsed[id].lastReset < 24 * 60 * 60 * 1000) cleaned[id] = parsed[id];
        });
        setVideoClickCounts(cleaned);
      } catch (e) {}
    }
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoClick = (video: MediaItem) => {
    const now = Date.now();
    const record = videoClickCounts[video.id] || { count: 0, lastReset: now };
    
    // Check reset
    if (now - record.lastReset >= 24 * 60 * 60 * 1000) {
      record.count = 0;
      record.lastReset = now;
    }
    
    // Check limit
    if (record.count >= 2) {
      alert("সীমা অতিক্রম করেছেন! ২৪ ঘণ্টা পর আবার চেষ্টা করুন।");
      return;
    }

    const newCounts = { ...videoClickCounts, [video.id]: { count: record.count + 1, lastReset: record.lastReset } };
    setVideoClickCounts(newCounts);
    localStorage.setItem("desi_collection_limits_v3", JSON.stringify(newCounts));
    
    // Open video link directly
    window.open(video.link, "_blank");
  };

  const filteredMedia = useMemo(() => {
    return mediaItems.filter(item => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = item.caption.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
      <BubbleBackground />
      
      <header className="sticky top-0 z-[100] w-full bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4 px-4 shadow-2xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => {setCurrentPage("home"); setActiveTab("home");}}>
            <Logo />
          </div>

          <nav className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "contact") setCurrentPage("contact");
                  else { setCurrentPage("home"); setActiveCategory(item.id === "home" ? "all" : item.id as any); }
                  setActiveTab(item.id);
                }}
                className={`nav-link px-5 py-2 text-sm font-bold font-bengali rounded-xl transition-all ${activeTab === item.id ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20" : "text-slate-400 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button className="lg:hidden p-2.5 bg-white/5 rounded-xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <X className={`h-5 w-5 transition-transform ${isMobileMenuOpen ? "rotate-0" : "rotate-180"}`} />
          </button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-[#050505] border-t border-white/5 mt-4 overflow-hidden">
              <div className="p-4 space-y-2">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === "contact") setCurrentPage("contact");
                      else { setCurrentPage("home"); setActiveCategory(item.id === "home" ? "all" : item.id as any); }
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold font-bengali ${activeTab === item.id ? "bg-purple-600/10 text-purple-400" : "text-slate-400"}`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="mx-auto max-w-7xl px-3 md:px-6 pb-20 mt-8">
        {currentPage === "home" ? (
          <>
            <section className="py-12 flex flex-col items-center text-center relative space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4"
              >
                <Logo size="lg" />
              </motion.div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-[10px] font-bold tracking-widest uppercase">
                <Sparkles className="h-3 w-3" /> Premium Entertainment
              </div>
              <p className="font-bengali text-slate-400 max-w-2xl mx-auto text-sm md:text-xl">ভাইরাল হওয়া সব আলোচিত ভিডিও এবং বিশেষ কালেকশনের সেরা আপডেটগুলো সবার আগে পান এখানে।</p>
            </section>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto">
                {["all", "new", "popular", "special"].map(id => (
                  <button
                    key={id}
                    onClick={() => { setActiveCategory(id as any); setActiveTab(id === "all" ? "home" : id); }}
                    className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold font-bengali transition-all ${activeCategory === id ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20" : "bg-[#111118] border border-white/5 text-slate-400"}`}
                  >
                    {id === "all" ? "সব ভিডিও" : id === "new" ? "নতুন" : id === "popular" ? "জনপ্রিয়" : "বিশেষ"}
                  </button>
                ))}
              </div>
              <div className="relative w-full lg:max-w-xs">
                <input type="text" placeholder="ভিডিও খুঁজুন..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-[#111118] border border-white/5 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-bengali text-sm text-white placeholder-slate-600" />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              </div>
            </div>

            <SectionHeader title="আমাদের সংগ্রহ" icon={Video} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                ) : filteredMedia.length > 0 ? (
                  filteredMedia.map((item, index) => <VideoCard key={item.id} item={item} index={index} onVideoClick={handleVideoClick} />)
                ) : (
                  <div className="col-span-full py-20 text-center opacity-60 font-bengali text-slate-500 font-bold">ভিডিও পাওয়া যায়নি!</div>
                )}
              </AnimatePresence>
            </div>

            <SectionHeader title="পপুলার ভিডিও" icon={TrendingUp} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularVideos.map((item, index) => (
                <VideoCard key={item.id} item={item} index={index} onVideoClick={handleVideoClick} />
              ))}
            </div>

            <HomepageAd />
          </>
        ) : currentPage === "about" ? (
          <InfoPage title="আমাদের সম্পর্কে" icon={Info}>
            <p><strong>দেশি কালেকশন</strong> একটি প্রিমিয়াম বিনোদনমূলক গ্যালারি প্ল্যাটফর্ম। ভাইরাল হওয়া সব আলোচিত ভিডিও ও খবর সবার আগে আপনাদের মাঝে পৌঁছে দেয়াই আমাদের লক্ষ্য।</p>
          </InfoPage>
        ) : currentPage === "contact" ? (
          <InfoPage title="যোগাযোগ করুন" icon={Phone}>
            <p className="text-center">যেকোনো সহযোগিতার জন্য বা ভিডিও যুক্ত করতে টেলিগ্রামে যোগাযোগ করুন।</p>
            <div className="flex justify-center pt-4">
              <a href="https://t.me/your_telegram" target="_blank" className="px-10 py-4 bg-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-purple-500/20 hover:scale-105 transition-all font-bengali">টেলিগ্রামে নক দিন</a>
            </div>
          </InfoPage>
        ) : currentPage === "privacy" ? (
          <InfoPage title="গোপনীয়তা নীতিমালা" icon={Shield}>
            <p>আপনার তথ্য আমাদের কাছে নিরাপদ। ব্রাউজিং অভিজ্ঞতা উন্নত করতে কুকিজ ব্যবহৃত হতে পারে।</p>
          </InfoPage>
        ) : (
          <InfoPage title="ডিসক্লেইমার" icon={HelpCircle}>
            <p>এখানে প্রদর্শিত অধিকাংশ কন্টেন্ট পাবলিক সোর্স থেকে সংগৃহীত। কোনো কন্টেন্ট নিয়ে অভিযোগ থাকলে আমাদের সাথে যোগাযোগ করুন।</p>
          </InfoPage>
        )}
      </main>

      <Footer onPageChange={(page) => {
        if (page === "home") {
          setCurrentPage("home");
          setActiveCategory("all");
          setActiveTab("home");
        } else {
          setCurrentPage(page);
          setActiveTab(page);
        }
        window.scrollTo(0, 0);
      }} />
    </div>
  );
}
