// Replace this with your exact Cloud Name from your Cloudinary Dashboard
const CLOUDINARY_CLOUD_NAME = "dxjztwln3"; 
const CLOUDINARY_UPLOAD_PRESET = "aadshi_presets"; 

export const uploadProductImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const data = await response.json();
    return data.secure_url; // This returns the real, optimized live image link!
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};