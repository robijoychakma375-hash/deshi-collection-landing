import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Video, Sparkles, X, ChevronUp, Share2, Home, Clock, TrendingUp, Star, Phone, Info, Shield, HelpCircle, ChevronRight, Lock, Eye, Menu, Play, Pause, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from "react-router-dom";

const ADSTERRA_SMARTLINK = "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32";

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
    link: ADSTERRA_SMARTLINK,
    category: "new",
    status: "Trending",
    timeLabel: "১ ঘণ্টা আগে"
  },
  {
    id: "2",
    slug: "expatriate-life-stories",
    caption: "প্রবাসীদের জীবনে ঘটে যাওয়া কিছু বাস্তব ঘটনা যা ভাইরাল",
    image: "https://i.postimg.cc/HnD7GBQr/photo-2026-04-21-11-57-03.jpg",
    link: ADSTERRA_SMARTLINK,
    category: "popular",
    status: "Hot"
  },
  {
    id: "3",
    slug: "fraud-awareness-tips",
    caption: "প্রতারণা চক্র থেকে বাঁচতে সচেতনতামূলক ভিডিও আপডেট",
    image: "https://i.postimg.cc/0yWM58pn/photo-2026-04-21-13-08-37.jpg",
    link: ADSTERRA_SMARTLINK,
    category: "special"
  },
  {
    id: "4",
    slug: "educational-institute-viral",
    caption: "শিক্ষা প্রতিষ্ঠান কেন্দ্রিক সমসাময়িক আলোচিত ভিডিও",
    image: "https://i.postimg.cc/BZTjL5TP/photo-2026-04-21-13-13-58.jpg",
    link: ADSTERRA_SMARTLINK,
    category: "new",
    status: "নতুন",
    timeLabel: "আজ আপডেট"
  },
  {
    id: "5",
    slug: "social-media-top-updates",
    caption: "সোশ্যাল মিডিয়ায় আলোচিত আজকের সেরা আপডেটগুলো",
    image: "https://i.postimg.cc/RFr0qqN5/photo-2026-04-21-11-40-34.jpg",
    link: ADSTERRA_SMARTLINK,
    category: "popular",
    status: "Popular"
  },
  {
    id: "6",
    slug: "truth-behind-stories",
    caption: "ঘটনার আড়ালের সত্য প্রকাশ—বিস্তারিত ভিডিওতে দেখুন",
    image: "https://i.postimg.cc/Kvc816vy/photo-2026-04-21-11-38-59.jpg",
    link: ADSTERRA_SMARTLINK,
    category: "special",
    status: "Trending"
  },
  {
    id: "7",
    slug: "picnic-bus-incident",
    caption: "পিকনিকের বাসে ঘটে যাওয়া অনাকাঙ্ক্ষিত ঘটনার ভিডিও",
    image: "https://i.postimg.cc/g0ZfP9Nh/photo-2026-05-01-00-10-47.jpg",
    link: ADSTERRA_SMARTLINK,
    category: "new",
    status: "নতুন"
  },
  {
    id: "8",
    slug: "wedding-viral-dance",
    caption: "বিয়েবাড়ির ভাইরাল ভিডিও—সবাইকে তাক লাগিয়ে দিয়েছে",
    image: "https://i.postimg.cc/brzMbZph/photo-2026-04-20-15-24-21.jpg",
    link: ADSTERRA_SMARTLINK,
    category: "popular"
  }
];

