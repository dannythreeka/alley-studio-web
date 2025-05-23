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
    hero_subtitle: '來自巷子內的開發小團隊，為你量身打造數位解決方案',
    hero_cta: '了解我們的服務',
    hero_contact: '聯絡我們',

    // About section
    about_title: '關於巷製所',
    about_description_1:
      ' 巷製所是一間位於城市一隅的創作小所。專注於製作實用而美觀的網頁體驗，喜歡乾淨的排版、細緻的邊框、恰到好處的留白。我們相信，每一次的製作，都是一次手工藝與數位語言的交會。',
    who_we_are: '我們是誰',
    who_we_are_1: '「巷弄之中，製作之所。」',
    who_we_are_2:
      '我們相信，細節之中自有宇宙。願每一次的合作，都是一場靜謐而認真的對話。',
    our_philosophy: '我們的理念',
    our_philosophy_1: ' 我們擅長將複雜的想法，轉化為輕盈直覺的介面；',
    our_philosophy_2:
      '將理性結構，包裹在溫柔的視覺語言之中。我們不急著做大，只想把每一件小事做好。',

    // Services section
    services_title: '服務項目',
    services_description: '我們提供全方位的數位解決方案，從設計到開發',
    service_1_title: '網站開發',
    service_1_description: '使用最新技術打造響應式網站',
    service_2_title: 'AI應用開發',
    service_2_description:
      '利用大模型API快速構建智能小工具，從創意到上線一站式服務',
    service_3_title: '個人化AI工具定制',
    service_3_description:
      '為企業和個人打造專屬的AI輔助工具，提升工作效率和競爭優勢',
    service_4_title: '快速原型開發',
    service_4_description:
      '14天內將AI工具概念轉化為可測試的MVP產品，快速驗證市場需求',

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
    email_title: '電子郵件',
    address_title: '地址',
    address_content: '新北市土城區',
    all_rights_reserved: '版權所有',
    studio_name: '巷製所',
    footer_slogan: '以日式極簡設計原則打造數位體驗',
    footer_slogan_jp:
      '日本のミニマリストデザインの原則でデジタル体験を作り上げます',
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
      'A team of dev artisans crafting tailor-made digital solutions',
    hero_cta: 'See Our Services',
    hero_contact: 'Contact Us',

    // About section
    about_title: 'About Us',
    about_description_1:
      'Alley Studio is a small creative space tucked away in a quiet corner of the city. We craft thoughtful and beautiful web experiences, rooted in clean layout, subtle borders, and breathing whitespace — believing every creation is a dialogue between code and craft.',
    who_we_are: 'Who We Are',
    who_we_are_1: '“Within the alleys, a place of making.”  ',
    who_we_are_2: `We believe there's a universe in the details, and each collaboration is a quiet conversation worth having.`,
    our_philosophy: 'Our Philosophy',
    our_philosophy_1:
      'We transform complex ideas into light, intuitive interfaces, wrapping logic in gentle design.',
    our_philosophy_2:
      'Rather than aiming to be big, we aim to be deliberate — one detail at a time, one project with care.',

    // Services section
    services_title: 'Services',
    services_description:
      'We offer comprehensive digital solutions from design to development',
    service_1_title: 'Web Development',
    service_1_description:
      'Building responsive websites with cutting-edge technologies',
    service_2_title: 'AI Application Development',
    service_2_description:
      'Rapidly build intelligent tools using large language model APIs, end-to-end service from concept to deployment',
    service_3_title: 'Custom AI Tools',
    service_3_description:
      'Create tailored AI assistant tools for businesses and individuals to enhance productivity and competitive advantage',
    service_4_title: 'Rapid Prototyping',
    service_4_description:
      'Transform AI tool concepts into testable MVP products within 14 days, quickly validating market needs',

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
    email_title: 'Email',
    address_title: 'Address',
    address_content: 'New Taipei City, Tucheng District',
    all_rights_reserved: 'All rights reserved',
    studio_name: 'Alley Studio',
    footer_slogan:
      'Crafting digital experiences with Japanese minimalist design principles',
    footer_slogan_jp:
      '日本のミニマリストデザインの原則でデジタル体験を作り上げます',
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
    hero_subtitle:
      'お客様のニーズに合わせたデジタルソリューションを丁寧に開発する専門チーム',
    hero_cta: '詳細を見る',
    hero_contact: 'お問い合わせ',

    // About section
    about_title: '会社概要',
    about_description_1:
      'Alley Studio（アリー・スタジオ）は、街の片隅にある小さなクリエイティブアトリエです。静かなレイアウト、繊細なボーダー、美しい余白を大切にしながら、丁寧で温かみのあるウェブ体験をデザインしています。',
    who_we_are: '私たちについて',
    who_we_are_1: '「路地裏に、つくる場所を。」 ',
    who_we_are_2:
      '細部にこそ、世界が宿ると信じています。一つひとつのプロジェクトが、静かな対話でありますように。',
    our_philosophy: '私たちの理念',
    our_philosophy_1:
      '複雑なアイディアを、軽やかで直感的なインターフェースへ。 ',
    our_philosophy_2:
      '論理的な構造を、やさしい視覚表現で包み込みます。大きな規模を目指すのではなく、小さくても誠実でありたいと願っています。',

    // Services section
    services_title: 'サービス',
    services_description:
      'デザインから開発まで、包括的なデジタルソリューションを提供します',
    service_1_title: 'ウェブ開発',
    service_1_description: '最新技術でレスポンシブウェブサイトを構築',
    service_2_title: 'AI アプリ開発',
    service_2_description:
      '大規模言語モデルAPIを活用したスマートツールの構築、構想から実装まで一括サービス',
    service_3_title: 'パーソナライズドAIツール',
    service_3_description:
      '企業や個人向けにカスタマイズされたAIアシスタントツールを作成し、生産性と競争力を向上',
    service_4_title: '迅速なプロトタイピング',
    service_4_description:
      '14日以内にAIツールのコンセプトをテスト可能なMVP製品に変換し、市場ニーズを迅速に検証',

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
    email_title: 'Email',
    address_title: '住所',
    address_content: '新北市土城区',
    all_rights_reserved: '全著作権所有',
    studio_name: '巷製所',
    footer_slogan: '日本のミニマリスト設計原則でデジタル体験を構築する',
    footer_slogan_jp:
      '日本のミニマリストデザインの原則でデジタル体験を作り上げます',
  },
};

export default translations;
