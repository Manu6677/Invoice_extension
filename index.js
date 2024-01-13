document.getElementById("btnPrint").addEventListener("click", function () {
  // Dynamic stylesheet URL
  const bootstrapCDN =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

  // Create a link element for the stylesheet
  const stylesheetLink = document.createElement("link");
  stylesheetLink.rel = "stylesheet";
  stylesheetLink.href = bootstrapCDN;

  // Append the link element to the dynamicStylesheet div
  document.getElementById("cont").appendChild(stylesheetLink);

  setTimeout(() => {
    printPage();
  }, 100);
});

let table = document.getElementById("btnAdd");
table.addEventListener("click", addrow, { passive: true });

var Item;
var Rate;
var Quantity;
var Price;
var DeleteButton;
let totalAmount = 0;
function addrow() {
  var mytable = document.getElementById("mytable");
  var rows = mytable.rows.length;
  var r = mytable.insertRow(rows);
  var c0 = r.insertCell(0);
  var c1 = r.insertCell(1);
  var c2 = r.insertCell(2);
  var c3 = r.insertCell(3);
  var c4 = r.insertCell(4);

  var cellPadding = "6px";
  var cellHeight = "35px";
  var borderRadius = "4px";
  c0.style.padding = cellPadding;
  c1.style.padding = cellPadding;
  c2.style.padding = cellPadding;
  c3.style.padding = cellPadding;
  c4.style.padding = cellPadding;

  var rate;
  var total;
  var priceperitem = 0;

  Item = document.createElement("input");
  Rate = document.createElement("input");
  Quantity = document.createElement("input");
  Price = document.createElement("span");
  DeleteButton = document.createElement("button");

  Item.type = "text";
  Rate.type = "number";
  Quantity.type = "number";

  Item.style.height = cellHeight;
  Rate.style.height = cellHeight;
  Quantity.style.height = cellHeight;

  Item.style.borderRadius = borderRadius;
  Rate.style.borderRadius = borderRadius;
  Quantity.style.borderRadius = borderRadius;

  // Add thin gray border to input fields
  Item.style.border = "1px solid #808080";
  Rate.style.border = "1px solid #808080";
  Quantity.style.border = "1px solid #808080";

  DeleteButton.textContent = "X";
  DeleteButton.addEventListener("click", () => deleteRow(r));
  Item.setAttribute("id", "item" + rows);

  Rate.style.width = "60px";
  Quantity.style.width = "60px";
  DeleteButton.style.backgroundColor = "white";
  DeleteButton.style.borderRadius = "5px";
  DeleteButton.style.color = "black";
  DeleteButton.style.border = "none";
  DeleteButton.style.paddingLeft = "13px";
  DeleteButton.style.paddingRight = "13px";
  DeleteButton.style.paddingTop = "6px";
  DeleteButton.style.paddingBottom = "6px";
  DeleteButton.style.border = "2px solid black";
  DeleteButton.style.fontWeight = "bold"; // Make the text bold

  Rate.setAttribute("id", "rate" + rows);
  Rate.addEventListener("input", () => {
    rate = document.getElementById("rate" + rows).value;
    cal();
  });

  Quantity.setAttribute("id", "qty" + rows);
  Quantity.addEventListener("input", () => {
    total = document.getElementById("qty" + rows).value;
    cal();
  });

  function cal() {
    if (total != null && rate != null) {
      priceperitem = rate * total;
      Price.textContent = "$" + priceperitem;

      totalAmount += priceperitem;
      document.getElementById("totalAmount").textContent = "$" + totalAmount;
    }
  }

  function deleteRow(row) {
    // Subtract the deleted item's price from totalAmount
    totalAmount -= parseFloat(Price.textContent.substring(1));
    //update
    document.getElementById("totalAmount").textContent = "$" + totalAmount;
    mytable.deleteRow(row.rowIndex);
  }

  c0.appendChild(DeleteButton);
  c1.appendChild(Item);
  // var dollarSign = document.createTextNode("$");
  // c2.appendChild(dollarSign);
  c2.appendChild(Rate);
  c3.appendChild(Quantity);
  c4.appendChild(Price);

  const item1Id = document.getElementById("item1");
  item1Id?.addEventListener("input", (event) => {
    item1Id.setAttribute("value", event.target.value);
  });

  const qty1Id = document.getElementById("qty1");
  qty1Id?.addEventListener("input", (event) => {
    qty1Id.setAttribute("value", event.target.value);
  });

  const rate1Id = document.getElementById("rate1");
  rate1Id?.addEventListener("input", (event) => {
    rate1Id.setAttribute("value", event.target.value);
  });

  const item2Id = document.getElementById("item2");
  item2Id?.addEventListener("input", (event) => {
    item2Id.setAttribute("value", event.target.value);
  });

  const qty2Id = document.getElementById("qty2");
  qty2Id?.addEventListener("input", (event) => {
    qty2Id.setAttribute("value", event.target.value);
  });

  const rate2Id = document.getElementById("rate2");
  rate2Id?.addEventListener("input", (event) => {
    rate2Id.setAttribute("value", event.target.value);
  });

  const item3Id = document.getElementById("item3");
  item3Id?.addEventListener("input", (event) => {
    item3Id.setAttribute("value", event.target.value);
  });

  const qty3Id = document.getElementById("qty3");
  qty3Id?.addEventListener("input", (event) => {
    qty3Id.setAttribute("value", event.target.value);
  });

  const rate3Id = document.getElementById("rate3");
  rate3Id?.addEventListener("input", (event) => {
    rate3Id.setAttribute("value", event.target.value);
  });

  const item4Id = document.getElementById("item4");
  item4Id?.addEventListener("input", (event) => {
    item4Id.setAttribute("value", event.target.value);
  });

  const qty4Id = document.getElementById("qty4");
  qty4Id?.addEventListener("input", (event) => {
    qty4Id.setAttribute("value", event.target.value);
  });

  const rate4Id = document.getElementById("rate4");
  rate4Id?.addEventListener("input", (event) => {
    rate4Id.setAttribute("value", event.target.value);
  });
}

