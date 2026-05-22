import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LucideIcon,
  ArrowUp,
  Heart,
  ExternalLink,
  ArrowRight,
  Search,
  BookOpen,
  PenTool,
  FileText,
  Zap,
  Video,
  Film,
  Palette,
  Play,
} from 'lucide-react';
import storyboardImg from '../assets/character-design.png';
import shot1 from '../assets/Shot1.png';
import shot2_1 from '../assets/Shot2-1.png';
import shot2_2 from '../assets/Shot2-2.png';
import shot3 from '../assets/Shot3.png';
import shot4 from '../assets/Shot4.png';
import shot5 from '../assets/Shot5.png';
import shot6 from '../assets/Shot6.png';
import shot7 from '../assets/Shot7.png';
import shot8 from '../assets/Shot8.png';

/* ─── 数据定义 ─── */

interface WorkItem {
  title: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
  icon: LucideIcon;
  url?: string;
}

interface VideoWorkItem {
  title: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
  icon: LucideIcon;
  url?: string;
  videoUrl?: string;
}

const academicWorks: WorkItem[] = [
  {
    title: '《消失的110元》',
    role: '非虚构叙事',
    period: '2025.01',
    url: 'https://www.image2url.com/r2/default/files/1777546079263-746010fe-a62d-47ce-b4e1-8e679e2bdcff.docx',
    description:
      '以一盒达美乐披萨订单中凭空消失的110元为线索，展开调查性非虚构叙事写作，揭露平台经济链条中骑手、店员与消费者三方被困的系统困境。',
    highlights: [
      '完整追踪骑手、店员、品牌方与执法部门多方线索',
      '通过监控录像、转账记录等证据还原事件真相',
      '以文学化叙事手法呈现底层劳动者的生存困境',
    ],
    tags: ['非虚构写作', '调查报道', '平台经济', '社会叙事'],
    icon: Search,
  },
  {
    title: '《无人机影像对受众认知和情感反应的影响》',
    role: '学术研究',
    period: '2024.09 — 2025.03',
    url: 'https://www.image2url.com/r2/default/files/1777545688087-0984c7a4-f874-489e-a394-a3ba7f1d43f2.docx',
    description:
      '以叙事运输理论和隐喻理论为框架，采用问卷调查（260份有效样本）与焦点小组访谈法（24人），系统研究无人机影像对受众视觉感知、情感反应与文化隐喻的影响。',
    highlights: [
      '设计并实施 46 题问卷，SPSS 数据分析 KMO 值 0.847，Cronbach α 系数 0.891',
      '完成 4 组焦点小组访谈，提出"无奈同情""羞愧同情""原始恐惧同情"三种情感范式',
      '提出无人机作为"具身智能体"的媒介理论创新',
    ],
    tags: ['学术研究', '问卷调查', '焦点小组', '传播学理论'],
    icon: BookOpen,
  },
  {
    title: '《"中立"封锁与"世界"突破》',
    role: '本科毕业论文',
    period: '2024.04',
    url: 'https://www.image2url.com/r2/default/files/1777546114372-af71b198-7478-41ab-9f5f-02a600cd1d34.docx',
    description:
      '研究抗战时期澳门本土报刊与副刊"新文学"如何运用世界符号和世界修辞，突破澳葡政府"中立"政策封锁，助力中华民族抗日救亡宣传运动。',
    highlights: [
      '系统梳理《镜海丛报》《华侨报》《市民日报》等澳门本土报刊史料',
      '提出"世界符号"（空符号、视觉符号、意象符号）与"世界修辞"分析框架',
      '暨南大学汉语言文学专业本科毕业论文，获评优秀',
    ],
    tags: ['文学研究', '新闻史', '抗战时期', '澳门报刊'],
    icon: PenTool,
  },
  {
    title: '《冷暖人生：夹缝中的空调安装师傅》',
    role: '深度报道',
    period: '2024.06 — 2024.10',
    url: 'https://www.image2url.com/r2/default/files/1777545975399-b492c864-d259-42c2-92c0-e60f3ffadbde.docx',
    description:
      '深度报道空调安装工人在高温、高空与高空坠物"三高风险"下的生存困境，通过多角度采访揭示底层劳动者在平台规则与安全隐患间的夹缝求生。',
    highlights: [
      '采访多位来自不同地区的从业空调安装工人',
      '引用 WHO 数据与国家高处作业标准进行数据支撑',
      '结合抖音亿级播放量"第一视角"视频现象，分析公共关注与社会议题',
    ],
    tags: ['深度报道', '调查采访', '劳动者权益', '数据支撑'],
    icon: FileText,
  },
  {
    title: '《在广州，新能源车主已经摆脱充电焦虑了吗？》',
    role: '专题报道',
    period: '2025.06',
    url: 'https://ne-w.my.canvasite.cn/dagrokcabkg',
    description:
      '专题报道聚焦广州新能源车主的充电焦虑现状，通过实地调研与数据分析，探讨充电基础设施建设与用户实际体验之间的差距。',
    highlights: [
      '实地调研广州多个充电站点的使用情况与排队时长',
      '分析充电桩覆盖率、充电速度与用户满意度数据',
      '提出改善充电体验的建设性建议与未来展望',
    ],
    tags: ['专题报道', '数据调研', '新能源', '用户体验'],
    icon: Zap,
  },
];

