import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Video, Sparkles, X, ChevronUp, Share2, Home, Clock, TrendingUp, Star, Phone, Info, Shield, HelpCircle, ChevronRight, Lock, Eye, Menu } from "lucide-react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from "react-router-dom";

// --- Video Data ---
interface MediaItem {
  id: string;
  slug: string;
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
    slug: "uno-viral-event",
    caption: "ইউএনওর আলোচিত ঘটনা—পুরো ঘটনার বিস্তারিত আপডেট",
    image: "https://i.postimg.cc/QNwWZnxp/photo-2026-03-18-17-40-02(1).jpg",
    link: "https://t.me/desi_collection",
    category: "new",
    status: "Trending",
    timeLabel: "১ ঘণ্টা আগে"
  },
  {
    id: "2",
    slug: "expatriate-life-stories",
    caption: "প্রবাসীদের জীবনে ঘটে যাওয়া কিছু বাস্তব ঘটনা যা ভাইরাল",
    image: "https://i.postimg.cc/HnD7GBQr/photo-2026-04-21-11-57-03.jpg",
    link: "https://t.me/desi_collection",
    category: "popular",
    status: "Hot"
  },
  {
    id: "3",
    slug: "fraud-awareness-tips",
    caption: "প্রতারণা চক্র থেকে বাঁচতে সচেতনতামূলক ভিডিও আপডেট",
    image: "https://i.postimg.cc/0yWM58pn/photo-2026-04-21-13-08-37.jpg",
    link: "https://t.me/desi_collection",
    category: "special"
  },
  {
    id: "4",
    slug: "educational-institute-viral",
    caption: "শিক্ষা প্রতিষ্ঠান কেন্দ্রিক সমসাময়িক আলোচিত ভিডিও",
    image: "https://i.postimg.cc/BZTjL5TP/photo-2026-04-21-13-13-58.jpg",
    link: "https://t.me/desi_collection",
    category: "new",
    status: "নতুন",
    timeLabel: "আজ আপডেট"
  },
  {
    id: "5",
    slug: "social-media-top-updates",
    caption: "সোশ্যাল মিডিয়ায় আলোচিত আজকের সেরা আপডেটগুলো",
    image: "https://i.postimg.cc/RFr0qqN5/photo-2026-04-21-11-40-34.jpg",
    link: "https://t.me/desi_collection",
    category: "popular",
    status: "Popular"
  },
  {
    id: "6",
    slug: "truth-behind-stories",
    caption: "ঘটনার আড়ালের সত্য প্রকাশ—বিস্তারিত ভিডিওতে দেখুন",
    image: "https://i.postimg.cc/Kvc816vy/photo-2026-04-21-11-38-59.jpg",
    link: "https://t.me/desi_collection",
    category: "special",
    status: "Trending"
  },
  {
    id: "7",
    slug: "picnic-bus-incident",
    caption: "পিকনিকের বাসে ঘটে যাওয়া অনাকাঙ্ক্ষিত ঘটনার ভিডিও",
    image: "https://i.postimg.cc/g0ZfP9Nh/photo-2026-05-01-00-10-47.jpg",
    link: "https://t.me/desi_collection",
    category: "new",
    status: "নতুন"
  },
  {
    id: "8",
    slug: "wedding-viral-dance",
    caption: "বিয়েবাড়ির ভাইরাল ভিডিও—সবাইকে তাক লাগিয়ে দিয়েছে",
    image: "https://i.postimg.cc/brzMbZph/photo-2026-04-20-15-24-21.jpg",
    link: "https://t.me/desi_collection",
    category: "popular"
  }
];

