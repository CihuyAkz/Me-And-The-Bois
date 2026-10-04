// proxy.js — jalankan: node proxy.js (Node 18+). Teruskan request ke Roblox + header CORS.
require("http").createServer(async (q, s) => {
  s.setHeader("Access-Control-Allow-Origin", "*");
  s.setHeader("Access-Control-Allow-Headers", "*");
  s.setHeader("Access-Control-Allow-Methods", "*");
  if (q.method === "OPTIONS") return s.end();
  const b = []; for await (const c of q) b.push(c);
  const h = {"x-api-key": q.headers["x-api-key"]};
  if (q.headers["content-type"]) h["content-type"] = q.headers["content-type"];
  const r = await fetch("https://apis.roblox.com" + q.url, {method: q.method, headers: h,
    body: ["GET", "HEAD"].includes(q.method) ? undefined : Buffer.concat(b)});
  s.statusCode = r.status;
  s.end(Buffer.from(await r.arrayBuffer()));
}).listen(8787, () => console.log("proxy di http://localhost:8787"));