const videoWorks: VideoWorkItem[] = [
  {
    title: '红旗 HS6 PHEV 宣传片',
    role: 'AIGC 视频制作',
    period: '2026.05',
    description:
      '72 小时 AI 汽车内容极限挑战赛参赛作品，全流程使用 AI 工具完成汽车宣传片的制作，从分镜设计到视频生成的完整 AIGC 创作流程。',
    highlights: [
      'Prompt + 汽车行业 RAG → Image2 生成主镜图、分镜图和分镜板',
      'ComfyUI / Stable Diffusion 调用 ControlNet 微调画面细节',
      '即梦、可灵 Seedance 2.0 生成视频，TapNow 画布工作流进行版本迭代',
    ],
    tags: ['AIGC', '汽车广告', 'AI 视频生成', 'ComfyUI', 'Seedance'],
    icon: Video,
    url: '/storyboard',
    videoUrl: 'https://easylink.cc/b48088',
  },
  {
    title: 'AI 短片《AGATH》',
    role: 'AI 影视创作',
    period: '2026.05',
    url: '/agath',
    description:
      '全流程 AI 驱动的短片创作，从剧本构思到分镜设计、画面生成和视频合成的完整 AI 影视制作实践，探索 AI 技术在叙事影像中的应用边界。',
    highlights: [
      '完整的 AI 短片创作流程：剧本 → 分镜 → 画面 → 视频',
      '使用 GPT Image 2、Flux Max2 等工具进行画面生成',
      '结合 Nano Banana Pro、Suno 等工具完成音视频制作',
    ],
    tags: ['AI 短片', '叙事影像', 'GPT Image', '多工具协同'],
    icon: Film,
  },
];

interface DesignWorkItem {
  title: string;
  description: string;
  shots: { label: string; image: string }[];
  tags: string[];
  linkTo?: string;
}

const designWorks: DesignWorkItem[] = [
  {
    title: '红旗 HS6 PHEV 宣传片分镜板',
    description: '72 小时 AI 汽车内容极限挑战赛参赛作品分镜板，全流程使用 AI 工具完成分镜设计，从开场到品牌展示的完整镜头序列。',
    shots: [
      { label: 'Shot 1', image: shot1 },
      { label: 'Shot 2-1', image: shot2_1 },
      { label: 'Shot 2-2', image: shot2_2 },
      { label: 'Shot 3', image: shot3 },
      { label: 'Shot 4', image: shot4 },
      { label: 'Shot 5', image: shot5 },
      { label: 'Shot 6', image: shot6 },
      { label: 'Shot 7', image: shot7 },
      { label: 'Shot 8', image: shot8 },
    ],
    tags: ['分镜板', '红旗 HS6 PHEV', 'AIGC', '汽车广告'],
    linkTo: '/storyboard',
  },
  {
    title: '《AGATH》分镜板',
    description: 'AI 短片《AGATH》的分镜板设计，展示了 Shot 11 场景的完整分镜序列，包含车内场景、角色特写、后视镜视角等多个镜头设计。',
    shots: [],
    image: storyboardImg,
    tags: ['分镜板', 'AI 短片', '镜头设计'],
  } as DesignWorkItem & { image: string },
];

