// requried modules 
let requriedNodeModules = require('./public/modules/nodeModules.js');
  



// create a new express server
var app = requriedNodeModules.express();

// serve the files out of ./public as our main files
app.use(requriedNodeModules.express.static(__dirname + '/public'));
app.use(requriedNodeModules.bodyParser.urlencoded({
  extended: true
 

}));

//our Angular code is sending JSON data, but your Express app is parsing it as URL encoded data.
app.use(requriedNodeModules.bodyParser.json({
  
}));

// get the app environment from Cloud Foundry
var appEnv = requriedNodeModules.cfenv.getAppEnv();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
  next();
});

// remove the  # in the route 
app.get('/', function (req, res) {
  res.sendfile('index.html');
});




// this for removing the path # in the route ....
app.get('/*', function (req, res) {
  res.sendFile(requriedNodeModules.path.join(__dirname + '/public/index.html'));
});




//Fetch based on Employee email

app.post('/getEmployeeDetails', (req, res) => {
   var db = "uploadanyregisterandlogin";
  var URL = "https://0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix:ca3a681531d5df5688329b77cc2140cb83e00c312f7be03daed61b0a93ef6e11@0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix.cloudant.com/" +
             db+ '/' + "_design/uploadAny/_search/fetchBasedOnEmployeeEmail?" + 'query=employeeEmail:\"' + req.body._id +'\"' + '&include_docs=true';
  //console.log(URL);    
requriedNodeModules.request({
  uri:URL,
  method:"GET"
},(err,response,body)=>{
   
 
   if(err){
   // res.send(err);
  }else{
    let parseData = JSON.parse(body);
    //console.log(body);
    //console.log("####",parseData.total_rows);
    if(parseData.total_rows ==  0){
      res.send('0');
      console.log('if');
    }
    else{
      console.log('else');
      res.send(JSON.parse(body));
    }
    
  }
})

  
           
});



//Fetch based on Employee email

app.post('/storeReg', (req, res) => {
   var db = "uploadanyregisterandlogin";
  var URL = "https://0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix:ca3a681531d5df5688329b77cc2140cb83e00c312f7be03daed61b0a93ef6e11@0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix.cloudant.com/" +
             db+ '/';
requriedNodeModules.request({
  uri:URL,
  method:"POST",
  json:req.body
},(err,response,body)=>{
   

       if(err){
   res.send(err);
  }else{
    console.log(response.statusCode,response.statusMessage)
    res.status(200).send('Created');
    
  }
})

  
  //res.end();           
});

app.post('/getUnactivatedData', (req, res) => {
   var db = "uploadanyregisterandlogin";
  var URL = "https://0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix:ca3a681531d5df5688329b77cc2140cb83e00c312f7be03daed61b0a93ef6e11@0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix.cloudant.com/" +
             db+ '/_all_docs?include_docs=true';
requriedNodeModules.request({
  uri:URL,
  method:"GET"
},(err,response,body)=>{
   //console.log(body);
   var rows = [];
    if (err) {
      
    }

    var rowsObject = JSON.parse(body);
    //console.log('Big ASS',rowsObject,response.statusCode);
    if(response.statusCode !== 404){
      for (var i = 0; i < rowsObject.rows.length; i++) {
        if (!(rowsObject.rows[i].doc._id.includes("_design"))) {
  
          rows.push(rowsObject.rows[i].doc);
        }
  
      }
      
    }

  //console.log(rows);
  res.send(rows);  
    
})

  
  //res.end();           
});

// update the loagin user from super admin/1
app.post('/updateLoginUser', (req, res) => {
 var db = "uploadanyregisterandlogin";
  var URL = "https://0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix:ca3a681531d5df5688329b77cc2140cb83e00c312f7be03daed61b0a93ef6e11@0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix.cloudant.com/" +
             db+ '/' + req.body._id;
     //console.log(URL);        
   
   
   requriedNodeModules.request({
  uri:URL,
  method:"PUT",
  json: req.body
},(err,response,body)=>{
   

   if(err){
   res.send(err);
  }else{
    console.log(response.statusCode,response.statusMessage)
    res.status(201).send('Updated');
    
  }
})          
});

//File Upload

