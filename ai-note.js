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
    viewTitle: "詳しい内容",
    viewEyebrow: "Notes",
    help: "この内容は現在のブラウザに保存されます。公開する時はバックアップを書き出して共有してください。",
    add: "記録を追加",
    titleLabel: "タイトル",
    bodyLabel: "説明文",
    imageEmpty: "写真を複数選べます",
    imageAlt: "追加した写真",
    removeImage: "写真をすべて削除",
    removeSingleImage: "削除",
    deleteNote: "この記録を削除",
    placeholderTitle: "例：AIで整理した学習計画",
    placeholderBody: "画像の内容、AIをどう使ったか、何が改善したかを書きます。",
    empty: "掲載内容は準備中です。",
    saved: "保存しました",
    exportNote: "バックアップを書き出す",
    importNote: "バックアップを読み込む",
    clearNote: "本ページを空にする",
    importDone: "バックアップを読み込みました",
    importError: "バックアップを読み込めませんでした",
    clearConfirm: "このページの内容を削除しますか？",
    imageError: "一部の写真を表示できませんでした。JPG/PNG/WebPを選んでください。",
    storageError: "保存容量が足りません。写真を減らすか、JPGに変換してからもう一度試してください。",
  },
  zh: {
    editorTitle: "编辑内容",
    viewTitle: "详细内容",
    viewEyebrow: "记录",
    help: "内容会保存在当前浏览器。需要公开时，请导出备份发给我，我再整理进正式网页。",
    add: "添加记录",
    titleLabel: "标题",
    bodyLabel: "说明文字",
    imageEmpty: "可以选择多张照片",
    imageAlt: "已添加的照片",
    removeImage: "删除全部照片",
    removeSingleImage: "删除",
    deleteNote: "删除这条记录",
    placeholderTitle: "例：用 AI 整理的学习计划",
    placeholderBody: "写下图片内容、如何使用 AI、改善了什么。",
    empty: "展示内容正在准备中。",
    saved: "已保存",
    exportNote: "导出备份",
    importNote: "导入备份",
    clearNote: "清空本页",
    importDone: "已导入备份",
    importError: "无法导入备份",
    clearConfirm: "要删除这个页面里的内容吗？",
    imageError: "有些照片无法显示。请选择 JPG/PNG/WebP。",
    storageError: "浏览器保存空间不够。请减少照片数量，或先转成 JPG 后再试。",
  },
  en: {
    editorTitle: "Edit Content",
    viewTitle: "Details",
    viewEyebrow: "Notes",
    help: "This content is saved in this browser. Export a backup when you want me to publish it on the public page.",
    add: "Add note",
    titleLabel: "Title",
    bodyLabel: "Description",
    imageEmpty: "You can choose multiple photos",
    imageAlt: "Added photo",
    removeImage: "Remove all photos",
    removeSingleImage: "Remove",
    deleteNote: "Delete this note",
    placeholderTitle: "Example: Study plan organized with AI",
    placeholderBody: "Write what the image shows, how you used AI, and what improved.",
    empty: "Content is being prepared.",
    saved: "Saved",
    exportNote: "Export backup",
    importNote: "Import backup",
    clearNote: "Clear this page",
    importDone: "Backup imported",
    importError: "Could not import backup",
    clearConfirm: "Delete the content on this page?",
    imageError: "Some photos could not be displayed. Please choose JPG/PNG/WebP.",
    storageError: "There is not enough browser storage. Use fewer photos or convert them to JPG first.",
  },
};

const params = new URLSearchParams(window.location.search);
const aiNoteType = aiNoteTypes[params.get("type")] ? params.get("type") : "thinking";
const isAiEditMode = false;
const aiNoteList = document.querySelector("#ai-note-list");
const aiSaveStatus = document.querySelector("#ai-save-status");
const aiAddButton = document.querySelector("#ai-add-note");
const aiExportButton = document.querySelector("#ai-export-note");
const aiImportInput = document.querySelector("#ai-import-note");
const aiImportButton = document.querySelector(".import-button");
const aiClearButton = document.querySelector("#ai-clear-note");
const aiStorageKey = `personalPageAiNote:${aiNoteType}`;

function currentAiLanguage() {
  const saved = localStorage.getItem("preferredLanguage");
  return aiNoteText[saved] ? saved : "ja";
}

function getAiImages(note) {
  if (Array.isArray(note.images)) {
    return note.images;
  }

  return note.image ? [note.image] : [];
}

function localizedAiField(note, field) {
  const value = note[field];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[currentAiLanguage()] || value.ja || value.zh || value.en || "";
  }

  return value || "";
}

