// ==================== 游戏数据 ====================

// 职业配置
const CLASSES = {
    warrior: {
        name: '战士',
        icon: '⚔️',
        maxHp: 80,
        energy: 3,
        startingDeck: ['strike', 'strike', 'strike', 'strike', 'defend', 'defend', 'defend', 'defend', 'bash', 'heavy_blade']
    },
    mage: {
        name: '法师',
        icon: '🔮',
        maxHp: 60,
        energy: 4,
        startingDeck: ['strike', 'strike', 'strike', 'defend', 'defend', 'magic_missile', 'magic_missile', 'fireball', 'shield', 'mana_burst']
    },
    rogue: {
        name: '盗贼',
        icon: '🗡️',
        maxHp: 65,
        energy: 3,
        startingDeck: ['strike', 'strike', 'strike', 'strike', 'defend', 'defend', 'quick_attack', 'quick_attack', 'dagger_throw', 'backstab']
    }
};

// 卡牌数据库
const CARD_DB = {
    // 基础牌
    strike: { name: '打击', cost: 1, type: 'attack', icon: '⚔️', desc: '造成 6 点伤害', effect: { damage: 6 } },
    defend: { name: '防御', cost: 1, type: 'defense', icon: '🛡️', desc: '获得 5 点格挡', effect: { block: 5 } },
    
    // 战士牌
    bash: { name: '重击', cost: 2, type: 'attack', icon: '🔨', desc: '造成 8 点伤害，获得 2 点格挡', effect: { damage: 8, block: 2 } },
    heavy_blade: { name: '巨剑', cost: 2, type: 'attack', icon: '⚔️', desc: '造成 14 点伤害', effect: { damage: 14 } },
    iron_wave: { name: '铁波', cost: 1, type: 'attack', icon: '〰️', desc: '造成 5 点伤害，获得 5 点格挡', effect: { damage: 5, block: 5 } },
    shrug_it_off: { name: '耸肩', cost: 1, type: 'skill', icon: '🤷', desc: '获得 8 点格挡，抽 1 张牌', effect: { block: 8, draw: 1 } },
    pommel_strike: { name: '剑柄打击', cost: 1, type: 'attack', icon: '🗡️', desc: '造成 9 点伤害，抽 1 张牌', effect: { damage: 9, draw: 1 } },
    
    // 法师牌
    magic_missile: { name: '魔法飞弹', cost: 1, type: 'attack', icon: '✨', desc: '造成 8 点伤害', effect: { damage: 8 } },
    fireball: { name: '火球术', cost: 2, type: 'attack', icon: '🔥', desc: '造成 20 点伤害', effect: { damage: 20 } },
    shield: { name: '魔法盾', cost: 1, type: 'defense', icon: '🔷', desc: '获得 10 点格挡', effect: { block: 10 } },
    mana_burst: { name: '魔力爆发', cost: 0, type: 'attack', icon: '💥', desc: '造成 4 点伤害，抽 1 张牌', effect: { damage: 4, draw: 1 } },
    frost_bolt: { name: '寒冰箭', cost: 1, type: 'attack', icon: '❄️', desc: '造成 6 点伤害，敌人下回合伤害-3', effect: { damage: 6, weak: 1 } },
    arcane_intellect: { name: '奥术智慧', cost: 1, type: 'skill', icon: '📖', desc: '抽 2 张牌', effect: { draw: 2 } },
    
    // 盗贼牌
    quick_attack: { name: '快速攻击', cost: 0, type: 'attack', icon: '⚡', desc: '造成 4 点伤害', effect: { damage: 4 } },
    dagger_throw: { name: '飞刀', cost: 1, type: 'attack', icon: '🗡️', desc: '造成 6 点伤害，抽 1 张牌', effect: { damage: 6, draw: 1 } },
    backstab: { name: '背刺', cost: 2, type: 'attack', icon: '🔪', desc: '造成 16 点伤害', effect: { damage: 16 } },
    dodge: { name: '闪避', cost: 1, type: 'defense', icon: '💨', desc: '获得 6 点格挡，抽 1 张牌', effect: { block: 6, draw: 1 } },
    slice: { name: '切割', cost: 1, type: 'attack', icon: '✂️', desc: '造成 7 点伤害', effect: { damage: 7 } },
    
    // 通用强力牌
    sword_boomerang: { name: '回旋剑', cost: 1, type: 'attack', icon: '🔄', desc: '随机造成 3 点伤害 3 次', effect: { damage: 3, times: 3 } },
    twin_strike: { name: '双重打击', cost: 1, type: 'attack', icon: '👊', desc: '造成 5 点伤害 2 次', effect: { damage: 5, times: 2 } },
    anger: { name: '愤怒', cost: 0, type: 'attack', icon: '😤', desc: '造成 6 点伤害，将一张愤怒放入弃牌堆', effect: { damage: 6, addCard: 'anger' } },
    cleave: { name: '顺劈斩', cost: 1, type: 'attack', icon: '⚔️', desc: '对所有敌人造成 8 点伤害', effect: { damage: 8, aoe: true } },
    
    // 防御牌
    footwork: { name: '步法', cost: 1, type: 'skill', icon: '👟', desc: '获得 3 点敏捷（每打出防御牌额外+1格挡）', effect: { dexterity: 3 } },
    ghostly_armor: { name: '幽灵护甲', cost: 1, type: 'defense', icon: '👻', desc: '获得 10 点格挡，不能被打出', effect: { block: 10, ethereal: true } },
    
    // 技能牌
    battle_trance: { name: '战斗专注', cost: 0, type: 'skill', icon: '🧘', desc: '抽 3 张牌，本回合不能再抽牌', effect: { draw: 3, noDraw: true } },
    bloodletting: { name: '放血', cost: 0, type: 'skill', icon: '🩸', desc: '失去 3 点生命，获得 2 点能量', effect: { hpCost: 3, energy: 2 } },
    seeing_red: { name: '看见红色', cost: 1, type: 'skill', icon: '🔴', desc: '获得 2 点能量，将这张牌放入抽牌堆', effect: { energy: 2, shuffle: true } }
};

// 敌人数据库
const ENEMY_DB = {
    // 第一层
    goblin: { name: '哥布林', hp: 30, icon: '👹', pattern: 'simple', damage: 8 },
    slime: { name: '史莱姆', hp: 40, icon: '🟢', pattern: 'simple', damage: 6 },
    skeleton: { name: '骷髅', hp: 35, icon: '💀', pattern: 'defensive', damage: 7 },
    
    // 第二层
    orc: { name: '兽人', hp: 50, icon: '👺', pattern: 'aggressive', damage: 12 },
    dark_mage: { name: '黑暗法师', hp: 45, icon: '🧙‍♂️', pattern: 'caster', damage: 15 },
    werewolf: { name: '狼人', hp: 55, icon: '🐺', pattern: 'aggressive', damage: 10 },
    
    // 第三层
    demon: { name: '恶魔', hp: 70, icon: '👿', pattern: 'aggressive', damage: 14 },
    dragon: { name: '幼龙', hp: 80, icon: '🐉', pattern: 'caster', damage: 18 },
    
    // 精英敌人（新增）
    elite_orc: { name: '精英兽人', hp: 70, icon: '👹⚡', pattern: 'aggressive', damage: 14 },
    elite_demon: { name: '精英恶魔', hp: 95, icon: '👿⚡', pattern: 'aggressive', damage: 17 },
    elite_dragon: { name: '精英幼龙', hp: 110, icon: '🐉⚡', pattern: 'caster', damage: 21 },
    
    // Boss
    boss_goblin_king: { name: '哥布林王', hp: 120, icon: '👑', pattern: 'boss', damage: 15 },
    boss_lich: { name: '巫妖', hp: 150, icon: '💀', pattern: 'boss', damage: 18 },
    boss_dragon: { name: '远古巨龙', hp: 200, icon: '🐲', pattern: 'boss', damage: 22 }
};

// 分层节点类型配置（新增）
const FLOOR_NODE_CONFIG = {
    1: {
        // 第一层：教学与适应
        battles: 0.50,      // 50% 战斗
        shops: 0.12,        // 12% 商店
        rests: 0.06,        // 6% 休息
        events: 0.12,       // 12% 事件
        elites: 0,          // 0% 精英
        boss: 0.06          // 6% Boss
    },
    2: {
        // 第二层：深化与挑战
        battles: 0.56,      // 56% 战斗
        shops: 0.12,        // 12% 商店
        rests: 0.06,        // 6% 休息
        events: 0.12,       // 12% 事件
        elites: 0.06,       // 6% 精英
        boss: 0.06          // 6% Boss
    },
    3: {
        // 第三层：终极考验
        battles: 0.62,      // 62% 战斗
        shops: 0.06,        // 6% 商店
        rests: 0,           // 0% 休息
        events: 0.06,       // 6% 事件
        elites: 0.19,       // 19% 精英
        boss: 0.06          // 6% Boss
    }
};

// 遗物数据库
const RELIC_DB = {
    burning_blood: { name: '燃烧之血', icon: '🩸', desc: '战斗结束时恢复 6 点生命', rarity: 'common' },
    ring_of_the_snake: { name: '蛇之戒指', icon: '💍', desc: '战斗开始时额外抽 2 张牌', rarity: 'common' },
    akabeko: { name: '赤猫', icon: '🐱', desc: '每场战斗第一次攻击造成 8 点额外伤害', rarity: 'common' },
    anchor: { name: '船锚', icon: '⚓', desc: '每场战斗开始时获得 10 点格挡', rarity: 'common' },
    ancient_tea_set: { name: '古茶具', icon: '🍵', desc: '在休息处恢复额外 10 点生命', rarity: 'common' },
    
    bronze_scales: { name: '青铜鳞', icon: '🐍', desc: '每当你受到伤害，对攻击者造成 3 点伤害', rarity: 'uncommon' },
    mercury_hourglass: { name: '水银沙漏', icon: '⏳', desc: '每回合开始时对所有敌人造成 3 点伤害', rarity: 'uncommon' },
    ornamental_fan: { name: '装饰扇', icon: '🪭', desc: '每打出 3 张攻击牌，获得 4 点格挡', rarity: 'uncommon' },
    
    cursed_key: { name: '诅咒钥匙', icon: '🗝️', desc: '获得时获得 1 个普通遗物，但宝箱变成诅咒', rarity: 'rare' },
    eternal_feather: { name: '永恒羽毛', icon: '🪶', desc: '每添加一张牌到牌组，恢复 3 点生命', rarity: 'rare' },
    gambling_chip: { name: '赌博筹码', icon: '🎰', desc: '战斗开始时丢弃任意张牌并抽等量牌', rarity: 'rare' }
};

