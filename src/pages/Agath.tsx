import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUp,
  ArrowLeft,
  Heart,
  Play,
  ChevronDown,
  Film,
  Bot,
  Rocket,
  Satellite,
  Clapperboard,
} from 'lucide-react';
import echo47Multiview from '../assets/echo47-multiview.png';
import echo47V2 from '../assets/echo47-v2.png';
import spaceship3view from '../assets/spaceship-3view.png';
import stationView1 from '../assets/station-view1.png';
import stationView2 from '../assets/station-view2.png';
import stationView3 from '../assets/station-view3.png';
import agathOpening1 from '../assets/agath-opening1.png';
import agathOpening2 from '../assets/agath-opening2.png';

/* ─── 数据定义 ─── */

interface GalleryItem {
  id: string;
  label: string;
  image: string;
  description: string;
}

interface GallerySection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: GalleryItem[];
}

const gallerySections: GallerySection[] = [
  {
    id: 'opening',
    title: '开场主镜',
    subtitle: '影片开场的关键画面，构建宏大太空叙事基调',
    icon: <Clapperboard className="w-4 h-4 text-amber-600" strokeWidth={1.5} />,
    items: [
      {
        id: 'opening1',
        label: 'Opening Shot 1',
        image: agathOpening1,
        description: '空间站悬浮于地球与月球之间，深空蓝调中透出冷冽光晕，开启 AGATH 的叙事篇章',
      },
      {
        id: 'opening2',
        label: 'Opening Shot 2',
        image: agathOpening2,
        description: '太空飞船驶向行星，光束穿透星尘，探索未知的壮阔意象',
      },
    ],
  },
  {
    id: 'echo47',
    title: '机器人 ECHO-47 设定',
    subtitle: '主角机器人 ECHO-47 的多视角概念设定图',
    icon: <Bot className="w-4 h-4 text-amber-600" strokeWidth={1.5} />,
    items: [
      {
        id: 'echo47-v1',
        label: 'ECHO-47 多视角设定',
        image: echo47Multiview,
        description: '正面、侧面、背面及头盔细节的五视角完整设定图，展现机械结构与人形轮廓的融合设计',
      },
      {
        id: 'echo47-v2',
        label: 'ECHO-47 设计迭代',
        image: echo47V2,
        description: 'ECHO-47 第二版概念设计，调整了关节结构与装甲细节，强化功能性与美学的统一',
      },
    ],
  },
  {
    id: 'spaceship',
    title: '飞船设定',
    subtitle: 'AGATH 世界观中的飞船载具设计',
    icon: <Rocket className="w-4 h-4 text-amber-600" strokeWidth={1.5} />,
    items: [
      {
        id: 'spaceship',
        label: '飞船四视图',
        image: spaceship3view,
        description: '飞船顶视、侧视、正视与后视四视图，展现流线型船体与推进系统的完整工业设计',
      },
    ],
  },
  {
    id: 'station',
    title: '空间站设定',
    subtitle: 'AGATH 故事核心场景——深空空间站的多角度概念设定',
    icon: <Satellite className="w-4 h-4 text-amber-600" strokeWidth={1.5} />,
    items: [
      {
        id: 'station-view1',
        label: '空间站设定 · 视图一',
        image: stationView1,
        description: '空间站正面、侧面与顶视图，展示主体结构与模块化舱段设计',
      },
      {
        id: 'station-view2',
        label: '空间站设定 · 视图二',
        image: stationView2,
        description: '空间站顶部视角、内部剖面、侧面与俯视细节，呈现功能分区与生活区域布局',
      },
      {
        id: 'station-view3',
        label: '空间站设定 · 视图三',
        image: stationView3,
        description: '空间站顶部、正面、底部与后视图，完整展示对接口与推进系统分布',
      },
    ],
  },
];

const videoUrl = 'https://easylink.cc/he4wfv';

/* ─── Hooks ─── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── 全屏预览 Lightbox ─── */

const allGalleryItems = gallerySections.flatMap((s) => s.items);

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all z-10"
      >
        <span className="text-xl font-light">&times;</span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all z-10"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all z-10 rotate-180"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.image}
          alt={item.label}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
        />
        <div className="mt-4 text-center">
          <p className="text-white/90 font-serif text-lg">{item.label}</p>
          <p className="text-white/50 text-sm font-light mt-1 max-w-lg">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── 回到顶部 ─── */

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 w-10 h-10 bg-white border border-stone-200 rounded-full flex items-center justify-center text-stone-500 shadow-sm hover:shadow-md hover:text-stone-700 transition-all duration-300 z-50"
      aria-label="回到顶部"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}

/* ─── 导航栏 ─── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-stone-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-lg font-semibold text-stone-700 hover:text-amber-700 transition-colors"
        >
          刘智楚
        </Link>
        <div className="flex items-center gap-5">
          <Link
            to="/works"
            className="text-sm text-stone-500 hover:text-amber-700 transition-colors duration-200 font-light"
          >
            我的作品
          </Link>
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById('gallery')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm text-stone-500 hover:text-amber-700 transition-colors duration-200 font-light"
          >
            概念设定
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── 图库卡片 ─── */

