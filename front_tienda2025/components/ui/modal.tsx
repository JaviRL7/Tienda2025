import { useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-[800px] max-w-full rounded-lg shadow-lg flex overflow-hidden"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { duration: 0.5, ease: "easeOut" }, // Transición más suave
            }}
            exit={{
              scale: 0.85,
              opacity: 0,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
          >
            {/* Sección Izquierda */}
            <div className="w-1/2 bg-gray-100 flex flex-col items-center justify-center p-6">
              <img
                src="/punto/2.jpg"
                alt="Welcome"
                className="w-40 h-40 object-cover rounded-full"
              />
              <h2 className="text-xl font-semibold mt-4">Welcome!</h2>
              <p className="text-gray-600 mt-2">
                Not a member yet?{" "}
                <span className="text-blue-600 cursor-pointer">Register now</span>
              </p>
            </div>

            {/* Sección Derecha - Formulario */}
            <div className="w-1/2 p-6 flex flex-col">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <h2 className="text-2xl font-bold">Log in</h2>
              <input
                type="text"
                placeholder="Email or Username"
                className="mt-4 p-2 border rounded w-full"
              />
              <input
                type="password"
                placeholder="Password"
                className="mt-2 p-2 border rounded w-full"
              />
              <div className="flex items-center mt-2">
                <input type="checkbox" id="keep-logged" className="mr-2" />
                <label
                  htmlFor="keep-logged"
                  className="text-sm text-gray-600"
                >
                  Keep me logged in
                </label>
              </div>
              <button className="mt-4 bg-black text-white py-2 rounded text-center">
                Log in now
              </button>
              <p className="text-sm text-right mt-2 cursor-pointer text-gray-600 hover:underline">
                Forgot your password?
              </p>

              <div className="mt-4 border-t pt-4">
                <p className="text-center text-gray-600 text-sm">Or sign in with</p>
                <div className="flex justify-center space-x-4 mt-2">
                  <button className="border px-4 py-2 rounded">Google</button>
                  <button className="border px-4 py-2 rounded">Facebook</button>
                  <button className="border px-4 py-2 rounded">Twitter</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