// 药水数据库
const POTION_DB = {
    health_potion: { name: '生命药水', icon: '❤️', desc: '恢复 20 点生命', effect: { heal: 20 } },
    energy_potion: { name: '能量药水', icon: '⚡', desc: '获得 2 点能量', effect: { energy: 2 } },
    strength_potion: { name: '力量药水', icon: '💪', desc: '获得 3 点力量', effect: { strength: 3 } },
    block_potion: { name: '格挡药水', icon: '🛡️', desc: '获得 12 点格挡', effect: { block: 12 } },
    fire_potion: { name: '火焰药水', icon: '🔥', desc: '造成 20 点伤害', effect: { damage: 20 } }
};

// 事件数据库
const EVENT_DB = [
    {
        title: '神秘宝箱',
        sprite: '📦',
        desc: '你发现一个古老的宝箱，上面刻着奇怪的符文。',
        choices: [
            { text: '打开它（可能获得遗物或受伤）', action: 'chest_open' },
            { text: '离开', action: 'leave' }
        ]
    },
    {
        title: '神秘祭坛',
        sprite: '⛩️',
        desc: '一个散发着诡异光芒的祭坛，似乎在等待献祭。',
        choices: [
            { text: '献祭 10 点最大生命换取遗物', action: 'altar_sacrifice' },
            { text: '祈祷（恢复 20 点生命）', action: 'altar_pray' },
            { text: '离开', action: 'leave' }
        ]
    },
    {
        title: '流浪商人',
        sprite: '🧳',
        desc: '一个神秘的商人愿意用遗物交换金币。',
        choices: [
            { text: '花费 50 金币购买遗物', action: 'merchant_buy', gold: 50 },
            { text: '偷窃（高风险）', action: 'merchant_steal' },
            { text: '离开', action: 'leave' }
        ]
    },
    {
        title: '神秘泉水',
        sprite: '💧',
        desc: '一汪清澈的泉水，散发着治愈的气息。',
        choices: [
            { text: '饮用（恢复 30% 生命）', action: 'fountain_drink' },
            { text: '装满瓶子（获得药水）', action: 'fountain_fill' },
            { text: '离开', action: 'leave' }
        ]
    }
];

// ==================== 游戏状态 ====================

let gameState = {
    player: {
        class: 'warrior',
        hp: 80,
        maxHp: 80,
        energy: 3,
        maxEnergy: 3,
        block: 0,
        gold: 0,
        deck: [],
        relics: [],
        potions: [],
        stats: {
            strength: 0,
            dexterity: 0,
            weak: 0,
            vulnerable: 0
        }
    },
    battle: {
        hand: [],
        drawPile: [],
        discardPile: [],
        exhaustPile: [],
        enemy: null,
        turn: 1,
        firstAttack: true,
        noDraw: false,
        ornamentalFanCount: 0
    },
    map: {
        floor: 1,
        nodes: [],
        currentNode: null,
        completedNodes: new Set()
    },
    stats: {
        enemiesKilled: 0,
        cardsAdded: 0,
        relicsFound: 0,
        highestFloor: 0
    }
};

// ==================== 工具函数 ====================

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active', 'floor-1', 'floor-2', 'floor-3');
    });
    const screen = document.getElementById(screenId);
    screen.classList.add('active');
    
    // 为地图屏幕添加楼层类名
    if (screenId === 'map-screen') {
        const floor = gameState.map.floor;
        screen.classList.add(`floor-${floor}`);
    }
    
    // 为战斗屏幕添加楼层类名
    if (screenId === 'battle-screen') {
        const floor = gameState.map.floor;
        screen.classList.add(`floor-${floor}`);
    }
}

function showDamage(target, amount, type = 'damage') {
    const el = document.createElement('div');
    el.className = type === 'heal' ? 'heal-number' : type === 'block' ? 'block-number' : 'damage-number';
    el.textContent = amount;
    // 随机位置微调，避免完全重叠
    const randomOffset = (Math.random() - 0.5) * 20;
    el.style.left = `calc(50% + ${randomOffset}px)`;
    el.style.top = '50%';
    target.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

function showDamageWithFeedback(target, amount, type = 'damage', isCritical = false) {
    const el = document.createElement('div');
    el.className = type === 'heal' ? 'heal-number' : type === 'block' ? 'block-number' : 'damage-number';
    
    if (isCritical) {
        el.classList.add('critical');
        el.textContent = '💥 ' + amount;
    } else {
        el.textContent = amount;
    }
    
    const randomOffset = (Math.random() - 0.5) * 20;
    el.style.left = `calc(50% + ${randomOffset}px)`;
    el.style.top = '50%';
    target.appendChild(el);
    setTimeout(() => el.remove(), 1200);
}

function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => element.classList.remove('shake'), 500);
}

function showFloatingText(text, target, color = '#fff') {
    const el = document.createElement('div');
    el.className = 'floating-text';
    el.textContent = text;
    el.style.color = color;
    el.style.left = '50%';
    el.style.top = '30%';
    target.appendChild(el);
    setTimeout(() => el.remove(), 1500);
}

// ==================== 游戏初始化 ====================

