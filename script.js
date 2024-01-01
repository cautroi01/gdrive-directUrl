// Simple Google drive generator By arlethdesign || github.com/id-yuu
// Refactor check valid url

 // Khóa API của bạn
    const API_KEY = 'AIzaSyDtbaA5i3df9zz0Qy_M4NlZCpivE8wOQl8';

    // ID của bảng tính Google Sheets
    const SPREADSHEET_ID = '17SqKILUbz-e1ajLGJp9ssbw8PgwaRgsjR51luFV5VtI';

    // Tên của bảng trong bảng tính
    const SHEET_NAME = 'Sheet1';

    // Lấy giá trị tìm kiếm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get('search');
	if (searchValue.length > 0) {
    // Xác thực sử dụng API Key
    const auth = {
      key: API_KEY,
    };

    // Tìm kiếm dữ liệu theo giá trị tìm kiếm
    const findData = async (searchValue) => {
      try {
        // Lấy dữ liệu từ bảng tính
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/'+SPREADSHEET_ID+'/values/'+SHEET_NAME+'!A1:Z100?key='+API_KEY);
        const data = await response.json();

        const values = data.values;

        // Lấy hàng đầu tiên làm tên cột
        const columnNames = values[0];

        // Lọc kết quả dựa trên giá trị tìm kiếm
        const result = values.slice(1).filter((row) => row.includes(searchValue));

        if (result.length > 0) {
          const resultContainer = document.getElementById('resultContainer');
         // resultContainer.innerHTML = '<h2>Kết quả tìm kiếm:</h2>';

          // Hiển thị kết quả
          const resultArray = [];
          result.forEach((row) => {
            const rowObject = {};
            for (let i = 0; i < row.length; i++) {
              rowObject[columnNames[i]] = row[i];
            }
            resultArray.push(rowObject);
          });

          // In kết quả dưới dạng JSON
          console.log(JSON.stringify(resultArray));

          // Hiển thị kết quả trên trang
          resultArray.forEach((rowObject) => {
            const rowElement = document.createElement('p');
            rowElement.textContent = JSON.stringify(rowObject);
            resultContainer.appendChild(rowElement);
          });
		  
		  // Hiển thị giá trị của trường "URL"
          resultArray.forEach((rowObject) => {
             const urlValue = rowObject['URL'];
             const urlElement = document.createElement('p');
             urlElement.textContent = `URL: ${urlValue}`;
		const newUrl = ${urlValue};
             resultContainer.appendChild(urlElement);
          });
        } else {
          const resultContainer = document.getElementById('resultContainer');
          resultContainer.innerHTML = '<p>Không tìm thấy dữ liệu.</p>';
        }
      } catch (err) {
        console.error('Lỗi khi truy vấn dữ liệu:', err);
      }
    };

    // Tự động thực hiện tìm kiếm khi trang được tải
    window.onload = function() {
      findData(searchValue);
    };

	} else {

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
	}
