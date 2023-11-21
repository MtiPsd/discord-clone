"use client";
import { SingleImageDropzone } from "./SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
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

            await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                console.log(progress);
              },
            });

            onClose();
          }
        }}
      />
    </>
  );
}

export default FileUpload;
