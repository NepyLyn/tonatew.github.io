const etiquetasPath = "Etiquetas/";
var iframe = null;

// ------------Message handler, used to cumunicate with the ifram because cors
window.onmessage = function (event) {
  console.log("Message from the iframe:");
  console.log(event.data);
};

// ---------------Functions to the iframe-----------
function setText(event, elementId) {
  if (iframe && iframe.contentWindow) {
    //let dataToSend = { value: event.target.value, target:elementId};
    //Format to message => postMessage({funName: String functionName, data: Object arguments}, *)
    iframe.contentWindow.postMessage(
      {
        funName: "changeInnerHTML",
        arguments: { target: elementId, htmlText: event.target.value },
      },
      "*"
    );
    //iframe.contentWindow.postMessage(dataToSend, "*");
  }
}

function setEtiquetaColors(hexColor) {
  if (iframe && iframe.contentWindow) {
    //let dataToSend = { value: event.target.value, target:elementId};
    //Format to message => postMessage({funName: String functionName, data: Object arguments}, *)
    iframe.contentWindow.postMessage(
      {
        funName: "changeColors",
        arguments: { color: hexColor },
      },
      "*"
    );
    //iframe.contentWindow.postMessage(dataToSend, "*");
  }
}
function setBarcode(barcodeName) {
  if (iframe && iframe.contentWindow) {
    //let dataToSend = { value: event.target.value, target:elementId};
    //Format to message => postMessage({funName: String functionName, data: Object arguments}, *)
    iframe.contentWindow.postMessage(
      {
        funName: "changeBarcode",
        arguments: { fileName: barcodeName },
      },
      "*"
    );
    console.log("Sent PostMessage");
    //iframe.contentWindow.postMessage(dataToSend, "*");
  }
}

function saveLabel() {
  if (iframe && iframe.contentWindow) {
    //let dataToSend = { value: event.target.value, target:elementId};
    //Format to message => postMessage({funName: String functionName, data: Object arguments}, *)
    iframe.contentWindow.postMessage(
      {
        funName: "saveToImage",
        arguments: "",
      },
      "*"
    );
    //iframe.contentWindow.postMessage(dataToSend, "*");
  }
}

// ---------------Normal Functions------------------
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function mixColors(colorsArray) {
  if (colorsArray.length == 0) {
    console.log("No ingredients chosen, returning black: 000000");
    return "000000";
  }
  //ChosenJustOneIngredient
  else if (colorsArray.length == 1) {
    console.log(
      `Just one ingredient, returning the selected color: "${colorsArray[0]}"`
    );
    return colorsArray[0];
  }
  //Chosen 2 or more ingredients
  else {
    console.log(`Mixing this colors: ${colorsArray}`);
    //Color rgb Array
    rgbColors = new Array();
    colorsArray.forEach((color) => {
      rgbColors.push(hexToRgb(color));
    });
    //Sum
    let sum = [0, 0, 0];
    rgbColors.forEach((element) => {
      sum[0] += element.r;
      sum[1] += element.g;
      sum[2] += element.b;
    });
    console.log(`Sum: ${sum}`);
    //Norm
    let norm = Math.sqrt(
      Math.pow(sum[0], 2) + Math.pow(sum[1], 2) + Math.pow(sum[2], 2)
    );
    console.log(`Norm: ${norm}`);
    //Result in rgb [r,g,b]/norm*255 (int)
    rr = Math.round((sum[0] / norm) * 255);
    rg = Math.round((sum[1] / norm) * 255);
    rb = Math.round((sum[2] / norm) * 255);
    //Convert to hex
    let finalHex = rgbToHex(rr, rg, rb);
    console.log(`Final Hex Color: ${finalHex}`);
    return finalHex;
  }
}

function changeEtiqueta() {
  var selectedEtiqueta = document.getElementById("etiquetaSelect").value;

  //Change iframe Content
  //The path is the etiquetasPath + "Etiqueta " + selectedEtiqueta + .html
  const path = etiquetasPath + "Etiqueta " + selectedEtiqueta + ".html";
  console.log(`Loaded html file of "${selectedEtiqueta}"`);
  iframe.src = path;

  //Change iframe size and ifo
  iframe.style.width = `${sizes[selectedEtiqueta][0]}cm`;
  iframe.style.height = `${sizes[selectedEtiqueta][1]}cm`;
  document.getElementById("labelWidth").innerHTML = `${sizes[selectedEtiqueta][0]} cm`;
  document.getElementById("labelHeight").innerHTML = `${sizes[selectedEtiqueta][1]} cm`;
}

function changeEtiquetaColors() {
  ingredientLists = document.getElementsByClassName("ingredientsDropList");
  var choosenIngredients = [];
  for (let ingredientList of ingredientLists) {
    choosenIngredients.push(ingredientList.value);
  }
  //returning only the values that are different from "ninguno"
  var choosenIngredients = choosenIngredients.filter(function (
    value,
    index,
    arr
  ) {
    return value != "";
  });
  let finalColor = mixColors(choosenIngredients);
  //Changing frame, and product name colors in the iframe
  setEtiquetaColors(finalColor);
}

function loadIngredientList(dropLists) {
  for (let dropList of dropLists) {
    for (const [key, value] of Object.entries(ingredients)) {
      var option = document.createElement("option");
      option.innerHTML = key;
      option.value = value;
      dropList.appendChild(option);
      //console.log(key, value);
    }

    dropList.setAttribute("onchange", "changeEtiquetaColors()");
  }
}

function loadBarcodeList(barcodeNameSelect) {
  barcodeNames.forEach((element) => {
    var option = document.createElement("option");
    option.innerHTML = element;
    option.value = element;
    barcodeNameSelect.appendChild(option);
  });

  //dropList.setAttribute("onchange", "changeBarcode()");
}

function changeBarcode() {
  var selectedBarcode = document.getElementById("barcodeNameSelect").value;
  var barcodePreview = document.getElementById("barcodeImg");

  barcodePreview.src = "/Codigos Barra/" + selectedBarcode + ".png";
  if (selectedBarcode != "") {
    barcodePreview.src = "/Codigos Barra/" + selectedBarcode + ".png";
  } else {
    barcodePreview.src = "Resources/barcode.gif";
  }
  setBarcode(selectedBarcode);
}

document.addEventListener("DOMContentLoaded", () => {
  iframe = document.getElementById("labelFrame");
  loadIngredientList(document.getElementsByClassName("ingredientsDropList"));
  loadBarcodeList(document.getElementById("barcodeNameSelect"));
  changeEtiqueta();
  changeBarcode();
});
