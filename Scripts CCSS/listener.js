/*This script is used to modify the content of the iframe (labels) 
without violate the cross origin policy, this script must be implemented in every Etiqueta [].html*/

function changeText(elementID, description) {
  document.querySelector(elementID).textContent = description;
}

function changeColors(color) {
  document.getElementById("frame").style.borderColor = `#${color}`;
  document.getElementById("productName").style.color = `#${color}`;
}

function changeBarcode(image) {
  var barcodeImg = document.getElementById("barcodeImg");
  barcodeImg.setAttribute("src", image);
}

function saveAs(uri, filename) {
  var link = document.createElement("a");
  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;
    //Firefox requires the link to be in the body
    document.body.appendChild(link);
    //simulate click
    link.click();
    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

function download() {}

function saveToImage() {
  html2canvas(document.body, {
    scale: 8
    //foreignObjectRendering: true,
  }).then((canvas) => {
    var url = canvas.toDataURL();
    link = document.createElement('a')
    link.href = url
    link.download = "Etiqueta.png"
    link.click()

  });
}

function sayHi(event) {
  console.log("Messsage from the main page:");
  console.log(event.data.arguments);
  event.source.postMessage("World!");
}

// ------------Message handler, used to cumunicate with the iframe because cors
window.addEventListener(
  //event.data = {funName: String functionName, data: Object arguments}
  "message",
  function (event) {
    if (event.origin === window.location.origin) {
      console.log(event.data);
      //Do stuff wiith the data
      switch (event.data.funName) {
        //To change the description
        case "changeInnerHTML":
          changeText(
            event.data.arguments.target,
            event.data.arguments.htmlText
          );
          //document.querySelector(event.data.arguments.target).textContent = event.data.arguments.htmlText
          break;

        //To change the colors
        case "changeColors":
          changeColors(event.data.arguments.color);
          break;

        case "changeBarcode":
          changeBarcode(event.data.arguments.image);

        case "saveToImage":
          saveToImage();

        default:
          console.log("Not correct function name");
          break;
      }
      //document.querySelector(event.data.target).textContent = event.data.value
    }
  },
  false
);
