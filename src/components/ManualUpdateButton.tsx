"use client";

import { useState } from "react";

export default function ManualUpdateButton() {
  const [status, setStatus] = useState<"idle" | "checking" | "updating" | "done">("idle");

  const handleCheckUpdate = async () => {
    setStatus("checking");

    try {
      // 1. 清除所有 Cache Storage
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((name) => caches.delete(name)));
      }

      // 2. 注销并重新注册 Service Worker
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      }

      setStatus("updating");

      // 3. 短暂延迟后刷新
      setTimeout(() => {
        setStatus("done");
        window.location.reload();
      }, 800);
    } catch (err) {
      console.error("Update failed:", err);
      setStatus("idle");
    }
  };

  const labels = {
    idle: "检查更新",
    checking: "正在清除缓存...",
    updating: "正在重新加载...",
    done: "更新完成",
  };

  return (
    <button
      onClick={handleCheckUpdate}
      disabled={status !== "idle"}
      className={`w-full py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.4em] transition-all active:scale-[0.98] border ${
        status === "idle"
          ? "bg-white text-[#2D3330] border-black/10 hover:border-[#5D6B67]/30"
          : "bg-[#5D6B67] text-white border-[#5D6B67] opacity-80"
      }`}
    >
      {labels[status]}
    </button>
  );
}