const popularVideos: MediaItem[] = [
  {
    id: "popular-1",
    slug: "weekly-top-collections",
    caption: "গত সপ্তাহের আলোচিত সেরা ভিডিও কালেকশন",
    image: "https://i.postimg.cc/q76khyPB/photo-2026-04-12-06-42-22.jpg",
    link: ADSTERRA_SMARTLINK,
    category: "popular",
    views: "১.২ লক্ষ",
    status: "Popular"
  },
  {
    id: "popular-2",
    slug: "most-viewed-viral",
    caption: "সোশ্যাল মিডিয়ায় সবচেয়ে বেশি দেখা ভিডিও",
    image: "https://i.postimg.cc/cCLGJN7X/photo-2026-04-21-13-17-44.jpg",
    link: ADSTERRA_SMARTLINK,
    category: "popular",
    views: "৯৫ হাজার",
    status: "Trending"
  },
  {
    id: "popular-3",
    slug: "special-entertainment",
    caption: "বাছাইকৃত স্পেশাল বিনোদনমূলক ভিডিও",
    image: "https://i.postimg.cc/vHGHq1nF/photo-2025-07-19-15-21-23.jpg",
    link: ADSTERRA_SMARTLINK,
    category: "popular",
    views: "৮০ হাজার"
  },
  {
    id: "popular-4",
    slug: "top-rated-updates",
    caption: "জনপ্রিয়তার শীর্ষে থাকা সেরা আপডেট",
    image: "https://i.postimg.cc/vmCZ33rt/photo-2025-05-31-10-34-32.jpg",
    link: ADSTERRA_SMARTLINK,
    category: "popular",
    views: "১.৫ লক্ষ",
    status: "Hot"
  },
  {
    id: "popular-5",
    slug: "best-viral-today",
    caption: "আজকের সেরা ভাইরাল ভিডিও আপডেট",
    image: "https://i.postimg.cc/QNwWZnxp/photo-2026-03-18-17-40-02(1).jpg",
    link: ADSTERRA_SMARTLINK,
    category: "popular",
    views: "৫০ হাজার"
  },
  {
    id: "popular-6",
    slug: "mysterious-special-video",
    caption: "বিশেষ সংগৃহীত রহস্যময় ভিডিও",
    image: "https://i.postimg.cc/0yWM58pn/photo-2026-04-21-13-08-37.jpg",
    link: ADSTERRA_SMARTLINK,
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


// --- Components ---

const BubbleBackground = () => (
  <>
    <div className="luxury-glow-bg" />
    <div className="glow-blob-gold top-[-10%] left-[-10%]" />
    <div className="glow-blob-gold bottom-[-10%] right-[-10%]" />
  </>
);

const Logo = ({ size = "md", showSubtitle = true }: { size?: "sm" | "md" | "lg"; showSubtitle?: boolean }) => {
  const isSm = size === "sm";
  const isLg = size === "lg";
  
  return (
    <div className="flex items-center gap-3 select-none group">
      <div className={`relative ${isSm ? 'h-8 w-8' : isLg ? 'h-14 w-14' : 'h-10 w-10'} flex-shrink-0 transition-transform duration-500 group-hover:scale-105`}>
        {/* Soft gold glow behind logo */}
        <div className="absolute inset-0 bg-[#D4AF37] rounded-xl blur-md opacity-25 group-hover:opacity-40 transition-opacity" />
        
        {/* Logo Container */}
        <div className="relative h-full w-full bg-[#111111] border border-[rgba(212,175,55,0.2)] rounded-xl flex items-center justify-center shadow-xl">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className={`${isSm ? 'h-4 w-4' : 'h-5 w-5'} transform transition-transform group-hover:scale-110 duration-500`}
          >
            <path 
              d="M18.2574 10.174C19.7468 11.034 19.7468 12.966 18.2574 13.826L8.85058 19.2562C7.36116 20.1162 5.50002 19.1492 5.50002 17.4302L5.50002 6.56981C5.50002 4.85078 7.36116 3.88373 8.85058 4.74373L18.2574 10.174Z" 
              fill="url(#logo-grad-gold)" 
            />
            <defs>
              <linearGradient id="logo-grad-gold" x1="5.5" y1="4" x2="19" y2="19" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F4D03F" />
                <stop offset="1" stopColor="#AA7C11" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className={`font-bengali font-black tracking-tight leading-none text-white ${isSm ? 'text-base' : isLg ? 'text-2xl md:text-3xl' : 'text-lg md:text-2xl'}`}>
          <span className="luxury-gold-gradient-text">দেশি</span> কালেকশন
        </h1>
        {showSubtitle && (
          <span className={`font-sans font-bold tracking-[0.25em] text-[8px] md:text-[9px] text-[#B8B8B8]`}>
            PREMIUM CINEMA
          </span>
        )}
      </div>
    </div>
  );
};

const SectionHeader = ({ title, icon: Icon }: { title: string; icon: any }) => (
  <div className="flex items-center gap-3 mb-8 px-2">
    <div className="h-9 w-9 bg-[rgba(212,175,55,0.06)] border border-[rgba(212,175,55,0.15)] rounded-xl flex items-center justify-center">
      <Icon className="h-4.5 w-4.5 text-[#D4AF37]" />
    </div>
    <h2 className="font-bengali text-lg md:text-xl font-bold text-white tracking-tight">
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
      case 'Hot': return 'bg-[#AA7C11] text-black border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.25)]';
      case 'Trending': return 'bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]';
      case 'Popular': return 'bg-[#D4AF37] text-black border border-[#F4D03F]/30 shadow-[0_0_15px_rgba(212,175,55,0.25)]';
      case 'নতুন': return 'bg-[#171717] text-white border border-[#D4AF37]/20';
      default: return 'bg-[#D4AF37] text-black';
    }
  };

  return (
    <a
      href={ADSTERRA_SMARTLINK}
      target="_blank"
      rel="noopener noreferrer"
      className="premium-card group flex flex-col h-full w-full text-left cursor-pointer outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
    >
      <motion.div
        initial={priority ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2, delay: priority ? 0 : index * 0.02 }}
        whileHover={{ scale: 1.01 }}
        className="flex flex-col h-full w-full transform transition-all duration-300"
      >
        <div className="relative aspect-video flex-shrink-0 overflow-hidden bg-[#111111]">
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#111111] animate-pulse flex items-center justify-center">
              <Video className="h-8 w-8 text-[#D4AF37]/25" />
            </div>
          )}
          <img
            src={item.image || "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop"}
            alt={item.caption}
            loading={priority ? "eager" : "lazy"}
            onLoad={() => setIsLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-750 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop";
              setIsLoaded(true);
            }}
          />
          
          {/* Play Icon Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="p-3 bg-[#D4AF37] rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <Video className="h-5 w-5 text-black fill-black" />
            </div>
          </div>

          <div className="video-tag">ভিডিও</div>
          {item.status && (
            <div className={`absolute top-3 right-3 z-10 font-bengali text-[9px] font-bold px-2.5 py-1 rounded-full ${getStatusStyle(item.status)} pointer-events-none`}>
              {item.status}
            </div>
          )}

          {/* Upload Time Badge Overlay */}
          <div className="absolute bottom-3 right-3 z-10 font-bengali text-[9px] font-bold px-2.5 py-1.5 rounded-full bg-black/80 text-white backdrop-blur-md border border-[rgba(212,175,55,0.15)] flex items-center gap-1.5 shadow-xl group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-transparent transition-colors duration-300 pointer-events-none">
            <Clock className="h-3 w-3 text-[#D4AF37] group-hover:text-black transition-colors" />
            {getUploadTime(item)}
          </div>
        </div>
        <div className="p-4 md:p-5 flex flex-col flex-1 pointer-events-none">
          <h3 className="font-bengali text-sm md:text-base font-bold leading-snug line-clamp-2 text-white group-hover:text-[#D4AF37] transition-colors mb-4 min-h-[2.5rem] md:min-h-[3rem]">
            {item.caption}
          </h3>
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-[rgba(212,175,55,0.06)] pt-4 w-full">
            <span className="text-[9px] font-bold text-[#D4AF37] bg-[rgba(212,175,55,0.06)] px-2.5 py-1 rounded-full border border-[rgba(212,175,55,0.12)] font-bengali whitespace-nowrap">
              {item.category === 'new' ? 'নতুন' : item.category === 'popular' ? 'জনপ্রিয়' : 'বিশেষ'}
            </span>
            <span className="flex items-center gap-1 text-[11px] md:text-xs font-bold text-[#D4AF37] font-bengali whitespace-nowrap group-hover:translate-x-1 transition-transform">
              ভিডিও দেখুন
              <Video className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </motion.div>
    </a>
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
        className="w-full max-w-4xl min-h-[100px] bg-[#111111] rounded-2xl border border-[rgba(212,175,55,0.12)] flex items-center justify-center relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />
        <span className="text-[10px] text-[#B8B8B8] font-bold uppercase tracking-[0.4em] pointer-events-none opacity-40">Advertisement</span>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="premium-card flex flex-col h-full bg-[#171717] border border-[rgba(212,175,55,0.08)] rounded-2xl overflow-hidden">
    <div className="aspect-video bg-[#111111] animate-pulse flex-shrink-0" />
    <div className="p-4 md:p-5 flex flex-col flex-1 space-y-4">
      <div className="space-y-2">
        <div className="h-4 w-full bg-[#111111] rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-[#111111] rounded animate-pulse" />
      </div>
      <div className="mt-auto flex justify-between pt-4 border-t border-[rgba(212,175,55,0.05)]">
        <div className="h-5 w-16 bg-[#111111] rounded animate-pulse" />
        <div className="h-5 w-24 bg-[#111111] rounded animate-pulse" />
      </div>
    </div>
  </div>
);

