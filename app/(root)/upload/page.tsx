"use client";

import FormField from "@/app/components/FormField";
import FileInput from "@/app/components/FileInput";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE, visibilities } from "@/constants";
import { useFileInput } from "@/lib/hooks/userFileInputs";
import { getThumbnailUploadUrl, getVideoUploadUrl, saveVideoDetails } from "@/lib/actions/video";
import { access } from "fs";
import { getVideoDuration } from "@/lib/utils";

const uploadFileToBunny = (
  file: File,
  uploadUrl: string,
  accessKey: string
): Promise<void> => {
  return fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      AccessKey: accessKey,
    },
    body: file,
  }).then((response) => {
    if (!response.ok) throw new Error("Upload failed");
  });
};

const page = () => {
  const video = useFileInput(MAX_VIDEO_SIZE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    if (video.duration !== null || 0){
      setVideoDuration(video.duration);
    }
  }, 
  [video.duration]
  )

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    visibility: "public",
  });

  const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);


  const [error, setError] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // {
  //   title: "",
  //   description: "",
  //   visibility: "public",
  //   descriptions: 'abc'
  // }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      if (!video.file || !thumbnail.file) {
        setError("Please upload video and Thumbnail");

        return;
      }

      if (!formData.title || !formData.description) {
        setError("Please fill in all the details");
        return;
      }

      // 0 get upload url
      const {
        videoId,
        uploadUrl: videoUploadUrl,
        accessKey: videoAccessKey,
      } = await getVideoUploadUrl();

      if (!videoUploadUrl || !videoAccessKey)
        throw new Error("Failed to get video upload credentials");

      // 1. Upload the video to Bunny
      await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

      // Upload the thumbnail to DB
      const {
        uploadUrl: thumbnailUploadUrl,
        accessKey: thumbnailAccessKey,
        cdnUrl: thumbnailCdnUrl,
      } = await getThumbnailUploadUrl(videoId);

      if (!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl)
        throw new Error("Failed to get thumbnail upload credentials");

      // Attach Thumbnail
      await uploadFileToBunny(thumbnail.file, thumbnailUploadUrl, thumbnailAccessKey);

      // Create a new DB entry for the video details (urls, data)
      await saveVideoDetails({
        videoId,
        thumbnailUrl: thumbnailCdnUrl,
        ...formData,
        duration: videoDuration
      })

    } catch (error) {
      console.log("Error Submitting form: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>
      {error && <div className="error-field">{error}</div>}
      <form
        action="submit"
        className="rounded-20 shadow-20 gap-6 w-full flex flex-col px-5 py-7.5"
        onSubmit={handleSubmit}
      >
        <FormField
          id="title"
          label="Title"
          placeholder="Enter a clear and concise video title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <FormField
          id="description"
          label="Description"
          placeholder="Describe what this video is about"
          value={formData.description}
          as="textarea"
          onChange={handleInputChange}
        />
        <FileInput
          id="video"
          label="Video"
          accept="video/*"
          file={video.file}
          previewUrl={video.previewUrl}
          inputRef={video.inputRef}
          onChange={video.handleFileChange}
          onReset={video.resetFile}
          type="video"
        />

        <FileInput
          id="thumbnail"
          label="Thumbnail"
          accept="video/*"
          file={thumbnail.file}
          previewUrl={thumbnail.previewUrl}
          inputRef={thumbnail.inputRef}
          onChange={thumbnail.handleFileChange}
          onReset={thumbnail.resetFile}
          type="video"
        />

        <FormField
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          as="select"
          options={[
            {
              value: "public",
              label: "Public",
            },
            {
              value: "private",
              label: "Private",
            },
          ]}
          onChange={handleInputChange}
        />

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? "Uploading..." : "Upload video"}
        </button>
      </form>
    </div>
  );
};

export default page;
