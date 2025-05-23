// src/hoc/withAuthProtection.tsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase/auth";

export function withAuthProtection(WrappedComponent: any) {
  return function ProtectedComponent(props: any) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (!firebaseUser) {
          navigate(
            `/login${pathname !== "/login" ? `?goTo=${btoa(pathname)}` : ""}`
          );
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [navigate]);

    if (loading) {
      return <div className="text-center mt-10">Cargando...</div>;
    }

    return <WrappedComponent {...props} />;
  };
}