function initGame() {
    // 加载最高分
    const savedScore = localStorage.getItem('dungeonCardHighScore');
    if (savedScore) {
        document.getElementById('menu-high-score').textContent = savedScore;
    }
    
    // 绑定主菜单按钮
    document.getElementById('start-game').addEventListener('click', () => {
        showScreen('class-select');
    });
    
    document.getElementById('select-class').addEventListener('click', () => {
        showScreen('class-select');
    });
    
    document.getElementById('view-stats').addEventListener('click', showStatsModal);
    
    // 查看遗物
    document.getElementById('view-relics').addEventListener('click', showRelicsList);
    document.getElementById('close-relics').addEventListener('click', closeRelicsList);
    
    // 职业选择
    document.querySelectorAll('.class-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });
    
    document.getElementById('confirm-class').addEventListener('click', startNewGame);
    document.getElementById('back-to-menu').addEventListener('click', () => showScreen('main-menu'));
    
    // 其他按钮绑定
    document.getElementById('view-deck').addEventListener('click', showDeckModal);
    document.getElementById('close-deck').addEventListener('click', hideDeckModal);
    document.getElementById('end-turn').addEventListener('click', endTurn);
    document.getElementById('abandon-run').addEventListener('click', () => {
        if (confirm('确定要放弃这局游戏吗？')) {
            showScreen('main-menu');
        }
    });
    document.getElementById('skip-card').addEventListener('click', () => {
        showScreen('map-screen');
        generateMap();
    });
    document.getElementById('leave-shop').addEventListener('click', () => {
        showScreen('map-screen');
        generateMap();
    });
    document.getElementById('leave-rest').addEventListener('click', () => {
        showScreen('map-screen');
        generateMap();
    });
    document.getElementById('return-menu').addEventListener('click', () => showScreen('main-menu'));
    
    // 休息处按钮
    document.getElementById('rest-heal').addEventListener('click', restHeal);
    document.getElementById('rest-upgrade').addEventListener('click', restUpgrade);
}

function startNewGame() {
    const selectedClass = document.querySelector('.class-card.selected').dataset.class;
    const classData = CLASSES[selectedClass];
    
    // 根据职业设置初始金币（战士 100，法师 80，盗贼 120）
    const initialGold = selectedClass === 'warrior' ? 100 :
                       selectedClass === 'mage' ? 80 : 120;
    
    // 初始化玩家状态
    gameState.player = {
        class: selectedClass,
        hp: classData.maxHp,
        maxHp: classData.maxHp,
        energy: classData.energy,
        maxEnergy: classData.energy,
        block: 0,
        gold: initialGold,
        deck: [...classData.startingDeck],
        relics: [],
        potions: [],
        stats: {
            strength: 0,
            dexterity: 0,
            weak: 0,
            vulnerable: 0
        }
    };
    
    // 重置地图（保留 path 为空，让 generateMap 生成新路径）
    gameState.map = {
        floor: 1,
        nodes: [],
        currentNode: null,
        completedNodes: new Set(),
        path: [],  // 清空路径，让新层生成新路径
        paths: [],  // 清空多路径
        nodeTypes: null  // 清空节点类型
    };
    
    // 重置统计
    gameState.stats = {
        enemiesKilled: 0,
        cardsAdded: 0,
        relicsFound: 0,
        highestFloor: 0
    };
    
    // 给初始遗物
    if (selectedClass === 'warrior') {
        addRelic('burning_blood');
    } else if (selectedClass === 'mage') {
        addRelic('ring_of_the_snake');
    } else if (selectedClass === 'rogue') {
        addRelic('anchor');
    }
    
    showScreen('map-screen');
    generateMap();
}

// ==================== 地图系统 ====================

function generateMap() {
    const floor = gameState.map.floor;
    const nodesContainer = document.getElementById('map-nodes');
    nodesContainer.innerHTML = '';
    
    // 更新地图头部信息
    document.getElementById('map-player-hp').textContent = `❤️ ${gameState.player.hp}/${gameState.player.maxHp}`;
    document.getElementById('map-player-gold').textContent = `💰 ${gameState.player.gold}`;
    document.getElementById('map-floor').textContent = `第 ${floor} 层`;
    
    // 添加地图说明（优化版）
    const mapInfo = document.createElement('div');
    mapInfo.className = 'map-info';
    
    // 根据楼层显示不同的提示
    let floorHint = '';
    if (floor === 1) {
        floorHint = '🌱 第一层：熟悉机制，谨慎探索';
    } else if (floor === 2) {
        floorHint = '⚔️ 第二层：策略规划，资源管理';
    } else {
        floorHint = '🔥 第三层：极限考验，全力以赴！';
    }
    
    mapInfo.innerHTML = `
        <div class="legend">
            <span>⚔️ 战斗</span>
            <span>🏪 商店</span>
            <span>🔥 休息</span>
            <span>❓ 事件</span>
            <span>👑 BOSS</span>
            <span>⚡ 精英</span>
        </div>
        <div class="path-legend">
            <span>● 可选路径</span>
        </div>
        <p class="hint">${floorHint}</p>
    `;
    nodesContainer.appendChild(mapInfo);
    
    // 生成节点类型（使用分层配置）
    const nodeTypes = getFloorNodeTypes(floor);
    const rows = 4;  // 4 行：3 行普通 + 1 行 Boss
    const nodesPerRow = 4;
    
    gameState.map.nodes = [];
    
    // 先检查每行是否已经有完成的节点
    const rowHasCompleted = new Set();
    gameState.map.completedNodes.forEach(nodeId => {
        const [row] = nodeId.split('-').map(Number);
        rowHasCompleted.add(row);
    });
    
    // 如果当前层还没有路径，生成多条新路径；否则使用保存的路径
    let paths = gameState.map.paths;
    if (!paths || paths.length === 0) {
        // 生成可达路径系统，确保所有节点都可达
        paths = generateReachablePaths(rows, nodesPerRow);
        gameState.map.paths = paths;
        // 为了兼容旧代码，保留 path 字段
        gameState.map.path = paths[0];
    }
    
    // 如果还没有保存节点类型，生成并保存（使用分层配置）
    if (!gameState.map.nodeTypes) {
        gameState.map.nodeTypes = {};
        for (let row = 0; row < rows - 1; row++) {  // 不包括 Boss 行
            for (let col = 0; col < nodesPerRow; col++) {
                gameState.map.nodeTypes[`${row}-${col}`] = nodeTypes[randomInt(0, nodeTypes.length - 1)];
            }
        }
    }
    
    for (let row = 0; row < rows; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'map-row';
        
        const rowNodes = [];
        for (let col = 0; col < nodesPerRow; col++) {
            let type;
            if (row === rows - 1) {
                type = 'boss';
            } else {
                // 使用保存的节点类型，如果没有则生成新的
                const nodeId = `${row}-${col}`;
                type = gameState.map.nodeTypes[nodeId] || nodeTypes[randomInt(0, nodeTypes.length - 1)];
            }
            
            const nodeId = `${row}-${col}`;
            const node = { id: nodeId, type, row, col };
            rowNodes.push(node);
            gameState.map.nodes.push(node);
            
            const nodeEl = document.createElement('div');
            nodeEl.className = `map-node ${type}`;
            nodeEl.dataset.nodeId = nodeId;
            
            // 更新图标映射（添加精英）
            const icons = {
                battle: '⚔️',
                shop: '🏪',
                rest: '🔥',
                event: '❓',
                boss: '👑',
                elite: '⚡'
            };
            
            nodeEl.innerHTML = `
                <span>${icons[type]}</span>
                <span class="node-label">${getNodeLabel(type)}</span>
            `;
            
            // 根据 completedNodes 和路径设置节点状态
            const paths = gameState.map.paths;
            // 检查节点是否在任意一条路径上
            let isOnAnyPath = false;
            let pathIndexOnPath = -1;
            let prevNodeId = null;
            
            for (let pIndex = 0; pIndex < paths.length; pIndex++) {
                const path = paths[pIndex];
                const pathIndex = path.findIndex(p => p.row === row && p.col === col);
                if (pathIndex !== -1) {
                    isOnAnyPath = true;
                    pathIndexOnPath = pathIndex;
                    if (pathIndex > 0) {
                        const prevPathNode = path[pathIndex - 1];
                        prevNodeId = `${prevPathNode.row}-${prevPathNode.col}`;
                    }
                    break;
                }
            }
            
            if (gameState.map.completedNodes.has(nodeId)) {
                // 已完成的节点
                nodeEl.classList.add('completed');
            } else if (rowHasCompleted.has(row)) {
                // 该行已经有完成的节点，其他节点全部锁定
                nodeEl.classList.add('locked');
            } else if (row === 0 && isOnAnyPath) {
                // 第一行可达的节点默认可用
                nodeEl.classList.add('available');
            } else if (isOnAnyPath && row > 0) {
                // 第 1 行及以后的可达节点，检查是否有任何一个前驱节点已完成
                let hasAnyPrevCompleted = false;
                for (let path of paths) {
                    const pathIndex = path.findIndex(p => p.row === row && p.col === col);
                    if (pathIndex > 0) {
                        const prevNode = path[pathIndex - 1];
                        const prevNodeId = `${prevNode.row}-${prevNode.col}`;
                        if (gameState.map.completedNodes.has(prevNodeId)) {
                            hasAnyPrevCompleted = true;
                            break;
                        }
                    }
                }
                
                if (hasAnyPrevCompleted) {
                    nodeEl.classList.add('available');
                } else {
                    nodeEl.classList.add('locked');
                }
            } else {
                // 不可达的节点全部锁定
                nodeEl.classList.add('locked');
            }
            
            nodeEl.addEventListener('click', () => enterNode(node));
            rowDiv.appendChild(nodeEl);
        }
        
        nodesContainer.appendChild(rowDiv);
    }
    
    // 生成随机路径的连线（延迟执行，确保元素已渲染）
    setTimeout(() => {
        generatePathLines(nodesContainer, paths);
    }, 100);
}

// 新增：根据楼层获取节点类型配置
function getFloorNodeTypes(floor) {
    const config = FLOOR_NODE_CONFIG[floor] || FLOOR_NODE_CONFIG[1];
    const types = [];
    
    // 根据配置比例生成节点类型数组
    const totalNodes = 12; // 3 行 × 4 列 = 12 个普通节点
    const counts = {
        battle: Math.floor(totalNodes * config.battles),
        shop: Math.floor(totalNodes * config.shops),
        rest: Math.floor(totalNodes * config.rests),
        event: Math.floor(totalNodes * config.events),
        elite: Math.floor(totalNodes * config.elites)
    };
    
    // 确保总数为 12，调整战斗数量
    const currentTotal = Object.values(counts).reduce((a, b) => a + b, 0);
    counts.battle += (totalNodes - currentTotal);
    
    // 生成类型数组
    for (let i = 0; i < counts.battle; i++) types.push('battle');
    for (let i = 0; i < counts.shop; i++) types.push('shop');
    for (let i = 0; i < counts.rest; i++) types.push('rest');
    for (let i = 0; i < counts.event; i++) types.push('event');
    for (let i = 0; i < counts.elite; i++) types.push('elite');
    
    return types;
}

// 新增：获取节点标签
function getNodeLabel(type) {
    const labels = {
        battle: '战斗',
        shop: '商店',
        rest: '休息',
        event: '事件',
        boss: 'BOSS',
        elite: '精英'
    };
    return labels[type] || '';
}

// 生成可达路径系统：确保所有节点都至少有一条路径可以到达 BOSS
// 采用反向构建法：从 BOSS 向上回溯，确定哪些节点可达
// 优化：增加路径密度，为多个起始点生成多条路径
function generateReachablePaths(rows, nodesPerRow) {
    const paths = [];
    const reachableNodes = new Set(); // 记录所有可达节点
    
    // 步骤 1：从下往上构建可达性图
    // 第 4 行（BOSS 行）所有节点都可达
    for (let col = 0; col < nodesPerRow; col++) {
        reachableNodes.add(`${rows - 1}-${col}`);
    }
    
    // 从下往上逐行检查，如果某行某列的节点能到达下一行的可达节点，则它也可达
    for (let row = rows - 2; row >= 0; row--) {
        for (let col = 0; col < nodesPerRow; col++) {
            // 检查这个节点能否到达下一行的任意可达节点
            const nextRow = row + 1;
            const canReachNext = [];
            for (let nextCol = Math.max(0, col - 1); nextCol <= Math.min(nodesPerRow - 1, col + 1); nextCol++) {
                if (reachableNodes.has(`${nextRow}-${nextCol}`)) {
                    canReachNext.push(nextCol);
                }
            }
            
            // 如果能到达下一行的可达节点，则这个节点也可达
            if (canReachNext.length > 0) {
                reachableNodes.add(`${row}-${col}`);
            }
        }
    }
    
    // 步骤 2：增加路径密度 - 为多个起始点生成多条路径
    // 不仅为首行节点生成路径，还为中间行的多个节点生成路径
    
    // 2.1 为首行的每个可达节点生成 1-2 条路径
    for (let startCol = 0; startCol < nodesPerRow; startCol++) {
        if (!reachableNodes.has(`0-${startCol}`)) continue;
        
        // 为每个首行节点生成 1-2 条路径（增加随机性）
        const pathsFromStart = randomInt(1, 2);
        for (let p = 0; p < pathsFromStart; p++) {
            const path = [{ row: 0, col: startCol }];
            let currentCol = startCol;
            
            for (let row = 1; row < rows; row++) {
                const possibleCols = [];
                for (let c = Math.max(0, currentCol - 1); c <= Math.min(nodesPerRow - 1, currentCol + 1); c++) {
                    if (reachableNodes.has(`${row}-${c}`)) {
                        possibleCols.push(c);
                    }
                }
                
                if (possibleCols.length > 0) {
                    // 随机选择一个可达的下一节点
                    currentCol = possibleCols[randomInt(0, possibleCols.length - 1)];
                    path.push({ row, col: currentCol });
                } else {
                    break;
                }
            }
            
            if (path.length === rows && !paths.some(existingPath => 
                JSON.stringify(existingPath) === JSON.stringify(path)
            )) {
                paths.push(path);
            }
        }
    }
    
    // 2.2 为第二行的多个可达节点生成额外路径（增加路径密度）
    for (let startCol = 0; startCol < nodesPerRow; startCol++) {
        if (!reachableNodes.has(`1-${startCol}`)) continue;
        
        // 为第二行的部分节点生成额外路径
        if (randomInt(0, 1) === 0) continue; // 50% 概率跳过，避免路径过多
        
        const path = [{ row: 0, col: randomInt(0, nodesPerRow - 1) }];
        path.push({ row: 1, col: startCol });
        let currentCol = startCol;
        
        for (let row = 2; row < rows; row++) {
            const possibleCols = [];
            for (let c = Math.max(0, currentCol - 1); c <= Math.min(nodesPerRow - 1, currentCol + 1); c++) {
                if (reachableNodes.has(`${row}-${c}`)) {
                    possibleCols.push(c);
                }
            }
            
            if (possibleCols.length > 0) {
                currentCol = possibleCols[randomInt(0, possibleCols.length - 1)];
                path.push({ row, col: currentCol });
            } else {
                break;
            }
        }
        
        if (path.length === rows && !paths.some(existingPath => 
            JSON.stringify(existingPath) === JSON.stringify(path)
        )) {
            paths.push(path);
        }
    }
    
    console.log('Generated dense reachable paths:', paths.length, 'paths');
    console.log('Reachable nodes:', reachableNodes.size);
    
    // 调试：检查 Boss 行节点是否在路径中
    const bossNodesInPaths = paths.filter(path => path.some(p => p.row === rows - 1));
    console.log('Paths reaching Boss row:', bossNodesInPaths.length);
    if (bossNodesInPaths.length > 0) {
        console.log('Boss nodes in paths:', bossNodesInPaths.map(p => p.find(node => node.row === rows - 1)));
    }
    
    return paths;
}

function generatePathLines(nodesContainer, paths) {
    // 清除旧连线
    const oldLines = nodesContainer.querySelectorAll('.map-line');
    oldLines.forEach(line => line.remove());
    
    const rows = nodesContainer.querySelectorAll('.map-row');
    
    // 统一使用灰色，不区分路径颜色
    const strokeColor = '#888';
    
    // 遍历所有路径，为每条路径画线
    paths.forEach((path) => {
        // 遍历路径，为每两个相邻节点画线
        for (let i = 0; i < path.length - 1; i++) {
            const current = path[i];
            const next = path[i + 1];
            
            const currentRowNodes = rows[current.row].querySelectorAll('.map-node');
            const nextRowNodes = rows[next.row].querySelectorAll('.map-node');
            
            const currentNodeEl = currentRowNodes[current.col];
            const nextNodeEl = nextRowNodes[next.col];
            
            if (!currentNodeEl || !nextNodeEl) continue;
            
            // 创建连线 SVG
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('class', 'map-line');
            svg.style.position = 'absolute';
            svg.style.top = '0';
            svg.style.left = '0';
            svg.style.width = '100%';
            svg.style.height = '100%';
            svg.style.pointerEvents = 'none';
            svg.style.zIndex = '1';
            
            // 计算起点和终点
            const currentRect = currentNodeEl.getBoundingClientRect();
            const nextRect = nextNodeEl.getBoundingClientRect();
            const containerRect = nodesContainer.getBoundingClientRect();
            
            const startX = currentRect.left + currentRect.width / 2 - containerRect.left;
            const startY = currentRect.bottom - containerRect.top;
            const endX = nextRect.left + nextRect.width / 2 - containerRect.left;
            const endY = nextRect.top - containerRect.top;
            
            // 创建线条
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', startX);
            line.setAttribute('y1', startY);
            line.setAttribute('x2', endX);
            line.setAttribute('y2', endY);
            line.setAttribute('stroke', strokeColor);
            line.setAttribute('stroke-width', '2');
            line.setAttribute('stroke-dasharray', '5,5');
            line.setAttribute('opacity', '0.6');
            
            svg.appendChild(line);
            nodesContainer.appendChild(svg);
        }
    });
}



function enterNode(node) {
    console.log(`[enterNode] Clicked node: ${node.id}, type: ${node.type}`);
    const nodeEl = document.querySelector(`[data-node-id="${node.id}"]`);
    
    if (!nodeEl) {
        console.error('[enterNode] Node element not found!');
        return;
    }
    
    console.log('[enterNode] Node classes:', nodeEl.classList.toString());
    console.log('[enterNode] Has "available" class:', nodeEl.classList.contains('available'));
    console.log('[enterNode] Has "completed" class:', nodeEl.classList.contains('completed'));
    
    if (!nodeEl.classList.contains('available') || nodeEl.classList.contains('completed')) {
        console.log('[enterNode] Node not available or already completed, returning');
        // 如果节点不可用，显示提示
        if (!nodeEl.classList.contains('available')) {
            console.log('[enterNode] Showing floating text: "请先完成上面的关卡!"');
            showFloatingText('请先完成上面的关卡!', document.querySelector('.map-nodes'), '#e74c3c');
        }
        return;
    }
    
    console.log('[enterNode] Proceeding with node entry...');
    
    gameState.map.currentNode = node;
    gameState.map.completedNodes.add(node.id);
    nodeEl.classList.add('completed');
    nodeEl.classList.remove('available');
    
    // 解锁下一行节点
    const [row, col] = node.id.split('-').map(Number);
    const nextRow = row + 1;
    // 地图有 4 行（0-3），第 3 行是 Boss，4 列（0-3）
    console.log(`[Unlock] Completed node: ${row}-${col}, trying to unlock row ${nextRow}`);
    console.log(`[Unlock] Completed nodes:`, Array.from(gameState.map.completedNodes));
    console.log(`[Unlock] nextRow < 4: ${nextRow < 4}`);
    
    if (nextRow < 4) {
        console.log(`[Unlock] Entering unlock block for row ${nextRow}`);
        // 第 0 行不需要检查，因为它是起始行，节点本来就是可用的
        // 从第 1 行开始，需要检查上一行是否有节点完成
        if (row > 0) {
            const prevRowHasCompleted = Array.from(gameState.map.completedNodes).some(id => {
                const [r, _] = id.split('-').map(Number);
                return r === row;
            });
            
            console.log(`[Unlock] Row ${row} has completed nodes: ${prevRowHasCompleted}`);
            
            if (!prevRowHasCompleted) {
                console.log(`[Unlock] Row ${row} has no completed nodes, skipping unlock`);
                return;
            }
        }
        
        console.log(`[Unlock] Attempting to unlock nodes for row ${nextRow} from node ${row}-${col}`);
        console.log(`[Unlock] gameState.map.paths:`, gameState.map.paths);
        
        if (!gameState.map.paths || gameState.map.paths.length === 0) {
            console.error('ERROR: No paths found in gameState.map.paths!');
            return;
        }
        
        // 解锁下一行中所有在路径上的节点
        for (let c = 0; c < 4; c++) {
            const nextNodeEl = document.querySelector(`[data-node-id="${nextRow}-${c}"]`);
            if (!nextNodeEl) {
                console.log(`❌ Node element ${nextRow}-${c} not found`);
                continue;
            }
            
            console.log(`Checking node ${nextRow}-${c}: classes=${nextNodeEl.classList.toString()}`);
            
            if (nextNodeEl.classList.contains('locked') && !nextNodeEl.classList.contains('completed')) {
                // 检查该节点是否在任意一条路径上
                const paths = gameState.map.paths;
                let isOnAnyPath = false;
                for (let path of paths) {
                    if (path.some(p => p.row === nextRow && p.col === c)) {
                        isOnAnyPath = true;
                        break;
                    }
                }
                
                console.log(`  Node ${nextRow}-${c} isOnAnyPath: ${isOnAnyPath}`);
                
                if (isOnAnyPath) {
                    nextNodeEl.classList.remove('locked');
                    nextNodeEl.classList.add('available');
                    console.log(`✅ Unlocked node ${nextRow}-${c} (in path, prev row completed)`);
                } else {
                    console.log(`❌ Node ${nextRow}-${c} NOT unlocked (not in any path)`);
                }
            } else {
                console.log(`  Node ${nextRow}-${c} skipped (not locked or already completed)`);
            }
        }
    }
    
    // 进入对应场景
    switch (node.type) {
        case 'battle':
            startBattle(false);
            break;
        case 'elite':
            startEliteBattle();
            break;
        case 'boss':
            startBattle(true);
            break;
        case 'shop':
            openShop();
            break;
        case 'rest':
            openRest();
            break;
        case 'event':
            openEvent();
            break;
    }
}

// ==================== 战斗系统 ====================

function startBattle(isBoss) {
    const floor = gameState.map.floor;
    let enemyType;
    
    // 计算难度系数（每层增加 20% 难度）
    const difficultyMultiplier = 1 + (floor - 1) * 0.2;
    
    if (isBoss) {
        // Boss 额外增加 30% 难度
        const bossMultiplier = difficultyMultiplier * 1.3;
        
        if (floor === 1) enemyType = 'boss_goblin_king';
        else if (floor === 2) enemyType = 'boss_lich';
        else enemyType = 'boss_dragon';
        
        // 创建带难度调整的敌人
        const baseEnemy = ENEMY_DB[enemyType];
        gameState.enemy = {
            type: enemyType,
            name: baseEnemy.name,
            hp: Math.floor(baseEnemy.hp * bossMultiplier),
            maxHp: Math.floor(baseEnemy.hp * bossMultiplier),
            icon: baseEnemy.icon,
            pattern: baseEnemy.pattern,
            damage: Math.floor(baseEnemy.damage * bossMultiplier),
            action: null,
            difficulty: floor
        };
    } else {
        // 根据层数选择敌人
        const enemyPool = floor === 1 ? ['goblin', 'slime', 'skeleton'] :
                         floor === 2 ? ['orc', 'dark_mage', 'werewolf'] :
                         ['demon', 'dragon'];
        enemyType = enemyPool[randomInt(0, enemyPool.length - 1)];
        
        // 创建带难度调整的敌人
        const baseEnemy = ENEMY_DB[enemyType];
        gameState.enemy = {
            type: enemyType,
            name: baseEnemy.name,
            hp: Math.floor(baseEnemy.hp * difficultyMultiplier),
            maxHp: Math.floor(baseEnemy.hp * difficultyMultiplier),
            icon: baseEnemy.icon,
            pattern: baseEnemy.pattern,
            damage: Math.floor(baseEnemy.damage * difficultyMultiplier),
            action: null,
            difficulty: floor
        };
    }
    
    // 如果上面已经设置了 gameState.enemy，就直接使用；否则继续旧逻辑
    if (!gameState.enemy) {
    }
    
    const enemyData = ENEMY_DB[enemyType];
    gameState.battle.enemy = {
        type: enemyType,
        ...enemyData,
        currentHp: enemyData.hp,
        block: 0,
        nextAction: null,
        weak: 0,
        vulnerable: 0
    };
    
    // 初始化战斗状态
    gameState.battle.hand = [];
    gameState.battle.drawPile = shuffle([...gameState.player.deck]);
    gameState.battle.discardPile = [];
    gameState.battle.exhaustPile = [];
    gameState.battle.turn = 1;
    gameState.battle.firstAttack = true;
    gameState.battle.noDraw = false;
    gameState.battle.ornamentalFanCount = 0;
    gameState.player.block = 0;
    
    // 重置临时属性
    gameState.player.stats.strength = 0;
    gameState.player.stats.dexterity = 0;
    gameState.player.stats.weak = 0;
    gameState.player.stats.vulnerable = 0;
    
    // 船锚效果 - 战斗开始获得格挡
    if (gameState.player.relics.includes('anchor')) {
        gameState.player.block += 10;
    }
    
    showScreen('battle-screen');
    updateBattleUI();
    updatePotionBar();
    startTurn();
}

// 新增：精英战斗
function startEliteBattle() {
    const floor = gameState.map.floor;
    let enemyType;
    
    // 精英敌人难度系数（比普通敌人高 40%）
    const eliteMultiplier = 1.4 + (floor - 1) * 0.2;
    
    // 根据层数选择精英敌人
    if (floor === 1) {
        // 第一层没有精英（配置为 0）
        startBattle(false);
        return;
    } else if (floor === 2) {
        enemyType = 'elite_orc';
    } else {
        // 第三层随机选择精英
        enemyType = randomInt(0, 1) === 0 ? 'elite_demon' : 'elite_dragon';
    }
    
    const baseEnemy = ENEMY_DB[enemyType];
    
    // 创建带难度调整的精英敌人
    gameState.enemy = {
        type: enemyType,
        name: baseEnemy.name,
        hp: Math.floor(baseEnemy.hp * eliteMultiplier),
        maxHp: Math.floor(baseEnemy.hp * eliteMultiplier),
        icon: baseEnemy.icon,
        pattern: baseEnemy.pattern,
        damage: Math.floor(baseEnemy.damage * eliteMultiplier),
        action: null,
        difficulty: floor,
        isElite: true
    };
    
    gameState.battle.enemy = {
        type: enemyType,
        ...baseEnemy,
        currentHp: gameState.enemy.hp,
        maxHp: gameState.enemy.hp,
        block: 0,
        nextAction: null,
        weak: 0,
        vulnerable: 0,
        isElite: true
    };
    
    // 初始化战斗状态
    gameState.battle.hand = [];
    gameState.battle.drawPile = shuffle([...gameState.player.deck]);
    gameState.battle.discardPile = [];
    gameState.battle.exhaustPile = [];
    gameState.battle.turn = 1;
    gameState.battle.firstAttack = true;
    gameState.battle.noDraw = false;
    gameState.battle.ornamentalFanCount = 0;
    gameState.player.block = 0;
    
    // 重置临时属性
    gameState.player.stats.strength = 0;
    gameState.player.stats.dexterity = 0;
    gameState.player.stats.weak = 0;
    gameState.player.stats.vulnerable = 0;
    
    // 船锚效果 - 战斗开始获得格挡
    if (gameState.player.relics.includes('anchor')) {
        gameState.player.block += 10;
    }
    
    showScreen('battle-screen');
    updateBattleUI();
    updatePotionBar();
    startTurn();
}

function updateBattleUI() {
    const enemy = gameState.battle.enemy;
    const player = gameState.player;
    
    // 更新敌人显示
    document.querySelector('.enemy-sprite').textContent = enemy.icon;
    document.querySelector('.enemy-name').textContent = enemy.name;
    document.getElementById('enemy-hp').textContent = `${enemy.currentHp}/${enemy.hp}`;
    document.getElementById('enemy-hp-fill').style.width = `${(enemy.currentHp / enemy.hp) * 100}%`;
    
    // 敌人意图
    let intentText = '❓ 未知';
    if (enemy.nextAction) {
        if (enemy.nextAction.type === 'attack') {
            let damage = enemy.nextAction.value;
            if (enemy.weak > 0) damage = Math.floor(damage * 0.75);
            intentText = `⚔️ 攻击 ${damage}`;
        } else if (enemy.nextAction.type === 'defend') {
            intentText = `🛡️ 防御 ${enemy.nextAction.value}`;
        } else if (enemy.nextAction.type === 'buff') {
            intentText = '💪 蓄力';
        }
    }
    document.getElementById('enemy-intent').textContent = intentText;
    
    // 更新玩家显示
    document.getElementById('player-hp').textContent = `${player.hp}/${player.maxHp}`;
    document.getElementById('player-block').textContent = player.block;
    document.getElementById('player-energy').textContent = `${player.energy}/${player.maxEnergy}`;
    document.getElementById('battle-floor').textContent = `第 ${gameState.map.floor} 层`;
    
    // 更新职业图标
    const classIcons = { warrior: '⚔️', mage: '🔮', rogue: '🗡️' };
    document.getElementById('player-avatar').textContent = classIcons[player.class];
    
    // 更新牌堆信息
    document.getElementById('deck-count').textContent = `牌库: ${gameState.battle.drawPile.length}`;
    document.getElementById('discard-count').textContent = `弃牌: ${gameState.battle.discardPile.length}`;
}

function updatePotionBar() {
    const potionBar = document.getElementById('potion-bar');
    potionBar.innerHTML = '';
    
    // 显示药水槽
    for (let i = 0; i < 3; i++) {
        const slot = document.createElement('div');
        slot.className = 'potion-slot';
        
        if (i < gameState.player.potions.length) {
            const potionId = gameState.player.potions[i];
            const potionData = POTION_DB[potionId];
            slot.classList.add('filled');
            slot.textContent = potionData.icon;
            slot.title = `${potionData.name}: ${potionData.desc}`;
            slot.addEventListener('click', () => usePotion(i));
        }
        
        potionBar.appendChild(slot);
    }
}

function usePotion(index) {
    if (index >= gameState.player.potions.length) return;
    
    const potionId = gameState.player.potions[index];
    const potionData = POTION_DB[potionId];
    const effect = potionData.effect;
    
    // 应用效果
    if (effect.heal) {
        healPlayer(effect.heal);
        showFloatingText(`+${effect.heal}`, document.querySelector('.player-area'), '#27ae60');
    }
    if (effect.energy) {
        gameState.player.energy += effect.energy;
        showFloatingText(`+${effect.energy}⚡`, document.querySelector('.player-area'), '#f39c12');
    }
    if (effect.strength) {
        gameState.player.stats.strength += effect.strength;
        showFloatingText(`+${effect.strength}💪`, document.querySelector('.player-area'), '#e74c3c');
    }
    if (effect.block) {
        gameState.player.block += effect.block;
        showFloatingText(`+${effect.block}🛡️`, document.querySelector('.player-area'), '#3498db');
    }
    if (effect.damage) {
        damageEnemy(effect.damage);
        showFloatingText(`${effect.damage}💥`, document.querySelector('.enemy'), '#e74c3c');
    }
    
    // 移除药水
    gameState.player.potions.splice(index, 1);
    
    updateBattleUI();
    updatePotionBar();
    renderHand();
    
    // 检查战斗结束
    if (gameState.battle.enemy.currentHp <= 0) {
        setTimeout(winBattle, 500);
    }
}

function startTurn() {
    const player = gameState.player;
    
    // 重置能量
    player.energy = player.maxEnergy;
    
    // 清除格挡
    player.block = 0;
    
    // 减少状态回合数
    if (player.stats.weak > 0) player.stats.weak--;
    if (player.stats.vulnerable > 0) player.stats.vulnerable--;
    if (gameState.battle.enemy.weak > 0) gameState.battle.enemy.weak--;
    if (gameState.battle.enemy.vulnerable > 0) gameState.battle.enemy.vulnerable--;
    
    // 重置抽牌限制
    gameState.battle.noDraw = false;
    
    // 处理回合开始效果
    processStartOfTurnEffects();
    
    // 抽牌（默认5张）
    let drawCount = 5;
    if (player.relics.includes('ring_of_the_snake') && gameState.battle.turn === 1) {
        drawCount += 2;
    }
    drawCards(drawCount);
    
    // 敌人决定行动
    decideEnemyAction();
    
    updateBattleUI();
    renderHand();
}

function processStartOfTurnEffects() {
    // 水银沙漏效果
    if (gameState.player.relics.includes('mercury_hourglass')) {
        damageEnemy(3);
        showFloatingText('3', document.querySelector('.enemy'), '#e74c3c');
    }
}

function decideEnemyAction() {
    const enemy = gameState.battle.enemy;
    const pattern = enemy.pattern;
    
    if (pattern === 'simple') {
        enemy.nextAction = { type: 'attack', value: enemy.damage };
    } else if (pattern === 'defensive') {
        enemy.nextAction = gameState.battle.turn % 2 === 1 ? 
            { type: 'attack', value: enemy.damage } : 
            { type: 'defend', value: Math.floor(enemy.damage * 0.8) };
    } else if (pattern === 'aggressive') {
        enemy.nextAction = Math.random() < 0.7 ? 
            { type: 'attack', value: enemy.damage } : 
            { type: 'buff', value: 2 };
    } else if (pattern === 'caster') {
        enemy.nextAction = Math.random() < 0.6 ? 
            { type: 'attack', value: enemy.damage } : 
            { type: 'attack', value: Math.floor(enemy.damage * 1.5) };
    } else if (pattern === 'boss') {
        const turn = gameState.battle.turn;
        if (turn % 3 === 0) {
            enemy.nextAction = { type: 'buff', value: 3 };
        } else {
            enemy.nextAction = { type: 'attack', value: enemy.damage + Math.floor(turn / 2) };
        }
    }
}

function drawCards(count) {
    if (gameState.battle.noDraw) return;
    
    for (let i = 0; i < count; i++) {
        if (gameState.battle.drawPile.length === 0) {
            // 洗牌
            if (gameState.battle.discardPile.length === 0) break;
            gameState.battle.drawPile = shuffle([...gameState.battle.discardPile]);
            gameState.battle.discardPile = [];
        }
        
        const card = gameState.battle.drawPile.pop();
        gameState.battle.hand.push(card);
    }
}

function renderHand() {
    const handContainer = document.getElementById('hand-cards');
    handContainer.innerHTML = '';
    
    gameState.battle.hand.forEach((cardId, index) => {
        const cardData = CARD_DB[cardId];
        const cardEl = document.createElement('div');
        cardEl.className = `card ${cardData.type}`;
        
        // 检查能量是否足够
        if (cardData.cost > gameState.player.energy) {
            cardEl.classList.add('unplayable');
        } else {
            cardEl.classList.add('energy-sufficient');
        }
        
        // 添加 data-desc 属性用于悬停提示
        cardEl.setAttribute('data-desc', cardData.desc);
        
        cardEl.innerHTML = `
            <div class="card-cost">${cardData.cost}</div>
            <div class="card-icon">${cardData.icon}</div>
            <div class="card-name">${cardData.name}</div>
            <div class="card-desc">${cardData.desc}</div>
        `;
        
        cardEl.addEventListener('click', () => playCard(index));
        handContainer.appendChild(cardEl);
    });
}

function playCard(handIndex) {
    const cardId = gameState.battle.hand[handIndex];
    const cardData = CARD_DB[cardId];
    
    // 检查能量
    if (cardData.cost > gameState.player.energy) {
        return;
    }
    
    // 消耗能量
    gameState.player.energy -= cardData.cost;
    
    // 从手牌移除
    gameState.battle.hand.splice(handIndex, 1);
    gameState.battle.discardPile.push(cardId);
    
    // 卡牌出牌动画效果
    const handCards = document.querySelectorAll('#hand-cards .card');
    if (handCards[handIndex]) {
        handCards[handIndex].classList.add('playing');
        setTimeout(() => {
            if (handCards[handIndex]) {
                handCards[handIndex].remove();
            }
        }, 400);
    }
    
    // 执行效果
    executeCardEffect(cardData);
    
    // 装饰扇效果
    if (cardData.type === 'attack') {
        gameState.battle.ornamentalFanCount++;
        if (gameState.battle.ornamentalFanCount >= 3) {
            gameState.player.block += 4;
            gameState.battle.ornamentalFanCount = 0;
            showFloatingText('+4🛡️', document.querySelector('.player-area'), '#3498db');
        }
    }
    
    updateBattleUI();
    renderHand();
    
    // 检查战斗结束
    if (gameState.battle.enemy.currentHp <= 0) {
        setTimeout(winBattle, 500);
    }
}

function executeCardEffect(cardData) {
    const effect = cardData.effect;
    const player = gameState.player;
    
    // 伤害计算
    if (effect.damage) {
        let damage = effect.damage;
        
        // 力量加成
        damage += player.stats.strength;
        
        // 赤猫效果（第一次攻击）
        if (gameState.battle.firstAttack && player.relics.includes('akabeko')) {
            damage += 8;
        }
        
        // 虚弱效果
        if (player.stats.weak > 0) {
            damage = Math.floor(damage * 0.75);
        }
        
        // 多次攻击
        const times = effect.times || 1;
        for (let i = 0; i < times; i++) {
            damageEnemy(damage);
        }
        
        gameState.battle.firstAttack = false;
    }
    
    // 格挡
    if (effect.block) {
        let block = effect.block;
        // 敏捷加成
        block += player.stats.dexterity;
        player.block += block;
        showDamage(document.querySelector('.player-area'), block, 'block');
    }
    
    // 抽牌
    if (effect.draw) {
        drawCards(effect.draw);
    }
    
    // 获得能量
    if (effect.energy) {
        player.energy += effect.energy;
    }
    
    // 获得力量
    if (effect.strength) {
        player.stats.strength += effect.strength;
        showFloatingText(`+${effect.strength}💪`, document.querySelector('.player-area'), '#e74c3c');
    }
    
    // 获得敏捷
    if (effect.dexterity) {
        player.stats.dexterity += effect.dexterity;
        showFloatingText(`+${effect.dexterity}👟`, document.querySelector('.player-area'), '#3498db');
    }
    
    // 施加虚弱
    if (effect.weak) {
        gameState.battle.enemy.weak = 2;
        showFloatingText('虚弱!', document.querySelector('.enemy'), '#9b59b6');
    }
    
    // 生命代价
    if (effect.hpCost) {
        player.hp -= effect.hpCost;
        showFloatingText(`-${effect.hpCost}`, document.querySelector('.player-area'), '#e74c3c');
    }
    
    // 添加卡牌到弃牌堆
    if (effect.addCard) {
        gameState.battle.discardPile.push(effect.addCard);
    }
    
    // 禁止抽牌
    if (effect.noDraw) {
        gameState.battle.noDraw = true;
    }
}

function damageEnemy(amount) {
    const enemy = gameState.battle.enemy;
    const oldHp = enemy.currentHp;
    
    // 先扣除格挡
    if (enemy.block > 0) {
        const blockDamage = Math.min(enemy.block, amount);
        enemy.block -= blockDamage;
        amount -= blockDamage;
    }
    
    // 扣除生命
    if (amount > 0) {
        enemy.currentHp -= amount;
        
        // 根据伤害大小决定震动强度和视觉效果
        const damagePercent = amount / enemy.maxHp;
        const enemyEl = document.querySelector('.enemy');
        
        if (damagePercent > 0.3) {
            showDamageWithFeedback(document.querySelector('.enemy'), amount, 'damage', true);
            enemyEl.classList.add('hit-large');
        } else if (damagePercent > 0.15) {
            showDamageWithFeedback(document.querySelector('.enemy'), amount, 'damage', false);
            enemyEl.classList.add('hit-medium');
        } else {
            showDamage(document.querySelector('.enemy'), amount, 'damage');
            enemyEl.classList.add('hit-small');
        }
        
        // 添加闪光效果
        enemyEl.classList.add('hit');
        
        // 添加 HP 下降脉冲
        enemyEl.classList.add('hp-decrease');
        
        // 添加火花效果 (大伤害)
        if (amount > 10) {
            createSparks(enemyEl, 15);
        }
        
        // 清理类名
        setTimeout(() => {
            enemyEl.classList.remove('hit-large', 'hit-medium', 'hit-small', 'hit', 'hp-decrease');
        }, 600);
    }
    
    updateBattleUI();
}

// 火花粒子效果
function createSparks(target, count = 10) {
    const targetRect = target.getBoundingClientRect();
    const container = document.querySelector('#game-container');
    
    for (let i = 0; i < count; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        
        const randomX = Math.random() * targetRect.width;
        const randomY = Math.random() * targetRect.height;
        
        spark.style.left = `${targetRect.left + randomX - container.getBoundingClientRect().left}px`;
        spark.style.top = `${targetRect.top + randomY - container.getBoundingClientRect().top}px`;
        
        container.appendChild(spark);
        setTimeout(() => spark.remove(), 1000);
    }
}

function endTurn() {
    // 敌人回合
    const enemy = gameState.battle.enemy;
    const action = enemy.nextAction;
    
    if (action.type === 'attack') {
        let damage = action.value;
        
        // 敌人虚弱效果
        if (enemy.weak > 0) {
            damage = Math.floor(damage * 0.75);
        }
        
        // 玩家易伤效果
        if (gameState.player.stats.vulnerable > 0) {
            damage = Math.floor(damage * 1.5);
        }
        
        // 格挡减伤
        if (gameState.player.block > 0) {
            const blockAbsorb = Math.min(gameState.player.block, damage);
            gameState.player.block -= blockAbsorb;
            damage -= blockAbsorb;
        }
        
        // 受到伤害
        if (damage > 0) {
            gameState.player.hp -= damage;
            showDamage(document.querySelector('.player-area'), damage, 'damage');
            shakeElement(document.querySelector('.player-area'));
            
            // 青铜鳞效果
            if (gameState.player.relics.includes('bronze_scales')) {
                damageEnemy(3);
                showFloatingText('3', document.querySelector('.enemy'), '#e74c3c');
            }
        }
    } else if (action.type === 'defend') {
        enemy.block += action.value;
        showFloatingText(`+${action.value}🛡️`, document.querySelector('.enemy'), '#3498db');
    } else if (action.type === 'buff') {
        enemy.damage += action.value;
        showFloatingText('💪', document.querySelector('.enemy'), '#f39c12');
    }
    
    // 检查玩家死亡
    if (gameState.player.hp <= 0) {
        gameOver(false);
        return;
    }
    
    // 弃掉所有手牌
    gameState.battle.discardPile.push(...gameState.battle.hand);
    gameState.battle.hand = [];
    
    // 下一回合
    gameState.battle.turn++;
    startTurn();
}

function winBattle() {
    gameState.stats.enemiesKilled++;
    
    // 重置 Boss 战卡牌选择标志
    window.bossCardSelected = false;
    
    // 燃烧之血效果
    if (gameState.player.relics.includes('burning_blood')) {
        healPlayer(6);
    }
    
    // 计算奖励（精英战奖励翻倍）
    const isBoss = gameState.battle.enemy.pattern === 'boss';
    const isElite = gameState.battle.enemy.isElite || false;
    
    let goldReward;
    if (isBoss) {
        goldReward = randomInt(80, 120);
    } else if (isElite) {
        goldReward = randomInt(25, 40); // 精英奖励比普通战斗高
    } else {
        goldReward = randomInt(10, 20);
    }
    gameState.player.gold += goldReward;
    
    document.getElementById('reward-gold').textContent = goldReward;
    
    // 生成卡牌奖励
    const rewardCardsContainer = document.getElementById('reward-cards');
    rewardCardsContainer.innerHTML = '';
    
    // 根据职业生成可选卡牌
    const availableCards = Object.keys(CARD_DB).filter(id => {
        // 排除基础牌
        if (id === 'strike' || id === 'defend') return false;
        return true;
    });
    
    // 随机选择3张
    const rewardCardIds = [];
    for (let i = 0; i < 3; i++) {
        const randomCard = availableCards[randomInt(0, availableCards.length - 1)];
        rewardCardIds.push(randomCard);
    }
    
    rewardCardIds.forEach(cardId => {
        const cardData = CARD_DB[cardId];
        const cardEl = document.createElement('div');
        cardEl.className = `card ${cardData.type}`;
        cardEl.setAttribute('data-desc', cardData.desc);
        cardEl.innerHTML = `
            <div class="card-cost">${cardData.cost}</div>
            <div class="card-icon">${cardData.icon}</div>
            <div class="card-name">${cardData.name}</div>
            <div class="card-desc">${cardData.desc}</div>
        `;
        cardEl.addEventListener('click', function() {
            // 如果已经选择过卡牌，显示提示并返回
            if (window.bossCardSelected) {
                showFloatingText('你已经选择过一张卡牌了!', document.querySelector('.reward-screen'), '#e74c3c');
                return;
            }
            
            // 标记为已选择
            window.bossCardSelected = true;
            
            // 禁用所有卡牌
            document.querySelectorAll('.reward-cards .card').forEach(card => {
                card.classList.add('unplayable');
                card.style.cursor = 'not-allowed';
            });
            
            // 高亮已选择的卡牌
            this.classList.add('selected');
            this.style.borderColor = '#27ae60';
            this.style.boxShadow = '0 0 20px rgba(39, 174, 96, 0.6)';
            
            addCardToDeck(cardId);
            
            if (isBoss) {
                // Boss 战需要选择遗物后才继续
                return;
            }
            // 非 Boss 战胜利，返回地图，但不清空路径和节点类型（同一层内保持不变）
            setTimeout(() => {
                showScreen('map-screen');
                generateMap();
            }, 1500);
        });
        rewardCardsContainer.appendChild(cardEl);
    });
    
    // Boss战额外奖励遗物
    const relicRewardSection = document.getElementById('relic-reward');
    if (isBoss) {
        relicRewardSection.style.display = 'block';
        const relicContainer = document.getElementById('reward-relic');
        relicContainer.innerHTML = '';
        
        const randomRelic = Object.keys(RELIC_DB)[randomInt(0, Object.keys(RELIC_DB).length - 1)];
        const relicData = RELIC_DB[randomRelic];
        
        const relicEl = document.createElement('div');
        relicEl.className = 'relic-item';
        relicEl.innerHTML = `
            <div>${relicData.icon}</div>
            <div style="font-size: 0.4em; margin-top: 5px;">${relicData.name}</div>
            <div style="font-size: 0.3em; margin-top: 5px; color: #ffd700; text-align: center;">${relicData.desc}</div>
        `;
        relicEl.title = relicData.desc;
        relicEl.addEventListener('click', () => {
            addRelic(randomRelic);
            alert('获得遗物：' + relicData.name + '!\n\n' + relicData.desc);
            
            // 进入下一层
            gameState.map.floor++;
            
            // 恢复血量（满血）
            gameState.player.hp = gameState.player.maxHp;
            document.getElementById('player-hp').textContent = `${gameState.player.hp}/${gameState.player.maxHp}`;
            
            // 清空路径、节点类型和已完成节点数据，让下一层生成新数据
            gameState.map.paths = [];
            gameState.map.nodeTypes = null;
            gameState.map.completedNodes.clear();  // 清空已完成节点，否则新层的第一行会被锁定
            gameState.map.currentNode = null;
            
            if (gameState.map.floor > 3) {
                gameOver(true);
            } else {
                showScreen('map-screen');
                generateMap();
            }
        });
        relicContainer.appendChild(relicEl);
    } else if (isElite) {
        // 精英战额外奖励：50% 概率获得药水
        relicRewardSection.style.display = 'block';
        const relicContainer = document.getElementById('reward-relic');
        relicContainer.innerHTML = '<p style="color: #888;">精英挑战成功！</p>';
        
        if (Math.random() < 0.5 && gameState.player.potions.length < 3) {
            const potionId = 'health_potion';
            const potionData = POTION_DB[potionId];
            gameState.player.potions.push(potionId);
            
            const potionEl = document.createElement('div');
            potionEl.className = 'potion-item';
            potionEl.innerHTML = `<div style="font-size: 2em;">${potionData.icon}</div><div style="font-size: 0.5em;">${potionData.name}</div>`;
            potionEl.title = potionData.desc;
            relicContainer.appendChild(potionEl);
            
            setTimeout(() => {
                showScreen('map-screen');
                generateMap();
            }, 1500);
        } else {
            setTimeout(() => {
                showScreen('map-screen');
                generateMap();
            }, 1500);
        }
    } else {
        relicRewardSection.style.display = 'none';
    }
    
    showScreen('reward-screen');
}

function healPlayer(amount) {
    const oldHp = gameState.player.hp;
    gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + amount);
    const actualHeal = gameState.player.hp - oldHp;
    if (actualHeal > 0) {
        showDamage(document.querySelector('.player-area'), actualHeal, 'heal');
    }
}

