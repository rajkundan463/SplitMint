import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {


    useEffect(() => {

        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);


            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };

    }, [isOpen, onClose]);



    return (

        <AnimatePresence>

            {isOpen && (

                <motion.div
                    className="
                        fixed inset-0
                        bg-black/40
                        flex items-center justify-center
                        z-50
                    "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >

                    {/* STOP CLICK PROPAGATION */}
                    <motion.div
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        transition={{ duration: 0.16 }}
                        onClick={(e) => e.stopPropagation()}
                        className="
                              bg-white
                               rounded-2xl
                               p-6
                               w-full
                               max-w-4xl
                               max-h-[90vh]
                                overflow-y-auto"
                    >

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="
                                absolute top-3 right-3
                                text-gray-400
                                hover:text-black
                                transition
                            "
                        >
                            ✕
                        </button>

                        {/* Prevent tall modal overflow */}
                        <div className="max-h-[75vh] overflow-y-auto">
                            {children}
                        </div>

                    </motion.div>

                </motion.div>

            )}

        </AnimatePresence>
    );
}
