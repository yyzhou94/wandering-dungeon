// ==================== 战斗日志 ====================

function addCombatLog(type, message) {
    const list = document.getElementById('combat-log-list');
    if (!list) return;
    const entry = document.createElement('div');
    entry.className = `combat-log-entry combat-log-${type || 'info'}`;
    entry.textContent = message;
    list.appendChild(entry);
    // 保持最多 50 条,自动清理旧日志
    while (list.children.length > 50) {
        list.removeChild(list.firstChild);
    }
    list.scrollTop = list.scrollHeight;
}

// ==================== 敌人 SVG 精灵系统 ====================

// SVG 精灵图像库(扁平化矢量风格)
const ENEMY_SPRITES = {
    // 第一层 - 青绿色调
    goblin: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="goblinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#1abc9c;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#16a085;stop-opacity:1" />
                </linearGradient>
            </defs>
            <ellipse cx="50" cy="60" rx="30" ry="35" fill="url(#goblinGrad)"/>
            <path d="M 25 45 L 10 30 L 30 40 Z" fill="#16a085"/>
            <path d="M 75 45 L 90 30 L 70 40 Z" fill="#16a085"/>
            <circle cx="40" cy="50" r="5" fill="#fff"/>
            <circle cx="60" cy="50" r="5" fill="#fff"/>
            <circle cx="40" cy="50" r="2" fill="#000"/>
            <circle cx="60" cy="50" r="2" fill="#000"/>
            <path d="M 40 65 Q 50 70 60 65" stroke="#0d5c4e" stroke-width="2" fill="none"/>
            <path d="M 45 68 L 45 75 L 48 72 Z" fill="#fff"/>
            <path d="M 55 68 L 55 75 L 52 72 Z" fill="#fff"/>
        </svg>
    `,
    slime: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="slimeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#58d68d;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#27ae60;stop-opacity:0.8" />
                </linearGradient>
            </defs>
            <ellipse cx="50" cy="65" rx="35" ry="25" fill="url(#slimeGrad)"/>
            <ellipse cx="50" cy="60" rx="30" ry="20" fill="url(#slimeGrad)"/>
            <circle cx="40" cy="55" r="4" fill="#000"/>
            <circle cx="60" cy="55" r="4" fill="#000"/>
            <ellipse cx="35" cy="50" rx="8" ry="5" fill="rgba(255,255,255,0.3)"/>
        </svg>
    `,
    skeleton: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="45" rx="25" ry="28" fill="#ecf0f1"/>
            <circle cx="38" cy="40" r="8" fill="#2c3e50"/>
            <circle cx="62" cy="40" r="8" fill="#2c3e50"/>
            <path d="M 45 52 L 50 58 L 55 52 Z" fill="#2c3e50"/>
            <rect x="42" y="60" width="6" height="10" fill="#ecf0f1"/>
            <rect x="52" y="60" width="6" height="10" fill="#ecf0f1"/>
            <path d="M 35 70 Q 50 75 65 70" stroke="#bdc3c7" stroke-width="3" fill="none"/>
            <path d="M 38 78 Q 50 82 62 78" stroke="#bdc3c7" stroke-width="3" fill="none"/>
        </svg>
    `,
    orc: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="orcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#588157;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#3a5a40;stop-opacity:1" />
                </linearGradient>
            </defs>
            <ellipse cx="50" cy="60" rx="32" ry="35" fill="url(#orcGrad)"/>
            <path d="M 42 65 L 42 78 L 48 72 Z" fill="#fff"/>
            <path d="M 58 65 L 58 78 L 52 72 Z" fill="#fff"/>
            <circle cx="38" cy="50" r="6" fill="#e74c3c"/>
            <circle cx="62" cy="50" r="6" fill="#e74c3c"/>
            <circle cx="38" cy="50" r="2" fill="#000"/>
            <circle cx="62" cy="50" r="2" fill="#000"/>
            <path d="M 30 42 L 45 45" stroke="#2d4428" stroke-width="4" stroke-linecap="round"/>
            <path d="M 70 42 L 55 45" stroke="#2d4428" stroke-width="4" stroke-linecap="round"/>
        </svg>
    `,
    dark_mage: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="mageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8e44ad;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#5b2c6f;stop-opacity:1" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <path d="M 30 70 L 70 70 L 60 40 L 40 40 Z" fill="url(#mageGrad)"/>
            <ellipse cx="50" cy="75" rx="25" ry="15" fill="#4a1c5a"/>
            <ellipse cx="50" cy="35" rx="20" ry="22" fill="#3a1a4a"/>
            <circle cx="43" cy="32" r="4" fill="#00ffff" filter="url(#glow)"/>
            <circle cx="57" cy="32" r="4" fill="#00ffff" filter="url(#glow)"/>
            <rect x="75" y="40" width="4" height="40" fill="#8b4513"/>
            <circle cx="77" cy="38" r="6" fill="#8e44ad" filter="url(#glow)"/>
        </svg>
    `,
    werewolf: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="wolfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#7f8c8d;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#5d6d7e;stop-opacity:1" />
                </linearGradient>
            </defs>
            <ellipse cx="50" cy="62" rx="30" ry="32" fill="url(#wolfGrad)"/>
            <path d="M 28 45 L 18 25 L 35 40 Z" fill="#5d6d7e"/>
            <path d="M 72 45 L 82 25 L 65 40 Z" fill="#5d6d7e"/>
            <ellipse cx="40" cy="50" rx="5" ry="4" fill="#e67e22"/>
            <ellipse cx="60" cy="50" rx="5" ry="4" fill="#e67e22"/>
            <circle cx="40" cy="50" r="1.5" fill="#000"/>
            <circle cx="60" cy="50" r="1.5" fill="#000"/>
            <circle cx="50" cy="58" r="4" fill="#2c3e50"/>
            <path d="M 42 65 L 50 70 L 58 65" stroke="#2c3e50" stroke-width="2" fill="none"/>
        </svg>
    `,
    demon: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="demonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#c0392b;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8b0000;stop-opacity:1" />
                </linearGradient>
                <filter id="demonGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <ellipse cx="50" cy="60" rx="32" ry="35" fill="url(#demonGrad)"/>
            <path d="M 25 40 Q 15 20 25 10 L 32 38 Z" fill="#8b0000"/>
            <path d="M 75 40 Q 85 20 75 10 L 68 38 Z" fill="#8b0000"/>
            <circle cx="38" cy="50" r="6" fill="#ffd700" filter="url(#demonGlow)"/>
            <circle cx="62" cy="50" r="6" fill="#ffd700" filter="url(#demonGlow)"/>
            <circle cx="38" cy="50" r="2" fill="#000"/>
            <circle cx="62" cy="50" r="2" fill="#000"/>
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e74c3c" stroke-width="2" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
        </svg>
    `,
    dragon: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="dragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3498db;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#2980b9;stop-opacity:1" />
                </linearGradient>
            </defs>
            <path d="M 20 50 Q 5 30 15 20 L 35 45 Z" fill="#2980b9"/>
            <path d="M 80 50 Q 95 30 85 20 L 65 45 Z" fill="#2980b9"/>
            <ellipse cx="50" cy="60" rx="28" ry="32" fill="url(#dragonGrad)"/>
            <path d="M 35 35 L 30 20 L 40 38 Z" fill="#f39c12"/>
            <path d="M 65 35 L 70 20 L 60 38 Z" fill="#f39c12"/>
            <circle cx="40" cy="48" r="5" fill="#f1c40f"/>
            <circle cx="60" cy="48" r="5" fill="#f1c40f"/>
            <circle cx="40" cy="48" r="2" fill="#000"/>
            <circle cx="60" cy="48" r="2" fill="#000"/>
            <circle cx="45" cy="65" r="2" fill="#1a5276"/>
            <circle cx="55" cy="65" r="2" fill="#1a5276"/>
            <circle cx="50" cy="72" r="2" fill="#1a5276"/>
        </svg>
    `,
    boss_goblin_king: `
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bossGoblinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#2ecc71;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#27ae60;stop-opacity:1" />
                </linearGradient>
                <filter id="bossGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <circle cx="60" cy="60" r="55" fill="none" stroke="#ffd700" stroke-width="3" opacity="0.6">
                <animate attributeName="stroke-width" values="2;4;2" dur="2s" repeatCount="indefinite"/>
            </circle>
            <ellipse cx="60" cy="75" rx="40" ry="38" fill="url(#bossGoblinGrad)"/>
            <path d="M 40 35 L 60 15 L 80 35 L 85 45 L 35 45 Z" fill="#ffd700" filter="url(#bossGlow)"/>
            <circle cx="48" cy="65" r="7" fill="#fff"/>
            <circle cx="72" cy="65" r="7" fill="#fff"/>
            <circle cx="48" cy="65" r="3" fill="#e74c3c"/>
            <circle cx="72" cy="65" r="3" fill="#e74c3c"/>
            <path d="M 30 80 L 20 110 L 100 110 L 90 80 Z" fill="#c0392b"/>
        </svg>
    `,
    boss_lich: `
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="lichGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#9b59b6;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8e44ad;stop-opacity:1" />
                </linearGradient>
                <filter id="lichGlow">
                    <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <circle cx="60" cy="60" r="55" fill="none" stroke="#9b59b6" stroke-width="4" opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            <ellipse cx="60" cy="45" rx="30" ry="32" fill="#ecf0f1"/>
            <path d="M 40 20 L 60 5 L 80 20 L 85 30 L 35 30 Z" fill="#ffd700" filter="url(#lichGlow)"/>
            <circle cx="48" cy="42" r="8" fill="#2c3e50"/>
            <circle cx="72" cy="42" r="8" fill="#2c3e50"/>
            <circle cx="48" cy="42" r="3" fill="#00ffff" filter="url(#lichGlow)"/>
            <circle cx="72" cy="42" r="3" fill="#00ffff" filter="url(#lichGlow)"/>
            <path d="M 30 80 L 20 115 L 100 115 L 90 80 Z" fill="#4a1c5a"/>
            <rect x="95" y="50" width="5" height="50" fill="#8b4513"/>
            <circle cx="97" cy="45" r="8" fill="#9b59b6" filter="url(#lichGlow)"/>
        </svg>
    `,
    boss_dragon: `
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bossDragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#e74c3c;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#c0392b;stop-opacity:1" />
                </linearGradient>
                <filter id="dragonBossGlow">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <ellipse cx="60" cy="110" rx="50" ry="8" fill="#e74c3c" opacity="0.6">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite"/>
            </ellipse>
            <path d="M 10 60 Q 0 20 30 35 L 50 55 Z" fill="#c0392b"/>
            <path d="M 110 60 Q 120 20 90 35 L 70 55 Z" fill="#c0392b"/>
            <ellipse cx="60" cy="70" rx="45" ry="40" fill="url(#bossDragonGrad)"/>
            <path d="M 30 40 Q 15 10 35 5 L 45 42 Z" fill="#f39c12"/>
            <path d="M 90 40 Q 105 10 85 5 L 75 42 Z" fill="#f39c12"/>
            <ellipse cx="45" cy="60" r="8" fill="#f1c40f" filter="url(#dragonBossGlow)"/>
            <ellipse cx="75" cy="60" r="8" fill="#f1c40f" filter="url(#dragonBossGlow)"/>
            <circle cx="45" cy="60" r="3" fill="#000"/>
            <circle cx="75" cy="60" r="3" fill="#000"/>
            <circle cx="50" cy="75" r="3" fill="#922b21"/>
            <circle cx="70" cy="75" r="3" fill="#922b21"/>
            <circle cx="60" cy="85" r="3" fill="#922b21"/>
        </svg>
    `
};

// 怪物 CSS 类映射
const ENEMY_CSS_CLASSES = {
    goblin: 'goblin', slime: 'slime', skeleton: 'skeleton',
    orc: 'orc', dark_mage: 'dark_mage', werewolf: 'werewolf',
    demon: 'demon', dragon: 'dragon',
    boss_goblin_king: 'boss_goblin_king', boss_lich: 'boss_lich', boss_dragon: 'boss_dragon'
};

// ==================== 存档系统 ====================

const SAVE_KEY = 'dungeonCardSave';
const SAVE_TIMESTAMP_KEY = 'dungeonCardSaveTime';

// 自动保存游戏进度
function saveGame() {
    if (!gameState.player || !gameState.player.class) return;

    const saveData = {
        player: {
            ...gameState.player,
            deck: [...gameState.player.deck]
        },
        map: {
            ...gameState.map,
            completedNodes: Array.from(gameState.map.completedNodes),
            paths: gameState.map.paths
        },
        difficulty: gameState.difficulty || 'normal',
        removeCount: gameState.removeCount || 0,
        battle: gameState.battle ? {
            ...gameState.battle,
            hand: [...gameState.battle.hand],
            drawPile: [...gameState.battle.drawPile],
            discardPile: [...gameState.battle.discardPile]
        } : null,
        stats: gameState.stats,
        timestamp: Date.now()
    };

    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        localStorage.setItem(SAVE_TIMESTAMP_KEY, Date.now().toString());
        console.log('[存档] 游戏进度已保存');
    } catch (e) {
        console.error('[存档] 保存失败:', e);
    }
}

// 加载游戏进度
function loadGame() {
    const saveData = localStorage.getItem(SAVE_KEY);
    if (!saveData) {
        console.log('[存档] 未找到存档');
        return false;
    }

    try {
        const data = JSON.parse(saveData);

        console.log('[存档] 加载数据:', data);
        console.log('[存档] 玩家牌组:', data.player.deck);
        console.log('[存档] 战斗手牌:', data.battle ? data.battle.hand : '无战斗数据');

        // 恢复玩家状态
        gameState.player = {
            class: data.player.class,
            hp: data.player.hp,
            maxHp: data.player.maxHp,
            energy: data.player.energy,
            maxEnergy: data.player.maxEnergy,
            block: data.player.block || 0,
            gold: data.player.gold,
            deck: [...(data.player.deck || [])],
            relics: data.player.relics || [],
            potions: data.player.potions || [],
            stats: data.player.stats || { strength: 0, dexterity: 0, weak: 0, vulnerable: 0 }
        };

        // 恢复地图状态
        console.log('[存档] 原始地图数据:', data.map);
        gameState.difficulty = data.difficulty || 'normal';
        gameState.removeCount = data.removeCount || 0;

        gameState.map = {
            floor: data.map.floor || 1,
            currentNode: data.map.currentNode || null,
            completedNodes: (() => {
                const arr = data.map.completedNodes;
                if (Array.isArray(arr)) return new Set(arr);
                // 旧存档可能是空对象 {}
                console.warn('[存档] completedNodes 不是数组,使用空集');
                return new Set();
            })(),
            paths: data.map.paths || [],
            nodeTypes: data.map.nodeTypes || {},
            nodes: [] // 渲染时重新构建
        };

        console.log('[存档] 恢复后地图数据:', {
            floor: gameState.map.floor,
            paths: gameState.map.paths,
            nodeTypes: gameState.map.nodeTypes,
            completedNodes: Array.from(gameState.map.completedNodes)
        });

        // 恢复战斗状态(如果有)
        if (data.battle) {
            gameState.battle = {
                enemy: data.battle.enemy,
                hand: [...(data.battle.hand || [])],
                drawPile: [...(data.battle.drawPile || [])],
                discardPile: [...(data.battle.discardPile || [])],
                turn: data.battle.turn || 1,
                energy: data.battle.energy || 3,
                maxEnergy: data.battle.maxEnergy || 3,
                block: data.battle.block || 0,
                strength: data.battle.strength || 0,
                dexterity: data.battle.dexterity || 0,
                ornamentalFanCount: data.battle.ornamentalFanCount || 0
            };
            console.log('[存档] 战斗状态已恢复,手牌数:', gameState.battle.hand.length);
        } else {
            gameState.battle = null;
            console.log('[存档] 无战斗状态');
        }

        // 恢复统计
        gameState.stats = data.stats || { enemiesKilled: 0, cardsAdded: 0 };

        console.log('[存档] 游戏进度已加载');
        console.log('[存档] 玩家牌组长度:', gameState.player.deck.length);
        return true;
    } catch (e) {
        console.error('[存档] 加载失败:', e);
        return false;
    }
}

// 检查是否有存档
function hasSave() {
    return localStorage.getItem(SAVE_KEY) !== null;
}

// 清除存档
function clearSave() {
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(SAVE_TIMESTAMP_KEY);
    // 同时重置内存中的 gameState,防止 beforeunload 误存
    gameState.player.class = null;
    gameState.player.hp = 80;
    gameState.player.maxHp = 80;
    gameState.player.energy = 3;
    gameState.player.maxEnergy = 3;
    gameState.player.block = 0;
    gameState.player.gold = 0;
    gameState.player.deck = [];
    gameState.player.relics = [];
    gameState.player.potions = [];
    gameState.player.stats = { strength: 0, dexterity: 0, weak: 0, vulnerable: 0 };
    gameState.map.floor = 1;
    gameState.map.paths = [];
    gameState.map.nodeTypes = {};
    gameState.map.nodes = [];
    gameState.map.currentNode = null;
    gameState.map.completedNodes = new Set();
    gameState.battle = { hand: [], drawPile: [], discardPile: [], exhaustPile: [], enemy: null, turn: 1, firstAttack: true, noDraw: false, ornamentalFanCount: 0 };
    gameState.stats = { enemiesKilled: 0, cardsAdded: 0, relicsFound: 0, highestFloor: 0 };
    window.__gameCleared = true;
    console.log('[存档] 存档已清除,内存已重置');
}