function addCardToDeck(cardId) {
    gameState.player.deck.push(cardId);
    gameState.stats.cardsAdded++;
    
    // 获取卡牌信息
    const card = CARD_DB[cardId];
    
    // 使用 alert 提示
    alert('卡牌 ' + card.name + ' 已加入牌组!');
    
    // 永恒羽毛效果
    if (gameState.player.relics.includes('eternal_feather')) {
        healPlayer(3);
    }
}

// 添加浮动文字提示
function showFloatingTextWithDelay(text, target, color, delay) {
    setTimeout(() => {
        showFloatingText(text, target, color);
    }, delay);
}

function addRelic(relicId) {
    if (gameState.player.relics.includes(relicId)) return;
    gameState.player.relics.push(relicId);
    gameState.stats.relicsFound++;
}

// ==================== 商店系统 ====================

function openShop() {
    const floor = gameState.map.floor;
    // 商店价格随楼层递增（每层增加 20%）
    const priceMultiplier = 1 + (floor - 1) * 0.2;
    
    document.getElementById('shop-gold').textContent = gameState.player.gold;
    
    // 生成商品
    const shopCards = document.getElementById('shop-cards');
    shopCards.innerHTML = '';
    
    const cardIds = Object.keys(CARD_DB).filter(id => id !== 'strike' && id !== 'defend');
    for (let i = 0; i < 4; i++) {
        const cardId = cardIds[randomInt(0, cardIds.length - 1)];
        const cardData = CARD_DB[cardId];
        const basePrice = randomInt(50, 80);
        const price = Math.floor(basePrice * priceMultiplier);
        
        const itemEl = document.createElement('div');
        itemEl.className = 'shop-item';
        const cardDiv = document.createElement('div');
        cardDiv.className = `card ${cardData.type}`;
        cardDiv.setAttribute('data-desc', cardData.desc);
        cardDiv.innerHTML = `
            <div class="card-cost">${cardData.cost}</div>
            <div class="card-icon">${cardData.icon}</div>
            <div class="card-name">${cardData.name}</div>
            <div class="card-desc">${cardData.desc}</div>
        `;
        itemEl.appendChild(cardDiv);
        itemEl.innerHTML += `<div class="price">💰 ${price}</div>`;
        itemEl.addEventListener('click', () => {
            if (gameState.player.gold >= price) {
                gameState.player.gold -= price;
                addCardToDeck(cardId);
                itemEl.style.opacity = '0.5';
                itemEl.style.pointerEvents = 'none';
                document.getElementById('shop-gold').textContent = gameState.player.gold;
            }
        });
        shopCards.appendChild(itemEl);
    }
    
    // 遗物
    const shopRelics = document.getElementById('shop-relics');
    shopRelics.innerHTML = '';
    
    const relicIds = Object.keys(RELIC_DB);
    for (let i = 0; i < 2; i++) {
        const relicId = relicIds[randomInt(0, relicIds.length - 1)];
        const relicData = RELIC_DB[relicId];
        const basePrice = randomInt(120, 180);
        const price = Math.floor(basePrice * priceMultiplier);
        
        const itemEl = document.createElement('div');
        itemEl.className = 'shop-item';
        itemEl.innerHTML = `
            <div class="relic-item" title="${relicData.desc}">
                <div>${relicData.icon}</div>
            </div>
            <div class="price">💰 ${price}</div>
        `;
        itemEl.addEventListener('click', () => {
            if (gameState.player.gold >= price && !gameState.player.relics.includes(relicId)) {
                gameState.player.gold -= price;
                addRelic(relicId);
                itemEl.style.opacity = '0.5';
                itemEl.style.pointerEvents = 'none';
                document.getElementById('shop-gold').textContent = gameState.player.gold;
            }
        });
        shopRelics.appendChild(itemEl);
    }
    
    // 药水
    const shopPotions = document.getElementById('shop-potions');
    shopPotions.innerHTML = '';
    
    const potionIds = Object.keys(POTION_DB);
    for (let i = 0; i < 3; i++) {
        const potionId = potionIds[randomInt(0, potionIds.length - 1)];
        const potionData = POTION_DB[potionId];
        const basePrice = randomInt(30, 50);
        const price = Math.floor(basePrice * priceMultiplier);
        
        const itemEl = document.createElement('div');
        itemEl.className = 'shop-item';
        itemEl.innerHTML = `
            <div class="potion-item" title="${potionData.desc}">${potionData.icon}</div>
            <div class="price">💰 ${price}</div>
        `;
        itemEl.addEventListener('click', () => {
            if (gameState.player.gold >= price && gameState.player.potions.length < 3) {
                gameState.player.gold -= price;
                gameState.player.potions.push(potionId);
                itemEl.style.opacity = '0.5';
                itemEl.style.pointerEvents = 'none';
                document.getElementById('shop-gold').textContent = gameState.player.gold;
            }
        });
        shopPotions.appendChild(itemEl);
    }
    
    showScreen('shop-screen');
}

