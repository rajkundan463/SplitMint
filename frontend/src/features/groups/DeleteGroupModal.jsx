import Modal from "../../components/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup } from "./groupApi";
import { useGroup } from "../../context/GroupContext";

export default function DeleteGroupModal({ isOpen, onClose }) {

    const { selectedGroup, setSelectedGroup } = useGroup();

    const queryClient = useQueryClient();

    //-------------------------------------

    const mutation = useMutation({
        mutationFn: deleteGroup,

        onSuccess: async () => {

            // Refresh groups
            const updatedGroups =
                await queryClient.invalidateQueries(["groups"]);

            // Get new group list
            const groups =
                queryClient.getQueryData(["groups"]);

            // Auto switch to another group
            if (groups?.length) {
                setSelectedGroup(groups[0]);
            } else {
                setSelectedGroup(null);
            }

            onClose();
        }
    });

    //-------------------------------------

    if (!selectedGroup) return null;

    return (

        <Modal isOpen={isOpen} onClose={onClose}>

            <h2 className="text-2xl font-bold mb-3 text-red-600">
                Delete Group
            </h2>

            <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <b>{selectedGroup.name}</b>?
                <br /><br />
                This action cannot be undone and all expenses,
                participants, and balances will be permanently removed.
            </p>

            <div className="flex justify-end gap-3">

                <button
                    onClick={onClose}
                    className="px-4 py-2 border rounded-lg"
                >
                    Cancel
                </button>

                <button
                    onClick={() =>
                        mutation.mutate(selectedGroup.id)
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    {mutation.isPending
                        ? "Deleting..."
                        : "Delete"}
                </button>

            </div>

        </Modal>
    );
}
