# ⚔️ 流浪地牢 - 卡牌构筑 Roguelike

<div align="center">

![流浪地牢](https://img.shields.io/badge/流浪地牢-卡牌构筑 Roguelike-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-开发中-orange)

**一个精美的纯前端卡牌构筑 Roguelike 网页游戏**

[在线试玩](https://your-name.pages.dev) | [设计文档](GAME_DESIGN.md) | [报告 Bug](https://github.com/your-username/dungeon-crawler/issues)

</div>

---

## 🎮 游戏特色

- **✨ 3 个职业**：战士、法师、盗贼，每个职业有独特的初始卡牌和属性
- **🃏 30+ 张卡牌**：攻击卡、技能卡、防御卡，支持锻造升级
- **🏺 遗物系统**：获得各种被动增益道具，改变游戏玩法
- **🗺️ 动态地图**：4 列布局，每层随机生成 8-12 条路径
- **⚔️ 难度递增**：敌人属性、商店价格随楼层动态提升
- **🎯 完整系统**：战斗、商店、休息、事件、Boss 战、新手引导
- **💾 本地存档**：保存最高分和游戏统计
- **📱 响应式设计**：完美适配桌面和移动端

---

## 🎨 游戏截图

> TODO: 添加游戏截图

- 主菜单界面
- 职业选择
- 地图探索
- 战斗场景
- 卡牌奖励
- 遗物系统

---

## 🚀 快速开始

### 方式一：在线试玩（推荐）

直接访问部署好的版本：
- **Cloudflare Pages**: [https://your-name.pages.dev](https://your-name.pages.dev)
- **GitHub Pages**: [https://your-username.github.io/dungeon-crawler](https://your-username.github.io/dungeon-crawler)

### 方式二：本地运行

1. **克隆仓库**
   ```bash
   git clone https://github.com/your-username/dungeon-crawler.git
   cd dungeon-crawler
   ```

2. **直接在浏览器中打开**
   ```bash
   # 方法 A：直接双击 index.html
   # 方法 B：使用 Python 本地服务器
   python -m http.server 8080
   # 访问 http://localhost:8080
   ```

---

## 📦 部署指南

### 部署到 Cloudflare Pages

#### 方法 A：通过 GitHub 自动部署（推荐）

1. **推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: 流浪地牢游戏"
   git branch -M main
   git remote add origin https://github.com/你的用户名/dungeon-crawler.git
   git push -u origin main
   ```

2. **在 Cloudflare 中设置**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 **Pages** → **Create a project**
   - 选择 **Connect to Git**
   - 选择 `dungeon-crawler` 仓库
   - 配置：
     - **Framework preset**: None
     - **Build command**: 留空（纯静态，无需构建）
     - **Build output directory**: 留空（默认为根目录）
   - 点击 **Save and Deploy**

#### 方法 B：直接上传

1. 在 Cloudflare Pages 中选择 **Upload Assets**
2. 上传以下文件：
   - `index.html`
   - `game.js`
   - `styles.css`
   - `README.md`（可选）
3. 部署完成

### 部署到 GitHub Pages

1. **推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/dungeon-crawler.git
   git push -u origin main
   ```

2. **开启 GitHub Pages**
   - 进入仓库页面
   - 点击 **Settings** → **Pages**
   - 在 **Source** 下选择 **main branch**
   - 点击 **Save**
   - 等待几分钟，访问 `https://你的用户名.github.io/dungeon-crawler/`

---

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| **HTML5** | 页面结构和游戏容器 |
| **CSS3** | 样式、动画、响应式设计 |
| **JavaScript (ES6+)** | 游戏逻辑、状态管理 |
| **LocalStorage** | 保存游戏进度和统计 |
| **SVG** | 动态地图路径连线 |

**特点**：
- ✅ 纯前端，零依赖
- ✅ 无需构建，直接运行
- ✅ 模块化代码结构
- ✅ 响应式布局

---

## 📁 项目结构

```
dungeon-crawler/
├── index.html          # 主页面入口
├── game.js             # 游戏核心逻辑
├── styles.css          # 全局样式
├── GAME_DESIGN.md      # 详细游戏设计文档
├── README.md           # 项目说明（本文件）
├── .gitignore          # Git 忽略配置
└── LICENSE             # 开源许可证
```

### 核心文件说明

- **`index.html`**: 游戏 UI 结构，包含所有界面容器
- **`game.js`**: 完整游戏逻辑（约 2000 行代码）
  - 游戏状态管理
  - 地图生成系统
  - 战斗计算系统
  - 卡牌/遗物/事件系统
- **`styles.css`**: 游戏视觉样式
  - 响应式布局
  - 动画效果
  - 主题配色

---

## 🎯 游戏目标

1. **探索地牢**：通过 3 层地牢，每层 4 行节点
2. **构筑卡组**：收集卡牌，升级强化
3. **获取遗物**：获得稀有被动道具
4. **击败 Boss**：挑战每层的最终 Boss
5. **冲击高分**：解锁成就，挑战自我

### 胜利条件
- 击败第 3 层的最终 Boss（远古巨龙）
- 获得最高分并保存

---

## 🎮 职业介绍

### ⚔️ 战士
- **生命值**: 80 HP
- **初始能量**: 3
- **初始遗物**: 燃烧之血（战斗结束恢复 6 HP）
- **特点**: 高生存能力，擅长近战
- **初始卡牌**: 重击、巨剑、铁波等

### 🔮 法师
- **生命值**: 60 HP
- **初始能量**: 3
- **初始遗物**: 蛇之戒指（战斗开始额外抽 2 牌）
- **特点**: 高爆发伤害，抽牌能力强
- **初始卡牌**: 魔法飞弹、火球、护盾等

### 🗡️ 盗贼
- **生命值**: 65 HP
- **初始能量**: 3
- **初始遗物**: 船锚（战斗开始获得 10 格挡）
- **特点**: 快速攻击，资源丰富
- **初始卡牌**: 快速攻击、飞刀、背刺等

---

## 🎨 核心系统

### 1. 卡牌系统
- **攻击牌**: 造成伤害
- **防御牌**: 获得格挡
- **技能牌**: 特殊效果
- **锻造升级**: 减少费用，增强效果

### 2. 遗物系统
- **普通遗物**: 燃烧之血、蛇之戒指等
- **稀有遗物**: 青铜鳞、水银沙漏等
- **史诗遗物**: 诅咒钥匙、永恒羽毛等

### 3. 地图系统
- **节点类型**: 战斗、商店、休息、事件、Boss
- **路径生成**: 可达性算法，保证所有节点可到达
- **动态解锁**: 完成节点后解锁下一行

### 4. 战斗系统
- **回合制**: 玩家回合 → 敌人回合
- **能量管理**: 每回合 3-4 点能量
- **状态效果**: 力量、敏捷、虚弱、易伤
- **遗物联动**: 各种遗物影响战斗

---

## 📝 开发日志

### 最新版本: v0.2.0 (2026-04-17)

#### 新增功能
- ✅ 新手引导系统（5 步教程）
- ✅ 动态难度调整（每层 +20%）
- ✅ 多路径地图生成（8-12 条路径）
- ✅ 遗物列表查看界面
- ✅ 商店价格随楼层递增

#### 修复问题
- 🐛 修复进入新楼层时节点锁定问题
- 🐛 修复卡牌选择无反馈问题
- 🐛 修复 Boss 战卡牌重复选择问题
- 🐛 统一提示系统为 alert 弹窗

#### 优化改进
- ⚡ 优化路径生成算法
- ⚡ 改进 UI 视觉反馈
- ⚡ 增强移动端适配

> 详细开发记录见 [.workbuddy/memory/](.workbuddy/memory/)

---

## 🤝 贡献指南

欢迎贡献代码！提交 PR 前请确保：
1. 代码符合现有风格
2. 测试过主要功能
3. 更新相关文档

---

## 📄 许可证

MIT License - 自由使用、修改和分发

---

## 📮 联系方式

- **问题反馈**: [GitHub Issues](https://github.com/your-username/dungeon-crawler/issues)
- **功能建议**: 直接提 PR 或开 Issue
- **作者**: [你的用户名](https://github.com/your-username)

---

<div align="center">

**Made with ❤️ by 你的用户名**

⭐ 如果这个项目对你有帮助，请给一个 Star！

</div>
