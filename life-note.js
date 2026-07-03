const noteTypes = {
  stable: {
    ja: {
      eyebrow: "Life Stability",
      title: "生活の安定",
      copy: "熊本での生活リズム、健康管理、時間の使い方を写真と短い文章で整理します。",
    },
    zh: {
      eyebrow: "生活稳定",
      title: "生活的稳定",
      copy: "用照片和简短文字整理在熊本的生活节奏、健康管理和时间使用。",
    },
    en: {
      eyebrow: "Life Stability",
      title: "Stable Life",
      copy: "I organize my life rhythm, health habits, and time use in Kumamoto with photos and short notes.",
    },
  },
  learning: {
    ja: {
      eyebrow: "Continuous Learning",
      title: "学習の継続",
      copy: "日本語、仕事への理解、基礎スキルなど、続けている学習を記録します。",
    },
    zh: {
      eyebrow: "持续学习",
      title: "学习的持续",
      copy: "记录日语、工作理解和基础技能等持续学习的内容。",
    },
    en: {
      eyebrow: "Continuous Learning",
      title: "Continuous Learning",
      copy: "I record ongoing learning such as Japanese, workplace understanding, and basic skills.",
    },
  },
  improvement: {
    ja: {
      eyebrow: "Noticing and Improving",
      title: "気づきと改善",
      copy: "生活や学習の中で気づいたこと、改善したこと、次に試したいことを整理します。",
    },
    zh: {
      eyebrow: "发现与改善",
      title: "发现与改善",
      copy: "整理生活和学习中的发现、已经改善的事情，以及下一步想尝试的事情。",
    },
    en: {
      eyebrow: "Noticing and Improving",
      title: "Noticing and Improving",
      copy: "I organize what I notice, what I improve, and what I want to try next.",
    },
  },
};

const noteUiText = {
  ja: {
    editorEyebrow: "Edit Notes",
    editorTitle: "写真と文章を追加する",
    add: "記録を追加",
    noteTitle: "タイトル",
    noteBody: "説明文",
    image: "写真を選ぶ",
    imageEmpty: "写真を複数選べます",
    imageAlt: "追加した写真",
    removeImage: "写真をすべて削除",
    removeSingleImage: "削除",
    deleteNote: "この記録を削除",
    help: "この編集内容は現在のブラウザに自動保存されます。別のブラウザや端末でも使う場合は、バックアップを書き出してください。",
    exportNotes: "バックアップを書き出す",
    importNotes: "バックアップを読み込む",
    clearNotes: "本ページを空にする",
    importDone: "バックアップを読み込みました",
    importError: "バックアップを読み込めませんでした",
    clearConfirm: "このページの記録をすべて削除しますか？",
    imageError: "一部の写真を表示できませんでした。HEICの場合はJPG/PNGに変換してから選んでください。",
    heicUnsupported: "HEIC写真はこの編集画面では安定して保存できません。JPG/PNGに変換してから選んでください。",
    storageError: "保存容量が足りません。写真を減らすか、JPGに変換してからもう一度試してください。",
    placeholderTitle: "例：朝の学習メモ",
    placeholderBody: "写真の内容、気づいたこと、次に試したいことを書きます。",
    empty: "まだ記録がありません。右上のボタンから追加できます。",
    saved: "保存しました",
  },
  zh: {
    editorEyebrow: "编辑记录",
    editorTitle: "添加照片和文字",
    add: "添加记录",
    noteTitle: "标题",
    noteBody: "说明文字",
    image: "选择照片",
    imageEmpty: "可以选择多张照片",
    imageAlt: "已添加的照片",
    removeImage: "删除全部照片",
    removeSingleImage: "删除",
    deleteNote: "删除这条记录",
    help: "编辑内容会自动保存在当前浏览器。如果换浏览器或设备，请先导出备份。",
    exportNotes: "导出备份",
    importNotes: "导入备份",
    clearNotes: "清空本页",
    importDone: "已导入备份",
    importError: "无法导入备份",
    clearConfirm: "要删除这个页面里的所有记录吗？",
    imageError: "有些照片无法显示。如果是 HEIC，请先转换成 JPG/PNG 后再选择。",
    heicUnsupported: "HEIC 照片无法在这个编辑画面里稳定保存。请先转换成 JPG/PNG 后再选择。",
    storageError: "浏览器保存空间不够。请减少照片数量，或先转成 JPG 后再试。",
    placeholderTitle: "例：早上的学习笔记",
    placeholderBody: "写下照片内容、发现的事情、下一步想尝试的事情。",
    empty: "还没有记录。可以从右上角按钮添加。",
    saved: "已保存",
  },
  en: {
    editorEyebrow: "Edit Notes",
    editorTitle: "Add photos and writing",
    add: "Add note",
    noteTitle: "Title",
    noteBody: "Description",
    image: "Choose photo",
    imageEmpty: "You can choose multiple photos",
    imageAlt: "Added photo",
    removeImage: "Remove all photos",
    removeSingleImage: "Remove",
    deleteNote: "Delete this note",
    help: "Your edits are saved automatically in this browser. Export a backup if you want to use them in another browser or device.",
    exportNotes: "Export backup",
    importNotes: "Import backup",
    clearNotes: "Clear this page",
    importDone: "Backup imported",
    importError: "Could not import backup",
    clearConfirm: "Delete all notes on this page?",
    imageError: "Some photos could not be displayed. If they are HEIC files, convert them to JPG/PNG first.",
    heicUnsupported: "HEIC photos cannot be saved reliably in this editor. Convert them to JPG/PNG first.",
    storageError: "There is not enough browser storage. Use fewer photos or convert them to JPG first.",
    placeholderTitle: "Example: Morning study note",
    placeholderBody: "Write what the photo shows, what you noticed, and what you want to try next.",
    empty: "No notes yet. Add one from the button above.",
    saved: "Saved",
  },
};

