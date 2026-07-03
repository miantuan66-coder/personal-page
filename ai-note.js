const aiNoteTypes = {
  thinking: {
    ja: ["Thinking", "考えの整理", "考え、悩み、やることをAIと整理した記録を書きます。"],
    zh: ["整理想法", "整理想法", "写下自己如何用 AI 整理想法、烦恼和待办事项。"],
    en: ["Thinking", "Organizing Thoughts", "Write how I use AI to organize thoughts, concerns, and tasks."],
  },
  life: {
    ja: ["Daily Life", "生活への活用", "運動、食事、生活リズムをAIで整える工夫を書きます。"],
    zh: ["用于生活", "用于生活", "写下如何用 AI 帮助运动、饮食和作息。"],
    en: ["Daily Life", "Using AI in Daily Life", "Write how I use AI to support exercise, meals, and daily rhythm."],
  },
  outcome: {
    ja: ["Outcome", "作った成果", "AIと一緒に作った成果や改善したことを書きます。"],
    zh: ["成果", "做出的成果", "写下和 AI 一起完成的成果和改善。"],
    en: ["Outcome", "Outcomes I Create", "Write outcomes and improvements created with AI."],
  },
};

const aiNoteText = {
  ja: {
    editorTitle: "内容を編集する",
    help: "この内容は現在のブラウザに保存されます。公開する時は内容を整理してページに反映します。",
    label: "本文",
    placeholder: "ここに内容を書きます。",
    saved: "保存しました",
  },
  zh: {
    editorTitle: "编辑内容",
    help: "内容会保存在当前浏览器。需要公开时，我会再帮你整理并反映到网页里。",
    label: "正文",
    placeholder: "在这里写内容。",
    saved: "已保存",
  },
  en: {
    editorTitle: "Edit Content",
    help: "This content is saved in this browser. When it is ready to publish, I will organize it into the page.",
    label: "Body",
    placeholder: "Write here.",
    saved: "Saved",
  },
};

const params = new URLSearchParams(window.location.search);
const aiNoteType = aiNoteTypes[params.get("type")] ? params.get("type") : "thinking";
const aiNoteBody = document.querySelector("#ai-note-body");
const aiSaveStatus = document.querySelector("#ai-save-status");
const aiStorageKey = `personalPageAiNote:${aiNoteType}`;

function currentAiLanguage() {
  const saved = localStorage.getItem("preferredLanguage");
  return aiNoteText[saved] ? saved : "ja";
}

function updateAiNoteLanguage() {
  const language = currentAiLanguage();
  const typeText = aiNoteTypes[aiNoteType][language] || aiNoteTypes[aiNoteType].ja;
  const ui = aiNoteText[language];
  document.querySelector("#ai-note-eyebrow").textContent = typeText[0];
  document.querySelector("#ai-note-title").textContent = typeText[1];
  document.querySelector("#ai-note-copy").textContent = typeText[2];
  document.querySelector("#ai-editor-title").textContent = ui.editorTitle;
  document.querySelector("#ai-editor-help").textContent = ui.help;
  document.querySelector("#ai-note-label").textContent = ui.label;
  aiNoteBody.placeholder = ui.placeholder;
  document.title = typeText[1];
}

function showAiSaved() {
  const ui = aiNoteText[currentAiLanguage()];
  aiSaveStatus.textContent = ui.saved;
  window.clearTimeout(aiSaveStatus.timeoutId);
  aiSaveStatus.timeoutId = window.setTimeout(() => {
    aiSaveStatus.textContent = "";
  }, 1600);
}

aiNoteBody.value = localStorage.getItem(aiStorageKey) || "";
aiNoteBody.addEventListener("input", () => {
  localStorage.setItem(aiStorageKey, aiNoteBody.value);
  showAiSaved();
});

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => window.setTimeout(updateAiNoteLanguage, 0));
});

updateAiNoteLanguage();