// ==================== 休息处 ====================

function openRest() {
    showScreen('rest-screen');
}

function restHeal() {
    let healAmount = Math.floor(gameState.player.maxHp * 0.3);
    
    // 古茶具效果
    if (gameState.player.relics.includes('ancient_tea_set')) {
        healAmount += 10;
    }
    
    healPlayer(healAmount);
    showFloatingText(`+${healAmount}`, document.querySelector('#rest-screen'), '#27ae60');
    
    setTimeout(() => {
        showScreen('map-screen');
        generateMap();
    }, 1000);
}

function restUpgrade() {
    // 显示可选升级的卡牌
    const upgradeableCards = Object.keys(CARD_DB).filter(cardId => {
        // 排除基础牌和已经升级的牌
        if (cardId === 'strike' || cardId === 'defend' || cardId.includes('_upgraded')) return false;
        // 检查牌组中是否有这张牌
        return gameState.player.deck.includes(cardId);
    });
    
    if (upgradeableCards.length === 0) {
        alert('你还没有可以升级的卡牌！先获得一些新卡牌吧。');
        return;
    }
    
    // 显示卡牌列表供选择
    const deckList = document.getElementById('deck-list');
    deckList.innerHTML = '';
    
    upgradeableCards.forEach(cardId => {
        const cardData = CARD_DB[cardId];
        // 统计该卡牌在牌组中的数量
        const count = gameState.player.deck.filter(id => id === cardId || id === cardId + '_upgraded').length;
        
        const cardEl = document.createElement('div');
        cardEl.className = `card ${cardData.type}`;
        cardEl.setAttribute('data-desc', cardData.desc);
        cardEl.innerHTML = `
            <div class="card-cost">${cardData.cost}</div>
            <div class="card-icon">${cardData.icon}</div>
            <div class="card-name">${cardData.name}</div>
            <div class="card-desc">${cardData.desc}</div>
            <div style="position: absolute; top: 5px; right: 5px; background: #e94560; padding: 2px 6px; border-radius: 10px; font-size: 0.7em;">x${count}</div>
        `;
        cardEl.addEventListener('click', () => {
            // 升级这张卡牌
            upgradeCard(cardId);
        });
        deckList.appendChild(cardEl);
    });
    
    // 添加说明
    const info = document.createElement('p');
    info.style.cssText = 'text-align: center; margin-top: 20px; color: #888;';
    info.textContent = '点击要升级的卡牌';
    deckList.appendChild(info);
    
    document.getElementById('deck-modal').classList.add('active');
}

