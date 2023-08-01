if (!self.define) {
  let e,
    t = {};
  const r = (r, i) => (
    (r = new URL(r + ".js", i).href),
    t[r] ||
      new Promise((t) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = r), (e.onload = t), document.head.appendChild(e);
        } else (e = r), importScripts(r), t();
      }).then(() => {
        let e = t[r];
        if (!e) throw new Error(`Module ${r} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const o =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (t[o]) return;
    let s = {};
    const l = (e) => r(e, o),
      c = { module: { uri: o }, exports: s, require: l };
    t[o] = Promise.all(i.map((e) => c[e] || l(e))).then((e) => (n(...e), s));
  };
}
define(["./workbox-fa446783"], function (e) {
  "use strict";
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "registerSW.js", revision: "22271febdc61e0ae248cd93e3ec01f59" },
        { url: "index.html", revision: "0.1rhvr54v8l8" },
      ],
      {},
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html"), {
        allowlist: [/^\/$/],
      }),
    );
});
