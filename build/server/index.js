import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "Real Estate Marketplace" },
    { name: "description", content: "Find your dream property with us" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-gray-950", children: [
    /* @__PURE__ */ jsx("div", { className: "relative h-[600px] bg-[url('/hero.jpg')] bg-cover bg-center", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex h-full flex-col justify-center px-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-5xl font-bold text-white", children: "Find Your Dream Home" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xl text-gray-200", children: "Explore thousands of properties across the country" }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 max-w-md rounded-lg bg-white/90 p-6 shadow-lg dark:bg-gray-800/90", children: /* @__PURE__ */ jsxs("form", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Location",
            className: "col-span-2 rounded-md border p-3"
          }
        ),
        /* @__PURE__ */ jsxs("select", { className: "rounded-md border p-3", children: [
          /* @__PURE__ */ jsx("option", { children: "Property Type" }),
          /* @__PURE__ */ jsx("option", { children: "House" }),
          /* @__PURE__ */ jsx("option", { children: "Apartment" }),
          /* @__PURE__ */ jsx("option", { children: "Villa" })
        ] }),
        /* @__PURE__ */ jsxs("select", { className: "rounded-md border p-3", children: [
          /* @__PURE__ */ jsx("option", { children: "Price Range" }),
          /* @__PURE__ */ jsx("option", { children: "$100k - $200k" }),
          /* @__PURE__ */ jsx("option", { children: "$200k - $500k" }),
          /* @__PURE__ */ jsx("option", { children: "$500k+" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "col-span-2 rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700",
            children: "Search Properties"
          }
        )
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-8 text-3xl font-bold", children: "Featured Properties" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-3", children: [1, 2, 3].map((property) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg shadow-lg", children: [
        /* @__PURE__ */ jsx("div", { className: "h-48 bg-gray-200" }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Modern Apartment" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-600", children: "New York, NY" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-2xl font-bold", children: "$450,000" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center text-sm text-gray-600", children: [
            /* @__PURE__ */ jsx("span", { children: "3 Beds" }),
            /* @__PURE__ */ jsx("span", { className: "mx-2", children: "•" }),
            /* @__PURE__ */ jsx("span", { children: "2 Baths" }),
            /* @__PURE__ */ jsx("span", { className: "mx-2", children: "•" }),
            /* @__PURE__ */ jsx("span", { children: "1200 sqft" })
          ] })
        ] })
      ] }, property)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-100 py-16 dark:bg-gray-900", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-8 text-center text-3xl font-bold", children: "Our Services" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Buy a Home" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600", children: "Find your perfect home with our extensive property listings" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Sell a Property" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600", children: "Get the best value for your property with our expert agents" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Rent a Space" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-600", children: "Discover rental properties that fit your lifestyle" })
        ] })
      ] })
    ] }) })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CrVz23WO.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-B6oed2oa.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-BSdAQBb7.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-B6oed2oa.js"], "css": ["/assets/root-BSMI1y9u.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-YUDTh9lk.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] } }, "url": "/assets/manifest-78e68381.js", "version": "78e68381" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
