
  let container=document.querySelector('.lazy_load');
  let offsetTop_container=getOffsetData(container)[0];
  let img_list_tag=[];//维护图片列表的状态
  let img_list=[].slice.call(container.childNodes).filter(node=>{return node.nodeType===1});
  let img_num=img_list.length;
 
  img_list.forEach((img,key)=>{
    let [offsetTop,offsetBottom]=getOffsetData(img,container)//元素顶部、底部到container的距离
    offsetTop+=offsetTop_container
    offsetBottom+=offsetTop_container
    img_list_tag.push({//存储每个图片的信息
      img:img.querySelector('img'),//图片element
      index:key,
      loaded:false,
      offsetTop:offsetTop,//图片顶部到文档的距离
      offsetBottom:offsetBottom//图片底部到文档的距离
    })
  })
  window.addEventListener('scroll',debounce(Lazy_load,300))

  function debounce(fn,wait){
    let timer;
    return function(){
    var args = arguments;
    var context = this;
      if(timer){
        clearTimeout(timer);
      }
      timer=setTimeout(function(){
        fn.apply(context,args);
      },wait)
    }
  }
  function Lazy_load(){
      img_list_tag.forEach((item,key) => {//当元素的位置在height1和height2之间的时候 才进行加载
        let height1=window.scrollY;//height1标示 滚动距离 即表示：当前屏顶端到文档的距离
        let height2=height1+screen.availHeight;//height2 标示：当前屏幕底端 到文档的距离

        if((item.offsetTop>=height1 && item.offsetTop<=height2)||(item.offsetBottom>=height1 && item.offsetBottom<=height2)){
          item.img.src=item.img.getAttribute('data-src')
          item.loaded=true
        }
        img_list_tag=img_list_tag.filter(item=>{
          return !item.loaded
        })
      });
  }

  function getOffsetData(node,root){//获得元素到目标元素root的距离
    // let top=0;
    console.log(this)
    let result=[0,node.getBoundingClientRect().height]
    // let bottom=node.getBoundingClientRect().height;
    let topToParent=0;
    root=root||''
    while(node && node!=root){
      topToParent=node.offsetTop;
      result[0]+=topToParent;
      result[1]+=topToParent;
      node=node.offsetParent;
    }
    return result;
  }