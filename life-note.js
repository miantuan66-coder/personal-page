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
const saveStatus = document.querySelector("#save-status");

function activeLanguage() {
  const saved = localStorage.getItem("preferredLanguage");
  return noteUiText[saved] ? saved : "ja";
}

function loadNotes() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(storageKey, JSON.stringify(notes));
  const ui = noteUiText[activeLanguage()];
  saveStatus.textContent = ui.saved;
  window.clearTimeout(saveStatus.timeoutId);
  saveStatus.timeoutId = window.setTimeout(() => {
    saveStatus.textContent = "";
  }, 1600);
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

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("error", reject);
    reader.addEventListener("load", () => {
      const image = new Image();
      image.addEventListener("error", () => resolve(reader.result));
      image.addEventListener("load", () => {
        const maxSize = 1200;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      });
      image.src = reader.result;
    });
    reader.readAsDataURL(file);
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
  addButton.textContent = ui.add;
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
    titleInput.value = note.title;
    titleInput.placeholder = ui.placeholderTitle;

    const bodyLabel = document.createElement("label");
    bodyLabel.textContent = ui.noteBody;
    const bodyInput = document.createElement("textarea");
    bodyInput.rows = 5;
    bodyInput.value = note.body;
    bodyInput.placeholder = ui.placeholderBody;

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
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
      saveNotes(nextNotes);
    }

    titleInput.addEventListener("input", () => updateNote({ title: titleInput.value }));
    bodyInput.addEventListener("input", () => updateNote({ body: bodyInput.value }));
    fileInput.addEventListener("change", async () => {
      const files = Array.from(fileInput.files);
      if (files.length === 0) {
        return;
      }
      const newImages = await Promise.all(files.map((file) => resizeImage(file)));
      updateNote({ image: "", images: [...getNoteImages(loadNotes()[index]), ...newImages] });
      renderNotes();
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

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => window.setTimeout(renderNotes, 0));
});

renderNotes();
