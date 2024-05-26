document.addEventListener("DOMContentLoaded", function () {
    const addRowBtn = document.getElementById("addRowBtn");
    const addColumnBtn = document.getElementById("addColumnBtn");
    const deleteRowBtn = document.getElementById("deleteRowBtn");
    const deleteColumnBtn = document.getElementById("deleteColumnBtn");
    const excelTable = document.getElementById("excelTable");

    addRowBtn.addEventListener("click", function () {
        const newRow = excelTable.insertRow(-1);
        const rowNumber = excelTable.rows.length - 1;
        const headerCell = newRow.insertCell(0);
        headerCell.textContent = rowNumber;
        headerCell.setAttribute("contenteditable", "false");

        for (let i = 1; i < excelTable.rows[0].cells.length; i++) {
            const cell = newRow.insertCell(i);
            cell.setAttribute("contenteditable", "true");
        }
    });

    addColumnBtn.addEventListener("click", function () {
        for (let i = 0; i < excelTable.rows.length; i++) {
            const row = excelTable.rows[i];
            const cell = row.insertCell(-1);
            if (i === 0) {
                cell.textContent = String.fromCharCode(65 + excelTable.rows[0].cells.length - 1);
                cell.setAttribute("contenteditable", "false");
            } else {
                cell.setAttribute("contenteditable", "true");
            }
        }
    });

    deleteRowBtn.addEventListener("click", function () {
        if (excelTable.rows.length > 2) { // Ensure at least one row remains
            excelTable.deleteRow(-1);
        }
    });

    deleteColumnBtn.addEventListener("click", function () {
        if (excelTable.rows[0].cells.length > 2) { // Ensure at least one column remains
            for (let i = 0; i < excelTable.rows.length; i++) {
                excelTable.rows[i].deleteCell(-1);
            }
        }
    });

    excelTable.addEventListener("input", function (event) {
        const cell = event.target;
        if (cell.nodeName === "TD" && !isNaN(parseFloat(cell.textContent))) {
            calculateSum(cell);
        }
    });

    function calculateSum(updatedCell) {
        let sum = 0;
        const columnIndex = updatedCell.cellIndex;
        for (let i = 1; i < excelTable.rows.length; i++) {
            const cellValue = parseFloat(excelTable.rows[i].cells[columnIndex].textContent);
            if (!isNaN(cellValue)) {
                sum += cellValue;
            }
        }
        excelTable.rows[excelTable.rows.length - 1].cells[columnIndex].textContent = sum;
    }
});



// script.js

document.addEventListener("DOMContentLoaded", function () {
    const darkModeBtn = document.getElementById("darkModeBtn");

    // Inicializar el modo claro
    document.body.classList.add("light-mode");

    darkModeBtn.addEventListener("click", function () {
        toggleDarkMode();
    });

    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        document.body.classList.toggle("light-mode");
        const darkModeText = darkModeBtn.textContent === "Modo oscuro" ? "Modo claro" : "Modo oscuro";
        darkModeBtn.textContent = darkModeText;
    }
});
