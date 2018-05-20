
var text=`hi,my name is jassy,i come from china.
          i like coding and sport,
          i am a girl,i want to be your friend,
          how do you think about it?
          the end,thank you!`
function xhr(method,url,data={}){
  console.log('xhr fn')
  return new Promise(function(resolve,reject){
    console.log('promise pramse:',method,url,data)
    var ajax = new XMLHttpRequest();
    ajax.open(method,url,data);
    ajax.send();
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
            resolve(ajax.responseText)
      　　}
    }
  })
}
var text='';
var length=0;
var i=0;
var innerText='';
var textDom='';
async function start(){
  text=await xhr('GET','http://localhost:3000/')
  console.log('text:',text)
  textDom=document.getElementById('text')
  innerText=textDom.innerHTML
  length=text.length
}
start()

function show(i){
    innerText+=text[i];
    textDom.innerHTML=innerText
}

step=function (){
  show(i)
  i++
  if(i<length){
    setTimeout(step,20);
  }else{console.log('end')}
}
setTimeout(step,20)