function createAiNote(body = "") {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: "",
    body,
    images: [],
  };
}

function normalizeAiNotes(rawValue) {
  if (!rawValue) {
    return [];
  }

  if (typeof rawValue === "string") {
    return rawValue.trim() ? [createAiNote(rawValue)] : [];
  }

  if (Array.isArray(rawValue)) {
    return rawValue;
  }

  if (Array.isArray(rawValue.notes)) {
    return rawValue.notes;
  }

  if (typeof rawValue.body === "string") {
    return rawValue.body.trim() ? [createAiNote(rawValue.body)] : [];
  }

  return [];
}

function loadAiNotes() {
  const publishedNotes = JSON.parse(JSON.stringify(window.publishedAiNotes?.[aiNoteType] || []));
  if (!isAiEditMode) {
    return publishedNotes;
  }

  try {
    const savedNotes = normalizeAiNotes(JSON.parse(localStorage.getItem(aiStorageKey)));
    if (savedNotes.length === 0) {
      return publishedNotes;
    }
    const savedIds = new Set(savedNotes.map((note) => note.id));
    return [...savedNotes, ...publishedNotes.filter((note) => !savedIds.has(note.id))];
  } catch {
    const savedNotes = normalizeAiNotes(localStorage.getItem(aiStorageKey));
    if (savedNotes.length === 0) {
      return publishedNotes;
    }
    const savedIds = new Set(savedNotes.map((note) => note.id));
    return [...savedNotes, ...publishedNotes.filter((note) => !savedIds.has(note.id))];
  }
}

function saveAiNotes(notes) {
  const ui = aiNoteText[currentAiLanguage()];
  try {
    localStorage.setItem(aiStorageKey, JSON.stringify(notes));
    showAiStatus(ui.saved);
    return true;
  } catch {
    showAiStatus(ui.storageError);
    return false;
  }
}

function updateAiNoteLanguage() {
  const language = currentAiLanguage();
  const typeText = aiNoteTypes[aiNoteType][language] || aiNoteTypes[aiNoteType].ja;
  const ui = aiNoteText[language];
  document.querySelector("#ai-note-eyebrow").textContent = typeText[0];
  document.querySelector("#ai-note-title").textContent = typeText[1];
  document.querySelector("#ai-note-copy").textContent = typeText[2];
  document.querySelector(".note-editor .eyebrow").textContent = isAiEditMode ? "Edit" : ui.viewEyebrow;
  document.querySelector("#ai-editor-title").textContent = isAiEditMode ? ui.editorTitle : ui.viewTitle;
  document.querySelector("#ai-editor-help").textContent = isAiEditMode ? ui.help : "";
  document.querySelector(".editor-actions").hidden = !isAiEditMode;
  if (isAiEditMode) {
    aiAddButton.textContent = ui.add;
    aiExportButton.textContent = ui.exportNote;
    aiImportButton.textContent = ui.importNote;
    aiClearButton.textContent = ui.clearNote;
  }
  document.title = typeText[1];
}

function showAiStatus(message) {
  aiSaveStatus.textContent = message;
  window.clearTimeout(aiSaveStatus.timeoutId);
  aiSaveStatus.timeoutId = window.setTimeout(() => {
    aiSaveStatus.textContent = "";
  }, 3200);
}

async function resizeAiImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("error", reject);
    reader.addEventListener("load", () => {
      const image = new Image();
      image.addEventListener("error", reject);
      image.addEventListener("load", () => {
        const maxSize = 900;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      });
      image.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
}

function appendAiImages(imageWrap, note, ui, noteIndex, isEditable) {
  const images = getAiImages(note);
  if (images.length === 0) {
    imageWrap.textContent = ui.imageEmpty;
    return;
  }

  imageWrap.classList.add("has-images");
  imageWrap.classList.add(`image-count-${Math.min(images.length, 4)}`);
  images.forEach((imageSrc, imageIndex) => {
    const imageItem = document.createElement("div");
    imageItem.className = "note-image-item";
    const image = document.createElement("img");
    image.src = imageSrc;
    image.alt = ui.imageAlt;

    imageItem.append(image);
    if (isEditable) {
      const removeSingleButton = document.createElement("button");
      removeSingleButton.type = "button";
      removeSingleButton.textContent = ui.removeSingleImage;
      removeSingleButton.addEventListener("click", () => {
        const notes = loadAiNotes();
        const nextImages = getAiImages(notes[noteIndex]).filter((_, currentIndex) => currentIndex !== imageIndex);
        notes[noteIndex] = { ...notes[noteIndex], image: "", images: nextImages };
        saveAiNotes(notes);
        renderAiNotes();
      });
      imageItem.append(removeSingleButton);
    }
    imageWrap.append(imageItem);
  });
}

function renderReadonlyAiNote(note, ui) {
  const card = document.createElement("article");
  card.className = "note-card note-card-view";

  const imageWrap = document.createElement("div");
  imageWrap.className = "note-image-box";
  appendAiImages(imageWrap, note, ui, 0, false);

  const content = document.createElement("div");
  content.className = "note-display-content";
  const title = document.createElement("h3");
  title.textContent = localizedAiField(note, "title");
  const body = document.createElement("div");
  body.className = "note-display-body";
  String(localizedAiField(note, "body"))
    .split(/\n+/)
    .filter(Boolean)
    .forEach((paragraphText) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = paragraphText;
      body.append(paragraph);
    });

  content.append(title, body);
  card.append(imageWrap, content);
  return card;
}

