const sizes = {
  //Name (width, height)
  "Circular Chica": [4, 4],
  "Circular Grande": [6, 6],
  "Desodorante Chica": [3, 4],
  "Desodorante Grande": [4, 5.5],
  Jabones: [6, 4],
  Liquidos: [5, 7],
  "Shampoo Ruda": [5, 7.5],
};

const pageSizes = {
  //cm [width, height]
  carta: { width: 21.6, height: 27.9 },
};

//cm
const margin = 0.2;

function changeSizeDescription() {
  var selectedEtiqueta = document.getElementById("etiquetaSelect").value;

  document.getElementById(
    "labelWidth"
  ).innerHTML = `${sizes[selectedEtiqueta][0]} cm`;
  document.getElementById(
    "labelHeight"
  ).innerHTML = `${sizes[selectedEtiqueta][1]} cm`;
}

function calcLabels(pageSize, labelSize) {
  //Portrait
  columns = Math.floor((pageSize.width - 2 * margin) / labelSize.width);
  rows = Math.floor((pageSize.height - 2 * margin) / labelSize.height);
  let portraitCount = columns * rows;
  //Landscape
  columns = Math.floor((pageSize.height - 2 * margin) / labelSize.width);
  rows = Math.floor((pageSize.width - 2 * margin) / labelSize.height);
  let landscapeCount = columns * rows;
  return Math.max(portraitCount, landscapeCount);
}

function fillPage(image) {
  let selectedEtiqueta = document.getElementById("etiquetaSelect").value;
  let labelWidth = sizes[selectedEtiqueta][0];
  let labelHeight = sizes[selectedEtiqueta][1];

  //Margin in mm
  let numLabels = calcLabels(pageSizes.carta, {
    width: labelWidth,
    height: labelHeight,
  });

  let page = document.getElementById("printArea");
  for (i = 0; i < numLabels; i++) {
    var newImage = document.createElement("img");
    //Format
    newImage.src = image;
    newImage.setAttribute("class", "imageItem");
    newImage.style.width = `${labelWidth}cm`;
    newImage.style.height = `${labelHeight}cm`;

    page.appendChild(newImage);
  }
}

function loadImage(event) {
  var tgt = event.target || window.event.srcElement,
    files = tgt.files;

  if (FileReader && files && files.length) {
    var fr = new FileReader();
    fr.onload = function () {
      //Set the preview
      var preview = document.getElementById('labelPreview')
      preview.src = fr.result;
      //Clean visualizer
      document.getElementById("printArea").innerHTML = "";
      document.getElementById("labelPreview").innerHTML = "";
      //Fill visualizer
      fillPage(fr.result);
    };
    fr.readAsDataURL(files[0]);
  }

  // Not supported
  else {
    // fallback -- perhaps submit the input to an iframe and temporarily store
    // them on the server until the user's session ends.
  }
}

function printLabels() {
  var divContents = document.getElementById("printArea").innerHTML;
  var printWindow = window.open("", "");
  printWindow.document.write("<html><head><title>Imprimir</title>");
  printWindow.document.write("</head><body >");
  printWindow.document.write(divContents);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
}
