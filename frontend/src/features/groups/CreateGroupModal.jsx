import { useState } from "react";
import Modal from "../../components/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "./groupApi";
import { useGroup } from "../../context/GroupContext";

export default function CreateGroupModal({ isOpen, onClose }) {

    const [name, setName] = useState("");

    const queryClient = useQueryClient();
    const { setSelectedGroup } = useGroup();

    const handleClose = () => {
        setName("");
        onClose();
    };

    const mutation = useMutation({
        mutationFn: createGroup,

        onSuccess: (data) => {

            const newGroup = data.group || data;

            queryClient.invalidateQueries(["groups"]);

            setSelectedGroup(newGroup);

            handleClose();
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ name });
    };

    return (

        <Modal isOpen={isOpen} onClose={handleClose}>

            <h2 className="text-2xl font-bold mb-4">
                Create New Group
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Group name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 focus:border-black outline-none p-3 rounded-lg mb-6"
                />

                <div className="flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 rounded-lg border"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={mutation.isPending || !name.trim()}
                        className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-40"
                    >
                        {mutation.isPending
                            ? "Creating..."
                            : "Create"}
                    </button>

                </div>

            </form>

        </Modal>
    );
}
