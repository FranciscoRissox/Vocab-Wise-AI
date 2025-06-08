import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useTranslation } from "react-i18next";
import { signOut, onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../../../firebase/auth";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { t, i18n } = useTranslation();
  const ref = useRef(null);

  useOutsideClick(ref, () => setOpen(false));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  if (!user) return null;

  const firstName = user.displayName?.split(" ")[0] || "User";
  const photoUrl =
    user.photoURL ||
    "https://ui-avatars.com/api/?name=" + encodeURIComponent(firstName);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
        aria-label={t("userMenu.openMenu")}
      >
        <img
          src={photoUrl}
          alt="User avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-medium text-gray-800">{firstName}</span>
        <svg
          className="w-4 h-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
          >
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
            >
              🔓 {t("userMenu.logout")}
            </button>

            <div className="border-t border-gray-200 my-1" />

            <div className="px-4 py-2 text-sm text-gray-500">
              {t("userMenu.language")}
            </div>
            <button
              onClick={() => changeLanguage("en")}
              className="w-full text-left px-4 py-1 hover:bg-gray-100 text-sm"
            >
              🇺🇸 English
            </button>
            <button
              onClick={() => changeLanguage("es")}
              className="w-full text-left px-4 py-1 hover:bg-gray-100 text-sm"
            >
              🇪🇸 Español
            </button>
            <button
              onClick={() => changeLanguage("pt")}
              className="w-full text-left px-4 py-1 hover:bg-gray-100 text-sm"
            >
              🇧🇷 Português
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
