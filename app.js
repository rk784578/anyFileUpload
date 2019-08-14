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
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
  next();
});

// remove the  # in the route 
app.get('/', function (req, res) {
  res.sendfile('index.html');
});

/**
 * URL / DB name 
 */

const config = require('./backend/config.js')
var db = "uploadanyregisterandlogin";
var URL = "https://0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix:ca3a681531d5df5688329b77cc2140cb83e00c312f7be03daed61b0a93ef6e11@0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix.cloudant.com/" +
  db + '/aftsLicenceVijayawada/';

/**
 * This for removing the path # in the route ....
 * Check the the licence is  enabled or not for the application 
 * That licence will be the  mapped to the server
 * Licence validation Too. 
 * Think for future  .pem file 
 * For read from env Varibale  matp to the data base that file   
 * --------------------------------------------------------------------------------
 * Licence Expire date send like notification to the browser  before 10 days.
 * ----------------------------------------------------------------------------------
 * Check one  == licence key  cloud / ENV 
 * 
 */

app.get('/*', function (req, res) {

  requriedNodeModules.request({
    uri: URL,
    method: "GET"
  }, (err, response, body) => {
    if (err) {
      console.log(err);
    }
    else {
      let parse_Body = JSON.parse(body);
      let handle_Data;
      if (parse_Body.validateUpTo == convertDateToInteger(new Date())) {
        res.send("Licence validalidation Expired.  ==> " + parse_Body.validateUpTo);
      }
      else if (process.env.PEM == parse_Body.licenceKey) {
        res.sendFile(requriedNodeModules.path.join(__dirname + '/public/index.html'));
        handle_Data = "1";
      } else {
        //res.send("Licence key is Need to access this application. ");
        res.sendFile(requriedNodeModules.path.join(__dirname + '/public/exceptionHandle.html'));
        handle_Data = "0"; 
      }
      app.post('/dontKnow',(req,res)=>{
        res.send(handle_Data)
      })


    }
  })
});



//Fetch based on Employee email

