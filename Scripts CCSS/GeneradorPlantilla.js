const pageSizes = {
  //cm [width, height]
  carta: { width: 21.59, height: 27.94 },
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
  portraitColumns = Math.floor((pageSize.width - 2 * margin) / labelSize.width);
  portraitRows = Math.floor((pageSize.height - 2 * margin) / labelSize.height);
  let portraitCount = portraitColumns * portraitRows;
  //Landscape
  landscapeColumns = Math.floor((pageSize.height - 2 * margin) / labelSize.width);
  landscapeRows = Math.floor((pageSize.width - 2 * margin) / labelSize.height);
  let landscapeCount = landscapeColumns * landscapeRows;

  let pageSetup;
  if (landscapeCount > portraitCount) { //Landscape
    pageSetup = { count: landscapeCount, orientation: "landscape" }
    console.log(pageSetup.orientation)
    console.log(`columns: ${landscapeColumns}`)
    console.log(`rows: ${landscapeRows}`)
    return pageSetup
  } else {  //Portrait
    pageSetup = { count: portraitCount, orientation: "portrait" }
    console.log(pageSetup.orientation)
    console.log(`columns: ${portraitColumns}`)
    console.log(`rows: ${portraitRows}`)
    return pageSetup
  }
}

function fillPage(image) {
  let selectedEtiqueta = document.getElementById("etiquetaSelect").value;
  let labelWidth = sizes[selectedEtiqueta][0];
  let labelHeight = sizes[selectedEtiqueta][1];

  //Margin in mm
  let numLabels = calcLabels(pageSizes.carta, {
    width: labelWidth,
    height: labelHeight,
  }).count;

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
      var preview = document.getElementById("labelPreview");
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

function saveAsPDF() {
  //page orientation and elements count calculation
  var element = document.getElementById("printArea");
  let selectedEtiqueta = document.getElementById("etiquetaSelect").value;
  let labelWidth = sizes[selectedEtiqueta][0];
  let labelHeight = sizes[selectedEtiqueta][1];

  let pageOrientation = calcLabels(pageSizes.carta, {
    width: labelWidth,
    height: labelHeight,
  }).orientation;
  console.log(pageOrientation)

  var opt = {
    margin: 0.2,
    filename: "Plantilla.pdf",
    image: { type: "png", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "cm", format: "letter", orientation: pageOrientation },
  };

  // New Promise-based usage:
  html2pdf().set(opt).from(element).save();
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
