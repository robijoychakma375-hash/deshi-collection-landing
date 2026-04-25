import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Video, Sparkles, X, ChevronUp, Share2, Check } from "lucide-react";

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
    caption: "ইউএনওর আলোচিত ভিডিও—শেষ পর্যন্ত যা জানা গেল",
    image: "https://i.postimg.cc/QNwWZnxp/photo-2026-03-18-17-40-02(1).jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "new",
    status: "Trending",
    timeLabel: "১ ঘণ্টা আগে"
  },
  {
    id: "2",
    caption: "প্রবাসী বউকে নিয়ে চাঞ্চল্যকর ঘটনা, ভিডিওটি ভাইরাল",
    image: "https://i.postimg.cc/HnD7GBQr/photo-2026-04-21-11-57-03.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "popular",
    status: "Hot"
  },
  {
    id: "3",
    caption: "প্রতারণা করতে গিয়ে ধরা—পুরো ঘটনাটি দেখুন",
    image: "https://i.postimg.cc/0yWM58pn/photo-2026-04-21-13-08-37.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "special"
  },
  {
    id: "4",
    caption: "শিক্ষা প্রতিষ্ঠানের আলোচিত ঘটনা, সোশ্যাল মিডিয়ায় ঝড়",
    image: "https://i.postimg.cc/BZTjL5TP/photo-2026-04-21-13-13-58.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "new",
    status: "নতুন",
    timeLabel: "আজ আপডেট"
  },
  {
    id: "5",
    caption: "আজকের সবচেয়ে আলোচিত ভিডিও আপডেট",
    image: "https://i.postimg.cc/RFr0qqN5/photo-2026-04-21-11-40-34.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "popular",
    status: "Popular"
  },
  {
    id: "6",
    caption: "ঘটনার আসল কারণ জানতে ভিডিওটি দেখুন",
    image: "https://i.postimg.cc/Kvc816vy/photo-2026-04-21-11-38-59.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "special",
    status: "Trending"
  },
  {
    id: "7",
    caption: "সবার সামনে ধরা পড়লো সত্য ঘটনা",
    image: "https://i.postimg.cc/vBdQbjSv/photo-2026-04-21-13-17-10.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "new",
    timeLabel: "নতুন আপলোড"
  },
  {
    id: "8",
    caption: "যে ভিডিও নিয়ে চারদিকে আলোচনা",
    image: "https://i.postimg.cc/tRkXGBdf/photo-2026-04-21-10-29-57.jpg",
    link: "https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32",
    category: "popular",
    status: "Hot"
  },
  {
    id: "9",
    caption: "সোশ্যাল মিডিয়ায় তোলপাড় করা নতুন ভিডিও",
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
  </>
);

const VideoCard = ({ item, index }: { item: MediaItem; index: number; key?: any }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-orange-500 text-white';
      case 'Trending': return 'bg-blue-500 text-white';
      case 'Popular': return 'bg-teal-500 text-white';
      case 'নতুন': return 'bg-slate-800 text-white';
      default: return 'bg-teal-600 text-white';
    }
  };

  return (
    <motion.a
      id={`video-card-${item.id}`}
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      whileTap={{ scale: 0.98 }}
      className="video-card group block"
    >
      <div className="relative aspect-video">
        <img
          src={item.image}
          alt={item.caption}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://picsum.photos/seed/fallback/800/450";
          }}
        />
        <div className="video-badge">ভিডিও</div>
        
        {item.status && (
          <div className={`absolute top-3 right-3 z-10 font-bengali text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-md backdrop-blur-sm ${getStatusStyle(item.status)}`}>
            {item.status}
          </div>
        )}

        {item.timeLabel && (
          <div className="absolute bottom-3 left-3 z-10 font-bengali text-[8px] md:text-[9px] font-bold px-2 py-0.5 bg-white/90 text-teal-700 rounded-md shadow-sm backdrop-blur-sm border border-teal-100">
            {item.timeLabel}
          </div>
        )}
      </div>

      <div className="p-3 md:p-5">
        <h3 className="font-bengali text-xs md:text-base lg:text-lg font-bold leading-tight line-clamp-2 text-slate-800 transition-colors group-hover:text-teal-600">
          {item.caption}
        </h3>
        
        <div className="mt-2 md:mt-4 flex items-center justify-between">
          <span className="text-[8px] md:text-[11px] font-bold text-teal-600/80 bg-teal-50 px-2 md:px-3 py-0.5 md:py-1 rounded-lg uppercase tracking-wider font-bengali">
            {item.category === 'new' ? 'নতুন' : item.category === 'popular' ? 'জনপ্রিয়' : 'বিশেষ'}
          </span>
          <span className="flex items-center gap-1 text-[10px] md:text-[13px] font-bold text-orange-500 font-bengali">
            আরও দেখুন
            <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
          </span>
        </div>
      </div>
    </motion.a>
  );
};