const pdf = document.getElementById("downloadPdf");

pdf.addEventListener("click", () => {
  // Get the content of the popup
  const popupContent = document.getElementById("cont"); // Replace with the actual ID of your popup content

  // Use html2canvas to capture the content as an image
  html2canvas(popupContent, { scale: 1.1 }).then(function (canvas) {
    // Convert the image to a data URL
    const imgData = canvas.toDataURL("image/png", 1.0);

    // Create a new jsPDF instance
    const pdf = new window.jspdf.jsPDF();

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0);

    // Download the PDF
    pdf.save("invoice.pdf");
  });
});

function printPage() {
  const printContent = document
    .getElementsByClassName("container")
    .item(0).innerHTML;

  const printWindow = window.open("", "_blank");
  printWindow.document.write("<html><head></head><body>");
  printWindow.document.write(printContent);
  printWindow.document.write("</body></html>");
  printWindow.document.close();

  printWindow.print();
}

const inputInvoiceCompanyFrom = document.getElementById("invoice-company-from");
inputInvoiceCompanyFrom.addEventListener("input", (event) => {
  inputInvoiceCompanyFrom.setAttribute("value", event.target.value);
});

const invoiceFromEmail = document.getElementById("invoice-from-email");
invoiceFromEmail.addEventListener("input", (event) => {
  invoiceFromEmail.setAttribute("value", event.target.value);
});

const invoiceAddress1From = document.getElementById("invoice-address1-from");
invoiceAddress1From.addEventListener("input", (event) => {
  invoiceAddress1From.setAttribute("value", event.target.value);
});

const invoiceAddress2From = document.getElementById("invoice-address2-from");
invoiceAddress2From.addEventListener("input", (event) => {
  invoiceAddress2From.setAttribute("value", event.target.value);
});

const invoiceAddress3From = document.getElementById("invoice-address3-from");
invoiceAddress3From.addEventListener("input", (event) => {
  invoiceAddress3From.setAttribute("value", event.target.value);
});

const invoicePhoneFrom = document.getElementById("invoice-phone-from");
invoicePhoneFrom.addEventListener("input", (event) => {
  invoicePhoneFrom.setAttribute("value", event.target.value);
});

const invoiceTo = document.getElementById("invoice-to");
invoiceTo.addEventListener("input", (event) => {
  invoiceTo.setAttribute("value", event.target.value);
});

const invoiceEmailTo = document.getElementById("invoice-email-to");
invoiceEmailTo.addEventListener("input", (event) => {
  invoiceEmailTo.setAttribute("value", event.target.value);
});

const invoiceAddress1To = document.getElementById("invoice-address1-to");
invoiceAddress1To.addEventListener("input", (event) => {
  invoiceAddress1To.setAttribute("value", event.target.value);
});

const invoiceAddress2To = document.getElementById("invoice-address2-to");
invoiceAddress2To.addEventListener("input", (event) => {
  invoiceAddress2To.setAttribute("value", event.target.value);
});

const invoiceAddress3To = document.getElementById("invoice-address3-to");
invoiceAddress3To.addEventListener("input", (event) => {
  invoiceAddress3To.setAttribute("value", event.target.value);
});

const invoicePhoneTo = document.getElementById("invoice-phone-to");
invoicePhoneTo.addEventListener("input", (event) => {
  invoicePhoneTo.setAttribute("value", event.target.value);
});

const invoiceNumber = document.getElementById("invoice-number");
invoiceNumber.addEventListener("input", (event) => {
  invoiceNumber.setAttribute("value", event.target.value);
});

const invoiceReference = document.getElementById("invoice-reference");
invoiceReference.addEventListener("input", (event) => {
  invoiceReference.setAttribute("value", event.target.value);
});

const invoiceDate = document.getElementById("invoice-date");
invoiceDate.addEventListener("input", (event) => {
  invoiceDate.setAttribute("value", event.target.value);
});
