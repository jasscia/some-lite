
  var grid = document.getElementsByClassName("grid")[0];
  var fragment = document.createDocumentFragment();
  for (let i = 0; i < 60; i++) {
    let newGrid = grid.cloneNode(true);
    let node = document.createElement('li');
    node.innerHTML = i;
    node.setAttribute("style", "transform:rotate(" + 6 * i + "deg)");
    if (!(i % 5)) {
      node.setAttribute("class", "main")    
}
    fragment.appendChild(node);
  }
  grid.appendChild(fragment);