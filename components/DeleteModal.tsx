'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { db, storage } from "@/firebase"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"

export function DeleteModel() {
    const { user } = useUser();
    const [setIsDeleteModalOpen, isDeleteModalOpen, fileId] = useAppStore(
        (state) => [
            state.setIsDeleteModalOpen,
            state.isDeleteModalOpen,
            state.fileId,
        ]
    );
    const deleteFile = async () => {
        console.log('deleteModal::', isDeleteModalOpen);
        console.log('FileId::', fileId);
        console.log('chekc');

        if (!user || !fileId) return
        console.log('hello world');
        console.log('fileId::::', fileId);


        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

        try {
            deleteObject(fileRef)
                .then(async () => {
                    console.log("File Deleted");
                    deleteDoc(doc(db, "users", user.id, "files", fileId)).then(
                        () => {
                            console.log("Deleted");
                        }
                    );

                })
                .finally(() => {
                    setIsDeleteModalOpen(false);
                });
        } catch (error) {
            console.log("Uh-oh! An error occurred!", error);

            setIsDeleteModalOpen(false);
        }

    }
    return (
        <Dialog
            // @ts-ignore
            open={isDeleteModalOpen}
            onOpenChange={(isOpen) => setIsDeleteModalOpen(isOpen)}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your file!
                    </DialogDescription>
                </DialogHeader>
                <div className="flex space-x-2 py-3">

                    <Button className="px-3 flex-1" variant={"ghost"} size={"sm"} onClick={() => setIsDeleteModalOpen(false)}>
                        <span className="sr-only">Cancel</span>
                        <span>Cancel</span>
                    </Button>


                    <Button type="submit" className="px-3 flex-1" variant={"ghost"} size={"sm"} onClick={() => deleteFile()}>
                        <span className="sr-only">Delete</span>
                        <span>Delete</span>
                    </Button>

                </div>

            </DialogContent>
        </Dialog>
    )
}
