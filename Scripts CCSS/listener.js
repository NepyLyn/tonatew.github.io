/*This script is used to modify the content of the iframe (labels) 
without violate the cross origin policy, this script must be implemented in every Etiqueta [].html*/

function changeText(elementID, description){
  document.querySelector(elementID).textContent = description
}

function changeColors(){

}

window.addEventListener(
  //event.data = {funName: String functionName, data: Object arguments}
  "message",
  function (event) {
    if (event.origin === window.location.origin) {
        console.log(event.data)
        //Do stuff wiith the data
        switch (event.data.funName) {
          //To change the description
          case "changeInnerHTML":
            changeText(event.data.arguments.target, event.data.arguments.htmlText)
            //document.querySelector(event.data.arguments.target).textContent = event.data.arguments.htmlText  
            break;
        
          //To change the colors
          case "changeColors":
            document.getElementById("frame").style.borderColor = `#${event.data.arguments.color}`
            document.getElementById("productName").style.color = `#${event.data.arguments.color}`
            break
          default:
            console.log("Not correct function name")
            break;
        }
        //document.querySelector(event.data.target).textContent = event.data.value
    }
  },
  false
);
