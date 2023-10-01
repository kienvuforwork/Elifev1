"use client";

import { Fragment, useState, useRef } from "react";
import Modal from "./modal";
import Button from "../button";
import toast from "react-hot-toast";
const ImageUploadModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDisable, setIsDisable] = useState(false);
  const uploadAvatar = async () => {
    setIsDisable(true);
    if (selectedImage) {
      try {
        const avatar = await fetch(selectedImage as string).then((res) =>
          res.blob()
        );
        const formData = new FormData();
        formData.append("image", avatar);
        formData.append("type", "avatar");
        const response = await fetch("http://localhost:8080/user/update", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        setIsOpen(false);
        setSelectedImage(null);
        window.location.reload();
        toast.success("Avatar uploaded!");
        return;
      } catch (error) {
        toast.error("error");
      }
    }
    setIsDisable(false);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = () => {
    setIsOpen(true);
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const previewImage = document.querySelector(".image-preview img");
    const file = fileInput.files?.[0]; // Use optional chaining to handle potential null value

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        if (previewImage) {
          (previewImage as HTMLImageElement).src = reader.result as string;
        }
        setSelectedImage(reader.result);
      });

      reader.readAsDataURL(file);
    } else {
      if (previewImage) {
        (previewImage as HTMLImageElement).src = "";
      }
      setSelectedImage(null);
    }
  };
  function handleResetImage() {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  }

  const body = (
    <div className="flex flex-col items-center justify-center w-full">
      {selectedImage ? (
        <div className="image-preview flex items-center justify-center flex-col gap-6">
          <p className="text-elife-600 mt-4">You avatar will look like this</p>
          <img
            src={selectedImage as string}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-full"
          />
          <div className="flex gap-4">
            {" "}
            <Button
              onClick={handleResetImage}
              label="Change image"
              sm
            ></Button>{" "}
            <Button onClick={uploadAvatar} label="Upload avatar" sm></Button>{" "}
          </div>
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      )}
    </div>
  );
  return (
    <Fragment>
      <div
        className="cursor-pointer text-sm hover:text-elife-600 inline-block"
        onClick={onOpen}
      >
        Update Avatar
      </div>

      <Modal
        isOpen={isOpen}
        body={body}
        title={<div> Drop your avatar here!</div>}
        disabled={isDisable}
        onClose={onClose}
      ></Modal>
    </Fragment>
  );
};

export default ImageUploadModal;
