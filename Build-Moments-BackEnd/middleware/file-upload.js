const fs = require('fs');
const { S3 } = require('@aws-sdk/client-s3');

const config = {
	region: 'ap-south-1',
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY | 'AKIA5ANNYP7DZ4HP6T6C',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY | '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'
	}
};

const client = new S3(config);

module.exports = (req, res, next) => {
    // console.log('req', req.body)
//   fs.readFile(fileName, (err, data) => {
//      if (err) throw err;
//      const params = {
//          Bucket: 'testBucket', // pass your bucket name
//          Key: 'contacts.csv', // file will be saved as testBucket/contacts.csv
//          Body: JSON.stringify(data, null, 2)
//      };
//      s3.upload(params, function(s3Err, data) {
//          if (s3Err) throw s3Err
//          console.log(`File uploaded successfully at ${data.Location}`)
//      });
//   });
//   next();
};
