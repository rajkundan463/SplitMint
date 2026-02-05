import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroup } from "./groupApi";
import { useGroup } from "../../context/GroupContext";

export default function EditGroupModal({ isOpen, onClose }) {

    const { selectedGroup, setSelectedGroup } = useGroup();

    const [name, setName] = useState("");

    const queryClient = useQueryClient();

    //---------------------------------
    // Pre-fill name when modal opens
    //---------------------------------

    useEffect(() => {
        if (selectedGroup) {
            setName(selectedGroup.name);
        }
    }, [selectedGroup]);

    //---------------------------------
    // Mutation
    //---------------------------------

    const mutation = useMutation({
        mutationFn: updateGroup,

        onSuccess: (updatedGroup) => {

            queryClient.invalidateQueries(["groups"]);

            // ⭐ update context instantly
            setSelectedGroup(updatedGroup);

            onClose();
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        mutation.mutate({
            groupId: selectedGroup.id,
            name
        });
    };

    if (!selectedGroup) return null;

    //---------------------------------

    return (

        <Modal isOpen={isOpen} onClose={onClose}>

            <h2 className="text-2xl font-bold mb-4">
                Edit Group
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="w-full border border-gray-200 focus:border-black outline-none p-3 rounded-lg mb-6"
                />

                <div className="flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        className="px-4 py-2 bg-black text-white rounded-lg"
                    >
                        {mutation.isPending
                            ? "Saving..."
                            : "Save"}
                    </button>

                </div>

            </form>

        </Modal>
    );
}
