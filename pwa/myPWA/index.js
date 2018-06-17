const htr=function(url,method,data){
  return new Promise(function(resolve,reject){
    let request=new XMLHttpRequest();
    request.open(method,url);
    request.onreadystatechange=function(){
      if (request.readyState===4 && request.status===200){
        resolve()
      }
    };
    request.send(data)
  })
}
const requestTableList = async function(personCount,roundCount) {
  let url = `https://gzbtestsystem.cn/badminton/againsttable?NumberOfPeople=${personCount}&RoundsOfPerson=${roundCount}&format=json`;
  let method = "GET";
  let data={};
  let res=await htr(url,method,data);
  if(res.data.AgainstTable){
    return res.data.AgainstTable
  }
  if(res.data.ResponseStatus){
    // console.log(res.data.ResponseStatus.Message)
    return res.data.ResponseStatus.Message
  }
}

console.log('index.js')

// console.log(requestTableList(4,4))