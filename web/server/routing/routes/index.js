import preferences from "./preferences.js";
import tcsCOD from "./tcs/tcs.cod.js";
import dashboard from "./dashboard.js";
import webhooks from "./webhook.route.js";

export default (app) => {
  app.use("/api/v1.0/webhook", webhooks);
  app.use("/api/tcs/cod", tcsCOD);

  app.use("/api/dashboard", dashboard);
  app.use("/api/preferences", preferences);
};
