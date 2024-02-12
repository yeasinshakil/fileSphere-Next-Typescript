"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";

export function DeleteModel() {
    const { user } = useUser();

    const [setIsDeleteModalOpen, isDeleteModalOpen, fileId] = useAppStore(
        (state) => [
            state.setIsDeleteModalOpen,
            state.isDeleteModalOpen,
            state.fileId,
        ]
    );

    async function deleteFile() {

        if (!user || !fileId) return;

        const toastId = toast.loading("Deleting...");


        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

        // await deleteObject(fileRef)
        //   .then(async () => {
        //     deleteDoc(doc(db, "users", user.id, "files", fileId));
        //     console.log("File Deleted");
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });

        try {
            deleteObject(fileRef)
                .then(async () => {
                    deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
                        // console.log("File Deleted");
                        toast.success("Deleted Successfully", {
                            id: toastId,
                        });

                    });
                })
                .finally(() => {
                    setIsDeleteModalOpen(false);
                });
        } catch (error) {
            console.log(error);
            setIsDeleteModalOpen(false);
            toast.error("Error deleting document", {
                id: toastId,
            });

        }
    }

    return (
        <Dialog
            open={isDeleteModalOpen}
            onOpenChange={(isOpen) => setIsDeleteModalOpen(isOpen)}
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure uou want to delete?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your
                        file!
                    </DialogDescription>
                </DialogHeader>
                <div className="flex space-x-2 py-3">
                    <Button
                        size={"sm"}
                        className="px-3 flex-1"
                        variant={"ghost"}
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        <span className="sr-only">Cancel</span>
                        <span>Cancel</span>
                    </Button>

                    <Button
                        size={"sm"}
                        type="submit"
                        variant={"destructive"}
                        className="px-3 flex-1"
                        onClick={() => deleteFile()}
                    >
                        <span className="sr-only">Delete</span>
                        <span>Delete</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}