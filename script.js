// Simple Google drive generator By arlethdesign || github.com/id-yuu
const form = document.getElementsByClassName("gd")[0];
const url = document.querySelector("#url");
const hasil = document.querySelector("#hasil");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const urlnya = url.value;
  const dataSlice = urlnya.slice(32, -5);
  const hasilSlice = `https://drive.google.com/uc?export=download&id=${dataSlice}`;

  if (urlnya == "") {
    confirm("URL is empty!");
  } else {
    hasil.value = hasilSlice;
    // Copy
    const copyData = document.getElementById("copy");
    copyData.disabled = false;
    copyData.addEventListener("click", () => {
      navigator.clipboard.writeText(hasil.value);
      copyData.innerText = "Copied!";
    });
    // Reset
    const resetData = document.getElementById("reset");
    resetData.addEventListener("click", () => {
      url.value = "";
      hasil.value = "";
      copyData.disabled = true;
      copyData.innerText = "Copy";
    });
  }
});
