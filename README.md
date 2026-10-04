# Roblox AI Animation Uploader

Tool HTML satu file (vanilla JS, tanpa framework) untuk membuat atau mengimpor `KeyframeSequence` R15 lalu mengunggahnya lewat Roblox Open Cloud Assets API dan mengambil `rbxassetid://…`.

## Fitur
- Generator berbasis template dari prompt: `idle`, `walk`, `run`, `wave`, `jump` (durasi, loop, priority bisa diatur).
- Import `.json` keyframe, atau `.rbxm` / `.rbxl` / `.rbxmx` / `.rbxlx`. Jika file berisi banyak `KeyframeSequence`, semuanya tampil di daftar dan bisa dipilih satu per satu, banyak sekaligus, atau rentang (Shift+klik).
- Serializer RBXMX, upload per sequence, polling operation, ekstraksi Asset ID.

## Pakai
1. Buka `index.html` di browser (atau aktifkan GitHub Pages: Settings → Pages → branch `main`, folder `/root`).
2. Buat API key di <https://create.roblox.com/credentials> dengan izin `asset:read` dan `asset:write`, lalu isi di kolom API key bersama User/Group ID.
3. Generate atau import, pilih sequence, klik **Upload terpilih**.

**Jangan commit API key.** Isi key lewat kolom di halaman, atau di salinan lokal `index.local.html` (sudah ada di `.gitignore`). Kalau key sempat bocor, hapus di halaman credentials dan buat baru.

## Batasan Roblox
- `apis.roblox.com` tidak mengirim header CORS, jadi upload dari browser butuh proxy: `node proxy/proxy.js`, lalu isi Base URL `http://localhost:8787`. Safari bisa memblokir `http://localhost` dari halaman https; pakai `index.html` lokal.
- Dokumentasi Roblox membatasi upload Animation via Open Cloud ke konten hasil Asset Delivery. Sequence buatan tool ini bisa ditolak; fallback: tombol **Unduh terpilih** lalu Publish dari Animation Editor di Studio.
- Parser biner mendukung rotasi CFrame bebas dan identitas; rotasi axis-aligned lain diganti identitas (ada peringatan di log).

## Format JSON import
```json
{"name":"MyAnim","length":1,"loop":true,"priority":"Movement","easingStyle":"Linear","easingDirection":"InOut",
 "keyframes":[{"time":0,"poses":{"LeftUpperLeg":{"r":[20,0,0]},"LowerTorso":{"p":[0,0.05,0]}}}]}
```
Kunci pose boleh nama part atau nama Motor6D (mis. `LeftHip`). `r` dalam derajat, `p` dalam stud.
