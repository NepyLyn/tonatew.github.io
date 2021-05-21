//Creation of the cursor inside the element selected
new emojiCursor({
  element: document.querySelector("#emoji"),
  emoji: ["🐟", "🍕", "❤️"],
});

const myPics = document.getElementById("emoji");
const stepMovPX = 10;
const threshold = 200;
var lastOrientation = "rigth";
anvImage = document.querySelector("#anvorguesito");

myPics.addEventListener("mousemove", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  updateAnvPosition(x, y);
});

function updateAnvPosition(x, y) {
  let anvImageWidth = parseInt(anvImage.width);
  let anvPos =
    parseInt(getComputedStyle(anvImage).marginLeft) + anvImageWidth / 2;
  let diff = x - anvPos;
  console.log();
  if (diff > threshold) {
    let oldMargin = parseInt(getComputedStyle(anvImage).marginLeft);

    let newMargin = oldMargin + stepMovPX;
    //anvImage.style.marginLeft = x - diff + "px";
    //
    //let newMargin = x;
    anvImage.style.marginLeft = newMargin + "px";
    if (lastOrientation != "right") {
        anvImage.style.transform = "scaleX(-1)";
      lastOrientation = "right";
    }
  }
  if (diff < -threshold) {
    let oldMargin = parseInt(getComputedStyle(anvImage).marginLeft);
    let newMargin = oldMargin - stepMovPX;
    anvImage.style.marginLeft = newMargin + "px";
    if (lastOrientation != "left") {
        anvImage.style.transform = "scaleX(1)";
      //flipHorizontally(anvImage);
      lastOrientation = "left";
    }
  }
}

function flipHorizontally(img) {
  img.style.transform = "scaleX(-1)";
}
