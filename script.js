var a = 1;
var formzy = document.getElementById("boxes");
var hidden = document.getElementById("changeMe");
var whichPage = document.getElementsByClassName("form-overlay");
var array = [1];
function swag(){
  hidden.value = array;
  var fnames = document.getElementsByClassName("fnames");
  for(let i = 0; i< fnames.length;i++){
    if(!(fnames[i].value)){
      alert("Please at least fill out a first name for every field");
      return;
    }
  }
    formzy.submit((form)=>{
  });
}
var butzo = document.getElementById("copyMe");
if(butzo){
  var butzo2 = butzo.cloneNode(true);
}

function deleteAtlieans(){
  if(confirm("Are you sure you want to delete all forms? Non submitted data will be lost")){
    var appendpoint = document.getElementById("appendPoint");
    appendpoint.innerHTML = "";
    var appendpoint1 = document.getElementById("appendPoint1");
    appendpoint1.innerHTML = "";
    formzy.reset();
    var boxes = document.getElementById("boxes");
    for(var k = 0; k<array[0]*array.length; k++){
      for(var i = 24; i<24+(10*array[0]); i++){
          if(boxes.childNodes[i] && boxes.childNodes[i].tagName === "DIV"){
            break;
          }
          if(boxes.childNodes[i] && boxes.childNodes[i].id !== "changeMe"){
            boxes.childNodes[i].remove();
          }
      }
    }
    a = 1;
    array = [1];
  }
  else{}
}
//console.log(butzo2);
function sup(butt){

  var btn = document.createElement("BUTTON");
  if(Number(butt.id)){
    array[Number(butt.id)-1]++;
  }
  else{
    array[0]++;
  }
  //console.log(butt); // its shorthand for button

  var boxes = document.getElementById("boxes");
  var appendpoint1 = document.getElementById("appendPoint1");
  for (var i = 16; i < 23; i++) {
    var clone = boxes.childNodes[i].cloneNode(true);
    clone.value = "";
    clone.innerHTML = "Other emails";
    if (butt.nextSibling) {
       butt.parentNode.insertBefore(clone, butt.nextSibling);
     } else {
      butt.parentNode.appendChild(clone);
    }
  }
//console.log("hi");
}
function hi() {
  a++;
  array.push(1);
  var boxes = document.getElementById("boxes");
  var appendpoint = document.getElementById("appendPoint");
  var btn = document.createElement("H1");        // Create a <button> element
  var t = document.createTextNode("Form " + a.toString());
  btn.appendChild(t);
  appendPoint.appendChild(btn);
  console.log(btn);

  for(var i = 0; i < 22; i++){
    var clone = boxes.childNodes[i].cloneNode(true);
    clone.value = "";
    appendPoint.appendChild(clone);
  }
  var cloneButzo = butzo2.cloneNode(true);
  cloneButzo.id = a.toString();
  appendPoint.appendChild(cloneButzo);

}
