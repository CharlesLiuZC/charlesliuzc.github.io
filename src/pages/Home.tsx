import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LucideIcon,
  Mail,
  ExternalLink,
  ArrowUp,
  Heart,
  MapPin,
  BookOpen,
  ChevronDown,
  TrendingUp,
  Megaphone,
  Users,
  Library,
  BarChart3,
  Smartphone,
  Trophy,
  Bot,
  Phone,
  MessageCircle,
  Search,
  FileText,
  PenTool,
  Zap,
  Calendar,
  ArrowRight,
  Video,
  Film,
  Palette,
  Play,
} from 'lucide-react';
import avatarImg from '../assets/avatar.png';
import aboutAvatarImg from '../assets/about-avatar.jpg';
import storyboardImg from '../assets/character-design.png';
import hs6Thumbnail from '../assets/shot5.png';

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

interface ExperienceItem {
  title: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
  icon: LucideIcon;
}

interface VideoWorkItem {
  title: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
  icon: LucideIcon;
  thumbnail?: string;
  url?: string;
  storyboardUrl?: string;
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
    thumbnail: hs6Thumbnail,
    url: 'https://easylink.cc/b48088',
    storyboardUrl: '/storyboard',
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

const designWorks = [
  {
    title: '《AGATH》分镜板',
    description: 'AI 短片《AGATH》的分镜板设计，展示了 Shot 11 场景的完整分镜序列，包含车内场景、角色特写、后视镜视角等多个镜头设计。',
    image: storyboardImg,
    tags: ['分镜板', 'AI 短片', '镜头设计'],
  },
];

const experiences: ExperienceItem[] = [
  {
    title: '腾讯 PCG · AI 校园产品 "不搁"',
    role: '社区产品 Owner',
    period: '2026.04',
    description:
      '独立负责社区互动场域与创作者成长体系，从 0 到 1 搭建跨端 Agent 社区统一对话交互框架，设计四层激励漏斗，2 周冷启引入 30+ 校园创作者。',
    highlights: [
      '搭建跨端（QQ/微信/飞书）Agent 社区统一对话交互框架，设计"任务-积分-勋章-身份组"四层激励漏斗，上线 2 周社区周活渗透率达 65%',
      '通过 JTBD + KANO 模型，12 场 1v1 深度访谈 + 200 份定量调研定位核心痛点，输出需求优先级矩阵，推动 LangGraph 状态机落地',
      'PRD 覆盖监听层/编排层/控制面，MVP 上线后人日均创建日程 2.3 条，误报率 6.2%（低于行业基准 12%），次周留存 72%，NPS 达 65',
    ],
    tags: ['社区产品', '用户研究', '激励体系', 'AI Agent'],
    icon: Bot,
  },
  {
    title: '美团 Hackathon 大赛 AutoSolver',
    role: '社区策略 PM',
    period: '2026.05',
    description:
      '将算法赛题包装为"策略挑战赛"，搭建参赛者讨论区，通过用户动线设计与数据漏斗分析驱动社区互动深度。',
    highlights: [
      '设计排行榜 + 策略代码共享帖 + 周常 battle 机制，通过用户动线（浏览→fork→优化→提交→讨论）提升社区互动深度',
      '独立完成实验数据采集与漏斗分析，识别"策略复现成本高"为转化断点，推出基线代码一键运行功能，参与率提升 34%',
      '订单覆盖率 +6.2%，总成本 -11.5%，社区 UGC 策略帖超 40 篇，日均 PV 破千',
    ],
    tags: ['社区策略', '数据驱动', 'UGC', '漏斗分析'],
    icon: Trophy,
  },
  {
    title: '乐抖传媒',
    role: '产品运营（社区增长方向）',
    period: '2025.07 — 2025.12',
    description:
      '从 0 到 1 搭建创作者私域社区，通过数据驱动增长策略与商业化验证，实现用户规模与活跃度双增长。',
    highlights: [
      '基于微信群 + 知识星球构建创作者社群体系，设计签到/打卡/邀请裂变钩子，3 个月冷启积累 800+ 用户，MAU 达 65%',
      '用户分层发现"周发布 ≥ 3 次"用户留存是其他用户的 2.3 倍，推出"创作挑战周赛"，人均发布量 +45%，社群主动分享率 +22%',
      '联动设计/开发落地积分商城，测试虚拟商品变现，ROI 达 1:3.2，验证社区内付费心智可行性',
    ],
    tags: ['私域社区', '用户增长', '商业化', '用户分层'],
    icon: Megaphone,
  },
  {
    title: '开源视频生成模型 Open Sora',
    role: '社区运营 & 产品助理',
    period: '2024.09 — 至今',
    description:
      '独立管理 7000+ 成员开源社区，通过内容审核 SOP、激励机制与活动策划提升社区健康度。',
    highlights: [
      '管理 Discord、Huggingface 社区（7000+ members），制定内容审核 SOP 与月度主题挑战，设计"创作者月度榜单"和"徽章成就系统"激励 UGC',
      '通过用户反馈聚类沉淀需求池，推动开发侧输出"一键配置脚本"，高频问题工单量下降 40%，用户平均上手时间从 2.5h 降至 1h',
      '策划"AI 短片周"活动，参与人数环比 +60%，DAU 从 300 增至 500，日均消息量提升 67%，30 日留存从 35% 提升至 51%',
    ],
    tags: ['社区运营', 'UGC', '开源社区', '用户留存'],
    icon: Users,
  },
  {
    title: 'ICBC 工商银行 珠海拱北分行',
    role: '产品经理助理（社区方向）',
    period: '2024.09 — 2025.02',
    description:
      '负责用户调研与竞品分析，推动社区化理财问答板块功能规划，协调多部门完成需求上线。',
    highlights: [
      '设计并投放用户反馈问卷，完成调研数据分析，相关金融产品购入量增长 74%',
      '输出社区化理财问答板块竞品分析报告（覆盖蚂蚁财富、雪球、东方财富），提出"用户等级 + 打赏 + 问答悬赏"功能框架，被纳入下季度迭代规划',
      '协调合规、开发、运营三方，推动需求文档评审及功能上线，项目提前 3 天交付',
    ],
    tags: ['用户调研', '竞品分析', '跨部门协作', '需求管理'],
    icon: BarChart3,
  },
];

const skills = [
  { icon: Bot, label: 'AI 产品落地' },
  { icon: TrendingUp, label: '数据分析' },
  { icon: Smartphone, label: '用户增长' },
  { icon: Megaphone, label: '产品运营' },
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

/* ─── 通用组件 ─── */

function SectionTitle({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`text-center mb-16 transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-800 mb-3">
        {children}
      </h2>
      {subtitle && (
        <p className="text-stone-500 text-base sm:text-lg font-light max-w-md mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-5 mx-auto w-12 h-0.5 bg-amber-400/70 rounded-full" />
    </div>
  );
}

/* ─── Hero ─── */

function HeroSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-50/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-stone-100/30 rounded-full blur-3xl" />
      </div>

      <div
        className={`text-center px-6 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="mb-8 inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 shadow-lg shadow-amber-100/50 overflow-hidden">
          <img src={avatarImg} alt="刘智楚" className="w-full h-full object-cover" />
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-800 mb-5 tracking-tight">
          你好，我是
          <span className="text-amber-700"> 刘智楚</span>
        </h1>

        <p className="text-stone-500 text-lg sm:text-xl font-light max-w-lg mx-auto leading-relaxed mb-3">
          新闻传播研究者 · 非虚构写作者 · 产品人 · AIGC 创作者
        </p>
        <p className="text-stone-400 text-base font-light max-w-md mx-auto leading-relaxed mb-10">
          深度报道 · 学术研究 · 数据分析 · AI 产品 · 影视创作
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/works"
            className="inline-flex items-center gap-2 px-7 py-3 bg-stone-800 text-white rounded-full text-sm font-medium hover:bg-stone-700 transition-all duration-300 hover:shadow-lg hover:shadow-stone-300/50"
          >
            浏览作品
            <ChevronDown className="w-4 h-4" />
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 border border-stone-300 text-stone-600 rounded-full text-sm font-medium hover:border-stone-400 hover:bg-stone-50 transition-all duration-300"
          >
            联系我
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-stone-400" />
      </div>
    </section>
  );
}

/* ─── 关于我 ─── */

function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      className="py-24 sm:py-32 px-6 bg-gradient-to-b from-white to-stone-50/80"
    >
      <div className="max-w-4xl mx-auto">
        <SectionTitle subtitle="每一个项目背后，都是对用户需求的一份真诚回应">
          关于我
        </SectionTitle>

        <div
          ref={ref}
          className={`transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-sm border border-stone-100">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 overflow-hidden shadow-inner">
                  <img src={aboutAvatarImg} alt="刘智楚" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="font-serif text-2xl font-semibold text-stone-800 mb-1">
                  刘智楚
                </h3>
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-stone-400 text-sm mb-5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>暨南大学 · 新闻与传播（硕士在读）</span>
                </div>

                <div className="space-y-4 text-stone-600 leading-relaxed font-light">
                  <p>
                    我是暨南大学新闻与传播专业硕士研究生，本科就读于汉语言文学专业。
                    具备扎实的数据分析能力与用户研究基础，主修消费者行为学、数据分析与挖掘等课程，
                    同时拥有产品运营与用户增长的丰富实战经验。
                  </p>
                  <p>
                    在乐抖传媒实习期间，我独立负责产品引流与转化，通过 A/B 测试、转化漏斗分析等数据驱动方法，
                    实现了显著的用户增长与 GMV 提升。在工商银行的产品助理岗位上，
                    我深入参与了竞品分析与用户调研工作，为产品迭代提供决策依据。
                  </p>
                  <p>
                    此外，我对 AI
                    技术保持高度热情，熟练掌握 PyTorch、Ollama 进行 LLM 本地化部署，
                    使用 Coze、豆包搭建 AI-Agent 覆盖业务流程自动化场景，
                    并参与北大 OpenSora、Uniworld 等 CVPR 项目，具备 AI 产品落地所需的工程理解力。
                    在 AIGC 创作方面，我使用 Seedance、ComfyUI、GPT Image 等工具完成了多部 AI 短片与宣传片的制作。
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
                  {skills.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-stone-50 text-stone-600 rounded-full text-sm border border-stone-100"
                    >
                      <Icon className="w-4 h-4 text-amber-600" strokeWidth={1.5} />
                      {label}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm border border-amber-100">
                    <Bot className="w-4 h-4" strokeWidth={1.5} />
                    LLM 部署 & AI-Agent
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-700 rounded-full text-sm border border-violet-100">
                    <TrendingUp className="w-4 h-4" strokeWidth={1.5} />
                    Python / SQL 数据分析
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 rounded-full text-sm border border-rose-100">
                    <Film className="w-4 h-4" strokeWidth={1.5} />
                    AIGC 影视创作
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm border border-emerald-100">
                    <Trophy className="w-4 h-4" strokeWidth={1.5} />
                    足球职业运动员
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
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

function AcademicWorksSection() {
  return (
    <section id="works" className="py-24 sm:py-32 px-6 bg-stone-50/50">
      <div className="max-w-5xl mx-auto">
        <SectionTitle subtitle="深度报道、学术研究与调查写作，记录真实与思考">
          学术作品
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {academicWorks.map((work, index) => (
            <WorkCard key={work.title} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 视频作品 ─── */

function VideoWorkCard({ work, index }: { work: VideoWorkItem; index: number }) {
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
      {/* 视频作品顶部渐变条 */}
      <div className="h-1.5 bg-gradient-to-r from-violet-300 via-rose-300 to-amber-300" />

      {/* 视频预览区域 */}
      <div className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 aspect-video flex items-center justify-center overflow-hidden">
        {work.thumbnail ? (
          <>
            <img
              src={work.thumbnail}
              alt={work.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
        )}
        <div className="text-center z-10">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-3 border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 cursor-pointer">
            <Play className="w-7 h-7 text-white ml-1" fill="white" />
          </div>
          <p className="text-white/70 text-sm font-light">{work.title}</p>
        </div>
        {!work.thumbnail && (
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        )}
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
          {work.url && (
            <div className="flex items-center gap-2">
              {work.storyboardUrl && (
                <Link
                  to={work.storyboardUrl}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 border border-violet-200 text-violet-700 rounded-lg text-xs font-medium hover:bg-violet-50 transition-colors duration-200"
                >
                  查看分镜板
                  <Film className="w-3 h-3" />
                </Link>
              )}
              <a
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-violet-700 text-white rounded-lg text-xs font-medium hover:bg-violet-600 transition-colors duration-200"
              >
                观看视频
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VideoWorksSection() {
  return (
    <section id="video-works" className="py-24 sm:py-32 px-6 bg-gradient-to-b from-white to-stone-50/80">
      <div className="max-w-5xl mx-auto">
        <SectionTitle subtitle="AI 驱动的影视创作，探索技术与叙事的融合">
          视频作品
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoWorks.map((work, index) => (
            <VideoWorkCard key={work.title} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 分镜板与设计 ─── */

function DesignWorksSection() {
  return (
    <section id="design-works" className="py-24 sm:py-32 px-6 bg-stone-50/50">
      <div className="max-w-5xl mx-auto">
        <SectionTitle subtitle="分镜板设计与视觉创作，从概念到画面的转化">
          分镜板与设计
        </SectionTitle>

        <div className="grid grid-cols-1 gap-8">
          {designWorks.map((work, index) => {
            const { ref: cardRef, inView: cardInView } = useInView(0.1);
            return (
              <div
                key={work.title}
                ref={cardRef}
                className={`group bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 ${
                  cardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* 设计作品顶部渐变条 */}
                <div className="h-1.5 bg-gradient-to-r from-amber-300 via-emerald-300 to-sky-300" />

                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-3 mb-5">
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

                  {/* 图片展示区 */}
                  <div className="rounded-xl overflow-hidden border border-stone-100 bg-stone-50">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* 标签 */}
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
  );
}

