import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUp,
  ArrowLeft,
  Heart,
  Play,
  ChevronDown,
  Film,
  ExternalLink,
} from 'lucide-react';
import shot1 from '../assets/shot1.png';
import shot2_1 from '../assets/shot2-1.png';
import shot2_2 from '../assets/shot2-2.png';
import shot3 from '../assets/shot3.png';
import shot4 from '../assets/shot4.png';
import shot5 from '../assets/shot5.png';
import shot6 from '../assets/shot6.png';
import shot7 from '../assets/shot7.png';
import shot8 from '../assets/shot8.png';

/* ─── 分镜数据 ─── */

interface ShotItem {
  id: string;
  label: string;
  image: string;
  description: string;
}

const shots: ShotItem[] = [
  {
    id: 'shot1',
    label: 'Shot 1',
    image: shot1,
    description: '晨曦微光中，红旗 HS6 PHEV 从远处驶来，车身线条在逆光中勾勒出优雅轮廓，开启品牌叙事篇章',
  },
  {
    id: 'shot2-1',
    label: 'Shot 2-1',
    image: shot2_1,
    description: '城市天际线下，红旗 HS6 PHEV 穿梭于现代都市建筑之间，展现都市先锋气质',
  },
  {
    id: 'shot2-2',
    label: 'Shot 2-2',
    image: shot2_2,
    description: '夜幕降临，城市霓虹映照车身，红旗 HS6 PHEV 在光影交错中尽显豪华质感',
  },
  {
    id: 'shot3',
    label: 'Shot 3',
    image: shot3,
    description: '红旗 HS6 PHEV 行驶于蜿蜒山路，穿梭于自然山水之间，展现从容驾驭的全路况实力',
  },
  {
    id: 'shot4',
    label: 'Shot 4',
    image: shot4,
    description: '红旗 HS6 PHEV 停驻于开阔原野，与壮美自然融为一体，诠释东方豪华与自然共生之美',
  },
  {
    id: 'shot5',
    label: 'Shot 5',
    image: shot5,
    description: '特写镜头聚焦前脸格栅与 LED 大灯组，红旗家族式设计语言在光影中绽放科技美学',
  },
  {
    id: 'shot6',
    label: 'Shot 6',
    image: shot6,
    description: '内饰全景，宽适座舱以精致用料和科技配置，打造沉浸式豪华驾乘空间',
  },
  {
    id: 'shot7',
    label: 'Shot 7',
    image: shot7,
    description: '红旗 HS6 PHEV 高速飞驰，混动系统澎湃动力倾泻而出，诠释绿色出行的高性能哲学',
  },
  {
    id: 'shot8',
    label: 'Shot 8',
    image: shot8,
    description: '暮色中红旗 HS6 PHEV 驶向远方，定格品牌精神——让豪华出行触手可及',
  },
];

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

/* ─── 全屏预览模态框 ─── */