function upgradeCard(cardId) {
    const cardData = CARD_DB[cardId];
    
    // 从牌组中移除一张该卡牌
    const index = gameState.player.deck.indexOf(cardId);
    if (index > -1) {
        gameState.player.deck.splice(index, 1);
    }
    
    // 创建升级后的卡牌
    const upgradedCardId = cardId + '_upgraded';
    
    // 检查是否是 0 费卡牌
    const isZeroCost = cardData.cost === 0;
    
    let upgradedEffect = { ...cardData.effect };
    let upgradedDesc = cardData.desc;
    
    if (isZeroCost) {
        // 0 费卡牌升级：增强效果而不是降低费用
        if (upgradedEffect.damage) {
            // 有伤害效果的卡牌：增加 2-4 点伤害
            upgradedEffect.damage += 3;
            upgradedDesc = `${cardData.desc}（伤害 +3）`;
        } else if (upgradedEffect.draw) {
            // 有抽牌效果的卡牌：增加 1 张抽牌
            upgradedEffect.draw += 1;
            upgradedDesc = `${cardData.desc}（抽牌 +1）`;
        } else if (upgradedEffect.energy) {
            // 有能量效果的卡牌：增加 1 点能量
            upgradedEffect.energy += 1;
            upgradedDesc = `${cardData.desc}（能量 +1）`;
        } else if (upgradedEffect.hpCost && upgradedEffect.energy) {
            // 放血牌：减少生命代价或增加能量
            upgradedEffect.energy += 1;
            upgradedDesc = `${cardData.desc}（能量 +1）`;
        } else {
            // 其他情况：通用增强
            upgradedDesc = `${cardData.desc}（效果增强）`;
        }
    } else {
        // 非 0 费卡牌：降低费用
        upgradedEffect = { ...cardData.effect };
        upgradedDesc = `${cardData.desc}（费用 -1）`;
    }
    
    CARD_DB[upgradedCardId] = {
        name: cardData.name + '+',
        cost: isZeroCost ? 0 : Math.max(0, cardData.cost - 1),
        type: cardData.type,
        icon: cardData.icon,
        desc: upgradedDesc,
        effect: upgradedEffect
    };
    
    // 添加升级后的卡牌
    gameState.player.deck.push(upgradedCardId);
    gameState.stats.cardsAdded++;
    
    // 永恒羽毛效果
    if (gameState.player.relics.includes('eternal_feather')) {
        healPlayer(3);
    }
    
    hideDeckModal();
    
    // 使用 alert 提示锻造结果
    const costText = isZeroCost 
        ? `费用：${cardData.cost}（保持 0 费）`
        : `费用：${cardData.cost} -> ${CARD_DB[upgradedCardId].cost}`;
        
    alert('锻造成功！\n\n' + cardData.name + ' -> ' + CARD_DB[upgradedCardId].name + '\n' + costText + '\n' + CARD_DB[upgradedCardId].desc);
    
    setTimeout(() => {
        showScreen('map-screen');
        generateMap();
    }, 500);
}

