"use client";
import { cn } from "@/lib/utils";
import Dropzone from "react-dropzone";

const DropzoneComponent = () => {
  // file size max 20 mb
  const maxSize = 20971520;
  return (
    <Dropzone
      minSize={0}
      maxSize={maxSize}
      onDrop={(acceptedFiles) => console.log(acceptedFiles)}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section>
            <div {...getRootProps()} className={cn(`w-full h-52 flex justify-center items-center border border-dashed rounded-lg text-center ${isDragActive ? "bg-blue-400 text-white animate-pulse" : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"}`)}>
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "drop to upload this file!"}
              {isDragReject && "File type not accepted, Sorry!!!"}
              {isFileTooLarge && (
                <p className="text-red-600 mt-2">File is too large!</p>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
};

export default DropzoneComponent;