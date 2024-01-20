import DropzoneComponent from "@/components/Dropzone";
import { auth } from "@clerk/nextjs";

const page = () => {
  const {userId} = auth()
  return <div>
    <DropzoneComponent />
  </div>;
};

export default page;