/* ─── 经历时间线 ─── */

function TimelineItem({
  exp,
  index,
}: {
  exp: ExperienceItem;
  index: number;
}) {
  const { ref, inView } = useInView(0.1);
  const IconComponent = exp.icon;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex items-start gap-6 transition-all duration-700 ${
        inView
          ? 'opacity-100 translate-x-0'
          : `opacity-0 ${isEven ? '-translate-x-8' : 'translate-x-8'}`
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* 时间线节点 */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-50 to-rose-50 flex items-center justify-center border border-amber-100/50">
          <IconComponent className="w-4.5 h-4.5 text-amber-600" strokeWidth={1.5} />
        </div>
        {index < experiences.length - 1 && (
          <div className="w-px h-full bg-gradient-to-b from-amber-200 to-stone-200 mt-2" />
        )}
      </div>

      {/* 内容 */}
      <div className="flex-1 pb-10">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-serif text-lg font-semibold text-stone-800">
            {exp.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-400 mb-3">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {exp.period}
          </span>
          <span>·</span>
          <span>{exp.role}</span>
        </div>
        <p className="text-stone-500 text-sm leading-relaxed mb-3 font-light">
          {exp.description}
        </p>
        <ul className="space-y-1.5 mb-3">
          {exp.highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-stone-600 font-light"
            >
              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-stone-300" />
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-stone-50 text-stone-400 text-xs rounded-full border border-stone-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-32 px-6 bg-gradient-to-b from-white to-stone-50/80">
      <div className="max-w-3xl mx-auto">
        <SectionTitle subtitle="AI 产品、社区策略与用户增长的实战积累">
          实践经历
        </SectionTitle>

        <div className="relative">
          {experiences.map((exp, index) => (
            <TimelineItem key={exp.title} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 联系方式 ─── */

function ContactSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 px-6 bg-gradient-to-b from-stone-50/80 to-white"
    >
      <div className="max-w-2xl mx-auto">
        <SectionTitle subtitle="如果你有机会或想法，欢迎随时与我联系">
          联系方式
        </SectionTitle>

        <div
          ref={ref}
          className={`transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-sm border border-stone-100 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 mb-4">
                <Mail className="w-7 h-7 text-amber-600" strokeWidth={1.5} />
              </div>
              <p className="text-stone-600 font-light leading-relaxed max-w-sm mx-auto">
                无论是 AI 产品实习机会、项目合作，还是简单的交流，
                <br />我都很期待听到你的声音。
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:qq154090535@gmail.com"
                className="flex items-center justify-center gap-3 w-full px-6 py-3.5 bg-stone-800 text-white rounded-xl text-sm font-medium hover:bg-stone-700 transition-all duration-300 hover:shadow-lg hover:shadow-stone-300/30"
              >
                <Mail className="w-4 h-4" />
                qq154090535@gmail.com
              </a>

              <div className="flex items-center justify-center gap-3">
                <a
                  href="tel:16623073813"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-stone-200 text-stone-600 rounded-xl text-sm hover:border-stone-300 hover:bg-stone-50 transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  166-2307-3813
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-stone-200 text-stone-600 rounded-xl text-sm hover:border-stone-300 hover:bg-stone-50 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  微信：13265220638
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100">
              <p className="text-stone-400 text-xs font-light">
                暨南大学 · 新闻与传播学院 · 2024 级硕士研究生
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
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
    { label: '关于我', href: '#about' },
    { label: '学术作品', href: '#works' },
    { label: '视频作品', href: '#video-works' },
    { label: '分镜板', href: '#design-works' },
    { label: '实践经历', href: '#experience' },
    { label: '联系方式', href: '#contact' },
  ];

  const handleClick = (
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
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif text-lg font-semibold text-stone-700 hover:text-amber-700 transition-colors"
        >
          刘智楚
        </a>
        <div className="flex items-center gap-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
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

/* ─── 主页面 ─── */

function Home() {
  return (
    <div className="min-h-screen bg-white text-stone-800">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AcademicWorksSection />
      <VideoWorksSection />
      <DesignWorksSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default Home;
