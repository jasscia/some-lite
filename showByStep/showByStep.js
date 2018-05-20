var text=`hi,my name is jassy,i come from china.
          i like coding and sport,
          i am a girl,i want to be your friend,
          how do you think about it?
          the end,thank you!`
var textDom=document.getElementById('text')
var innerText=textDom.innerHTML
text=text.split('')
length=text.length

let i=0;

function show(i){
    innerText+=text[i];
    textDom.innerHTML=innerText
}

step=function (){
  show(i)
  i++
  if(i<length){
    setTimeout(step,100);
  }
}
setTimeout(step,100)
