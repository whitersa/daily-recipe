import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. 创建 recipes 表
    await sql`
      CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        time TEXT,
        ingredients JSONB,
        steps JSONB
      )
    `;

    // 2. 检查是否已有数据
    const { rows: existing } = await sql`SELECT COUNT(*) as count FROM recipes`;
    if (Number(existing[0].count) > 0) {
      return NextResponse.json({
        success: true,
        message: `表已存在且有 ${existing[0].count} 条数据，跳过插入。`,
      });
    }

    // 3. 插入初始数据
    await sql`
      INSERT INTO recipes (title, description, category, time, ingredients, steps) VALUES
      ('番茄牛腩面', '浓郁酸甜的番茄汤底，搭配筋道的牛腩，是冬日里最温暖的选择。', '午餐', '45 min', '["牛腩 500g", "番茄 3个", "手擀面 200g", "生姜", "大葱"]', '["牛腩切块焯水", "番茄炒成浓汤", "加入牛腩慢炖", "煮面并淋入汤汁"]'),
      ('晨间牛油果吐司', '健康的油脂，清爽的口感，开启活力满满的一天。', '早餐', '10 min', '["吐司 2片", "牛油果 1个", "鸡蛋 1个", "黑胡椒"]', '["吐司烤至金黄", "牛油果捣碎抹开", "放上水波蛋", "撒盐和黑胡椒"]'),
      ('法式焦糖布丁', '丝滑如绸缎般的口感，轻轻敲碎表面的焦糖，是极致的味觉享受。', '甜点', '30 min', '["淡奶油 200ml", "蛋黄 3个", "细砂糖 30g", "香草精"]', '["奶油加热混合蛋黄", "过滤装模", "150度水浴烘烤", "表面撒糖喷火烧焦"]'),
      ('照烧鸡腿饭', '经典日式风味，鸡肉皮脆肉嫩，酱汁拌饭一绝。', '晚餐', '20 min', '["鸡腿 2个", "西兰花", "米饭", "照烧汁"]', '["鸡腿去骨煎至皮黄", "倒入自制照烧汁", "收汁切块", "配上蔬菜装盘"]')
    `;

    return NextResponse.json({
      success: true,
      message: '数据库初始化成功！已创建 recipes 表并插入 4 条示例数据。',
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
