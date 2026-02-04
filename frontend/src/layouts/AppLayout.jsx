import { logout } from "../utils/logout";

export default function AppLayout({ children }) {

    return (

        <div className="min-h-screen bg-gray-100">

            {/* NAVBAR */}
            <div className="bg-white px-8 py-4 shadow flex justify-between items-center">

                <h1 className="text-2xl font-bold">
                    SplitMint
                </h1>

                <button
                    onClick={logout}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
                >
                    Logout
                </button>

            </div>

            {/* CONTENT */}
            <div className="p-8">
                {children}
            </div>

        </div>
    );
}