const params = new URLSearchParams(window.location.search);
const noteType = noteTypes[params.get("type")] ? params.get("type") : "stable";
const storageKey = `personalPageLifeNote:${noteType}`;
const noteList = document.querySelector("#note-list");
const addButton = document.querySelector("#add-note");
const exportButton = document.querySelector("#export-notes");
const importInput = document.querySelector("#import-notes");
const importButton = document.querySelector(".import-button");
const clearButton = document.querySelector("#clear-notes");
const saveStatus = document.querySelector("#save-status");

function activeLanguage() {
  const saved = localStorage.getItem("preferredLanguage");
  return noteUiText[saved] ? saved : "ja";
}

function loadNotes() {
  const savedNotes = localStorage.getItem(storageKey);
  const publishedNotes = JSON.parse(JSON.stringify(window.publishedLifeNotes?.[noteType] || []));
  if (!savedNotes) {
    return publishedNotes;
  }

  try {
    const notes = JSON.parse(savedNotes) || [];
    if (notes.length === 0) {
      return publishedNotes;
    }
    const publishedIds = new Set(publishedNotes.map((note) => note.id));
    return [...publishedNotes, ...notes.filter((note) => !publishedIds.has(note.id))];
  } catch {
    return publishedNotes;
  }
}

function saveNotes(notes) {
  const ui = noteUiText[activeLanguage()];
  try {
    localStorage.setItem(storageKey, JSON.stringify(notes));
    showStatus(ui.saved);
    return true;
  } catch {
    showStatus(ui.storageError);
    return false;
  }
}

function showStatus(message) {
  saveStatus.textContent = message;
  window.clearTimeout(saveStatus.timeoutId);
  saveStatus.timeoutId = window.setTimeout(() => {
    saveStatus.textContent = "";
  }, 5200);
}

function createNote() {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: "",
    body: "",
    images: [],
  };
}

function getNoteImages(note) {
  if (Array.isArray(note.images)) {
    return note.images;
  }

  return note.image ? [note.image] : [];
}

function localizedNoteField(note, field) {
  const value = note[field];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[activeLanguage()] || value.ja || value.zh || value.en || "";
  }

  return value || "";
}

function isHeicFile(file) {
  return /image\/hei(c|f)/i.test(file.type) || /\.(hei(c|f))$/i.test(file.name);
}

async function normalizeImageFile(file) {
  if (!isHeicFile(file)) {
    return file;
  }

  if (!window.heic2any) {
    throw new Error("HEIC converter is not available");
  }

  const converted = await window.heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.86,
  });
  return Array.isArray(converted) ? converted[0] : converted;
}

async function resizeImage(file) {
  const imageFile = await normalizeImageFile(file);
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
    reader.readAsDataURL(imageFile);
  });
}

function updateHeader() {
  const language = activeLanguage();
  const typeText = noteTypes[noteType][language] || noteTypes[noteType].ja;
  const ui = noteUiText[language];
  document.querySelector("#note-eyebrow").textContent = typeText.eyebrow;
  document.querySelector("#note-title").textContent = typeText.title;
  document.querySelector("#note-copy").textContent = typeText.copy;
  document.querySelector("#note-editor-eyebrow").textContent = ui.editorEyebrow;
  document.querySelector("#note-editor-title").textContent = ui.editorTitle;
  document.querySelector("#editor-help").textContent = ui.help;
  addButton.textContent = ui.add;
  exportButton.textContent = ui.exportNotes;
  importButton.textContent = ui.importNotes;
  clearButton.textContent = ui.clearNotes;
  document.title = typeText.title;
}

