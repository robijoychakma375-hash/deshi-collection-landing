import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Video, Sparkles, X, ChevronUp, Share2, Check, Menu, Home, Clock, TrendingUp, Star, Phone, Info, Shield, HelpCircle } from "lucide-react";

// --- Video Data ---
interface MediaItem {
  id: string;
  caption: string;
  image: string; // User prefers 'image'
  link: string; // User prefers 'link'
  category: "new" | "popular" | "special";
  status?: "নতুন" | "Hot" | "Trending" | "Popular";
  timeLabel?: string;
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
  },
  {
    id: "7",
    caption: "জনপ্রিয় সত্য ঘটনা যা আপনাকে অবাক করে দেবে",
    image: "https://i.postimg.cc/vBdQbjSv/photo-2026-04-21-13-17-10.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "new",
    timeLabel: "নতুন আপলোড"
  },
  {
    id: "8",
    caption: "বর্তমান সময়ে চারদিকে আলোচিত জনপ্রিয় সংবাদের ভিডিও",
    image: "https://i.postimg.cc/cCLGJN7X/photo-2026-04-21-13-17-44.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "popular",
    status: "Hot"
  },
  {
    id: "9",
    caption: "নতুন প্রজন্মের প্রিয় কিছু বাছাইকৃত ভিডিও সংগ্রহ",
    image: "https://i.postimg.cc/cCLGJN7X/photo-2026-04-21-13-17-44.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "special",
    status: "Popular"
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

const VideoCard = ({ item, index, priority = false }: { item: MediaItem; index: number; priority?: boolean; key?: any }) => {
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
    <motion.a
      id={`video-card-${item.id}`}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      layout={!priority}
      initial={priority ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, delay: priority ? 0 : index * 0.02 }}
      whileTap={{ scale: 0.98 }}
      className="video-card group block"
    >
      <div className="relative aspect-video">
        <img
          src={item.image}
          alt={item.caption}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://picsum.photos/seed/fallback/800/450";
          }}
        />
        <div className="video-badge">ভিডিও</div>
        
        {item.status && (
          <div className={`absolute top-3 right-3 z-10 font-bengali text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg backdrop-blur-sm ${getStatusStyle(item.status)}`}>
            {item.status}
          </div>
        )}

        {item.timeLabel && (
          <div className="absolute bottom-3 left-3 z-10 font-bengali text-[8px] md:text-[9px] font-bold px-2 py-1 bg-black/60 text-blue-400 rounded-lg shadow-sm backdrop-blur-md border border-blue-500/20">
            {item.timeLabel}
          </div>
        )}
      </div>

      <div className="p-4 md:p-5">
        <h3 className="font-bengali text-xs md:text-base lg:text-lg font-bold leading-tight line-clamp-2 text-white transition-colors group-hover:text-purple-400">
          {item.caption}
        </h3>
        
        <div className="mt-3 md:mt-4 flex items-center justify-between">
          <span className="text-[10px] md:text-[11px] font-bold text-purple-400 bg-purple-500/10 px-2 md:px-3 py-1 rounded-lg border border-purple-500/20 uppercase tracking-wide font-bengali">
            {item.category === 'new' ? 'নতুন' : item.category === 'popular' ? 'জনপ্রিয়' : 'বিশেষ'}
          </span>
          <span className="flex items-center gap-1 text-[10px] md:text-[13px] font-bold text-blue-400 font-bengali">
            আরও দেখুন
            <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
          </span>
        </div>
      </div>
    </motion.a>
  );
};