const allMedia = [...mediaItems, ...popularVideos];

const WatchPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const video = useMemo(() => allMedia.find(v => v.slug === slug), [slug]);

  useEffect(() => {
    if (!video) {
      navigate('/', { replace: true });
      return;
    }
    // Redirect immediately to destination URL on load
    window.location.replace(ADSTERRA_SMARTLINK);
  }, [video, navigate]);

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
      className="max-w-6xl mx-auto pt-8 pb-28 md:py-8 px-4"
    >
      {/* Breadcrumb / Back Button Improvement */}
      <nav className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2 border-b border-[rgba(212,175,55,0.08)]">
        <Link to="/" className="flex items-center gap-1.5 text-[#B8B8B8] hover:text-[#D4AF37] font-bengali font-bold transition-all group whitespace-nowrap text-xs md:text-sm">
          <Home className="h-4 w-4" /> হোম
        </Link>
        <ChevronRight className="h-4 w-4 text-[#B8B8B8]/30 flex-shrink-0" />
        <span className="text-[#D4AF37] font-bengali font-bold text-xs md:text-sm whitespace-nowrap">
          {video.caption}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#171717] rounded-3xl border border-[rgba(212,175,55,0.12)] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative group">
            <div className="relative aspect-video flex-shrink-0 overflow-hidden">
              <img 
                src={video.image} 
                alt={video.caption} 
                className="w-full h-full object-cover opacity-40 blur-[4px] scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/70">
                <div className="p-5 bg-[rgba(212,175,55,0.08)] rounded-full border border-[rgba(212,175,55,0.3)] mb-4 shadow-[0_0_30px_rgba(212,175,55,0.15)] group-hover:scale-105 transition-transform duration-300">
                  <Video className="h-10 w-10 text-[#D4AF37] animate-pulse" />
                </div>
                <h2 className="font-bengali text-lg md:text-2xl font-black text-white mb-6 leading-tight max-w-2xl px-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{video.caption}</h2>
                
                <div className="bg-[#111111]/90 backdrop-blur-3xl rounded-2xl p-6 border border-[rgba(212,175,55,0.15)] w-full max-w-sm shadow-2xl">
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
                    <a 
                      href={ADSTERRA_SMARTLINK}
                      onClick={handleLinkClick}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#AA7C11] text-black font-extrabold rounded-xl shadow-[0_4px_25px_rgba(212,175,55,0.3)] border border-[#F4D03F]/20 hover:scale-[1.03] active:scale-95 transition-all text-base md:text-lg font-bengali uppercase tracking-wider group/btn"
                    >
                      ভিডিও ডাউনলোড / প্লে করুন ✅
                      <Share2 className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <div className="flex items-center gap-1.5 text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.2em] opacity-90">
                         Safe & Verified Source
                      </div>
                      <p className="font-bengali text-[#B8B8B8] text-[10px]">এই লিংকটি সম্পূর্ণ নিরাপদ এবং পরীক্ষিত।</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Messaging */}
          <div className="bg-[#171717] rounded-3xl p-6 md:p-8 border border-[rgba(212,175,55,0.12)] space-y-6 shadow-xl">
            <div className="flex items-center gap-4 border-b border-[rgba(212,175,55,0.08)] pb-6">
              <div className="h-12 w-12 bg-[rgba(212,175,55,0.06)] rounded-2xl flex items-center justify-center border border-[rgba(212,175,55,0.15)]">
                <Shield className="h-6 w-6 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-bengali text-xl font-black text-white">সম্পূর্ণ নিরাপদ প্ল্যাটফর্ম</h3>
                <p className="font-bengali text-[#B8B8B8] text-xs">আমরা আপনার গোপনীয়তা এবং নিরাপত্তা নিশ্চিত করি।</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-bengali text-[#B8B8B8] leading-relaxed text-sm md:text-base font-medium">বিশেষ দ্রষ্টব্য: এই ভিডিওটি বর্তমানে অত্যন্ত আলোচিত এবং এর কন্টেন্ট আমাদের বিশেষ সোর্স থেকে সংগৃহীত। ভিডিওর বিস্তারিত এবং ডাউনলোড লিংক পেতে উপরের <span className="text-[#D4AF37] font-bold">"ভিডিও ডাউনলোড / প্লে করুন ✅"</span> বাটনে ক্লিক করুন। আমরা নিয়মিত সেরা কন্টেন্ট আপনাদের জন্য বাছাই করি।</p>
            </div>
          </div>
        </div>

        {/* Info Sidebar Section */}
        <div className="space-y-6">
          <div className="bg-[#171717] rounded-3xl p-6 md:p-8 border border-[rgba(212,175,55,0.12)] space-y-8 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-[0.02]">
               <Video className="h-24 w-24 text-[#D4AF37]" />
             </div>
            <h4 className="font-bengali text-lg font-black text-white border-b border-[rgba(212,175,55,0.08)] pb-4 relative z-10">ভিডিও ইনফরমেশন</h4>
            
            <div className="space-y-6 relative z-10">
              <div className="p-4 bg-black/30 rounded-2xl border border-[rgba(212,175,55,0.06)] group hover:border-[rgba(212,175,55,0.2)] transition-colors">
                <h4 className="font-bengali text-[10px] font-bold text-[#B8B8B8] mb-2.5 uppercase tracking-wider">বর্তমান স্ট্যাটাস</h4>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_8px_#D4AF37]" />
                  <span className="inline-block px-3 py-1 bg-[rgba(212,175,55,0.06)] text-[#D4AF37] border border-[rgba(212,175,55,0.15)] rounded-lg text-[9px] font-black uppercase tracking-widest">{video.status || "Premium"}</span>
                </div>
              </div>
              
              <div className="p-4 bg-black/30 rounded-2xl border border-[rgba(212,175,55,0.06)] group hover:border-[rgba(212,175,55,0.2)] transition-colors">
                <h4 className="font-bengali text-[10px] font-bold text-[#B8B8B8] mb-2.5 uppercase tracking-wider">ক্যাটাগরি</h4>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
                  <span className="font-bengali text-white font-bold text-sm uppercase">
                    {video.category === 'new' ? 'নতুন আপডেট' : video.category === 'popular' ? 'বেশ জনপ্রিয়' : 'স্পেশাল কালেকশন'}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-black/30 rounded-2xl border border-[rgba(212,175,55,0.06)]">
                <h4 className="font-bengali text-[10px] font-bold text-[#B8B8B8] mb-2.5 uppercase tracking-wider">আপলোড এর সময়</h4>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#D4AF37]" />
                  <p className="font-bengali text-white font-bold text-sm">{getUploadTime(video)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#171717] to-[#111111] rounded-3xl p-6 md:p-8 border border-[rgba(212,175,55,0.12)] shadow-xl group">
            <div className="h-10 w-10 bg-[rgba(212,175,55,0.06)] border border-[rgba(212,175,55,0.15)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <HelpCircle className="h-5 w-5 text-[#D4AF37]" />
            </div>
            <h4 className="font-bengali text-base font-black text-white mb-3">সাহায্য প্রয়োজন?</h4>
            <p className="font-bengali text-[#B8B8B8] text-xs leading-relaxed mb-6">লিংক ওপেন করতে বা ভিডিও দেখতে কোনো সমস্যা হলে সরাসরি আমাদের সাথে যোগাযোগ করুন।</p>
            <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="w-full py-3 bg-black/50 hover:bg-black/70 border border-[rgba(212,175,55,0.15)] hover:border-[#D4AF37]/30 rounded-xl font-bengali text-xs font-bold text-white transition-all">যোগাযোগ করুন</button>
          </div>
        </div>
      </div>

      {/* Suggested Videos Section */}
      <div className="mt-24">
        <div className="flex items-center justify-between mb-12">
          <SectionHeader title="আরও ভাইরাল ভিডিও" icon={TrendingUp} />
          <div className="hidden md:flex items-center gap-2 text-[#D4AF37] font-bengali text-xs font-bold bg-[rgba(212,175,55,0.05)] px-4 py-2 rounded-full border border-[rgba(212,175,55,0.12)]">
            নতুন সংগ্রহ <Sparkles className="h-3.5 w-3.5 text-[#D4AF37] animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {relatedVideos.map((item, index) => (
            <VideoCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* Sticky Mobile Button */}
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
          className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#AA7C11] text-black font-extrabold rounded-xl shadow-[0_15px_35px_rgba(212,175,55,0.4)] border border-[rgba(212,175,55,0.2)] active:scale-95 transition-all text-lg font-bengali"
        >
          ভিডিও ডাউনলোড / প্লে করুন ✅
          <Share2 className="h-5 w-5" />
        </a>
      </motion.div>
    </motion.div>
  );
};