app.post('/getEmployeeDetails', (req, res) => {
  var db = "uploadanyregisterandlogin";
  var URL = "https://0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix:ca3a681531d5df5688329b77cc2140cb83e00c312f7be03daed61b0a93ef6e11@0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix.cloudant.com/" +
    db + '/' + "_design/uploadAny/_search/";

  /**
  ----------------------------------------------------
     Switch the url here to fetch the data from 
  ----------------------------------------------------
   -- From one if login fetch from user ID 
   -- IF its from reset change userID to email Id fetch the data
  
  */

  if (req.body.value == "forgotPass") {
    console.log(">> IF << ");

    URL = URL + "fetchForResetData?" + 'query=employeeEmail:\"' + req.body._id + '\"' + '&include_docs=true';


  } else {
    console.log(">>  Else << ")
    URL = URL + "fetchBasedOnEmployeeEmail?" + 'query=employeeEmail:\"' + req.body._id + '\"' + '&include_docs=true';


  }



  //console.log(URL);    
  requriedNodeModules.request({
    uri: URL,
    method: "GET"
  }, (err, response, body) => {
    if (err) {
      // res.send(err);
    } else {
      let parseData = JSON.parse(body);
      //console.log(body);
      //console.log("####",parseData.total_rows);
      if (parseData.total_rows == 0) {
        res.send('0');
        console.log('if');
      }
      else {
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
    db + '/';
  requriedNodeModules.request({
    uri: URL,
    method: "POST",
    json: req.body
  }, (err, response, body) => {


    if (err) {
      res.send(err);
    } else {
      console.log(response.statusCode, response.statusMessage)
      res.status(200).send('Created');

    }
  })


  //res.end();           
});

app.post('/getUnactivatedData', (req, res) => {
  var db = "uploadanyregisterandlogin";
  var URL = "https://0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix:ca3a681531d5df5688329b77cc2140cb83e00c312f7be03daed61b0a93ef6e11@0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix.cloudant.com/" +
    db + '/_all_docs?include_docs=true';
  requriedNodeModules.request({
    uri: URL,
    method: "GET"
  }, (err, response, body) => {
    //console.log(body);
    var rows = [];
    if (err) {

    }

    var rowsObject = JSON.parse(body);
    //console.log('Big ASS',rowsObject,response.statusCode);
    if (response.statusCode !== 404) {
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
    db + '/' + req.body._id;
  console.log(URL, req.body);


  requriedNodeModules.request({
    uri: URL,
    method: "PUT",
    json: req.body
  }, (err, response, body) => {


    if (err) {
      res.send(err);
    } else {
      console.log(response.statusCode, response.statusMessage)
      res.status(201).send('Updated');

    }
  })
});

//File Upload

function fileFilter(req, file, cb) {
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

    console.log("req.from  file count ", Number(req.body.filesCount));
    //console.log("req.from  title of the folder ", req.body.title);

    // store the 

    /**  
     * Storing the data  out side of the public folder beacuse we need only path no need to dusplay in the  data to the user 
     * This is for local system     
     * 
     * */

    let ftp_path_to_store;

    // stage ENV 
    let user_defined_path_to_store = 'upload';
    //  change the path directory here. 
    let path_directory = "C:/";

    // production ENV 
    //let user_defined_path_to_store = "//192.168.1.168/ftp1";

    // Title ( remove the sapces if the user enter the data with sapce remove those and give  single line code ).
    const title = req.body.title.replace(/\s+/g, "");

    //console.log(">> TITLE <<" , title);
    if (Number(req.body.filesCount) > 2) {

      let create_folder_path = 'mkdir ' + requriedNodeModules.path.join(path_directory + user_defined_path_to_store + '/' + title);
      // console.log(">> path to create the  folder << " ,create_folder_path );
      // requriedNodeModules.cmd.run(create_folder_path)

      requriedNodeModules.cmd.get(create_folder_path,
        (err, data, stderr) => {
          //  pass the proper path 
          let proper_path = user_defined_path_to_store + '/' + title;
          // console.log(">> proper path << ", proper_path);

          // integrate to the path and store
          ftp_path_to_store = requriedNodeModules.path.join(path_directory + proper_path);
          console.log(" folder created", proper_path);

          // store the path  
          cb(null, ftp_path_to_store);

        }
      );

    } else {


      ftp_path_to_store = requriedNodeModules.path.join(path_directory + user_defined_path_to_store);
      console.log(">> stored files with out createing the folder. <<", ftp_path_to_store);
      cb(null, ftp_path_to_store);

    }

  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Appending extension
  }
})

var upload = requriedNodeModules.multer({ storage: storage, fileFilter: fileFilter });


app.post('/upload', upload.array('VideoToUpload', 10), function (req, res) {


  console.log('at the time storing', req.body.message);
  //console.log("Upload", upload.array('VideoToUpload'));
  //console.log("upload Data", {uploadFile:req.file, date: convertDateToInteger(new Date()), type: "upload",message:req.body.message, subject:req.body.subject, district:req.body, timestamp:dateAndTime(new Date()) 
  //})



  var db = "uploadanyregisterandlogin";
  var URL = "https://0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix:ca3a681531d5df5688329b77cc2140cb83e00c312f7be03daed61b0a93ef6e11@0df2fcdc-86c0-43d3-baee-f9d5302ad598-bluemix.cloudant.com/" +
    db + '/';

  requriedNodeModules.request({
    uri: URL,
    method: "POST",
    json: {
      uploadFile: req.files, date: convertDateToInteger(new Date()),
      type: "upload",
      uploadFilesCount: req.body.filesCount,
      message: req.body.message,
      subject: req.body.title,
      district: req.body.district,
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      profile: req.body.profile,
      designation: req.body.designation,
      empID: req.body.empID,
      email: req.body.email,
      timestamp: dateAndTime(new Date())
    }
  }, (err, response, body) => {


    if (err) {

      console.log('error ...... ', err);
    } else {
      if (req.files) {
        console.log(" >>>>>Inside if  Successfully received <<<<<<");
        res.send({ success: "success" });
        // res.end();  
      }

      console.log("req.body.filesCount >>>>>>>>>>>>>> ", req.body.filesCount);
      // res.send(response.statusMessage)
      // res.end();
    }
  })




  //console.log(req.params);
  //res.send("uploading your file.");

  //return res.end();
});


var dateAndTime = function () {
  let dt = new Date();
  var h = dt.getHours(), m = dt.getMinutes();
  var _time = (h > 12) ? (h - 12 + ':' + m + ' PM') : (h + ':' + m + ' AM');

  //console.log(dateAndTime);

  return _time;
  //convertTime12to24(_time);
}

const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}




function convertDateToInteger(data) {
  if (data == undefined || data == null || data == "") {
    return Number();

  } else {


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
    uri: URL,
    method: "GET"
  }, (err, response, body) => {
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
//app.listen(appEnv.port, '0.0.0.0', function () {
// this is for prod ctrl un comment and push 
app.listen(80, '0.0.0.0', function () {
  // print a message when the server starts listening

  console.log("server starting on " + appEnv.url);
});



