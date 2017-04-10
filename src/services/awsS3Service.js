const AWS = require('aws-sdk');
const fs = require('fs');
const { AWS_KEYS } = require('../config');

const S3Service = function(){
  this.bucketName;
  // S3 configuration object
  const s3Options = {
    apiVersion: '2006-03-01',
    accessKeyId: AWS_KEYS.accessKeyId,
    secretAccessKey: AWS_KEYS.secretAccessKey,
    region: "eu-west-1"
  };

  // create S3 instance with options from above
  const s3 = new AWS.S3(s3Options);


  // set current bucket
  this.setBucket = (bucketName) => {
    this.bucketName = bucketName;
  };

  // create a new s3 bucket
  this.createBucket = async () => {
    const bucketParams = {
      Bucket: this.bucketName
    };

    return await new Promise((resolve, reject) => {
      s3.createBucket(bucketParams, (err, data) => {
        if(err) reject(err);
        console.log('Bucket created');
        resolve(data);
      });
    });
  } // end init

  this.saveFile = async (putObjectParams) => {
    putObjectParams.Bucket = this.bucketName;
    try {
      return await new Promise((resolve, reject) => {
        s3.putObject(putObjectParams, (err, data) => {
          if(err) reject(err);
          resolve(data);
        });
      });
    } catch(e) {
      return new Error('Error saving file to S3, ' + e);
    }

  } // end this.saveFile

  // get file
  this.getFile = (objectParams) => {
    objectParams.Bucket = this.bucketName;
    return new Promise((resolve, reject) => {
      s3.getObject(objectParams, (err, data) => {
        if(err) reject(err);
        resolve(data);
      });
    });
  }

  // get the file url
  this.getFileUrl = (objectParams) => {
    objectParams.Bucket = this.bucketName;
    return new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', objectParams, (err, url) => {
        if(err) reject(err);
        resolve(url);
      });
    });
  }

}


module.exports = S3Service;
