import * as AWS from "aws-sdk";
import * as fs from "fs";
import * as path from "path";

const s3 = new AWS.S3();

const bucketName = "your-s3-bucket-name";
const localBuildPath = "dist"; // Adjust this based on your Vite build output
const remoteS3Path = "/";

const uploadDirectory = (localPath: string, remotePath: string): void => {
  const files = fs.readdirSync(localPath);

  files.forEach((file) => {
    const filePath = path.join(localPath, file);
    const fileContent = fs.readFileSync(filePath);

    const params: AWS.S3.Types.PutObjectRequest = {
      Bucket: bucketName,
      Key: `${remotePath}/${file}`,
      Body: fileContent,
      ContentType: "text/html", // Set the appropriate content type
    };

    s3.upload(params, (err) => {
      if (err) {
        console.error(`Error uploading ${file}:`, err);
      } else {
        console.log(`Successfully uploaded ${file}.`);
      }
    });
  });
};

// Run the deployment
uploadDirectory(localBuildPath, remoteS3Path);