function Lightbox({
  shot,
  onClose,
  onPrev,
  onNext,
}: {
  shot: ShotItem;
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
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all z-10"
      >
        <span className="text-xl font-light">&times;</span>
      </button>

      {/* 上一张 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all z-10"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* 下一张 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all z-10 rotate-180"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* 图片 */}
      <div
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={shot.image}
          alt={shot.label}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
        />
        <div className="mt-4 text-center">
          <p className="text-white/90 font-serif text-lg">{shot.label}</p>
          <p className="text-white/50 text-sm font-light mt-1">
            {shot.description}
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
            href="#storyboard"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById('storyboard')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm text-stone-500 hover:text-amber-700 transition-colors duration-200 font-light"
          >
            分镜板
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── 分镜卡片 ─── */

function ShotCard({
  shot,
  index,
  onClick,
}: {
  shot: ShotItem;
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
        {/* 镜号标签 */}
        <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-md">
          <span className="text-white/90 text-xs font-medium tracking-wide">
            {shot.label}
          </span>
        </div>

        {/* 播放按钮提示 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
            <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
          </div>
        </div>

        {/* 图片 */}
        <img
          src={shot.image}
          alt={shot.label}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* 底部渐变遮罩 */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <p className="text-white/70 text-xs font-light">{shot.description}</p>
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

/* ─── 分镜板页面 ─── */

function Storyboard() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex > 0 ? lightboxIndex - 1 : shots.length - 1
      );
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex < shots.length - 1 ? lightboxIndex + 1 : 0
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-800">
      <Navbar />

      {/* Hero 区域 */}
      <section className="relative pt-28 pb-16 px-6 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 overflow-hidden">
        {/* 背景装饰 */}
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
              AIGC 视频制作
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4">
            红旗 HS6 PHEV 宣传片
          </h1>
          <p className="text-stone-400 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
            72 小时 AI 汽车内容极限挑战赛参赛作品 · 分镜板展示
          </p>

          {/* 技术标签 */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              'AI 视频生成',
              'ComfyUI',
              'Stable Diffusion',
              'Seedance 2.0',
              'ControlNet',
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 text-white/50 text-xs rounded-full border border-white/10 font-light"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 观看视频按钮 */}
          <div className="mt-8">
            <a
              href="https://easylink.cc/b48088"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-medium transition-colors duration-200 shadow-lg shadow-amber-600/20"
            >
              <Play className="w-4 h-4" fill="white" />
              观看视频
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>

          {/* 向下滚动提示 */}
          <div className="mt-12">
            <a
              href="#storyboard"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('storyboard')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex flex-col items-center text-white/30 hover:text-white/50 transition-colors"
            >
              <span className="text-xs font-light mb-2">查看分镜板</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* 项目概述 */}
      <section className="py-12 px-6 bg-gradient-to-b from-stone-50/50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-stone-100">
              <div className="text-2xl font-serif font-semibold text-amber-600 mb-1">
                9
              </div>
              <div className="text-stone-500 text-sm font-light">分镜镜头</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-stone-100">
              <div className="text-2xl font-serif font-semibold text-amber-600 mb-1">
                72h
              </div>
              <div className="text-stone-500 text-sm font-light">
                极限挑战赛时长
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-stone-100">
              <div className="text-2xl font-serif font-semibold text-amber-600 mb-1">
                AIGC
              </div>
              <div className="text-stone-500 text-sm font-light">
                全流程 AI 驱动
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 分镜板展示 */}
      <section id="storyboard" className="py-12 sm:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-50 to-rose-50 flex items-center justify-center">
              <Film className="w-4 h-4 text-amber-600" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-stone-800">
              分镜板
            </h2>
            <div className="flex-1 h-px bg-stone-100" />
            <span className="text-xs text-stone-400 font-light">
              点击查看大图
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shots.map((shot, index) => (
              <ShotCard
                key={shot.id}
                shot={shot}
                index={index}
                onClick={() => setLightboxIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 完整分镜板大图 */}
      <section className="py-12 sm:py-16 px-6 bg-stone-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-50 to-emerald-50 flex items-center justify-center">
              <Play className="w-4 h-4 text-amber-600" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-stone-800">
              全景分镜流
            </h2>
            <div className="flex-1 h-px bg-stone-100" />
          </div>

          <div className="space-y-4">
            {shots.map((shot) => (
              <div
                key={shot.id}
                className="bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm"
              >
                <div className="flex items-center gap-3 px-5 py-3 bg-stone-50 border-b border-stone-100">
                  <span className="px-2.5 py-0.5 bg-stone-800 text-white text-xs rounded-md font-medium">
                    {shot.label}
                  </span>
                  <span className="text-stone-500 text-xs font-light">
                    {shot.description}
                  </span>
                </div>
                <div className="p-4">
                  <img
                    src={shot.image}
                    alt={shot.label}
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
          shot={shots[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}

export default Storyboard;