// ==================== 事件系统 ====================

function openEvent() {
    const event = EVENT_DB[randomInt(0, EVENT_DB.length - 1)];
    
    document.getElementById('event-title').textContent = event.title;
    document.getElementById('event-sprite').textContent = event.sprite;
    document.getElementById('event-description').textContent = event.desc;
    
    const choicesContainer = document.getElementById('event-choices');
    choicesContainer.innerHTML = '';
    
    event.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.textContent = choice.text;
        btn.addEventListener('click', () => handleEventChoice(choice));
        choicesContainer.appendChild(btn);
    });
    
    showScreen('event-screen');
}

function handleEventChoice(choice) {
    switch (choice.action) {
        case 'chest_open':
            if (Math.random() < 0.7) {
                const relicId = Object.keys(RELIC_DB)[randomInt(0, Object.keys(RELIC_DB).length - 1)];
                const relicData = RELIC_DB[relicId];
                addRelic(relicId);
                alert('🎉 打开宝箱获得遗物：' + relicData.name + '!\n\n' + relicData.desc);
            } else {
                gameState.player.hp -= 10;
                alert('宝箱是陷阱！-10 生命');
            }
            break;
        case 'altar_sacrifice':
            // 献祭 10 点最大生命
            const oldMaxHp = gameState.player.maxHp;
            gameState.player.maxHp -= 10;
            
            // 如果当前血量超过新的最大血量，同步降低当前血量
            if (gameState.player.hp > gameState.player.maxHp) {
                gameState.player.hp = gameState.player.maxHp;
            }
            
            const relicId1 = Object.keys(RELIC_DB)[randomInt(0, Object.keys(RELIC_DB).length - 1)];
            const relicData1 = RELIC_DB[relicId1];
            addRelic(relicId1);
            
            alert(`🎉 献祭成功！\n\n最大生命：${oldMaxHp} → ${gameState.player.maxHp}\n\n获得遗物：${relicData1.name}!\n\n${relicData1.desc}`);
            break;
        case 'altar_pray':
            healPlayer(20);
            alert('祈祷成功！+20 生命');
            break;
        case 'merchant_buy':
            if (gameState.player.gold >= choice.gold) {
                gameState.player.gold -= choice.gold;
                const relicId2 = Object.keys(RELIC_DB)[randomInt(0, Object.keys(RELIC_DB).length - 1)];
                const relicData2 = RELIC_DB[relicId2];
                addRelic(relicId2);
                alert('🎉 购买成功！获得遗物：' + relicData2.name + '!\n\n' + relicData2.desc);
            } else {
                alert('金币不足!');
                return;
            }
            break;
        case 'merchant_steal':
            if (Math.random() < 0.5) {
                const relicId3 = Object.keys(RELIC_DB)[randomInt(0, Object.keys(RELIC_DB).length - 1)];
                const relicData3 = RELIC_DB[relicId3];
                addRelic(relicId3);
                alert('🎉 偷窃成功！获得遗物：' + relicData3.name + '!\n\n' + relicData3.desc);
            } else {
                gameState.player.hp -= 15;
                alert('偷窃失败！被发现了！-15 生命');
            }
            break;
        case 'fountain_drink':
            healPlayer(Math.floor(gameState.player.maxHp * 0.3));
            alert('泉水治愈了你！恢复了 ' + Math.floor(gameState.player.maxHp * 0.3) + ' 点生命');
            break;
        case 'fountain_fill':
            if (gameState.player.potions.length < 3) {
                gameState.player.potions.push('health_potion');
                alert('获得生命药水！');
            } else {
                alert('药水栏已满！');
                return;
            }
            break;
        case 'leave':
            break;
    }
    
    setTimeout(() => {
        showScreen('map-screen');
        generateMap();
    }, 500);  // 短暂延迟后返回地图
}