function renderAiNotes() {
  updateAiNoteLanguage();
  const ui = aiNoteText[currentAiLanguage()];
  const notes = loadAiNotes();
  aiNoteList.innerHTML = "";

  if (notes.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = ui.empty;
    aiNoteList.append(empty);
    return;
  }

  notes.forEach((note, index) => {
    if (!isAiEditMode) {
      aiNoteList.append(renderReadonlyAiNote(note, ui));
      return;
    }

    const card = document.createElement("article");
    card.className = "note-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "note-image-box";
    appendAiImages(imageWrap, note, ui, index, true);

    const titleLabel = document.createElement("label");
    titleLabel.textContent = ui.titleLabel;
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = localizedAiField(note, "title");
    titleInput.placeholder = ui.placeholderTitle;

    const bodyLabel = document.createElement("label");
    bodyLabel.textContent = ui.bodyLabel;
    const bodyInput = document.createElement("textarea");
    bodyInput.rows = 5;
    bodyInput.value = localizedAiField(note, "body");
    bodyInput.placeholder = ui.placeholderBody;

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/jpeg,image/png,image/webp";
    fileInput.multiple = true;

    const actions = document.createElement("div");
    actions.className = "note-actions";
    const removeImageButton = document.createElement("button");
    removeImageButton.className = "button secondary";
    removeImageButton.type = "button";
    removeImageButton.textContent = ui.removeImage;
    const deleteButton = document.createElement("button");
    deleteButton.className = "button secondary";
    deleteButton.type = "button";
    deleteButton.textContent = ui.deleteNote;
    actions.append(removeImageButton, deleteButton);

    function updateAiNote(updates) {
      const nextNotes = loadAiNotes();
      nextNotes[index] = { ...nextNotes[index], ...updates };
      return saveAiNotes(nextNotes);
    }

    titleInput.addEventListener("input", () => updateAiNote({ title: titleInput.value }));
    bodyInput.addEventListener("input", () => updateAiNote({ body: bodyInput.value }));
    fileInput.addEventListener("change", async () => {
      const files = Array.from(fileInput.files);
      if (files.length === 0) {
        return;
      }

      try {
        const newImages = await Promise.all(files.map((file) => resizeAiImage(file)));
        const saved = updateAiNote({ image: "", images: [...getAiImages(loadAiNotes()[index]), ...newImages] });
        if (saved) {
          fileInput.value = "";
          renderAiNotes();
        }
      } catch {
        showAiStatus(ui.imageError);
      }
    });
    removeImageButton.addEventListener("click", () => {
      updateAiNote({ image: "", images: [] });
      renderAiNotes();
    });
    deleteButton.addEventListener("click", () => {
      saveAiNotes(loadAiNotes().filter((item) => item.id !== note.id));
      renderAiNotes();
    });

    card.append(imageWrap, titleLabel, titleInput, bodyLabel, bodyInput, fileInput, actions);
    aiNoteList.append(card);
  });
}

aiAddButton.addEventListener("click", () => {
  const notes = loadAiNotes();
  notes.unshift(createAiNote());
  saveAiNotes(notes);
  renderAiNotes();
});

aiExportButton.addEventListener("click", () => {
  const payload = {
    version: 2,
    type: aiNoteType,
    exportedAt: new Date().toISOString(),
    notes: loadAiNotes(),
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
      saveAiNotes(normalizeAiNotes(payload));
      renderAiNotes();
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
  localStorage.removeItem(aiStorageKey);
  renderAiNotes();
});

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => window.setTimeout(renderAiNotes, 0));
});

renderAiNotes();
