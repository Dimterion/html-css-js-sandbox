let items = [];

const tbody = document.getElementById("items-tbody");
const addItemBtn = document.getElementById("add-item-btn");
const modalOverlay = document.getElementById("modal-overlay");
const addItemForm = document.getElementById("add-item-form");
const cancelModalBtn = document.getElementById("cancel-modal-btn");
const importFileInput = document.getElementById("import-file-input");
const exportBtn = document.getElementById("export-btn");

function renderItems() {
  tbody.innerHTML = "";
  items.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.number ?? ""}</td>
      <td>${item.date ?? ""}</td>
      <td>${item.giftedBy ?? ""}</td>
      <td>${item.origin ?? ""}</td>
      <td>${item.description ?? ""}</td>
    `;
    tbody.appendChild(tr);
  });
}

function openModal() {
  modalOverlay.classList.remove("hidden");
}

function closeModal() {
  modalOverlay.classList.add("hidden");
  addItemForm.reset();
}

addItemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addItemForm);

  const newItem = {
    number: formData.get("number"),
    date: formData.get("date"),
    giftedBy: formData.get("giftedBy"),
    origin: formData.get("origin"),
    description: formData.get("description"),
  };

  items.push(newItem);
  renderItems();
  closeModal();
});

importFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const text = event.target.result;
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) {
        alert("Imported JSON is not an array.");
        return;
      }
      items = parsed;
      renderItems();
    } catch (err) {
      console.error("Import error:", err);
      alert("Could not import data from this file. Ensure it is valid JSON.");
    } finally {
      importFileInput.value = "";
    }
  };
  reader.readAsText(file);
});

exportBtn.addEventListener("click", () => {
  const json = JSON.stringify(items, null, 2);
  const blob = new Blob([json], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "collection.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
});

addItemBtn.addEventListener("click", openModal);
cancelModalBtn.addEventListener("click", closeModal);

renderItems();

const exportPdfBtn = document.getElementById("export-pdf-btn");

exportPdfBtn.addEventListener("click", () => {
  const element = document.createElement("div");
  element.innerHTML = `
    <h1>Collection</h1>
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc;">
      <thead>
        <tr style="background: #f3f4f6;">
          <th style="border: 1px solid #ccc; padding: 8px;">#</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Date</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Gifted by</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Origin</th>
          <th style="border: 1px solid #ccc; padding: 8px;">Description</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">${
              item.number ?? ""
            }</td>
            <td style="border: 1px solid #ccc; padding: 8px;">${
              item.date ?? ""
            }</td>
            <td style="border: 1px solid #ccc; padding: 8px;">${
              item.giftedBy ?? ""
            }</td>
            <td style="border: 1px solid #ccc; padding: 8px;">${
              item.origin ?? ""
            }</td>
            <td style="border: 1px solid #ccc; padding: 8px;">${
              item.description ?? ""
            }</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  const opt = {
    margin: 10,
    filename: "collection.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(element).save();
});

const exportCsvBtn = document.getElementById("export-csv-btn");

exportCsvBtn.addEventListener("click", () => {
  const headers = ["#", "Date", "Gifted by", "Origin", "Description"];
  const csv = [
    headers.join(","),
    ...items.map((item) =>
      [
        item.number ?? "",
        item.date ?? "",
        item.giftedBy ?? "",
        item.origin ?? "",
        item.description ?? "",
      ]
        .map((field) => `"${field}"`)
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "collection.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
