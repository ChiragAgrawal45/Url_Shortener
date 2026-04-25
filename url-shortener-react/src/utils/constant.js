import AppRouter, { SubDomainRouter } from "../AppRouter";

export const subDomainList = [
  {
    subdomain: "www",
    app: AppRouter, // ✅ must contain ALL routes (dashboard, create, login)
    main: true,
  },
  {
    subdomain: "url",
    app: SubDomainRouter,
    main: false,
  },
];