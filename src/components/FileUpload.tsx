"use client";
import { SingleImageDropzone } from "./SingleImageDropzone";
import { useEdgeStore } from "@/src/lib/edgestore";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

function FileUpload({ onChange, value, endpoint }: FileUploadProps) {
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { edgestore } = useEdgeStore();
  // const fileType = value?.split(".").pop();

  if (value) {
    return (
      <div className="relative h-20 w-20">
        <Image fill alt="Upload" src={value} className="rounded-full" />

        <button
          onClick={() => onChange("")}
          className="absolute right-0 top-1 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  function onClose() {
    setFile(undefined);
    setIsSubmitting(false);
  }

  return (
    <>
      <SingleImageDropzone
        width={300}
        height={200}
        value={file}
        disabled={isSubmitting}
        onChange={async (file?: File) => {
          if (file) {
            setIsSubmitting(true);
            setFile(file);

            // upload to edgestore
            const res = await edgestore.publicImages.upload({
              file,
              // onProgressChange: (progress) => {
              //   console.log(progress);
              // },
            });

            // set url to input
            onChange(res?.url);
            onClose();
          }
        }}
      />
    </>
  );
}

export default FileUpload;
