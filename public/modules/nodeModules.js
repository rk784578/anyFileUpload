
const request = require('request'),
 shortUrl = require('node-url-shortener'),
 express = require('express'),
 XLSX = require('xlsx'),
 multer = require('multer'),
 path = require('path'),
 cfenv = require('cfenv'),
 bodyParser = require('body-parser'),
 nodemailer = require('nodemailer'),
 crypto = require('crypto'),
 NodeCouchDb = require('node-couchdb'),
 fs = require('fs'),
 cmd=require('node-cmd');

 //SEOChecker = require('advanced-seo-checker');


module.exports ={
    request:request,
    shortUrl:shortUrl,
    express:express,
    XLSX:XLSX,
    multer:multer,
    path:path,
    cfenv:cfenv,
    bodyParser:bodyParser,
    nodemailer:nodemailer,
    crypto:crypto,
    NodeCouchDb:NodeCouchDb,
    cmd:cmd,
    fs:fs,
    MongoClient:require('mongodb').MongoClient
       
    //SEOChecker:SEOChecker

};