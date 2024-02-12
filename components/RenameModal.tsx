"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { useAppStore } from "@/store/store";
import { useState } from "react";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

function RenameModal() {
    const { user } = useUser();

    const [input, setInput] = useState("");

    const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
        useAppStore((state) => [
            state.isRenameModalOpen,
            state.setIsRenameModalOpen,
            state.fileId,
            state.filename,
        ]);

    const renameFile = async () => {
        console.log('rename::', isRenameModalOpen);
        console.log('FileId::', fileId);
        console.log('chek');

        if (!user || !fileId) return
        console.log('hello world');
        console.log('fileId::::', fileId);

        const toastId = toast.loading("Renaming...");

        await updateDoc(doc(db, "users", user.id, "files", fileId), {
            fileName: input,
        });

        toast.success("Renamed Successfully", {
            id: toastId,
        });

        setInput("");

        setIsRenameModalOpen(false);
    };

    return (
        <Dialog
            open={isRenameModalOpen}
            onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="pb-2">Rename the file</DialogTitle>

                    <Input
                        id="link"
                        defaultValue={filename}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDownCapture={(e) => {
                            if (e.key === "Enter") {
                                renameFile();
                            }
                        }}
                    />

                    <div className="flex justify-end space-x-2 py-3">
                        <Button
                            size={"sm"}
                            className="px-3"
                            variant={"ghost"}
                            onClick={() => setIsRenameModalOpen(false)}
                        >
                            <span className="sr-only">Cancel</span>
                            <span>Cancel</span>
                        </Button>

                        <Button
                            size={"sm"}
                            type="submit"
                            className="px-3"
                            onClick={() => renameFile()}
                        >
                            <span className="sr-only">Rename</span>
                            <span>Rename</span>
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default RenameModal;