import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileUploader = async (localFilePath) => {
  const response = await cloudinary.uploader.upload(localFilePath, {
    resource_type: "auto",
  });
  fs.unlinkSync(localFilePath);
  return response;
};

//   try {
//     console.log(localFilePath);
//     // if (!localFilePath) return null;

//     // const response = await cloudinary.uploader.upload(localFilePath, {
//     //   resource_type: "auto",
//     // });

//     console.log("File Uploaded Successfuly at URL", response.url);

//     // fs.unlinkSync(localFilePath);
//     // return response;
//   } catch (error) {
//     console.log("error uploading file");
//     if (fs.existsSync(localFilePath)) {
//       fs.unlinkSync(localFilePath);
//     }
//   }
// };
export { fileUploader };
