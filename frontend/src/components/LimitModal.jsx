import Modal from "./Modal";

export default function LimitModal({ isOpen, onClose }) {

    return (

        <Modal isOpen={isOpen} onClose={onClose}>

            <h2 className="text-2xl font-bold mb-3 text-yellow-600">
                Participant Limit Reached
            </h2>

            <p className="text-gray-600 mb-6">
                A group can have a maximum of 
                <b> 4 members </b>
                (including you).
                <br /><br />
                Remove someone before adding a new participant.
            </p>

            <button
                onClick={onClose}
                className="w-full bg-black text-white py-2 rounded-lg"
            >
                Got it
            </button>

        </Modal>
    );
}
