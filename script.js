// Simple Google drive generator By arlethdesign || github.com/id-yuu
// Refactor check valid url
const form = document.getElementsByClassName("gd")[0];
const urlInput = document.querySelector("#url");
const resultInput = document.querySelector("#hasil");
const copyButton = document.getElementById("copy");
const resetButton = document.getElementById("reset");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const urlValue = urlInput.value;
  const fileId = urlValue.slice(32, -5);
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  const checkValues = ["https://drive.google.com/file/d/"];

  const isUrlValid = checkValues.every((value) => urlValue.includes(value));

  if (urlValue !== "" && isUrlValid) {
    resultInput.value = downloadUrl;

    const enableCopy = () => {
      navigator.clipboard.writeText(resultInput.value);
      copyButton.innerText = "Copied!";
    };

    copyButton.disabled = false;
    copyButton.addEventListener("click", enableCopy);

    resetButton.addEventListener("click", () => {
      urlInput.value = "";
      resultInput.value = "";
      copyButton.disabled = true;
      copyButton.innerText = "Copy";
    });
  } else {
    alert("Invalid URL");
  }
});