// 获取存档时间
function getSaveTime() {
    const timestamp = localStorage.getItem(SAVE_TIMESTAMP_KEY);
    if (!timestamp) return '';

    const date = new Date(parseInt(timestamp));
    const now = new Date();
    const diff = now - date;

    // 如果是在今天
    if (diff < 24 * 60 * 60 * 1000) {
        const minutes = Math.floor(diff / 60000);
        if (minutes < 1) return '刚刚';
        if (minutes < 60) return `${minutes}分钟前`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}小时前`;
    }

    return date.toLocaleString('zh-CN', {
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 更新主菜单的存档按钮状态
function updateMainMenu() {
    const continueBtn = document.getElementById('continue-game');
    const clearBtn = document.getElementById('clear-save');
    const saveInfo = document.getElementById('save-info');
    const saveTime = document.getElementById('save-time');

    if (hasSave()) {
        if (continueBtn) continueBtn.style.display = 'block';
        if (clearBtn) clearBtn.style.display = 'block';
        if (saveInfo) saveInfo.style.display = 'block';
        if (saveTime) saveTime.textContent = getSaveTime();
        if (continueBtn) continueBtn.textContent = `继续游戏 (${getSaveTime()})`;
    } else {
        if (continueBtn) continueBtn.style.display = 'none';
        if (clearBtn) clearBtn.style.display = 'none';
        if (saveInfo) saveInfo.style.display = 'none';
    }
}

// ==================== 概念原画资产映射（接入 generated-images/） ====================
const ASSET_DIR = 'generated-images/';

// 玩家职业原画（与 CLASSES 的 key 对应）
const CLASS_ART = {
    warrior:     'class_warrior.png',
    mage:        'class_mage.png',
    rogue:       'class_rogue.png',
    monk:        'class_monk.png',
    paladin:     'class_paladin.png',
    hunter:      'class_hunter.png',
    necromancer: 'class_necromancer.png',
    summoner:    'class_summoner.png'
};

// 敌人/Boss 原画（与 ENEMY_DB 的 key 对应；未列出的敌人回退到 SVG/emoji）
// 命名规范：enemy_<id>.png（普通敌人）、enemy_boss_<id>.png（Boss）
const ENEMY_ART = {
    /* 普通敌人 */
    goblin:                     'enemy_goblin.png',
    slime:                      'enemy_slime.png',
    skeleton:                   'enemy_skeleton.png',
    orc:                        'enemy_orc.png',
    dark_mage:                  'enemy_dark_mage.png',
    werewolf:                   'enemy_werewolf.png',
    demon:                      'enemy_demon.png',
    dragon:                     'enemy_dragon.png',
    gargoyle:                   'enemy_gargoyle.png',
    phoenix:                    'enemy_phoenix.png',
    spider:                     'enemy_spider.png',
    vampire:                    'enemy_vampire.png',
    witch_knight:               'enemy_witch_knight.png',
    /* 精英敌人 */
    elite_demon:                'enemy_elite_demon.png',
    elite_dragon:               'enemy_elite_dragon.png',
    elite_orc:                  'enemy_elite_orc.png',
    elite_phoenix:              'enemy_elite_phoenix.png',
    elite_skeleton_warlord:     'enemy_elite_skeleton_warlord.png',
    elite_spider:               'enemy_elite_spider.png',
    elite_vampire:              'enemy_elite_vampire.png',
    /* Boss */
    boss_goblin_king:           'enemy_boss_goblin_king.png',
    boss_lich:                  'enemy_boss_lich.png',
    boss_dragon:                'enemy_dragon.png',
    boss_lich_king:             'enemy_boss_lich_king.png',
    boss_ancient_dragon_evil:   'enemy_boss_ancient_dragon_evil.png'
};

// 卡牌原画（与 CARD_DB 的 key 对应；未列出的卡牌回退到 emoji icon）
// 卡牌原画（与 CARD_DB 的 key 对应；未列出的卡牌回退到 emoji icon）
// 注意：使用与 ui-prototype.html 同一批 vivid 原画（Dark_fantasy_game_CARD_illustr_*），
// 此前误指向另一批（Card_*）导致卡面观感偏灰暗，已对齐回原型所用文件。
const CARD_ART = {
    /* 全部 55 张卡牌原画，统一命名规则 card_<id>.png */
    aimed_shot:     'card_aimed_shot.png',
    ambush:         'card_ambush.png',
    arcane_intellect: 'card_arcane_intellect.png',
    arrow_rain:     'card_arrow_rain.png',
    backstab:       'card_backstab.png',
    bash:           'card_bash.png',
    blessing:       'card_blessing.png',
    blood_bat:      'card_blood_bat.png',
    blood_ritual:   'card_blood_ritual.png',
    cheetah_step:   'card_cheetah_step.png',
    dagger_throw:   'card_dagger_throw.png',
    dark_pact:      'card_dark_pact.png',
    death_embrace:  'card_death_embrace.png',
    defend:         'card_defend.png',
    divine_shield:  'card_divine_shield.png',
    dodge:          'card_dodge.png',
    eagle_eye:      'card_eagle_eye.png',
    explosive_arrow: 'card_explosive_arrow.png',
    fear_whisper:   'card_fear_whisper.png',
    fireball:       'card_fireball.png',
    flying_kick:    'card_flying_kick.png',
    focus_mind:     'card_focus_mind.png',
    frost_bolt:     'card_frost_bolt.png',
    heal:           'card_heal.png',
    heavy_blade:    'card_heavy_blade.png',
    hound_hawk:     'card_hound_hawk.png',
    hunt_finish:    'card_hunt_finish.png',
    hunt_mark:      'card_hunt_mark.png',
    hunting_trap:   'card_hunting_trap.png',
    iron_body:      'card_iron_body.png',
    iron_wave:      'card_iron_wave.png',
    justice_strike: 'card_justice_strike.png',
    lethal_focus:   'card_lethal_focus.png',
    life_reap:      'card_life_reap.png',
    magic_missile:  'card_magic_missile.png',
    mana_burst:     'card_mana_burst.png',
    mark_target:    'card_mark_target.png',
    pommel_strike:  'card_pommel_strike.png',
    quick_attack:   'card_quick_attack.png',
    shadow_bolt:    'card_shadow_bolt.png',
    shadow_veil:    'card_shadow_veil.png',
    shield:         'card_shield.png',
    shrug_it_off:   'card_shrug_it_off.png',
    slice:          'card_slice.png',
    soul_burn:      'card_soul_burn.png',
    soul_link:      'card_soul_link.png',
    soul_reap:      'card_soul_reap.png',
    soul_shield:    'card_soul_shield.png',
    strike:         'card_strike.png',
    summon_golem:   'card_summon_golem.png',
    sword_boomerang: 'card_sword_boomerang.png',
    trap_master:    'card_trap_master.png',
    twin_strike:    'card_twin_strike.png',
    undead_army:    'card_undead_army.png',
    underworld_walker:'card_underworld_walker.png',
    venom_arrow:    'card_venom_arrow.png',
    volleys:        'card_volleys.png',

    /* 新增 39 张卡牌原画 */
    anger:          'card_anger.png',
    antitoxin:      'card_antitoxin.png',
    battle_trance:  'card_battle_trance.png',
    bloodletting:   'card_bloodletting.png',
    burn:           'card_burn.png',
    cleave:         'card_cleave.png',
    combo_meditate: 'card_combo_meditate.png',
    combo_punch:    'card_combo_punch.png',
    curse_card:     'card_curse_card.png',
    empower_summons:'card_empower_summons.png',
    finisher:       'card_finisher.png',
    fire_bolt:      'card_fire_bolt.png',
    flame_storm:    'card_flame_storm.png',
    footwork:       'card_footwork.png',
    ghostly_armor:  'card_ghostly_armor.png',
    heal_spell:     'card_heal_spell.png',
    holy_strike:    'card_holy_strike.png',
    iron_guard:     'card_iron_guard.png',
    judgment:       'card_judgment.png',
    lava_armor:     'card_lava_armor.png',
    lightning_chain:'card_lightning_chain.png',
    plague_spread:  'card_plague_spread.png',
    seeing_red:     'card_seeing_red.png',
    soul_resonance: 'card_soul_resonance.png',
    spinning_kick:  'card_spinning_kick.png',
    summon_flower:  'card_summon_flower.png',
    summon_lightning:'card_summon_lightning.png',
    summon_master:  'card_summon_master.png',
    summon_phoenix: 'card_summon_phoenix.png',
    summon_replace: 'card_summon_replace.png',
    summon_spirit:  'card_summon_spirit.png',
    summon_storm:   'card_summon_storm.png',
    summon_synergy: 'card_summon_synergy.png',
    summon_wolf:    'card_summon_wolf.png',
    toxic_blade:    'card_toxic_blade.png',
    toxic_cloud:    'card_toxic_cloud.png',
    toxin_burst:    'card_toxin_burst.png'
};

// 遗物原画（与 RELIC_DB 的 key 对应；未列出的遗物回退到 emoji icon）
// 风格：glowing fantasy relic badge（暗底发光徽章/图标，区别于卡牌的暗黑奇幻插画）
const RELIC_ART = {
    akabeko:        'relic_akabeko.png',
    anchor:         'relic_anchor.png',
    ancient_tea_set:'relic_ancient_tea_set.png',
    bead_of_power:  'relic_bead_of_power.png',
    blood_vial:     'relic_blood_vial.png',
    bone_ring:      'relic_bone_ring.png',
    bronze_scales:  'relic_bronze_scales.png',
    burning_blood:  'relic_burning_blood.png',
    coffin:         'relic_coffin.png',
    cursed_key:     'relic_cursed_key.png',
    eagle_bow:      'relic_eagle_bow.png',
    element_core:   'relic_element_core.png',
    eternal_feather:'relic_eternal_feather.png',
    gambling_chip:  'relic_gambling_chip.png',
    holy_badge:     'relic_holy_badge.png',
    hound_collar:   'relic_hound_collar.png',
    ice_heart:      'relic_ice_heart.png',
    lava_core:      'relic_lava_core.png',
    mercury_hourglass:'relic_mercury_hourglass.png',
    obsidian:       'relic_obsidian.png',
    ornamental_fan: 'relic_ornamental_fan.png',
    phoenix_feather:'relic_phoenix_feather.png',
    ring_of_the_snake:'relic_ring_of_the_snake.png',
    sniper_scope:   'relic_sniper_scope.png',
    stone_heart:    'relic_stone_heart.png',
    summoner_manual:'relic_summoner_manual.png',
    trap_box:       'relic_trap_box.png',
    viper_fang:     'relic_viper_fang.png',
    wolf_totem:     'relic_wolf_totem.png'
};

// 辅助函数：根据 key 返回 <img> 标签，无对应原画时回退到 SVG/emoji
function enemySpriteHTML(enemyType, enemy) {
    const file = ENEMY_ART[enemyType];
    if (file) {
        const name = (enemy && enemy.name) ? enemy.name : enemyType;
        return '<img class="enemy-sprite-img" src="' + ASSET_DIR + file + '" alt="' + name + '">';
    }
    return ENEMY_SPRITES[enemyType] || (enemy && enemy.icon) || '👹';
}

function playerAvatarHTML(cls) {
    const file = CLASS_ART[cls];
    if (file) return '<img class="avatar-img" src="' + ASSET_DIR + file + '" alt="' + cls + '">';
    const fallback = { warrior: '⚔️', mage: '🔮', rogue: '🗡️', monk: '🧘', paladin: '🛡️', hunter: '🏹', necromancer: '💀', summoner: '✨' };
    return fallback[cls] || '⚔️';
}

function cardIconHTML(cardId, cardData) {
    const file = CARD_ART[cardId];
    if (file) return '<img class="card-art-img" src="' + ASSET_DIR + file + '" alt="' + (cardData ? cardData.name : cardId) + '">';
    return cardData ? cardData.icon : '';
}

// 辅助函数：根据遗物 key 返回 <img> 标签，无对应原画时回退到 emoji icon
function relicIconHTML(relicId, relicData) {
    const file = RELIC_ART[relicId];
    if (file) return '<img class="relic-art-img" src="' + ASSET_DIR + file + '" alt="">';
    return relicData ? relicData.icon : '';
}

// 卡牌类型中文标签（对齐原型/规范 .card-type：攻击/防御/技能/诅咒）
const CARD_TYPE_LABEL = { attack: '攻击', defense: '防御', skill: '技能', curse: '诅咒' };

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
    },
    monk: {
        name: '武僧',
        icon: '👊',
        maxHp: 75,
        energy: 3,
        startingDeck: ['strike', 'strike', 'strike', 'strike', 'defend', 'defend', 'flying_kick', 'flying_kick', 'focus_mind', 'iron_body']
    },
    paladin: {
        name: '圣骑士',
        icon: '🛡️',
        maxHp: 90,
        energy: 3,
        startingDeck: ['strike', 'strike', 'strike', 'defend', 'defend', 'defend', 'divine_shield', 'heal', 'justice_strike', 'blessing']
    },
    // 游侠 - 精准叠加 + 状态控制
    hunter: {
        name: '游侠',
        icon: '🏹',
        maxHp: 68,
        energy: 3,
        startingDeck: ['strike', 'strike', 'strike', 'defend', 'defend', 'defend', 'aimed_shot', 'aimed_shot', 'hunting_trap', 'venom_arrow']
    },
    // 死灵法师 - 献血换伤害 + 灵魂碎片
    necromancer: {
        name: '死灵法师',
        icon: '💀',
        maxHp: 75,
        energy: 3,
        startingDeck: ['strike', 'strike', 'strike', 'defend', 'defend', 'shadow_bolt', 'shadow_bolt', 'blood_ritual', 'soul_reap', 'soul_shield']
    },
    // 召唤师 - 召唤物作战 + 槽位管理
    summoner: {
        name: '召唤师',
        icon: '📚',
        maxHp: 62,
        energy: 3,
        startingDeck: ['strike', 'strike', 'strike', 'defend', 'defend', 'defend', 'summon_golem', 'summon_golem', 'summon_spirit', 'heal_spell']
    }
};

// 卡牌数据库
const CARD_DB = {
    // 基础牌
    strike: { rarity: 'common', name: '打击', cost: 1, type: 'attack', icon: '⚔️', desc: '造成 6 点伤害', effect: { damage: 6 } },
    defend: { rarity: 'common', name: '防御', cost: 1, type: 'defense', icon: '🛡️', desc: '获得 5 点格挡', effect: { block: 5 } },

    // 战士牌
    bash: { rarity: 'uncommon', name: '重击', cost: 2, type: 'attack', icon: '🔨', desc: '造成 8 点伤害,获得 2 点格挡', effect: { damage: 8, block: 2 } },
    heavy_blade: { rarity: 'uncommon', name: '巨剑', cost: 2, type: 'attack', icon: '⚔️', desc: '造成 14 点伤害', effect: { damage: 14 } },
    iron_wave: { rarity: 'common', name: '铁波', cost: 1, type: 'attack', icon: '〰️', desc: '造成 5 点伤害,获得 5 点格挡', effect: { damage: 5, block: 5 } },
    shrug_it_off: { rarity: 'uncommon', name: '耸肩', cost: 1, type: 'skill', icon: '🤷', desc: '获得 8 点格挡,抽 1 张牌', effect: { block: 8, draw: 1 } },
    pommel_strike: { rarity: 'common', name: '剑柄打击', cost: 1, type: 'attack', icon: '🗡️', desc: '造成 9 点伤害,抽 1 张牌', effect: { damage: 9, draw: 1 } },

    // 法师牌
    magic_missile: { rarity: 'common', name: '魔法飞弹', cost: 1, type: 'attack', icon: '✨', desc: '造成 8 点伤害', effect: { damage: 8 } },
    fireball: { rarity: 'uncommon', name: '火球术', cost: 2, type: 'attack', icon: '🔥', desc: '造成 20 点火焰伤害', effect: { damage: 20 }, keywords: ['fire'] },
    shield: { rarity: 'common', name: '魔法盾', cost: 1, type: 'defense', icon: '🔷', desc: '获得 10 点格挡', effect: { block: 10 } },
    mana_burst: { rarity: 'common', name: '魔力爆发', cost: 0, type: 'attack', icon: '💥', desc: '造成 4 点伤害,抽 1 张牌', effect: { damage: 4, draw: 1 } },
    frost_bolt: { rarity: 'uncommon', name: '寒冰箭', cost: 1, type: 'attack', icon: '❄️', desc: '造成 6 点伤害,敌人下回合伤害-3', effect: { damage: 6, weak: 1 }, keywords: ['frost'] },
    arcane_intellect: { rarity: 'common', name: '奥术智慧', cost: 1, type: 'skill', icon: '📖', desc: '抽 2 张牌', effect: { draw: 2 } },

    // 盗贼牌
    quick_attack: { rarity: 'common', name: '快速攻击', cost: 0, type: 'attack', icon: '⚡', desc: '造成 4 点伤害', effect: { damage: 4 } },
    dagger_throw: { rarity: 'common', name: '飞刀', cost: 1, type: 'attack', icon: '🗡️', desc: '造成 6 点伤害,抽 1 张牌', effect: { damage: 6, draw: 1 } },
    backstab: { rarity: 'rare', name: '背刺', cost: 2, type: 'attack', icon: '🔪', desc: '造成 16 点伤害', effect: { damage: 16 }, keywords: ['backstab'] },
    dodge: { rarity: 'common', name: '闪避', cost: 1, type: 'defense', icon: '💨', desc: '获得 6 点格挡,抽 1 张牌', effect: { block: 6, draw: 1 } },
    slice: { rarity: 'common', name: '切割', cost: 1, type: 'attack', icon: '✂️', desc: '造成 7 点伤害', effect: { damage: 7 } },

    // 武僧牌
    flying_kick: { rarity: 'uncommon', name: '飞踢', cost: 1, type: 'attack', icon: '🦵', desc: '造成 10 点伤害', effect: { damage: 10 }, keywords: ['combo'] },
    focus_mind: { rarity: 'common', name: '专注', cost: 0, type: 'skill', icon: '👁️', desc: '下张牌费用 -1,抽 1 张牌', effect: { draw: 1, discount: 1 } },
    iron_body: { rarity: 'common', name: '铁布衫', cost: 1, type: 'defense', icon: '💪', desc: '获得 7 点格挡', effect: { block: 7 } },

    // 圣骑士牌
    divine_shield: { rarity: 'uncommon', name: '圣盾术', cost: 1, type: 'defense', icon: '✨', desc: '获得 12 点格挡,抽 1 张牌', effect: { block: 12, draw: 1 } },
    heal: { rarity: 'common', name: '治疗', cost: 1, type: 'skill', icon: '💚', desc: '恢复 6 点生命', effect: { heal: 6 }, keywords: ['holy'] },
    justice_strike: { rarity: 'uncommon', name: '正义打击', cost: 2, type: 'attack', icon: '⚖️', desc: '造成 12 点伤害,恢复 3 点生命', effect: { damage: 12, heal: 3 }, keywords: ['holy'] },
    blessing: { rarity: 'common', name: '祝福', cost: 0, type: 'skill', icon: '🙏', desc: '获得 2 点能量', effect: { energy: 2 } },

    // ===== 🏹 游侠专属牌 =====
    aimed_shot: { rarity: 'uncommon', name: '瞄准射击', cost: 1, type: 'attack', icon: '🎯', desc: '造成 7 点伤害,精准 +1', effect: { damage: 7 }, keywords: ['precision'] },
    hunting_trap: { rarity: 'uncommon', name: '狩猎陷阱', cost: 1, type: 'skill', icon: '⚠️', desc: '布置一个陷阱(敌人下回合受到 8 点伤害)', effect: { trap: 8 }, keywords: ['precision'] },
    venom_arrow: { rarity: 'uncommon', name: '毒蛇箭', cost: 1, type: 'attack', icon: '🐍', desc: '造成 5 点伤害,施加 2 层毒', effect: { damage: 5, poison: 4, poisonLabel: '毒', poisonTurns: 2 }, keywords: ['precision', 'poison'] },
    volleys: { name: '连珠箭', cost: 2, type: 'attack', icon: '🏹', desc: '造成 5 点伤害 3 次,精准 +2', effect: { damage: 5, times: 3 }, keywords: ['precision'], rarity: 'uncommon' },
    eagle_eye: { name: '鹰眼', cost: 0, type: 'skill', icon: '🦅', desc: '精准 +2,抽 1 张牌', effect: { draw: 1, precision2: true }, keywords: ['precision'], rarity: 'uncommon' },
    cheetah_step: { name: '猎豹脚步', cost: 1, type: 'skill', icon: '🐆', desc: '获得 6 点格挡,精准 +1,下回合多抽 1 张', effect: { block: 6, nextDraw: 1 }, keywords: ['precision'], rarity: 'uncommon' },
    explosive_arrow: { name: '爆破箭', cost: 2, type: 'attack', icon: '💥', desc: '造成 10 点伤害。精准 ≥ 3 时额外造成 8 点', effect: { damage: 10, precisionBonus: 8, precisionThreshold: 3 }, keywords: ['precision'], rarity: 'uncommon' },
    hunt_finish: { name: '猎杀时刻', cost: 3, type: 'attack', icon: '💀', desc: '造成 15 + 精准×4 伤害,施加 3 层虚弱,重置精准', effect: { damage: 15, precisionFinish: 4, weak: 3, resetPrecision: true }, keywords: ['precision'], rarity: 'rare' },
    mark_target: { name: '标记目标', cost: 1, type: 'skill', icon: '🎯', desc: '敌人受到伤害 +2,持续 3 回合,精准 +1', effect: { enemyVulnerable: 3, enemyBonusDmg: 2 }, keywords: ['precision'], rarity: 'uncommon' },
    trap_master: { name: '陷阱大师', cost: 0, type: 'skill', icon: '💣', desc: '布置 2 个陷阱(敌人下回合受到 5 点伤害),重置精准', effect: { trap: 5, trapCount: 2, resetPrecision: true }, keywords: ['precision'], rarity: 'uncommon' },
    hound_hawk: { rarity: 'uncommon', name: '猎鹰', cost: 2, type: 'skill', icon: '🦅', desc: '召唤猎鹰(HP 20,伤害 5,持续 3 回合)', effect: { summon: { id: 'hawk', name: '猎鹰', hp: 20, maxHp: 20, damage: 5, turns: 3, maxTurns: 3, type: 'output', icon: '🦅' } }, keywords: ['precision'] },
    arrow_rain: { rarity: 'uncommon', name: '万箭穿心', cost: 3, type: 'attack', icon: '🌧️', desc: '造成精准×3 伤害。敌人有 3+ 负面状态时额外 +15', effect: { precisionDamage: 3, statusBonus: 15, statusThreshold: 3 }, keywords: ['precision', 'poison'] },
    lethal_focus: { rarity: 'uncommon', name: '致命专注', cost: 0, type: 'skill', icon: '🔍', desc: '精准 +3,下张攻击牌伤害翻倍', effect: { precision3: true, nextAttackDouble: true }, keywords: ['precision'] },
    ambush: { rarity: 'uncommon', name: '伏击', cost: 2, type: 'attack', icon: '🗡️', desc: '敌人有减益时造成 18 点,否则 8 点', effect: { debuffDamage: 18, normalDamage: 8 }, keywords: ['precision', 'backstab'] },
    hunt_mark: { name: '狩猎印记', cost: 1, type: 'skill', icon: '🔖', desc: '敌人每次被攻击额外受到 3 点伤害,持续 2 回合,精准 +1', effect: { huntMark: 2, huntMarkDmg: 3 }, keywords: ['precision'], rarity: 'uncommon' },

    // ===== 💀 死灵法师专属牌 =====
    shadow_bolt: { rarity: 'uncommon', name: '暗影冲击', cost: 1, type: 'attack', icon: '🌑', desc: '造成 8 点伤害,失去 2 点生命', effect: { damage: 8, hpCost: 2 }, keywords: ['sacrifice', 'shadow'] },
    blood_ritual: { rarity: 'uncommon', name: '鲜血仪式', cost: 2, type: 'skill', icon: '🩸', desc: '失去 8 点生命,获得 8 个灵魂碎片', effect: { hpCost: 8, gainShards: 8 }, keywords: ['sacrifice'] },
    soul_reap: { rarity: 'uncommon', name: '灵魂收割', cost: 1, type: 'attack', icon: '👻', desc: '造成 6 点伤害,消耗 2 碎片,额外造成碎片×3 伤害', effect: { damage: 6, consumeShards: 2, shardDamage: 3 }, keywords: ['shadow'] },
    soul_shield: { rarity: 'uncommon', name: '灵魂护盾', cost: 1, type: 'defense', icon: '🛡️', desc: '获得 7 点格挡,消耗 2 碎片,额外获得碎片×2 格挡', effect: { block: 7, consumeShards: 2, shardBlock: 2 }, keywords: ['shadow'] },
    blood_bat: { name: '噬血蝙蝠', cost: 1, type: 'attack', icon: '🦇', desc: '造成 7 点伤害,恢复 50% 伤害值', effect: { damage: 7, lifesteal: 0.5 }, keywords: ['sacrifice'], rarity: 'uncommon' },
    dark_pact: { name: '黑暗契约', cost: 2, type: 'skill', icon: '📜', desc: '失去 15% 当前生命,获得 5 碎片,下张牌减费', effect: { hpPercentCost: 0.15, gainShards: 5, discount: 1 }, keywords: ['sacrifice'], rarity: 'uncommon' },
    undead_army: { name: '亡灵军团', cost: 3, type: 'skill', icon: '💀', desc: '召唤 2 个骷髅兵(HP 15,伤害 5,2 回合),消耗 5 碎片', effect: { summonArmy: true, consumeShards: 5 }, keywords: ['shadow', 'summon'], rarity: 'uncommon' },
    soul_burn: { name: '灵魂燃烧', cost: 0, type: 'attack', icon: '🔥', desc: '造成灵魂碎片×2 伤害,清空碎片', effect: { shardBurnDamage: 2, consumeAllShards: true }, keywords: ['shadow'], rarity: 'rare' },
    fear_whisper: { name: '恐惧低语', cost: 1, type: 'skill', icon: '😱', desc: '敌人跳过下回合攻击,失去 3 点生命,获得 3 碎片', effect: { enemySkip: true, hpCost: 3, gainShards: 3 }, keywords: ['sacrifice'], rarity: 'uncommon' },
    shadow_veil: { name: '暗影帷幕', cost: 2, type: 'defense', icon: '🌑', desc: '获得 12 点格挡,消耗 3 碎片,额外碎片×3 格挡', effect: { block: 12, consumeShards: 3, shardBlock: 3 }, keywords: ['shadow'], rarity: 'uncommon' },
    life_reap: { rarity: 'uncommon', name: '生命收割', cost: 1, type: 'attack', icon: '⚔️', desc: '造成 10 点伤害。敌人生命 > 50% 时额外造成已损失 10% 伤害', effect: { damage: 10, percentBonus: 0.1 }, keywords: ['shadow'] },
    soul_link: { rarity: 'common', name: '灵魂链接', cost: 0, type: 'skill', icon: '🔗', desc: '本回合受伤减半,获得碎片翻倍', effect: { damageHalve: true, shardDouble: true }, keywords: ['sacrifice'] },
    death_embrace: { rarity: 'rare', name: '死亡之拥', cost: 3, type: 'attack', icon: '☠️', desc: '造成 25 伤害,失去 10 生命。累计献血 ≥ 50 时额外 +20', effect: { damage: 25, hpCost: 10, sacrificeBonus: 20, sacrificeThreshold: 50 }, keywords: ['sacrifice', 'shadow'] },
    underworld_walker: { rarity: 'uncommon', name: '冥界行者', cost: 1, type: 'skill', icon: '🚶', desc: '如果本回合献过血,恢复 10 点生命,抽 2 张牌', effect: { conditionalHeal: 10, draw: 2, checkSacrifice: true }, keywords: ['sacrifice'] },
    plague_spread: { name: '瘟疫传播', cost: 2, type: 'skill', icon: '🦠', desc: '对敌人施加 3 层毒 + 2 层虚弱,失去 5 点生命', effect: { poison: 3, poisonLabel: '毒', poisonTurns: 2, weak: 2, hpCost: 5 }, keywords: ['sacrifice', 'poison'], rarity: 'uncommon' },

    // ===== 📚 召唤师专属牌 =====
    summon_golem: { rarity: 'uncommon', name: '召唤石像兵', cost: 2, type: 'skill', icon: '🗿', desc: '召唤石像兵(HP 30,伤害 6,3 回合)', effect: { summon: { id: 'golem', name: '石像兵', hp: 30, maxHp: 30, damage: 6, turns: 3, maxTurns: 3, type: 'tank', icon: '🗿' } }, keywords: ['summon'] },
    summon_spirit: { rarity: 'uncommon', name: '元素精灵', cost: 2, type: 'skill', icon: '🧚', desc: '召唤元素精灵(HP 20,伤害 10,2 回合)', effect: { summon: { id: 'spirit', name: '元素精灵', hp: 20, maxHp: 20, damage: 10, turns: 2, maxTurns: 2, type: 'output', icon: '🧚' } }, keywords: ['summon'] },
    heal_spell: { rarity: 'common', name: '治疗术', cost: 1, type: 'skill', icon: '💚', desc: '恢复 8 点生命', effect: { heal: 8 } },
    summon_wolf: { name: '召唤影狼', cost: 2, type: 'skill', icon: '🐺', desc: '召唤影狼(HP 25,伤害 8,2 回合)', effect: { summon: { id: 'wolf', name: '影狼', hp: 25, maxHp: 25, damage: 8, turns: 2, maxTurns: 2, type: 'balanced', icon: '🐺' } }, keywords: ['summon'], rarity: 'uncommon' },
    summon_phoenix: { name: '召唤凤凰', cost: 3, type: 'skill', icon: '🦅', desc: '召唤凤凰(HP 40,伤害 5,3 回合,死亡恢复 15 HP)', effect: { summon: { id: 'phoenix', name: '凤凰', hp: 40, maxHp: 40, damage: 5, turns: 3, maxTurns: 3, type: 'heal', icon: '🦅', deathHeal: 15 } }, keywords: ['summon'], rarity: 'rare' },
    empower_summons: { name: '强化召唤', cost: 1, type: 'skill', icon: '⬆️', desc: '所有召唤物伤害 +3,持续 2 回合', effect: { empowerDamage: 3, empowerTurns: 2 }, keywords: ['summon'], rarity: 'uncommon' },
    summon_synergy: { name: '召唤协同', cost: 1, type: 'skill', icon: '🔗', desc: '场上有 2+ 召唤物时抽 2 张牌,否则抽 1 张', effect: { conditionalDraw: { threshold: 2, draw: 2, fallbackDraw: 1 } }, keywords: ['summon'], rarity: 'uncommon' },
    summon_storm: { name: '召唤风暴', cost: 3, type: 'skill', icon: '⛈️', desc: '所有召唤物立即攻击 1 次,然后 -1 持续时间', effect: { storm: true }, keywords: ['summon'], rarity: 'rare' },
    summon_flower: { name: '治疗花', cost: 2, type: 'skill', icon: '🌸', desc: '召唤治疗花(HP 15,每回合恢复玩家 4 HP,2 回合)', effect: { summon: { id: 'flower', name: '治疗花', hp: 15, maxHp: 15, damage: 0, turns: 2, maxTurns: 2, type: 'heal', icon: '🌸', healPerTurn: 4 } }, keywords: ['summon'], rarity: 'uncommon' },
    summon_master: { rarity: 'uncommon', name: '召唤大师', cost: 2, type: 'skill', icon: '🎓', desc: '召唤 2 个随机召唤物', effect: { summonRandom: 2 }, keywords: ['summon'] },
    soul_resonance: { rarity: 'common', name: '灵魂共鸣', cost: 0, type: 'skill', icon: '🎵', desc: '如果场上有 3 个召唤物,获得 2 点能量', effect: { conditionalEnergy: { threshold: 3, energy: 2 } }, keywords: ['summon'] },
    iron_guard: { rarity: 'uncommon', name: '铁壁守卫', cost: 3, type: 'skill', icon: '🛡️', desc: '召唤铁卫(HP 50,伤害 4,4 回合)', effect: { summon: { id: 'guard', name: '铁卫', hp: 50, maxHp: 50, damage: 4, turns: 4, maxTurns: 4, type: 'tank', icon: '🛡️' } }, keywords: ['summon'] },
    summon_replace: { rarity: 'common', name: '召唤替换', cost: 1, type: 'skill', icon: '🔄', desc: '移除一个召唤物,召唤一个随机召唤物', effect: { replace: true }, keywords: ['summon'] },
    summon_lightning: { name: '闪电鸟', cost: 2, type: 'skill', icon: '⚡', desc: '召唤闪电鸟(HP 18,伤害 14,AOE,2 回合)', effect: { summon: { id: 'lightning', name: '闪电鸟', hp: 18, maxHp: 18, damage: 14, turns: 2, maxTurns: 2, type: 'aoe', icon: '⚡', aoe: true } }, keywords: ['summon', 'lightning'], rarity: 'uncommon' },

    // 通用强力牌
    sword_boomerang: { rarity: 'common', name: '回旋剑', cost: 1, type: 'attack', icon: '🔄', desc: '随机造成 3 点伤害 3 次', effect: { damage: 3, times: 3 } },
    twin_strike: { rarity: 'common', name: '双重打击', cost: 1, type: 'attack', icon: '👊', desc: '造成 5 点伤害 2 次', effect: { damage: 5, times: 2 }, keywords: ['combo'] },
    anger: { rarity: 'common', name: '愤怒', cost: 0, type: 'attack', icon: '😤', desc: '造成 6 点伤害,将一张愤怒放入弃牌堆', effect: { damage: 6, addCard: 'anger' } },
    cleave: { rarity: 'uncommon', name: '顺劈斩', cost: 1, type: 'attack', icon: '⚔️', desc: '对所有敌人造成 8 点伤害', effect: { damage: 8, aoe: true } },

    // 防御牌
    footwork: { rarity: 'uncommon', name: '步法', cost: 1, type: 'skill', icon: '👟', desc: '获得 3 点敏捷(每打出防御牌额外+1格挡)', effect: { dexterity: 3 } },
    ghostly_armor: { rarity: 'uncommon', name: '幽灵护甲', cost: 1, type: 'defense', icon: '👻', desc: '获得 10 点格挡,不能被打出', effect: { block: 10, ethereal: true } },

    // 技能牌
    battle_trance: { rarity: 'common', name: '战斗专注', cost: 0, type: 'skill', icon: '🧘', desc: '抽 3 张牌,本回合不能再抽牌', effect: { draw: 3, noDraw: true } },
    bloodletting: { rarity: 'common', name: '放血', cost: 0, type: 'skill', icon: '🩸', desc: '失去 3 点生命,获得 2 点能量', effect: { hpCost: 3, energy: 2 } },
    seeing_red: { rarity: 'common', name: '看见红色', cost: 1, type: 'skill', icon: '🔴', desc: '获得 2 点能量,将这张牌放入抽牌堆', effect: { energy: 2, shuffle: true } },

    // 诅咒牌(Ascension A7 使用)
    curse_card: { rarity: 'common', name: '诅咒', cost: 0, type: 'curse', icon: '💀', desc: '无法打出,每回合开始时损失 2 点生命', effect: { hpCost: 2 } },

    // ===== 🔥 火焰路线 =====
    fire_bolt: { name: '火焰冲击', cost: 1, type: 'attack', icon: '🔥', desc: '造成 8 点火焰伤害', effect: { damage: 8 }, keywords: ['fire'], rarity: 'uncommon' },
    burn: { name: '燃烧', cost: 1, type: 'skill', icon: '🔥', desc: '对敌人施加 3 层燃烧(每回合 2 伤害,持续 2 回合)', effect: { poison: 6, poisonLabel: '燃烧', poisonTurns: 2 }, keywords: ['fire'], rarity: 'uncommon' },
    flame_storm: { name: '烈焰风暴', cost: 3, type: 'attack', icon: '🌋', desc: '造成 12 点伤害。如果敌人有燃烧/毒层,额外造成 10 点', effect: { damage: 12 }, keywords: ['fire', 'synergy_poison'], rarity: 'rare' },
    lava_armor: { name: '熔岩护甲', cost: 1, type: 'defense', icon: '🛡️', desc: '获得 8 点格挡。如果上张牌是火焰牌,获得 14 点', effect: { block: 8 }, keywords: ['fire', 'fire_prev'], rarity: 'uncommon' },

    // ===== ☠️ 毒物路线 =====
    toxic_blade: { name: '剧毒之刃', cost: 1, type: 'attack', icon: '☠️', desc: '造成 5 点伤害,施加 2 层毒', effect: { damage: 5, poison: 2 }, keywords: ['poison'], rarity: 'uncommon' },
    toxic_cloud: { name: '毒雾', cost: 2, type: 'skill', icon: '☁️', desc: '对敌人施加 3 层毒', effect: { poison: 3 }, keywords: ['poison'], rarity: 'uncommon' },
    antitoxin: { name: '解药', cost: 0, type: 'skill', icon: '💊', desc: '移除敌人 1 层毒,每移除造成 3 点伤害', effect: { antitoxin: 1 }, keywords: ['poison'], rarity: 'uncommon' },
    toxin_burst: { name: '毒素爆发', cost: 1, type: 'attack', icon: '💥', desc: '造成等于敌人毒层数 × 3 的伤害', effect: { toxinBurst: 3 }, keywords: ['poison', 'synergy_poison'], rarity: 'rare' },

    // ===== 🔄 连击路线 =====
    combo_punch: { name: '组合拳', cost: 1, type: 'attack', icon: '👊', desc: '造成 4 点伤害。连击每+1,伤害+2', effect: { damage: 4 }, keywords: ['combo'], rarity: 'uncommon' },
    spinning_kick: { name: '旋风腿', cost: 2, type: 'attack', icon: '🌀', desc: '造成 8 点伤害。连击每+1,伤害+2', effect: { damage: 8 }, keywords: ['combo'], rarity: 'uncommon' },
    combo_meditate: { name: '冥想', cost: 0, type: 'skill', icon: '🧘', desc: '恢复 4 点生命,重置连击计数', effect: { heal: 4, resetCombo: true }, keywords: ['combo'], rarity: 'uncommon' },
    finisher: { name: '终结技', cost: 2, type: 'attack', icon: '💫', desc: '造成 {连击×5} 点伤害,重置连击', effect: { finisher: 5 }, keywords: ['combo', 'combo_finish'], rarity: 'rare' },

    // ===== ⚡ 闪电 =====
    lightning_chain: { name: '闪电链', cost: 2, type: 'attack', icon: '⚡', desc: '造成 12 点闪电伤害', effect: { damage: 12 }, keywords: ['lightning'], rarity: 'uncommon' },

    // ===== ✨ 神圣 =====
    holy_strike: { name: '圣击', cost: 1, type: 'attack', icon: '✨', desc: '造成 9 点神圣伤害', effect: { damage: 9 }, keywords: ['holy'], rarity: 'uncommon' },
    judgment: { name: '制裁', cost: 2, type: 'attack', icon: '⚖️', desc: '造成 15 点神圣伤害,恢复 5 点生命', effect: { damage: 15, heal: 5 }, keywords: ['holy'], rarity: 'rare' }
};

// 敌人数据库
const ENEMY_DB = {
    // 第一层
    goblin: { name: '哥布林', hp: 30, icon: '👹', pattern: 'simple', damage: 8 },
    slime: { name: '史莱姆', hp: 40, icon: '🟢', pattern: 'simple', damage: 6 },
    skeleton: { name: '骷髅', hp: 35, icon: '💀', pattern: 'defensive', damage: 7, tags: ['undead'] },

    // 第二层
    orc: { name: '兽人', hp: 50, icon: '👺', pattern: 'aggressive', damage: 12 },
    dark_mage: { name: '黑暗法师', hp: 45, icon: '🧙‍♂️', pattern: 'caster', damage: 15 },
    werewolf: { name: '狼人', hp: 55, icon: '🐺', pattern: 'aggressive', damage: 10 },

    // 第三层
    demon: { name: '恶魔', hp: 70, icon: '👿', pattern: 'aggressive', damage: 14, tags: ['demon'] },
    dragon: { name: '幼龙', hp: 80, icon: '🐉', pattern: 'caster', damage: 18 },

    // 精英敌人(新增)
    elite_orc: { name: '精英兽人', hp: 70, icon: '👹⚡', pattern: 'aggressive', damage: 14 },
    elite_demon: { name: '精英恶魔', hp: 95, icon: '👿⚡', pattern: 'aggressive', damage: 17, tags: ['demon'] },
    elite_dragon: { name: '精英幼龙', hp: 110, icon: '🐉⚡', pattern: 'caster', damage: 21 },
    elite_spider: { name: '精英毒蛛', hp: 55, icon: '🕷️⚡', pattern: 'fast', damage: 12 },
    elite_vampire: { name: '精英吸血鬼', hp: 85, icon: '🧛⚡', pattern: 'lifesteal', damage: 16, tags: ['undead'] },
    elite_skeleton_warlord: { name: '精英骷髅领主', hp: 100, icon: '💀⚡', pattern: 'balanced', damage: 18, tags: ['undead'] },
    elite_phoenix: { name: '精英凤凰', hp: 75, icon: '🦅⚡', pattern: 'regen', damage: 15 },

    // Boss
    boss_goblin_king: { name: '哥布林王', hp: 80, icon: '👑', pattern: 'boss', damage: 10 },
    boss_lich: { name: '巫妖', hp: 150, icon: '💀', pattern: 'boss', damage: 18, tags: ['undead'] },
    boss_dragon: { name: '远古巨龙', hp: 200, icon: '🐲', pattern: 'boss', damage: 22 },
    boss_lich_king: { name: '巫妖王', hp: 250, icon: '👑💀', pattern: 'boss', damage: 25, tags: ['undead'] },
    boss_ancient_dragon_evil: { name: '上古邪龙', hp: 300, icon: '🐉🔥', pattern: 'boss', damage: 30 },

    // 新敌人模式
    spider: { name: '毒蜘蛛', hp: 40, icon: '🕷️', pattern: 'fast', damage: 8 },
    vampire: { name: '吸血鬼', hp: 55, icon: '🧛', pattern: 'lifesteal', damage: 12, tags: ['undead'] },
    gargoyle: { name: '石像鬼', hp: 70, icon: '🗿', pattern: 'tank', damage: 14 },
    phoenix: { name: '凤凰', hp: 50, icon: '🦅', pattern: 'regen', damage: 13 },
    witch_knight: { name: '巫骑士', hp: 65, icon: '⚔️🧙', pattern: 'balanced', damage: 15 }
};

// 分层节点类型配置(新增)
const FLOOR_NODE_CONFIG = {
    1: {
        // 第一层:教学与适应
        battles: 0.50,      // 50% 战斗
        shops: 0.12,        // 12% 商店
        rests: 0.06,        // 6% 休息
        events: 0.12,       // 12% 事件
        elites: 0,          // 0% 精英
        boss: 0.06          // 6% Boss
    },
    2: {
        // 第二层:深化与挑战
        battles: 0.56,      // 56% 战斗
        shops: 0.12,        // 12% 商店
        rests: 0.06,        // 6% 休息
        events: 0.12,       // 12% 事件
        elites: 0.06,       // 6% 精英
        boss: 0.06          // 6% Boss
    },
    3: {
        // 第三层:终极考验
        battles: 0.62,      // 62% 战斗
        shops: 0.06,        // 6% 商店
        rests: 0,           // 0% 休息
        events: 0.06,       // 6% 事件
        elites: 0.19,       // 19% 精英
        boss: 0.06          // 6% Boss
    },
    4: {
        // 第四层:亡灵国度
        battles: 0.62,      // 62% 战斗
        shops: 0.06,        // 6% 商店
        rests: 0,           // 0% 休息
        events: 0.06,       // 6% 事件
        elites: 0.22,       // 22% 精英
        boss: 0.04          // 4% Boss
    },
    5: {
        // 第五层:深渊熔炉
        battles: 0.65,      // 65% 战斗
        shops: 0.04,        // 4% 商店
        rests: 0,           // 0% 休息
        events: 0.04,       // 4% 事件
        elites: 0.25,       // 25% 精英
        boss: 0.02          // 2% Boss
    }
};

// 遗物数据库
const RELIC_DB = {
    // === 🩸 鲜血盟约 ===
    burning_blood: { name: '燃烧之血', icon: '🩸', desc: '战斗结束时恢复 6 点生命', rarity: 'common', tag: 'blood' },
    
    // === 🛡️ 守护者 ===
    anchor: { name: '船锚', icon: '⚓', desc: '每场战斗开始时获得 10 点格挡', rarity: 'common', tag: 'warden' },
    
    // === 💰 贪婪 ===
    ring_of_the_snake: { name: '蛇之戒指', icon: '💍', desc: '战斗开始时额外抽 2 张牌', rarity: 'common', tag: 'greed' },
    
    // === ⚔️ 战斗 ===
    akabeko: { name: '赤猫', icon: '🐱', desc: '每场战斗第一次攻击造成 8 点额外伤害', rarity: 'common', tag: 'combat' },
    ancient_tea_set: { name: '古茶具', icon: '🍵', desc: '在休息处恢复额外 10 点生命', rarity: 'common', tag: 'recovery' },

    // === ☠️ 暗影之手 ===
    bronze_scales: { name: '青铜鳞', icon: '🐍', desc: '每当你受到伤害,对攻击者造成 3 点伤害', rarity: 'uncommon', tag: 'shadow' },
    mercury_hourglass: { name: '水银沙漏', icon: '⏳', desc: '每回合开始时对所有敌人造成 3 点伤害', rarity: 'uncommon', tag: 'shadow' },
    
    // === 🛡️ 守护者 ===
    ornamental_fan: { name: '装饰扇', icon: '🪭', desc: '每打出 3 张攻击牌,获得 4 点格挡', rarity: 'uncommon', tag: 'warden' },

    // === 💰 贪婪 ===
    cursed_key: { name: '诅咒钥匙', icon: '🗝️', desc: '获得时获得 1 个普通遗物,但宝箱变成诅咒', rarity: 'rare', tag: 'greed' },
    eternal_feather: { name: '永恒羽毛', icon: '🪶', desc: '每添加一张牌到牌组,恢复 3 点生命', rarity: 'rare', tag: 'recovery' },
    gambling_chip: { name: '赌博筹码', icon: '🎰', desc: '战斗开始时丢弃任意张牌并抽等量牌', rarity: 'rare', tag: 'greed' },

    // === 🔥 烈焰之心 ===
    lava_core: { name: '熔岩核心', icon: '🔥', desc: '火焰牌费用 -1', rarity: 'rare', tag: 'inferno', keywordRelic: 'fire' },

    // === ❄️ 冰霜 ===
    ice_heart: { name: '冰之心', icon: '❄️', desc: '冰霜牌额外施加 1 层虚弱', rarity: 'rare', tag: 'frost', keywordRelic: 'frost' },

    // === ☠️ 暗影之手 ===
    viper_fang: { name: '毒蛇之牙', icon: '🐍', desc: '毒层数上限 +3', rarity: 'rare', tag: 'shadow', keywordRelic: 'poison' },

    // === 🔄 连击 ===
    bead_of_power: { name: '连环珠', icon: '📿', desc: '每回合额外 +1 连击计数', rarity: 'rare', tag: 'combo', keywordRelic: 'combo' },

    // === ✨ 神圣 ===
    holy_badge: { name: '圣光徽章', icon: '✨', desc: '神圣牌额外造成 5 点伤害', rarity: 'rare', tag: 'holy', keywordRelic: 'holy' },

    // === 🏹 精准 ===
    eagle_bow: { name: '鹰眼之弓', icon: '🏹', desc: '攻击牌精准计数额外 +1', rarity: 'common', tag: 'precision' },
    hound_collar: { name: '猎犬项圈', icon: '🐺', desc: '每回合开始时,如果精准 ≥ 2,敌人获得 1 层虚弱', rarity: 'uncommon', tag: 'precision' },
    sniper_scope: { name: '狙击镜', icon: '🎯', desc: '第一张打出的精准牌费用 -1', rarity: 'uncommon', tag: 'precision' },
    trap_box: { name: '陷阱箱', icon: '💣', desc: '起始时布置 1 个陷阱,精英战斗额外 1 个', rarity: 'uncommon', tag: 'combat' },

    // === 🩸 鲜血盟约 ===
    bone_ring: { name: '白骨戒指', icon: '💀', desc: '每回合开始时,如果灵魂碎片 ≥ 5,恢复 3 点生命', rarity: 'common', tag: 'blood' },
    blood_vial: { name: '血瓶', icon: '🦇', desc: '献血获得灵魂碎片 +2', rarity: 'uncommon', tag: 'blood' },
    coffin: { name: '棺木', icon: '⚰️', desc: '每局限 1 次,生命值降至 0 时恢复至 15 HP', rarity: 'rare', tag: 'blood' },
    obsidian: { name: '黑曜石', icon: '🌑', desc: '暗影牌对亡灵/恶魔敌人伤害 +5', rarity: 'rare', tag: 'shadow' },

    // === 📚 召唤之环 ===
    summoner_manual: { name: '召唤师手册', icon: '📚', desc: '召唤物存活额外 +1 回合', rarity: 'common', tag: 'summon' },
    stone_heart: { name: '石像之心', icon: '🗿', desc: '坦克类召唤物 HP +20', rarity: 'uncommon', tag: 'summon' },
    phoenix_feather: { name: '凤凰羽', icon: '🦅', desc: '每局限 2 次,召唤物死亡时额外恢复 5 HP', rarity: 'uncommon', tag: 'summon' },
    element_core: { name: '元素核心', icon: '⚡', desc: '输出类召唤物伤害 +5', rarity: 'uncommon', tag: 'summon' },
    wolf_totem: { name: '狼王图腾', icon: '🐺', desc: '影狼类召唤物额外施加 1 层虚弱', rarity: 'uncommon', tag: 'summon' }
};

// ==================== P1: 遗物联动标签系统 ====================

const RELIC_TAGS = {
    inferno:  { name: '烈焰之心', icon: '🔥', color: '#e74c3c', synergy: '每持有 1 个同标签遗物，🔥 火焰牌伤害 +2' },
    warden:   { name: '守护者',  icon: '🛡️', color: '#3498db', synergy: '每持有 1 个同标签遗物，防御牌格挡 +2' },
    shadow:   { name: '暗影之手', icon: '☠️', color: '#8e44ad', synergy: '每持有 1 个同标签遗物，☠️ 毒层数 +1' },
    greed:    { name: '贪婪',     icon: '💰', color: '#f1c40f', synergy: '每持有 1 个同标签遗物，战斗金币 +5' },
    summon:   { name: '召唤之环', icon: '📚', color: '#2ecc71', synergy: '每持有 1 个同标签遗物，召唤物 HP +10' },
    blood:    { name: '鲜血盟约', icon: '🩸', color: '#c0392b', synergy: '每持有 1 个同标签遗物，献血恢复 +1 HP' },
    frost:    { name: '冰霜之心', icon: '❄️', color: '#85c1e9', synergy: '每持有 1 个同标签遗物，冰霜牌额外施加 1 层虚弱' },
    holy:     { name: '圣光之环', icon: '✨', color: '#f9e79f', synergy: '每持有 1 个同标签遗物，神圣牌伤害 +2' },
    combo:    { name: '连击大师', icon: '🔄', color: '#e67e22', synergy: '每持有 1 个同标签遗物，连击计数额外 +1' },
    precision:{ name: '精准之眼', icon: '🎯', color: '#1abc9c', synergy: '每持有 1 个同标签遗物，精准计数额外 +1' },
    recovery: { name: '生命之泉', icon: '💚', color: '#27ae60', synergy: '每持有 1 个同标签遗物，治疗效果 +2' },
    combat:   { name: '战斗专家', icon: '⚔️', color: '#95a5a6', synergy: '每持有 1 个同标签遗物，攻击牌伤害 +1' }
};

function getRelicSynergy(tag) {
    if (!tag) return 0;
    return gameState.player.relics.filter(r => {
        const relic = RELIC_DB[r];
        return relic && relic.tag === tag;
    }).length;
}

function getRelicSynergyBonus(tag) {
    return Math.max(0, getRelicSynergy(tag) - 1);
}

function getPlayerTagCounts() {
    const counts = {};
    gameState.player.relics.forEach(r => {
        const relic = RELIC_DB[r];
        if (relic && relic.tag) {
            counts[relic.tag] = (counts[relic.tag] || 0) + 1;
        }
    });
    return counts;
}

// ==================== P2: Ascension 系统 ====================

const ASCENSION_DEFS = [
    { id: 'a1', name: '减益持久', desc: '虚弱/易伤等减益效果持续 +1 回合', icon: '📉', apply: (s) => { s.battle.debuffExtraTurns = (s.battle.debuffExtraTurns || 0) + 1; } },
    { id: 'a2', name: '敌人强化', desc: '敌人获得 +2 伤害', icon: '💪', enemyBonusDamage: 2 },
    { id: 'a3', name: '能量削减', desc: '每回合能量 -1(最低 1)', icon: '⚡', energyPenalty: 1 },
    { id: 'a4', name: '牌库惩罚', desc: '基础牌组额外添加 2 张打击', icon: '🃏', extraStrikes: 2 },
    { id: 'a5', name: '商店涨价', desc: '商店商品价格 +25%', icon: '💰', shopPriceMult: 1.25 },
    { id: 'a6', name: '无休息', desc: '休息处不恢复生命', icon: '🔥', noRestHeal: true },
    { id: 'a7', name: '诅咒起手', desc: '每场战斗开始时获得 1 张诅咒牌', icon: '💀', startingCurse: true },
    { id: 'a8', name: '精英强化', desc: '精英敌人 HP +20%', icon: '⭐', eliteHpMult: 1.2 },
    { id: 'a9', name: '药水失效', desc: '战斗中药水有 20% 概率失效', icon: '🧪', potionFailChance: 0.2 },
    { id: 'a10', name: '抽牌减少', desc: '每回合抽牌数 -1(最低 3)', icon: '📉', drawPenalty: 1 },
    { id: 'a11', name: 'Boss 狂暴', desc: 'Boss 额外获得 20% 最大生命', icon: '👹', bossHpMult: 1.2 },
    { id: 'a12', name: '资源匮乏', desc: '起始金币减半,药水上限 -1', icon: '📉', goldCutHalf: true, potionCapMinus: 1 }
];

function getPotionCap() {
    let cap = 3;
    if (ascensionActive('a12')) cap -= 1;
    return cap;
}

// 持久化 Ascension 设置
function loadAscensionSettings() {
    try {
        return JSON.parse(localStorage.getItem('dungeonAscension') || '{}');
    } catch(e) { return {}; }
}

function saveAscensionSettings(settings) {
    localStorage.setItem('dungeonAscension', JSON.stringify(settings));
}

// 检查是否启用了某个 Ascension
function ascensionActive(id) {
    const settings = loadAscensionSettings();
    return !!settings[id];
}

// 获取已开启的 Ascension 数量
function getAscensionCount() {
    const settings = loadAscensionSettings();
    return Object.values(settings).filter(v => v).length;
}

// ==================== P2: 每日挑战 / 种子 PRNG ====================

// Mulberry32 种子随机数生成器
function createSeededRNG(seed) {
    return function() {
        seed |= 0; seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

// 生成每日种子(基于日期)
function getDailySeed() {
    const now = new Date();
    const dateStr = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

// 获取每日种子文本
function getDailySeedText() {
    const seed = getDailySeed();
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let text = '';
    let s = seed;
    for (let i = 0; i < 6; i++) {
        text += chars[s % chars.length];
        s = (s / chars.length) | 0;
    }
    return text;
}

// 每日职业轮换
function getDailyClass() {
    const classes = ['warrior', 'mage', 'rogue', 'monk', 'paladin', 'hunter', 'necromancer', 'summoner'];
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    return classes[dayOfYear % classes.length];
}

// 检查是否处于每日挑战模式
function isDailyMode() {
    return sessionStorage.getItem('dungeonDailyMode') === 'true';
}

// 每日模式的 RNG
let dailyRNG = null;

function seededRandom() {
    if (dailyRNG) return dailyRNG();
    return Math.random();
}

function setDailyRNG(seed) {
    dailyRNG = createSeededRNG(seed);
}

// 药水数据库
const POTION_DB = {
    health_potion: { name: '生命药水', icon: '❤️', desc: '恢复 20 点生命', effect: { heal: 20 } },
    energy_potion: { name: '能量药水', icon: '⚡', desc: '获得 2 点能量', effect: { energy: 2 } },
    strength_potion: { name: '力量药水', icon: '💪', desc: '获得 3 点力量', effect: { strength: 3 } },
    block_potion: { name: '格挡药水', icon: '🛡️', desc: '获得 12 点格挡', effect: { block: 12 } },
    fire_potion: { name: '火焰药水', icon: '🔥', desc: '造成 20 点伤害', effect: { damage: 20 } },
    // P3: 药水扩充
    crazy_potion: { name: '疯狂药水', icon: '🌀', desc: '本回合能量 x2,下回合能量 -1', effect: { type: 'crazy' } },
    curse_potion: { name: '诅咒药水', icon: '☠️', desc: '对敌人造成 15 伤害,自己受到 10 伤害', effect: { type: 'curse' } },
    copy_potion: { name: '复制药水', icon: '📋', desc: '复制手牌中第一张牌(加入手牌)', effect: { type: 'copy' } },
    universal_potion: { name: '万能药水', icon: '❓', desc: '随机获得一种效果', effect: { type: 'universal' } },
    berserk_potion: { name: '狂暴药水', icon: '😤', desc: '获得 5 点力量,持续 3 回合', effect: { type: 'berserk' } }
};


// 辅助:随机稀有卡牌

// ==================== P3: Boss 台词 & 结局 & 层间过渡 ====================

// Boss 击败台词
const BOSS_TAUNTS = {
    boss_goblin_king: {
        high: '什么?!我只是个小小的王...',
        mid: '你比我想象的强...但别得意。',
        low: '咳咳...下次...不,不会有下次了...',
        perfect: '我...我什么都没做你就打赢了?这不公平!'
    },
    boss_lich: {
        high: '有趣...你的灵魂比预想的纯净。',
        low: '千年的灵魂...就这样消散了...或许死亡才是解脱...'
    },
    boss_dragon: {
        high: '数千年来...你是第一个。记住这个名字。',
        low: '龙的血脉不会断绝...但我的时代结束了。'
    },
    boss_lich_king: {
        high: '你们以为击败了我?我只是...选择...放下...',
        low: '万千冤魂...终于可以安息了...谢谢你...'
    },
    boss_ancient_dragon_evil: {
        high: '黑暗不会消失...但你的光芒...确实刺眼...',
        low: '心脏...停止了...但低语会找到下一个...'
    }
};

// 层间过渡文本
const FLOOR_TRANSITIONS = [
    null,
    '矿坑的尽头,你看到了一片被诅咒的森林...',
    '穿过森林,一座废墟出现在眼前...',
    '遗迹深处,深渊在召唤你...',
    '深渊之下,最终的黑暗在等待...'
];

// ==================== P1: Boss 背景叙事 ====================

const BOSS_LORE = {
    boss_goblin_king: {
        name: '哥布林王',
        intro: '你踏入废弃矿坑的深处。王座上的哥布林挥舞着锈剑,周围的小兵发出刺耳的尖笑。"又一个来送死的?"',
        quotes: [
            { hpThreshold: 0.7, text: '什么?！我的剑可是...' },
            { hpThreshold: 0.4, text: '小杂碎们,上！给我撕碎他！' },
            { hpThreshold: 0.1, text: '不...不可能...我只是个小王啊...' }
        ],
        victory: {
            easy: '哥布林王瘫坐在王座上,举起了双手。"别杀我！宝藏都是你的！"',
            hard: '你一脚踩碎了哥布林的皇冠。矿坑重归寂静。',
            perfect: '哥布林甚至没碰到你。也许它该退位让贤了。'
        }
    },
    boss_lich: {
        name: '巫妖',
        intro: '阴冷的灵魂之风迎面吹来。一位枯骨法师悬浮在半空,眼窝中闪烁着幽蓝的魂火。"又一个挑战者...你的灵魂会是我的养分。"',
        quotes: [
            { hpThreshold: 0.7, text: '有趣...你的灵魂比预想的坚韧。' },
            { hpThreshold: 0.4, text: '亡灵大军,听从我的召唤！' },
            { hpThreshold: 0.1, text: '千年的灵魂...就这样消散了...' }
        ],
        victory: {
            easy: '巫妖的魂火渐渐熄灭。"终于...可以安息了..."',
            hard: '随着巫妖的倒下,周围的亡灵也失去了力量。',
            perfect: '巫妖还没来得及念完咒语就倒下了。'
        }
    },
    boss_dragon: {
        name: '龙',
        intro: '灼热的空气扭曲了视线。一头巨龙盘踞在废墟之上,金色的鳞片反射着危险的光芒。"数千年了,你是第一个来到这里的。"',
        quotes: [
            { hpThreshold: 0.7, text: '数千年来...你是第一个...' },
            { hpThreshold: 0.4, text: '龙焰,吞噬一切！' },
            { hpThreshold: 0.1, text: '龙的血脉不会断绝...但我的时代结束了...' }
        ],
        victory: {
            easy: '巨龙低下了高傲的头颅。"我认输。"',
            hard: '龙的鳞片散落一地,每片都闪烁着金色的光芒。',
            perfect: '巨龙甚至没有完全展开翅膀就倒下了。'
        }
    },
    boss_lich_king: {
        name: '亡灵之王',
        intro: '深渊的入口,万千冤魂的哀嚎回荡在耳边。一位头戴黑冠的亡灵君王端坐在白骨王座上。"欢迎来到永恒的国度。"',
        quotes: [
            { hpThreshold: 0.7, text: '亡灵的王权,不可挑战！' },
            { hpThreshold: 0.4, text: '我的亡者大军将淹没你！' },
            { hpThreshold: 0.1, text: '万千冤魂...终于可以安息了...' }
        ],
        victory: {
            easy: '亡灵之王放下了权杖。"你们赢了...让亡者安息吧。"',
            hard: '王冠碎裂的瞬间,万千冤魂归于平静。',
            perfect: '亡灵之王甚至没有起身就倒下了。'
        }
    },
    boss_ancient_dragon_evil: {
        name: '上古邪龙',
        intro: '黑暗本身在跳动。一头体型远超常理的黑龙盘踞在深渊底部,双瞳如血红的火炬。"你是光明的使者？那就让我看看,你能燃烧多久。"',
        quotes: [
            { hpThreshold: 0.7, text: '黑暗不会消失...但你的光芒确实刺眼...' },
            { hpThreshold: 0.4, text: '感受上古的怒火吧！' },
            { hpThreshold: 0.1, text: '心脏...停止了...但低语会找到下一个...' }
        ],
        victory: {
            easy: '邪龙低下了头。"光明终将战胜黑暗...这次我认了。"',
            hard: '黑龙化为灰烬,深渊终于迎来了第一缕阳光。',
            perfect: '邪龙甚至没有完全苏醒就倒下了。'
        }
    }
};

// 追踪已触发的 Boss 台词
let bossQuotesTriggered = {};

// 触发 Boss 台词
function checkBossQuotes(bossId) {
    const boss = gameState.battle.enemy;
    if (!boss.isBoss) return;
    const lore = BOSS_LORE[bossId];
    if (!lore || !lore.quotes) return;

    const hpPercent = (boss.currentHp / boss.maxHp) * 100;
    const key = bossId;
    if (!bossQuotesTriggered[key]) bossQuotesTriggered[key] = [];

    lore.quotes.forEach((q, i) => {
        if (hpPercent <= q.hpThreshold * 100 && !bossQuotesTriggered[key].includes(i)) {
            bossQuotesTriggered[key].push(i);
            addCombatLog('info', '💬 ' + boss.name + ': "' + q.text + '"');
        }
    });
}

// ==================== P2: 战斗 Buff/诅咒系统 ====================

// Buff 池
const BATTLE_BUFFS = [
    { id: 'battle_cry', name: '战吼', icon: '📣', desc: '首次出牌费用 -1', effect: 'firstCardDiscount', weight: 20 },
    { id: 'adrenaline', name: '肾上腺素', icon: '⚡', desc: '能量 +1', effect: 'extraEnergy', weight: 15 },
    { id: 'iron_wall', name: '铁壁', icon: '🧱', desc: '首次格挡 +5', effect: 'firstBlockBonus', weight: 15 },
    { id: 'first_strike', name: '先手优势', icon: '🎯', desc: '抽牌 +2', effect: 'extraDrawStart', weight: 15 },
    { id: 'sharp_blade', name: '利刃', icon: '🗡️', desc: '首次攻击伤害 +5', effect: 'firstAttackBonus', weight: 10 },
    { id: 'ward', name: '守护', icon: '🛡️', desc: '获得 10 格挡', effect: 'initialBlock', weight: 15 }
];

// 诅咒池
const BATTLE_CURSES = [
    { id: 'wound_infection', name: '伤口感染', icon: '🤢', desc: '每回合开始 -1 HP', effect: 'hpLossPerTurn', weight: 15 },
    { id: 'energy_leak', name: '能量泄漏', icon: '💧', desc: '每回合能量 -1', effect: 'energyLossPerTurn', weight: 10 },
    { id: 'soul_bind', name: '灵魂束缚', icon: '⛓️', desc: '每回合抽牌 -1', effect: 'drawPenalty', weight: 15 },
    { id: 'weakness', name: '虚弱', icon: '🟡', desc: '获得 2 层虚弱', effect: 'initialWeakness', weight: 20 }
];

// 获取加权随机的 Buff/诅咒
function getWeightedRandomItem(pool) {
    const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);
    let r = randomInt(0, totalWeight - 1);
    for (const item of pool) {
        r -= item.weight;
        if (r < 0) return item;
    }
    return pool[pool.length - 1];
}

// 在战斗开始时随机 Buff
function rollBattleBuff() {
    if (Math.random() < 0.55) { // 55% 概率有 Buff
        const buff = getWeightedRandomItem(BATTLE_BUFFS);
        gameState.battle.activeBuff = buff;

        // 应用即时效果
        switch (buff.effect) {
            case 'extraEnergy':
                gameState.player.energy += 1;
                break;
            case 'extraDrawStart':
                drawCards(2);
                break;
            case 'initialBlock':
                gameState.player.block += 10;
                showFloatingText('🛡️ +10', document.querySelector('.player-area'), '#3498db');
                break;
            case 'initialWeakness':
                gameState.player.stats.weak = 2;
                break;
        }

        addCombatLog('buff', '✨ 战斗 Buff: ' + buff.icon + ' ' + buff.name + ' — ' + buff.desc);
    }
}

// 应用回合开始时 Buff/诅咒效果
function applyBuffCurseTurnStart() {
    const battle = gameState.battle;
    if (!battle.activeBuff) return;

    const buff = battle.activeBuff;

    if (buff.effect === 'firstCardDiscount') {
        // 首次出牌时应用,在 playCard 中处理
    }
    if (buff.effect === 'firstBlockBonus') {
        // 首次格挡时应用,在 effect.block 中处理
    }
    if (buff.effect === 'firstAttackBonus') {
        // 首次攻击时应用,在 damage 计算中处理
    }
    if (buff.effect === 'hpLossPerTurn') {
        gameState.player.hp = Math.max(1, gameState.player.hp - 1);
        showFloatingText('-1 HP', document.querySelector('.player-area'), '#e74c3c');
    }
    if (buff.effect === 'energyLossPerTurn') {
        gameState.player.energy = Math.max(1, gameState.player.energy - 1);
        showFloatingText('-1 ⚡', document.querySelector('.player-area'), '#e74c3c');
    }
    if (buff.effect === 'drawPenalty') {
        battle.drawPenalty = (battle.drawPenalty || 0) + 1;
    }
}

// 辅助:随机稀有卡牌
function getRandomRareCard() {
    const v = Object.keys(CARD_DB).filter(id => { const c = CARD_DB[id]; return c && (c.type === 'attack' || c.type === 'skill' || c.type === 'defense'); });
    return v.length > 0 ? v[randomInt(0, v.length - 1)] : 'strike';
}
// 辅助:加权随机遗物
function getWeightedRelic(excludeList, rarityFilter) {
    const all = Object.keys(RELIC_DB);
    let e = all.filter(id => {
        if (excludeList && excludeList.includes(id)) return false;
        if (rarityFilter) { const r = RELIC_DB[id]; return r && (r.rarity === rarityFilter || r.rarity === 'uncommon' || r.rarity === 'rare'); }
        return true;
    });
    if (e.length === 0) e = all;
    return e[randomInt(0, e.length - 1)];
}
// 事件数据库(扩充至 12 个,含 minFloor/maxFloor/weight)
const EVENT_DB = [
    // ===== 风险回报类 =====
    { title: '受伤的老兵', sprite: '👴', desc: '一个身负重伤的士兵拦住了你。"帮帮我...我可以教你战斗技巧,或者给你武器。"',
      category: 'risk', minFloor: 1, maxFloor: 5, weight: 5,
      choices: [{ text: '战斗教学(获得 1 张稀有卡牌)', action: 'veteran_train' }, { text: '给我武器(获得 1 个遗物,失去 15 点生命)', action: 'veteran_weapon' }, { text: '离开', action: 'leave' }] },
    { title: '诅咒雕像', sprite: '🗿', desc: '一座散发着黑气的雕像。触碰它的人获得了力量,但也付出了代价。',
      category: 'risk', minFloor: 1, maxFloor: 5, weight: 4,
      choices: [{ text: '触碰雕像(获得遗物 + 诅咒)', action: 'curse_statue_touch' }, { text: '摧毁雕像(战斗!)', action: 'curse_statue_fight' }, { text: '离开', action: 'leave' }] },
    { title: '赌徒的骰子', sprite: '🎲', desc: '一个神秘的赌徒向你招手。"来一局?公平的骰子,赌的是你的运气。"',
      category: 'risk', minFloor: 1, maxFloor: 5, weight: 5,
      choices: [{ text: '掷骰子', action: 'gamble_dice' }, { text: '离开', action: 'leave' }] },
    { title: '隐藏密室', sprite: '🚪', desc: '墙壁上有一道裂缝,后面似乎是一个密室。你听到了微弱的呼吸声。',
      category: 'risk', minFloor: 2, maxFloor: 5, weight: 3,
      choices: [{ text: '进入密室(精英战斗,奖励丰厚)', action: 'secret_room' }, { text: '忽略裂缝', action: 'leave' }] },
    { title: '命运之门', sprite: '✨', desc: '一扇发光的门矗立在你面前。门后是财富还是死亡?',
      category: 'risk', minFloor: 4, maxFloor: 5, weight: 2,
      choices: [{ text: '打开门(50% 稀有遗物 / 50% 失去 30% 生命)', action: 'fate_door' }, { text: '离开', action: 'leave' }] },
    // ===== 资源交换类 =====
    { title: '流浪医师', sprite: '👨\u200d⚕️', desc: '一位衣衫褴褛的医师坐在篝火旁。"我可以治疗你,但需要代价。"',
      category: 'exchange', minFloor: 1, maxFloor: 5, weight: 4,
      choices: [{ text: '支付 30 金币治疗(恢复 50% 生命)', action: 'healer_pay', gold: 30 }, { text: '用遗物换治疗(失去 1 个遗物,完全恢复)', action: 'healer_relic' }, { text: '离开', action: 'leave' }] },
    { title: '训练假人', sprite: '🤖', desc: '一个破旧的训练假人,旁边有一把铁锤和一张纸条:"免费升级一张牌。"',
      category: 'exchange', minFloor: 1, maxFloor: 5, weight: 3,
      choices: [{ text: '升级卡牌(免费锻造 1 张)', action: 'dummy_upgrade' }, { text: '离开', action: 'leave' }] },
    { title: '流浪商人', sprite: '🧳', desc: '一个神秘的商人愿意用遗物交换金币。',
      category: 'exchange', minFloor: 1, maxFloor: 5, weight: 4,
      choices: [{ text: '花费 50 金币购买遗物', action: 'merchant_buy', gold: 50 }, { text: '偷窃(高风险)', action: 'merchant_steal' }, { text: '离开', action: 'leave' }] },
    { title: '炼金台', sprite: '⚗️', desc: '一个古老的炼金台,上面摆满了各种瓶瓶罐罐。',
      category: 'exchange', minFloor: 2, maxFloor: 5, weight: 3,
      choices: [{ text: '合成药水(消耗 20 金币)', action: 'alchemy_potion', gold: 20 }, { text: '升级药水(消耗 1 个药水,效果翻倍)', action: 'alchemy_upgrade' }, { text: '离开', action: 'leave' }] },
    // ===== 叙事推进类 =====
    { title: '古代铭文', sprite: '📜', desc: '墙壁上刻着古代文字,讲述了这个地牢的起源。你似乎感受到了一种力量。',
      category: 'story', minFloor: 2, maxFloor: 5, weight: 3,
      choices: [{ text: '阅读铭文(获得 +1 力量)', action: 'inscription_read' }, { text: '离开', action: 'leave' }] },
    { title: '亡者之书', sprite: '📖', desc: '一本记录着探险者死亡日记的书。最后一页是空白的。',
      category: 'story', minFloor: 3, maxFloor: 5, weight: 2,
      choices: [{ text: '写下你的名字(获得强力卡牌,最大生命 -10)', action: 'death_book_write' }, { text: '合上书离开', action: 'leave' }] },
    { title: '神秘泉水', sprite: '💧', desc: '一汪清澈的泉水,散发着治愈的气息。',
      category: 'story', minFloor: 1, maxFloor: 5, weight: 4,
      choices: [{ text: '饮用(恢复 30% 生命)', action: 'fountain_drink' }, { text: '装满瓶子(获得药水)', action: 'fountain_fill' }, { text: '聆听回响(获得 1 能量永久)', action: 'fountain_listen' }, { text: '离开', action: 'leave' }] }
];

// 加权随机事件选择
// ==================== P2: 无尽地牢模式 ====================

// 无尽模式敌人数值缩放
function getEndlessMultiplier() {
    if (gameState.mode !== 'endless') return 1.0;
    // 每层递增 8%，第 N 层 (从 5 开始) 的倍率
    const excess = gameState.endlessFloor - 4;
    return 1 + excess * 0.08;
}

function applyEndlessScaling(enemy) {
    const mult = getEndlessMultiplier();
    enemy.hp = Math.round(enemy.maxHp * mult);
    enemy.maxHp = Math.round(enemy.maxHp * mult);
    enemy.damage = Math.round((enemy.damage || 6) * mult);
    return enemy;
}

// 获取最高层数
function getEndlessBestFloor() {
    try {
        return parseInt(localStorage.getItem('dungeonEndlessBestFloor') || '0');
    } catch(e) { return 0; }
}

function setEndlessBestFloor(floor) {
    if (floor > getEndlessBestFloor()) {
        localStorage.setItem('dungeonEndlessBestFloor', String(floor));
    }
}

function selectEventByWeight() {
    const floor = gameState.map.floor;
    const eligible = EVENT_DB.filter(e => e.minFloor <= floor && e.maxFloor >= floor);
    const totalW = eligible.reduce((s, e) => s + (e.weight || 1), 0);
    let r = Math.random() * totalW;
    for (const ev of eligible) { r -= (ev.weight || 1); if (r <= 0) return ev; }
    return eligible[eligible.length - 1];
}


// ==================== 游戏状态 ====================

let gameState = {
    difficulty: 'normal',
    mode: 'normal',       // 'normal' | 'endless'
    endlessFloor: 0,      // 无尽模式实际层数
    player: {
        class: null,  // 默认 null,防止 beforeunload 误存默认模板
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
        ornamentalFanCount: 0,
        // P2: 关键词系统
        comboCount: 0,
        lastKeyword: null,
        // 敌人毒/燃烧层数
        enemyPoison: 0,
        enemyPoisonTurns: 0,
        enemyPoisonLabel: '毒',
        // 狂暴药水buff
        rageTurns: 0,
        rageStrength: 0,
        // P2 新三职业字段
        precisionCount: 0,       // 游侠:精准计数
        traps: [],                // 游侠:陷阱列表 [{damage, triggerNext}]
        soulShards: 0,           // 死灵法师:灵魂碎片
        soulShardMax: 10,        // 死灵法师:碎片上限
        totalSacrifice: 0,       // 死灵法师:本局累计献血量
        sacrificedThisTurn: false, // 死灵法师:本回合是否献过血
        damageHalve: false,      // 死灵法师:灵魂链接-受伤减半
        shardDouble: false,      // 死灵法师:灵魂链接-碎片翻倍
        summonSlots: 3,          // 召唤师:召唤槽位数
        summons: [],             // 召唤师:场上召唤物
        empowerBuff: 0,          // 召唤师:强化召唤伤害buff
        empowerTurns: 0,         // 召唤师:强化召唤剩余回合
        coffinUsed: false,       // 死灵法师:棺木是否已用
        phoenixFeatherUses: 0,   // 召唤师:凤凰羽使用次数
        firstPrecisionCard: true, // 游侠:狙击镜-第一张精准牌
        // 关键词协同追踪
        comboDamageThisTurn: 0,    // 连环打击:本回合总伤害
        shadowRitualActive: false, // 暗影仪式:本回合是否激活
        poisonDiscount: 0          // 剧毒领域:毒牌费用折扣
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
        highestFloor: 0,
        cardsRemoved: 0
    },
    removeCount: 0  // 每局移除卡牌次数(休息节点免费移除限制 1 次)
};

// ==================== 工具函数 ====================

// P2: 支持种子随机数(每日挑战模式)
function randomInt(min, max) {
    return Math.floor(seededRandom() * (max - min + 1)) + min;
}

function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function showScreen(screenId) {
    console.log('[showScreen] Switching to:', screenId);
    const screen = document.getElementById(screenId);
    if (!screen) {
        console.error('[showScreen] 找不到 screen:', screenId);
        console.log('[showScreen] 可用 screens:', Array.from(document.querySelectorAll('.screen')).map(s => s.id).join(', '));
        return;
    }
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active', 'floor-1', 'floor-2', 'floor-3');
    });
    screen.classList.add('active');

    // 更新 gameState.screen(用于 closeRelicsList 等函数判断返回目标)
    gameState.screen = screenId;

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
    // 随机位置微调,避免完全重叠
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

function shakeElement(element, intensity = 'medium') {
    element.classList.add(`shake-${intensity}`);
    const duration = intensity === 'large' ? 600 : intensity === 'medium' ? 400 : 300;
    setTimeout(() => element.classList.remove(`shake-${intensity}`), duration);
}

// 屏幕震动效果
function shakeScreen(intensity = 'medium') {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;

    gameContainer.classList.add(`screen-shake-${intensity}`);
    const duration = intensity === 'large' ? 800 : intensity === 'medium' ? 500 : 300;
    setTimeout(() => gameContainer.classList.remove(`screen-shake-${intensity}`), duration);
}

// 重攻击时的屏幕震动
function shakeOnHeavyAttack() {
    const enemy = gameState.battle.enemy;
    const damage = enemy.currentHp < enemy.maxHp * 0.5; // 如果造成过半伤害
    if (damage) {
        shakeScreen('medium');
    }
}

let bossShakeInterval = null;

// Boss 战持续微震动(每 3 秒一次)
function startBossShake() {
    if (bossShakeInterval) return;

    const enemy = gameState.battle.enemy;
    // 修复:所有 Boss 都应该触发震动,不要用名字匹配
    if (!enemy || enemy.pattern !== 'boss') {
        return;
    }

    bossShakeInterval = setInterval(() => {
        shakeScreen('small');
    }, 3000);
}

function stopBossShake() {
    if (bossShakeInterval) {
        clearInterval(bossShakeInterval);
        bossShakeInterval = null;
    }
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
    if (gameInitialized) return;
    gameInitialized = true;

    // 加载最高分

    // 更新主菜单存档按钮状态
    try { updateMainMenu(); } catch(e) { console.error('[initGame] updateMainMenu error:', e); };

    // 绑定主菜单按钮
    document.getElementById('start-game').addEventListener('click', () => {
        exitDailyMode();
        showScreen('class-select');
    });

    // 无尽地牢模式
    document.getElementById('start-endless').addEventListener('click', () => {
        gameState.mode = 'endless';
        gameState.endlessFloor = 0;
        exitDailyMode();
        showScreen('class-select');
    });

    // 继续游戏按钮
    document.getElementById('continue-game').addEventListener('click', () => {
        if (loadGame()) {
            showScreen('map-screen');
            // 如果地图数据已恢复,直接渲染;否则生成新地图
            if (gameState.map.paths && gameState.map.paths.length > 0) {
                console.log('[继续游戏] 使用已保存的地图数据');
                renderMap(); // 只渲染,不重新生成
            } else {
                console.log('[继续游戏] 无地图数据,生成新地图');
                generateMap();
            }
        } else {
            alert('存档加载失败,请重新开始游戏');
        }
    });

    // 清除进度按钮
    const clearSaveBtn = document.getElementById('clear-save');
    if (clearSaveBtn) clearSaveBtn.addEventListener('click', () => {
        if (confirm('确定要清除当前进度吗?清除后无法恢复!')) {
            clearSave();
            updateMainMenu();
            showFloatingText('进度已清除', document.querySelector('#main-menu'), '#e74c3c');
        }
    });

    document.getElementById('view-stats').addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof showStatsPanel === 'function') showStatsPanel();
    });

    // 收藏图鉴
    const viewCollectionBtn = document.getElementById('view-collection');
    if (viewCollectionBtn) viewCollectionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof showCollectionPanel === 'function') showCollectionPanel();
    });

    // 成就系统
    const viewAchievementsBtn = document.getElementById('view-achievements');
    if (viewAchievementsBtn) viewAchievementsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof showAchievementsPanel === 'function') showAchievementsPanel();
    });

    // 更新日志
    const viewChangelogBtn = document.getElementById('view-changelog');
    if (viewChangelogBtn) viewChangelogBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof showChangelogPanel === 'function') showChangelogPanel();
    });

    // P2: Ascension 面板
    const openAscensionBtn = document.getElementById('open-ascension');
    if (openAscensionBtn) openAscensionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof showAscensionPanel === 'function') showAscensionPanel();
    });

    const closeAscensionBtn = document.getElementById('close-ascension');
    if (closeAscensionBtn) closeAscensionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof closeAscensionPanel === 'function') closeAscensionPanel();
    });

    const ascensionSelectAllBtn = document.getElementById('ascension-select-all');
    if (ascensionSelectAllBtn) ascensionSelectAllBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const allSettings = {};
        ASCENSION_DEFS.forEach(def => { allSettings[def.id] = true; });
        saveAscensionSettings(allSettings);
        showAscensionPanel();
    });

    const ascensionResetBtn = document.getElementById('ascension-reset');
    if (ascensionResetBtn) ascensionResetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('确定要取消所有进阶挑战吗?')) {
            saveAscensionSettings({});
            showAscensionPanel();
        }
    });

    // P2: 每日挑战面板
    const openDailyBtn = document.getElementById('open-daily');
    if (openDailyBtn) openDailyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof showDailyPanel === 'function') showDailyPanel();
    });

    const closeDailyBtn = document.getElementById('close-daily');
    if (closeDailyBtn) closeDailyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof closeDailyPanel === 'function') closeDailyPanel();
    });

    const startDailyBtn = document.getElementById('start-daily');
    if (startDailyBtn) startDailyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof startDailyChallenge === 'function') startDailyChallenge();
    });

    // 关闭面板
    // 点击面板外部区域自动关闭
    document.addEventListener('click', (e) => {
        // 如果点击的是进阶挑战列表项,跳过关闭检测(因为重绘会触发假阳性)
        if (e.target.closest('.ascension-item') || e.target.closest('.ascension-toggle')) return;
        const panelsToClose = ['achievements-panel', 'collection-panel', 'changelog-panel', 'stats-panel', 'combat-log-panel', 'ascension-panel', 'daily-panel'];
        panelsToClose.forEach(id => {
            const p = document.getElementById(id);
            if (p && p.classList.contains('show')) {
                // 如果点击的不是面板内部元素,就关闭
                if (!p.contains(e.target)) {
                    p.classList.remove('show');
                }
            }
        });
    });

    // 查看遗物(地图界面和战斗界面)
    const viewRelicsBtn = document.getElementById('view-relics');
    if (viewRelicsBtn) viewRelicsBtn.addEventListener('click', () => {
        if (typeof showRelicsList === 'function') showRelicsList();
    });

    const viewRelicsMapBtn = document.getElementById('view-relics-map');
    if (viewRelicsMapBtn) viewRelicsMapBtn.addEventListener('click', () => {
        if (typeof showRelicsList === 'function') showRelicsList();
    });

    const viewRelicsBattleBtn = document.getElementById('view-relics-battle');
    if (viewRelicsBattleBtn) viewRelicsBattleBtn.addEventListener('click', () => {
        if (typeof showRelicsList === 'function') showRelicsList();
    });
    // close-relics 按钮（新弹窗）
    const closeRelicsBtn = document.getElementById('close-relics-modal');
    if (closeRelicsBtn) {
        closeRelicsBtn.addEventListener('click', () => {
            if (typeof closeRelicsList === 'function') closeRelicsList();
        });
    }

    // 战斗日志
    const viewCombatLogBtn = document.getElementById('view-combat-log');
    if (viewCombatLogBtn) viewCombatLogBtn.addEventListener('click', () => {
        const panel = document.getElementById('combat-log-panel');
        if (panel) panel.classList.toggle('show');
    });

    // 难度选择
    gameState.difficulty = 'normal';
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            gameState.difficulty = btn.dataset.difficulty;
        });
    });

    // 职业选择
    document.querySelectorAll('.class-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });

    document.getElementById('confirm-class').addEventListener('click', () => {
        if (typeof startNewGame === 'function') startNewGame();
    });

    // P1: 牌组减法 - 休息处移除卡牌按钮
    const restRemoveBtn = document.getElementById('rest-remove');
    if (restRemoveBtn) restRemoveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showRemoveCardModal();
    });

    // P1: 牌组减法 - 休息处移除卡牌按钮
    document.getElementById('back-to-menu').addEventListener('click', () => showScreen('main-menu'));

    // 其他按钮绑定
    const viewDeckBtn = document.getElementById('view-deck');
    if (viewDeckBtn) viewDeckBtn.addEventListener('click', () => {
        if (typeof showDeckModal === 'function') showDeckModal();
    });

    const viewDeckMapBtn = document.getElementById('view-deck-map');
    if (viewDeckMapBtn) viewDeckMapBtn.addEventListener('click', () => {
        if (typeof showDeckModal === 'function') showDeckModal();
    });

    const closeDeckBtn = document.getElementById('close-deck');
    if (closeDeckBtn) closeDeckBtn.addEventListener('click', () => {
        if (typeof hideDeckModal === 'function') hideDeckModal();
    });
    document.getElementById('end-turn').addEventListener('click', () => {
        if (typeof endTurn === 'function') endTurn();
    });
    document.getElementById('skip-card').addEventListener('click', () => {
        showScreen('map-screen');
        generateMap();
    });
    document.getElementById('leave-shop').addEventListener('click', () => {
        // 离开商店时保存进度
        saveGame();
        showScreen('map-screen');
        generateMap();
    });
    document.getElementById('leave-rest').addEventListener('click', () => {
        // 离开休息处时保存进度
        saveGame();
        showScreen('map-screen');
        generateMap();
    });
    document.getElementById('return-menu').addEventListener('click', () => showScreen('main-menu'));

    // 休息处按钮
    document.getElementById('rest-heal').addEventListener('click', () => {
        if (typeof restHeal === 'function') restHeal();
    });
    document.getElementById('rest-upgrade').addEventListener('click', () => {
        if (typeof restUpgrade === 'function') restUpgrade();
    });
}

// 退出/清理每日挑战状态:普通新游戏进入职业选择前调用,
// 避免上一局每日挑战残留的 sessionStorage 标记强制锁定职业,
// 以及被设为不可交互的卡片样式仍未还原。
function exitDailyMode() {
    sessionStorage.removeItem('dungeonDailyMode');
    document.querySelectorAll('.class-card').forEach(c => {
        c.style.pointerEvents = '';
        c.style.opacity = '';
        c.classList.remove('selected');
    });
    const def = document.querySelector('.class-card[data-class="warrior"]');
    if (def) def.classList.add('selected');
}

function startNewGame() {
    // 防御性清理:若非每日模式,确保残留的每日标记被清除,
    // 防止普通游戏被错误地强制锁定到每日职业(状态未同步导致战斗页职业显示不一致)
    if (!isDailyMode()) {
        sessionStorage.removeItem('dungeonDailyMode');
    }
    // P2: 每日挑战模式
    if (isDailyMode()) {
        const seed = getDailySeed();
        setDailyRNG(seed);
        const dailyClass = getDailyClass();
        // 强制选择每日职业
        document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
        const dailyCard = document.querySelector(`.class-card[data-class="${dailyClass}"]`);
        if (dailyCard) dailyCard.classList.add('selected');
    }

    const selectedClass = document.querySelector('.class-card.selected').dataset.class;
    const classData = CLASSES[selectedClass];

    // 安全检查:防止选择了未定义的职导致崩溃
    if (!classData) {
        console.error(`[错误] 职业 "${selectedClass}" 未在 CLASSES 中定义!`);
        alert(`职业 "${selectedClass}" 数据缺失,请使用战士/法师/盗贼。`);
        return;
    }

    // 根据职业设置初始金币(战士 100,法师 80,盗贼 120)
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
        // P2: Ascension A4 - 额外打击牌
        relics: [],
        potions: [],
        stats: {
            strength: 0,
            dexterity: 0,
            weak: 0,
            vulnerable: 0
        }
    };

    // 📚 收藏图鉴:记录初始牌组到收藏
    const knownCards = JSON.parse(localStorage.getItem('dungeonCardKnownCards') || '[]');
    classData.startingDeck.forEach(cardId => {
        if (!knownCards.includes(cardId)) knownCards.push(cardId);
    });
    localStorage.setItem('dungeonCardKnownCards', JSON.stringify(knownCards));

    // P2: Ascension A4 - 额外打击牌
    if (ascensionActive('a4')) {
        gameState.player.deck.push('strike', 'strike');
    }

    // P2: A12 资源匮乏
    if (ascensionActive('a12')) {
        gameState.player.gold = Math.floor(gameState.player.gold / 2);
    }

    // 重置地图(保留 path 为空,让 generateMap 生成新路径)
    gameState.map = {
        floor: 1,
        nodes: [],
        currentNode: null,
        completedNodes: new Set(),
        path: [],  // 清空路径,让新层生成新路径
        paths: [],  // 清空多路径
        nodeTypes: null  // 清空节点类型
    };

    // 重置统计
    gameState.stats = {
        enemiesKilled: 0,
        cardsAdded: 0,
        relicsFound: 0,
        highestFloor: 0,
        cardsRemoved: 0
    };
    gameState.removeCount = 0;

    // P3: 本局统计计时从开局开始
    gameState.sessionStats = { totalDamage: 0, totalBlock: 0, potionsUsed: 0, totalTurns: 0, startTime: Date.now() };

    // 给初始遗物
    if (selectedClass === 'warrior') {
        addRelic('burning_blood');
    } else if (selectedClass === 'mage') {
        addRelic('ring_of_the_snake');
    } else if (selectedClass === 'rogue') {
        addRelic('anchor');
    } else if (selectedClass === 'hunter') {
        addRelic('eagle_bow');
        // 陷阱箱
        if (gameState.player.relics.includes('trap_box')) {
            gameState.battle.traps.push({ damage: 8, triggerNext: true });
        }
    } else if (selectedClass === 'necromancer') {
        addRelic('bone_ring');
    } else if (selectedClass === 'summoner') {
        addRelic('summoner_manual');
    }

    // P2: 新三职业初始化
    gameState.battle.precisionCount = 0;
    gameState.battle.traps = [];
    gameState.battle.soulShards = 0;
    gameState.battle.soulShardMax = 10;
    gameState.battle.totalSacrifice = 0;
    gameState.battle.sacrificedThisTurn = false;
    gameState.battle.damageHalve = false;
    gameState.battle.shardDouble = false;
    gameState.battle.summonSlots = 3;
    gameState.battle.summons = [];
    gameState.battle.empowerBuff = 0;
    gameState.battle.empowerTurns = 0;
    gameState.battle.coffinUsed = false;
    gameState.battle.phoenixFeatherUses = 0;
    gameState.battle.firstPrecisionCard = true;

    showScreen('map-screen');
    generateMap();
}

// ==================== 地图系统 ====================

// 渲染地图(只渲染,不重新生成数据)
// 更新地图头部信息(HP / 金币 / 楼层)
function updateMapUI() {
    document.getElementById('map-player-hp').textContent = `❤️ ${gameState.player.hp}/${gameState.player.maxHp}`;
    document.getElementById('map-player-gold').textContent = `💰 ${gameState.player.gold}`;
    document.getElementById('map-floor').textContent = `第 ${gameState.map.floor} 层`;
}

function renderMap() {
    console.log('[渲染地图] 开始渲染');
    console.log('[渲染地图] 楼层:', gameState.map.floor);
    console.log('[渲染地图] 路径:', gameState.map.paths);
    console.log('[渲染地图] 节点类型:', gameState.map.nodeTypes);
    console.log('[渲染地图] 已完成节点:', Array.from(gameState.map.completedNodes));

    if (!gameState.map.paths || gameState.map.paths.length === 0) {
        console.error('[渲染地图] 错误:没有路径数据!');
        // 如果没路径,生成新地图
        generateMap();
        return;
    }

    if (!gameState.map.nodeTypes || Object.keys(gameState.map.nodeTypes).length === 0) {
        console.error('[渲染地图] 错误:没有节点类型数据!');
        // 如果没节点类型,生成新地图
        generateMap();
        return;
    }

    const floor = gameState.map.floor;
    const nodesContainer = document.getElementById('map-nodes');
    nodesContainer.innerHTML = '';

    // 更新地图头部信息
    document.getElementById('map-player-hp').textContent = `❤️ ${gameState.player.hp}/${gameState.player.maxHp}`;
    document.getElementById('map-player-gold').textContent = `💰 ${gameState.player.gold}`;
    document.getElementById('map-floor').textContent = `第 ${floor} 层`;

    const rows = 4;
    const nodesPerRow = 4;

    // 清空节点数组,重新构建
    gameState.map.nodes = [];

    // 检查每行是否已经有完成的节点
    const rowHasCompleted = new Set();
    gameState.map.completedNodes.forEach(nodeId => {
        const [row] = nodeId.split('-').map(Number);
        rowHasCompleted.add(row);
    });

    const paths = gameState.map.paths || [];

    for (let row = 0; row < rows; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'map-row';

        const rowNodes = [];
        for (let col = 0; col < nodesPerRow; col++) {
            let type;
            if (row === rows - 1) {
                type = 'boss';
            } else {
                // 使用保存的节点类型
                const nodeId = `${row}-${col}`;
                type = gameState.map.nodeTypes[nodeId] || 'battle'; // 默认战斗
            }

            const nodeId = `${row}-${col}`;
            const node = { id: nodeId, type, row, col };
            rowNodes.push(node);
            gameState.map.nodes.push(node);

            const nodeEl = document.createElement('div');
            nodeEl.className = `map-node ${type}`;
            nodeEl.dataset.nodeId = nodeId;

            const icons = {
                battle: '⚔️',
                shop: '🏪',
                rest: '🔥',
                event: '❓',
                boss: '👑',
                elite: '⚡'
            };

            nodeEl.innerHTML = `<span>${icons[type]}</span>`;

            // 检查节点状态
            let isOnAnyPath = false;

            for (let pIndex = 0; pIndex < paths.length; pIndex++) {
                const path = paths[pIndex];
                const pathIndex = path.findIndex(p => p.row === row && p.col === col);
                if (pathIndex !== -1) {
                    isOnAnyPath = true;
                    break;
                }
            }

            if (gameState.map.completedNodes.has(nodeId)) {
                nodeEl.classList.add('completed');
            } else if (rowHasCompleted.has(row) && row < rows - 1) {
                // 只有非 Boss 行才检查"该行已完成则锁定其他节点"
                nodeEl.classList.add('locked');
            } else if (row === 0 && isOnAnyPath) {
                nodeEl.classList.add('available');
            } else if (row === rows - 1 && isOnAnyPath) {
                // Boss 行特殊处理:只要前一行的任意节点完成,Boss 节点就可用
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
            } else if (isOnAnyPath && row > 0) {
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
                nodeEl.classList.add('locked');
            }

            nodeEl.addEventListener('click', () => enterNode(node));
            rowDiv.appendChild(nodeEl);
        }

        nodesContainer.appendChild(rowDiv);
    }

    // 生成路径连线(延迟执行,确保元素已渲染)
    setTimeout(() => {
        generatePathLines(nodesContainer, gameState.map.paths);
    }, 100);

    updateMapUI();
}

function generateMap() {
    const floor = gameState.map.floor;
    const nodesContainer = document.getElementById('map-nodes');
    nodesContainer.innerHTML = '';

    // 更新地图头部信息
    document.getElementById('map-player-hp').textContent = `❤️ ${gameState.player.hp}/${gameState.player.maxHp}`;
    document.getElementById('map-player-gold').textContent = `💰 ${gameState.player.gold}`;
    
    // 楼层显示（无尽模式显示实际层数）
    if (gameState.mode === 'endless') {
        document.getElementById('map-floor').textContent = `🌀 无尽地牢 · 第 ${gameState.endlessFloor} 层 (地图 ${floor})`;
    } else {
        document.getElementById('map-floor').textContent = `第 ${floor} 层`;
    }

    // 生成节点类型(使用分层配置)
    const nodeTypes = getFloorNodeTypes(floor);
    const rows = 4;  // 4 行:3 行普通 + 1 行 Boss
    const nodesPerRow = 4;

    gameState.map.nodes = [];

    // 先检查每行是否已经有完成的节点
    const rowHasCompleted = new Set();
    gameState.map.completedNodes.forEach(nodeId => {
        const [row] = nodeId.split('-').map(Number);
        rowHasCompleted.add(row);
    });

    // 如果当前层还没有路径,生成多条新路径;否则使用保存的路径
    let paths = gameState.map.paths;
    if (!paths || paths.length === 0) {
        // 生成可达路径系统,确保所有节点都可达
        paths = generateReachablePaths(rows, nodesPerRow);
        gameState.map.paths = paths;
        // 为了兼容旧代码,保留 path 字段
        gameState.map.path = paths[0];
    }

    // 如果还没有保存节点类型,生成并保存(使用分层配置)
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
                // 使用保存的节点类型,如果没有则生成新的
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

            // 更新图标映射(添加精英)
            const icons = {
                battle: '⚔️',
                shop: '🏪',
                rest: '🔥',
                event: '❓',
                boss: '👑',
                elite: '⚡'
            };

            nodeEl.innerHTML = `<span>${icons[type]}</span>`;

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
            } else if (rowHasCompleted.has(row) && row < rows - 1) {
                // 只有非 Boss 行才检查"该行已完成则锁定其他节点"
                nodeEl.classList.add('locked');
            } else if (row === 0 && isOnAnyPath) {
                // 第一行可达的节点默认可用
                nodeEl.classList.add('available');
            } else if (row === rows - 1 && isOnAnyPath) {
                // Boss 行特殊处理:只要前一行的任意节点完成,Boss 节点就可用
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
            } else if (isOnAnyPath && row > 0) {
                // 第 1 行及以后的可达节点,检查是否有任何一个前驱节点已完成
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

    // 生成随机路径的连线(延迟执行,确保元素已渲染)
    setTimeout(() => {
        generatePathLines(nodesContainer, paths);
    }, 100);
}

// 新增:根据楼层获取节点类型配置
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

    // 确保总数为 12,调整战斗数量
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

// 解锁下一行节点
function unlockNextRow(nextRow) {
    console.log(`[Unlock] Attempting to unlock nodes for row ${nextRow}`);
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

// 新增:获取节点标签
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

// 生成可达路径系统:确保所有节点都至少有一条路径可以到达 BOSS
// 采用反向构建法:从 BOSS 向上回溯,确定哪些节点可达
// 优化:增加路径密度,为多个起始点生成多条路径
function generateReachablePaths(rows, nodesPerRow) {
    const paths = [];
    const reachableNodes = new Set(); // 记录所有可达节点

    // 步骤 1:从下往上构建可达性图
    // 第 4 行(BOSS 行)所有节点都可达
    for (let col = 0; col < nodesPerRow; col++) {
        reachableNodes.add(`${rows - 1}-${col}`);
    }

    // 从下往上逐行检查,如果某行某列的节点能到达下一行的可达节点,则它也可达
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

            // 如果能到达下一行的可达节点,则这个节点也可达
            if (canReachNext.length > 0) {
                reachableNodes.add(`${row}-${col}`);
            }
        }
    }

    // 步骤 2:增加路径密度 - 为多个起始点生成多条路径
    // 不仅为首行节点生成路径,还为中间行的多个节点生成路径

    // 2.1 为首行的每个可达节点生成 1-2 条路径
    for (let startCol = 0; startCol < nodesPerRow; startCol++) {
        if (!reachableNodes.has(`0-${startCol}`)) continue;

        // 为每个首行节点生成 1-2 条路径(增加随机性)
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

    // 2.2 为第二行的多个可达节点生成额外路径(增加路径密度)
    for (let startCol = 0; startCol < nodesPerRow; startCol++) {
        if (!reachableNodes.has(`1-${startCol}`)) continue;

        // 为第二行的部分节点生成额外路径
        if (randomInt(0, 1) === 0) continue; // 50% 概率跳过,避免路径过多

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

    // 调试:检查 Boss 行节点是否在路径中
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

    // 统一使用灰色,不区分路径颜色
    const strokeColor = '#888';

    // 遍历所有路径,为每条路径画线
    paths.forEach((path) => {
        // 遍历路径,为每两个相邻节点画线
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
        // 如果节点不可用,显示提示
        if (!nodeEl.classList.contains('available')) {
            console.log('[enterNode] Showing floating text: "请先完成上面的关卡!"');
            showFloatingText('请先完成上面的关卡!', document.querySelector('.map-nodes'), '#e74c3c');
        }
        return;
    }

    console.log('[enterNode] Proceeding with node entry...');

    // 只记录当前节点
    gameState.map.currentNode = node;

    // 根据节点类型决定是否立即标记为完成
    const isCombatNode = node.type === 'battle' || node.type === 'elite' || node.type === 'boss';

    if (!isCombatNode) {
        // 非战斗节点(商店、休息处、事件)立即标记为完成
        gameState.map.completedNodes.add(node.id);
        nodeEl.classList.add('completed');
        nodeEl.classList.remove('available');

        // 解锁下一行
        const [row] = node.id.split('-').map(Number);
        const nextRow = row + 1;
        if (nextRow < 4) {
            unlockNextRow(nextRow);
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

    // 计算难度系数(每层增加 20% 难度)
    const floorMultiplier = 1 + (floor - 1) * 0.2;
    // 难度选择系数
    const diff = gameState.difficulty;
    const gameDifficultyMultiplier = diff === 'easy' ? 0.8 : diff === 'hard' ? 1.3 : 1.0;
    const difficultyMultiplier = floorMultiplier * gameDifficultyMultiplier;

    if (isBoss) {
        // Boss 战开始,启动持续震动
        startBossShake();
        // Boss 额外增加 30% 难度
        const bossMultiplier = difficultyMultiplier * 1.3;

        if (floor === 1) enemyType = 'boss_goblin_king';
        else if (floor === 2) enemyType = 'boss_lich';
        else if (floor === 3) enemyType = 'boss_dragon';
        else if (floor === 4) enemyType = 'boss_lich_king';
        else enemyType = 'boss_ancient_dragon_evil';

        // 创建带难度调整的 Boss
        const baseEnemy = ENEMY_DB[enemyType];
        // P2: A11 Boss 狂暴 - 仅影响 HP,不影响伤害
        const bossHpMultiplier = 1.3 * getBossHpMultiplier();
        const bossDamageMultiplier = difficultyMultiplier; // 伤害仅受楼层/难度影响
        gameState.battle.enemy = {
            type: enemyType,
            name: baseEnemy.name,
            currentHp: Math.floor(baseEnemy.hp * bossHpMultiplier * getEndlessMultiplier()),
            maxHp: Math.floor(baseEnemy.hp * bossHpMultiplier * getEndlessMultiplier()),
            icon: baseEnemy.icon,
            pattern: baseEnemy.pattern,
            damage: Math.floor(baseEnemy.damage * bossDamageMultiplier * getEndlessMultiplier()),
            difficulty: floor,
            phase2: false,
            isBoss: true,
            block: 0,
            nextAction: null,
            weak: 0,
            vulnerable: 0,
            tags: baseEnemy.tags || []
        };
    } else {
        // 根据层数选择敌人
        const enemyPool = floor === 1 ? ['goblin', 'slime', 'skeleton'] :
                         floor === 2 ? ['orc', 'dark_mage', 'werewolf'] :
                         floor === 3 ? ['demon', 'dragon', 'spider', 'vampire'] :
                         floor === 4 ? ['gargoyle', 'phoenix', 'witch_knight', 'demon'] :
                         ['dragon', 'vampire', 'witch_knight', 'spider'];
        enemyType = enemyPool[randomInt(0, enemyPool.length - 1)];

        // 创建带难度调整的敌人
        const baseEnemy = ENEMY_DB[enemyType];
        gameState.battle.enemy = {
            type: enemyType,
            name: baseEnemy.name,
            currentHp: Math.floor(baseEnemy.hp * difficultyMultiplier * getEndlessMultiplier()),
            maxHp: Math.floor(baseEnemy.hp * difficultyMultiplier * getEndlessMultiplier()),
            icon: baseEnemy.icon,
            pattern: baseEnemy.pattern,
            damage: Math.floor(baseEnemy.damage * difficultyMultiplier * getEndlessMultiplier()),
            difficulty: floor,
            phase2: false,
            block: 0,
            nextAction: null,
            weak: 0,
            vulnerable: 0,
            tags: baseEnemy.tags || []
        };
    }

    // 初始化战斗状态(始终重置,startBattle 仅用于新战斗)
    gameState.battle.hand = [];
    gameState.battle.drawPile = shuffle([...gameState.player.deck]);
    gameState.battle.discardPile = [];
    gameState.battle.exhaustPile = [];
    gameState.battle.turn = 1;
    gameState.battle.firstAttack = true;
    gameState.battle.noDraw = false;
    gameState.battle.ornamentalFanCount = 0;
    gameState.battle.berserkTurns = 0;
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

    // 🎰 赌博筹码效果 - 战斗开始时弃牌重抽
    if (gameState.player.relics.includes('gambling_chip')) {
        if (gameState.battle.hand.length > 0) {
            const discardCount = parseInt(prompt('🎰 赌博筹码!\n\n你当前有 ' + gameState.battle.hand.length + ' 张手牌。\n\n想要丢弃几张牌并抽取等量牌?\n(输入 0-' + gameState.battle.hand.length + ')', '0')) || 0;
            const count = Math.max(0, Math.min(discardCount, gameState.battle.hand.length));
            if (count > 0) {
                // 弃掉前 count 张手牌
                for (let i = 0; i < count; i++) {
                    gameState.battle.discardPile.push(gameState.battle.hand.shift());
                }
                // 重新抽牌
                drawCards(count);
                addCombatLog('info', '🎰 赌博筹码:丢弃 ' + count + ' 张牌,抽取 ' + count + ' 张牌');
            }
        }
    }

    // P2: 新三职业战斗开始重置
    gameState.battle.precisionCount = 0;
    gameState.battle.traps = [];
    gameState.battle.soulShards = 0;
    gameState.battle.totalSacrifice = 0;
    gameState.battle.sacrificedThisTurn = false;
    gameState.battle.damageHalve = false;
    gameState.battle.shardDouble = false;
    gameState.battle.summons = [];
    gameState.battle.empowerBuff = 0;
    gameState.battle.empowerTurns = 0;
    gameState.battle.firstPrecisionCard = true;
    gameState.battle.nextAttackDouble = false;
    gameState.battle.extraDrawNext = 0;
    gameState.battle.extraEnergyNext = 0;

    // 关键词协同战斗重置
    gameState.battle.comboCardsPlayedThisTurn = 0;
    gameState.battle.comboDamageBonus = 0;
    gameState.battle.shadowRitualActive = false;
    gameState.battle.poisonDiscount = 0;
    gameState.battle.totalSacrificeThisTurn = 0;
    gameState.battle.summonSynergyBuff = 0;

    // 陷阱箱遗物:精英战斗额外陷阱
    if (gameState.player.relics.includes('trap_box') && isBoss) {
        gameState.battle.traps.push({ damage: 8, triggerNext: true });
        addCombatLog('info', '💣 陷阱箱:额外布置 1 个陷阱');
    }

    showScreen('battle-screen');
    // 清空战斗日志
    const logList = document.getElementById('combat-log-list');
    if (logList) logList.innerHTML = '';
    // 重置敌人精灵动画标记,确保每场战斗重新登场
    const spriteEl = document.querySelector('.enemy-sprite');
    if (spriteEl) spriteEl.dataset.entered = '';

    // P2: 战斗 Buff 随机事件
    rollBattleBuff();

    // P1: Boss 背景叙事
    if (isBoss) {
        const lore = BOSS_LORE[gameState.battle.enemy.type];
        if (lore && lore.intro) {
            addCombatLog('info', '📖 ' + lore.intro);
        }
    }

    // 重置 Boss 台词追踪
    bossQuotesTriggered = {};

    updateBattleUI();
    updatePotionBar();
    startTurn();
}

// 新增:精英战斗
function startEliteBattle() {
    const floor = gameState.map.floor;
    let enemyType;

    // 精英敌人难度系数(比普通敌人高 40%)
    const eliteMultiplier = 1.4 + (floor - 1) * 0.2;

    // 根据层数选择精英敌人
    if (floor === 1) {
        // 第一层没有精英(配置为 0)
        startBattle(false);
        return;
    } else if (floor === 2) {
        enemyType = randomInt(0, 1) === 0 ? 'elite_orc' : 'elite_spider';
    } else if (floor === 3) {
        enemyType = randomInt(0, 1) === 0 ? 'elite_demon' : 'elite_dragon';
    } else if (floor === 4) {
        enemyType = randomInt(0, 1) === 0 ? 'elite_vampire' : 'elite_skeleton_warlord';
    } else {
        // 第五层:最强精英
        enemyType = randomInt(0, 2) === 0 ? 'elite_phoenix' : randomInt(0, 1) === 0 ? 'elite_dragon' : 'elite_demon';
    }

    const baseEnemy = ENEMY_DB[enemyType];

    // 创建带难度调整的精英敌人
    // P2: A8 精英强化
    const hpMult = eliteMultiplier * getEliteHpMultiplier();
    gameState.battle.enemy = {
        type: enemyType,
        name: baseEnemy.name,
        currentHp: Math.floor(baseEnemy.hp * hpMult * getEndlessMultiplier()),
        maxHp: Math.floor(baseEnemy.hp * hpMult * getEndlessMultiplier()),
        icon: baseEnemy.icon,
        pattern: baseEnemy.pattern,
        damage: Math.floor(baseEnemy.damage * eliteMultiplier * getEndlessMultiplier()),
        difficulty: floor,
        isElite: true,
        block: 0,
        nextAction: null,
        weak: 0,
        vulnerable: 0,
        tags: baseEnemy.tags || []
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
    gameState.battle.berserkTurns = 0;

    // P2: 关键词系统初始化
    gameState.battle.comboCount = 0;
    gameState.battle.lastKeyword = null;
    gameState.battle.enemyPoison = 0;
    gameState.battle.enemyPoisonTurns = 0;
    gameState.battle.enemyPoisonLabel = '毒';
    gameState.battle.rageTurns = 0;
    gameState.battle.rageStrength = 0;
    // P2: A1 减益持久 - 额外持续 1 回合(即每 2 回合才衰减)
    gameState.battle.debuffExtraTurns = ascensionActive('a1') ? 1 : 0;
    gameState.battle.debuffTick = 0;

    // P2: 新三职业字段初始化
    gameState.battle.precisionCount = 0;
    gameState.battle.traps = [];
    gameState.battle.soulShards = 0;
    gameState.battle.totalSacrifice = 0;
    gameState.battle.sacrificedThisTurn = false;
    gameState.battle.damageHalve = false;
    gameState.battle.shardDouble = false;
    gameState.battle.summons = [];
    gameState.battle.empowerBuff = 0;
    gameState.battle.empowerTurns = 0;
    gameState.battle.firstPrecisionCard = true;
    gameState.battle.nextAttackDouble = false;
    gameState.battle.extraDrawNext = 0;
    gameState.battle.extraEnergyNext = 0;

    // 关键词协同战斗重置
    gameState.battle.comboCardsPlayedThisTurn = 0;
    gameState.battle.comboDamageBonus = 0;
    gameState.battle.shadowRitualActive = false;
    gameState.battle.poisonDiscount = 0;
    gameState.battle.totalSacrificeThisTurn = 0;
    gameState.battle.summonSynergyBuff = 0;

    // P2: Ascension - a7 诅咒起手(只加到当战抽牌堆,不污染永久牌库)
    if (ascensionActive('a7')) {
        gameState.battle.drawPile.push('curse_card');
        addCombatLog('info', '💀 Ascension A7:获得诅咒牌');
    }

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

    // 🎰 赌博筹码效果 - 战斗开始时弃牌重抽
    if (gameState.player.relics.includes('gambling_chip')) {
        if (gameState.battle.hand.length > 0) {
            const discardCount = parseInt(prompt('🎰 赌博筹码!\n\n你当前有 ' + gameState.battle.hand.length + ' 张手牌。\n\n想要丢弃几张牌并抽取等量牌?\n(输入 0-' + gameState.battle.hand.length + ')', '0')) || 0;
            const count = Math.max(0, Math.min(discardCount, gameState.battle.hand.length));
            if (count > 0) {
                for (let i = 0; i < count; i++) {
                    gameState.battle.discardPile.push(gameState.battle.hand.shift());
                }
                drawCards(count);
                addCombatLog('info', '🎰 赌博筹码:丢弃 ' + count + ' 张牌,抽取 ' + count + ' 张牌');
            }
        }
    }

    showScreen('battle-screen');
    // 清空战斗日志
    const logList2 = document.getElementById('combat-log-list');
    if (logList2) logList2.innerHTML = '';
    updateBattleUI();
    updatePotionBar();
    startTurn();
}function updateBattleUI() {
    const enemy = gameState.battle.enemy;
    const player = gameState.player;

    // 清理残留的进度条元素
    const staleProgress = document.getElementById('battle-floor-progress');
    if (staleProgress) staleProgress.remove();

    // 更新敌人显示(使用 SVG 图像)
    const enemySpriteEl = document.querySelector('.enemy-sprite');
    const enemyType = enemy.type;
    const cssClass = ENEMY_CSS_CLASSES[enemyType] || enemyType;

    // 设置 SVG 图像
    enemySpriteEl.innerHTML = enemySpriteHTML(enemyType, enemy);
    enemySpriteEl.className = `enemy-sprite ${cssClass}`;
    enemySpriteEl.classList.remove('dead');

    // 如果是新进入战斗,触发登场动画
    if (!enemySpriteEl.dataset.entered) {
        enemySpriteEl.dataset.entered = 'true';
        setTimeout(() => {
            enemySpriteEl.classList.add('enemy-enter');
        }, 100);
    }

    document.querySelector('.enemy-name').textContent = enemy.name;
    document.getElementById('enemy-hp').textContent = `${enemy.currentHp}/${enemy.maxHp}`;
    document.getElementById('enemy-hp-fill').style.width = `${(enemy.currentHp / enemy.maxHp) * 100}%`;

    // 敌人意图(增强版:颜色 + 图标)
    const intentEl = document.getElementById('enemy-intent');
    if (intentEl && enemy.nextAction) {
        const act = enemy.nextAction;
        let iicon = '', ivalue = '', icolor = '#888';
        if (act.type === 'attack') { let dmg = act.value; if (enemy.weak > 0) dmg = Math.floor(dmg * 0.75); iicon = '\u2694\ufe0f'; ivalue = dmg; icolor = '#e74c3c'; }
        else if (act.type === 'heavy_attack') { iicon = '\ud83d\udca5'; ivalue = act.value; icolor = '#c0392b'; }
        else if (act.type === 'defend') { iicon = '\ud83d\udee1\ufe0f'; ivalue = '+' + act.value; icolor = '#3498db'; }
        else if (act.type === 'buff') { iicon = '\ud83d\udcaa'; ivalue = '+' + act.value + ' ATK'; icolor = '#f39c12'; }
        else if (act.type === 'summon') { iicon = '\ud83d\udce2'; ivalue = (act.label || '召唤 x' + act.value); icolor = '#9b59b6'; }
        else if (act.type === 'special') { iicon = '\ud83c\udf00'; ivalue = (act.label || '特殊技能'); icolor = '#1abc9c'; }
        else { iicon = '\u2753'; ivalue = '未知'; }
        intentEl.innerHTML = '<span class="intent-icon">' + iicon + '</span><span class="intent-value">' + ivalue + '</span>';
        intentEl.style.color = icolor;
    }

    // 更新玩家显示
    document.getElementById('player-hp').textContent = `${player.hp}/${player.maxHp}`;
    document.getElementById('player-block').textContent = player.block;
    document.getElementById('player-energy').textContent = `${player.energy}/${player.maxEnergy}`;
    // 显示职业名（对齐原型 .battle-top .name）
    const battleClassEl = document.getElementById('battle-class');
    if (battleClassEl) {
        const classData = CLASSES[player.class];
        battleClassEl.textContent = classData ? classData.name : '';
    }
    document.getElementById('battle-floor').textContent = `第 ${gameState.map.floor} 层`;

    // P3: 回合计数器实时更新
    const turnEl = document.getElementById('battle-turn');
    if (turnEl) turnEl.textContent = `回合: ${gameState.battle.turn}`;

    // 更新职业图标(始终以玩家当前所选职业为准)
    document.getElementById('player-avatar').innerHTML = playerAvatarHTML(player.class);

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

    // P2: A9 药水失效
    if (checkPotionFailure()) {
        addCombatLog('info', '💊 药水失效了!');
        showFloatingText('失效!', document.querySelector('.player-area'), '#95a5a6');
        gameState.player.potions.splice(index, 1);
        updateBattleUI();
        return;
    }

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
    // P3: 新型药水效果
    if (effect.type === 'crazy') {
        gameState.player.energy *= 2;
        gameState.battle.nextEnergyPenalty = true;
        showFloatingText('能量翻倍!下回合 -1⚡', document.querySelector('.player-area'), '#9b59b6');
    } else if (effect.type === 'curse') {
        damageEnemy(15);
        gameState.player.hp = Math.max(1, gameState.player.hp - 10);
        showFloatingText('💥15 / ☠️-10', document.querySelector('.enemy'), '#e74c3c');
    } else if (effect.type === 'copy') {
        if (gameState.battle.hand.length > 0) {
            const copyId = gameState.battle.hand[0];
            gameState.battle.hand.push(copyId);
            showFloatingText('📋 复制: ' + CARD_DB[copyId].name, document.querySelector('.player-area'), '#3498db');
            renderHand();
        } else {
            showFloatingText('手牌为空!', document.querySelector('.player-area'), '#888');
        }
    } else if (effect.type === 'universal') {
        const randomEffects = ['crazy', 'curse', 'berserk', 'heal'];
        const pick = randomEffects[randomInt(0, randomEffects.length - 1)];
        if (pick === 'crazy') { gameState.player.energy *= 2; gameState.battle.nextEnergyPenalty = true; }
        else if (pick === 'curse') { damageEnemy(15); gameState.player.hp = Math.max(1, gameState.player.hp - 10); }
        else if (pick === 'berserk') { gameState.player.stats.strength += 5; }
        else { healPlayer(25); }
        showFloatingText('❓ 万能效果: ' + pick, document.querySelector('.player-area'), '#1abc9c');
    } else if (effect.type === 'berserk') {
        gameState.player.stats.strength += 5;
        gameState.battle.berserkTurns = 3; // P3: 狂暴持续 3 回合
        // P2: 同步 rageTurns for keyword damage bonus
        gameState.battle.rageTurns = 3;
        gameState.battle.rageStrength = 5;
        showFloatingText('+5💪 狂暴 3 回合', document.querySelector('.player-area'), '#e74c3c');
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
    // P2: A3 能量削减
    player.energy = getPlayerEnergy();

    // P3: 疯狂药水下回合惩罚
    if (gameState.battle.nextEnergyPenalty) {
        player.energy = Math.max(1, player.energy - 1);
        gameState.battle.nextEnergyPenalty = false;
    }

    // 清除格挡
    player.block = 0;

    // 敌人格挡每回合清除
    if (gameState.battle.enemy) {
        gameState.battle.enemy.block = 0;
    }

    // P2: 战斗 Buff/诅咒回合开始时效果
    applyBuffCurseTurnStart();

    // 减少状态回合数
    // P2: A1 减益持久 - debuffExtraTurns 表示额外持续回合,每 (1+extra) 回合才减少一次
    gameState.battle.debuffTick = (gameState.battle.debuffTick || 0) + 1;
    const debuffInterval = 1 + (gameState.battle.debuffExtraTurns || 0);
    if (gameState.battle.debuffTick >= debuffInterval) {
        gameState.battle.debuffTick = 0;
        if (player.stats.weak > 0) player.stats.weak--;
        if (player.stats.vulnerable > 0) player.stats.vulnerable--;
        if (gameState.battle.enemy.weak > 0) gameState.battle.enemy.weak--;
        if (gameState.battle.enemy.vulnerable > 0) gameState.battle.enemy.vulnerable--;
    }

    // P2: 狂暴药水回合衰减(rageTurns 用于 P2 狂暴药水)
    if (gameState.battle.rageTurns > 0) {
        gameState.battle.rageTurns--;
        if (gameState.battle.rageTurns === 0) {
            player.stats.strength = Math.max(0, player.stats.strength - gameState.battle.rageStrength);
            gameState.battle.rageStrength = 0;
            showFloatingText('狂暴效果结束', document.querySelector('.player-area'), '#888');
            addCombatLog('info', '😤 狂暴药水效果结束,-力量');
        }
    }

    // 重置抽牌限制
    gameState.battle.noDraw = false;

    // 重置减费效果(每回合清零)
    gameState.battle.costDiscount = 0;

    // ===== 关键词协同:回合开始重置 =====
    gameState.battle.comboCardsPlayedThisTurn = 0;
    gameState.battle.comboDamageBonus = 0;
    gameState.battle.shadowRitualActive = false;
    gameState.battle.poisonDiscount = 0;

    // ☠️ 剧毒领域:敌人3+层毒时，本回合毒牌费用-1
    if (gameState.battle.enemyPoison >= 3) {
        gameState.battle.poisonDiscount = 1;
        addCombatLog('synergy', '☠️ 剧毒领域激活！本回合毒牌费用 -1');
    }
    gameState.battle.totalSacrificeThisTurn = 0;

    // ✨ 圣光护佑:手牌中神圣牌≥2张，回合开始恢复3HP
    const handHolyCount = gameState.battle.hand.filter(cid => {
        const cd = CARD_DB[cid];
        return cd && cd.keywords && cd.keywords.includes('holy');
    }).length;
    if (handHolyCount >= 2) {
        gameState.player.hp = Math.min(gameState.player.hp + 3, gameState.player.maxHp);
        showFloatingText('✨ 圣光护佑 +3', document.querySelector('.player-area'), '#f1c40f');
        addCombatLog('synergy', '✨ 圣光护佑！手牌神圣密度触发，恢复 3 HP');
    }

    // 📚 亡灵共鸣:场上2+召唤物时，召唤物伤害+2
    if (gameState.battle.summons.length >= 2) {
        gameState.battle.summonSynergyBuff = 2;
    } else {
        gameState.battle.summonSynergyBuff = 0;
    }

    // ===== P2: 关键词回合开始处理 =====

    // 🔄 连环珠 - 每回合额外 +1 连击计数
    if (player.relics.includes('bead_of_power')) {
        gameState.battle.comboCount++;
        addCombatLog('info', '📿 连环珠:连击 +1 (当前: ' + gameState.battle.comboCount + ')');
    }

    // ☠️ 毒/燃烧每回合伤害
    if (gameState.battle.enemyPoison > 0 && gameState.battle.enemyPoisonTurns > 0) {
        const poisonDmg = gameState.battle.enemyPoison;
        damageEnemy(poisonDmg);
        showFloatingText('☠️' + poisonDmg + ' ' + gameState.battle.enemyPoisonLabel, document.querySelector('.enemy'), '#2ecc71');
        addCombatLog('info', '☠️ ' + gameState.battle.enemyPoisonLabel + ':敌人受到 ' + poisonDmg + ' 点' + gameState.battle.enemyPoisonLabel + '伤害');
        gameState.battle.enemyPoisonTurns--;
        if (gameState.battle.enemyPoisonTurns <= 0) {
            gameState.battle.enemyPoison = 0;
            addCombatLog('info', '☠️ 敌人' + gameState.battle.enemyPoisonLabel + '效果结束');
        }
    }

    // 处理回合开始效果
    processStartOfTurnEffects();

    // ===== P2: 游侠回合开始 =====
    // 触发陷阱
    if (gameState.battle.traps.length > 0) {
        gameState.battle.traps.forEach(trap => {
            if (trap.triggerNext) {
                damageEnemy(trap.damage);
                showFloatingText('⚠️' + trap.damage, document.querySelector('.enemy'), '#e67e22');
                addCombatLog('info', '⚠️ 陷阱触发!敌人受到 ' + trap.damage + ' 点伤害');
            }
        });
        // 清理已触发的陷阱
        gameState.battle.traps = gameState.battle.traps.filter(t => !t.triggerNext);
    }
    // 猎犬项圈:精准 ≥ 2 时敌人虚弱
    if (player.relics.includes('hound_collar') && gameState.battle.precisionCount >= 2) {
        gameState.battle.enemy.weak = (gameState.battle.enemy.weak || 0) + 1;
        addCombatLog('info', '🐺 猎犬项圈:敌人获得 1 层虚弱');
    }
    // 重置狙击镜标记
    gameState.battle.firstPrecisionCard = true;

    // ===== P2: 死灵法师回合开始 =====
    // 白骨戒指:碎片 ≥ 5 时恢复 3 HP
    if (player.relics.includes('bone_ring') && gameState.battle.soulShards >= 5) {
        gameState.player.hp = Math.min(gameState.player.hp + 3, gameState.player.maxHp);
        addCombatLog('info', '💀 白骨戒指:恢复 3 点生命');
    }
    // 重置本回合标记
    gameState.battle.sacrificedThisTurn = false;
    gameState.battle.damageHalve = false;
    gameState.battle.shardDouble = false;

    // ===== P2: 召唤师回合开始 =====
    // 强化召唤衰减
    if (gameState.battle.empowerTurns > 0) {
        gameState.battle.empowerTurns--;
        if (gameState.battle.empowerTurns <= 0) {
            gameState.battle.empowerBuff = 0;
            addCombatLog('info', '⬆️ 强化召唤效果结束');
        }
    }
    // 召唤物自动攻击
    if (gameState.battle.summons.length > 0) {
        const summonsCopy = [...gameState.battle.summons];
        summonsCopy.forEach(summon => {
            if (summon.turnsLeft > 0) {
                let dmg = summon.damage + gameState.battle.empowerBuff + (gameState.battle.summonSynergyBuff || 0);
                // 元素核心:输出类 +5
                if (player.relics.includes('element_core') && (summon.type === 'output' || summon.type === 'aoe')) {
                    dmg += 5;
                }
                if (summon.aoe) {
                    addCombatLog('info', '⚡ ' + summon.name + ' 闪电攻击!');
                } else {
                    addCombatLog('info', summon.icon + ' ' + summon.name + ' 攻击,造成 ' + dmg + ' 点伤害');
                }
                damageEnemy(dmg);
                showFloatingText(summon.icon + dmg, document.querySelector('.enemy'), '#3498db');

                // P2: 🐺 狼王图腾 - 影狼类召唤物额外施加 1 层虚弱
                if (player.relics.includes('wolf_totem') && summon.id === 'wolf') {
                    battle.enemy.weak = (battle.enemy.weak || 0) + 1;
                    addCombatLog('info', '🐺 狼王图腾:敌人获得 1 层虚弱');
                }

                summon.turnsLeft--;
                if (summon.turnsLeft <= 0) {
                    addCombatLog('info', summon.icon + ' ' + summon.name + ' 消散了');
                    // 凤凰死亡恢复
                    if (summon.deathHeal) {
                        gameState.player.hp = Math.min(gameState.player.hp + summon.deathHeal, gameState.player.maxHp);
                        addCombatLog('info', '🦅 凤凰复苏:恢复 ' + summon.deathHeal + ' 点生命');
                    }
                    // 凤凰羽:额外恢复 5 HP
                    if (player.relics.includes('phoenix_feather') && gameState.battle.phoenixFeatherUses < 2) {
                        gameState.battle.phoenixFeatherUses++;
                        gameState.player.hp = Math.min(gameState.player.hp + 5, gameState.player.maxHp);
                        addCombatLog('info', '🦅 凤凰羽:额外恢复 5 点生命');
                    }
                }
            }
        });
        // 移除消散的召唤物
        gameState.battle.summons = gameState.battle.summons.filter(s => s.turnsLeft > 0);
        // 治疗花
        gameState.battle.summons.filter(s => s.healPerTurn).forEach(summon => {
            gameState.player.hp = Math.min(gameState.player.hp + summon.healPerTurn, gameState.player.maxHp);
            addCombatLog('info', '🌸 ' + summon.name + ' 恢复了 ' + summon.healPerTurn + ' 点生命');
        });
    }

    // P2: A10 抽牌减少
    let drawCount = Math.max(3, 5 - getDrawPenalty());
    if (player.relics.includes('ring_of_the_snake') && gameState.battle.turn === 1) {
        drawCount += 2;
    }
    // P2: 下回合额外抽牌
    if (gameState.battle.extraDrawNext > 0) {
        drawCount += gameState.battle.extraDrawNext;
        addCombatLog('info', '📖 额外抽牌 +' + gameState.battle.extraDrawNext);
        gameState.battle.extraDrawNext = 0;
    }
    drawCards(drawCount);

    // P2: 下回合额外能量
    if (gameState.battle.extraEnergyNext > 0) {
        player.energy += gameState.battle.extraEnergyNext;
        addCombatLog('info', '⚡ 额外能量 +' + gameState.battle.extraEnergyNext);
        gameState.battle.extraEnergyNext = 0;
    }

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
    const turn = gameState.battle.turn;

    if (pattern === 'simple') {
        enemy.nextAction = { type: 'attack', value: enemy.damage };
    } else if (pattern === 'defensive') {
        enemy.nextAction = turn % 2 === 1 ? { type: 'attack', value: enemy.damage } : { type: 'defend', value: Math.floor(enemy.damage * 0.8) };
    } else if (pattern === 'aggressive') {
        enemy.nextAction = Math.random() < 0.7 ? { type: 'attack', value: enemy.damage } : { type: 'buff', value: 2 };
    } else if (pattern === 'caster') {
        enemy.nextAction = Math.random() < 0.6 ? { type: 'attack', value: enemy.damage } : { type: 'heavy_attack', value: Math.floor(enemy.damage * 1.5) };
    } else if (pattern === 'boss') {
        const floor = enemy.difficulty || gameState.map.floor;
        const phase2 = enemy.phase2 || enemy.currentHp < enemy.maxHp * 0.5;

        if (floor === 1) { // 哥布林王
            if (turn % 3 === 0) enemy.nextAction = phase2 ? { type: 'summon', value: 2, label: '召唤 x2' } : { type: 'summon', value: 1, label: '召唤 x1' };
            else enemy.nextAction = phase2 ? { type: 'heavy_attack', value: enemy.damage + 5 } : { type: 'attack', value: enemy.damage };
        } else if (floor === 2) { // 巫妖
            if (turn % 2 === 0) enemy.nextAction = phase2 ? { type: 'special', value: enemy.damage * 2, label: '灵魂爆炸' } : { type: 'special', value: 2, label: '灵魂吸取' };
            else enemy.nextAction = phase2 ? { type: 'heavy_attack', value: enemy.damage + 5 } : { type: 'attack', value: enemy.damage };
        } else if (floor === 3) { // 远古巨龙
            const cycle = turn % 4;
            if (cycle === 0) enemy.nextAction = { type: 'defend', value: phase2 ? 20 : 15 };
            else if (cycle === 1) enemy.nextAction = phase2 ? { type: 'heavy_attack', value: enemy.damage + 5, label: '火焰吐息' } : { type: 'heavy_attack', value: enemy.damage };
            else if (cycle === 2) enemy.nextAction = { type: 'special', value: phase2 ? 3 : 2, label: '冰霜吐息' };
            else enemy.nextAction = { type: 'attack', value: enemy.damage };
        } else if (floor === 4) { // 巫妖王
            const cycle = turn % 4;
            if (cycle === 0) enemy.nextAction = phase2 ? { type: 'summon', value: 3, label: '召唤 x2-3' } : { type: 'summon', value: 2, label: '召唤 x1-2' };
            else if (cycle === 1) enemy.nextAction = phase2 ? { type: 'heavy_attack', value: enemy.damage + 5 } : { type: 'attack', value: enemy.damage };
            else if (cycle === 2) enemy.nextAction = { type: 'attack', value: enemy.damage };
            else enemy.nextAction = phase2 ? { type: 'special', value: 5, label: '灵魂引爆' } : { type: 'attack', value: enemy.damage };
        } else if (floor === 5) { // 上古邪龙
            const cycle = turn % 4;
            if (cycle === 0) enemy.nextAction = phase2 ? { type: 'heavy_attack', value: enemy.damage + 3, label: '暗影吐息' } : { type: 'special', value: 1, label: '腐蚀低语' };
            else if (cycle === 1) enemy.nextAction = phase2 ? { type: 'heavy_attack', value: enemy.damage + 3 } : { type: 'attack', value: enemy.damage };
            else if (cycle === 2) enemy.nextAction = { type: 'special', value: phase2 ? 3 : 2, label: '暗影冲击' };
            else enemy.nextAction = phase2 ? { type: 'heavy_attack', value: enemy.damage + 3 } : { type: 'attack', value: enemy.damage };
        } else {
            enemy.nextAction = { type: 'attack', value: enemy.damage };
        }
    } else if (pattern === 'fast') {
        // 毒蜘蛛:每回合攻击 2 次
        enemy.nextAction = { type: 'attack', value: enemy.damage, doubleAttack: true };
    } else if (pattern === 'lifesteal') {
        // 吸血鬼:80% 吸血攻击 / 20% 汲取生命
        if (Math.random() < 0.8) {
            enemy.nextAction = { type: 'attack', value: enemy.damage, label: '吸血攻击' };
        } else {
            enemy.nextAction = { type: 'special', value: Math.ceil(enemy.damage * 0.5), label: '汲取生命' };
        }
    } else if (pattern === 'tank') {
        // 石像鬼:70% 防御 / 30% 攻击
        if (Math.random() < 0.7) {
            enemy.nextAction = { type: 'defend', value: Math.floor(enemy.damage * 0.8) };
        } else {
            enemy.nextAction = { type: 'attack', value: enemy.damage };
        }
    } else if (pattern === 'regen') {
        // 凤凰:60% 攻击 / 40% 恢复
        if (Math.random() < 0.6) {
            enemy.nextAction = { type: 'attack', value: enemy.damage };
        } else {
            const heal = Math.ceil(enemy.maxHp * 0.1);
            enemy.nextAction = { type: 'special', value: heal, label: '恢复 +' + heal };
        }
    } else if (pattern === 'balanced') {
        // 巫骑士:均衡轮换 ⚔️→🛡️→💪→⚔️
        const cycle = turn % 4;
        if (cycle === 0) enemy.nextAction = { type: 'attack', value: enemy.damage };
        else if (cycle === 1) enemy.nextAction = { type: 'defend', value: Math.floor(enemy.damage * 0.8) };
        else if (cycle === 2) enemy.nextAction = { type: 'buff', value: 2 };
        else enemy.nextAction = { type: 'attack', value: enemy.damage };
    } else {
        enemy.nextAction = { type: 'attack', value: enemy.damage };
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
        if (!cardData) {
            console.warn('[手牌] 未知卡牌:', cardId);
            return;
        }
        const cardEl = document.createElement('div');
        cardEl.className = `card ${cardData.type}`;

        // 添加延迟动画,让卡牌一张张出现
        cardEl.style.animationDelay = `${index * 0.05}s`;

        // 检查能量是否足够(考虑减费效果)
        const effectiveCost = Math.max(0, cardData.cost - (gameState.battle.costDiscount || 0));
        if (effectiveCost > gameState.player.energy) {
            cardEl.classList.add('unplayable');
            cardEl.style.opacity = '0.38';
            cardEl.style.borderColor = '#555';
        } else {
            cardEl.classList.add('energy-sufficient');
            cardEl.style.opacity = '1';
        }

        // 添加 data-desc 属性用于悬停提示
        cardEl.setAttribute('data-desc', cardData.desc);

        // 稀有度指示（纯色点，对齐原型 .card-rarity：每张卡均显示，
        // 基础卡无 rarity 字段时兜底为 common 显示灰白点，与原型逐卡表现一致）
        const rarityClass = cardData.rarity || 'common';
        const rarityBadge = `<div class="card-rarity ${rarityClass}"></div>`;

        cardEl.innerHTML = `
            ${rarityBadge}
            <div class="card-cost"><span>${cardData.cost}</span></div>
            <div class="card-icon">${cardIconHTML(cardId, cardData)}</div>
            <div class="card-name">${cardData.name}</div>
            <div class="card-desc">${cardData.desc}</div>
            <div class="card-type">${CARD_TYPE_LABEL[cardData.type] || ''}</div>
        `;

        cardEl.addEventListener('click', () => playCard(index));
        handContainer.appendChild(cardEl);
    });
}

function playCard(handIndex) {
    const cardId = gameState.battle.hand[handIndex];
    const cardData = CARD_DB[cardId];
    const player = gameState.player;

    // 计算实际费用(考虑减费效果)
    let actualCost = cardData.cost - (gameState.battle.costDiscount || 0);
    if (actualCost < 0) actualCost = 0;

    // 检查能量(用实际费用)
    if (actualCost > gameState.player.energy) {
        return;
    }

    // 消耗能量(P2: 熔岩核心 - 火焰牌费用 -1)
    let finalCost = actualCost;
    if (cardData.keywords && cardData.keywords.includes('fire') && player.relics.includes('lava_core')) {
        finalCost = Math.max(0, finalCost - 1);
    }
    // P2: 狙击镜 - 第一张精准牌费用 -1
    if (cardData.keywords && cardData.keywords.includes('precision') && gameState.battle.firstPrecisionCard && player.relics.includes('sniper_scope')) {
        finalCost = Math.max(0, finalCost - 1);
        gameState.battle.firstPrecisionCard = false;
    }
    // 关键词协同:剧毒领域 - 敌人3+层毒时毒牌费用-1
    if (cardData.keywords && cardData.keywords.includes('poison') && gameState.battle.poisonDiscount > 0) {
        finalCost = Math.max(0, finalCost - gameState.battle.poisonDiscount);
    }
    gameState.player.energy -= finalCost;

    // 从手牌移除
    gameState.battle.hand.splice(handIndex, 1);

    // 关键词协同检查（在移除后、效果执行前，统计剩余手牌关键词密度）
    const handAfter = gameState.battle.hand;
    const keywordCounts = {};
    handAfter.forEach(cid => {
        const cd = CARD_DB[cid];
        if (cd && cd.keywords) {
            cd.keywords.forEach(kw => {
                keywordCounts[kw] = (keywordCounts[kw] || 0) + 1;
            });
        }
    });

    // 🔥 烈焰风暴:打出火焰牌时手牌另有2+张火焰牌
    if (cardData.keywords && cardData.keywords.includes('fire') && keywordCounts.fire >= 2) {
        const synergyDmg = 8;
        damageEnemy(synergyDmg);
        showFloatingText('🔥 烈焰风暴 +8', document.querySelector('.enemy'), '#e74c3c');
        addCombatLog('synergy', '🔥 烈焰风暴！手牌火焰密度触发，额外 8 点伤害');
    }

    // 📚 亡灵共鸣:场上2+召唤物时，本回合召唤物伤害+2
    // （在 summonAutoAttack 中动态应用，这里只记录状态）
    // 已在 battle.summonSynergyBuff 中追踪

    // 🔄 连环打击:单回合打出3+连击牌，本回合所有伤害+5
    if (cardData.keywords && cardData.keywords.includes('combo')) {
        gameState.battle.comboCardsPlayedThisTurn++;
        if (gameState.battle.comboCardsPlayedThisTurn >= 3) {
            gameState.battle.comboDamageBonus = 5;
            showFloatingText('🔄 连环打击激活!', document.querySelector('.player-area'), '#f39c12');
            addCombatLog('synergy', '🔄 连环打击！本回合所有伤害 +5');
        }
    }

    // 👻 幽灵护甲等 ethereal 卡牌:不进入弃牌堆,直接进入消耗堆
    if (cardData.effect && cardData.effect.ethereal) {
        gameState.battle.exhaustPile.push(cardId);
        addCombatLog('info', cardData.name + ' 已消耗');
    } else {
        gameState.battle.discardPile.push(cardId);
    }

    // 执行卡牌效果
    executeCardEffect(cardData, cardId);

    // 消耗减费(当前牌效果执行后,消耗 1 点减费;但如果是减费牌本身则不消耗)
    if (gameState.battle.costDiscount > 0 && !cardData.effect?.discount) {
        gameState.battle.costDiscount = Math.max(0, gameState.battle.costDiscount - 1);
    }

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

function executeCardEffect(cardData, cardId) {
    const effect = cardData.effect;
    const player = gameState.player;
    const battle = gameState.battle;
    const enemy = battle.enemy;

    // ===== P2: 关键词处理 =====

    // 🔄 连击计数
    if (cardData.keywords && cardData.keywords.includes('combo')) {
        // 除非是 resetCombo 牌
        if (!effect.resetCombo) {
            battle.comboCount++;
        }
    }

    // 重置连击
    if (effect.resetCombo) {
        battle.comboCount = 0;
    }

    // 记录上张牌的关键词(用于 fire_prev 检测)
    if (cardData.keywords) {
        battle.lastKeyword = cardData.keywords[0];
    }

    // 记录上张牌是否有 combo 关键词(连环珠在回合开始时加,这里只记录)

    // ===== 伤害计算 =====
    if (effect.damage) {
        let damage = effect.damage;

        // 力量加成
        damage += player.stats.strength;

        // P2: 狂暴药水 buff
        if (battle.rageTurns > 0) {
            damage += battle.rageStrength;
        }

        // 致命专注:下张攻击牌伤害翻倍
        if (battle.nextAttackDouble) {
            damage *= 2;
            battle.nextAttackDouble = false;
            addCombatLog('info', '🔍 致命专注:伤害翻倍!');
        }

        // 狩猎印记额外伤害
        if (gameState.battle.enemy.huntMarkTurns && gameState.battle.enemy.huntMarkTurns > 0) {
            const markDmg = gameState.battle.enemy.huntMarkDmg;
            damageEnemy(markDmg);
            addCombatLog('info', '🔖 狩猎印记:额外 ' + markDmg + ' 伤害');
            gameState.battle.enemy.huntMarkTurns--;
        }

        // 标记目标额外伤害
        if (gameState.battle.enemy.bonusDamage) {
            damage += gameState.battle.enemy.bonusDamage;
            addCombatLog('info', '🎯 标记目标:+' + gameState.battle.enemy.bonusDamage + ' 伤害');
        }

        // 赤猫效果(第一次攻击)
        if (battle.firstAttack && player.relics.includes('akabeko')) {
            damage += 8;
        }

        // P2: ✨ 圣光徽章 - 神圣牌额外造成 5 点伤害
        if (cardData.keywords && cardData.keywords.includes('holy') && player.relics.includes('holy_badge')) {
            damage += 5;
        }

        // P1: 遗物联动 - 烈焰之心
        const infernoBonus = getRelicSynergyBonus('inferno');
        if (infernoBonus > 0 && cardData.keywords && cardData.keywords.includes('fire')) {
            damage += infernoBonus * 2;
            addCombatLog('synergy', '🔥 烈焰之心联动：火焰牌伤害 +' + (infernoBonus * 2));
        }

        // P1: 遗物联动 - 圣光之环
        const holyBonus = getRelicSynergyBonus('holy');
        if (holyBonus > 0 && cardData.keywords && cardData.keywords.includes('holy')) {
            damage += holyBonus * 2;
            addCombatLog('synergy', '✨ 圣光之环联动：神圣牌伤害 +' + (holyBonus * 2));
        }

        // P1: 遗物联动 - 战斗专家
        const combatBonus = getRelicSynergyBonus('combat');
        if (combatBonus > 0 && cardData.type === 'attack') {
            damage += combatBonus;
            addCombatLog('synergy', '⚔️ 战斗专家联动：攻击伤害 +' + combatBonus);
        }

        // P2: 🪨 黑曜石 - 暗影牌对亡灵/恶魔敌人伤害 +5
        if (cardData.keywords && cardData.keywords.includes('shadow') && player.relics.includes('obsidian')) {
            const enemyTags = battle.enemy.tags || [];
            if (enemyTags.includes('undead') || enemyTags.includes('demon')) {
                damage += 5;
                addCombatLog('info', '🪨 黑曜石:暗影牌对亡灵/恶魔额外 +5 伤害!');
            }
        }

        // P2: 🔄 连击牌加成 - 组合拳/旋风腿
        if (cardData.keywords && cardData.keywords.includes('combo') && battle.comboCount > 1) {
            const bonus = (battle.comboCount - 1) * 2;
            damage += bonus;
            showFloatingText('+' + bonus + ' 连击', document.querySelector('.player-area'), '#f39c12');
        }

        // ===== 关键词协同: 连环打击 - 3+连击牌伤害+5 =====
        if (battle.comboDamageBonus > 0) {
            damage += battle.comboDamageBonus;
        }

        // ===== 关键词协同: 暗影仪式 - 单回合献血≥10，暗影牌伤害×1.5 =====
        if (battle.shadowRitualActive && cardData.keywords && cardData.keywords.includes('shadow')) {
            damage = Math.floor(damage * 1.5);
            showFloatingText('🩸 暗影仪式 ×1.5', document.querySelector('.enemy'), '#8e44ad');
        }

        // P2: 🗡️ 背击 - 未受伤时伤害翻倍
        if (cardData.keywords && cardData.keywords.includes('backstab') && battle.comboCount === 0) {
            damage *= 2;
            addCombatLog('info', '🗡️ 背击!伤害翻倍!');
        }

        // 虚弱效果
        if (player.stats.weak > 0) {
            damage = Math.floor(damage * 0.75);
        }

        // P2: 烈焰风暴 - 敌人有毒/燃烧层时额外伤害
        if (cardData.keywords && cardData.keywords.includes('synergy_poison') && battle.enemyPoison > 0 && effect.damage) {
            damage += 10;
            addCombatLog('info', '🔥 烈焰风暴:敌人身上有 ' + battle.enemyPoison + ' 层' + battle.enemyPoisonLabel + ',额外造成 10 点伤害!');
        }

        // 多次攻击
        const times = effect.times || 1;
        for (let i = 0; i < times; i++) {
            damageEnemy(damage);
        }

        battle.firstAttack = false;
    }

    // P2: 🔥 熔岩护甲 - 上张牌是火焰牌时格挡 +6
    if (effect.block) {
        let block = effect.block;

        if (cardData.keywords && cardData.keywords.includes('fire_prev')) {
            if (battle.lastKeyword === 'fire') {
                block += 6;
                addCombatLog('info', '🔥 熔岩护甲:上张牌是火焰牌,格挡 +6!');
            }
        }

        // P1: 遗物联动 - 守护者
        const wardenBonus = getRelicSynergyBonus('warden');
        if (wardenBonus > 0 && cardData.type === 'defense') {
            block += wardenBonus * 2;
            addCombatLog('synergy', '🛡️ 守护者联动：防御牌格挡 +' + (wardenBonus * 2));
        }

        // 敏捷加成
        block += player.stats.dexterity;
        player.block += block;
        showDamage(document.querySelector('.player-area'), block, 'block');
    }

    // 抽牌
    if (effect.draw) {
        drawCards(effect.draw);
    }

    // 下张牌减费
    if (effect.discount) {
        gameState.battle.costDiscount = (gameState.battle.costDiscount || 0) + effect.discount;
        showFloatingText('-1 费用', document.querySelector('.player-area'), '#f1c40f');
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

    // P2: ❄️ 冰之心 - 冰霜牌额外施加 1 层虚弱
    if (cardData.keywords && cardData.keywords.includes('frost') && player.relics.includes('ice_heart')) {
        gameState.battle.enemy.weak = (gameState.battle.enemy.weak || 0) + 1;
        showFloatingText('❄️ 额外虚弱!', document.querySelector('.enemy'), '#3498db');
        addCombatLog('info', '❄️ 冰之心:额外施加虚弱!');
    }

    // 生命代价
    if (effect.hpCost) {
        player.hp -= effect.hpCost;
        showFloatingText(`-${effect.hpCost}`, document.querySelector('.player-area'), '#e74c3c');
        // ===== 关键词协同: 暗影仪式 - 单回合献血≥10，激活伤害×1.5 =====
        if (cardData.keywords && cardData.keywords.includes('sacrifice')) {
            battle.totalSacrificeThisTurn = (battle.totalSacrificeThisTurn || 0) + effect.hpCost;
            if (battle.totalSacrificeThisTurn >= 10 && !battle.shadowRitualActive) {
                battle.shadowRitualActive = true;
                showFloatingText('🩸 暗影仪式激活!', document.querySelector('.player-area'), '#8e44ad');
                addCombatLog('synergy', '🩸 暗影仪式！本回合献血 ≥10，暗影牌伤害 ×1.5');
            }
        }
    }

    // 添加卡牌到弃牌堆
    if (effect.addCard) {
        gameState.battle.discardPile.push(effect.addCard);
    }

    // 禁止抽牌
    if (effect.noDraw) {
        gameState.battle.noDraw = true;
    }

    // 🔴 看见红色 - 将这张牌重新洗入抽牌堆
    if (effect.shuffle && cardId) {
        gameState.battle.drawPile.push(cardId);
        addCombatLog('info', '🔴 看见红色:' + cardData.name + ' 重新加入抽牌堆');
    }

    // 💚 治疗效果
    if (effect.heal) {
        healPlayer(effect.heal);
        showFloatingText('+' + effect.heal, document.querySelector('.player-area'), '#27ae60');
    }

    // ===== P2: 关键词特效 =====

    // ☠️ 施加毒/燃烧层数
    if (effect.poison) {
        let poisonAmount = effect.poison;
        // P1: 遗物联动 - 暗影之手：每多 1 个同标签遗物，毒层数 +1
        const shadowBonus = getRelicSynergyBonus('shadow');
        if (shadowBonus > 0) {
            poisonAmount += shadowBonus;
            addCombatLog('synergy', '☠️ 暗影之手联动：毒层数 +' + shadowBonus);
        }
        // 毒蛇之牙:毒层数上限 +3
        const maxPoison = player.relics.includes('viper_fang') ? 6 : 3;
        const label = effect.poisonLabel || '毒';
        battle.enemyPoison = Math.min(battle.enemyPoison + poisonAmount, maxPoison);
        battle.enemyPoisonTurns = effect.poisonTurns || 99; // 99 = 永久(需要手动清除)
        battle.enemyPoisonLabel = label;
        showFloatingText('☠️ +' + poisonAmount + ' 层' + label, document.querySelector('.enemy'), '#2ecc71');
        addCombatLog('info', '☠️ 敌人身上有 ' + battle.enemyPoison + ' 层' + label);
    }

    // ☠️ 毒素爆发 - 造成等于敌人毒层数 × 倍数的伤害
    if (effect.toxinBurst) {
        const burstDamage = battle.enemyPoison * effect.toxinBurst;
        if (burstDamage > 0) {
            damageEnemy(burstDamage);
            showFloatingText('☠️ ' + burstDamage + ' 毒素爆发!', document.querySelector('.enemy'), '#2ecc71');
            addCombatLog('info', '☠️ 毒素爆发:' + battle.enemyPoison + ' 层 × ' + effect.toxinBurst + ' = ' + burstDamage + ' 伤害');
        }
    }

    // ☠️ 解药 - 移除敌人 1 层毒,每移除造成 3 点伤害
    if (effect.antitoxin) {
        const removeCount = Math.min(effect.antitoxin, battle.enemyPoison);
        if (removeCount > 0) {
            const antitoxinDamage = removeCount * 3;
            battle.enemyPoison -= removeCount;
            damageEnemy(antitoxinDamage);
            showFloatingText('💊 移除 ' + removeCount + ' 层毒,造成 ' + antitoxinDamage + ' 伤害', document.querySelector('.enemy'), '#9b59b6');
            addCombatLog('info', '💊 解药:移除 ' + removeCount + ' 层毒,造成 ' + antitoxinDamage + ' 点伤害');
        }
    }

    // 🔄 终结技 - 造成 {comboCount × multiplier} 伤害,重置连击
    if (effect.finisher) {
        const finisherDamage = battle.comboCount * effect.finisher;
        if (finisherDamage > 0) {
            damageEnemy(finisherDamage);
            showFloatingText('🔄 终结技!' + battle.comboCount + '×5 = ' + finisherDamage, document.querySelector('.enemy'), '#f39c12');
            addCombatLog('info', '🔄 终结技:连击 ' + battle.comboCount + ' × ' + effect.finisher + ' = ' + finisherDamage + ' 伤害');
        }
        battle.comboCount = 0;
    }

    // ===== P2: 游侠效果 =====

    // 🎯 精准计数
    if (cardData.keywords && cardData.keywords.includes('precision')) {
        let precisionGain = 1;
        // 鹰眼之弓
        if (player.relics.includes('eagle_bow') && cardData.type === 'attack') {
            precisionGain++;
        }
        // 鹰眼牌:精准 +2
        if (effect.precision2) precisionGain = 2;
        // 致命专注:精准 +3
        if (effect.precision3) precisionGain = 3;
        // P1: 遗物联动 - 精准之眼
        precisionGain += getRelicSynergyBonus('precision');

        gameState.battle.precisionCount += precisionGain;
        addCombatLog('info', '🎯 精准 + ' + precisionGain + ' (当前: ' + gameState.battle.precisionCount + ')');

        // 狙击镜:第一张精准牌减费
        if (gameState.battle.firstPrecisionCard && player.relics.includes('sniper_scope')) {
            // Already played, effect noted
        }
    }

    // 重置精准计数
    if (effect.resetPrecision) {
        gameState.battle.precisionCount = 0;
        addCombatLog('info', '🎯 精准计数重置');
    }

    // 精准伤害倍率(万箭穿心)
    if (effect.precisionDamage) {
        const dmg = gameState.battle.precisionCount * effect.precisionDamage;
        damageEnemy(dmg);
        showFloatingText('🎯 ' + dmg, document.querySelector('.enemy'), '#e67e22');
        addCombatLog('info', '🎯 万箭穿心:精准 ' + gameState.battle.precisionCount + ' × ' + effect.precisionDamage + ' = ' + dmg);

        // 敌人有 3+ 负面状态
        const enemyDebuffs = (gameState.battle.enemy.weak || 0) + (gameState.battle.enemy.vulnerable || 0) + (battle.enemyPoison > 0 ? 1 : 0);
        if (enemyDebuffs >= effect.statusThreshold) {
            damageEnemy(effect.statusBonus);
            addCombatLog('info', '🎯 敌人有 ' + enemyDebuffs + ' 层负面,额外 +15 伤害!');
        }
    }

    // 爆破箭:精准 ≥ threshold 时额外伤害
    if (effect.precisionBonus && gameState.battle.precisionCount >= effect.precisionThreshold) {
        damageEnemy(effect.precisionBonus);
        showFloatingText('💥 +' + effect.precisionBonus, document.querySelector('.enemy'), '#e74c3c');
        addCombatLog('info', '💥 精准 ≥ ' + effect.precisionThreshold + ',额外造成 ' + effect.precisionBonus + ' 伤害!');
    }

    // 猎杀时刻:精准 × 系数伤害
    if (effect.precisionFinish) {
        const finishDmg = gameState.battle.precisionCount * effect.precisionFinish;
        damageEnemy(finishDmg);
        showFloatingText('💀 ' + finishDmg, document.querySelector('.enemy'), '#c0392b');
        addCombatLog('info', '💀 猎杀时刻:精准 ' + gameState.battle.precisionCount + ' × ' + effect.precisionFinish + ' = ' + finishDmg);
    }

    // 陷阱:布置陷阱（最多 2 个，新的替换旧的）
    if (effect.trap) {
        const maxTraps = 2;
        const count = effect.trapCount || 1;
        let added = 0;
        for (let i = 0; i < count; i++) {
            if (gameState.battle.traps.length >= maxTraps) {
                gameState.battle.traps[gameState.battle.traps.length - 1] = { damage: effect.trap, triggerNext: true };
                addCombatLog('info', '⚠️ 陷阱已达上限，替换旧陷阱');
            } else {
                gameState.battle.traps.push({ damage: effect.trap, triggerNext: true });
            }
            added++;
        }
        showFloatingText('⚠️ 陷阱 ×' + added, document.querySelector('.player-area'), '#e67e22');
        addCombatLog('info', '⚠️ 布置 ' + added + ' 个陷阱(下回合触发 ' + effect.trap + ' 伤害)');
    }

    // 标记目标:敌人易伤
    if (effect.enemyVulnerable) {
        gameState.battle.enemy.vulnerable = effect.enemyVulnerable;
        gameState.battle.enemy.bonusDamage = effect.enemyBonusDmg || 0;
        showFloatingText('🎯 标记', document.querySelector('.enemy'), '#e67e22');
        addCombatLog('info', '🎯 目标被标记:受到伤害 +2,持续 ' + effect.enemyVulnerable + ' 回合');
    }

    // 狩猎印记
    if (effect.huntMark) {
        gameState.battle.enemy.huntMarkTurns = effect.huntMark;
        gameState.battle.enemy.huntMarkDmg = effect.huntMarkDmg;
        addCombatLog('info', '🔖 狩猎印记:每次被攻击额外 ' + effect.huntMarkDmg + ' 伤害,持续 ' + effect.huntMark + ' 回合');
    }

    // 致命专注:下张攻击牌翻倍
    if (effect.nextAttackDouble) {
        gameState.battle.nextAttackDouble = true;
        showFloatingText('🔍 下张翻倍', document.querySelector('.player-area'), '#e67e22');
    }

    // 伏击
    if (effect.debuffDamage) {
        const hasDebuff = (gameState.battle.enemy.weak || 0) > 0 || (gameState.battle.enemy.vulnerable || 0) > 0 || battle.enemyPoison > 0;
        const dmg = hasDebuff ? effect.debuffDamage : effect.normalDamage;
        damageEnemy(dmg);
        addCombatLog('info', '🗡️ 伏击:造成 ' + dmg + ' 点伤害' + (hasDebuff ? '(触发减益加成)' : ''));
    }

    // ===== P2: 死灵法师效果 =====

    // 灵魂碎片获取(献血)
    if (effect.gainShards) {
        let shards = effect.gainShards;
        // 血瓶:+2
        if (player.relics.includes('blood_vial')) shards += 2;
        // 灵魂链接:翻倍
        if (battle.shardDouble) shards *= 2;

        gameState.battle.soulShards = Math.min(gameState.battle.soulShards + shards, gameState.battle.soulShardMax);
        gameState.battle.sacrificedThisTurn = true;
        showFloatingText('💀 +' + shards, document.querySelector('.player-area'), '#8e44ad');
        addCombatLog('info', '💀 获得 ' + shards + ' 个灵魂碎片(当前: ' + gameState.battle.soulShards + '/' + gameState.battle.soulShardMax + ')');
    }

    // 消耗灵魂碎片
    if (effect.consumeShards) {
        const consumed = Math.min(gameState.battle.soulShards, effect.consumeShards);
        gameState.battle.soulShards -= consumed;
        addCombatLog('info', '💀 消耗 ' + consumed + ' 个灵魂碎片');

        // 灵魂收割:碎片 × 系数 伤害
        if (effect.shardDamage && consumed > 0) {
            const bonusDmg = consumed * effect.shardDamage;
            damageEnemy(bonusDmg);
            showFloatingText('👻 +' + bonusDmg, document.querySelector('.enemy'), '#8e44ad');
            addCombatLog('info', '👻 灵魂收割额外:' + consumed + ' × ' + effect.shardDamage + ' = ' + bonusDmg);
        }

        // 灵魂护盾:碎片 × 系数 格挡
        if (effect.shardBlock && consumed > 0) {
            const bonusBlock = consumed * effect.shardBlock;
            player.block += bonusBlock;
            showFloatingText('🛡️ +' + bonusBlock, document.querySelector('.player-area'), '#8e44ad');
            addCombatLog('info', '🛡️ 灵魂护盾额外:' + consumed + ' × ' + effect.shardBlock + ' = ' + bonusBlock);
        }
    }

    // 灵魂燃烧:清空碎片
    if (effect.consumeAllShards && effect.shardBurnDamage) {
        const shards = gameState.battle.soulShards;
        const burnDmg = shards * effect.shardBurnDamage;
        gameState.battle.soulShards = 0;
        if (burnDmg > 0) {
            damageEnemy(burnDmg);
            showFloatingText('🔥 ' + burnDmg + ' 灵魂燃烧!', document.querySelector('.enemy'), '#e74c3c');
            addCombatLog('info', '🔥 灵魂燃烧:' + shards + ' × ' + effect.shardBurnDamage + ' = ' + burnDmg);
        }
    }

    // 献血(生命代价 - 死灵法师额外处理)
    if (cardData.keywords && cardData.keywords.includes('sacrifice') && effect.hpCost) {
        gameState.battle.totalSacrifice += effect.hpCost;
    }

    // 百分比生命代价
    if (effect.hpPercentCost) {
        const hpLoss = Math.floor(player.hp * effect.hpPercentCost);
        player.hp -= hpLoss;
        gameState.battle.sacrificedThisTurn = true;
        gameState.battle.totalSacrifice += hpLoss;
        addCombatLog('info', '💀 失去 ' + hpLoss + ' 点生命(' + Math.round(effect.hpPercentCost * 100) + '%)');
    }

    // 吸血
    if (effect.lifesteal) {
        const heal = Math.floor(effect.damage * effect.lifesteal);
        healPlayer(heal);
        showFloatingText('🦇 +' + heal, document.querySelector('.player-area'), '#27ae60');
    }

    // 敌人跳过下回合
    if (effect.enemySkip) {
        gameState.battle.enemy.skipNext = true;
        addCombatLog('info', '😱 敌人被恐惧,跳过下回合');
    }

    // 灵魂链接
    if (effect.damageHalve) {
        battle.damageHalve = true;
        battle.shardDouble = true;
        addCombatLog('info', '🔗 灵魂链接:本回合受伤减半,碎片翻倍');
    }

    // 冥界行者:如果本回合献过血
    if (effect.checkSacrifice && effect.conditionalHeal) {
        if (battle.sacrificedThisTurn) {
            healPlayer(effect.conditionalHeal);
            showFloatingText('🚶 +' + effect.conditionalHeal, document.querySelector('.player-area'), '#27ae60');
            addCombatLog('info', '🚶 冥界行者:本回合献过血,恢复 ' + effect.conditionalHeal + ' 点生命');
        } else {
            addCombatLog('info', '🚶 冥界行者:本回合未献血,无法触发');
        }
    }

    // 死亡之拥:累计献血加成
    if (effect.sacrificeBonus && effect.sacrificeThreshold) {
        if (gameState.battle.totalSacrifice >= effect.sacrificeThreshold) {
            damageEnemy(effect.sacrificeBonus);
            showFloatingText('☠️ +' + effect.sacrificeBonus, document.querySelector('.enemy'), '#c0392b');
            addCombatLog('info', '☠️ 累计献血 ≥ ' + effect.sacrificeThreshold + ',额外 ' + effect.sacrificeBonus + ' 伤害!');
        }
    }

    // 生命收割:百分比额外伤害
    if (effect.percentBonus) {
        const enemy = gameState.battle.enemy;
        if (enemy.currentHp > enemy.maxHp * 0.5) {
            const lostHp = enemy.maxHp - enemy.currentHp;
            const bonusDmg = Math.floor(lostHp * effect.percentBonus);
            if (bonusDmg > 0) {
                damageEnemy(bonusDmg);
                addCombatLog('info', '⚔️ 生命收割:额外 ' + bonusDmg + ' 伤害');
            }
        }
    }

    // 亡灵军团
    if (effect.summonArmy && effect.consumeShards) {
        const consumed = Math.min(gameState.battle.soulShards, effect.consumeShards);
        gameState.battle.soulShards -= consumed;
        for (let i = 0; i < 2; i++) {
            if (gameState.battle.summons.length < gameState.battle.summonSlots) {
                let summonTurns = 2;
                if (player.relics.includes('summoner_manual')) summonTurns++;
                gameState.battle.summons.push({
                    id: 'skeleton_' + i, name: '骷髅兵', hp: 15, maxHp: 15,
                    damage: 5, turnsLeft: summonTurns, maxTurns: summonTurns,
                    type: 'output', icon: '💀'
                });
            }
        }
        addCombatLog('info', '💀 亡灵军团:召唤 2 个骷髅兵!');
    }

    // ===== P2: 召唤师效果 =====

    // 召唤单个召唤物
    if (effect.summon) {
        const s = effect.summon;
        if (gameState.battle.summons.length >= gameState.battle.summonSlots) {
            showFloatingText('❌ 槽位已满', document.querySelector('.player-area'), '#e74c3c');
            addCombatLog('info', '❌ 召唤槽位已满,无法召唤 ' + s.name);
            return;
        }
        let turns = s.turns;
        // 召唤师手册:+1 回合
        if (player.relics.includes('summoner_manual')) turns++;
        // 石像之心:坦克类 +20 HP
        let hp = s.hp;
        if (player.relics.includes('stone_heart') && s.type === 'tank') hp += 20;
        // P1: 遗物联动 - 召唤之环
        const summonBonus = getRelicSynergyBonus('summon');
        if (summonBonus > 0) hp += summonBonus * 10;

        gameState.battle.summons.push({
            ...s, hp: hp, maxHp: hp, turnsLeft: turns, maxTurns: turns
        });
        showFloatingText(s.icon + ' ' + s.name, document.querySelector('.player-area'), '#3498db');
        addCombatLog('info', s.icon + ' 召唤了 ' + s.name + '(HP ' + hp + ',伤害 ' + s.damage + ',' + turns + ' 回合)');
    }

    // 召唤随机召唤物
    if (effect.summonRandom) {
        const randomPool = [
            { id: 'golem', name: '石像兵', hp: 30, maxHp: 30, damage: 6, turns: 3, maxTurns: 3, type: 'tank', icon: '🗿' },
            { id: 'spirit', name: '元素精灵', hp: 20, maxHp: 20, damage: 10, turns: 2, maxTurns: 2, type: 'output', icon: '🧚' },
            { id: 'wolf', name: '影狼', hp: 25, maxHp: 25, damage: 8, turns: 2, maxTurns: 2, type: 'balanced', icon: '🐺' },
            { id: 'flower', name: '治疗花', hp: 15, maxHp: 15, damage: 0, turns: 2, maxTurns: 2, type: 'heal', icon: '🌸', healPerTurn: 4 },
            { id: 'ghost', name: '幽灵', hp: 10, maxHp: 10, damage: 12, turns: 2, maxTurns: 2, type: 'output', icon: '👻' }
        ];
        for (let i = 0; i < effect.summonRandom; i++) {
            if (gameState.battle.summons.length >= gameState.battle.summonSlots) break;
            const template = randomPool[randomInt(0, randomPool.length - 1)];
            let turns = template.turns;
            if (player.relics.includes('summoner_manual')) turns++;
            let hp = template.hp;
            if (player.relics.includes('stone_heart') && template.type === 'tank') hp += 20;
            // P1: 遗物联动 - 召唤之环：每多 1 个同标签遗物，召唤物 HP +10
            const summonBonus = getRelicSynergyBonus('summon');
            if (summonBonus > 0) hp += summonBonus * 10;

            gameState.battle.summons.push({ ...template, hp, maxHp: hp, turnsLeft: turns });
            addCombatLog('info', template.icon + ' 随机召唤了 ' + template.name);
        }
    }

    // 强化召唤
    if (effect.empowerDamage) {
        gameState.battle.empowerBuff += effect.empowerDamage;
        gameState.battle.empowerTurns = effect.empowerTurns;
        showFloatingText('⬆️ +' + effect.empowerDamage, document.querySelector('.player-area'), '#3498db');
        addCombatLog('info', '⬆️ 所有召唤物伤害 +' + effect.empowerDamage + ',持续 ' + effect.empowerTurns + ' 回合');
    }

    // 召唤协同:条件抽牌
    if (effect.conditionalDraw) {
        const cd = effect.conditionalDraw;
        const drawAmt = gameState.battle.summons.length >= cd.threshold ? cd.draw : cd.fallbackDraw;
        drawCards(drawAmt);
        addCombatLog('info', '🔗 召唤协同:抽 ' + drawAmt + ' 张牌');
    }

    // 召唤风暴
    if (effect.storm) {
        gameState.battle.summons.forEach(summon => {
            if (summon.turnsLeft > 0) {
                let dmg = summon.damage + gameState.battle.empowerBuff;
                damageEnemy(dmg);
                addCombatLog('info', '⛈️ ' + summon.name + ' 立即攻击!' + dmg + ' 伤害');
                summon.turnsLeft--;
                if (summon.turnsLeft <= 0) {
                    addCombatLog('info', summon.icon + ' ' + summon.name + ' 消散了');
                    if (summon.deathHeal) {
                        gameState.player.hp = Math.min(gameState.player.hp + summon.deathHeal, gameState.player.maxHp);
                        addCombatLog('info', '🦅 凤凰复苏');
                    }
                }
            }
        });
        gameState.battle.summons = gameState.battle.summons.filter(s => s.turnsLeft > 0);
    }

    // 灵魂共鸣:条件能量
    if (effect.conditionalEnergy) {
        const ce = effect.conditionalEnergy;
        if (gameState.battle.summons.length >= ce.threshold) {
            player.energy += ce.energy;
            showFloatingText('🎵 +' + ce.energy + '⚡', document.querySelector('.player-area'), '#f1c40f');
            addCombatLog('info', '🎵 灵魂共鸣:获得 ' + ce.energy + ' 点能量');
        }
    }

    // 召唤替换
    if (effect.replace) {
        if (gameState.battle.summons.length > 0) {
            const removed = gameState.battle.summons.pop();
            addCombatLog('info', '🔄 移除了 ' + removed.name);

            const randomPool = [
                { id: 'golem', name: '石像兵', hp: 30, maxHp: 30, damage: 6, turns: 3, maxTurns: 3, type: 'tank', icon: '🗿' },
                { id: 'spirit', name: '元素精灵', hp: 20, maxHp: 20, damage: 10, turns: 2, maxTurns: 2, type: 'output', icon: '🧚' },
                { id: 'wolf', name: '影狼', hp: 25, maxHp: 25, damage: 8, turns: 2, maxTurns: 2, type: 'balanced', icon: '🐺' },
                { id: 'ghost', name: '幽灵', hp: 10, maxHp: 10, damage: 12, turns: 2, maxTurns: 2, type: 'output', icon: '👻' }
            ];
            const template = randomPool[randomInt(0, randomPool.length - 1)];
            let turns = template.turns;
            if (player.relics.includes('summoner_manual')) turns++;
            let hp = template.hp;
            if (player.relics.includes('stone_heart') && template.type === 'tank') hp += 20;
            // P1: 遗物联动 - 召唤之环
            const summonBonus2 = getRelicSynergyBonus('summon');
            if (summonBonus2 > 0) hp += summonBonus2 * 10;

            gameState.battle.summons.push({ ...template, hp, maxHp: hp, turnsLeft: turns });
            addCombatLog('info', '🔄 新召唤了 ' + template.name);
        }
    }

    // 下回合多抽
    if (effect.nextDraw) {
        gameState.battle.extraDrawNext = (gameState.battle.extraDrawNext || 0) + effect.nextDraw;
    }

    // 下回合能量
    if (effect.nextEnergy) {
        gameState.battle.extraEnergyNext = (gameState.battle.extraEnergyNext || 0) + effect.nextEnergy;
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
            // 添加伤害数字
            createDamageNumber(enemyEl, amount, amount > enemy.maxHp * 0.4);
        } else if (amount > 5) {
            createSparks(enemyEl, 8);
            createDamageNumber(enemyEl, amount, false);
        }

        // 如果触发了格挡,添加格挡效果
        if (oldHp - enemy.currentHp < amount) {
            createBlockEffect(enemyEl);
        }

        // 清理类名
        setTimeout(() => {
            enemyEl.classList.remove('hit-large', 'hit-medium', 'hit-small', 'hit', 'hp-decrease');
        }, 600);
    }


    // T22: Boss 第二阶段触发检查
    const boss = gameState.battle.enemy;
    if (boss.isBoss && !boss.phase2 && boss.currentHp < boss.maxHp * 0.5) {
        boss.phase2 = true;
        addCombatLog('info', '⚠️ ' + boss.name + ' 进入了第二阶段!狂暴模式启动!');
        try { playSFX(SFX_TYPES.power); } catch(e) {}
        // 视觉特效
        const spriteEl = document.querySelector('.enemy-sprite');
        if (spriteEl) {
            spriteEl.style.filter = 'hue-rotate(180deg) brightness(1.3)';
            spriteEl.style.textShadow = '0 0 20px #ff0000, 0 0 40px #800080';
            spriteEl.style.animation = 'none';
            spriteEl.offsetHeight; // 触发重排
            spriteEl.style.animation = 'pulse 0.5s ease-in-out 3';
        }
        // 根据 Boss 类型增强属性
        if (boss.type === 'boss_goblin_king') {
            boss.damage += 5;
            addCombatLog('info', '哥布林王狂暴了!伤害 +5,召唤频率翻倍!');
        } else if (boss.type === 'boss_lich') {
            boss.damage += 5;
            boss.soulLink = true; // P1:灵魂链接,玩家受伤 Boss 也受 50%
            addCombatLog('info', '巫妖灵魂暴走!伤害 +5,灵魂爆炸伤害翻倍!');
            addCombatLog('info', '⚡ 灵魂链接已建立!玩家受到伤害时,巫妖也承受 50%');
        } else if (boss.type === 'boss_ancient_dragon' || boss.type === 'boss_dragon') {
            boss.damage += 5;
            addCombatLog('info', '远古巨龙进入狂怒!火焰吐息伤害 +5,新增暗影吐息!');
        } else if (boss.type === 'boss_lich_king') {
            boss.damage += 5;
            addCombatLog('info', '巫妖王灵魂引爆!伤害 +5,召唤加速!');
        } else if (boss.type === 'boss_ancient_dragon_evil') {
            boss.damage += 8;
            addCombatLog('info', '上古邪龙暗影吐息启动!伤害 +8,腐蚀翻倍!');
        }
        updateBattleUI();
    }

    updateBattleUI();

    // 敌人死亡检查
    if (gameState.battle.enemy.currentHp <= 0) {
        setTimeout(winBattle, 500);
    }
}
function createSparks(target, count = 10) {
    const targetRect = target.getBoundingClientRect();
    const container = document.querySelector('#game-container');

    for (let i = 0; i < count; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';

        const centerX = targetRect.left + targetRect.width / 2 - container.getBoundingClientRect().left;
        const centerY = targetRect.top + targetRect.height / 2 - container.getBoundingClientRect().top;

        spark.style.left = `${centerX}px`;
        spark.style.top = `${centerY}px`;

        // 随机颜色和大小
        const colors = ['#ffd700', '#ff6b6b', '#fff', '#f39c12'];
        spark.style.background = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 4 + 2;
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;

        // 随机飞溅方向
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 80 + 40;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

        spark.style.setProperty('--spark-dx', `${dx}px`);
        spark.style.setProperty('--spark-dy', `${dy}px`);

        container.appendChild(spark);
        setTimeout(() => spark.remove(), 800);
    }
}

// 创建魔法粒子效果
function createMagicParticles(target, color = '#3498db', count = 15) {
    const targetRect = target.getBoundingClientRect();
    const container = document.querySelector('#game-container');

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';

        const centerX = targetRect.left + targetRect.width / 2 - container.getBoundingClientRect().left;
        const centerY = targetRect.top + targetRect.height / 2 - container.getBoundingClientRect().top;

        const angle = (Math.PI * 2 * i) / count;
        const distance = Math.random() * 50 + 30;

        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.backgroundColor = color;

        container.appendChild(particle);

        // 动画
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800 + Math.random() * 400,
            easing: 'ease-out',
            fill: 'forwards'
        });

        setTimeout(() => particle.remove(), 1200);
    }
}

// 创建伤害数字飘字
function createDamageNumber(target, damage, isCritical = false) {
    const targetRect = target.getBoundingClientRect();
    const container = document.querySelector('#game-container');

    const damageEl = document.createElement('div');
    damageEl.className = 'damage-number';
    damageEl.textContent = `-${damage}`;

    const centerX = targetRect.left + targetRect.width / 2 - container.getBoundingClientRect().left;
    const topY = targetRect.top - container.getBoundingClientRect().top;

    damageEl.style.left = `${centerX}px`;
    damageEl.style.top = `${topY}px`;

    if (isCritical) {
        damageEl.classList.add('critical');
    }

    container.appendChild(damageEl);

    // 飘出动画
    damageEl.animate([
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        { transform: 'translateY(-60px) scale(1.2)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out',
        fill: 'forwards'
    });

    setTimeout(() => damageEl.remove(), 1000);
}

// 创建治疗数字飘字
function createHealNumber(target, heal) {
    const targetRect = target.getBoundingClientRect();
    const container = document.querySelector('#game-container');

    const healEl = document.createElement('div');
    healEl.className = 'heal-number';
    healEl.textContent = `+${heal}`;

    const centerX = targetRect.left + targetRect.width / 2 - container.getBoundingClientRect().left;
    const topY = targetRect.top - container.getBoundingClientRect().top;

    healEl.style.left = `${centerX}px`;
    healEl.style.top = `${topY}px`;

    container.appendChild(healEl);

    // 飘出动画
    healEl.animate([
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        { transform: 'translateY(-50px) scale(1.1)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out',
        fill: 'forwards'
    });

    setTimeout(() => healEl.remove(), 1000);
}

// 创建格挡效果
function createBlockEffect(target) {
    const targetRect = target.getBoundingClientRect();
    const container = document.querySelector('#game-container');

    const blockEl = document.createElement('div');
    blockEl.className = 'block-effect';

    const centerX = targetRect.left + targetRect.width / 2 - container.getBoundingClientRect().left;
    const centerY = targetRect.top + targetRect.height / 2 - container.getBoundingClientRect().top;

    blockEl.style.left = `${centerX - 30}px`;
    blockEl.style.top = `${centerY - 30}px`;

    container.appendChild(blockEl);

    // 脉冲动画
    blockEl.animate([
        { transform: 'scale(0.5)', opacity: 0.8 },
        { transform: 'scale(1.5)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out',
        fill: 'forwards'
    });

    setTimeout(() => blockEl.remove(), 600);
}

// 敌人伤害执行(提取公共逻辑)
function executeEnemyDamage(enemy, damage, playerArea, enemyEl) {
    // 敌人虚弱效果
    if (enemy.weak > 0) {
        damage = Math.floor(damage * 0.75);
    }
    // 玩家易伤效果
    if (gameState.player.stats.vulnerable > 0) {
        damage = Math.floor(damage * 1.5);
    }
    // P2: 死灵法师 - 灵魂链接 受伤减半
    if (gameState.battle.damageHalve) {
        damage = Math.max(1, Math.floor(damage / 2));
    }
    // P2: A2 敌人强化 - 额外伤害
    damage += getEnemyDamageBonus();
    // 格挡减伤
    if (gameState.player.block > 0) {
        const blockAbsorb = Math.min(gameState.player.block, damage);
        gameState.player.block -= blockAbsorb;
        damage -= blockAbsorb;
    }
    // 造成伤害
    if (damage > 0) {
        gameState.player.hp -= damage;
        showDamage(playerArea, damage, 'damage');
        shakeElement(playerArea);
        createDamageNumber(playerArea, damage, damage > gameState.player.maxHp * 0.3);
        createSparks(playerArea, damage > 10 ? 12 : 6);
        // 青铜鳞效果
        if (gameState.player.relics.includes('bronze_scales')) {
            damageEnemy(3);
            showFloatingText('3', enemyEl, '#e74c3c');
        }
        // P1:Boss 2 巫妖灵魂链接 - 玩家受伤时 Boss 也受 50%
        if (enemy.soulLink) {
            const linkDmg = Math.floor(damage * 0.5);
            if (linkDmg > 0) {
                enemy.currentHp = Math.max(0, enemy.currentHp - linkDmg);
                showFloatingText('-' + linkDmg, enemyEl, '#9b59b6');
                addCombatLog('info', '⚡ 灵魂链接:巫妖受到 ' + linkDmg + ' 点反射伤害');
            }
        }
    }
}

function endTurn() {
    // 敌人回合
    const enemy = gameState.battle.enemy;
    if (!enemy) return; // 防御性检查:战斗可能已结束
    const action = enemy.nextAction;
    const playerArea = document.querySelector('.player-area');
    const enemyEl = document.querySelector('.enemy');

    if (action.type === 'attack') {
        // P2: 恐惧低语 - 敌人跳过攻击
        if (enemy.skipNext) {
            enemy.skipNext = false;
            addCombatLog('info', '😱 ' + enemy.name + ' 被恐惧,跳过了本回合攻击');
            showFloatingText('😱 跳过', enemyEl, '#9b59b6');
        } else {
            let damage = action.value;
            let isDouble = action.doubleAttack || false;
            executeEnemyDamage(enemy, damage, playerArea, enemyEl);

            // 吸血鬼吸血攻击
            if (action.label === '吸血攻击') {
                const healAmt = Math.floor(damage * 0.5);
                enemy.currentHp = Math.min(enemy.maxHp, enemy.currentHp + healAmt);
                showFloatingText('+' + healAmt, enemyEl, '#2ecc71');
                addCombatLog('info', '🧛 ' + enemy.name + ' 汲取了 ' + healAmt + ' 点生命');
            }

            // 毒蜘蛛双倍攻击
            if (isDouble && gameState.player.hp > 0) {
                let damage2 = action.value;
                if (enemy.weak > 0) damage2 = Math.floor(damage2 * 0.75);
                if (gameState.player.stats.vulnerable > 0) damage2 = Math.floor(damage2 * 1.5);
                executeEnemyDamage(enemy, damage2, playerArea, enemyEl);
                addCombatLog('info', '🕷️ ' + enemy.name + ' 再次快速攻击!');
            }
        }
    } else if (action.type === 'heavy_attack') {
        let damage = action.value;
        executeEnemyDamage(enemy, damage, playerArea, enemyEl);
        addCombatLog('info', '💥 ' + enemy.name + ' 重击造成 ' + damage + ' 伤害');

    } else if (action.type === 'defend') {
        enemy.block += action.value;
        showFloatingText(`+${action.value}🛡️`, enemyEl, '#3498db');
        addCombatLog('info', '🛡️ ' + enemy.name + ' 防御 +' + action.value + ' 格挡');

    } else if (action.type === 'buff') {
        enemy.damage += action.value;
        showFloatingText('💪+' + action.value, enemyEl, '#f39c12');
        addCombatLog('info', '💪 ' + enemy.name + ' 攻击力 +' + action.value);

    } else if (action.type === 'summon') {
        const count = action.value;
        addCombatLog('info', '📢 ' + enemy.name + ' 召唤了 ' + count + ' 个小怪!(简化为伤害)');
        let summonDmg = count * 8;
        executeEnemyDamage(enemy, summonDmg, playerArea, enemyEl);

    } else if (action.type === 'special') {
        // 特殊技能处理
        if (action.label === '汲取生命') {
            const healAmt = action.value;
            enemy.currentHp = Math.min(enemy.maxHp, enemy.currentHp + healAmt);
            showFloatingText('+' + healAmt, enemyEl, '#2ecc71');
            addCombatLog('info', '🌀 ' + enemy.name + ' 汲取了 ' + healAmt + ' 点生命');
        } else if (action.label === '恢复') {
            const healAmt = action.value;
            enemy.currentHp = Math.min(enemy.maxHp, enemy.currentHp + healAmt);
            showFloatingText('+' + healAmt, enemyEl, '#2ecc71');
            addCombatLog('info', '🌀 ' + enemy.name + ' 恢复了 ' + healAmt + ' 点生命');
        } else if (action.label === '火焰吐息') {
            let damage = action.value;
            executeEnemyDamage(enemy, damage, playerArea, enemyEl);
            addCombatLog('info', '🔥 ' + enemy.name + ' 喷吐烈焰!');
        } else if (action.label === '冰霜吐息') {
            let damage = action.value * 3;
            executeEnemyDamage(enemy, damage, playerArea, enemyEl);
            addCombatLog('info', '❄️ ' + enemy.name + ' 冰霜吐息,减速!');
        } else if (action.label === '暗影吐息') {
            let damage = action.value;
            executeEnemyDamage(enemy, damage, playerArea, enemyEl);
            addCombatLog('info', '🌑 ' + enemy.name + ' 暗影吐息!');
        } else if (action.label === '腐蚀低语') {
            addCombatLog('info', '🌑 ' + enemy.name + ' 低语腐蚀你的意志...');
            gameState.player.stats.weak = (gameState.player.stats.weak || 0) + 1;
        } else if (action.label === '暗影冲击') {
            let damage = action.value * 5;
            executeEnemyDamage(enemy, damage, playerArea, enemyEl);
            addCombatLog('info', '🌀 ' + enemy.name + ' 暗影冲击!');
        } else if (action.label === '灵魂爆炸') {
            let damage = action.value;
            executeEnemyDamage(enemy, damage, playerArea, enemyEl);
            addCombatLog('info', '💀 ' + enemy.name + ' 灵魂爆炸!');
        } else if (action.label === '灵魂吸取') {
            const drain = action.value;
            gameState.player.hp -= drain;
            enemy.currentHp = Math.min(enemy.maxHp, enemy.currentHp + drain);
            showFloatingText('+' + drain, enemyEl, '#9b59b6');
            showDamage(playerArea, drain, 'damage');
            addCombatLog('info', '💀 ' + enemy.name + ' 吸取了你的灵魂!');
        } else if (action.label === '灵魂引爆') {
            let damage = action.value * 8;
            executeEnemyDamage(enemy, damage, playerArea, enemyEl);
            addCombatLog('info', '💥 ' + enemy.name + ' 引爆灵魂!');
        } else if (action.label === '召唤') {
            let summonDmg = action.value * 10;
            executeEnemyDamage(enemy, summonDmg, playerArea, enemyEl);
            addCombatLog('info', '📢 ' + enemy.name + ' 召唤亡灵!(伤害 ' + summonDmg + ')');
        } else {
            // 默认特殊技能:造成伤害
            let damage = action.value || enemy.damage;
            executeEnemyDamage(enemy, damage, playerArea, enemyEl);
            addCombatLog('info', '🌀 ' + enemy.name + ' 使用 ' + (action.label || '特殊技能') + '!');
        }
    }

    // 检查玩家死亡
    if (gameState.player.hp <= 0) {
        // P2: 棺木 - 每局限 1 次,复活到 15 HP
        if (gameState.player.relics.includes('coffin') && !gameState.battle.coffinUsed) {
            gameState.battle.coffinUsed = true;
            gameState.player.hp = 15;
            showFloatingText('⚰️ 棺木复活!', document.querySelector('.player-area'), '#27ae60');
            addCombatLog('info', '⚰️ 棺木:从死亡中复活,恢复至 15 HP');
        } else {
            gameOver(false);
            return;
        }
    }

    // 弃掉所有手牌
    gameState.battle.discardPile.push(...gameState.battle.hand);
    gameState.battle.hand = [];

    // 下一回合
    gameState.battle.turn++;
    startTurn();
}

function winBattle() {
    // 停止 Boss 战震动
    stopBossShake();

    // P3: 战斗统计追踪
    if (!gameState.sessionStats) {
        gameState.sessionStats = { totalDamage: 0, totalBlock: 0, potionsUsed: 0, totalTurns: 0, startTime: Date.now() };
    }
    gameState.sessionStats.totalTurns += gameState.battle.turn;
    gameState.sessionStats.potionsUsed = (gameState.sessionStats.potionsUsed || 0);

    gameState.stats.enemiesKilled++;

    // 燃烧之血效果
    if (gameState.player.relics.includes('burning_blood')) {
        healPlayer(6);
    }

    // 标记当前节点为完成
    if (gameState.map.currentNode) {
        const nodeId = gameState.map.currentNode.id;
        const nodeEl = document.querySelector(`[data-node-id="${nodeId}"]`);
        if (nodeEl && !nodeEl.classList.contains('completed')) {
            gameState.map.completedNodes.add(nodeId);
            nodeEl.classList.add('completed');
            nodeEl.classList.remove('available');
            console.log(`[战斗胜利] 节点 ${nodeId} 标记为完成`);

            // 解锁下一行节点
            const [row] = nodeId.split('-').map(Number);
            const nextRow = row + 1;
            if (nextRow < 4) {
                unlockNextRow(nextRow);
            }
        }
    }

    // 战斗胜利后保存进度
    saveGame();

    // 重置 Boss 战卡牌选择标志
    window.bossCardSelected = false;

    // 计算奖励(精英战奖励翻倍)
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

    // P1: 遗物联动 - 贪婪
    const greedBonus = getRelicSynergyBonus('greed');
    if (greedBonus > 0) {
        const bonusGold = greedBonus * 5;
        gameState.player.gold += bonusGold;
        addCombatLog('synergy', '💰 贪婪联动：额外金币 +' + bonusGold);
    }

    document.getElementById('reward-gold').textContent = `🪙 获得 ${goldReward} 金币`;

    // 生成卡牌奖励
    const rewardCardsContainer = document.getElementById('reward-cards');
    rewardCardsContainer.innerHTML = '';

    // 根据职业生成可选卡牌(P2: 稀有度加权)
    const availableCards = Object.keys(CARD_DB).filter(id => {
        // 排除基础牌
        if (id === 'strike' || id === 'defend') return false;
        // P2: 稀有卡只在高楼层出现
        const card = CARD_DB[id];
        if (card.rarity === 'rare' && gameState.map.floor < 3) return false;
        if (card.rarity === 'uncommon' && gameState.map.floor < 2) return false;
        return true;
    });

    // P2: 稀有度加权随机(common 70%, uncommon 25%, rare 5%)
    function getWeightedRewardCard() {
        const commons = availableCards.filter(id => !CARD_DB[id].rarity || CARD_DB[id].rarity === 'common');
        const uncommons = availableCards.filter(id => CARD_DB[id].rarity === 'uncommon');
        const rares = availableCards.filter(id => CARD_DB[id].rarity === 'rare');
        const roll = Math.random() * 100;
        if (roll < 5 && rares.length > 0) return rares[randomInt(0, rares.length - 1)];
        if (roll < 30 && uncommons.length > 0) return uncommons[randomInt(0, uncommons.length - 1)];
        return commons.length > 0 ? commons[randomInt(0, commons.length - 1)] : availableCards[randomInt(0, availableCards.length - 1)];
    }

    // 随机选择3张(加权)
    const rewardCardIds = [];
    for (let i = 0; i < 3; i++) {
        rewardCardIds.push(getWeightedRewardCard());
    }

    rewardCardIds.forEach(cardId => {
        const cardData = CARD_DB[cardId];
        const cardEl = document.createElement('div');
        cardEl.className = `card ${cardData.type}`;
        cardEl.setAttribute('data-desc', cardData.desc);

        // 奖励卡牌 DOM 结构与 UI 原型 cardHTML 完全一致：
        // 费用(span 反向旋转校正菱形内可读性) / 稀有度纯色点 / 原画黑框 / 名称 / 描述 / 类型标签
        cardEl.innerHTML = `
            <div class="card-cost"><span>${cardData.cost}</span></div>
            <div class="card-rarity ${cardData.rarity || 'common'}"></div>
            <div class="card-icon">${cardIconHTML(cardId, cardData)}</div>
            <div class="card-name">${cardData.name}</div>
            <div class="card-desc">${cardData.desc}</div>
            <div class="card-type">${CARD_TYPE_LABEL[cardData.type] || ''}</div>
        `;
        cardEl.addEventListener('click', function() {
            // 如果已经选择过卡牌,显示提示并返回
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
            // 非 Boss 战胜利,返回地图,但不清空路径和节点类型(同一层内保持不变)
            setTimeout(() => {
                showScreen('map-screen');
                generateMap();
            }, 1500);
        });
        rewardCardsContainer.appendChild(cardEl);
    });

    // Boss战额外奖励遗物（对齐 UI 原型 .relic-banner 样式）
    const relicRewardSection = document.getElementById('relic-reward');
    if (isBoss) {
        relicRewardSection.style.display = 'block';
        const relicContainer = document.getElementById('reward-relic');
        relicContainer.innerHTML = '';

        const randomRelic = Object.keys(RELIC_DB)[randomInt(0, Object.keys(RELIC_DB).length - 1)];
        const relicData = RELIC_DB[randomRelic];

        relicContainer.innerHTML = `
            <div class="relic-banner" role="button" tabindex="0" title="${relicData.desc}">
                <div class="gem"></div>
                <div>
                    <div class="rt">${relicData.name}</div>
                    <div class="rd">遗物 · ${relicData.desc}</div>
                </div>
            </div>
        `;
        const bannerEl = relicContainer.querySelector('.relic-banner');
        bannerEl.addEventListener('click', () => {
            addRelic(randomRelic);
            alert('获得遗物:' + relicData.name + '!\n\n' + relicData.desc);

            // 进入下一层
            gameState.map.floor++;
            if (gameState.mode === 'endless') {
                gameState.endlessFloor++;
            }

            // P3: 层间过渡文本
            const floor = gameState.map.floor;
            if (FLOOR_TRANSITIONS[floor]) {
                setTimeout(() => alert(FLOOR_TRANSITIONS[floor]), 300);
            }

            // 恢复血量(无尽模式只恢复 50%，正常模式满血)
            if (gameState.mode === 'endless') {
                gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + Math.floor(gameState.player.maxHp * 0.5));
            } else {
                gameState.player.hp = gameState.player.maxHp;
            }
            document.getElementById('player-hp').textContent = `${gameState.player.hp}/${gameState.player.maxHp}`;

            // 清空路径、节点类型和已完成节点数据,让下一层生成新数据
            gameState.map.paths = [];
            gameState.map.nodeTypes = null;
            gameState.map.completedNodes.clear();  // 清空已完成节点,否则新层的第一行会被锁定
            gameState.map.currentNode = null;

            // 无尽模式逻辑：每 4 层一个 Boss 循环
            if (gameState.mode === 'endless') {
                // 无尽模式不结束，继续循环
                gameState.map.floor = ((gameState.map.floor - 1) % 4) + 1;
                setEndlessBestFloor(gameState.endlessFloor);
                saveGame();
                showScreen('map-screen');
                generateMap();
            } else if (gameState.map.floor > 3) {
                gameOver(true);
            } else {
                showScreen('map-screen');
                generateMap();
            }
        });
    } else if (isElite) {
        // 精英战额外奖励:50% 概率获得药水
        relicRewardSection.style.display = 'block';
        const relicContainer = document.getElementById('reward-relic');
        relicContainer.innerHTML = '<p style="color: #888;">精英挑战成功!</p>';

        if (Math.random() < 0.5 && gameState.player.potions.length < getPotionCap()) {
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
    // P1: 遗物联动 - 生命之泉
    const recoveryBonus = getRelicSynergyBonus('recovery');
    amount += recoveryBonus * 2;

    const oldHp = gameState.player.hp;
    gameState.player.hp = Math.min(gameState.player.maxHp, gameState.player.hp + amount);
    const actualHeal = gameState.player.hp - oldHp;
    if (actualHeal > 0) {
        const playerArea = document.querySelector('.player-area');
        showDamage(playerArea, actualHeal, 'heal');
        // 添加治疗粒子效果
        createHealNumber(playerArea, actualHeal);
        createMagicParticles(playerArea, '#2ecc71', 10);
    }
}

function addCardToDeck(cardId) {
    gameState.player.deck.push(cardId);
    gameState.stats.cardsAdded++;

    // 📚 收藏图鉴:记录已发现的卡牌
    const knownCards = JSON.parse(localStorage.getItem('dungeonCardKnownCards') || '[]');
    if (!knownCards.includes(cardId)) {
        knownCards.push(cardId);
        localStorage.setItem('dungeonCardKnownCards', JSON.stringify(knownCards));
    }

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

    // 📚 收藏图鉴:记录已发现的遗物
    const knownRelics = JSON.parse(localStorage.getItem('dungeonCardKnownRelics') || '[]');
    if (!knownRelics.includes(relicId)) {
        knownRelics.push(relicId);
        localStorage.setItem('dungeonCardKnownRelics', JSON.stringify(knownRelics));
    }

    // 🗝️ 诅咒钥匙效果:获得时额外获得 1 个普通遗物
    if (relicId === 'cursed_key') {
        const commonRelics = ['burning_blood', 'anchor', 'bronze_scales', 'akabeko', 'gambling_chip'];
        const extraId = commonRelics[randomInt(0, commonRelics.length - 1)];
        if (!gameState.player.relics.includes(extraId)) {
            gameState.player.relics.push(extraId);
            gameState.stats.relicsFound++;
            const extraData = RELIC_DB[extraId];
            addCombatLog('info', '🗝️ 诅咒钥匙生效!额外获得遗物:' + extraData.name);
            showFloatingText('+' + extraData.name + ' (' + extraData.icon + ')', document.querySelector('.screen.active'), '#9b59b6');
        }
    }
}

// ==================== 商店系统 ====================

function openShop() {
    const floor = gameState.map.floor;
    // 商店价格随楼层递增(每层增加 20%)
    const floorMultiplier = 1 + (floor - 1) * 0.2;
    // P2: A5 商店涨价
    const priceMultiplier = floorMultiplier * getShopPriceMultiplier();

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
            <div class="card-icon">${cardIconHTML(cardId, cardData)}</div>
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
                <div>${relicIconHTML(relicId, relicData)}</div>
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
            if (gameState.player.gold >= price && gameState.player.potions.length < getPotionCap()) {
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

// ==================== P1: 牌组减法 ====================

function canRemoveCard(cardId) {
    const deck = gameState.player.deck;
    const cardData = CARD_DB[cardId] || CARD_DB[cardId.replace('_upgraded', '')];
    if (!cardData) return true;
    const attackCount = deck.filter(id => {
        const c = CARD_DB[id] || CARD_DB[id.replace('_upgraded', '')];
        return c && c.type === 'attack';
    }).length;
    const defenseCount = deck.filter(id => {
        const c = CARD_DB[id] || CARD_DB[id.replace('_upgraded', '')];
        return c && c.type === 'defense';
    }).length;
    if (cardData.type === 'attack' && attackCount <= 3) return false;
    if (cardData.type === 'defense' && defenseCount <= 2) return false;
    return true;
}

function removeCardFromDeck(cardId) {
    const idx = gameState.player.deck.indexOf(cardId);
    if (idx >= 0) {
        gameState.player.deck.splice(idx, 1);
        gameState.stats.cardsRemoved = (gameState.stats.cardsRemoved || 0) + 1;
        // 休息节点移除计数
        if (document.getElementById('rest-screen') && document.getElementById('rest-screen').classList.contains('active')) {
            gameState.removeCount++;
        }
        try { playSFX(SFX_TYPES.card_remove); } catch(e) {}
        return true;
    }
    return false;
}

function showRemoveCardModal() {
    // P1 修复:休息节点免费移除次数限制
    const isFromRest = document.getElementById('rest-screen') && document.getElementById('rest-screen').classList.contains('active');
    if (isFromRest && gameState.removeCount >= 1) {
        alert('本局在休息处的免费移除已使用完毕。\n\n可以在商店花费金币继续移除卡牌。');
        return;
    }

    if (gameState.player.deck.length <= 5) {
        alert('牌组已是最小规模(5 张),无法继续移除。');
        return;
    }
    const modal = document.getElementById('deck-modal');
    const deckList = document.getElementById('deck-list');
    if (!modal || !deckList) return;

    const cardCounts = {};
    gameState.player.deck.forEach(id => { cardCounts[id] = (cardCounts[id] || 0) + 1; });
    deckList.innerHTML = '';
    const typeGroups = { attack: '\u2694\ufe0f 攻击', skill: '\u2728 技能', defense: '\ud83d\uddfa\ufe0f 防御' };

    for (const [type, label] of Object.entries(typeGroups)) {
        const groupDiv = document.createElement('div');
        groupDiv.innerHTML = '<h3 style="margin:10px 0 5px;color:#aaa;">' + label + '</h3>';
        const cardsInGroup = [];
        for (const cardId in cardCounts) {
            const baseId = cardId.replace('_upgraded', '');
            const cardData = CARD_DB[baseId];
            if (cardData && cardData.type === type) {
                cardsInGroup.push({ id: cardId, baseId, count: cardCounts[cardId], data: cardData, upgraded: cardId.includes('_upgraded') });
            }
        }
        cardsInGroup.forEach(card => {
            const canRemove = canRemoveCard(card.id);
            const cardEl = document.createElement('div');
            cardEl.className = 'card ' + card.data.type;
            cardEl.style.opacity = canRemove ? '1' : '0.4';
            cardEl.style.pointerEvents = canRemove ? 'auto' : 'none';
            cardEl.style.cursor = canRemove ? 'pointer' : 'default';
            cardEl.innerHTML = '<div class="card-cost">' + card.data.cost + '</div>' +
                '<div class="card-icon">' + cardIconHTML(card.baseId, card.data) + '</div>' +
                '<div class="card-name">' + card.data.name + (card.upgraded ? ' \u2605' : '') + '</div>' +
                '<div class="card-desc">' + card.data.desc + '</div>' +
                '<div style="position:absolute;top:4px;right:6px;font-size:0.7em;color:#f0c040;">x' + card.count + '</div>' +
                (canRemove ? '' : '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:0.6em;color:#e94560;white-space:nowrap;">\u4e0d\u53ef\u79fb\u9664</div>');
            if (canRemove) {
                cardEl.addEventListener('click', () => {
                    if (confirm('\u786e\u5b9a\u79fb\u9664\u300c' + card.data.name + '\u300d\u5417\uff1f\u6b64\u64cd\u4f5c\u4e0d\u53ef\u64a4\u9500\u3002')) {
                        removeCardFromDeck(card.id);
                        showFloatingText('\u2700\ufe0f \u5df2\u79fb\u9664', document.querySelector('#rest-screen'), '#e94560');
                        showRemoveCardModal();
                    }
                });
            }
            groupDiv.appendChild(cardEl);
        });
        deckList.appendChild(groupDiv);
    }
    const info = document.createElement('p');
    info.style.cssText = 'text-align:center;margin-top:15px;color:#888;font-size:0.85em;';
    info.textContent = '\u70b9\u51fb\u8981\u79fb\u9664\u7684\u5361\u7247\uff08\u653b\u51fb\u5361\u81f3\u5c11\u4fdd\u7559 3 \u5f20\uff0c\u9632\u5fa1\u5361\u81f3\u5c11\u4fdd\u7559 2 \u5f20\uff09';
    deckList.appendChild(info);
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '\u5b8c\u6210';
    closeBtn.className = 'btn-small primary';
    closeBtn.style.cssText = 'display:block;margin:15px auto;padding:8px 30px;';
    closeBtn.addEventListener('click', () => { modal.classList.remove('active'); });
    deckList.appendChild(closeBtn);
    modal.classList.add('active');
}

function shopRemoveCard() {
    // 商店移除需要 15 金币
    if (gameState.player.gold < 15) {
        alert('移除卡牌需要 15 金币!');
        return;
    }
    if (gameState.player.deck.length <= 5) {
        alert('牌组已是最小规模(5 张),无法继续移除。');
        return;
    }
    if (!confirm('确定花费 15 金币移除卡牌吗?')) {
        return;
    }
    gameState.player.gold -= 15;
    showRemoveCardModal();
}


function restHeal() {
    // P2: A6 无休息
    if (!shouldRestHeal()) {
        alert('⚠️ 进阶挑战 A6:休息处无法恢复生命');
        showScreen('map-screen');
        generateMap();
        return;
    }

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
        alert('你还没有可以升级的卡牌!先获得一些新卡牌吧。');
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
            <div class="card-icon">${cardIconHTML(cardId, cardData)}</div>
            <div class="card-name">${cardData.name}</div>
            <div class="card-desc">${cardData.desc}</div>
            <div style="position: absolute; top: 5px; right: 5px; background: #e94560; padding: 2px 6px; border-radius: 10px; font-size: 0.7em;">x${count}</div>
        `;
        cardEl.addEventListener('click', () => {
            // P1 修复:锻造时二选一--升级或移除
            const choose = prompt(
                '选择操作:\n\n1 = 升级卡牌(消耗金币)\n2 = 移除卡牌(免费,不可撤销)\n\n输入 1 或 2:',
                '1'
            );
            if (choose === '2') {
                // 移除
                const canRemove = canRemoveCard(cardId);
                if (!canRemove) {
                    alert('该卡牌不可移除(需要保留最低数量)');
                    return;
                }
                if (confirm('确定移除「' + cardData.name + '」吗?此操作不可撤销。')) {
                    removeCardFromDeck(cardId);
                    showFloatingText('✦ 已移除', document.querySelector('#rest-screen'), '#e94560');
                    hideDeckModal();
                    restUpgrade(); // 刷新列表
                }
            } else {
                // 升级
                upgradeCard(cardId);
            }
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
        // 0 费卡牌升级:增强效果而不是降低费用
        if (upgradedEffect.damage) {
            // 有伤害效果的卡牌:增加 2-4 点伤害
            upgradedEffect.damage += 3;
            upgradedDesc = `${cardData.desc}(伤害 +3)`;
        } else if (upgradedEffect.draw) {
            // 有抽牌效果的卡牌:增加 1 张抽牌
            upgradedEffect.draw += 1;
            upgradedDesc = `${cardData.desc}(抽牌 +1)`;
        } else if (upgradedEffect.energy) {
            // 有能量效果的卡牌:增加 1 点能量
            upgradedEffect.energy += 1;
            upgradedDesc = `${cardData.desc}(能量 +1)`;
        } else if (upgradedEffect.hpCost && upgradedEffect.energy) {
            // 放血牌:减少生命代价或增加能量
            upgradedEffect.energy += 1;
            upgradedDesc = `${cardData.desc}(能量 +1)`;
        } else {
            // 其他情况:通用增强
            upgradedDesc = `${cardData.desc}(效果增强)`;
        }
    } else {
        // 非 0 费卡牌:降低费用
        upgradedEffect = { ...cardData.effect };
        upgradedDesc = `${cardData.desc}(费用 -1)`;
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

    // 📚 收藏图鉴:记录升级卡到收藏
    const knownCardsUp = JSON.parse(localStorage.getItem('dungeonCardKnownCards') || '[]');
    if (!knownCardsUp.includes(upgradedCardId)) {
        knownCardsUp.push(upgradedCardId);
        localStorage.setItem('dungeonCardKnownCards', JSON.stringify(knownCardsUp));
    }

    // 永恒羽毛效果
    if (gameState.player.relics.includes('eternal_feather')) {
        healPlayer(3);
    }

    hideDeckModal();

    // 使用 alert 提示锻造结果
    const costText = isZeroCost
        ? `费用:${cardData.cost}(保持 0 费)`
        : `费用:${cardData.cost} -> ${CARD_DB[upgradedCardId].cost}`;

    alert('锻造成功!\n\n' + cardData.name + ' -> ' + CARD_DB[upgradedCardId].name + '\n' + costText + '\n' + CARD_DB[upgradedCardId].desc);

    setTimeout(() => {
        showScreen('map-screen');
        generateMap();
    }, 500);
}

// ==================== 事件系统 ====================

function openEvent() {
    const event = selectEventByWeight();

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
            // 🗝️ 诅咒钥匙效果:持有诅咒钥匙时,宝箱变成诅咒
            if (gameState.player.relics.includes('cursed_key')) {
                const curseEffects = [
                    { msg: '诅咒!-5 最大生命', apply: () => { gameState.player.maxHp -= 5; gameState.player.hp -= 5; } },
                    { msg: '诅咒!下回合抽牌 -2', apply: () => { gameState.battle.noDraw = true; } },
                    { msg: '诅咒!-15 生命', apply: () => { gameState.player.hp -= 15; } },
                    { msg: '诅咒!失去 1 个遗物', apply: () => { if (gameState.player.relics.length > 0) { const lost = gameState.player.relics.pop(); alert('🗝️ 诅咒钥匙生效!你失去了遗物:' + RELIC_DB[lost].name); } } },
                ];
                const curse = curseEffects[randomInt(0, curseEffects.length - 1)];
                curse.apply();
                if (curse.msg !== '诅咒!失去 1 个遗物') {
                    alert('🗝️ 诅咒钥匙生效!宝箱变成了诅咒...\n\n' + curse.msg);
                }
            } else {
                if (Math.random() < 0.7) {
                    const relicId = Object.keys(RELIC_DB)[randomInt(0, Object.keys(RELIC_DB).length - 1)];
                    const relicData = RELIC_DB[relicId];
                    addRelic(relicId);
                    alert('🎉 打开宝箱获得遗物:' + relicData.name + '!\n\n' + relicData.desc);
                } else {
                    gameState.player.hp -= 10;
                    alert('宝箱是陷阱!-10 生命');
                }
            }
            break;
        case 'altar_sacrifice':
            // 献祭 10 点最大生命
            const oldMaxHp = gameState.player.maxHp;
            gameState.player.maxHp -= 10;

            // 如果当前血量超过新的最大血量,同步降低当前血量
            if (gameState.player.hp > gameState.player.maxHp) {
                gameState.player.hp = gameState.player.maxHp;
            }

            const relicId1 = Object.keys(RELIC_DB)[randomInt(0, Object.keys(RELIC_DB).length - 1)];
            const relicData1 = RELIC_DB[relicId1];
            addRelic(relicId1);

            alert(`🎉 献祭成功!\n\n最大生命:${oldMaxHp} → ${gameState.player.maxHp}\n\n获得遗物:${relicData1.name}!\n\n${relicData1.desc}`);
            break;
        case 'altar_pray':
            healPlayer(20);
            alert('祈祷成功!+20 生命');
            break;
        case 'merchant_buy':
            if (gameState.player.gold >= choice.gold) {
                gameState.player.gold -= choice.gold;
                const relicId2 = Object.keys(RELIC_DB)[randomInt(0, Object.keys(RELIC_DB).length - 1)];
                const relicData2 = RELIC_DB[relicId2];
                addRelic(relicId2);
                alert('🎉 购买成功!获得遗物:' + relicData2.name + '!\n\n' + relicData2.desc);
            } else {
                alert('金币不足!');
                return;
            }
            break;
        case 'merchant_steal':
            if (Math.random() < 0.6) {
                const relicId3 = Object.keys(RELIC_DB)[randomInt(0, Object.keys(RELIC_DB).length - 1)];
                const relicData3 = RELIC_DB[relicId3];
                addRelic(relicId3);
                alert('🎉 偷窃成功!获得遗物:' + relicData3.name + '!\n\n' + relicData3.desc);
            } else {
                gameState.player.hp -= 15;
                alert('偷窃失败!被发现了!-15 生命');
            }
            break;
        case 'fountain_drink':
            healPlayer(Math.floor(gameState.player.maxHp * 0.3));
            alert('泉水治愈了你!恢复了 ' + Math.floor(gameState.player.maxHp * 0.3) + ' 点生命');
            break;
        case 'fountain_fill':
            if (gameState.player.potions.length < getPotionCap()) {
                gameState.player.potions.push('health_potion');
                alert('获得生命药水!');
            } else {
                alert('药水栏已满!');
                return;
            }
            break;
        case 'fountain_listen':
            gameState.player.maxEnergy = (gameState.player.maxEnergy || 3) + 1;
            alert('聆听泉水回响...\n\n最大能量 +1!');
            break;
        case 'veteran_train': addCardToDeck(getRandomRareCard()); alert('⚔️ 老兵传授了战斗技巧!获得 1 张稀有卡牌'); break;
        case 'veteran_weapon': gameState.player.hp = Math.max(1, gameState.player.hp - 15); addRelic(getWeightedRelic(gameState.player.relics)); alert('🗡️ 获得武器,但失去 15 点生命'); break;
        case 'curse_statue_touch': addRelic(getWeightedRelic(gameState.player.relics)); gameState.player.maxHp = Math.max(10, gameState.player.maxHp - 5); gameState.player.hp = Math.min(gameState.player.hp, gameState.player.maxHp); alert('🗿 触碰雕像获得遗物,最大生命 -5'); break;
        case 'curse_statue_fight': addRelic(getWeightedRelic(gameState.player.relics)); gameState.player.gold += randomInt(20, 40); alert('⚔️ 摧毁雕像!获得遗物和金币'); break;
        case 'gamble_dice': { const d2 = randomInt(1, 6); if (d2 <= 2) { gameState.player.gold += 50; alert('🎲 掷出 ' + d2 + ',获得 50 金币!'); } else if (d2 <= 4) { addRelic(getWeightedRelic(gameState.player.relics)); alert('🎲 掷出 ' + d2 + ',获得 1 个遗物!'); } else { gameState.player.gold = Math.max(0, gameState.player.gold - 20); alert('🎲 掷出 ' + d2 + ',失去 20 金币...'); } break; }
        case 'secret_room': addCardToDeck(getRandomRareCard()); addCardToDeck(getRandomRareCard()); addRelic(getWeightedRelic(gameState.player.relics)); alert('🚪 进入密室!获得丰厚奖励'); break;
        case 'fate_door': if (Math.random() < 0.5) { addRelic(getWeightedRelic(gameState.player.relics, 'rare')); alert('✨ 打开命运之门!获得稀有遗物!'); } else { gameState.player.hp = Math.max(1, Math.floor(gameState.player.hp * 0.7)); alert('✨ 打开命运之门...失去 30% 生命'); } break;
        case 'healer_pay': if (gameState.player.gold >= 30) { gameState.player.gold -= 30; gameState.player.hp = Math.min(gameState.player.maxHp, Math.floor(gameState.player.maxHp * 0.5 + gameState.player.hp)); alert('💊 支付 30 金币,恢复了大量生命'); } else alert('💊 金币不足!'); break;
        case 'healer_relic': if (gameState.player.relics.length > 0) { gameState.player.relics.pop(); gameState.player.hp = gameState.player.maxHp; alert('💊 用遗物换取完全治疗'); } else alert('💊 没有可交易的遗物'); break;
        case 'dummy_upgrade': restUpgrade(); return;
        case 'alchemy_potion': if (gameState.player.gold >= 20) { gameState.player.gold -= 20; const pids = Object.keys(POTION_DB); gameState.player.potions.push(pids[randomInt(0, pids.length - 1)]); alert('⚗️ 消耗 20 金币,获得 1 个药水'); } else alert('⚗️ 金币不足!'); break;
        case 'alchemy_upgrade': if (gameState.player.potions.length > 0) { const idx = gameState.player.potions.length - 1; const upgraded = gameState.player.potions[idx] + '_upgraded'; gameState.player.potions[idx] = upgraded; alert('⚗️ 药水升级成功!效果翻倍'); } else alert('⚗️ 没有可升级的药水'); break;
        case 'inscription_read': gameState.player.stats.strength += 1; alert('📜 阅读古代铭文,力量 +1'); break;
        case 'death_book_write': addCardToDeck(getRandomRareCard()); gameState.player.maxHp = Math.max(10, gameState.player.maxHp - 10); gameState.player.hp = Math.min(gameState.player.hp, gameState.player.maxHp); alert('📖 写下名字,获得强力卡牌,最大生命 -10'); break;
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
            <div class="card-cost"><span>${cardData.cost}</span></div>
            <div class="card-rarity ${cardData.rarity || 'common'}"></div>
            <div class="card-icon">${cardIconHTML(cardId, cardData)}</div>
            <div class="card-name">${cardData.name}</div>
            <div class="card-desc">${cardData.desc}</div>
            ${count > 1 ? `<div class="deck-card-count">x${count}</div>` : ''}
        `;
        deckList.appendChild(cardEl);
    });

    document.getElementById('deck-modal').classList.add('active');
}

function hideDeckModal() {
    document.getElementById('deck-modal').classList.remove('active');
}

// ==================== 统计界面 ====================

// ==================== 收藏图鉴 ====================
function showCollectionPanel() {
    try {
        const list = document.getElementById('collection-list');
        const progress = document.getElementById('collection-progress');
        const panel = document.getElementById('collection-panel');

    // 统计
    const allCardIds = Object.keys(CARD_DB);
    const allRelicIds = Object.keys(RELIC_DB);
    const knownCards = new Set(JSON.parse(localStorage.getItem('dungeonCardKnownCards') || '[]'));
    const knownRelics = new Set(JSON.parse(localStorage.getItem('dungeonCardKnownRelics') || '[]'));

    const cardProgress = `${knownCards.size}/${allCardIds.length} (${Math.round(knownCards.size / allCardIds.length * 100)}%)`;
    const relicProgress = `${knownRelics.size}/${allRelicIds.length} (${Math.round(knownRelics.size / allRelicIds.length * 100)}%)`;
    progress.textContent = `卡牌:${cardProgress} | 遗物:${relicProgress}`;

    list.innerHTML = '';

    // 按类型分组合并卡牌
    const categories = {
        attack: { title: '⚔️ 攻击卡牌', items: [] },
        skill: { title: '✨ 技能卡牌', items: [] },
        defense: { title: '🛡️ 防御卡牌', items: [] },
    };

    allCardIds.forEach(id => {
        const card = CARD_DB[id];
        if (!card) return;
        const unlocked = knownCards.has(id);
        const cat = categories[card.type];
        if (cat) cat.items.push({ id, ...card, unlocked });
    });

    Object.values(categories).forEach(cat => {
        const catEl = document.createElement('div');
        catEl.className = 'collection-category';
        catEl.innerHTML = `<div class="collection-category-title">${cat.title}</div>`;
        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'collection-items';
        cat.items.forEach(item => {
            const el = document.createElement('div');
            el.className = `collection-item ${item.unlocked ? 'unlocked' : 'locked'}`;
            el.innerHTML = `
                <div class="collection-item-icon">${item.unlocked ? item.icon : '❓'}</div>
                <div class="collection-item-info">
                    <div class="collection-item-name">${item.unlocked ? item.name : '未解锁'}</div>
                    <div class="collection-item-desc">${item.unlocked ? item.desc : '继续冒险来解锁'}</div>
                </div>
            `;
            itemsGrid.appendChild(el);
        });
        catEl.appendChild(itemsGrid);
        list.appendChild(catEl);
    });

    // 遗物部分
    const relicCat = document.createElement('div');
    relicCat.className = 'collection-category';
    relicCat.innerHTML = `<div class="collection-category-title">🏺 遗物</div>`;
    const relicGrid = document.createElement('div');
    relicGrid.className = 'collection-items';
    allRelicIds.forEach(id => {
        const relic = RELIC_DB[id];
        if (!relic) return;
        const unlocked = knownRelics.has(id);
        const el = document.createElement('div');
        el.className = `collection-item ${unlocked ? 'unlocked' : 'locked'}`;
        el.innerHTML = `
            <div class="collection-item-icon">${unlocked ? relicIconHTML(id, relic) : '❓'}</div>
            <div class="collection-item-info">
                <div class="collection-item-name">${unlocked ? relic.name : '未解锁'}</div>
                <div class="collection-item-desc">${unlocked ? relic.desc : '继续冒险来解锁'}</div>
            </div>
        `;
        relicGrid.appendChild(el);
    });
    relicCat.appendChild(relicGrid);
    list.appendChild(relicCat);

        panel.classList.add('show');
    } catch (err) {
        console.error('[ERROR] showCollectionPanel:', err);
    }
}

// ==================== 成就系统 ====================
function showAchievementsPanel() {
    try {
        const list = document.getElementById('achievements-list');
        const countEl = document.getElementById('achievement-count');
        const panel = document.getElementById('achievements-panel');

    const achievements = [
        { id: 'first_blood', name: '初次击杀', desc: '击败第一个敌人', icon: '⚔️', check: () => parseInt(localStorage.getItem('dungeonCardTotalKills') || '0') >= 1 },
        { id: 'ten_kills', name: '十面埋伏', desc: '累计击杀 10 个敌人', icon: '💀', check: () => parseInt(localStorage.getItem('dungeonCardTotalKills') || '0') >= 10 },
        { id: 'fifty_kills', name: '百战百胜', desc: '累计击杀 50 个敌人', icon: '🏆', check: () => parseInt(localStorage.getItem('dungeonCardTotalKills') || '0') >= 50 },
        { id: 'first_win', name: '初次胜利', desc: '通关一次游戏', icon: '🎉', check: () => parseInt(localStorage.getItem('dungeonCardGamesWon') || '0') >= 1 },
        { id: 'gold_hoarder', name: '守财奴', desc: '单局获得 100 金币', icon: '💰', check: () => gameState.stats.maxGold >= 100 },
        { id: 'rich', name: '腰缠万贯', desc: '单局获得 300 金币', icon: '💎', check: () => gameState.stats.maxGold >= 300 },
        { id: 'big_hitter', name: '强力一击', desc: '单次造成 30 点以上伤害', icon: '💥', check: () => gameState.stats.maxSingleDamage >= 30 },
        { id: 'tank', name: '铜墙铁壁', desc: '单回合获得 40 点以上格挡', icon: '🛡️', check: () => gameState.stats.maxBlock >= 40 },
        { id: 'full_hp', name: '满血通关', desc: '满血通关 Boss 战', icon: '❤️', check: () => gameState.stats.perfectClears >= 1 },
        { id: 'speed_run', name: '速通达人', desc: '15 回合内通关', icon: '⚡', check: () => gameState.stats.fastestClear <= 15 },
        { id: 'collector', name: '收藏家', desc: '单局收集 10 个遗物', icon: '🏺', check: () => gameState.stats.relicsCollected >= 10 },
        { id: 'relic_hunter', name: '遗物猎人', desc: '发现 5 个不同遗物', icon: '🔍', check: () => JSON.parse(localStorage.getItem('dungeonCardKnownRelics') || '[]').length >= 5 },
        { id: 'card_master', name: '卡牌大师', desc: '发现 20 张不同卡牌', icon: '🃏', check: () => JSON.parse(localStorage.getItem('dungeonCardKnownCards') || '[]').length >= 20 },
        { id: 'decker', name: '牌组精简', desc: '移除 5 张卡牌', icon: '✂️', check: () => gameState.stats.cardsRemoved >= 5 },
        { id: 'potion_lover', name: '药水爱好者', desc: '单局使用 5 瓶药水', icon: '🧪', check: () => gameState.stats.potionsUsed >= 5 },
        { id: 'floor_2', name: '深入探索', desc: '到达第 2 层', icon: '🗺️', check: () => gameState.stats.maxFloor >= 2 },
        { id: 'floor_3', name: '深渊探索', desc: '到达第 3 层', icon: '🔥', check: () => gameState.stats.maxFloor >= 3 },
        { id: 'five_wins', name: '连战连胜', desc: '累计通关 5 次', icon: '🏅', check: () => parseInt(localStorage.getItem('dungeonCardGamesWon') || '0') >= 5 },
        { id: 'ten_wins', name: '地牢专家', desc: '累计通关 10 次', icon: '👑', check: () => parseInt(localStorage.getItem('dungeonCardGamesWon') || '0') >= 10 },
        { id: 'no_damage', name: '完美主义', desc: '整局未受任何伤害', icon: '✨', check: () => gameState.stats.noDamageRuns >= 1 },
        { id: 'legendary_finder', name: '传说猎人', desc: '发现 1 个传说遗物', icon: '⭐', check: () => gameState.stats.legendaryRelics >= 1 },
        { id: 'all_legendary', name: '传说收集者', desc: '发现所有传说遗物', icon: '🌟', check: () => gameState.stats.legendaryRelics >= Object.values(RELIC_DB).filter(r => r.rarity === 'legendary').length },
        { id: 'thirty_kills', name: '地牢清道夫', desc: '单局击杀 30 个敌人', icon: '☠️', check: () => gameState.stats.enemiesKilled >= 30 },
        { id: 'fifty_kills_run', name: '大屠杀', desc: '单局击杀 50 个敌人', icon: '🩸', check: () => gameState.stats.enemiesKilled >= 50 },
        { id: 'max_deck', name: '牌组达人', desc: '牌组达到 40 张', icon: '📚', check: () => gameState.stats.maxDeckSize >= 40 },
        { id: 'small_deck', name: '精兵简政', desc: '牌组少于 10 张通关', icon: '🎯', check: () => gameState.stats.smallDeckWin >= 1 },
        { id: 'big_heal', name: '起死回生', desc: '单次治疗 30 点以上', icon: '💚', check: () => gameState.stats.maxHeal >= 30 },
        { id: 'boss_slayer', name: 'Boss 杀手', desc: '击败 10 个 Boss', icon: '👹', check: () => gameState.stats.bossesKilled >= 10 },
        { id: 'elite_slayer', name: '精英猎手', desc: '击败 20 个精英', icon: '⚡', check: () => gameState.stats.elitesKilled >= 20 },
        { id: 'twenty_five_wins', name: '传奇冒险家', desc: '累计通关 25 次', icon: '🏆', check: () => parseInt(localStorage.getItem('dungeonCardGamesWon') || '0') >= 25 },
        { id: 'max_floor_5', name: '终极深渊', desc: '到达第 5 层', icon: '🌋', check: () => gameState.stats.maxFloor >= 5 }
    ];

    let unlockedCount = 0;
    list.innerHTML = '';

    achievements.forEach(a => {
        const unlocked = a.check();
        if (unlocked) unlockedCount++;
        const el = document.createElement('div');
        el.className = `collection-item ${unlocked ? 'unlocked' : 'locked'}`;
        el.innerHTML = `
            <div class="collection-item-icon">${unlocked ? a.icon : '🔒'}</div>
            <div class="collection-item-info">
                <div class="collection-item-name">${a.name}</div>
                <div class="collection-item-desc">${a.desc}</div>
            </div>
        `;
        list.appendChild(el);
    });

    countEl.textContent = unlockedCount;
    panel.classList.add('show');
        panel.style.pointerEvents = 'auto';
    } catch (err) {
        console.error('[ERROR] showAchievementsPanel:', err);
    }
}

// ==================== 更新日志 ====================
function showChangelogPanel() {
    try {
        const list = document.getElementById('changelog-list');
        const panel = document.getElementById('changelog-panel');

const entries = [
    {
        version: 'v3.2.0',
        date: '2026-07-08',
        type: 'minor',
        title: '🎨 界面美化与全面响应式适配',
        changes: [
            { type: 'add', text: '<span class="changelog-highlight">全面响应式布局</span>:使用 clamp() 流式适配，支持从手机到桌面的全分辨率自适应' },
            { type: 'add', text: '<span class="changelog-highlight">战斗界面紧凑化</span>:缩小怪物区与玩家区间隔、血条与怪物间距，提升可视空间' },
            { type: 'add', text: '<span class="changelog-highlight">字体统一</span>:全局统一为微软雅黑，移除 Cinzel / JetBrains Mono 外链字体，减少首屏加载' },
            { type: 'add', text: '战斗页面非卡牌字号提升：楼层标识、怪物名称、血量数字、战斗日志等均适当调大' },
            { type: 'add', text: '地牢地图第一排信息字号统一（血量、金币、楼层、按钮）' },
            { type: 'add', text: '卡牌尺寸与内边距缩小，同屏展示更多手牌' },
            { type: 'add', text: '地牢地图节点、行间距、手牌区高度均支持响应式缩放' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">怪物血条样式不生效</span> 的问题（class 名称不匹配）' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">地牢进度条</span> 初始显示 0/0 节点的问题（已移除进度条）' },
            { type: 'remove', text: '移除首页最高分显示' }
        ]
    },
    {
        version: 'v3.1.0',
        date: '2026-07-08',
        type: 'minor',
        title: '🎮 三职业完整实装与遗物系统补全',
        changes: [
            { type: 'add', text: '<span class="changelog-highlight">游侠</span>职业完整上线:精准叠加核心机制 + 12 张专属卡牌(精准射击、布置陷阱、猎杀时刻等)+ 专属遗物 3 件' },
            { type: 'add', text: '<span class="changelog-highlight">死灵法师</span>职业完整上线:灵魂碎片系统 + 献血机制 + 12 张专属卡牌(白骨护盾、灵魂链接、冥界行者等)+ 专属遗物 3 件' },
            { type: 'add', text: '<span class="changelog-highlight">召唤师</span>职业完整上线:召唤物槽位管理 + 强化系统 + 12 张专属卡牌(幽灵狼、凤凰、治疗之花等)+ 专属遗物 3 件' },
            { type: 'add', text: '<span class="changelog-highlight">敌人标签系统</span>:亡灵/恶魔敌人标记,支持遗物联动' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">黑曜石遗物</span> 效果未生效的问题(暗影牌对亡灵/恶魔敌人 +5 伤害)' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">狼王图腾遗物</span> 效果未生效的问题(影狼召唤物额外施加 1 层虚弱)' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">狙击镜遗物</span> 效果未接入出牌费用计算的问题' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">敌人格挡</span> 每回合未重置导致的无限累积问题' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">职业图标</span> 在战斗界面未覆盖三职业的问题' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">双重打击</span> 卡牌定义重复的问题' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">敌人跳过攻击</span> 分支闭合导致的攻击判定异常' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">侦察/疾行</span> 卡牌 nextDraw/nextEnergy 效果未接入回合开始的问题' },
            { type: 'optimization', text: '战斗 UI 显示职业图标完整覆盖全部 8 个职业' },
            { type: 'optimization', text: '三职业专属遗物全部接入战斗效果' }
        ]
    },
    {
        version: 'v3.0.0',
        date: '2026-07-07',
        type: 'major',
        title: '🏆 进阶挑战与深度玩法',
        changes: [
            { type: 'add', text: '<span class="changelog-highlight">进阶挑战系统</span>:12 个可自由开关的减益挑战,增加重玩价值' },
            { type: 'add', text: 'A1 减益持久:虚弱/易伤效果持续 +1 回合' },
            { type: 'add', text: 'A2 敌人强化:敌人获得 +2 伤害' },
            { type: 'add', text: 'A3 能量削减:每回合能量 -1(最低 1)' },
            { type: 'add', text: 'A4 牌库惩罚:基础牌组额外添加 2 张打击' },
            { type: 'add', text: 'A5 商店涨价:商品价格 +25%' },
            { type: 'add', text: 'A6 无休息:休息处不恢复生命' },
            { type: 'add', text: 'A7 诅咒起手:每场战斗开始时获得 1 张诅咒牌' },
            { type: 'add', text: 'A8 精英强化:精英敌人 HP +20%' },
            { type: 'add', text: 'A9 药水失效:战药物有 20% 概率失效' },
            { type: 'add', text: 'A10 抽牌减少:每回合抽牌数 -1(最低 3)' },
            { type: 'add', text: 'A11 Boss 狂暴:Boss 额外获得 20% 最大生命' },
            { type: 'add', text: 'A12 <span class="changelog-highlight">资源匮乏</span>:起始金币减半,药水上限 -1' },
            { type: 'add', text: '<span class="changelog-highlight">每日挑战</span>:每天固定种子 + 固定职业,通关后可分享种子' },
            { type: 'add', text: '<span class="changelog-highlight">关键词系统</span>:火焰、冰霜、闪电、剧毒、圣光、连击、背刺 7 种关键词' },
            { type: 'add', text: '火焰路线:火焰冲击、燃烧、烈焰风暴、熔岩护甲(火焰联动)' },
            { type: 'add', text: '毒物路线:剧毒之刃、毒雾、解药、毒素爆发(毒层联动)' },
            { type: 'add', text: '连击路线:组合拳、旋风腿、冥想、终结技(连击计数)' },
            { type: 'add', text: '关键词遗物:熔岩核心(火焰牌费用 -1)、冰之心(冰霜额外虚弱)、圣光徽章(神圣牌 +5 伤害)、连环珠(连击 +1)' },
            { type: 'add', text: '关键词徽章:手牌和奖励牌上显示对应的关键词 emoji 标识' },
            { type: 'add', text: '<span class="changelog-highlight">卡牌稀有度系统</span>:普通、稀有、史诗三级,影响奖励获取概率' },
            { type: 'add', text: '<span class="changelog-highlight">楼层进度条</span>:地图界面实时显示当前层进度(已走节点 / 总节点)' },
            { type: 'add', text: '新职业:游侠(精准叠加)、死灵法师(灵魂碎片)、召唤师(召唤作战)' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">飞踢卡牌</span> 缺失连击关键词的问题' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">看见红色</span>(seeing_red)卡牌 shuffle 逻辑' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">遗物页面返回按钮</span> 无法返回的问题(CSS 类 + 事件绑定)' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">首页按钮</span> 样式不统一的问题(尺寸、字体、圆角、间距)' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">进阶/每日挑战按钮</span> hover 闪烁问题' },
            { type: 'optimization', text: '进阶面板增加一键全选 / 全部取消功能' },
            { type: 'optimization', text: '所有 Boss 二阶段切换视觉特效统一化' },
            { type: 'optimization', text: '战斗日志增加关键词和稀有度相关信息' },
            { type: 'optimization', text: '核心战斗流程增加 try-catch 保护,防止单点崩溃' }
        ]
    },
    {
        version: 'v2.0.3',
        date: '2026-07-03',
        type: 'patch',
        title: '🔧 细节优化与 Bug 修复',
        changes: [
            { type: 'fix', text: '修复 <span class="changelog-highlight">狂暴药水</span> +5 力量永久生效的问题,改为持续 3 回合后自动衰减' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">层进度条</span> 节点数硬编码导致进度显示不准确的问题,改为动态读取实际节点数' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">本局用时统计</span> 少算第一场比赛前时间的问题,计时起点提前到开局' },
            { type: 'optimization', text: '狂暴药水效果跨战斗隔离:每场战斗开始时重置 berserkTurns' },
            { type: 'optimization', text: '进度条增加除零保护,极端情况下不会出现 NaN' }
        ]
    },
    {
        version: 'v2.0.2',
        date: '2026-07-03',
        type: 'patch',
        title: '🔧 核心功能修复',
        changes: [
            { type: 'fix', text: '修复 <span class="changelog-highlight">damageEnemy()</span> 中引用未定义变量 targets 导致的崩溃' },
            { type: 'fix', text: '修复 <span class="changelog-highlight">startBattle()</span> 中 enemy.phase2 引用未定义变量' },
            { type: 'fix', text: '重构战斗初始化:统一使用 gameState.battle.enemy 对象结构' },
            { type: 'fix', text: '修复精英战斗缺少 4/5 层敌人类型(补充毒蛛、吸血鬼、骷髅领主、凤凰)' },
            { type: 'fix', text: '修复精英战斗重复创建敌人对象的冗余代码' },
            { type: 'fix', text: '修复 Boss 二阶段触发逻辑与意图系统未对齐的问题' },
            { type: 'fix', text: '修复事件处理中 fountain_listen action 缩进错误' },
            { type: 'add', text: 'ENEMY_DB 新增 4 种精英敌人,覆盖全部 5 层精英战斗' },
            { type: 'optimization', text: '所有 Boss 二阶段切换时统一视觉特效(色调滤镜 + 震动 + 发光)' },
            { type: 'optimization', text: 'playSFX 调用增加 try-catch 保护,防止音频加载失败阻断流程' }
        ]
    },
    {
        version: 'v2.0.1',
        date: '2026-07-03',
        type: 'patch',
        title: '🐛 难度选择修复',
        changes: [
            { type: 'fix', text: '修复简单和困难难度按钮点击无响应的问题' },
            { type: 'add', text: '难度选择生效:简单模式敌人属性 -20%,困难模式敌人属性 +30%' },
            { type: 'add', text: '难度选择支持存档保存和恢复' }
        ]
    },
    {
        version: 'v2.0.0',
        date: '2026-07-03',
        type: 'major',
        title: '🎯 玩法大提升',
        changes: [
            { type: 'add', text: '敌人意图系统:战斗前可查看敌人下一回合动作' },
            { type: 'add', text: '6 种意图类型(⚔️ 攻击 / 🔥 重击 / 🛡️ 防御 / 💪 增益 / 📢 召唤 / 🌀 特效)' },
            { type: 'add', text: 'Boss 意图差异化:饕餮牛王、魔平、古老龙、魔平王、上古邪龙各有独特攻击轮换' },
            { type: 'add', text: '事件扩充至 12 个(风险回报、资源交换、故事推进)' },
            { type: 'add', text: '事件选择改为加权随机(考虑楼层)' },
            { type: 'add', text: '新事件:受伤的老兵、禁忌雕像、负伤的高子、隐藏密室、命运之门等' },
            { type: 'add', text: '牌组减法:休息处和商店可移除卡牌(基础牌保护)' },
            { type: 'add', text: 'Boss 二阶段全覆盖:所有 Boss HP < 50% 自动狂暴' },
            { type: 'add', text: '遗物锁机制:锁定遗物防止被覆盖' },
            { type: 'add', text: '元进度系统:跨周目永久加成' },
            { type: 'add', text: '5 种新药水:疯狂药水、诅咒药水、复制药水、万能药水、狂暴药水' },
            { type: 'add', text: '回合计数器:战斗界面实时显示回合数' },
            { type: 'add', text: '成就系统:30 个成就,实时通知' },
            { type: 'add', text: '遗物品级系统:加权随机掉落' },
            { type: 'fix', text: '修复清除进度后继续游戏按钮仍显示问题' },
            { type: 'fix', text: '修复收藏、成就、更新日志按钮无响应' },
            { type: 'fix', text: '修复战斗流程断裂点(5 处)' },
            { type: 'fix', text: '修复 winBattle 异常防护' },
            { type: 'optimization', text: '收集图鉴增加网络登录按钮(快速切换到极其游戏)' }
        ]
    },
    {
        version: 'v1.2.1',
        date: '2026-04-21',
        type: 'patch',
        title: '🐛 卡牌系统优化',
        changes: [
            { type: 'fix', text: '修复<span class="changelog-highlight">祝福卡牌</span>(团队效果改为单人效果)' },
            { type: 'fix', text: '修复<span class="changelog-highlight">背刺技能</span>描述(队友条件改为未受伤条件)' },
            { type: 'optimization', text: '0 费卡牌锻造支持治疗(+2)和格挡(+3)效果增强' },
            { type: 'other', text: '所有卡牌适配单人游戏模式' }
        ]
    },
    {
        version: 'v1.2.0',
        date: '2026-04-21',
        type: 'major',
        title: '🎮 游戏流程大扩展',
        changes: [
            { type: 'add', text: '扩展至<span class="changelog-highlight">5 层地牢</span>,每层不同敌人和 Boss' },
            { type: 'add', text: '地图节点从 12 个扩展到 15-25 个(根据楼层动态调整)' },
            { type: 'add', text: '新增<span class="changelog-highlight">精英守卫</span>和<span class="changelog-highlight">连续战斗</span>特殊战斗类型' },
            { type: 'add', text: '新增 7 个新敌人:毒蜘蛛、吸血鬼、石像鬼、凤凰、巫骑士、巫妖王、上古邪龙' },
            { type: 'add', text: '新增 8 个新遗物和 15 张新卡牌' },
            { type: 'add', text: '新增 2 个新职业:武僧和圣骑士(含专属卡牌/遗物/技能)' },
            { type: 'fix', text: '修复治疗卡牌(冥想、微光治愈、生命药水)不生效的 BUG' },
            { type: 'balance', text: '调整难度曲线,第 1-2 层新手区,第 3-4 层进阶区,第 5 层终局区' },
            { type: 'optimization', text: '游戏总时长从 20-30 分钟延长到 80-100 分钟' },
            { type: 'other', text: '优化首页按钮样式,统一颜色和字体' }
        ]
    },
    {
        version: 'v1.1.0',
        date: '2026-04-20',
        type: 'minor',
        title: '✨ 功能完善与优化',
        changes: [
            { type: 'add', text: '实现完整的收藏系统(卡牌和遗物图鉴)' },
            { type: 'add', text: '添加战斗日志系统,实时记录战斗事件' },
            { type: 'add', text: '实现音效系统(13 种音效,Web Audio API 生成)' },
            { type: 'add', text: '成就系统完善(30 个成就,实时通知)' },
            { type: 'fix', text: '修复收藏面板稀有度颜色显示问题' },
            { type: 'optimization', text: '优化 UI 交互和视觉效果' }
        ]
    },
    {
        version: 'v1.0.0',
        date: '2026-04-15',
        type: 'patch',
        title: '🚀 正式发布',
        changes: [
            { type: 'add', text: '基础游戏框架(地牢楼层、节点地图系统)' },
            { type: 'add', text: '3 个基础职业:战士、法师、盗贼' },
            { type: 'add', text: '45+ 张卡牌,14 个敌人,30 个遗物' },
            { type: 'add', text: '3 级难度系统(简单/普通/困难)' },
            { type: 'add', text: '完整的卡牌构筑和战斗系统' },
            { type: 'other', text: '首次公开发布' }
        ]
    }
];

    list.innerHTML = '';
    entries.forEach(entry => {
        const el = document.createElement('div');
        el.className = 'changelog-entry';
        const changesHtml = entry.changes.map(c => {
            const cls = c.type === 'add' ? 'add' : c.type === 'fix' ? 'fix' : c.type === 'balance' ? 'balance' : 'optimization';
            return `<li class="${cls}">${c.text}</li>`;
        }).join('');
        el.innerHTML = `
            <div class="changelog-header">
                <span class="changelog-version-badge ${entry.type === 'major' ? 'major' : (entry.type === 'minor' ? 'minor' : 'patch')}">${entry.version}</span>
                <span class="changelog-date">${entry.date}</span>
                <span class="changelog-title">${entry.title}</span>
            </div>
            <ul class="changelog-changes">${changesHtml}</ul>
        `;
        list.appendChild(el);
    });

        panel.classList.add('show');
    } catch (err) {
        console.error('[ERROR] showChangelogPanel:', err);
    }
}

function showStatsPanel() {
    const panel = document.getElementById('stats-panel');
    const list = document.getElementById('stats-list');
    const summary = document.getElementById('stats-summary');

    try {
        const stats = {
            gamesPlayed: parseInt(localStorage.getItem('dungeonCardGamesPlayed') || '0'),
            gamesWon: parseInt(localStorage.getItem('dungeonCardGamesWon') || '0'),
            totalKills: parseInt(localStorage.getItem('dungeonCardTotalKills') || '0'),
            highScore: parseInt(localStorage.getItem('dungeonCardHighScore') || '0'),
            cardsAdded: parseInt(localStorage.getItem('dungeonCardTotalCardsAdded') || '0'),
            relicsFound: parseInt(localStorage.getItem('dungeonCardTotalRelicsFound') || '0')
        };

        const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;
        summary.textContent = `胜率 ${winRate}% | 最高分 ${stats.highScore}`;

        list.innerHTML = '';

        const items = [
            { icon: '🎮', label: '总游戏次数', value: stats.gamesPlayed },
            { icon: '🏆', label: '胜利次数', value: stats.gamesWon },
            { icon: '📈', label: '胜率', value: `${winRate}%` },
            { icon: '⚔️', label: '总击杀数', value: stats.totalKills },
            { icon: '💎', label: '最高分', value: stats.highScore },
            { icon: '🃏', label: '总添卡数', value: stats.cardsAdded },
            { icon: '🏺', label: '总遗物数', value: stats.relicsFound }
        ];

        items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'stat-item';
            el.innerHTML = `
                <div class="stat-icon">${item.icon}</div>
                <div class="stat-label">${item.label}</div>
                <div class="stat-value">${item.value}</div>
            `;
            list.appendChild(el);
        });

        panel.classList.add('show');
    } catch (e) {
        console.error('[游戏统计] 渲染失败:', e);
    }
}

// 游戏统计面板关闭
function closeStatsPanel() {
    const panel = document.getElementById('stats-panel');
    if (panel) panel.classList.remove('show');
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
    // 无尽模式：保存最高层数
    if (gameState.mode === 'endless') {
        setEndlessBestFloor(gameState.endlessFloor);
    }

    // 游戏结束(胜利或失败)时清除存档
    clearSave();

    updateGlobalStats(victory);

    const title = document.getElementById('game-over-title');

    // P3: Boss 台词
    let bossDialogue = '';
    if (victory && gameState.battle && gameState.battle.enemy && gameState.battle.enemy.isBoss) {
        const bossType = gameState.battle.enemy.type;
        const hpPercent = (gameState.player.hp / gameState.player.maxHp) * 100;
        const taunts = BOSS_TAUNTS[bossType];
        if (taunts) {
            if (hpPercent >= 100 && taunts.perfect) bossDialogue = taunts.perfect;
            else if (hpPercent >= 70 && taunts.high) bossDialogue = taunts.high;
            else if (hpPercent >= 30 && taunts.mid) bossDialogue = taunts.mid;
            else bossDialogue = taunts.low;
        }
    }

    // P3: 结局分支
    const difficulty = gameState.difficulty || 'normal';
    const hpPercent = (gameState.player.hp / gameState.player.maxHp) * 100;
    const sessionStats = gameState.sessionStats || { totalTurns: 0, startTime: Date.now() };
    const totalTurns = sessionStats.totalTurns || 0;

    let endingTitle = '', endingText = '';
    if (victory) {
        if (hpPercent >= 100 && difficulty === 'hard' && gameState.player.relics.length >= 8) {
            endingTitle = '👑 完美结局';
            endingText = '你不仅是幸存者,你是传奇。满血通关困难模式,你的故事将被写入历史。光明重新照耀地牢,王国为你庆祝。';
        } else if (difficulty === 'hard' && hpPercent > 50) {
            endingTitle = '✨ 光明结局';
            endingText = '你以顽强的意志摧毁了最终的邪恶。光明重新照进了地牢。整个王国庆祝你的归来。';
        } else if (totalTurns > 0 && totalTurns < 50) {
            endingTitle = '⚡ 速通结局';
            endingText = '你如闪电般穿过地牢。敌人还没来得及反应,一切就结束了。效率就是力量。';
        } else {
            endingTitle = '🏆 胜利';
            endingText = '你成功逃离了地牢,但伤痕累累。传说将在酒馆里被传唱。';
        }
    } else {
        endingTitle = '💀 游戏结束';
        endingText = '你的旅程到此结束。但冒险者不会放弃...';
    }

    title.textContent = endingTitle;
    title.className = victory ? 'victory' : 'defeat';

    // Boss 台词
    const quoteEl = document.getElementById('game-over-quote');
    if (quoteEl) {
        quoteEl.textContent = bossDialogue ? '💬 ' + bossDialogue : '';
    }

    // 结局文本
    let endingEl = document.getElementById('game-over-ending');
    if (!endingEl) {
        endingEl = document.createElement('p');
        endingEl.id = 'game-over-ending';
        endingEl.style.cssText = 'max-width: 400px; text-align: center; color: #bdc3c7; margin: 10px auto; line-height: 1.6; font-size: 14px;';
        const statsDiv = document.querySelector('.game-over-stats');
        if (statsDiv) statsDiv.parentNode.insertBefore(endingEl, statsDiv);
    }
    endingEl.textContent = endingText;

    // P3: 本局统计
    let statsExtra = document.getElementById('game-over-stats-extra');
    if (!statsExtra) {
        statsExtra = document.createElement('div');
        statsExtra.id = 'game-over-stats-extra';
        statsExtra.style.cssText = 'max-width: 400px; text-align: center; color: #95a5a6; margin: 10px auto; font-size: 12px; line-height: 1.8; padding: 8px; background: rgba(0,0,0,0.2); border-radius: 6px;';
        const endingEl2 = document.getElementById('game-over-ending');
        if (endingEl2) endingEl2.parentNode.insertBefore(statsExtra, endingEl2.nextSibling);
    }
    if (statsExtra) {
        const elapsed = sessionStats.startTime ? Math.floor((Date.now() - sessionStats.startTime) / 60000) : '-';
        statsExtra.innerHTML = `
            <div>🗡️ 击杀: ${gameState.stats.enemiesKilled} | 💰 金币: ${gameState.player.gold} | 🎴 牌组: ${gameState.player.deck.length}张</div>
            <div>🎒 遗物: ${gameState.player.relics.length}个 | ⏱️ 用时: ${elapsed} 分钟 | 总回合: ${totalTurns}</div>
        `;
    }

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
    const list = document.getElementById('relics-modal-list');
    list.innerHTML = '';

    if (!gameState.player.relics.length) {
        list.innerHTML = '<p style="color: #888; width: 100%; text-align: center; padding: 20px;">还没有获得任何遗物</p>';
    } else {
        gameState.player.relics.forEach(relicId => {
            const relicData = RELIC_DB[relicId];
            if (!relicData) return;

            const el = document.createElement('div');
            el.className = 'relic-item-modal';

            // 标签/协同信息（仅当有同标签协同时才显示，避免单件遗物下方出现多余的标签名称）
            let tagHtml = '';
            if (relicData.tag && RELIC_TAGS[relicData.tag]) {
                const tagInfo = RELIC_TAGS[relicData.tag];
                const synergyCount = getRelicSynergy(relicData.tag);
                if (synergyCount > 1) {
                    tagHtml = `<div class="relic-tag-badge" style="background:${tagInfo.color}22;border:1px solid ${tagInfo.color};color:${tagInfo.color};font-size:0.7em;padding:1px 5px;border-radius:4px;">${tagInfo.icon} ${tagInfo.name} ×${synergyCount}</div>`;
                }
            }

            el.innerHTML = `
                ${relicIconHTML(relicId, relicData)}
                <div class="relic-name">${relicData.name}</div>
                <div class="relic-desc">${relicData.desc}</div>
                ${tagHtml}
            `;
            el.title = relicData.desc;
            list.appendChild(el);
        });
    }

    document.getElementById('relics-modal').classList.add('active');
}

function closeRelicsList() {
    document.getElementById('relics-modal').classList.remove('active');
}

// 显式暴露到全局
window.closeRelicsList = closeRelicsList;

// ==================== P2: Ascension 面板 ====================

function showAscensionPanel() {
    const panel = document.getElementById('ascension-panel');
    const list = document.getElementById('ascension-list');
    const summary = document.getElementById('ascension-summary');

    const settings = loadAscensionSettings();
    const count = Object.values(settings).filter(v => v).length;
    summary.textContent = `已开启 ${count} / ${ASCENSION_DEFS.length} 个进阶挑战`;

    list.innerHTML = '';

    ASCENSION_DEFS.forEach(def => {
        const isActive = !!settings[def.id];
        const el = document.createElement('div');
        el.className = 'ascension-item' + (isActive ? ' active' : '');
        el.innerHTML = `
            <div class="ascension-icon">${def.icon}</div>
            <div class="ascension-info">
                <div class="ascension-name">${def.name}</div>
                <div class="ascension-desc">${def.desc}</div>
            </div>
            <div class="ascension-toggle"></div>
        `;
        el.addEventListener('click', () => {
            settings[def.id] = !settings[def.id];
            saveAscensionSettings(settings);
            showAscensionPanel();
        });
        list.appendChild(el);
    });

    panel.classList.add('show');
}

function closeAscensionPanel() {
    const panel = document.getElementById('ascension-panel');
    if (panel) panel.classList.remove('show');
}

// ==================== P2: 每日挑战面板 ====================

function showDailyPanel() {
    const panel = document.getElementById('daily-panel');
    const summary = document.getElementById('daily-summary');
    const seedEl = document.getElementById('daily-seed');
    const classEl = document.getElementById('daily-class-info');
    const titleEl = document.getElementById('daily-title');

    const seed = getDailySeed();
    const seedText = getDailySeedText();
    const dailyClassId = getDailyClass();
    const classNames = { warrior: '战士', mage: '法师', rogue: '盗贼', monk: '武僧', paladin: '圣骑士' };
    const dailyClass = CLASSES[dailyClassId];

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const hoursLeft = Math.floor((tomorrow - now) / 3600000);
    const minsLeft = Math.floor(((tomorrow - now) % 3600000) / 60000);

    titleEl.textContent = `📅 ${now.getMonth() + 1}月${now.getDate()}日 挑战`;
    summary.textContent = `重置倒计时: ${hoursLeft}时${minsLeft}分`;
    seedEl.textContent = `种子: ${seedText}`;
    classEl.textContent = `指定职业: ${dailyClass.icon} ${dailyClass.name} (HP:${dailyClass.maxHp} 能量:${dailyClass.energy})`;

    panel.classList.add('show');
}

function closeDailyPanel() {
    const panel = document.getElementById('daily-panel');
    if (panel) panel.classList.remove('show');
}

function startDailyChallenge() {
    // 设置每日模式
    sessionStorage.setItem('dungeonDailyMode', 'true');
    const seed = getDailySeed();
    setDailyRNG(seed);
    const dailyClassId = getDailyClass();

    // 关闭面板
    closeDailyPanel();

    // 直接跳到职业选择并强制选择
    showScreen('class-select');
    document.querySelectorAll('.class-card').forEach(c => {
        c.classList.remove('selected');
        c.style.pointerEvents = 'none';
        c.style.opacity = '0.4';
    });
    const dailyCard = document.querySelector(`.class-card[data-class="${dailyClassId}"]`);
    if (dailyCard) {
        dailyCard.classList.add('selected');
        dailyCard.style.pointerEvents = 'auto';
        dailyCard.style.opacity = '1';
    }
}

// ==================== P2: Ascension 效果挂钩 ====================

// A2: 敌人伤害加成 (在敌人攻击时应用)
function getEnemyDamageBonus() {
    let bonus = 0;
    if (ascensionActive('a2')) bonus += 2;
    return bonus;
}

// A3: 能量惩罚
function getPlayerEnergy() {
    let energy = gameState.player.maxEnergy;
    if (ascensionActive('a3')) energy = Math.max(1, energy - 1);
    return energy;
}

// A5: 商店价格加成
function getShopPriceMultiplier() {
    let mult = 1;
    if (ascensionActive('a5')) mult *= 1.25;
    return mult;
}

// A8: 精英HP加成
function getEliteHpMultiplier() {
    let mult = 1;
    if (ascensionActive('a8')) mult *= 1.2;
    return mult;
}

// A10: 抽牌惩罚
function getDrawPenalty() {
    let penalty = 0;
    if (ascensionActive('a10')) penalty = 1;
    return penalty;
}

// A11: Boss HP加成
function getBossHpMultiplier() {
    let mult = 1;
    if (ascensionActive('a11')) mult *= 1.2;
    return mult;
}

// A6: 休息处不恢复生命
function shouldRestHeal() {
    if (ascensionActive('a6')) return false;
    return true;
}

// A9: 药水失效检查
function checkPotionFailure() {
    if (ascensionActive('a9') && Math.random() < 0.2) return true;
    return false;
}

// ==================== 启动游戏 ====================

let gameInitialized = false;

function bootstrapGame() {
    if (gameInitialized) return;

    try {
        initGame();
        console.log('[系统] initGame 完成');
    } catch (e) {
        console.error('[系统] initGame 崩溃:', e);
        const errDiv = document.createElement('div');
        errDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#e74c3c;color:#fff;padding:20px;z-index:99999;font-size:18px;font-family:sans-serif;';
        errDiv.innerHTML = '❌ 游戏初始化失败: ' + e.message + '<br><small>' + (e.stack || '') + '</small>';
        document.body.appendChild(errDiv);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapGame, { once: true });
} else {
    bootstrapGame();
}

// 显式暴露核心 UI 函数,避免作用域嵌套导致主菜单按钮无法调用
if (typeof window !== 'undefined') {
    window.showCollectionPanel = showCollectionPanel;
    window.showAchievementsPanel = showAchievementsPanel;
    window.showChangelogPanel = showChangelogPanel;
    window.showStatsPanel = showStatsPanel;
    window.showRelicsList = showRelicsList;
    window.closeRelicsList = closeRelicsList;
    window.showDeckModal = showDeckModal;
    window.hideDeckModal = hideDeckModal;
    window.bootstrapGame = bootstrapGame;
}

// 页面关闭/刷新前自动保存(仅在内存未清除时保存)
window.addEventListener('beforeunload', () => {
    if (!window.__gameCleared && gameState.player && gameState.player.class) {
        saveGame();
    }
});
