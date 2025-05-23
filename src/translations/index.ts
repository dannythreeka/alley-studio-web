type LanguageCode = 'zh-TW' | 'en' | 'ja';
type TranslationStrings = Record<string, string>;
type TranslationsType = Record<LanguageCode, TranslationStrings>;

const translations: TranslationsType = {
  'zh-TW': {
    // System
    language_name: '繁體中文',
    skip_to_content: '跳到主要內容',

    // Navbar
    about: '關於我們',
    services: '服務項目',
    work: '作品集',
    contact: '聯絡我們',

    // Hero section
    hero_subtitle: '具有日式設計精確度的現代技術解決方案',
    hero_cta: '了解更多',
    hero_contact: '聯絡我們',

    // About section
    about_title: '關於我們',
    about_subtitle: '微開發工作室',
    about_description_1: '我們是一家融合東方美學與西方技術的開發工作室',
    about_description_2: '專注於創建優雅且高效能的數位產品',
    who_we_are: '我們是誰',
    who_we_are_1:
      'MINI DEV 是一家精品開發工作室，結合了技術專業知識和簡潔的日式設計原則。我們專注於創建優雅、實用的數位體驗，以精確和細心的方式服務客戶的需求。',
    who_we_are_2:
      '我們的團隊匯集了網站開發、系統整合和技術顧問領域的專家，提供符合您獨特需求的全面解決方案。',
    our_philosophy: '我們的理念',
    our_philosophy_1:
      '我們相信有目的的極簡主義。通過專注於真正重要的事物並消除不必要的複雜性，我們創造出既美觀又實用的解決方案。',
    our_philosophy_2:
      '微開發反映了我們的方法：注重細節、精確執行，以及對我們承擔的每個項目目的的深刻尊重。',

    // Services section
    services_title: '服務項目',
    services_description: '我們提供全方位的數位解決方案，從設計到開發',
    service_1_title: '網站開發',
    service_1_description: '使用最新技術打造響應式網站',
    service_2_title: '系統整合',
    service_2_description: '無縫連接不同系統和服務，使其高效協同工作',
    service_3_title: '專案管理',
    service_3_description: '有組織且有效的專案管理，確保按時、按預算交付',
    service_4_title: '技術顧問',
    service_4_description: '關於技術決策、架構和技術選擇的專業指導',

    // Works section
    works_title: '作品集',
    works_description: '我們最近完成的項目',
    view_project: '查看專案',

    // Contact form
    contact_title: '聯絡我們',
    contact_subtitle: '讓我們一起合作',
    name: '姓名',
    email: '電子郵件',
    message: '訊息',
    send: '發送訊息',
    sending: '發送中...',
    success_message: '感謝您的訊息！我們會盡快回復。',
    name_required: '請輸入姓名',
    email_required: '請輸入電子郵件',
    email_invalid: '電子郵件格式不正確',
    message_required: '請輸入訊息',

    // Footer
    quick_links: '快速連結',
    contact_info: '聯絡資訊',
    all_rights_reserved: '版權所有',
    studio_name: '微開發工作室',
  },

  en: {
    // System
    language_name: 'English',
    skip_to_content: 'Skip to content',

    // Navbar
    about: 'About',
    services: 'Services',
    work: 'Work',
    contact: 'Contact',

    // Hero section
    hero_subtitle:
      'Modern technical solutions with Japanese-inspired design precision',
    hero_cta: 'Learn More',
    hero_contact: 'Contact Us',

    // About section
    about_title: 'About Us',
    about_subtitle: 'MINI DEV Studio',
    about_description_1:
      'We are a development studio blending Eastern aesthetics with Western technology',
    about_description_2:
      'Focused on creating elegant and high-performance digital products',
    who_we_are: 'Who We Are',
    who_we_are_1:
      "MINI DEV is a boutique development studio that combines technical expertise with clean, Japanese-inspired design principles. We focus on creating elegant, functional digital experiences that serve our clients' needs with precision and care.",
    who_we_are_2:
      'Our team brings together specialists in web development, system integration, and technical consulting to deliver comprehensive solutions tailored to your unique requirements.',
    our_philosophy: 'Our Philosophy',
    our_philosophy_1:
      'We believe in minimalism with purpose. By focusing on what truly matters and eliminating unnecessary complexity, we create solutions that are both beautiful and functional.',
    our_philosophy_2:
      '微開發 (micro-development) reflects our approach: attention to detail, precision in execution, and a deep respect for the purpose of each project we undertake.',

    // Services section
    services_title: 'Services',
    services_description:
      'We offer comprehensive digital solutions from design to development',
    service_1_title: 'Web Development',
    service_1_description:
      'Building responsive websites with cutting-edge technologies',
    service_2_title: 'System Integration',
    service_2_description:
      'Seamlessly connect different systems and services to work together efficiently',
    service_3_title: 'Project Management',
    service_3_description:
      'Organized and effective project management to ensure on-time, on-budget delivery',
    service_4_title: 'Tech Consulting',
    service_4_description:
      'Expert guidance on technical decisions, architecture, and technology selection',

    // Works section
    works_title: 'Our Work',
    works_description: 'Our recent projects',
    view_project: 'View Project',

    // Contact form
    contact_title: 'Get In Touch',
    contact_subtitle: "Let's work together",
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    sending: 'Sending...',
    success_message: "Thanks for your message! We'll get back to you soon.",
    name_required: 'Name is required',
    email_required: 'Email is required',
    email_invalid: 'Email is invalid',
    message_required: 'Message is required',

    // Footer
    quick_links: 'Quick Links',
    contact_info: 'Contact Info',
    all_rights_reserved: 'All rights reserved',
    studio_name: 'MINI DEV Studio',
  },

  ja: {
    // System
    language_name: '日本語',
    skip_to_content: 'コンテンツにスキップ',

    // Navbar
    about: '会社概要',
    services: 'サービス',
    work: '作品',
    contact: 'お問い合わせ',

    // Hero section
    hero_subtitle: '日本的なデザイン精度を持つ現代的な技術ソリューション',
    hero_cta: '詳細を見る',
    hero_contact: 'お問い合わせ',

    // About section
    about_title: '会社概要',
    about_subtitle: 'MINI DEV スタジオ',
    about_description_1: '東洋の美学と西洋の技術を融合した開発スタジオです',
    about_description_2:
      'エレガントで高性能なデジタル製品の制作に焦点を当てています',
    who_we_are: '私たちについて',
    who_we_are_1:
      'MINI DEVは、技術的な専門知識と日本的なデザイン原則を組み合わせたブティック開発スタジオです。お客様のニーズに正確かつ丁寧に応えるエレガントで機能的なデジタル体験の創造に焦点を当てています。',
    who_we_are_2:
      '当チームはウェブ開発、システム統合、技術コンサルティングの専門家を集め、お客様の独自の要件に合わせた包括的なソリューションを提供します。',
    our_philosophy: '私たちの理念',
    our_philosophy_1:
      '目的を持ったミニマリズムを信じています。真に重要なことに焦点を当て、不必要な複雑さを排除することで、美しく機能的なソリューションを作り出します。',
    our_philosophy_2:
      '微開発（マイクロ開発）は私たちのアプローチを反映しています：細部への注意、実行の精度、そして私たちが取り組む各プロジェクトの目的に対する深い敬意。',

    // Services section
    services_title: 'サービス',
    services_description:
      'デザインから開発まで、包括的なデジタルソリューションを提供します',
    service_1_title: 'ウェブ開発',
    service_1_description: '最新技術でレスポンシブウェブサイトを構築',
    service_2_title: 'システム統合',
    service_2_description: '異なるシステムやサービスを効率的に連携させる',
    service_3_title: 'プロジェクト管理',
    service_3_description:
      '期限内、予算内での納品を確保する組織的で効果的なプロジェクト管理',
    service_4_title: '技術コンサルティング',
    service_4_description:
      '技術的決定、アーキテクチャ、技術選択に関する専門的なアドバイス',

    // Works section
    works_title: '作品集',
    works_description: '最近のプロジェクト',
    view_project: 'プロジェクトを見る',

    // Contact form
    contact_title: 'お問い合わせ',
    contact_subtitle: '一緒に仕事しましょう',
    name: 'お名前',
    email: 'メールアドレス',
    message: 'メッセージ',
    send: '送信',
    sending: '送信中...',
    success_message:
      'メッセージをありがとうございます！近日中にご連絡いたします。',
    name_required: '名前を入力してください',
    email_required: 'メールアドレスを入力してください',
    email_invalid: 'メールアドレスが無効です',
    message_required: 'メッセージを入力してください',

    // Footer
    quick_links: 'クイックリンク',
    contact_info: '連絡先情報',
    all_rights_reserved: '全著作権所有',
    studio_name: 'MINI DEV スタジオ',
  },
};

export default translations;
