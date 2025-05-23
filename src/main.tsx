import { render } from "preact";
import "./index.css";
import "./locales/i18n";
import App from "./app.tsx";

render(<App />, document.getElementById("app")!);
