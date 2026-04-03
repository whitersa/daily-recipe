export interface IngredientGroup {
  name: string;
  items: string[];
}

export interface StepGroup {
  name: string;
  items: string[];
}

export interface Recipe {
  id: number;
  title: string;
  emoji?: string;
  description: string;
  category: string;
  time: string;
  tags: string[];
  ingredients: IngredientGroup[];
  steps: StepGroup[];
  image_url?: string;
}

export const MOCK_RECIPES: Recipe[] = [
  {
    id: 1,
    title: '番茄牛腩面',
    emoji: '🍜',
    description: '浓郁酸甜的番茄汤底，搭配筋道的牛腩。',
    category: '午餐',
    time: '45 min',
    tags: ['硬菜', '家常'],
    ingredients: [
      { name: '主要食材', items: ['牛腩 500g', '番茄 3个', '手擀面 200g'] }
    ],
    steps: [
      { name: '准备步骤', items: ['牛腩切块铺水', '番茄炒成浓汤'] },
      { name: '正式烹饪', items: ['加入牛腩慢炖'] }
    ]
  },
  {
    id: 2,
    title: '牛油果吐司',
    emoji: '🥑',
    description: '健康的油脂，开启活力满满的一天。',
    category: '早餐',
    time: '10 min',
    tags: ['低脂', '快手'],
    ingredients: [
      { name: '食材清单', items: ['吐司 2片', '牛油果 1个', '鸡蛋 1个'] }
    ],
    steps: [
      { name: '制作过程', items: ['吐司烤至金黄', '牛油果捣碎抹开'] }
    ]
  }
];
