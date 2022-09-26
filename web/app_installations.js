import { Shopify } from "@shopify/shopify-api";
import db from "./server/db/models/postgres/index.js";
import "colors";
export const AppInstallations = {
  includes: async function (shopDomain) {
    const shopSessions =
      await Shopify.Context.SESSION_STORAGE.findSessionsByShop(shopDomain);
    //  console.log(shopSessions, "shopSessions include function is runing From Stroage".bgCyan);
    if (shopSessions.length > 0) {
      // console.log(
      //   "shopSessions include function is runing with if condiction".bgCyan
      // );
      for (const session of shopSessions) {
        if (session.accessToken) return true;
      }
    }

    console.log("session not found");

    return false;
  },

  delete: async function (shopDomain) {
    const shopSessions =
      await Shopify.Context.SESSION_STORAGE.findSessionsByShop(shopDomain);
    await Shopify.Context.SESSION_STORAGE.deleteSession(shopDomain);
    console.log(
      shopDomain,
      "Session Deleted From Stroage".bgCyan,
      shopSessions
    );

    if (shopSessions.length > 0) {
      console.log("shopSessions if condition run".bgCyan);
      await Shopify.Context.SESSION_STORAGE.deleteSessions(
        shopSessions.map((session) => session.id)
      );
    }
  },
};
