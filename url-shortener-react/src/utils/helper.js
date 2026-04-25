import { subDomainList } from "./constant";

// ✅ FIXED: fallback to main app for localhost & unknown subdomains
export const getApps = () => {
  const hostname = window.location.hostname;

  // 👉 always use main app in localhost
  if (hostname.includes("localhost")) {
    const mainApp = subDomainList.find((app) => app.main);
    return mainApp?.app;
  }

  const subdomain = getSubDomain(hostname);

  const mainApp = subDomainList.find((app) => app.main);

  if (!subdomain) return mainApp?.app;

  const matchedApp = subDomainList.find(
    (app) => subdomain === app.subdomain
  );

  return matchedApp?.app || mainApp?.app;
};

// url.localhost
// url.urlbestshort.com
export const getSubDomain = (location) => {
  const locationParts = location.split(".");
  const isLocalhost = locationParts.slice(-1)[0] === "localhost";

  if (isLocalhost) return ""; // ✅ force main app

  return locationParts.slice(0, -2).join(".");
};