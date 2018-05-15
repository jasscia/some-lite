
function Swiper(selctor){
  this.el= document.querySelector(selctor);
  let children = this.el.children;
  this.itemWidth=children[0].offsetWidth;
  let first=children[0].cloneNode(true);
  this.count =children.length;
  this.el.appendChild(first);
  this.currenIndex=0;
  this.transition="0.5s 1.5s linear"
  this.timer=null
  this.intial()
  this.scrolling()
}
Swiper.prototype.scollFn=function(way){
  this.orderNum[this.currenIndex].className="";
  if(way==="forward"){
    this.currenIndex-this.count+1 && this.currenIndex++;
  }
  if(way==="back"){
    this.currenIndex && this.currenIndex--;
  }
  if(!way){
    this.currenIndex++;
    if(this.currenIndex>=this.count){
        this.currenIndex=0;
    }
  }
  this.el.style.left=-(this.currenIndex*this.itemWidth)+"px"
  this.orderNum[this.currenIndex].className="current";
}
Swiper.prototype.intial=function(){
  this.el.style.width= (this.count+1)*this.itemWidth+'px';
  this.el.style.transition=this.transition;
  this.el.style.transition.prototype="left";
  this.orderNum=this.createOl()
  let [toLeft,toRight]=this.createContorler()
  this.toLeft=toLeft;
  this.toRight=toRight;
  this.orderNum.forEach(node => {
    node.style.transition=this.transition;
    node.style.transition.prototype="background";
  });

  this.el.style.left=-(this.currenIndex*this.itemWidth)+"px"
  this.orderNum[this.currenIndex].className="current"

  this.el.addEventListener('mouseover',()=>{
    clearInterval(this.timer)
    this.timer=null
  })
  this.el.addEventListener('mouseout',()=>{
    this.timer=setInterval(()=>this.scollFn(),2000)
  })
  this.toLeft.addEventListener('click',()=>{
    this.scollFn('back')
    clearInterval(this.timer)
    this.timer=null
  })
  this.toRight.addEventListener('click',()=>{
    this.scollFn('forward')
    clearInterval(this.timer)
    this.timer=null
  })
}
Swiper.prototype.scrolling=function(){
  this.timer=setInterval(()=>this.scollFn(),2000)
}
Swiper.prototype.createOl=function(){
  let fragment=document.createDocumentFragment()
  let ol=document.createElement("ol")
  ol.className="orderNum"
  for (let i=0;i<this.count;i++) {
    let li = document.createElement("li");// 创建li元素
    li.innerHTML = i + 1;// 给li里面添加文字  1 2 3 4 5
    ol.appendChild(li);// 将li元素添加到ol里面
  }
  this.el.parentNode.appendChild(fragment.appendChild(ol))
  return [].slice.call(ol.children)
}
Swiper.prototype.createContorler=function(){
  let fragment=document.createDocumentFragment()
  let toLeft=document.createElement('div')
  toLeft.className="toLeft"
  let toRight=document.createElement('div')
  toRight.className="toRight"
  fragment.appendChild(toLeft)
  fragment.appendChild(toRight)
  this.el.parentNode.appendChild(fragment)
  let res=[].concat(toLeft,toRight)
  return res
}
//业务代码
let scrolling=new Swiper('.container');