function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const { ref, inView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`group cursor-pointer ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } transition-all duration-600`}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={onClick}
    >
      <div className="relative bg-stone-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-md">
          <span className="text-white/90 text-xs font-medium tracking-wide">
            {item.label}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
            <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
          </div>
        </div>

        <img
          src={item.image}
          alt={item.label}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <p className="text-white/70 text-xs font-light">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── 底部 Footer ─── */

function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-stone-100">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400 text-xs font-light">
        <p className="flex items-center gap-1">
          用 <Heart className="w-3 h-3 text-rose-300" strokeWidth={2} /> 和热情构建
        </p>
        <p>&copy; {new Date().getFullYear()} 刘智楚 · 保持热爱，持续成长</p>
      </div>
    </footer>
  );
}

/* ─── AGATH 页面主体 ─── */

function Agath() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex > 0 ? lightboxIndex - 1 : allGalleryItems.length - 1
      );
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex < allGalleryItems.length - 1
          ? lightboxIndex + 1
          : 0
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-800">
      <Navbar />

      {/* Hero 区域 */}
      <section className="relative pt-28 pb-16 px-6 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.08)_0%,transparent_50%)]" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/10">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-white/70 text-xs font-light tracking-wide">
              AI 短片 · 概念设定集
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4">
            AGATH
          </h1>
          <p className="text-stone-400 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            全流程 AI 驱动的短片创作 · 概念设定与视觉设计展示
          </p>

          {/* 技术标签 */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              'AI 短片',
              'GPT Image 2',
              'Flux Max2',
              '概念设定',
              '角色设计',
              '场景设计',
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 text-white/50 text-xs rounded-full border border-white/10 font-light"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 向下滚动提示 */}
          <div className="mt-12">
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('gallery')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex flex-col items-center text-white/30 hover:text-white/50 transition-colors"
            >
              <span className="text-xs font-light mb-2">查看设定集</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* 项目概述 */}
      <section className="py-12 px-6 bg-gradient-to-b from-stone-50/50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-stone-100">
              <div className="text-2xl font-serif font-semibold text-amber-600 mb-1">
                ECHO-47
              </div>
              <div className="text-stone-500 text-sm font-light">主角机器人</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-stone-100">
              <div className="text-2xl font-serif font-semibold text-amber-600 mb-1">
                8
              </div>
              <div className="text-stone-500 text-sm font-light">概念设定图</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-stone-100">
              <div className="text-2xl font-serif font-semibold text-amber-600 mb-1">
                4
              </div>
              <div className="text-stone-500 text-sm font-light">设定类别</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-stone-100">
              <div className="text-2xl font-serif font-semibold text-amber-600 mb-1">
                AIGC
              </div>
              <div className="text-stone-500 text-sm font-light">全流程 AI 驱动</div>
            </div>
          </div>
        </div>
      </section>

      {/* 视频播放 */}
      <section className="py-12 sm:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-50 to-rose-50 flex items-center justify-center">
              <Play className="w-4 h-4 text-amber-600" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-stone-800">
              影片片段
            </h2>
            <div className="flex-1 h-px bg-stone-100" />
          </div>

          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative group rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={agathOpening1}
              alt="AGATH 片段预览"
              className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/25 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" fill="white" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-white/90 text-sm font-medium">AI 短片《AGATH》</span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white/90 text-xs rounded-full border border-white/20">
                点击观看
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* 概念设定图库 */}
      <section id="gallery" className="py-12 sm:py-16 px-6 bg-stone-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-50 to-emerald-50 flex items-center justify-center">
              <Clapperboard className="w-4 h-4 text-amber-600" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-stone-800">
              概念设定集
            </h2>
            <div className="flex-1 h-px bg-stone-100" />
            <span className="text-xs text-stone-400 font-light">
              点击查看大图
            </span>
          </div>

          {gallerySections.map((section) => (
            <div key={section.id} className="mb-14 last:mb-0">
              <div className="flex items-center gap-2 mb-2">
                {section.icon}
                <h3 className="font-serif text-lg font-semibold text-stone-700">
                  {section.title}
                </h3>
              </div>
              <p className="text-stone-400 text-sm font-light mb-6">
                {section.subtitle}
              </p>

              <div
                className={`grid gap-5 ${
                  section.items.length === 1
                    ? 'grid-cols-1 max-w-2xl'
                    : section.items.length === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {section.items.map((item, index) => {
                  const globalIndex = allGalleryItems.findIndex(
                    (g) => g.id === item.id
                  );
                  return (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      index={index}
                      onClick={() => setLightboxIndex(globalIndex)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 全景设定流 */}
      <section className="py-12 sm:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-50 to-emerald-50 flex items-center justify-center">
              <Film className="w-4 h-4 text-amber-600" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-stone-800">
              全景设定流
            </h2>
            <div className="flex-1 h-px bg-stone-100" />
          </div>

          <div className="space-y-4">
            {allGalleryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm"
              >
                <div className="flex items-center gap-3 px-5 py-3 bg-stone-50 border-b border-stone-100">
                  <span className="px-2.5 py-0.5 bg-stone-800 text-white text-xs rounded-md font-medium">
                    {item.label}
                  </span>
                  <span className="text-stone-500 text-xs font-light">
                    {item.description}
                  </span>
                </div>
                <div className="p-4">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          item={allGalleryItems[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

export default Agath;