const InfoPage = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto py-12 px-4 text-center">
    <div className="h-14 w-14 bg-[rgba(212,175,55,0.06)] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[rgba(212,175,55,0.15)] shadow-xl">
      <Icon className="h-6 w-6 text-[#D4AF37]" />
    </div>
    <h2 className="font-bengali text-2xl md:text-4xl font-black text-white mb-8 tracking-tight uppercase">{title}</h2>
    <div className="bg-[#171717] border border-[rgba(212,175,55,0.12)] rounded-3xl p-8 md:p-12 font-bengali text-[#B8B8B8] leading-relaxed text-left space-y-6 shadow-2xl">
      {children}
    </div>
  </motion.div>
);

const Footer = ({ onPageChange }: { onPageChange: (page: any) => void }) => (
  <footer className="bg-[#080808] border-t border-[rgba(212,175,55,0.08)] pt-16 pb-12 px-4 shadow-2xl relative">
    <div className="max-w-7xl mx-auto space-y-12 relative z-10">
      {/* Telegram CTA */}
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-[#171717] to-[#111111] backdrop-blur-xl border border-[rgba(212,175,55,0.12)] rounded-3xl p-6 md:p-10 text-center relative group overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-left space-y-3">
            <h3 className="font-bengali text-xl md:text-2xl font-black text-white tracking-tight">
              নতুন আপডেট দেখতে এখানে ক্লিক করুন
            </h3>
            <p className="font-bengali text-[#B8B8B8] text-xs md:text-sm">সব সেরা ভাইরাল ভিডিও এবং বিশেষ সংগৃহীত ভিডিওগুলো সবার আগে পান</p>
          </div>
          <a 
            href={ADSTERRA_SMARTLINK} 
            onClick={handleCTAClick}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-black font-bold rounded-full shadow-lg shadow-[#D4AF37]/15 hover:scale-[1.05] active:scale-95 transition-all text-xs"
          >
            <Share2 className="h-4 w-4" />
            ক্লিক করুন
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[rgba(212,175,55,0.08)] pt-12">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div>
            <Logo size="sm" showSubtitle={false} />
          </div>
          <p className="font-bengali text-[#B8B8B8] text-xs font-medium tracking-wide">© ২০২৬ দেশি কালেকশন । সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          <button onClick={() => onPageChange("about")} className="text-[#B8B8B8] hover:text-[#D4AF37] font-bengali text-xs font-bold transition-all">আমাদের সম্পর্কে</button>
          <button onClick={() => onPageChange("contact")} className="text-[#B8B8B8] hover:text-[#D4AF37] font-bengali text-xs font-bold transition-all">যোগাযোগ</button>
          <button onClick={() => onPageChange("privacy")} className="text-[#B8B8B8] hover:text-[#D4AF37] font-bengali text-xs font-bold transition-all">গোপনীয়তা নীতিমালা</button>
          <button onClick={() => onPageChange("disclaimer")} className="text-[#B8B8B8] hover:text-[#D4AF37] font-bengali text-xs font-bold transition-all">ডিসক্লেইমার</button>
        </div>
      </div>
      
      <p className="text-center text-[9px] text-[#D4AF37]/50 font-bold tracking-[0.3em] uppercase opacity-40">
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
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeViewers, setActiveViewers] = useState(6432);
  const videoRef = useRef<HTMLVideoElement>(null);

  const closeLiveModal = () => {
    setIsLiveModalOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
  };

  // Fluctuating live viewer count
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveViewers(prev => prev + Math.floor(Math.random() * 21) - 10);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      videoRef.current.currentTime = percentage * videoRef.current.duration;
      setProgress(percentage * 100);
    }
  };

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
    <div className="w-full min-h-[100dvh] bg-[#080808] text-white selection:bg-[#D4AF37]/25 font-sans relative flex flex-col overflow-x-hidden">
      <BubbleBackground />
      <SocialBarAd />
      
      <header className="sticky top-0 z-[100] w-full bg-[#080808]/90 backdrop-blur-2xl border-b border-[rgba(212,175,55,0.08)] py-4 px-6 shadow-2xl transition-all duration-300">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link to="/" className="cursor-pointer transition-transform hover:scale-[1.01]" onClick={() => { setActiveCategory("all"); setActiveTab("home"); }}>
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "contact") navigate("/contact");
                  else if (item.id === "home") { navigate("/"); setActiveCategory("all"); }
                  else { navigate("/"); setActiveCategory(item.id as any); }
                  setActiveTab(item.id);
                }}
                className={`px-5 py-2 text-xs font-bold font-bengali rounded-full transition-all duration-300 border ${activeTab === item.id ? "bg-[rgba(212,175,55,0.06)] border-[#D4AF37] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)] scale-105" : "text-[#B8B8B8] hover:text-[#D4AF37] border-transparent hover:bg-white/5"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button className="lg:hidden p-2.5 bg-white/5 border border-white/5 rounded-xl transition-all active:scale-95" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="h-4.5 w-4.5 text-white" />
            ) : (
              <Menu className="h-4.5 w-4.5 text-white" />
            )}
          </button>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-[#111111] border-t border-[rgba(212,175,55,0.08)] mt-4 overflow-hidden rounded-2xl">
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
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold font-bengali text-sm transition-all ${activeTab === item.id ? "bg-[rgba(212,175,55,0.06)] text-[#D4AF37] border border-[#D4AF37]/20" : "text-[#B8B8B8] hover:text-white"}`}
                  >
                    <item.icon className="h-4.5 w-4.5 text-[#D4AF37]" />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow w-full mx-auto max-w-7xl px-3 md:px-6 pb-4 mt-2 md:mt-4">
        <Routes>
          <Route path="/" element={
            <>
              {/* Premium Hero (Cinematic Apple TV / Netflix style) */}
              <section className="py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative overflow-hidden px-4 md:px-0">
                {/* Floating ambient gold glow behind hero */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] bg-[#D4AF37] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

                {/* Left: Text Details & Statistics */}
                <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 md:space-y-8 max-w-2xl">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.15)] rounded-full text-[#D4AF37] text-[10px] font-extrabold tracking-[0.2em] uppercase self-start"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#D4AF37] animate-pulse" /> PRESTIGE ENTERTAINMENT
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="font-bengali text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight"
                  >
                    মৌলিক ও এক্সক্লুসিভ <br/>
                    <span className="luxury-gold-gradient-text">ভাইরাল ভিডিওর</span> <br/>
                    প্রিমিয়াম হাব
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="font-bengali text-[#B8B8B8] text-sm md:text-base leading-relaxed font-medium"
                  >
                    দেশি কালেকশন আপনাকে দিচ্ছে ইন্টারনেট জগতের সবচেয়ে আলোচিত, ভাইরাল এবং রহস্যময় ভিডিওগুলোর সম্পূর্ণ নিরাপদ ও বিশ্বস্ত সংগ্রহশালা। এখনই লাইভ প্রিভিউ দেখে যুক্ত হোন আমাদের স্পেশাল ডোমেইনে।
                  </motion.p>

                  {/* Statistics block */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="grid grid-cols-3 gap-4 border-y border-[rgba(212,175,55,0.08)] py-5 w-full"
                  >
                    <div>
                      <div className="text-xl md:text-2xl font-black text-white">১.৫M+</div>
                      <div className="font-bengali text-[9px] text-[#B8B8B8] uppercase tracking-wider mt-1">মোট দর্শক</div>
                    </div>
                    <div className="border-x border-[rgba(212,175,55,0.08)] px-2">
                      <div className="text-xl md:text-2xl font-black text-[#D4AF37]">২৪/৭</div>
                      <div className="font-bengali text-[9px] text-[#B8B8B8] uppercase tracking-wider mt-1">নতুন আপডেট</div>
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-black text-white">১০০%</div>
                      <div className="font-bengali text-[9px] text-[#B8B8B8] uppercase tracking-wider mt-1">নিরাপদ সোর্স</div>
                    </div>
                  </motion.div>

                  {/* Hero CTA buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <a 
                      href={ADSTERRA_SMARTLINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#F4D03F] text-black font-extrabold rounded-xl shadow-[0_4px_25px_rgba(212,175,55,0.3)] transition-all flex items-center gap-2 group text-xs font-bengali hover:scale-[1.03] active:scale-95"
                    >
                      <Play className="h-4 w-4 fill-black text-black" />
                      লাইভ প্রিভিউ দেখুন
                    </a>
                    <a 
                      href={ADSTERRA_SMARTLINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-[rgba(212,175,55,0.05)] hover:bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.15)] text-white font-bold rounded-xl transition-all flex items-center gap-2 text-xs font-bengali hover:scale-[1.03]"
                    >
                      সেরা ভিডিওটি দেখুন
                      <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
                    </a>
                  </motion.div>
                </div>

                {/* Right: Cinematic cover image with gold pulsing play button */}
                <motion.a
                  href={ADSTERRA_SMARTLINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.96, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-5 w-full aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden border border-[rgba(212,175,55,0.18)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative bg-black group/player cursor-pointer block"
                >
                  {/* Cinematic Background Cover Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200" 
                    alt="Cinematic Preview Cover"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/player:scale-105"
                  />
                  {/* Subtle dark overlay for text readability & elegant styling */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

                  {/* Soft gold glow around container */}
                  <div className="absolute inset-0 border border-[#D4AF37]/20 group-hover/player:border-[#D4AF37]/50 rounded-3xl transition-colors duration-300 pointer-events-none" />

                  {/* Floating Live Indicator Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                      <span className="h-1.5 w-1.5 bg-white rounded-full" />
                      LIVE
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 bg-black/60 backdrop-blur-md text-[#D4AF37] border border-[rgba(212,175,55,0.2)] text-[10px] font-bold rounded-full">
                      <Eye className="h-3 w-3" />
                      {activeViewers} জন দেখছেন
                    </span>
                  </div>

                  {/* Floating Content Metadata badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-left">
                    <div className="space-y-0.5">
                      <span className="px-2 py-0.5 bg-[#D4AF37] text-black text-[9px] font-extrabold uppercase rounded-md">SPECIAL HIGHLIGHT</span>
                      <p className="font-bengali text-white text-xs font-black drop-shadow-md">সেরা ভাইরাল ও এক্সক্লুসিভ কালেকশন প্রিভিউ</p>
                    </div>
                  </div>

                  {/* Center pulsing Gold Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Pulse waves */}
                      <span className="absolute inset-0 rounded-full bg-[#D4AF37]/30 animate-ping scale-150 opacity-75" />
                      <div className="p-5 md:p-6 bg-[#D4AF37] rounded-full text-black shadow-[0_0_40px_rgba(212,175,55,0.5)] transform transition-transform group-hover/player:scale-110 duration-300 relative z-10">
                        <Play className="h-6 w-6 md:h-8 md:w-8 fill-black text-black ml-0.5" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              </section>


              {/* Category Filters row */}
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-2 px-4 max-w-full">
                  {["all", "new", "popular", "special"].map(id => (
                    <button
                      key={id}
                      onClick={() => { setActiveCategory(id as any); setActiveTab(id === "all" ? "home" : id); }}
                      className={`whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold font-bengali transition-all border ${activeCategory === id ? "bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20" : "bg-[#111111] border-[rgba(212,175,55,0.12)] text-[#B8B8B8] hover:text-[#D4AF37] hover:border-[#D4AF37]/30"}`}
                    >
                      {id === "all" ? "সব ভিডিও" : id === "new" ? "নতুন" : id === "popular" ? "জনপ্রিয়" : "বিশেষ"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search row */}
              <div className="flex justify-center mb-12 px-4">
                <div className="relative w-full max-w-xl group">
                  <input 
                    type="text" 
                    placeholder="পছন্দের ভিডিওটি খুঁজুন..." 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)} 
                    className="w-full pl-12 pr-4 py-4 bg-[#111111] border border-[rgba(212,175,55,0.15)] hover:border-[#D4AF37]/40 focus:border-[#D4AF37]/80 rounded-full focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/30 font-bengali text-sm text-white placeholder-[#B8B8B8]/40 transition-all shadow-inner text-center" 
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#B8B8B8]/40 group-focus-within:text-[#D4AF37] transition-colors" />
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
                      <Search className="h-10 w-10 text-[#D4AF37]/50" />
                      <div className="opacity-80 font-bengali text-[#B8B8B8] text-sm font-bold">দুঃখিত, কোনো ভিডিও পাওয়া যায়নি!</div>
                    </div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Load More Button */}
              {!isLoading && filteredMedia.length > visibleCount && (
                <div className="flex justify-center mb-16">
                  <button 
                    onClick={loadMore}
                    className="px-10 py-3.5 bg-[rgba(212,175,55,0.05)] hover:bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.15)] hover:border-[#D4AF37] text-white font-bengali font-bold text-sm rounded-full transition-all shadow-xl hover:scale-102 active:scale-95"
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
                <a href={ADSTERRA_SMARTLINK} target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-[#D4AF37] hover:bg-[#F4D03F] text-black font-extrabold rounded-2xl shadow-xl shadow-[#D4AF37]/20 hover:scale-102 transition-all font-bengali">লিংক দেখুন</a>
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