const SkeletonCard = () => (
  <div className="video-card overflow-hidden">
    <div className="aspect-video bg-[#1a1a25] animate-pulse" />
    <div className="p-4 md:p-5 space-y-3">
      <div className="h-4 w-3/4 bg-[#1a1a25] rounded animate-pulse" />
      <div className="h-3 w-1/2 bg-[#1a1a25] rounded animate-pulse" />
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 w-16 bg-[#1a1a25] rounded-lg animate-pulse" />
        <div className="h-4 w-20 bg-[#1a1a25] rounded animate-pulse" />
      </div>
    </div>
  </div>
);

const AdsterraNativeBanner = () => {
  useEffect(() => {
    // Delay ad script loading to improve initial page load performance
    const timer = setTimeout(() => {
      const scriptId = "adsterra-native-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://liverdopost.com/e17fb030f8c9a301b2c73825ace55c8c/invoke.js";
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        document.body.appendChild(script);
      }

      // Load second ad script with even more delay
      const secondScriptId = "adsterra-social-script";
      if (!document.getElementById(secondScriptId)) {
        const script = document.createElement("script");
        script.id = secondScriptId;
        script.src = "https://liverdopost.com/72/6e/52/726e52d420e290ebe1bb4759c4ef0714.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }, 3500); // Increased delay to 3.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-12 w-full max-w-7xl mx-auto px-2 overflow-hidden">
      <div className="flex flex-col items-center">
        <p className="font-bengali text-[10px] md:text-xs text-slate-500 font-medium mb-3 uppercase tracking-widest opacity-60">
          Advertisement
        </p>
        <div 
          id="container-e17fb030f8c9a301b2c73825ace55c8c" 
          className="w-full min-h-[250px] bg-[#111118]/30 rounded-2xl border border-white/5 shadow-inner"
          style={{ contentVisibility: 'auto' }}
        />
      </div>
    </div>
  );
};

const NAV_ITEMS = [
  { id: "home", label: "হোম", icon: Home },
  { id: "new", label: "নতুন", icon: Clock },
  { id: "popular", label: "জনপ্রিয়", icon: TrendingUp },
  { id: "special", label: "বিশেষ", icon: Star },
  { id: "contact", label: "যোগাযোগ", icon: Phone }
];

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

const InfoPage = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-4xl mx-auto py-12 px-4 shadow-2xl"
  >
    <div className="flex flex-col items-center text-center mb-12">
      <div className="h-16 w-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/30">
        <Icon className="h-8 w-8 text-purple-400" />
      </div>
      <h2 className="font-bengali text-3xl md:text-4xl font-black text-white mb-4 italic logo-text">{title}</h2>
      <div className="h-1.5 w-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
    </div>
    <div className="bg-[#111118]/60 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12 font-bengali text-slate-300 leading-relaxed text-base md:text-lg space-y-6">
      {children}
    </div>
  </motion.div>
);

export default function App() {
  const [activeCategory, setActiveCategory] = useState<"all" | "new" | "popular" | "special">("all");
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isShareCopied, setIsShareCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "contact" | "privacy" | "disclaimer">("home");

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [renderBelowFold, setRenderBelowFold] = useState(false);

  useEffect(() => {
    // Defere heavy section rendering
    const timer = setTimeout(() => setRenderBelowFold(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "Desi Collection",
      text: "Curated photo and video updates",
      url: "https://deshicollection.qzz.io/"
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setIsShareCopied(true);
        setTimeout(() => setIsShareCopied(false), 2000);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredMedia = useMemo(() => {
    return mediaItems.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = item.caption.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30 selection:text-white">
      <BubbleBackground />
      
      {/* Header section */}
      <header className="sticky top-0 z-[100] w-full bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 transition-all duration-300 shadow-2xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setCurrentPage("home")}
          >
            <img 
              src="https://i.postimg.cc/cCLGJN7X/photo-2026-04-21-13-17-44.jpg" 
              alt="Desi Collection Logo" 
              className="h-10 w-10 md:h-12 md:w-12 rounded-xl object-cover shadow-[0_0_15px_rgba(124,58,237,0.3)] border border-white/10"
              loading="eager"
            />
            <div className="flex flex-col items-start">
              <h1 className="logo-text text-xl md:text-2xl tracking-tight leading-none italic font-black">
                দেশি কালেকশন
              </h1>
              <p className="font-bengali text-[8px] md:text-[10px] font-bold text-purple-400 mt-0.5 uppercase tracking-widest opacity-80">
                PREMIUM GALLERY
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "contact") setCurrentPage("contact");
                  else if (item.id === "home") { setCurrentPage("home"); setActiveCategory("all"); }
                  else { setCurrentPage("home"); setActiveCategory(item.id as any); }
                  setActiveTab(item.id);
                }}
                className={`nav-link ${activeTab === item.id ? "nav-link-active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleShare}
              className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-purple-400 transition-all lg:hidden"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button 
              className="lg:hidden p-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <button 
              onClick={handleShare}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bengali text-sm font-bold rounded-xl shadow-lg shadow-purple-500/20 hover:scale-105 transition-all"
            >
              <Share2 className="h-4 w-4" />
              শেয়ার করুন
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#050505] border-t border-white/5 overflow-hidden"
            >
              <div className="p-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === "contact") setCurrentPage("contact");
                      else if (item.id === "home") { setCurrentPage("home"); setActiveCategory("all"); }
                      else { setCurrentPage("home"); setActiveCategory(item.id as any); }
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bengali font-bold transition-all ${
                      activeTab === item.id ? "bg-purple-600/10 text-purple-400" : "text-slate-400 hover:bg-white/5"
                    }`}
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

      <main className="mx-auto max-w-7xl px-3 md:px-6 pb-20">
        {currentPage === "home" ? (
          <>
            {/* Hero Section */}
            <section className="py-12 md:py-20 text-center relative overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4">
                  <Sparkles className="h-3 w-3" />
                  Premium Entertainment
                </div>
                <h2 className="font-bengali text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-tight logo-text">
                  দেশি কালেকশন — প্রিমিয়াম ভিডিও আপডেট
                </h2>
                <p className="font-bengali text-slate-400 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed">
                  নতুন, জনপ্রিয় এবং বিশেষ বিনোদনমূলক ভিডিওর সেরা আপডেটগুলি এখন এক জায়গায়। আমাদের সাথে যুক্ত থাকুন।
                </p>
                <div className="pt-4">
                  <a 
                    href="https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bengali font-bold rounded-2xl shadow-xl shadow-purple-500/20 hover:scale-105 transition-all"
                  >
                    টেলিগ্রামে যুক্ত হন
                    <ChevronUp className="h-4 w-4 rotate-90" />
                  </a>
                </div>
              </motion.div>
            </section>

            {/* News Ticker */}
            <div className="ticker-container group cursor-default">
              <div className="ticker-label">
                <Clock className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2" />
                নোটিশ
              </div>
              <div className="ticker-content">
                <div className="ticker-text group-hover:[animation-play-state:paused]">
                  📢 নতুন ভিডিও আপডেট পেতে আমাদের Telegram চ্যানেলে যুক্ত থাকুন &nbsp;&nbsp; • &nbsp;&nbsp; ভিডিও লোড হতে সময় নিলে কিছুক্ষণ অপেক্ষা করুন &nbsp;&nbsp; • &nbsp;&nbsp; দেশি কালেকশনে নিয়মিত ভিজিট করার জন্য ধন্যবাদ
                </div>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-12">
              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0 px-2 lg:px-0">
                {[
                  { id: "all", label: "সব ভিডিও" },
                  { id: "new", label: "নতুন" },
                  { id: "popular", label: "জনপ্রিয়" },
                  { id: "special", label: "বিশেষ" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id === "বিশেষ" ? "special" : cat.id as any);
                      setActiveTab(cat.id);
                    }}
                    className={`category-btn whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold font-bengali transition-all ${
                      (activeTab === cat.id) 
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20 scale-105" 
                        : "bg-[#111118] border border-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full max-w-full lg:max-w-xs px-2 lg:px-0">
                <input
                  type="text"
                  placeholder="ভিডিও খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#111118] border border-white/5 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-bengali text-sm text-white placeholder-slate-600"
                />
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-purple-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <SectionHeader title="আমাদের সংগ্রহ" icon={Video} />

            {/* Video Grid - Optimized for 2 columns on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 mb-16">
              <AnimatePresence mode="popLayout" initial={false}>
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                ) : filteredMedia.length > 0 ? (
                  filteredMedia.map((item, index) => (
                    <VideoCard key={item.id} item={item} index={index} priority={index < 3} />
                  ))
                ) : (
                  <div className="col-span-full py-20 flex flex-col items-center text-center opacity-60">
                    <Search className="h-12 w-12 text-slate-600 mb-4" />
                    <p className="font-bengali text-slate-500 font-bold">দুঃখিত! এই নামে কোনো ভিডিও পাওয়া যায়নি।</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Load More Button */}
            {!isLoading && filteredMedia.length > 0 && (
              <div className="flex justify-center mb-24">
                <button className="px-10 py-4 bg-[#111118] border border-white/5 text-slate-300 font-bengali font-bold rounded-2xl hover:bg-white/5 hover:text-white transition-all shadow-xl group flex items-center gap-2">
                  আরও ভিডিও দেখুন
                  <ChevronUp className="h-4 w-4 rotate-180 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Adsterra Native Banner */}
            {renderBelowFold && (
              <div className="mb-16">
                <AdsterraNativeBanner />
              </div>
            )}

            {/* Most Watched Section */}
            {renderBelowFold && (
              <div className="mt-20">
                <SectionHeader title="পপুলার ভিডিও আপডেট" icon={TrendingUp} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      caption: "গত সপ্তাহের আলোচিত সেরা ভিডিও কালেকশন",
                      image: "https://i.postimg.cc/q76khyPB/photo-2026-04-12-06-42-22.jpg",
                      views: "১.২ লক্ষ"
                    },
                    {
                      caption: "সোশ্যাল মিডিয়ায় সবচেয়ে বেশি দেখা ভিডিও",
                      image: "https://i.postimg.cc/cCLGJN7X/photo-2026-04-21-13-17-44.jpg",
                      views: "৯৫ হাজার"
                    },
                    {
                      caption: "বাছাইকৃত স্পেশাল বিনোদনমূলক ভিডিও",
                      image: "https://i.postimg.cc/vHGHq1nF/photo-2025-07-19-15-21-23.jpg",
                      views: "৮০ হাজার"
                    },
                    {
                      caption: "জনপ্রিয়তার শীর্ষে থাকা সেরা আপডেট",
                      image: "https://i.postimg.cc/vmCZ33rt/photo-2025-05-31-10-34-32.jpg",
                      views: "১.৫ লক্ষ"
                    }
                  ].map((item, index) => (
                    <motion.a
                      key={index}
                      href="https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32"
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative bg-[#111118] rounded-2xl overflow-hidden border border-white/5 shadow-xl hover:shadow-purple-500/10 transition-all flex flex-col"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.caption}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          loading="lazy"
                        />
                        <div className="absolute bottom-2 left-2 z-20">
                          <span className="px-2 py-0.5 bg-black/80 backdrop-blur-md text-white text-[9px] font-semibold rounded-md flex items-center gap-1 border border-white/5 font-bengali">
                            👁️ {item.views}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-[#111118]">
                        <h4 className="font-bengali text-xs font-bold text-slate-200 line-clamp-1 group-hover:text-purple-400 transition-colors">
                          {item.caption}
                        </h4>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            )}

            {/* Telegram Join Bottom Banner */}
            {renderBelowFold && (
              <motion.a
                id="telegram-bottom-join"
                href="https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                className="mt-16 block w-full p-6 md:p-10 bg-[#111118] border border-white/5 rounded-[2rem] shadow-2xl hover:shadow-purple-500/10 transition-all cursor-pointer overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 md:h-16 md:w-16 bg-[#1a1a25] rounded-2xl flex items-center justify-center text-2xl md:text-3xl text-purple-400 shadow-inner border border-white/5">
                      ✈️
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bengali text-lg md:text-2xl font-bold text-white">
                        নতুন নতুন ভিডিও দেখতে আমাদের Telegram Channel-এ Join করুন
                      </h3>
                      <p className="font-bengali text-xs md:text-sm text-slate-400 font-medium opacity-80">প্রতিদিন লেটেস্ট ভিডিওর আপডেট পান সবার আগে</p>
                    </div>
                  </div>
                  <div className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bengali text-sm md:text-base font-bold rounded-2xl shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
                    Join Now
                  </div>
                </div>
              </motion.a>
            )}
          </>
        ) : currentPage === "about" ? (
          <InfoPage title="আমাদের সম্পর্কে" icon={Info}>
            <p><strong>দেশি কালেকশন</strong> একটি প্রিমিয়াম বিনোদনমূলক গ্যালারি প্ল্যাটফর্ম। আমরা দেশি এবং আন্তর্জাতিক সোশ্যাল মিডিয়ায় ভাইরাল হওয়া সব আলোচিত ভিডিও ও খবর সবার আগে আপনাদের মাঝে পৌঁছে দেই।</p>
            <p className="mt-4">নিত্যনতুন বিনোদন এবং বিশেষ কালেকশনের জন্য আমাদের সাথেই থাকুন। আমাদের লক্ষ্য হলো আপনাদের জন্য একটি নিরাপদ এবং উন্নত গ্যালারি তৈরি করা।</p>
          </InfoPage>
        ) : currentPage === "contact" ? (
          <InfoPage title="যোগাযোগ করুন" icon={Phone}>
            <p className="text-center mb-6">আমাদের সাথে যোগাযোগ করতে বা আপনার কোনো ভিডিও আমাদের চ্যানেলে যুক্ত করতে চাইলে টেলিগ্রামে নক দিন।</p>
            <div className="flex justify-center">
              <a href="https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32" target="_blank" className="px-8 py-3 bg-purple-600 text-white font-bold rounded-xl">টেলিগ্রাম সাপোর্ট</a>
            </div>
          </InfoPage>
        ) : currentPage === "privacy" ? (
          <InfoPage title="গোপনীয়তা নীতিমালা" icon={Shield}>
            <p>আমরা আমাদের ব্যবহারকারীদের গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দেই। আপনার কোনো ব্যক্তিগত তথ্য এই সাইটে জমা রাখা হয় না। ব্রাউজিং অভিজ্ঞতা উন্নত করতে কুকিজ ব্যবহৃত হতে পারে।</p>
          </InfoPage>
        ) : (
          <InfoPage title="ডিসক্লেইমার" icon={HelpCircle}>
            <p>দেশি কালেকশন একটি এন্টারটেইনমেন্ট অ্যাগ্রিগেটর সাইট। এখানে প্রদর্শিত অধিকাংশ কন্টেন্ট পাবলিক সোর্স থেকে সংগৃহীত। কোনো কন্টেন্ট নিয়ে অভিযোগ থাকলে আমাদের সাথে যোগাযোগ করুন।</p>
          </InfoPage>
        )}
      </main>

      {/* Footer */}
      {renderBelowFold && (
        <footer className="mt-20 py-16 border-t border-white/5 bg-[#050505]/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
              <div className="space-y-6">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <img 
                    src="https://i.postimg.cc/cCLGJN7X/photo-2026-04-21-13-17-44.jpg" 
                    className="h-10 w-10 rounded-lg object-cover"
                    alt="Logo"
                  />
                  <span className="logo-text text-xl">দেশি কালেকশন</span>
                </div>
                <p className="font-bengali text-slate-400 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
                  দেশি কালেকশন আপনার জন্য নিয়ে এসেছে সেরা সব বিনোদনমূলক ভিডিওর দুর্দান্ত সংগ্রহ। আপডেট পেতে টেলিগ্রামে যুক্ত থাকুন।
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <a href="https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32" target="_blank" className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all">
                    ✈️
                  </a>
                  <a href="https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32" target="_blank" className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all">
                    📷
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-bengali text-white font-bold tracking-widest uppercase text-xs">দ্রুত লিঙ্ক</h4>
                <ul className="space-y-3 font-bengali text-slate-400 text-sm">
                  <li><button onClick={() => {setCurrentPage("home"); setActiveCategory("all"); setActiveTab("home"); window.scrollTo(0,0);}} className="hover:text-purple-400 transition-colors">হোম</button></li>
                  <li><button onClick={() => {setCurrentPage("home"); setActiveCategory("new"); setActiveTab("new"); window.scrollTo(0,0);}} className="hover:text-purple-400 transition-colors">নতুন ভিডিও</button></li>
                  <li><button onClick={() => {setCurrentPage("home"); setActiveCategory("popular"); setActiveTab("popular"); window.scrollTo(0,0);}} className="hover:text-purple-400 transition-colors">জনপ্রিয় ভিডিও</button></li>
                  <li><a href="https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32" target="_blank" className="hover:text-purple-400 transition-colors">টেলিগ্রাম চ্যানেল</a></li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="font-bengali text-white font-bold tracking-widest uppercase text-xs">আইনী তথ্য</h4>
                <ul className="space-y-3 font-bengali text-slate-400 text-sm">
                  <li><button onClick={() => {setCurrentPage("about"); window.scrollTo(0,0);}} className="hover:text-purple-400 transition-colors">আমাদের সম্পর্কে</button></li>
                  <li><button onClick={() => {setCurrentPage("contact"); window.scrollTo(0,0);}} className="hover:text-purple-400 transition-colors">যোগাযোগ</button></li>
                  <li><button onClick={() => {setCurrentPage("privacy"); window.scrollTo(0,0);}} className="hover:text-purple-400 transition-colors">গোপনীয়তা নীতিমালা</button></li>
                  <li><button onClick={() => {setCurrentPage("disclaimer"); window.scrollTo(0,0);}} className="hover:text-purple-400 transition-colors">ডিসক্লেইমার</button></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
              <p className="font-bengali text-xs text-slate-500">
                &copy; ২০২৬ দেশি কালেকশন | সর্বস্বত্ব সংরক্ষিত।
              </p>
              <p className="font-bengali text-[10px] text-slate-600 italic">
                Developed for Entertainment Purposes
              </p>
            </div>
          </div>
        </footer>
      )}

      {/* Floating Buttons Container */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
        {/* Share Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          onClick={handleShare}
          className="h-10 w-10 md:h-12 md:w-12 bg-[#111118] border border-white/10 rounded-full shadow-2xl flex items-center justify-center text-purple-400 hover:text-white hover:bg-purple-600 transition-all group relative"
          title="শেয়ার করুন"
        >
          {isShareCopied ? (
            <Check className="h-5 w-5 md:h-6 md:w-6" />
          ) : (
            <Share2 className="h-5 w-5 md:h-6 md:w-6 group-hover:rotate-12 transition-transform" />
          )}
          {isShareCopied && (
            <div className="absolute -top-10 right-0 px-3 py-1 bg-white text-black font-bold text-[10px] rounded-lg whitespace-nowrap shadow-xl">
              লিঙ্ক কপি করা হয়েছে
            </div>
          )}
        </motion.button>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={scrollToTop}
              className="h-10 w-10 md:h-12 md:w-12 bg-[#111118] border border-white/10 rounded-full shadow-2xl flex items-center justify-center text-purple-400 hover:text-white hover:bg-purple-600 transition-all group"
              title="উপরে যান"
            >
              <ChevronUp className="h-5 w-5 md:h-6 md:w-6 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