const popularVideos: MediaItem[] = [
  {
    id: "popular-1",
    slug: "weekly-top-collections",
    caption: "গত সপ্তাহের আলোচিত সেরা ভিডিও কালেকশন",
    image: "https://i.postimg.cc/q76khyPB/photo-2026-04-12-06-42-22.jpg",
    link: "https://t.me/desi_collection",
    category: "popular",
    views: "১.২ লক্ষ",
    status: "Popular"
  },
  {
    id: "popular-2",
    slug: "most-viewed-viral",
    caption: "সোশ্যাল মিডিয়ায় সবচেয়ে বেশি দেখা ভিডিও",
    image: "https://i.postimg.cc/cCLGJN7X/photo-2026-04-21-13-17-44.jpg",
    link: "https://t.me/desi_collection",
    category: "popular",
    views: "৯৫ হাজার",
    status: "Trending"
  },
  {
    id: "popular-3",
    slug: "special-entertainment",
    caption: "বাছাইকৃত স্পেশাল বিনোদনমূলক ভিডিও",
    image: "https://i.postimg.cc/vHGHq1nF/photo-2025-07-19-15-21-23.jpg",
    link: "https://t.me/desi_collection",
    category: "popular",
    views: "৮০ হাজার"
  },
  {
    id: "popular-4",
    slug: "top-rated-updates",
    caption: "জনপ্রিয়তার শীর্ষে থাকা সেরা আপডেট",
    image: "https://i.postimg.cc/vmCZ33rt/photo-2025-05-31-10-34-32.jpg",
    link: "https://t.me/desi_collection",
    category: "popular",
    views: "১.৫ লক্ষ",
    status: "Hot"
  },
  {
    id: "popular-5",
    slug: "best-viral-today",
    caption: "আজকের সেরা ভাইরাল ভিডিও আপডেট",
    image: "https://i.postimg.cc/QNwWZnxp/photo-2026-03-18-17-40-02(1).jpg",
    link: "https://t.me/desi_collection",
    category: "popular",
    views: "৫০ হাজার"
  },
  {
    id: "popular-6",
    slug: "mysterious-special-video",
    caption: "বিশেষ সংগৃহীত রহস্যময় ভিডিও",
    image: "https://i.postimg.cc/0yWM58pn/photo-2026-04-21-13-08-37.jpg",
    link: "https://t.me/desi_collection",
    category: "popular",
    views: "১ লক্ষ"
  }
];

const uploadTimeLabels = [
  "আপলোড হয়েছে ৫ মিনিট আগে",
  "আপলোড হয়েছে ১২ মিনিট আগে",
  "আপলোড হয়েছে ১৮ মিনিট আগে",
  "আপলোড হয়েছে ৩৪ মিনিট আগে",
  "আপলোড হয়েছে ৪৫ মিনিট আগে",
  "আপলোড হয়েছে ১ ঘণ্টা আগে",
  "আপলোড হয়েছে ২ ঘণ্টা আগে",
  "নতুন আপডেট"
];

const getUploadTime = (item: MediaItem) => {
  if (item.timeLabel) return item.timeLabel;
  const hash = item.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return uploadTimeLabels[hash % uploadTimeLabels.length];
};

