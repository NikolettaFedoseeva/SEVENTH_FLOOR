
const CLOUD_NAME = process.env.VUE_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET;

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary configuration is missing. Check VUE_APP_CLOUDINARY_CLOUD_NAME and VUE_APP_CLOUDINARY_UPLOAD_PRESET.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  // Optional: Add folder
  formData.append("folder", "seventh_floor_properties");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Image upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
