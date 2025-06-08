import React, { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { auth } from "../firebase/auth";
import GradientBackground from "../components/GradientBackground";

const withEmailVerification = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithVerification = (props: P) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      });

      return () => unsubscribe();
    }, []);

    if (loading) {
      return (
        <GradientBackground>
          <div className="text-center mt-10">Loading...</div>
        </GradientBackground>
      );
    }

    if (!user || !user.emailVerified) {
      return (
        <GradientBackground>
          <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-md text-center">
            <h1 className="text-2xl font-bold mb-4">
              {t("emailVerification.title")}
            </h1>
            <p className="text-gray-700">{t("emailVerification.message")}</p>
          </div>
        </GradientBackground>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithVerification;
};

export default withEmailVerification;
