// src/components/LocalizedMeta.tsx
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export function LocalizedMeta() {
  const { t, i18n } = useTranslation();

  const title = t("meta.title");
  const description = t("meta.description");

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="VocabWiseAI" />
      <meta name="keywords" content="AI, writing, language learning, idiomas" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/cover.png" />
      <meta property="og:url" content="https://vocab-wise-ai.web.app/" />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/cover.png" />
    </Helmet>
  );
}
