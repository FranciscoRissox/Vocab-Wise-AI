// src/components/AuthForm.tsx
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useSearchParams } from "react-router-dom";
import { withRedirectIfAuth } from "../hoc/withRedirectIfAuth";
import GradientBackground from "../ui/GradientBackground";
import { auth } from "../firebase/auth";

const provider = new GoogleAuthProvider();

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
        updateProfile(userCredential.user, { displayName: fullname });
      }
      const goTo = searchParams.get("goTo");
      if (goTo) {
        navigate(atob(goTo));
      } else {
        navigate("/writting");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/writting");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <GradientBackground>
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={fullname}
              onChange={(e: any) => setFullName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition"
          >
            {isLogin ? "Ingresar" : "Registrarse"}
          </button>
        </form>

        <div className="my-4 flex items-center justify-center gap-2">
          <span className="h-px w-10 bg-gray-300" />
          <span className="text-sm text-gray-500">o continúa con</span>
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
          {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline font-medium"
          >
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </GradientBackground>
  );
}

export default withRedirectIfAuth(AuthForm);
