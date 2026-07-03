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
    exportNote: "バックアップを書き出す",
    importNote: "バックアップを読み込む",
    clearNote: "本ページを空にする",
    importDone: "バックアップを読み込みました",
    importError: "バックアップを読み込めませんでした",
    clearConfirm: "このページの内容を削除しますか？",
  },
  zh: {
    editorTitle: "编辑内容",
    help: "内容会保存在当前浏览器。需要公开时，我会再帮你整理并反映到网页里。",
    label: "正文",
    placeholder: "在这里写内容。",
    saved: "已保存",
    exportNote: "导出备份",
    importNote: "导入备份",
    clearNote: "清空本页",
    importDone: "已导入备份",
    importError: "无法导入备份",
    clearConfirm: "要删除这个页面里的内容吗？",
  },
  en: {
    editorTitle: "Edit Content",
    help: "This content is saved in this browser. When it is ready to publish, I will organize it into the page.",
    label: "Body",
    placeholder: "Write here.",
    saved: "Saved",
    exportNote: "Export backup",
    importNote: "Import backup",
    clearNote: "Clear this page",
    importDone: "Backup imported",
    importError: "Could not import backup",
    clearConfirm: "Delete the content on this page?",
  },
};

const params = new URLSearchParams(window.location.search);
const aiNoteType = aiNoteTypes[params.get("type")] ? params.get("type") : "thinking";
const aiNoteBody = document.querySelector("#ai-note-body");
const aiSaveStatus = document.querySelector("#ai-save-status");
const aiExportButton = document.querySelector("#ai-export-note");
const aiImportInput = document.querySelector("#ai-import-note");
const aiImportButton = document.querySelector(".import-button");
const aiClearButton = document.querySelector("#ai-clear-note");
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
  aiExportButton.textContent = ui.exportNote;
  aiImportButton.textContent = ui.importNote;
  aiClearButton.textContent = ui.clearNote;
  document.title = typeText[1];
}

function showAiStatus(message) {
  aiSaveStatus.textContent = message;
  window.clearTimeout(aiSaveStatus.timeoutId);
  aiSaveStatus.timeoutId = window.setTimeout(() => {
    aiSaveStatus.textContent = "";
  }, 2400);
}

function showAiSaved() {
  const ui = aiNoteText[currentAiLanguage()];
  showAiStatus(ui.saved);
}

aiNoteBody.value = localStorage.getItem(aiStorageKey) || "";
aiNoteBody.addEventListener("input", () => {
  localStorage.setItem(aiStorageKey, aiNoteBody.value);
  showAiSaved();
});

aiExportButton.addEventListener("click", () => {
  const payload = {
    version: 1,
    type: aiNoteType,
    exportedAt: new Date().toISOString(),
    body: aiNoteBody.value,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `personal-page-ai-${aiNoteType}-backup.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});

aiImportInput.addEventListener("change", () => {
  const file = aiImportInput.files[0];
  const ui = aiNoteText[currentAiLanguage()];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const payload = JSON.parse(reader.result);
      if (payload.type && payload.type !== aiNoteType) {
        throw new Error("Backup type does not match this page");
      }
      const nextBody = typeof payload.body === "string" ? payload.body : "";
      aiNoteBody.value = nextBody;
      localStorage.setItem(aiStorageKey, nextBody);
      showAiStatus(ui.importDone);
    } catch {
      showAiStatus(ui.importError);
    } finally {
      aiImportInput.value = "";
    }
  });
  reader.readAsText(file);
});

aiClearButton.addEventListener("click", () => {
  const ui = aiNoteText[currentAiLanguage()];
  if (!window.confirm(ui.clearConfirm)) {
    return;
  }
  aiNoteBody.value = "";
  localStorage.removeItem(aiStorageKey);
  showAiSaved();
});

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => window.setTimeout(updateAiNoteLanguage, 0));
});

updateAiNoteLanguage();
