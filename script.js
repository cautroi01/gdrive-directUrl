// Simple Google drive generator By arlethdesign || github.com/id-yuu
// Refactor check valid url
const form = document.getElementsByClassName("gd")[0];
const urlInput = document.querySelector("#url");
const resultInput = document.querySelector("#hasil");
const copyButton = document.getElementById("copy");
const resetButton = document.getElementById("reset");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = urlInput.value;
  const url = new URL(inputValue);
  const path = url.pathname.slice(8, -5) || url.pathname.slice(8, -17);

  const newUrl = `https://drive.google.com/uc?export=download&id=${path}`;

  const copyBtn = document.getElementById("copy");
  copyBtn.removeAttribute("disabled");

  const isValidUrl = inputValue.includes("https://drive.google.com/file/d/");

  if (inputValue !== "" && isValidUrl) {
    resultInput.value = newUrl;

    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(newUrl);
      copyBtn.textContent = "Copied!";
      copyBtn.setAttribute("disabled", true);
      resultInput.setAttribute("disabled", true);
    });

    resetButton.addEventListener("click", () => {
      urlInput.value = "";
      resultInput.value = "";
      copyBtn.textContent = "Copy";
    });
  } else {
    resultInput.value = "";
    copyBtn.textContent = "Invalid URL";
    copyBtn.setAttribute("disabled", true);
  }
});
