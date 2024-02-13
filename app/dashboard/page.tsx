import DropzoneComponent from "@/components/Dropzone";
import TableWrapper from "@/components/table/TableWrapper";
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

  // console.log(skeletonFile)

  return (
    <div className="border-t">
      <DropzoneComponent />
      <section className="container space-y-5">
        <h2 className="font-bold pt-5">All Files</h2>
        <div>
          <TableWrapper skeletonFiles={skeletonFile} />
        </div>
      </section>
    </div>
  );
};

export default page;