/* ─── 通用 Hooks ─── */

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

/* ─── 学术作品卡片 ─── */

function WorkCard({ work, index }: { work: WorkItem; index: number }) {
  const { ref, inView } = useInView(0.1);
  const IconComponent = work.icon;

  return (
    <div
      ref={ref}
      className={`group bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="h-1.5 bg-gradient-to-r from-amber-200 via-rose-200 to-violet-200" />

      <div className="p-6 sm:p-7">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-50 to-rose-50 flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-semibold text-stone-800 group-hover:text-amber-700 transition-colors duration-300 truncate">
                {work.title}
              </h3>
              {work.url && (
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-6 h-6 rounded-md bg-stone-100 hover:bg-amber-100 flex items-center justify-center transition-colors duration-200"
                  title="查看原文"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3 text-stone-400 hover:text-amber-600" />
                </a>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
              <span>{work.role}</span>
              <span>·</span>
              <span>{work.period}</span>
            </div>
          </div>
        </div>

        <p className="text-stone-500 text-sm leading-relaxed mb-4 font-light">
          {work.description}
        </p>

        <ul className="space-y-2 mb-5">
          {work.highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-stone-600 font-light"
            >
              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div className="flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-stone-50 text-stone-500 text-xs rounded-full border border-stone-100"
              >
                {tag}
              </span>
            ))}
          </div>
          {work.url && (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-stone-800 text-white rounded-lg text-xs font-medium hover:bg-amber-700 transition-colors duration-200"
            >
              查看原文
              <ArrowRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── 视频作品卡片 ─── */

function VideoWorkCard({ work, index }: { work: VideoWorkItem; index: number }) {
  const { ref, inView } = useInView(0.1);
  const IconComponent = work.icon;
  const navigate = useNavigate();
  const isInternalLink = work.url?.startsWith('/');

  const handleClick = () => {
    if (isInternalLink && work.url) {
      navigate(work.url);
    }
  };

  return (
    <div
      ref={ref}
      className={`group bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isInternalLink ? 'cursor-pointer' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
      onClick={handleClick}
    >
      <div className="h-1.5 bg-gradient-to-r from-violet-300 via-rose-300 to-amber-300" />

      {/* 视频预览区域 */}
      <div className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 aspect-video flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        <div className="text-center z-10">
          {work.videoUrl ? (
            <a
              href={work.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-block"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <Play className="w-7 h-7 text-white ml-1" fill="white" />
              </div>
            </a>
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
              <Play className="w-7 h-7 text-white ml-1" fill="white" />
            </div>
          )}
          <p className="text-white/70 text-sm font-light">{work.title}</p>
          {work.videoUrl && (
            <p className="text-amber-400/70 text-xs font-light mt-1">点击播放观看视频</p>
          )}
        </div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="p-6 sm:p-7">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-50 to-rose-50 flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-violet-600" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-lg font-semibold text-stone-800 group-hover:text-violet-700 transition-colors duration-300">
              {work.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
              <span>{work.role}</span>
              <span>·</span>
              <span>{work.period}</span>
            </div>
          </div>
        </div>

        <p className="text-stone-500 text-sm leading-relaxed mb-4 font-light">
          {work.description}
        </p>

        <ul className="space-y-2 mb-5">
          {work.highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-stone-600 font-light"
            >
              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400" />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div className="flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-violet-50 text-violet-600 text-xs rounded-full border border-violet-100"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {work.videoUrl && (
              <a
                href={work.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-stone-800 text-white rounded-lg text-xs font-medium hover:bg-violet-700 transition-colors duration-200"
              >
                观看视频
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {isInternalLink && (
              <span
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-white text-stone-700 rounded-lg text-xs font-medium border border-stone-200 hover:border-violet-300 hover:text-violet-700 transition-colors duration-200"
              >
                查看分镜板
                <ArrowRight className="w-3 h-3" />
              </span>
            )}
          </div>
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

  const navItems = [
    { label: '首页', to: '/' },
  ];

  const sectionNavItems = [
    { label: '学术作品', href: '#academic' },
    { label: '视频作品', href: '#video' },
    { label: '分镜板', href: '#design' },
  ];

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-stone-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-lg font-semibold text-stone-700 hover:text-amber-700 transition-colors"
        >
          刘智楚
        </Link>
        <div className="flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-stone-500 hover:text-amber-700 transition-colors duration-200 font-light"
            >
              {item.label}
            </Link>
          ))}
          {sectionNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleSectionClick(e, item.href)}
              className="text-sm text-stone-500 hover:text-amber-700 transition-colors duration-200 font-light"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ─── Footer ─── */

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

/* ─── 我的作品页面 ─── */

function Works() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-stone-800">
      <Navbar />

      {/* 页面标题区 */}
      <section className="pt-28 pb-8 px-6 bg-gradient-to-b from-stone-50/80 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-800 mb-3">
            我的作品
          </h1>
          <p className="text-stone-500 text-base sm:text-lg font-light max-w-lg mx-auto leading-relaxed">
            学术作品 · 视频创作 · 分镜设计，记录思考与创造
          </p>
          <div className="mt-5 mx-auto w-12 h-0.5 bg-amber-400/70 rounded-full" />
        </div>
      </section>

      {/* 学术作品 */}
      <section id="academic" className="py-12 sm:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-50 to-rose-50 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-amber-600" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-stone-800">学术作品</h2>
            <div className="flex-1 h-px bg-stone-100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicWorks.map((work, index) => (
              <WorkCard key={work.title} work={work} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 视频作品 */}
      <section id="video" className="py-12 sm:py-16 px-6 bg-gradient-to-b from-white to-stone-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-50 to-rose-50 flex items-center justify-center">
              <Video className="w-4 h-4 text-violet-600" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-stone-800">视频作品</h2>
            <div className="flex-1 h-px bg-stone-100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoWorks.map((work, index) => (
              <VideoWorkCard key={work.title} work={work} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 分镜板与设计 */}
      <section id="design" className="py-12 sm:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-50 to-emerald-50 flex items-center justify-center">
              <Palette className="w-4 h-4 text-amber-600" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-stone-800">分镜板与设计</h2>
            <div className="flex-1 h-px bg-stone-100" />
          </div>
          <div className="grid grid-cols-1 gap-8">
            {designWorks.map((work) => {
              const hasShots = work.shots && work.shots.length > 0;
              const singleImage = (work as DesignWorkItem & { image?: string }).image;

              return (
                <div
                  key={work.title}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
                >
                  <div className="h-1.5 bg-gradient-to-r from-amber-300 via-emerald-300 to-sky-300" />
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-50 to-emerald-50 flex items-center justify-center">
                          <Palette className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-semibold text-stone-800 group-hover:text-amber-700 transition-colors duration-300">
                            {work.title}
                          </h3>
                          <p className="text-stone-500 text-sm leading-relaxed mt-1 font-light">
                            {work.description}
                          </p>
                        </div>
                      </div>
                      {work.linkTo && (
                        <Link
                          to={work.linkTo}
                          className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-stone-800 text-white rounded-lg text-xs font-medium hover:bg-amber-700 transition-colors duration-200"
                        >
                          查看详情
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>

                    {hasShots ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {work.shots.map((shot) => (
                          <div
                            key={shot.label}
                            className="relative rounded-xl overflow-hidden bg-stone-900 aspect-video group/shot"
                          >
                            <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded text-white/90 text-[10px] font-medium">
                              {shot.label}
                            </div>
                            <img
                              src={shot.image}
                              alt={shot.label}
                              className="w-full h-full object-cover group-hover/shot:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    ) : singleImage ? (
                      <div className="rounded-xl overflow-hidden border border-stone-100 bg-stone-50">
                        <img
                          src={singleImage}
                          alt={work.title}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    ) : null}

                    <div className="flex flex-wrap gap-2 mt-5">
                      {work.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default Works;
