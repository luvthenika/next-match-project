"use client";
import { Button } from "@nextui-org/react";
import { CldUploadButton } from "next-cloudinary";
import React from "react";

const ImageUploader = ({ addImage }) => {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={addImage}
      signatureEndpoint="/api/sign-image"
      uploadPreset="nm-demo"
      className=" bg-pink-300 text-white rounded p-3"
    >
      Upload new photo
    </CldUploadButton>
  );
};

export default ImageUploader;
