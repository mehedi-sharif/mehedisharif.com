import React, { useState, useRef } from "react";

const ImageUploader = ({ onImageSelect, onPreviewUrlChange, value }) => {
  const [width] = useState(800);
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;
    processImage(imageFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    if (!imageFile) return;
    processImage(imageFile);
  };

  const processImage = (imageFile) => {
    onImageSelect(imageFile);

    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onload = (event) => {
      const imageUrl = event.target.result;

      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio = width / image.width;
        canvas.width = width;
        canvas.height = image.height * ratio;

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const newImageUrl = canvas.toDataURL("image/jpeg", 0.98);
        setPreviewUrl(newImageUrl);

        if (onPreviewUrlChange) {
          onPreviewUrlChange(newImageUrl);
        }

        const imageFileWithActualName = urlToFile(imageFile.name, newImageUrl);
        onImageSelect(imageFileWithActualName);
      };
    };
  };

  const urlToFile = (filename, url) => {
    const arr = url.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const data = atob(arr[1]);
    const n = data.length;
    const dataArr = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
      dataArr[i] = data.charCodeAt(i);
    }

    return new File([dataArr], filename, { type: mime });
  };

  return (
    <div
      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-5 cursor-pointer transition duration-300 hover:border-gray-400"
      onClick={() => inputRef.current.click()}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label className="text-lg text-gray-600 mb-2">
        {value ? "Click or drag and drop to update the image" : "Click or drag and drop an image here"}
      </label>
      <input
        type="file"
        ref={inputRef}
        accept=".jpg, .jpeg, .png"
        onChange={handleImageChange}
        className="hidden"
      />
      {(previewUrl || value) && (
        <img
          src={previewUrl || value}
          alt="Preview"
          className="w-15 rounded-md mt-4"
        />
      )}
    </div>
  );
};

export default ImageUploader;