function fileFilter (req, file, cb) {
    /*if (path.extname(file.originalname) !== ('.mp4') || ('.jpeg') || ('.png') ) {
      console.log('if');
        return cb(null, false);
    }else{
      console.log('else');
    cb(null, true);
  
    }*/
        cb(null, true);

    }


  let storage = requriedNodeModules.multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + requriedNodeModules.path.extname(file.originalname)) //Appending extension
  }
})

var upload = requriedNodeModules.multer({ storage: storage ,fileFilter:fileFilter});


app.post('/upload', upload.single('VideoToUpload'), function(req, res) {
    //console.log('File here',req.file);
    //console.log("upload Data", {uploadFile:req.file, date: convertDateToInteger(new Date()), type: "upload",message:req.body.message, subject:req.body.subject, district:req.body, timestamp:dateAndTime(new Date()) 
//})

   var db = "uploadanyregisterandlogin";
  var URL = "https://0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix:ca3a681531d5df5688329b77cc2140cb83e00c312f7be03daed61b0a93ef6e11@0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix.cloudant.com/" +
             db+ '/';
             
requriedNodeModules.request({
  uri:URL,
  method:"POST",
  json: {uploadFile:req.file, date: convertDateToInteger(new Date()), type: "upload",message:req.body.message, subject:req.body.subject, district:req.body.district, name:req.body.name,
          mobileNumber:req.body.mobileNumber,designation:req.body.designation,empID:req.body.empID,email:req.body.email, timestamp:dateAndTime(new Date())} 
},(err,response,body)=>{
   

       if(err){
   
  }else{
    console.log(response.statusCode,response.statusMessage)
    
    
  }
})

  
  //res.end();           

    //console.log(req.params);
    //res.send("uploading your file.");
    if (req.file) {
        console.log("successfully received");
        res.send({success: "success"});
    }
    //return res.end();
});


  var dateAndTime = function(){
  var currentdate = new Date();
  var datetime = currentdate.getDate() + "/" +
    (currentdate.getMonth() + 1) + "/" +
    currentdate.getFullYear() + " @ " +
    currentdate.getHours() + ":" +
    currentdate.getMinutes() + ":" +
    currentdate.getSeconds();
    //console.log(dateAndTime);

    return datetime;
}


   function convertDateToInteger(data){
        if(data == undefined || data == null || data ==""){
            return Number();

        }else{


        var dateToConvert = new Date(data);
        // month should return with a leading zero incase of single digit number
        var month = (dateToConvert.getMonth() + 1) <= 9 ? '0' + (dateToConvert.getMonth() + 1) : (dateToConvert.getMonth() + 1);
        var day = dateToConvert.getDate() <= 9 ? '0' + dateToConvert.getDate() : dateToConvert.getDate();
        var formattedDate = dateToConvert.getFullYear().toString() + month + day;
        return Number(formattedDate); //This will convert the date string into number, in order to store in database
        }
    };

    //url = url + '&query=dateRange:[' + startDate + ' TO ' + endDate + ']' 
 
 // report Data 
  app.post('/getUploadData', (req, res) => {
   var db = "uploadanyregisterandlogin/";
   var date = convertDateToInteger(req.body.date);
   console.log(date);
  var URL = "https://0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix:ca3a681531d5df5688329b77cc2140cb83e00c312f7be03daed61b0a93ef6e11@0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix.cloudant.com/" +
              //'_design/logisticsDesign/_search/logisticsRecordsByType?query=logisticsType:\"Import\"&include_docs=true'            
             db + '_design/uploadAny/_search/fetchBasedOnDate?query=date:[' + date + ' TO ' + date + ']' + '&include_docs=true';
     console.log(URL);        
requriedNodeModules.request({
  uri:URL,
  method:"GET"
},(err,response,body)=>{
   //console.log(body);
   
    if (err) {
     res.send(err); 
    }

    var rowsObject = JSON.parse(body);
  //console.log(rowsObject);
  res.send(rowsObject);  
    
})

  
  //res.end();           
});

// start server on the specified port and binding host
// This is for local testing  
app.listen(appEnv.port, '0.0.0.0', function () {
  // this is for prod ctrl un comment and push 
//app.listen(80, '120.138.9.151', function() { 
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});