import axios from "axios";

// We can store this API_KEY in .env file for more security
export const IMAGEBB_API_KEY = "469fff8015669cd1aa336f0850a0e9ba";
const REQ_URL = `https://api.imgbb.com/1/upload?key=${IMAGEBB_API_KEY}`;

const uploadImage = async (imageToUpload) => {
  const formData = new FormData();
  formData.append("image", imageToUpload);
  try {
    const response = await axios({
      method: "POST",
      url: REQ_URL,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

export default uploadImage;
