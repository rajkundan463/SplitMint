export default function AuthLayout({ children }) {

    return (
        <div className="min-h-screen grid grid-cols-2">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex flex-col justify-center items-center bg-black text-white p-12">

                <h1 className="text-4xl font-bold mb-4">
                    SplitMint
                </h1>

                <p className="text-gray-300 text-lg text-center max-w-md">
                    Track shared expenses, settle balances instantly,
                    and manage group finances without the headache.
                </p>

            </div>


            {/* RIGHT SIDE */}
            <div className="flex items-center justify-center bg-gray-50">

                {children}

            </div>

        </div>
    );
}
