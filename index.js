#!/usr/bin/env node

const fs = require("fs");

let arguments = process.argv.splice(2);


let flags =[];
let filenames = [];
let secondArgs = [];

for(let i of arguments)
{
    if(i.charAt(0) == '-')
    {
        flags.push(i);
    }
    else if(i[0] == "%")
    {
        let vb = i.slice(1);
       secondArgs.push(vb);
      
    }
    else{
        filenames.push(i);
    }
}

// if(flags.length==0)
// {
//     for(let file of filenames)
//     {
//         console.log(fs.readFileSync(file,"utf-8"));
//     }
// }
// else{
//     for(let flag of flags)
//     {
//         if(flag == "-rs")
//         {
//             for(let file of filenames){
//                 let fileData = fs.readFileSync(file,"utf-8");
//                 console.log(fileData.split(" ").join(""));
//             }
//         }
//     }
// }
for(let file of filenames)
{
    let fileData = fs.readFileSync(file,"utf-8");
for(let flag of flags)
{
      if(flag == "-rs")
      {
          fileData = fileData.split(" ").join("");
      }
      else if(flag == "-rn")
      {
          fileData = fileData.split("\r\n").join("");
      }
      else if(flag == "-rsc")
      {
        for(let args of secondArgs)
        {
            fileData = fileData.split(args).join("");
        }
      }
      else if(flag == "-s")
      {
         fileData =  addSequence(fileData).join("\r\n");
      }
      else if(flag == "-sn")
      {
        fileData =  removeExtraLine(fileData).join("\r\n");
         fileData =  addSequenceFn(fileData).join("\r\n");
      }
      else if(flag == "-rel")
      {
         fileData =  removeExtraLine(fileData).join("\r\n");
      }
      else if(flag == "-rel1")
      {
         fileData =  removeExtraLine1(fileData).join("\r\n");
      }


}
console.log(fileData);
}


function addSequence(content)
{
    let contentArr = content.split("\r\n");
    for(let i=0;i<contentArr.length;i++)
    {
        contentArr[i] = (i+1) + " " + contentArr[i];
    }
    return contentArr;
}

function addSequenceFn(content)
{
    let contentArr = content.split("\r\n");
    let count =1;
    for(let i=0;i<contentArr.length;i++)
    {
        if(contentArr[i]!="")
        {
        contentArr[i] = count + " " + contentArr[i];
        count ++;
        }
    }
    return contentArr;
}

function removeExtraLine(content)
{
    let contentArr = content.split("\r\n");
    let res =[];
    for(let i of contentArr)
    {
        if(i != "")
        {
            res.push(i);
        }
    }
    return res;
}

function removeExtraLine1(content)
{
    let contentArr = content.split("\r\n");
    let res =[];
    for(let i=0;i< contentArr.length;i++)
    {
        if(contentArr[i] == ""&& contentArr[i-1] == "")
        {
            contentArr[i] = null;
        }
        if(contentArr[i] == "" && contentArr[i-1] == null)
        {
            contentArr[i] = null;
        }
    }
    for(let i of contentArr)
    {
        if(i!=null)
        {
            res.push(i);
        }
    }
    return res;
}
