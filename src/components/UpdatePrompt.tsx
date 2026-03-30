"use client";

import { useEffect, useState } from "react";

export default function UpdatePrompt() {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        // 定期检查更新（每 60 秒）
        const interval = setInterval(() => {
          registration.update();
        }, 60 * 1000);

        // 监听新的 Service Worker 安装
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // 新版本已就绪，显示更新提示
                setShowUpdate(true);
              }
            });
          }
        });

        return () => clearInterval(interval);
      });
    }
  }, []);

  const handleUpdate = async () => {
    // 1. 清除所有 Cache Storage
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    }

    // 2. 通知 Service Worker 立即接管
    const registration = await navigator.serviceWorker.ready;
    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }

    // 3. 重新加载页面
    window.location.reload();
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-[400px] animate-slide-down">
      <div className="bg-[#2D3330] text-white rounded-2xl px-5 py-4 flex items-center justify-between gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-lg">✨</span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em]">
              新版本可用
            </p>
            <p className="text-[9px] text-white/50 mt-0.5">
              点击更新以获取最新内容
            </p>
          </div>
        </div>
        <button
          onClick={handleUpdate}
          className="bg-white text-[#2D3330] px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 active:scale-95 transition-all whitespace-nowrap"
        >
          立即更新
        </button>
      </div>
    </div>
  );
}
