import DropzoneComponent from "@/components/Dropzone";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";

const page = async () => {
  const { userId } = auth()
  const docResults = await getDocs(collection(db, 'users', userId!, 'files'))

  const skeletonFile: FileType[] = docResults.docs.map((doc) => ({
    id: doc.id,
    fileName: doc.data().fileName || doc.id,
    fullName: doc.data().fullName,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    downloadUrl: doc.data().downloadUrl,
    type: doc.data().type,
    size: doc.data().size
  }))

  console.log(skeletonFile)

  return (
    <div>
      <DropzoneComponent />
    </div>
  );
};

export default page;
