import React from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";

window.React = React;
globalThis.React = React;

async function bootstrap() {
  await import("../data.js");
  await import("../components.jsx");

  await import("../screen-login.jsx");
  await import("../screen-dashboard.jsx");
  await import("../screen-programs.jsx");
  await import("../screen-participants.jsx");
  await import("../screen-metrics.jsx");
  await import("../screen-report.jsx");
  await import("../screen-certificates.jsx");
  await import("../screen-create.jsx");
  await import("../screen-builder.jsx");
  await import("../screen-learner.jsx");

  await import("../app.jsx");

  const App = window.App;

  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

bootstrap();