// ==================== 牌组查看 ====================

function showDeckModal() {
    const deckList = document.getElementById('deck-list');
    deckList.innerHTML = '';
    
    // 统计各卡牌数量
    const cardCounts = {};
    gameState.player.deck.forEach(cardId => {
        cardCounts[cardId] = (cardCounts[cardId] || 0) + 1;
    });
    
    Object.entries(cardCounts).forEach(([cardId, count]) => {
        const cardData = CARD_DB[cardId];
        const cardEl = document.createElement('div');
        cardEl.className = `card ${cardData.type}`;
        cardEl.setAttribute('data-desc', cardData.desc);
        cardEl.innerHTML = `
            <div class="card-cost">${cardData.cost}</div>
            <div class="card-icon">${cardData.icon}</div>
            <div class="card-name">${cardData.name}</div>
            <div class="card-desc">${cardData.desc}</div>
            ${count > 1 ? `<div style="position: absolute; top: 5px; right: 5px; background: #e94560; padding: 2px 6px; border-radius: 10px; font-size: 0.7em;">x${count}</div>` : ''}
        `;
        deckList.appendChild(cardEl);
    });
    
    // 显示遗物
    const relicsList = document.getElementById('relics-list');
    if (relicsList) {
        relicsList.innerHTML = '';
        gameState.player.relics.forEach(relicId => {
            const relicData = RELIC_DB[relicId];
            const relicEl = document.createElement('div');
            relicEl.className = 'relic-item-small';
            relicEl.innerHTML = `<div title="${relicData.name}: ${relicData.desc}">${relicData.icon}</div>`;
            relicsList.appendChild(relicEl);
        });
    }
    
    document.getElementById('deck-modal').classList.add('active');
}

function hideDeckModal() {
    document.getElementById('deck-modal').classList.remove('active');
}

// ==================== 统计界面 ====================

function showStatsModal() {
    const stats = {
        gamesPlayed: parseInt(localStorage.getItem('dungeonCardGamesPlayed') || '0'),
        gamesWon: parseInt(localStorage.getItem('dungeonCardGamesWon') || '0'),
        totalKills: parseInt(localStorage.getItem('dungeonCardTotalKills') || '0'),
        highScore: parseInt(localStorage.getItem('dungeonCardHighScore') || '0')
    };
    
    const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;
    
    alert(`📊 游戏统计

总游戏次数: ${stats.gamesPlayed}
胜利次数: ${stats.gamesWon}
胜率: ${winRate}%
总击杀数: ${stats.totalKills}
最高分: ${stats.highScore}`);
}

function updateGlobalStats(victory) {
    const gamesPlayed = parseInt(localStorage.getItem('dungeonCardGamesPlayed') || '0') + 1;
    localStorage.setItem('dungeonCardGamesPlayed', gamesPlayed);
    
    if (victory) {
        const gamesWon = parseInt(localStorage.getItem('dungeonCardGamesWon') || '0') + 1;
        localStorage.setItem('dungeonCardGamesWon', gamesWon);
    }
    
    const totalKills = parseInt(localStorage.getItem('dungeonCardTotalKills') || '0') + gameState.stats.enemiesKilled;
    localStorage.setItem('dungeonCardTotalKills', totalKills);
}

// ==================== 游戏结束 ====================

function gameOver(victory) {
    updateGlobalStats(victory);
    
    const title = document.getElementById('game-over-title');
    title.textContent = victory ? '🎉 胜利！' : '💀 游戏结束';
    title.className = victory ? 'victory' : 'defeat';
    
    document.getElementById('final-floor').textContent = gameState.map.floor;
    document.getElementById('final-kills').textContent = gameState.stats.enemiesKilled;
    document.getElementById('final-gold').textContent = gameState.player.gold;
    
    // 保存最高分
    const currentScore = gameState.map.floor * 100 + gameState.stats.enemiesKilled * 10 + gameState.player.gold;
    const savedScore = parseInt(localStorage.getItem('dungeonCardHighScore') || '0');
    if (currentScore > savedScore) {
        localStorage.setItem('dungeonCardHighScore', currentScore);
    }
    
    showScreen('game-over');
}

// ==================== 遗物列表 ====================

function showRelicsList() {
    const relicsList = document.getElementById('relics-list');
    
    relicsList.innerHTML = '';
    
    if (gameState.player.relics.length === 0) {
        relicsList.innerHTML = '<p style="color: #888; width: 100%; text-align: center;">还没有获得任何遗物</p>';
    } else {
        gameState.player.relics.forEach(relicId => {
            const relicData = RELIC_DB[relicId];
            if (!relicData) return;
            
            const relicEl = document.createElement('div');
            relicEl.className = 'relic-item-small';
            relicEl.innerHTML = `
                <div>${relicData.icon}</div>
                <div class="relic-name">${relicData.name}</div>
                <div class="relic-desc">${relicData.desc}</div>
            `;
            relicEl.title = relicData.desc;
            relicsList.appendChild(relicEl);
        });
    }
    
    showScreen('relics-screen');
}

function closeRelicsList() {
    showScreen('map-screen');
    updateMapUI();
}

// ==================== 启动游戏 ====================

document.addEventListener('DOMContentLoaded', initGame);

