// src/components/AuthForm.tsx
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useSearchParams } from "react-router-dom";
import { withRedirectIfAuth } from "../hoc/withRedirectIfAuth";
import GradientBackground from "../components/GradientBackground";
import { auth } from "../firebase/auth";
import { useTranslation } from "react-i18next";

const provider = new GoogleAuthProvider();

const authErrorLocale = (t: string) =>
  String(t).replace("auth/", "auth.errors.");

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        let userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(userCredential.user, {
          url: "https://vocab-wise-ai.web.app/writting",
        });
        updateProfile(userCredential.user, { displayName: fullname });
      }
      const goTo = searchParams.get("goTo");
      if (goTo) {
        navigate(atob(goTo));
      } else {
        navigate("/writting");
      }
    } catch (err: any) {
      setError(authErrorLocale(err.code));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/writting");
    } catch (err: any) {
      setError(authErrorLocale(err.code));
    }
  };

  return (
    <GradientBackground>
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {isLogin ? t("auth.title.login") : t("auth.title.register")}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {t(error)}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder={t("auth.placeholder.fullname")}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={fullname}
              onChange={(e: any) => setFullName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder={t("auth.placeholder.email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t("auth.placeholder.password")}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition"
          >
            {isLogin
              ? t("auth.toggle.loginAction")
              : t("auth.toggle.registerAction")}
          </button>
        </form>

        <div className="my-4 flex items-center justify-center gap-2">
          <span className="h-px w-10 bg-gray-300" />
          <span className="text-sm text-gray-500">
            {t("auth.alternate.with")}
          </span>
          <span className="h-px w-10 bg-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-xl py-2 hover:bg-gray-50 transition"
        >
          <FcGoogle size={20} />
          <span className="text-sm font-medium text-gray-700">Google</span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline font-medium"
          >
            {isLogin ? t("auth.toggle.register") : t("auth.toggle.login")}
          </button>{" "}
          {isLogin ? t("auth.button.register") : t("auth.button.login")}
        </p>
      </div>
    </GradientBackground>
  );
}

export default withRedirectIfAuth(AuthForm);
