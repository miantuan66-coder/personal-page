const copyEmailButton = document.querySelector("#copyEmail");
const lastUpdated = document.querySelector("#lastUpdated");
const toast = document.querySelector("#toast");
const languageButtons = document.querySelectorAll(".language-button");

const translations = {
  ja: {
    metaDescription: "日本での安定した生活、学習習慣、適応力、連絡先を伝える個人ページ。",
    pageTitle: "個人ページ",
    brandAria: "トップへ戻る",
    brand: "個人ページ",
    navAria: "ページ内ナビゲーション",
    navLife: "生活",
    navLearning: "学習",
    navContact: "連絡",
    heroActionsAria: "主な操作",
    profileAria: "個人概要",
    heroTitle: "こんにちは。私は日本で誠実に生活し、学び続けています。",
    heroCopy:
      "このページは履歴書だけでは伝わりにくい、私の生活状況、学習習慣、適応力、長く安定して働きたい姿勢を補足するためのものです。",
    heroPrimary: "生活について",
    heroSecondary: "連絡する",
    avatar: "生",
    profileLabel: "現在の状態",
    profileTitle: "安定した生活 / 継続的な学習 / 長期的な成長",
    profileCopy:
      "企業の方に、履歴書だけでは見えにくい私の一面を知っていただきたいです。規則正しさ、責任感、日々の積み重ねを大切にしています。",
    factLocationLabel: "所在地",
    factLocationValue: "日本",
    factStatusLabel: "状態",
    factStatusValue: "安定して生活中",
    aboutTitle: "このページで伝えたいこと",
    aboutCard1Title: "誠実さ",
    aboutCard1Copy: "経験を大きく見せるのではなく、今の自分を正直に伝えます。安定して積み重ねられる部分を大切にしています。",
    aboutCard2Title: "安定性",
    aboutCard2Copy: "日本で生活する外国人として、規則正しい生活、丁寧なコミュニケーション、長期的な計画を重視しています。",
    aboutCard3Title: "成長",
    aboutCard3Copy: "言語、仕事への理解、基礎的なスキルを継続して学び、日々の小さな進歩を積み重ねています。",
    lifeTitle: "日本での安定した生活",
    lifeIntro: "生活については個人的になりすぎず、信頼感、落ち着き、責任感が伝わる内容にしています。",
    lifeCard1Title: "規則正しい日常",
    lifeCard1Copy:
      "安定した生活リズム、健康的な習慣、計画的に物事を進めることを大切にしています。安定した生活は、安定した仕事の土台だと考えています。",
    lifeCard2Title: "日本の環境への適応",
    lifeCard2Copy: "日本で生活する中で、時間を守ること、丁寧なやり取り、礼儀、ルールを尊重する姿勢を学んでいます。",
    lifeCard3Title: "学び続ける姿勢",
    lifeCard3Copy: "学習を日常の一部として続け、言語力、仕事への理解、問題を解決する力を少しずつ高めています。",
    learningTitle: "学習と成長の記録",
    lastUpdatedLoading: "最終更新：読み込み中",
    lastUpdatedFallback: "最終更新：更新中",
    lastUpdatedPrefix: "最終更新：",
    timeline1Time: "現在",
    timeline1Title: "個人ページの整理",
    timeline1Copy: "履歴書だけでは伝わりにくい情報を補足し、自分の生活状況や学習姿勢を分かりやすく伝えるために作成しました。",
    timeline2Time: "継続中",
    timeline2Title: "言語とコミュニケーション力の向上",
    timeline2Copy: "外国人として、言語とコミュニケーションの大切さを理解しています。表現、理解、職場でのやり取りを継続して練習しています。",
    timeline3Time: "長期",
    timeline3Title: "安定性と責任感を保つ",
    timeline3Copy: "日々の積み重ねを通して、信頼され、長く一緒に働ける人になることを目指しています。",
    valuesTitle: "大切にしていること",
    valuesAria: "価値観リスト",
    value1: "時間を守る",
    value2: "誠実",
    value3: "安定",
    value4: "継続学習",
    value5: "ルールを尊重",
    value6: "分かりやすいコミュニケーション",
    value7: "長期的な計画",
    value8: "責任感",
    contactTitle: "連絡先",
    contactCopy: "詳しい職務情報や個人情報は履歴書に記載しています。このページでは、連絡しやすいようにシンプルな連絡先だけを置いています。",
    copyEmail: "メールをコピー",
    copiedEmail: "メールアドレスをコピーしました",
    emailLabel: "メール：",
    backToTop: "トップへ戻る",
    footerLeft: "個人ページ",
    footerRight: "安定した生活、継続的な学習",
  },
  zh: {
    metaDescription: "个人主页，展示在日本的稳定生活、学习习惯、适应能力和联系方式。",
    pageTitle: "个人主页",
    brandAria: "返回顶部",
    brand: "个人主页",
    navAria: "页面导航",
    navLife: "生活",
    navLearning: "学习",
    navContact: "联系",
    heroActionsAria: "主要操作",
    profileAria: "个人摘要",
    heroTitle: "你好，我在日本认真生活，也在持续学习。",
    heroCopy: "这个网页用来补充简历之外的信息：我的生活状态、学习习惯、适应能力和长期稳定发展的态度。",
    heroPrimary: "了解我的生活",
    heroSecondary: "联系我",
    avatar: "生",
    profileLabel: "当前状态",
    profileTitle: "稳定生活 / 持续学习 / 长期发展",
    profileCopy: "我希望通过这个页面，让企业看到简历之外更真实的一面：我重视规律、责任感和长期积累。",
    factLocationLabel: "所在地",
    factLocationValue: "日本",
    factStatusLabel: "状态",
    factStatusValue: "稳定生活中",
    aboutTitle: "这个网页想表达什么",
    aboutCard1Title: "真实",
    aboutCard1Copy: "不夸大经历，也不硬放没有完成的作品。页面只展示真实、稳定、可以长期积累的部分。",
    aboutCard2Title: "稳定",
    aboutCard2Copy: "作为在日本生活的外国人，我重视规律的生活节奏、可靠的沟通和长期计划。",
    aboutCard3Title: "成长",
    aboutCard3Copy: "我会持续学习语言、工作相关知识和基础技能，把每天的进步慢慢积累下来。",
    lifeTitle: "在日本的稳定生活",
    lifeIntro: "生活状态不需要写得很私人，重点是让人感到可靠、安定、有责任感。",
    lifeCard1Title: "规律的日常",
    lifeCard1Copy: "我重视稳定的作息、健康的生活习惯和按计划完成事情。对我来说，稳定生活是稳定工作的基础。",
    lifeCard2Title: "适应日本环境",
    lifeCard2Copy: "在日本生活让我学习到守时、沟通、礼貌和规则意识，也让我更理解长期融入的重要性。",
    lifeCard3Title: "持续学习",
    lifeCard3Copy: "我会把学习变成日常的一部分，持续提升语言能力、工作理解力和解决问题的能力。",
    learningTitle: "学习与成长记录",
    lastUpdatedLoading: "最近更新：正在读取",
    lastUpdatedFallback: "最近更新：持续更新中",
    lastUpdatedPrefix: "最近更新：",
    timeline1Time: "现在",
    timeline1Title: "整理个人主页",
    timeline1Copy: "用网页补充简历之外的信息，让别人更容易理解我的生活状态和学习态度。",
    timeline2Time: "持续",
    timeline2Title: "提升语言和沟通能力",
    timeline2Copy: "作为外国人，我知道语言和沟通很重要，所以会持续练习表达、理解和职场沟通。",
    timeline3Time: "长期",
    timeline3Title: "保持稳定和责任感",
    timeline3Copy: "希望通过日常积累，让自己成为一个可以被信任、可以长期合作的人。",
    valuesTitle: "我重视的事情",
    valuesAria: "价值观列表",
    value1: "守时",
    value2: "认真",
    value3: "稳定",
    value4: "持续学习",
    value5: "尊重规则",
    value6: "清楚沟通",
    value7: "长期计划",
    value8: "责任感",
    contactTitle: "联系我",
    contactCopy: "简历中已经有详细的工作和个人资料。这里保留简单联系方式，方便对方快速联系。",
    copyEmail: "复制邮箱",
    copiedEmail: "邮箱已复制",
    emailLabel: "邮箱：",
    backToTop: "回到顶部",
    footerLeft: "个人主页",
    footerRight: "稳定生活，持续学习",
  },
  en: {
    metaDescription: "A personal page showing stable life in Japan, learning habits, adaptability, and contact information.",
    pageTitle: "Personal Page",
    brandAria: "Back to top",
    brand: "Personal Page",
    navAria: "Page navigation",
    navLife: "Life",
    navLearning: "Learning",
    navContact: "Contact",
    heroActionsAria: "Main actions",
    profileAria: "Personal summary",
    heroTitle: "Hello, I live steadily in Japan and continue learning every day.",
    heroCopy:
      "This page adds context beyond my resume: my life stability, learning habits, adaptability, and intention to grow steadily over the long term.",
    heroPrimary: "Life in Japan",
    heroSecondary: "Contact me",
    avatar: "Life",
    profileLabel: "Current status",
    profileTitle: "Stable life / Continuous learning / Long-term growth",
    profileCopy:
      "I hope this page helps companies see the person behind the resume. I value routine, responsibility, and steady daily effort.",
    factLocationLabel: "Location",
    factLocationValue: "Japan",
    factStatusLabel: "Status",
    factStatusValue: "Living steadily",
    aboutTitle: "What this page is meant to show",
    aboutCard1Title: "Honesty",
    aboutCard1Copy: "I do not exaggerate my experience or pretend to have projects I have not completed. This page focuses on what is real, stable, and growing.",
    aboutCard2Title: "Stability",
    aboutCard2Copy: "As a foreign resident in Japan, I value a steady lifestyle, reliable communication, and long-term planning.",
    aboutCard3Title: "Growth",
    aboutCard3Copy: "I continue learning language, workplace understanding, and basic skills, building progress little by little.",
    lifeTitle: "Stable Life in Japan",
    lifeIntro: "This section stays professional and focuses on reliability, calmness, and responsibility rather than private details.",
    lifeCard1Title: "Regular daily rhythm",
    lifeCard1Copy: "I value a stable schedule, healthy habits, and completing things according to plan. To me, a stable life supports stable work.",
    lifeCard2Title: "Adapting to Japan",
    lifeCard2Copy: "Living in Japan has helped me learn punctuality, thoughtful communication, manners, and respect for rules.",
    lifeCard3Title: "Continuous learning",
    lifeCard3Copy: "I make learning part of daily life and keep improving my language ability, work understanding, and problem-solving skills.",
    learningTitle: "Learning and Growth",
    lastUpdatedLoading: "Last updated: loading",
    lastUpdatedFallback: "Last updated: ongoing",
    lastUpdatedPrefix: "Last updated: ",
    timeline1Time: "Now",
    timeline1Title: "Organizing my personal page",
    timeline1Copy: "I created this page to add context beyond my resume and make my life situation and learning attitude easier to understand.",
    timeline2Time: "Ongoing",
    timeline2Title: "Improving language and communication",
    timeline2Copy: "As a foreign resident, I understand the importance of language and communication, so I keep practicing expression, comprehension, and workplace communication.",
    timeline3Time: "Long term",
    timeline3Title: "Keeping stability and responsibility",
    timeline3Copy: "Through daily effort, I aim to become someone who can be trusted and worked with over the long term.",
    valuesTitle: "Values I Care About",
    valuesAria: "Values list",
    value1: "Punctuality",
    value2: "Honesty",
    value3: "Stability",
    value4: "Continuous learning",
    value5: "Respect for rules",
    value6: "Clear communication",
    value7: "Long-term planning",
    value8: "Responsibility",
    contactTitle: "Contact",
    contactCopy: "My resume contains detailed work and personal information. This page keeps contact simple so companies can reach me quickly.",
    copyEmail: "Copy email",
    copiedEmail: "Email copied",
    emailLabel: "Email: ",
    backToTop: "Back to top",
    footerLeft: "Personal Page",
    footerRight: "Stable life, continuous learning",
  },
};

let currentLanguage = localStorage.getItem("preferredLanguage") || "ja";

function t(key) {
  return translations[currentLanguage][key] || translations.ja[key] || "";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2200);
}

function updateLastModified() {
  const modified = new Date(document.lastModified);

  if (Number.isNaN(modified.getTime())) {
    lastUpdated.textContent = t("lastUpdatedFallback");
    return;
  }

  const locale = currentLanguage === "ja" ? "ja-JP" : currentLanguage === "zh" ? "zh-CN" : "en-US";
  lastUpdated.textContent = `${t("lastUpdatedPrefix")}${new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(modified)}`;
}

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "ja";
  localStorage.setItem("preferredLanguage", currentLanguage);
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attribute, key] = pair.split(":");
      element.setAttribute(attribute.trim(), t(key.trim()));
    });
  });

  document.title = t("pageTitle");
  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  updateLastModified();
}

async function copyEmail() {
  const email = copyEmailButton.dataset.email;

  try {
    await navigator.clipboard.writeText(email);
    showToast(t("copiedEmail"));
  } catch (_error) {
    showToast(`${t("emailLabel")}${email}`);
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

copyEmailButton.addEventListener("click", copyEmail);
applyLanguage(currentLanguage);
