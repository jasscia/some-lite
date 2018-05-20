const path=require('path');
const express = require('express');
const fs = require('fs');
const AdmZip = require('adm-zip');


var fspath=path.join(__dirname,'../resume.docx')
var new_fspath=path.join(__dirname,'../resume.txt')
var text='';
fs.stat(fspath,(err,status)=>{
  if(err){
    console('stat err:',err);
  }
  readDocx(fspath,new_fspath)
  fs.readFile(new_fspath,'utf-8',(err,data)=>{
    if(err){
      console('read err:',err);
    }
    text=data
  })
})
var app = express();
app.get('/', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*')
  res.send(text);
});
app.listen(3000,()=>{console.log('start')});


function readDocx(fspath,new_fspath){
  const zip = new AdmZip(fspath); 
  let contentXml = zip.readAsText("word/document.xml");
  let str = "";
  contentXml .match(/<w:t>[\s\S]*?<\/w:t>/ig).forEach((item)=>{
    str += item.slice(5,-6)});
    fs.writeFile(new_fspath,str,(err)=>{//将./2.txt替换为你要输出的文件路径
      if(err)throw err;
    });
}
