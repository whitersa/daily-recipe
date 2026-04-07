import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ASSET_MODULES, AssetModuleId } from "./Assets";
import { readCache, writeCache, CACHE_KEYS } from "@/lib/cache";
import BottomDock from "@/components/BottomDock";

interface Asset {
  id?: number;
  name: string;
  type: string;
  description?: string;
}

// ─── 样式常量 ────────────────────────────────────────────────────────────────

const itemBase =
  "bg-white border border-foreground/[0.03] rounded-md px-3 py-2.5 flex justify-between items-center group shadow-sm transition-colors";

// ─── 主组件 ──────────────────────────────────────────────────────────────────

export default function AssetModule() {
  const { module } = useParams<{ module: AssetModuleId }>();
  const navigate = useNavigate();

  const mod = ASSET_MODULES.find((m) => m.id === module);

  const [allAssets, setAllAssets] = useState<Asset[]>([]);
  const [query, setQuery] = useState("");
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);

  // ── 数据同步（IDB + API）────────────────────────────────────────────────────

  const syncAssets = async () => {
    // 1. 读缓存立刻渲染
    const cached = await readCache<Asset[]>(CACHE_KEYS.ASSETS);
    if (cached) setAllAssets(cached);

    // 2. 后台 fetch，有变化才更新
    try {
      const res = await fetch("/api/assets");
      const fresh = await res.json();
      const changed = await writeCache(CACHE_KEYS.ASSETS, fresh);
      if (changed || !cached) setAllAssets(fresh);
    } catch {
      if (!cached) setAllAssets([]);
    }
  };

  useEffect(() => {
    syncAssets();
  }, []);

  // ── 当前模块数据 + 搜索过滤 ────────────────────────────────────────────────

  const items = useMemo(
    () =>
      allAssets
        .filter((a) => a.type === module)
        .filter((a) => a.name.toLowerCase().includes(query.toLowerCase())),
    [allAssets, module, query]
  );

  // ── 添加条目 ─────────────────────────────────────────────────────────────────

  const handleAdd = async () => {
    if (!newName.trim() || !module) return;
    setAdding(true);
    try {
      const res = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), type: module, description: "" }),
      });
      if (res.ok) {
        setNewName("");
        await syncAssets(); // 重新同步，更新 IDB
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAdding(false);
    }
  };

  if (!mod) {
    navigate("/assets");
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col h-[100vh] w-full relative overflow-hidden bg-background"
    >
      {/* 顶部导航 */}
      <header className="px-5 pt-[env(safe-area-inset-top,0px)] mt-2 pb-3 flex items-center gap-3 z-20 flex-none border-b border-foreground/[0.03]">
        <button
          onClick={() => navigate("/assets")}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-foreground/[0.03] text-foreground/40 hover:text-foreground transition-colors active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-[20px]">{mod.emoji}</span>
          <div>
            <p className="text-[9px] font-bold text-foreground/20 tracking-[0.15em] uppercase">{mod.sublabel}</p>
            <h1 className="text-[16px] font-bold text-foreground tracking-tight leading-tight">{mod.label}</h1>
          </div>
        </div>
        <span className="text-[10px] font-bold text-foreground/20 tabular-nums">
          {items.length} 项
        </span>
      </header>

      {/* 搜索框 */}
      <div className="px-5 py-3 flex-none border-b border-foreground/[0.03]">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/20 pointer-events-none"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={`搜索${mod.label}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-9 bg-foreground/[0.03] border border-foreground/[0.04] rounded-lg pl-9 pr-3 text-[13px] font-medium text-foreground placeholder:text-foreground/20 outline-none focus:border-foreground/10 focus:bg-white transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/20 hover:text-foreground/50"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 列表 */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-5 pt-3 pb-[120px]">
        <AnimatePresence>
          {items.length > 0 ? (
            <div className="flex flex-col gap-1.5">
              {items.map((asset, i) => (
                <motion.div
                  key={asset.id ?? asset.name}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.03, duration: 0.2, ease: "easeOut" }}
                  className={itemBase}
                >
                  <span className="text-[14px] font-medium text-foreground/80">{asset.name}</span>
                  <span className="text-[9px] font-bold text-foreground/10 tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    删除
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 flex flex-col items-center gap-3"
            >
              <span className="text-4xl opacity-20 grayscale">{mod.emoji}</span>
              <p className="text-[12px] font-semibold text-foreground/30">
                {query ? `未找到"${query}"相关记录` : `${mod.label}库暂无数据`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 快速添加栏（底部悬浮）*/}
      <div className="absolute bottom-[80px] left-0 right-0 px-5">
        <div className="flex gap-2 bg-background/80 backdrop-blur-xl rounded-xl border border-foreground/[0.05] shadow-lg p-2">
          <input
            type="text"
            placeholder={`追加新${mod.label}...`}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1 bg-transparent px-2 py-1.5 text-[13px] font-medium text-foreground placeholder:text-foreground/20 outline-none"
          />
          <button
            onClick={handleAdd}
            disabled={adding || !newName.trim()}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white disabled:opacity-30 transition-all active:scale-95"
          >
            {adding ? (
              <span className="text-[12px] font-bold">…</span>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path d="M12 4v16m8-8H4" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <BottomDock activeTab="assets" />
    </motion.div>
  );
}
