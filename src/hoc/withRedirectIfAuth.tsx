// src/hoc/withRedirectIfAuth.tsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/auth";

export function withRedirectIfAuth(WrappedComponent: any) {
  return function RedirectIfAuthenticated(props: any) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate("/writting"); // cambia esto a donde quieras redirigir
        } else {
          setLoading(false);
        }
      });

      return () => unsubscribe();
    }, [navigate]);

    if (loading) {
      return <div className="text-center mt-10">Cargando...</div>;
    }

    return <WrappedComponent {...props} />;
  };
}