const ADSTERRA_SMARTLINK = "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32";

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
    <div className="flex items-center gap-3.5 select-none group">
      {/* Icon Part */}
      <div className={`relative ${isSm ? 'h-8 w-8' : isLg ? 'h-16 w-16' : 'h-11 w-11 md:h-13 md:w-13'} flex-shrink-0 transition-transform duration-500 group-hover:scale-105`}>
        {/* Glow Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
        
        {/* Main Icon Body */}
        <div className="relative h-full w-full bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-transparent to-blue-600/10" />
          
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className={`${isSm ? 'h-4 w-4' : 'h-7 w-7'} transform transition-transform group-hover:scale-110 duration-500 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]`}
          >
            <path 
              d="M18.2574 10.174C19.7468 11.034 19.7468 12.966 18.2574 13.826L8.85058 19.2562C7.36116 20.1162 5.50002 19.1492 5.50002 17.4302L5.50002 6.56981C5.50002 4.85078 7.36116 3.88373 8.85058 4.74373L18.2574 10.174Z" 
              fill="url(#logo-grad-premium)" 
            />
            <defs>
              <linearGradient id="logo-grad-premium" x1="5.5" y1="4" x2="19" y2="19" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a855f7" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Text Part */}
      <div className="flex flex-col">
        <h1 className={`font-bengali font-black tracking-tight leading-tight text-white ${isSm ? 'text-lg' : isLg ? 'text-3xl md:text-5xl' : 'text-xl md:text-3xl'}`}>
          দেশি কালেকশন
        </h1>
        {showSubtitle && (
          <span className={`font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ${isSm ? 'text-[7px]' : 'text-[9px] md:text-[11px]'}`}>
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

interface VideoCardProps {
  item: MediaItem;
  index: number;
  priority?: boolean;
  key?: string | number | null;
}

const VideoCard = ({ item, index, priority = false }: VideoCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

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
    <Link
      to={`/watch/${item.slug}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="video-card group flex flex-col h-full w-full text-left bg-[#111118] border border-white/5 rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-pointer outline-none focus:ring-2 focus:ring-purple-500/50"
    >
      <motion.div
        initial={priority ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, delay: priority ? 0 : index * 0.02 }}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="flex flex-col h-full w-full transform transition-all duration-300"
      >
        <div className="relative aspect-video flex-shrink-0 overflow-hidden bg-white/5">
          {!isLoaded && (
            <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
              <Video className="h-8 w-8 text-white/10" />
            </div>
          )}
          <img
            src={item.image || "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop"}
            alt={item.caption}
            loading={priority ? "eager" : "lazy"}
            onLoad={() => setIsLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop";
              setIsLoaded(true);
            }}
          />
          
          {/* Play Icon Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Video className="h-6 w-6 text-white fill-white" />
            </div>
          </div>

          <div className="video-badge uppercase tracking-widest text-[8px] font-bold pointer-events-none">ভিডিও</div>
          {item.status && (
            <div className={`absolute top-3 right-3 z-10 font-bengali text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-lg ${getStatusStyle(item.status)} pointer-events-none`}>
              {item.status}
            </div>
          )}

          {/* Upload Time Badge Overlay */}
          <div className="absolute bottom-3 right-3 z-10 font-bengali text-[9px] md:text-[10px] font-bold px-2.5 py-1.5 rounded-xl bg-black/70 text-white backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-xl group-hover:bg-purple-600 transition-colors duration-300 pointer-events-none">
            <Clock className="h-3.5 w-3.5 text-purple-400 group-hover:text-white transition-colors" />
            {getUploadTime(item)}
          </div>
        </div>
        <div className="p-4 md:p-5 flex flex-col flex-1 pointer-events-none">
          <h3 className="font-bengali text-sm md:text-base font-bold leading-tight line-clamp-2 text-white group-hover:text-purple-400 transition-colors mb-4 min-h-[2.5rem] md:min-h-[3rem]">
            {item.caption}
          </h3>
          <div className="mt-auto flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-lg border border-purple-500/20 font-bengali whitespace-nowrap">
              {item.category === 'new' ? 'নতুন' : item.category === 'popular' ? 'জনপ্রিয়' : 'বিশেষ'}
            </span>
            <span className="flex items-center gap-1 text-[11px] md:text-sm font-bold text-blue-400 font-bengali whitespace-nowrap group-hover:translate-x-1 transition-transform">
              ভিডিও দেখুন
              <Video className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const NativeAd = () => {
  useEffect(() => {
    // Only run if the script doesn't already exist
    const scriptId = "adsterra-native-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = "https://liverdopost.com/e1108b53bedb298b7d77beabae346821/invoke.js";
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-16 px-4">
      <div 
        id="container-e1108b53bedb298b7d77beabae346821" 
        className="w-full max-w-4xl min-h-[100px] bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 pointer-events-none" />
        <span className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.4em] pointer-events-none opacity-50">Advertisement</span>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="video-card flex flex-col h-full bg-[#111118] border border-white/5 rounded-2xl overflow-hidden">
    <div className="aspect-video bg-[#1a1a25] animate-pulse flex-shrink-0" />
    <div className="p-4 md:p-5 flex flex-col flex-1 space-y-4">
      <div className="space-y-2">
        <div className="h-4 w-full bg-[#1a1a25] rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-[#1a1a25] rounded animate-pulse" />
      </div>
      <div className="mt-auto flex justify-between">
        <div className="h-6 w-16 bg-[#1a1a25] rounded animate-pulse" />
        <div className="h-6 w-24 bg-[#1a1a25] rounded animate-pulse" />
      </div>
    </div>
  </div>
);

const allMedia = [...mediaItems, ...popularVideos];

const WatchPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(10);
  const [canProceed, setCanProceed] = useState(false);

  const video = useMemo(() => allMedia.find(v => v.slug === slug), [slug]);

  useEffect(() => {
    if (!video) {
      navigate('/', { replace: true });
      return;
    }
    // Reset timer when video changes
    setTimer(10);
    setCanProceed(false);
  }, [video, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanProceed(true);
    }
  }, [timer]);

  const relatedVideos = useMemo(() => {
    if (!video) return [];
    return allMedia
      .filter(v => v.id !== video.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
  }, [video]);

  if (!video) return null;

  const handleLinkClick = () => {
    console.log(`[CLICK_TRACK] Recommended Link clicked for video: ${video.id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto py-8 px-4"
    >
      {/* Breadcrumb / Back Button Improvement */}
      <nav className="flex items-center gap-3 mb-8 overflow-hidden">
        <Link to="/" className="flex items-center gap-1.5 text-slate-400 hover:text-white font-bengali font-bold transition-all group whitespace-nowrap">
          <Home className="h-4 w-4" /> হোম
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-600 flex-shrink-0" />
        <span className="text-slate-500 font-bengali font-medium line-clamp-1 max-w-[200px] md:max-w-none">
          {video.caption}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#111118] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative group">
            <div className="relative aspect-video">
              <img 
                src={video.image} 
                alt={video.caption} 
                className="w-full h-full object-cover opacity-60 blur-[3px]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/50">
                <div className="p-5 bg-purple-600/20 rounded-3xl border border-purple-500/30 mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <Video className="h-12 w-12 text-purple-400 animate-pulse" />
                </div>
                <h2 className="font-bengali text-xl md:text-3xl font-black text-white mb-8 leading-tight max-w-2xl px-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">{video.caption}</h2>
                
                <div className="bg-black/40 backdrop-blur-3xl rounded-[2rem] p-8 border border-white/10 w-full max-w-md shadow-2xl">
                  {!canProceed ? (
                    <div className="space-y-4">
                      <div className="relative h-24 w-24 mx-auto">
                        <svg className="h-full w-full rotate-[-90deg] drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                          <circle cx="48" cy="48" r="44" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/5" />
                          <circle cx="48" cy="48" r="44" fill="none" stroke="currentColor" strokeWidth="6" className="text-purple-500 transition-all duration-1000 ease-linear" strokeDasharray="276" strokeDashoffset={276 - (276 * timer) / 10} strokeLinecap="round" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center font-black text-3xl text-white">{timer}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bengali text-slate-300 text-sm font-bold flex items-center justify-center gap-2">
                           লিংক প্রস্তুত হচ্ছে...
                        </p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Please Wait a Moment</p>
                      </div>
                    </div>
                  ) : (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
                      <a 
                        href={ADSTERRA_SMARTLINK}
                        onClick={handleLinkClick}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-4 w-full py-5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-black rounded-2xl shadow-[0_0_40px_rgba(147,51,234,0.4)] border border-white/10 hover:scale-[1.03] active:scale-95 transition-all text-xl md:text-2xl font-bengali uppercase tracking-tight group/btn"
                      >
                        লিংক প্রস্তুত ✅
                        <Share2 className="h-6 w-6 md:h-7 md:w-7 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] opacity-90">
                           Safe & Verified Source
                        </div>
                        <p className="font-bengali text-slate-400 text-[10px]">এই লিংকটি সম্পূর্ণ নিরাপদ এবং পরীক্ষিত।</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Trust Messaging */}
          <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 space-y-6">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="h-12 w-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                <Shield className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bengali text-xl font-black text-white">সম্পূর্ণ নিরাপদ প্ল্যাটফর্ম</h3>
                <p className="font-bengali text-slate-400 text-sm">আমরা আপনার গোপনীয়তা এবং নিরাপত্তা নিশ্চিত করি।</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-bengali text-slate-300 leading-relaxed text-lg font-medium">বিশেষ দ্রষ্টব্য: এই ভিডিওটি বর্তমানে অত্যন্ত আলোচিত এবং এর কন্টেন্ট আমাদের বিশেষ সোর্স থেকে সংগৃহীত। ভিডিওর বিস্তারিত এবং ডাউনলোড লিংক পেতে উপরের <span className="text-purple-400 font-bold">"লিংক প্রস্তুত ✅"</span> বাটনে ক্লিক করুন। আমরা নিয়মিত সেরা কন্টেন্ট আপনাদের জন্য বাছাই করি।</p>
            </div>
          </div>
        </div>

        {/* Info Sidebar Section */}
        <div className="space-y-6">
          <div className="bg-[#111118]/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 space-y-8 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
               <Video className="h-24 w-24" />
             </div>
            <h4 className="font-bengali text-xl font-black text-white border-b border-white/10 pb-4 relative z-10">ভিডিও ইনফরমেশন</h4>
            
            <div className="space-y-6 relative z-10">
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-purple-500/30 transition-colors">
                <h4 className="font-bengali text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">বর্তমান স্ট্যাটাস</h4>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="inline-block px-4 py-1.5 bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest">{video.status || "Premium"}</span>
                </div>
              </div>
              
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-blue-500/30 transition-colors">
                <h4 className="font-bengali text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">ক্যাটাগরি</h4>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span className="font-bengali text-white font-black text-sm uppercase">
                    {video.category === 'new' ? 'নতুন আপডেট' : video.category === 'popular' ? 'বেশ জনপ্রিয়' : 'স্পেশাল কালেকশন'}
                  </span>
                </div>
              </div>

              <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="font-bengali text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">আপলোড এর সময়</h4>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <p className="font-bengali text-white font-bold text-sm">{getUploadTime(video)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-[2.5rem] p-8 border border-white/10 group">
            <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HelpCircle className="h-5 w-5 text-purple-400" />
            </div>
            <h4 className="font-bengali text-lg font-black text-white mb-4">সাহায্য প্রয়োজন?</h4>
            <p className="font-bengali text-slate-400 text-sm leading-relaxed mb-6">লিংক ওপেন করতে বা ভিডিও দেখতে কোনো সমস্যা হলে সরাসরি আমাদের সাথে যোগাযোগ করুন।</p>
            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bengali font-bold text-white transition-all">যোগাযোগ করুন</button>
          </div>
        </div>
      </div>

      {/* Suggested Videos Section */}
      <div className="mt-24">
        <div className="flex items-center justify-between mb-12">
          <SectionHeader title="আরও ভাইরাল ভিডিও" icon={TrendingUp} />
          <div className="hidden md:flex items-center gap-2 text-purple-400 font-bengali text-sm font-bold bg-purple-500/10 px-4 py-2 rounded-xl border border-purple-500/20">
            নতুন সংগ্রহ <Sparkles className="h-4 w-4" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {relatedVideos.map((item, index) => (
            <VideoCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* Sticky Mobile Button */}
      {canProceed && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[100] lg:hidden"
        >
          <a 
            href={ADSTERRA_SMARTLINK}
            onClick={handleLinkClick}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-[0_15px_35px_rgba(147,51,234,0.6)] border border-white/20 active:scale-95 transition-all text-xl font-bengali"
          >
            লিংক প্রস্তুত ✅
            <Share2 className="h-6 w-6" />
          </a>
        </motion.div>
      )}
    </motion.div>
  );
};

const InfoPage = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-12 px-4 text-center">
    <div className="h-16 w-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
      <Icon className="h-8 w-8 text-purple-400" />
    </div>
    <h2 className="font-bengali text-3xl md:text-5xl font-black text-white mb-10 logo-text tracking-tight uppercase">{title}</h2>
    <div className="bg-[#111118]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-14 font-bengali text-slate-200 leading-relaxed text-left space-y-8 shadow-2xl">
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left space-y-3">
            <h3 className="font-bengali text-xl md:text-3xl font-black text-white tracking-tight">
              নতুন আপডেট দেখতে এখানে ক্লিক করুন
            </h3>
            <p className="font-bengali text-slate-300 text-sm md:text-base">সব সেরা ভাইরাল ভিডিও এবং বিশেষ সংগৃহীত ভিডিওগুলো সবার আগে পান</p>
          </div>
          <a 
            href={ADSTERRA_SMARTLINK} 
            onClick={handleCTAClick}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 hover:scale-[1.05] active:scale-95 transition-all text-sm"
          >
            <Share2 className="h-4 w-4" />
            ক্লিক করুন
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div>
            <Logo size="sm" showSubtitle={false} />
          </div>
          <p className="font-bengali text-slate-400 text-sm font-medium tracking-wide">© ২০২৬ দেশি কালেকশন । সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <button onClick={() => onPageChange("about")} className="text-slate-300 hover:text-white font-bengali text-sm font-bold transition-all hover:translate-y-[-1px]">আমাদের সম্পর্কে</button>
          <button onClick={() => onPageChange("contact")} className="text-slate-300 hover:text-white font-bengali text-sm font-bold transition-all hover:translate-y-[-1px]">যোগাযোগ</button>
          <button onClick={() => onPageChange("privacy")} className="text-slate-300 hover:text-white font-bengali text-sm font-bold transition-all hover:translate-y-[-1px]">গোপনীয়তা নীতিমালা</button>
          <button onClick={() => onPageChange("disclaimer")} className="text-slate-300 hover:text-white font-bengali text-sm font-bold transition-all hover:translate-y-[-1px]">ডিসক্লেইমার</button>
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

const handleCTAClick = () => {
  console.log("[CLICK_TRACK] Footer CTA clicked");
};

const SocialBarAd = () => {
  useEffect(() => {
    const scriptId = "adsterra-social-bar";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.src = "//liverdopost.com/71/6a/e0/716ae033fcb764b4c735ba703c734914.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<"all" | "new" | "popular" | "special">("all");
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Synchronize activeTab with URL path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path.startsWith('/watch')) setActiveTab('watch');
    else if (path === '/about') setActiveTab('about');
    else if (path === '/contact') setActiveTab('contact');
    else if (path === '/privacy') setActiveTab('privacy');
    else if (path === '/disclaimer') setActiveTab('disclaimer');
  }, [location.pathname]);

  // Page Title Sync
  useEffect(() => {
    const pageTitles: Record<string, string> = {
      'home': 'দেশি কালেকশন - প্রিমিয়াম ভিডিও আপডেট',
      'about': 'আমাদের সম্পর্কে - দেশি কালেকশন',
      'contact': 'যোগাযোগ করুন - দেশি কালেকশন',
      'privacy': 'গোপনীয়তা নীতিমালা - দেশি কালেকশন',
      'disclaimer': 'ডিসক্লেইমার - দেশি কালেকশন',
      'watch': 'ভিডিও দেখুন - দেশি কালেকশন'
    };
    document.title = pageTitles[activeTab] || 'দেশি কালেকশন';
  }, [activeTab]);

  const filteredMedia = useMemo(() => {
    return mediaItems.filter(item => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = item.caption.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const pagedMedia = useMemo(() => {
    return filteredMedia.slice(0, visibleCount);
  }, [filteredMedia, visibleCount]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans overflow-x-hidden">
      <BubbleBackground />
      <SocialBarAd />
      
      <header className="sticky top-0 z-[100] w-full bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 py-5 px-6 shadow-2xl transition-all duration-300">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link to="/" className="cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => { setActiveCategory("all"); setActiveTab("home"); }}>
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-3">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "contact") navigate("/contact");
                  else if (item.id === "home") { navigate("/"); setActiveCategory("all"); }
                  else { navigate("/"); setActiveCategory(item.id as any); }
                  setActiveTab(item.id);
                }}
                className={`nav-link px-6 py-2.5 text-sm font-bold font-bengali rounded-2xl transition-all duration-300 ${activeTab === item.id ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] scale-105" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button className="lg:hidden p-2.5 bg-white/5 rounded-xl transition-all active:scale-95" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
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
                      if (item.id === "contact") navigate("/contact");
                      else if (item.id === "home") { navigate("/"); setActiveCategory("all"); }
                      else { navigate("/"); setActiveCategory(item.id as any); }
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
        <Routes>
          <Route path="/" element={
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
                <p className="font-bengali text-slate-200 max-w-2xl mx-auto text-base md:text-2xl leading-relaxed font-medium">ভাইরাল হওয়া সব আলোচিত ভিডিও এবং বিশেষ কালেকশনের সেরা আপডেটগুলো সবার আগে পান এখানে।</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12">
                <AnimatePresence mode="popLayout">
                  {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                  ) : pagedMedia.length > 0 ? (
                    pagedMedia.map((item, index) => <VideoCard key={item.id} item={item} index={index} />)
                  ) : !isLoading && pagedMedia.length === 0 ? (
                    <div className="col-span-full py-20 text-center flex flex-col items-center justify-center space-y-4">
                      <Search className="h-12 w-12 text-slate-800" />
                      <div className="opacity-60 font-bengali text-slate-500 font-bold">দুঃখিত, কোনো ভিডিও পাওয়া যায়নি!</div>
                    </div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Load More Button */}
              {!isLoading && filteredMedia.length > visibleCount && (
                <div className="flex justify-center mb-16">
                  <button 
                    onClick={loadMore}
                    className="px-12 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bengali font-black rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95"
                  >
                    আরও ভিডিও দেখুন
                  </button>
                </div>
              )}

              <NativeAd />

              <SectionHeader title="পপুলার ভিডিও" icon={TrendingUp} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12">
                {popularVideos.map((item, index) => (
                  <VideoCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </>
          } />
          
          <Route path="/watch/:slug" element={
            <WatchPage />
          } />

          <Route path="/about" element={
            <InfoPage title="আমাদের সম্পর্কে" icon={Info}>
              <p><strong>দেশি কালেকশন</strong> একটি প্রিমিয়াম বিনোদনমূলক গ্যালারি প্ল্যাটফর্ম। ভাইরাল হওয়া সব আলোচিত ভিডিও ও খবর সবার আগে আপনাদের মাঝে পৌঁছে দেয়াই আমাদের লক্ষ্য।</p>
            </InfoPage>
          } />

          <Route path="/contact" element={
            <InfoPage title="যোগাযোগ করুন" icon={Phone}>
              <p className="text-center">যেকোনো সহযোগিতার জন্য বা ভিডিও যুক্ত করতে টেলিগ্রামে যোগাযোগ করুন।</p>
              <div className="flex justify-center pt-4">
                <a href={ADSTERRA_SMARTLINK} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-purple-500/20 hover:scale-105 transition-all font-bengali">লিংক দেখুন</a>
              </div>
            </InfoPage>
          } />

          <Route path="/privacy" element={
            <InfoPage title="গোপনীয়তা নীতিমালা" icon={Shield}>
              <p>আপনার তথ্য আমাদের কাছে নিরাপদ। ব্রাউজিং অভিজ্ঞতা উন্নত করতে কুকিজ ব্যবহৃত হতে পারে।</p>
            </InfoPage>
          } />

          <Route path="/disclaimer" element={
            <InfoPage title="ডিসক্লেইমার" icon={HelpCircle}>
              <p>এখানে প্রদর্শিত অধিকাংশ কন্টেন্ট পাবলিক সোর্স থেকে সংগৃহীত। কোনো কন্টেন্ট নিয়ে অভিযোগ থাকলে আমাদের সাথে যোগাযোগ করুন।</p>
            </InfoPage>
          } />
        </Routes>
      </main>

      <Footer onPageChange={(page) => {
        if (page === "home") {
          navigate("/");
          setActiveCategory("all");
          setActiveTab("home");
        } else {
          navigate(`/${page}`);
          setActiveTab(page);
        }
        window.scrollTo(0, 0);
      }} />
    </div>
  );
}
