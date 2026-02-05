import { logout } from "../utils/logout";
import GroupSwitcher from "../features/groups/GroupSwitcher";
import CreateGroupModal from "../features/groups/CreateGroupModal";
import EditGroupModal from "../features/groups/EditGroupModal";
import DeleteGroupModal from "../features/groups/DeleteGroupModal";
import { Pencil } from "lucide-react";
import { useState } from "react";

export default function AppLayout({ children }) {

    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);


    return (

        <div className="min-h-screen bg-gray-100">

            {/* NAVBAR */}
            <header className="bg-white border-b sticky top-0 z-40">

                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    {/* LEFT */}
                    <div className="flex items-center gap-6">

                        <h1 className="text-2xl font-bold tracking-tight">
                            SplitMint
                        </h1>

                        {/* Group Controls */}
                        <div className="flex items-center gap-3">

                            <GroupSwitcher />

                            {/* Edit */}
                            <button
                                onClick={() => setEditOpen(true)}
                                className="text-gray-500 hover:text-black"
                            >
                                ✏️
                            </button>

                            {/* Delete */}
                            <button
                                onClick={() => setDeleteOpen(true)}
                                className="text-gray-500 hover:text-red-600"
                            >
                                🗑️
                            </button>

                            {/* Create */}
                            <button
                                onClick={() => setOpen(true)}
                                className="bg-black text-white px-3 py-2 rounded-lg hover:opacity-90"
                            >
                                + New Group
                            </button>

                        </div>


                    </div>

                    {/* RIGHT */}
                    <button
                        onClick={logout}
                        className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                    >
                        Logout
                    </button>

                </div>

            </header>

            {/* MAIN CONTENT */}
            <main className="max-w-7xl mx-auto p-6">
                {children}
            </main>

            {/* MODALS */}
            <CreateGroupModal
                isOpen={open}
                onClose={() => setOpen(false)}
            />

            <EditGroupModal
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
            />

            <DeleteGroupModal
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
            />


        </div>
    );
}
