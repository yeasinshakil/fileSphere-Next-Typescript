"use client";
import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";


const DropzoneComponent = () => {
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onabort = () => (console.log('File reading was aborted'))
      reader.onerror = () => console.log('File reading has failed');
      reader.onload = async () => {
        await uploadPost(file)
      }
      reader.readAsArrayBuffer(file)
    })
  }
  const uploadPost = async (selectedFile: File) => {
    if (loading) return
    if (!user) return
    setLoading(true)
    const toastId = toast.loading("Uploading...");
    // do what needs to be done
    const docRef = await addDoc(collection(db, 'users', user.id, 'files'), {
      userId: user.id,
      fileName: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size
    })

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)
    uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(imageRef);

      await updateDoc(doc(db, 'users', user.id, 'files', docRef.id), {
        downloadUrl: downloadUrl,
      })
    })
    toast.success("Uploaded Successfully", {
      id: toastId,
    });
    setLoading(false)
  }
  // file size max 20 mb
  const maxSize = 20971520;
  return (
    <Dropzone
      minSize={0}
      maxSize={maxSize}
      onDrop={onDrop}
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
