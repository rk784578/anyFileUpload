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
app.use(requriedNodeModules.bodyParser.json({}));

// get the app environment from Cloud Foundry
var appEnv = requriedNodeModules.cfenv.getAppEnv();

// cross platform form 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
  // Middle ware call stack 
  // This will excuit next  ready event in the stack
  next();
});

// remove the  # in the route 
app.get('/', function (req, res) {
  res.sendfile('index.html');
});


// Get utilites 
const utilities = require('./backend/utilities.js');
// rest calls 
const restCalls = require('./backend/restCalls.js');

/**
 * Change all the cloudant DB to the  Local mongo DB 
 * With proper security logins creds
 * Use helmat
 * Get API from ENV  
 * 
 */

// Fetch Config Data
const config = require('./backend/config.js');

// URL + DB 
const DB = config.CLOUDANT_DATA_BASE;
let URL = config.CLOUDANT_URL + DB;

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
  restCalls.cloudRest(URL + '/aftsLicenceVijayawada/', "GET", " ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let parse_Body = result;
      let handle_Data;
      if (parse_Body.validateUpTo == utilities.convertDateToInteger(new Date())) {
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
      // send status
      app.post('/dontKnow', (req, res) => {
        res.send(handle_Data)
      })
    }
  })
});

/**
 * 1.Sotre registered user Data 
 * 2.Fetch the login data based on the username / email id ( reset password)
 * 3.Super Admin Login 
 * 4.Update data in the database
 * 5.Upload Images / Store
 * 6.Report Data
 */

app.post('/storeReg', (req, res) => {
  restCalls.insert(config.LOCAL_HOST, config.LOCAL_DATA_BASE, config.LOCAL_DATA_BASE_COLLECTION, req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send('Created');
    }
  })
  // res.end();
});
//Fetch based on Employee email
app.post('/getEmployeeDetails', (req, res) => {
  /**
 ----------------------------------------------------
    Switch the url here to fetch the data from 
 ----------------------------------------------------
  -- From one if login fetch from user ID 
  -- IF its from reset change userID to email Id fetch the data
 
 */

  let JSON_DATA = {};
  (req.body.value == "forgotPass") ? JSON_DATA['email'] = req.body._id : JSON_DATA['_id'] = req.body._id;

  restCalls.findOne(config.LOCAL_HOST, config.LOCAL_DATA_BASE, config.LOCAL_DATA_BASE_COLLECTION, JSON_DATA, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result !== null) {
        if (result.contact == "login") {
          res.send(result);
        }
      } else {
        res.send("0");
      }
    }
  })
});

// Super admin data get all records from data base 
app.post('/getUnactivatedData', (req, res) => {

  restCalls.getAll(config.LOCAL_HOST,
    config.LOCAL_DATA_BASE,
    config.LOCAL_DATA_BASE_COLLECTION,
    '',
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        //console.log('TOTAL_Results', result);
        res.send(result);
      }
    })
  //res.end();           
});

// update the loagin user from super admin/1
app.post('/updateLoginUser', (req, res) => {

  // console.log(req.body);
  restCalls.updateData(config.LOCAL_HOST,
    config.LOCAL_DATA_BASE,
    config.LOCAL_DATA_BASE_COLLECTION,
    req.body,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        console.log("update", result);
        res.status(201).send('Updated');
      }

    });
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

  let data = {
    uploadFile: req.files, date: utilities.convertDateToInteger(new Date()),
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
    timestamp: utilities.dateAndTime(new Date())
  };



  restCalls.insert(config.LOCAL_HOST,
    config.LOCAL_DATA_BASE,
    config.LOCAL_DATA_BASE_COLLECTION,
    data, (err, result) => {

      if (err) {
        console.log('error ...... ', err);
      } else {
        if (req.files) {
          console.log(" >>>>>Inside if  Successfully received <<<<<<");
          res.send({ success: "success" });
          // res.end();  
        }
        console.log("req.body.filesCount >>>>>>>>>>>>>> ", req.body.filesCount);
      }
    })
});


// report Data 
app.post('/getUploadData', (req, res) => {

  var Date_For_Match = utilities.convertDateToInteger(req.body.date);

  restCalls.getAll(config.LOCAL_HOST,
    config.LOCAL_DATA_BASE,
    config.LOCAL_DATA_BASE_COLLECTION,
    '',
    (err, result) => {
      if (err) {
        res.send(err);
      } else {

        let data = [];
        for( let i=0;i<result.length;i++){
          if(result[i].type == "upload"){
            data.push(result[i]);  
          }   
        }
        //console.log('TOTAL_Results', result);
        res.send(data);
      }
    })

 
});

// start server on the specified port and binding host
// This is for local testing  
//app.listen(appEnv.port, '0.0.0.0', function () {
// this is for prod ctrl un comment and push 
app.listen(80, '0.0.0.0', function () {
  // print a message when the server starts listening

  console.log("server starting on " + appEnv.url);
});















