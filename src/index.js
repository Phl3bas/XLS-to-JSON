let selectedFile;
const fileUpload = document.querySelector("#fileUpload");
const btn = document.querySelector("#btn");
const copy = document.querySelector("#copy");
const clear = document.querySelector("#clear");

clear.addEventListener("click", () => {
  fileUpload.value = "";
  document.querySelector("code").innerHTML = "";
});

fileUpload.addEventListener("change", e => {
  selectedFile = e.target.files[0];

  console.log(e.target.files);
});

btn.addEventListener("click", () => {
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = e => {
      let data = e.target.result;
      let workbook = XLSX.read(data, {
        type: "binary"
      });
      workbook.SheetNames.forEach(sh => {
        let row = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sh]);
        let json = JSON.stringify(row, null, 2);
        document.querySelector("code").innerHTML = json;
      });
    };
    reader.readAsBinaryString(selectedFile);
  }
});

copy.addEventListener("click", () => {
  const content = document.querySelector("code").innerHTML;
  copyToClipBoard(content);
});

function copyToClipBoard(str) {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
