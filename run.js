import axios from "axios";
import FormData from "form-data";
import fs from "fs";

async function uploadFile(fileStream, filename) {
  let formData = new FormData();

  formData.append("fileupload", fileStream, {
    filename: filename,
    contentType: "text/plain",
  });
  formData.append("username", "");
  formData.append("apikey", "");

  return await axios
    .post("https://sdrive.app/api/v3/upload", formData, {
      headers: formData.getHeaders(), // Set headers from formData
    })
    .catch((error) => {
      const errorInfo = {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      };
      throw Error(JSON.stringify(errorInfo));
    })
    .then((response) => {
      return response.data;
    });
}

// Example usage
(async () => {
  const fileStream = fs.createReadStream("sdrive_logo.png");
  try {
    const response = await uploadFile(fileStream, "sdrive_logo.png");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
