import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BottomDock from "@/components/BottomDock";

// ─── 模块定义 ─────────────────────────────────────────────────────────────────

export const ASSET_MODULES = [
  {
    id: "ingredient",
    label: "食材库",
    sublabel: "INGREDIENTS",
    emoji: "🧄",
    accent: "bg-primary/8 border-primary/10 hover:border-primary/25",
    dot: "bg-primary",
    description: "核心原料索引",
  },
  {
    id: "term",
    label: "处理工序",
    sublabel: "TECHNIQUES",
    emoji: "🔪",
    accent: "bg-accent/10 border-accent/15 hover:border-accent/40",
    dot: "bg-accent",
    description: "标准操作术语",
  },
  {
    id: "tag",
    label: "风味标签",
    sublabel: "FLAVOR TAGS",
    emoji: "🏷️",
    accent: "bg-foreground/[0.03] border-foreground/[0.05] hover:border-foreground/[0.12]",
    dot: "bg-foreground/40",
    description: "菜肴风味分类",
  },
  {
    id: "equipment",
    label: "厨具器材",
    sublabel: "EQUIPMENT",
    emoji: "🍳",
    accent: "bg-foreground/[0.02] border-foreground/[0.04] hover:border-foreground/[0.10]",
    dot: "bg-foreground/30",
    description: "常用工具档案",
  },
] as const;

export type AssetModuleId = typeof ASSET_MODULES[number]["id"];

// ─── Assets 首页（方块网格）──────────────────────────────────────────────────

export default function Assets() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-[100vh] w-full relative overflow-hidden bg-background"
    >
      {/* 方块网格 */}
      <main className="flex-1 overflow-y-auto no-scrollbar px-5 pt-[env(safe-area-inset-top,0px)] pt-5 pb-[120px]">
        <div className="grid grid-cols-2 gap-3">
          {ASSET_MODULES.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3, ease: "easeOut" }}
            >
              <Link
                to={`/assets/${mod.id}`}
                className={`flex flex-col justify-between p-4 rounded-lg border ${mod.accent} transition-all duration-300 active:scale-[0.97] block`}
                style={{ minHeight: 120 }}
              >
                {/* 顶部：emoji + 小标签 */}
                <div className="flex items-start justify-between">
                  <span className="text-[26px] leading-none">{mod.emoji}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${mod.dot} opacity-60 mt-1`} />
                </div>

                {/* 底部：模块名称 */}
                <div className="mt-auto pt-3">
                  <p className="text-[10px] font-bold text-foreground/25 tracking-[0.15em] uppercase mb-0.5">
                    {mod.sublabel}
                  </p>
                  <p className="text-[15px] font-bold text-foreground/80 tracking-tight">
                    {mod.label}
                  </p>
                  <p className="text-[10px] text-foreground/30 mt-0.5">{mod.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 底部哲学 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 p-4 rounded-lg border border-foreground/[0.03] bg-foreground/[0.01]"
        >
          <p className="text-[10px] font-bold text-foreground/25 tracking-[0.15em] uppercase mb-1">
            ARCHIVE PHILOSOPHY
          </p>
          <p className="text-[12px] text-foreground/30 leading-relaxed italic">
            这里保存的是你烹饪宇宙中的"原子"。每一个词，都会自动在所有档案正文中生效。减少噪音，建立标准。
          </p>
        </motion.div>
      </main>

      <BottomDock activeTab="assets" />
    </motion.div>
  );
}