const SkeletonCard = () => (
  <div className="video-card h-[180px] md:h-[300px] animate-pulse">
    <div className="h-24 md:h-44 bg-slate-100" />
    <div className="p-3 md:p-6 space-y-3">
      <div className="h-3 w-3/4 bg-slate-50 rounded" />
      <div className="flex justify-between">
        <div className="h-3 w-1/4 bg-teal-50 rounded" />
        <div className="h-3 w-1/4 bg-orange-50 rounded" />
      </div>
    </div>
  </div>
);

export default function App() {
  const [activeCategory, setActiveCategory] = useState<"all" | "new" | "popular" | "special">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isShareCopied, setIsShareCopied] = useState(false);

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

  const handleShare = async () => {
    const shareData = {
      title: "দেশি কালেকশন",
      text: "নতুন ভিডিও দেখতে নিচের ভিডিওতে ক্লিক করুন",
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
    <div className="relative min-h-screen selection:bg-teal-100 selection:text-teal-700">
      <BubbleBackground />
      
      {/* Header section */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-4 md:px-6 py-2.5 md:py-5 transition-all duration-300 shadow-sm">
        <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <img 
                src="https://i.postimg.cc/cCLGJN7X/photo-2026-04-21-13-17-44.jpg" 
                alt="দেশি কালেকশন logo" 
                className="h-9 w-9 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-xl object-cover shadow-sm border border-slate-100"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <h1 className="logo-text text-xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
                দেশি কালেকশন
              </h1>
              <p className="font-bengali text-[10px] md:text-sm font-bold text-teal-600 mt-0.5 uppercase tracking-wide">
                প্রতিদিন নতুন ভিডিও আপডেট
              </p>
            </div>
            <p className="font-bengali text-[10px] md:text-sm font-semibold text-slate-500">
              নতুন ভিডিও দেখতে নিচের ভিডিওতে ক্লিক করুন
            </p>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-3 md:px-6 py-5 md:py-10">
        {/* News Ticker */}
        <div className="ticker-container">
          <div className="ticker-label">নোটিশ</div>
          <div className="ticker-content">
            <div className="ticker-text">
              📢 ভিডিও দেখতে চাইলে বিজ্ঞাপন আসতে পারে, তবে ধৈর্য ধরলে অবশ্যই ভিডিও দেখতে পারবেন
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-8 mb-8 md:mb-12">
          {/* Category Filter */}
          <div className="sticky top-[61px] lg:relative lg:top-0 z-40 w-screen lg:w-auto py-3 lg:py-0 bg-white/95 lg:bg-transparent backdrop-blur-lg lg:backdrop-blur-none border-b lg:border-none border-slate-200/50 flex flex-wrap justify-center gap-2 -mx-3 px-3 shadow-sm lg:shadow-none mb-2 lg:mb-0">
            {[
              { id: "all", label: "সব ভিডিও" },
              { id: "new", label: "নতুন" },
              { id: "popular", label: "জনপ্রিয়" },
              { id: "বিশেষ", label: "বিশেষ" }
            ].map((cat) => (
              <button
                id={`filter-${cat.id}`}
                key={cat.id}
                onClick={() => setActiveCategory(cat.id === "বিশেষ" ? "special" : cat.id as any)}
                className={`category-btn whitespace-nowrap ${
                  (activeCategory === cat.id || (activeCategory === "special" && cat.id === "বিশেষ")) ? "category-btn-active" : "category-btn-inactive"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="flex flex-col gap-1.5 w-full max-w-xs md:max-w-sm">
            <p className="font-bengali text-[10px] md:text-xs text-slate-400 font-medium px-1 text-center lg:text-left">
              যে ভিডিও খুঁজছেন, search box-এ লিখে দেখুন
            </p>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ভিডিও খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 md:py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-bengali text-xs md:text-sm text-slate-700"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 md:h-4 md:w-4 text-slate-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Video Grid - Optimized for 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            ) : filteredMedia.length > 0 ? (
              filteredMedia.map((item, index) => (
                <VideoCard key={item.id} item={item} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full py-16 md:py-24 flex flex-col items-center text-center px-4"
              >
                <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  <Search className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="font-bengali text-xl md:text-2xl font-bold text-slate-800">
                  কোনো ভিডিও পাওয়া যায়নি
                </h3>
                <p className="font-bengali text-slate-500 text-sm md:text-base mt-3 max-w-sm leading-relaxed">
                  অনুগ্রহ করে পরে আবার চেষ্টা করুন বা অন্য নাম লিখে খুঁজুন। আমাদের সংগ্রহে থাকা অন্য ভিডিওগুলো দেখতে পারেন।
                </p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="mt-8 px-6 py-2.5 bg-teal-500 text-white font-bengali text-sm font-bold rounded-xl shadow-lg shadow-teal-100 hover:bg-teal-600 transition-all"
                >
                  সব ভিডিও দেখুন
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Upcoming Videos Section */}
        <div className="mt-16 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-100/50 rounded-[2rem] shadow-sm relative overflow-hidden group mb-8"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 blur-sm group-hover:opacity-20 transition-opacity">
              <span className="text-6xl md:text-8xl">🎬</span>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
              <div className="h-14 w-14 md:h-16 md:w-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-blue-100">
                🔥
              </div>
              <div className="space-y-2">
                <h3 className="font-bengali text-xl md:text-2xl font-bold text-slate-800 flex items-center justify-center md:justify-start gap-2">
                  নতুন ভিডিও আসছে
                </h3>
                <p className="font-bengali text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
                  আরও নতুন ভিডিও খুব শিগগিরই আপলোড করা হবে। আপডেট পেতে আমাদের <span className="text-blue-600 font-bold">Telegram Channel</span>-এ Join করুন।
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                caption: "শিগগিরই আসছে নতুন আলোচিত ভিডিও",
                image: "https://i.postimg.cc/vmCZ33rt/photo-2025-05-31-10-34-32.jpg"
              },
              {
                caption: "নতুন চাঞ্চল্যকর ভিডিও আপডেট আসছে",
                image: "https://i.postimg.cc/d0gV442X/photo-2025-07-19-15-21-23-(2).jpg"
              },
              {
                caption: "আরও একটি বিশেষ ভিডিও খুব শিগগিরই",
                image: "https://i.postimg.cc/vHGHq1nF/photo-2025-07-19-15-21-23.jpg"
              },
              {
                caption: "নতুন ভাইরাল আপডেট দেখতে অপেক্ষা করুন",
                image: "https://i.postimg.cc/q76khyPB/photo-2026-04-12-06-42-22.jpg"
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
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all h-full"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-2 right-2 z-20">
                    <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] md:text-xs font-bold font-bengali rounded-lg shadow-sm">
                      আসছে
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-3 bg-white">
                  <h4 className="font-bengali text-[11px] md:text-sm font-bold text-slate-700 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </h4>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Most Watched Section */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="h-10 w-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl shadow-sm">
              🔥
            </div>
            <h2 className="font-bengali text-xl md:text-2xl font-bold text-slate-800">
              জনপ্রিয় ভিডিও
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              {
                caption: "গত সপ্তাহের সবচেয়ে পপুলার ভিডিও",
                image: "https://i.postimg.cc/q76khyPB/photo-2026-04-12-06-42-22.jpg",
                views: "১.২ লক্ষ"
              },
              {
                caption: "সবচেয়ে বেশিবার দেখা ভিডিও আপডেট",
                image: "https://i.postimg.cc/tRkXGBdf/photo-2026-04-21-10-29-57.jpg",
                views: "৯৫ হাজার"
              },
              {
                caption: "ভাইরাল হওয়া স্পেশাল ভিডিও কালেকশন",
                image: "https://i.postimg.cc/cCLGJN7X/photo-2026-04-21-13-17-44.jpg",
                views: "৮০ হাজার"
              },
              {
                caption: "জনপ্রিয় ভিডিওর সেরা আপডেটগুলি দেখুন",
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
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-2 left-2 z-20">
                    <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[9px] md:text-xs font-semibold rounded-md flex items-center gap-1">
                      👁️ {item.views}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-3 bg-white flex-grow">
                  <h4 className="font-bengali text-[10px] md:text-sm font-bold text-slate-700 line-clamp-2">
                    {item.caption}
                  </h4>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Telegram Join Bottom Banner */}
        <motion.a
          id="telegram-bottom-join"
          href="https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          className="mt-16 block w-full p-6 md:p-10 bg-white border border-slate-200 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden group"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 md:h-16 md:w-16 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl md:text-3xl text-blue-600">
                ✈️
              </div>
              <div className="space-y-1">
                <h3 className="font-bengali text-lg md:text-2xl font-bold text-slate-800">
                  নতুন নতুন ভিডিও দেখতে আমাদের Telegram Channel-এ Join করুন
                </h3>
                <p className="font-bengali text-xs md:text-sm text-slate-500 font-medium">প্রতিদিন লেটেস্ট ভিডিওর আপডেট পান সবার আগে</p>
              </div>
            </div>
            <div className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bengali text-sm md:text-base font-bold rounded-2xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
              Join Now
            </div>
          </div>
        </motion.a>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 text-center space-y-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-bengali text-[10px] md:text-[13px] font-bold text-slate-500">
            <a href="#" className="hover:text-teal-600 transition-colors">হোম</a>
            <a href="https://liverdopost.com/dc4eew31?key=70c633485e4743886ef16f61d8b5fc32" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors">টেলিগ্রাম</a>
            <a href="#" className="hover:text-teal-600 transition-colors">ডিসক্লেইমার</a>
            <a href="#" className="hover:text-teal-600 transition-colors">যোগাযোগ / রিপোর্ট</a>
          </div>
          
          <div className="space-y-3">
            <p className="font-bengali text-sm md:text-base font-bold text-slate-700">
              © দেশি কালেকশন
            </p>
            <p className="font-bengali text-[10px] md:text-xs text-slate-400 font-medium">
              ভিডিও দেখতে বিজ্ঞাপন আসতে পারে
            </p>
            <p className="font-sans text-[8px] md:text-[10px] text-slate-300 uppercase tracking-widest pt-2">
              All Rights Reserved 2026
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons Container */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3">
        {/* Share Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          onClick={handleShare}
          className="h-10 w-10 md:h-12 md:w-12 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-teal-600 hover:text-white hover:bg-teal-500 transition-all group relative"
          title="শেয়ার করুন"
        >
          {isShareCopied ? (
            <Check className="h-5 w-5 md:h-6 md:w-6" />
          ) : (
            <Share2 className="h-5 w-5 md:h-6 md:w-6 group-hover:rotate-12 transition-transform" />
          )}
          {isShareCopied && (
            <div className="absolute -top-10 right-0 px-3 py-1 bg-slate-800 text-white text-[10px] rounded-lg whitespace-nowrap">
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
              className="h-10 w-10 md:h-12 md:w-12 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-teal-600 hover:text-white hover:bg-teal-500 transition-all group"
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
