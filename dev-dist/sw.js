if (!self.define) {
  let e,
    t = {};
  const i = (i, n) => (
    (i = new URL(i + ".js", n).href),
    t[i] ||
      new Promise((t) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = t), document.head.appendChild(e);
        } else (e = i), importScripts(i), t();
      }).then(() => {
        let e = t[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, o) => {
    const r =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (t[r]) return;
    let s = {};
    const l = (e) => i(e, r),
      c = { module: { uri: r }, exports: s, require: l };
    t[r] = Promise.all(n.map((e) => c[e] || l(e))).then((e) => (o(...e), s));
  };
}
define(["./workbox-fa446783"], function (e) {
  "use strict";
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "registerSW.js", revision: "22271febdc61e0ae248cd93e3ec01f59" },
        { url: "index.html", revision: "0.nk8ts0jchpo" },
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
