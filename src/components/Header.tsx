import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserMenu } from "../features/user/components/UserMenu";

export function Header() {
  const navigate = useNavigate();
  const [hasUser, setHasUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setHasUser(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="w-full z-2 fixed top-0 left-0 bg-white shadow-md flex items-center justify-between
      px-2
      h-12 sm:h-14 md:h-16 lg:h-20
      py-2 sm:py-3 md:py-4 lg:py-5
      text-sm sm:text-base md:text-lg lg:text-xl
    ">
      <span
        className="text-2xl font-bold text-blue-600 tracking-tight select-none pl-2 sm:pl-3 md:pl-4 lg:pl-5"
        onClick={() => navigate("/")}
      >
        Vocab<span className="text-gray-800">Wise</span>
        <span className="text-green-600">AI</span>
      </span>

      {hasUser && <UserMenu />}
    </header>
  );
}
