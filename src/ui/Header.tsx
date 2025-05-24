import { UserMenu } from "./UserMenu";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

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
    <header className="w-full fixed top-0 left-0  px-6 py-4 bg-white shadow-md flex items-center justify-between">
      <span
        className="text-2xl font-bold text-blue-600 tracking-tight select-none"
        onClick={() => navigate("/")}
      >
        Vocab<span className="text-gray-800">Wise</span>
        <span className="text-green-600">AI</span>
      </span>

      {hasUser && <UserMenu />}
    </header>
  );
}