function renderNotes() {
  updateHeader();
  const ui = noteUiText[activeLanguage()];
  const notes = loadNotes();
  noteList.innerHTML = "";

  if (notes.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-note";
    empty.textContent = ui.empty;
    noteList.append(empty);
    return;
  }

  notes.forEach((note, index) => {
    const card = document.createElement("article");
    card.className = "note-card";
    card.dataset.noteId = note.id;

    const imageWrap = document.createElement("div");
    imageWrap.className = "note-image-box";
    const images = getNoteImages(note);
    if (images.length > 0) {
      imageWrap.classList.add("has-images");
      imageWrap.classList.add(`image-count-${Math.min(images.length, 4)}`);
      images.forEach((imageSrc, imageIndex) => {
        const imageItem = document.createElement("div");
        imageItem.className = "note-image-item";
        const image = document.createElement("img");
        image.src = imageSrc;
        image.alt = ui.imageAlt;
        const removeSingleButton = document.createElement("button");
        removeSingleButton.type = "button";
        removeSingleButton.textContent = ui.removeSingleImage;
        removeSingleButton.addEventListener("click", () => {
          const nextImages = getNoteImages(loadNotes()[index]).filter((_, currentIndex) => currentIndex !== imageIndex);
          updateNote({ image: "", images: nextImages });
          renderNotes();
        });
        imageItem.append(image, removeSingleButton);
        imageWrap.append(imageItem);
      });
    } else {
      imageWrap.textContent = ui.imageEmpty;
    }

    const titleLabel = document.createElement("label");
    titleLabel.textContent = ui.noteTitle;
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = localizedNoteField(note, "title");
    titleInput.placeholder = ui.placeholderTitle;

    const bodyLabel = document.createElement("label");
    bodyLabel.textContent = ui.noteBody;
    const bodyInput = document.createElement("textarea");
    bodyInput.rows = 5;
    bodyInput.value = localizedNoteField(note, "body");
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

    function updateNote(updates) {
      const nextNotes = loadNotes();
      nextNotes[index] = { ...nextNotes[index], ...updates };
      return saveNotes(nextNotes);
    }

    titleInput.addEventListener("input", () => updateNote({ title: titleInput.value }));
    bodyInput.addEventListener("input", () => updateNote({ body: bodyInput.value }));
    fileInput.addEventListener("change", async () => {
      const files = Array.from(fileInput.files);
      if (files.length === 0) {
        return;
      }
      const ui = noteUiText[activeLanguage()];
      if (files.some((file) => isHeicFile(file))) {
        showStatus(ui.heicUnsupported);
        return;
      }
      try {
        const newImages = await Promise.all(files.map((file) => resizeImage(file)));
        const saved = updateNote({ image: "", images: [...getNoteImages(loadNotes()[index]), ...newImages] });
        if (saved) {
          fileInput.value = "";
          renderNotes();
        }
      } catch {
        showStatus(ui.imageError);
      }
    });
    removeImageButton.addEventListener("click", () => {
      updateNote({ image: "", images: [] });
      renderNotes();
    });
    deleteButton.addEventListener("click", () => {
      const nextNotes = loadNotes().filter((item) => item.id !== note.id);
      saveNotes(nextNotes);
      renderNotes();
    });

    card.append(imageWrap, titleLabel, titleInput, bodyLabel, bodyInput, fileInput, actions);
    noteList.append(card);
  });
}

addButton.addEventListener("click", () => {
  const notes = loadNotes();
  notes.unshift(createNote());
  saveNotes(notes);
  renderNotes();
});

exportButton.addEventListener("click", () => {
  const payload = {
    version: 1,
    type: noteType,
    exportedAt: new Date().toISOString(),
    notes: loadNotes(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `personal-page-${noteType}-backup.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});

importInput.addEventListener("change", () => {
  const file = importInput.files[0];
  const ui = noteUiText[activeLanguage()];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const payload = JSON.parse(reader.result);
      const notes = Array.isArray(payload) ? payload : payload.notes;
      if (!Array.isArray(notes)) {
        throw new Error("Invalid backup");
      }
      saveNotes(notes);
      renderNotes();
      showStatus(ui.importDone);
    } catch {
      showStatus(ui.importError);
    } finally {
      importInput.value = "";
    }
  });
  reader.readAsText(file);
});

clearButton.addEventListener("click", () => {
  const ui = noteUiText[activeLanguage()];
  if (!window.confirm(ui.clearConfirm)) {
    return;
  }
  saveNotes([]);
  renderNotes();
});

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => window.setTimeout(renderNotes, 0));
});

renderNotes();
