// proxy.js — jalankan: node proxy.js (Node 18+). Teruskan request ke Roblox + header CORS.
const http = require("http");
http.createServer(async (q, s) => {
  s.setHeader("Access-Control-Allow-Origin", "*");
  s.setHeader("Access-Control-Allow-Headers", "*");
  s.setHeader("Access-Control-Allow-Methods", "*");
  s.setHeader("Access-Control-Allow-Private-Network", "true");
  if (q.method === "OPTIONS") return s.end();
  if (q.url === "/ping") return s.end("ok");
  try {
    const b = []; for await (const c of q) b.push(c);
    const h = {"x-api-key": q.headers["x-api-key"]};
    if (q.headers["content-type"]) h["content-type"] = q.headers["content-type"];
    const r = await fetch("https://apis.roblox.com" + q.url, {method: q.method, headers: h,
      body: ["GET", "HEAD"].includes(q.method) ? undefined : Buffer.concat(b)});
    console.log(q.method, q.url, r.status);
    s.statusCode = r.status;
    s.end(Buffer.from(await r.arrayBuffer()));
  } catch (e) {
    console.error(q.method, q.url, e.message);
    s.statusCode = 502; s.end(JSON.stringify({proxyError: e.message}));
  }
}).listen(8787, () => console.log("proxy di http://localhost:8787"));
