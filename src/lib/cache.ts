/**
 * cache.ts — 客户端 IndexedDB 缓存层
 *
 * 策略：Stale-While-Revalidate + 版本对比
 *   1. 启动时同步读取 IDB 缓存 → 立即渲染（无 loading）
 *   2. 后台 fetch API → 比较数据哈希 → 有变化才更新 IDB 并触发 UI 更新
 *   3. 离线时完全依赖 IDB，不显示任何错误
 */

const DB_NAME = 'daily-recipe-db';
const DB_VERSION = 1;
const STORE_NAME = 'cache';

// ─── 数据库初始化 ─────────────────────────────────────────────────────────────

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// ─── 基础 IDB 读写 ────────────────────────────────────────────────────────────

async function idbGet<T>(key: string): Promise<T | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function idbSet(key: string, value: unknown): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve(); // 写失败静默处理
    });
  } catch {
    // IDB 不可用时忽略
  }
}

// ─── 版本对比（简单哈希）────────────────────────────────────────────────────

function simpleHash(data: unknown): string {
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return hash.toString(36);
}

// ─── 缓存条目结构 ─────────────────────────────────────────────────────────────

interface CacheEntry<T> {
  data: T;
  hash: string;       // 数据哈希，用于变更检测
  cachedAt: number;   // 缓存时间戳（ms）
}

// ─── 公开 API ─────────────────────────────────────────────────────────────────

/**
 * 读取缓存（同步感知）
 * - 返回 null 表示没有缓存（首次启动）
 */
export async function readCache<T>(key: string): Promise<T | null> {
  const entry = await idbGet<CacheEntry<T>>(key);
  return entry?.data ?? null;
}

/**
 * 写入缓存，返回 true 表示数据有变化（可用于触发 UI 更新）
 */
export async function writeCache<T>(key: string, data: T): Promise<boolean> {
  const newHash = simpleHash(data);
  const existing = await idbGet<CacheEntry<T>>(key);

  if (existing?.hash === newHash) {
    return false; // 数据没变，不需要更新 UI
  }

  await idbSet(key, { data, hash: newHash, cachedAt: Date.now() } satisfies CacheEntry<T>);
  return true; // 数据有变化
}

/**
 * 清除指定缓存（例如强制重新同步）
 */
export async function clearCache(key: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
  } catch {
    // 忽略
  }
}

// ─── 缓存键常量 ───────────────────────────────────────────────────────────────

export const CACHE_KEYS = {
  RECIPES: 'recipes',
  ASSETS: 'assets',
} as const;
