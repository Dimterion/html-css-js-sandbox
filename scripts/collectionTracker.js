document.addEventListener("DOMContentLoaded", function () {
  let items = [];
  let filteredItems = [];
  let editingIndex = -1;
  let sortConfig = { key: "number", direction: "asc" };
  let searchTerm = "";

  const tbody = document.getElementById("items-tbody");
  const addItemBtn = document.getElementById("add-item-btn");
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const itemCount = document.getElementById("item-count");
  const modalOverlay = document.getElementById("modal-overlay");
  const addItemForm = document.getElementById("add-item-form");
  const cancelModalBtn = document.getElementById("cancel-modal-btn");
  const importFileInput = document.getElementById("import-file-input");
  const exportJsonBtn = document.getElementById("export-btn");
  const exportPdfBtn = document.getElementById("export-pdf-btn");
  const exportCsvBtn = document.getElementById("export-csv-btn");

  function updateItemCount() {
    itemCount.textContent = `${filteredItems.length} of ${items.length} items`;
  }

  function filterItems() {
    if (!searchTerm.trim()) {
      filteredItems = [...items];
    } else {
      const term = searchTerm.toLowerCase();
      filteredItems = items.filter(
        (item) =>
          (item.giftedBy || "").toLowerCase().includes(term) ||
          (item.origin || "").toLowerCase().includes(term) ||
          (item.description || "").toLowerCase().includes(term)
      );
    }
    updateItemCount();
  }

  function sortItems() {
    filteredItems.sort((a, b) => {
      let aVal = a[sortConfig.key] || "";
      let bVal = b[sortConfig.key] || "";

      if (sortConfig.key === "date") {
        aVal = new Date(aVal).getTime() || 0;
        bVal = new Date(bVal).getTime() || 0;
      }

      if (sortConfig.key === "number") {
        aVal = parseFloat(aVal) || 0;
        bVal = parseFloat(bVal) || 0;
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  function renderHeaders() {
    const thead = document.querySelector("#items-table thead tr");
    thead.innerHTML = `
      <th class="sortable ${
        sortConfig.key === "number" ? sortConfig.direction : ""
      }" data-key="number">#</th>
      <th class="sortable ${
        sortConfig.key === "date" ? sortConfig.direction : ""
      }" data-key="date">Date</th>
      <th class="sortable ${
        sortConfig.key === "giftedBy" ? sortConfig.direction : ""
      }" data-key="giftedBy">Gifted by</th>
      <th class="sortable ${
        sortConfig.key === "origin" ? sortConfig.direction : ""
      }" data-key="origin">Origin</th>
      <th>Description</th>
      <th>Actions</th>
    `;

    document.querySelectorAll(".sortable").forEach((th) => {
      th.addEventListener("click", handleSort);
    });
  }

  function renderItems() {
    tbody.innerHTML = "";

    filteredItems.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.number ?? ""}</td>
        <td>${item.date ?? ""}</td>
        <td>${item.giftedBy ?? ""}</td>
        <td>${item.origin ?? ""}</td>
        <td>${item.description ?? ""}</td>
        <td class="actions-cell">
          <button class="edit-btn" data-index="${items.indexOf(
            item
          )}">Edit</button>
          <button class="delete-btn" data-index="${items.indexOf(
            item
          )}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", handleEdit);
    });
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", handleDelete);
    });
  }

  function updateView() {
    filterItems();
    sortItems();
    renderHeaders();
    renderItems();
  }

  function handleSort(e) {
    const key = e.currentTarget.dataset.key;
    if (sortConfig.key === key) {
      sortConfig.direction = sortConfig.direction === "asc" ? "desc" : "asc";
    } else {
      sortConfig.key = key;
      sortConfig.direction = "asc";
    }

    sortItems();
    renderItems();
    renderHeaders();
  }

  function handleSearch() {
    searchTerm = searchInput.value;
    updateView();
    clearSearchBtn.style.display = searchTerm ? "block" : "none";
  }

  function handleEdit(e) {
    const index = parseInt(e.target.dataset.index);
    editingIndex = index;

    const item = items[index];
    addItemForm.number.value = item.number || "";
    addItemForm.date.value = item.date || "";
    addItemForm.giftedBy.value = item.giftedBy || "";
    addItemForm.origin.value = item.origin || "";
    addItemForm.description.value = item.description || "";

    document.querySelector(".modal h2").textContent = "Edit item";
    openModal();
  }

  function handleDelete(e) {
    const index = parseInt(e.target.dataset.index);
    if (confirm(`Delete item #${items[index].number || index + 1}?`)) {
      items.splice(index, 1);
      updateView();
    }
  }

  function openModal() {
    modalOverlay.classList.remove("hidden");
  }

  function closeModal() {
    modalOverlay.classList.add("hidden");
    addItemForm.reset();
    document.querySelector(".modal h2").textContent = "Add new item";
    editingIndex = -1;
  }

  addItemForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(addItemForm);
    const updatedItem = {
      number: formData.get("number"),
      date: formData.get("date"),
      giftedBy: formData.get("giftedBy"),
      origin: formData.get("origin"),
      description: formData.get("description"),
    };

    if (editingIndex >= 0) {
      items[editingIndex] = updatedItem;
    } else {
      items.push(updatedItem);
    }

    updateView();
    closeModal();
  });

  addItemBtn.addEventListener("click", openModal);
  cancelModalBtn.addEventListener("click", closeModal);
  searchInput.addEventListener("input", handleSearch);
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchTerm = "";
    updateView();
    clearSearchBtn.style.display = "none";
  });

  renderHeaders();
  renderItems();

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

        items = parsed.map((item) => ({
          id: crypto.randomUUID(),
          number: Number(item.number) || "",
          date: item.date || "",
          giftedBy: item.giftedBy || "",
          origin: item.origin || "",
          description: item.description || "",
        }));

        updateView();
      } catch (err) {
        console.error("Import error:", err);
        alert("Could not import data from this file. Ensure it is valid JSON.");
      } finally {
        importFileInput.value = "";
      }
    };
    reader.readAsText(file);
  });

  exportJsonBtn.addEventListener("click", () => {
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

  exportPdfBtn.addEventListener("click", () => {
    const element = document.createElement("div");
    element.innerHTML = `
      <h1>Collection (${filteredItems.length} items)</h1>
      <table style="width: 99%; border-collapse: collapse; border: 1px solid #ccc;">
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
          ${filteredItems
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

  exportCsvBtn.addEventListener("click", () => {
    const headers = ["#", "Date", "Gifted by", "Origin", "Description"];
    const csv = [
      headers.join(","),
      ...filteredItems.map((item) =>
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
});
