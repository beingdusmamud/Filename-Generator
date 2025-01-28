const input = document.getElementById("input-text");
const generateBtn = document.getElementById("generate-btn");
const fileList = document.getElementById("file-list");
const errorMessage = document.getElementById("error-message");
const results = document.getElementById("results");

function convertToKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function createCopyIcon() {
  return `<svg class="copy-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"></path>
                        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"></path>
                    </svg>`;
}

generateBtn.addEventListener("click", () => {
  const inputValue = input.value.trim();

  if (inputValue.length < 2) {
    errorMessage.classList.remove("hidden");
    results.classList.remove("show");
    return;
  }

  errorMessage.classList.add("hidden");
  results.classList.add("show");

  const kebabCaseName = convertToKebabCase(inputValue);
  const fileExtensions = ["html", "css", "js"];
  fileList.innerHTML = "";

  fileExtensions.forEach((ext, index) => {
    const fileName = `${kebabCaseName}.${ext}`;
    const fileItem = document.createElement("div");
    fileItem.className = "file-item";
    fileItem.style.animationDelay = `${index * 0.1}s`;

    fileItem.innerHTML = `
                    <span class="file-name">${fileName}</span>
                    <div style="display: flex; align-items: center;">
                        <button class="copy-btn" data-filename="${fileName}">
                            ${createCopyIcon()}
                            Copy
                        </button>
                        <span class="success hidden">Copied!</span>
                    </div>
                `;

    fileList.appendChild(fileItem);
  });

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const fileName = e.target.closest(".copy-btn").dataset.filename;
      const successMsg = e.target.closest(".copy-btn").nextElementSibling;

      try {
        await navigator.clipboard.writeText(fileName);

        successMsg.classList.remove("hidden");
        setTimeout(() => {
          successMsg.classList.add("hidden");
        }, 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    });
  });
});

input.addEventListener("input", () => {
  errorMessage.classList.add("hidden");
});

// Add keyboard support
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    generateBtn.click();
  }
});
