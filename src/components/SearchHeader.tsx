"use client";

import { useState } from "react";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerTrigger 
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// ─── 样式常量 ───────────────────────────────────────────────────────────────
// 集中管理，改一处全生效

/** 筛选浮层背景板（搜索框 + 过滤按钮共用） */
const glassPanel = "bg-white/60 backdrop-blur-xl border border-black/[0.03] rounded-lg";

/** 筛选抽屉中每个 Toggle 选项 */
const filterToggleItem = [
  "px-4 py-2.5 rounded-lg border border-foreground/[0.05]",
  "bg-white text-[11px] font-bold text-foreground/60",
  "transition-all duration-300 shadow-sm",
  "hover:bg-primary/5 hover:text-primary hover:border-primary/20",
  "data-[pressed]:bg-primary data-[pressed]:text-white data-[pressed]:border-primary",
].join(" ");

/** 筛选区域标题行（icon + label） */
const filterSectionHeader = "flex items-center gap-2 text-foreground/40";

/** 筛选标签文字 */
const filterLabel = "text-[10px] font-extrabold tracking-[0.15em] uppercase";

// ─── 数据常量 ───────────────────────────────────────────────────────────────

const TIME_OPTIONS = ["15min.", "45min.", "不着急"] as const;
const TASTE_OPTIONS = ["清淡", "咸香", "麻辣", "酸甜", "香脆"] as const;
const INGREDIENT_OPTIONS = ["鸡蛋", "牛肉", "鸡胸肉", "西红柿", "青椒", "土豆"] as const;

// ─── 子组件 ─────────────────────────────────────────────────────────────────

/** 筛选区块：标题 + ToggleGroup */
function FilterSection({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className={filterSectionHeader}>
        {icon}
        <label className={filterLabel}>{label}</label>
      </div>
      {children}
    </div>
  );
}

// ─── 主组件 ─────────────────────────────────────────────────────────────────

export default function SearchHeader() {
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [selectedTastes, setSelectedTastes] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-2 mb-1">
      {/* 搜索栏 + 过滤按钮 */}
      <div className="flex gap-2.5 h-10 relative isolate">
        {/* 搜索框 */}
        <div className="relative flex-1 group isolate">
          <div className={`absolute inset-0 ${glassPanel} -z-10 pointer-events-none transition-all group-within:bg-white group-within:shadow-[0_8px_30px_rgba(0,0,0,0.04)]`} />
          <div className="relative h-full flex items-center">
            <SearchIcon />
            <Input
              placeholder="搜索食谱或食材..."
              className="h-10 border-none bg-transparent px-11 text-[14.5px] font-semibold text-foreground placeholder:text-foreground/20 focus-visible:ring-0 shadow-none"
            />
          </div>
        </div>

        {/* 筛选抽屉触发按钮 */}
        <Drawer>
          <DrawerTrigger asChild>
            <button className={`w-10 h-10 flex items-center justify-center ${glassPanel} text-foreground/40 hover:text-primary hover:bg-white transition-all active:scale-95 shadow-sm`}>
              <FilterIcon />
            </button>
          </DrawerTrigger>

          <DrawerContent className="bg-background/95 backdrop-blur-[40px] rounded-t-lg border-t border-white/20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.02]">
            {/* 拖拽指示条 */}
            <div className="mx-auto w-12 h-1.5 flex-none rounded-full bg-foreground/10 mt-3 mb-1" />

            {/* 背景渐变装饰 */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-40">
              <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
            </div>

            <div className="px-8 space-y-5 overflow-y-auto no-scrollbar pb-8 relative mt-2">
              <div className="grid gap-6 pt-3">
                {/* 时间筛选 */}
                <FilterSection icon={<ClockIcon />} label="想花多久？">
                  <ToggleGroup
                    type="single"
                    value={selectedTime}
                    onValueChange={(v: any) => setSelectedTime(v || undefined)}
                    className="flex flex-wrap gap-2 justify-start"
                  >
                    {TIME_OPTIONS.map(t => (
                      <ToggleGroupItem key={t} value={t} className={filterToggleItem}>
                        {t}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FilterSection>

                {/* 口味筛选 */}
                <FilterSection icon={<TasteIcon />} label="什么口味？">
                  <ToggleGroup
                    type="multiple"
                    value={selectedTastes}
                    onValueChange={(v: any) => setSelectedTastes(v)}
                    className="flex flex-wrap gap-2 justify-start"
                  >
                    {TASTE_OPTIONS.map(t => (
                      <ToggleGroupItem key={t} value={t} className={filterToggleItem}>
                        {t}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FilterSection>

                {/* 食材多选 */}
                <FilterSection icon={<IngredientIcon />} label="食材多选">
                  <ToggleGroup
                    type="multiple"
                    value={selectedIngredients}
                    onValueChange={(v: any) => setSelectedIngredients(v)}
                    className="flex flex-wrap gap-2 justify-start"
                  >
                    {INGREDIENT_OPTIONS.map(e => (
                      <ToggleGroupItem key={e} value={e} className={filterToggleItem}>
                        {e}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </FilterSection>
              </div>

              <div className="pt-4">
                <DrawerClose asChild>
                  <Button className="w-full h-14 bg-primary text-white rounded-lg text-[13px] font-bold tracking-[0.2em] shadow-[0_8px_25px_rgba(225,82,61,0.25)] active:scale-[0.98] transition-all transform-gpu uppercase">
                    搞定！
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

// ─── 图标组件（避免 SVG 内联污染业务代码）──────────────────────────────────

function SearchIcon() {
  return (
    <svg className="absolute left-4 w-3.5 h-3.5 text-foreground/20 pointer-events-none ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
      <path d="M22 3H2l8 10v6l4 2v-8L22 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TasteIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IngredientIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
      <path d="M3 6l3 12h12l3-12H3zM9 6v12M15 6v12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
