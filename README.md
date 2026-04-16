# ⚔️ 流浪地牢 - 卡牌构筑 Roguelike

一个精美的纯前端卡牌构筑 Roguelike 网页游戏！

## 🎮 游戏特色

- **3 个职业**：战士、法师、盗贼，每个职业有独特的初始卡牌和属性
- **30+ 张卡牌**：攻击卡、技能卡、防御卡，支持锻造升级
- **遗物系统**：获得各种被动增益道具，改变游戏玩法
- **动态地图**：4 列布局，每层随机生成 8-12 条路径
- **难度递增**：敌人属性、商店价格随楼层动态提升
- **完整功能**：包含战斗、商店、休息、事件、Boss 战等完整 Roguelike 元素

## 🚀 快速开始

### 本地运行
1. 克隆仓库
   ```bash
   git clone https://github.com/你的用户名/流浪地牢.git
   cd 流浪地牢
   ```

2. 直接在浏览器中打开 `index.html` 文件

### 部署到 Cloudflare Pages

#### 方法一：通过 GitHub 自动部署（推荐）

1. **推送到 GitHub**
   ```bash
   git remote add origin https://github.com/你的用户名/流浪地牢.git
   git branch -M main
   git push -u origin main
   ```

2. **在 Cloudflare 中设置**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 **Pages** → **Create a project**
   - 选择 **Connect to Git**
   - 选择 `流浪地牢` 仓库
   - 配置：
     - **Framework preset**: None
     - **Build command**: 留空（不需要构建）
     - **Build output directory**: 留空（默认为根目录）
   - 点击 **Save and Deploy**

#### 方法二：直接上传

1. 在 Cloudflare Pages 中选择 **Upload Assets**
2. 将整个项目文件夹拖拽上传
3. 部署完成

## 🛠️ 技术栈

- **纯前端**：HTML5 + CSS3 + JavaScript (ES6+)
- **无框架依赖**：零构建，直接运行
- **本地存储**：使用 localStorage 保存游戏进度
- **响应式设计**：适配桌面和移动端

## 📁 项目结构

```
流浪地牢/
├── index.html      # 主页面
├── styles.css      # 样式文件
├── game.js         # 游戏逻辑
├── GAME_DESIGN.md  # 游戏设计文档
└── README.md       # 项目说明
```

## 🎯 游戏目标

- 通过 3 层地牢，击败每层的 Boss
- 构筑强力卡组，获得稀有遗物
- 在有限的资源下做出最优决策
- 挑战最高分，解锁所有成就（待实现）

## 🎨 职业介绍

### 战士
- 高生命值（80 HP）
- 初始能量：3
- 擅长近战攻击和防御

### 法师
- 中等生命值（60 HP）
- 初始能量：3
- 擅长法术伤害和抽牌

### 盗贼
- 中等生命值（60 HP）
- 初始能量：3
- 擅长快速攻击和金币获取

## 📝 开发日志

详见 [GAME_DESIGN.md](GAME_DESIGN.md) 了解游戏设计细节。

## 📄 许可证

MIT License

---

**开发中** ✨ - 持续添加新功能和优化体验！
