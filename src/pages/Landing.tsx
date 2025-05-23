import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="h-full bg-gradient-to-b from-blue-50 to-white text-gray-800 flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {t("landing.title")}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          {t("landing.subtitle")}
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
        >
          {t("landing.cta")}
        </button>
        <span className="mt-2 text-sm text-gray-500">
          {t("landing.closedBeta")}
        </span>
      </section>

      {/* Features */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {t("landing.feature1.title")}
            </h3>
            <p className="text-gray-600">{t("landing.feature1.desc")}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {t("landing.feature2.title")}
            </h3>
            <p className="text-gray-600">{t("landing.feature2.desc")}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 bg-gray-50">
        © {new Date().getFullYear()} VocabWiseAI – {t("landing.footer")}
      </footer>
    </div>
  );
}

export default Landing;
