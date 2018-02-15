var a = 1;
function hi() {
  a++;
  var boxes = document.getElementById("boxes");
  var appendpoint = document.getElementById("appendPoint");
  var btn = document.createElement("H1");        // Create a <button> element
  var t = document.createTextNode("Form " + a.toString());
  btn.appendChild(t);
  appendPoint.appendChild(btn);

  for(var i = 0; i < 24; i++){
    var clone = boxes.childNodes[i].cloneNode(true);
    clone.value = "";
    appendPoint.appendChild(clone);
  }

}
