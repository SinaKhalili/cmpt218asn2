var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var exists = 0;

var server = http.createServer();
server.on('request', function(req, res) {

  console.log('request:', req.url);
  var urlObj = url.parse(req.url, true); // true => query turned into an obj
  if(urlObj.query.lname){
    console.log(urlObj.query.lname);
  }
  if (req.method === 'GET' && req.url === '/'){
    console.log("so here we are");
    res.writeHead(302,{
      'Location': 'http://localhost:8080/form.html'//path.join(__dirname, 'form.html')
    });
    res.end();
  }
  else if (req.method === 'GET' && req.url.match('/users.html')){
    let objo;
    let datter;
    let scripting = "";
    http.get('http://localhost:8080/data/users.json',(toadstool)=>{

    if(fs.existsSync(path.join(__dirname, 'data/users.json'))){
      fs.readFile(path.join(__dirname, 'data/users.json'),(err,data)=>{
        if(err) throw err;
        if(data){
          console.log("reading json: ");
        //  data = data.trim();
          datter = data.toString();
          objo = JSON.parse(data);
          console.log("ABOUT TO LOG DATTER");
          scripting = 'var objo = '+datter+';console.log(objo);'+`\
          var tableau = document.createElement("table");\
          var rowler = tableau.insertRow(-1);\
          var cols = ["fname","lname","bday","email"];\
          for(var j = 0; j<cols.length;j++){\
            let headler = document.createElement("th");\
            console.log(cols[j]);\
            headler.innerHTML = cols[j];\
            rowler.appendChild(headler);\
          }\
          for(var i = 1; i<objo.length;i++){\
            rowler = tableau.insertRow(-1);\

            for(var k=0; k<3;k++){\
              let celler = rowler.insertCell(-1);\
              if(objo[i][cols[k]]){\
                celler.innerHTML = objo[i][cols[k]];\
              }\
            }\
            let celler = rowler.insertCell(-1);\
            let emailsString = "";\
            for(var z = 0; z<objo[i]["email"].length; z++){\
              emailsString +=objo[i]["email"][z];\
              emailsString += "</br >";\
            }\
            celler.innerHTML = emailsString;\
          }\
          var money = document.getElementById("data");\
          money.innerHTML = "";\
          money.appendChild(tableau);`;
          //console.log(datter);
          var html = '<!DOCTYPE html>'
          + '<html><header>' + '<meta charset="utf-8">'+'<link rel="stylesheet" href="style.css">'+ '</header><body>' + "<h1>Users Data Table!</h1><div id='data'></div>" + '<script type="text/javascript" >'+scripting+'</script>'+'</body></html>';
          res.writeHead(200, {"Content-Type": "text/html"});
          res.write(html);//0"<!DOCTYPE html>
          res.end()
        }
    //  objo = JSON.parse(data);
      });
    }
  });
  }
  else if (req.method === 'GET' && req.url.match('data/users.json')){

    console.log("Received get request for users.json")
    if(fs.existsSync(path.join(__dirname, 'data/users.json'))){
      console.log("JSON already exists");
    }
    else{
      console.log("file does not exist yet");
      fs.appendFile('data/users.json',"[{}]", (err)=>{
        if(err) throw err;
        console.log("Created new file and put in just an empty JSON");
      });

    }
    var jsonpath = path.join(__dirname, req.url);
    var jsonstream = fs.createReadStream(jsonpath, {highWaterMark: 1024});
    res.writeHead(200, {"Content-Type": "application/json"});
    jsonstream.pipe(res);

  }
  else if (req.method === 'GET' && req.url.match(/^\/.+\.html$/)) {
    var filepath = path.join(__dirname, req.url);

    fs.readFile(filepath, function(err, contents) {
      if (err) {
        // handle error
      } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(contents);
        res.end();
      }

    });

  }

   else if (req.method === 'GET' && req.url.match(/^\/.+\.jpg$/)) {
    var imgpath = path.join(__dirname, req.url);
    var imgstream = fs.createReadStream(imgpath, {highWaterMark: 1024});
    res.writeHead(200, {"Content-Type": "image/jpeg"});
    imgstream.pipe(res);

  } else if (req.method === 'GET' && req.url.match(/^\/.+\.css$/)) {
    var csspath = path.join(__dirname, req.url);
    var cssstream = fs.createReadStream(csspath, {highWaterMark: 1024});
    res.writeHead(200, {"Content-Type": "text/css"});
    cssstream.pipe(res);

  } else if (req.method === 'GET' && req.url.match(/^\/.+\.js$/)) {
    var jspath = path.join(__dirname, req.url);
    var jsstream = fs.createReadStream(jspath, {highWaterMark: 1024});
    res.writeHead(200, {"Content-Type": "text/css"});
    jsstream.pipe(res);

  } else if (req.method === 'GET' && req.url.match(/^\/.+\.json$/)) {
    var jsonpath = path.join(__dirname, req.url);
    var jsonstream = fs.createReadStream(jsonpath, {highWaterMark: 1024});
    res.writeHead(200, {"Content-Type": "application/json"});
    jsonstream.pipe(res);

  } else if (req.method === 'GET' && req.url.match(/^\/.+\.woff$/)) {
    var woffpath = path.join(__dirname, req.url);
    var woffstream = fs.createReadStream(woffpath, {highWaterMark: 1024});
    res.writeHead(200, {"Content-Type": "font/woff"});
    woffstream.pipe(res);
  } else if (req.method === 'POST'){// && req.url.match(/^\/.+\.html$/)) {
    var body = '';
    req.on('data', function(data) {
      body += data.toString();
    });
    req.on('end', function() {

       let objjarrayy = "";
       console.log("About to send a get request to users.json");
       http.get('http://localhost:8080/data/users.json', (res)=>{
         res.on('data', function(chunk){
           objjarrayy+=chunk.toString();
         });
         console.log("sending get request to users.json");
         res.on('end', ()=>{
           console.log(objjarray);
           var objjarray = JSON.parse(objjarrayy);
           console.log("FINISHED send a get request to users.json");
           console.log(objjarray);

           var postObj = qs.parse(body);
           var mailz = postObj.mails.split(',');
           let k = 0;
           for(var i = 0; i<mailz.length; i++){
            if (mailz.length != 1) {
              var objj = {
                fname: postObj.fname[i],
                lname: postObj.lname[i],
                bday: postObj.bday[i],
                email: []
              };
            }
            else{
              var objj = {
                fname: postObj.fname,
                lname: postObj.lname,
                bday: postObj.bday,
                email: []
              };
            }
             for(var j=0;j<mailz[i];j++){
               if(mailz.length != 1){
                 objj.email.push(postObj.email[k]);
               }
               else{
                 objj.email.push(postObj.email);
               }
                 k++;
             }
             objjarray.push(objj);
           }
       //rooter=JSON.stringify(objj,null,2);
           console.log(JSON.stringify(objjarray,null,2));
       //rooter.slice(0,-1);rooter+="}";
            console.log("I am an idiot and got here way too early");
           fs.writeFile('data/users.json',JSON.stringify(objjarray,null,2), (err)=>{
             if(err) throw err;
             console.log("put submitted form in");
           });
         });
       });
      //console.log("HELLO " + mailz.length);
      res.writeHead(302, {Location: "/submitted.html"});
      res.end();
    });
  } else {
    res.writeHead(404);
    res.write('404 Error');
    res.end()
  }
});
server.listen(8080);


console.log('Magic is happening on port 8080');
