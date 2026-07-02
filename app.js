const copyEmailButton = document.querySelector("#copyEmail");
const lastUpdated = document.querySelector("#lastUpdated");
const toast = document.querySelector("#toast");

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
    lastUpdated.textContent = "最近更新：持续更新中";
    return;
  }

  lastUpdated.textContent = `最近更新：${new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(modified)}`;
}

async function copyEmail() {
  const email = copyEmailButton.dataset.email;

  try {
    await navigator.clipboard.writeText(email);
    showToast("邮箱已复制");
  } catch (_error) {
    showToast(`邮箱：${email}`);
  }
}

copyEmailButton.addEventListener("click", copyEmail);
updateLastModified();
