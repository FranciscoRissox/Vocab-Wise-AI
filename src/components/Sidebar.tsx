import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  children?: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function handleResize() {
      const desktop = window.innerWidth >= 1300;
      setIsDesktop(desktop);
      setIsOpen(desktop);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Overlay para móvil */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || isDesktop) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed ${
              isDesktop ? "top-20" : "top-0"
            } left-0 h-full w-72 bg-white border-r border-gray-300 p-6 z-50`}
          >
            <div className="flex justify-between items-center mb-6 md:hidden">
            
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
                aria-label={t("sidebar.close")}
              >
                ✕
              </button>
            </div>

            {children}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Botón flotante para abrir en móvil */}
      {!isOpen && !isDesktop && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-0 left-0 h-screen z-1 bg-white border-r border-gray-300 shadow-md rounded-r-md transition-colors"
          aria-label={t("sidebar.open")}
        >
          <span className="flex items-center justify-center h-full">
            <span className="text-blue-600 rounded-full bg-white text-md">
              ⚙️
            </span>
          </span>
        </button>
      )}
    </>
  );
}
