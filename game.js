// ==================== 音效系统 ====================

// 音效开关状态
let soundEnabled = true;
let musicEnabled = true;

// 音效音量
const SFX_VOLUME = 0.5;
const MUSIC_VOLUME = 0.3;

// 音效类型
const SFX_TYPES = {
    // UI 音效
    click: 'click',
    hover: 'hover',
    unlock: 'unlock',
    
    // 战斗音效
    attack: 'attack',
    damage: 'damage',
    heal: 'heal',
    block: 'block',
    power: 'power',
    
    // 事件音效
    card_get: 'card_get',
    relic_get: 'relic_get',
    gold_get: 'gold_get',
    
    // 特殊音效
    win: 'win',
    lose: 'lose',
    level_up: 'level_up'
};

// 使用 Web Audio API 生成音效（无需外部文件）
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 播放音效函数
function playSFX(type) {
    if (!soundEnabled) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // 根据不同音效类型设置参数
    switch(type) {
        case SFX_TYPES.click:
            oscillator.frequency.value = 600;
            gainNode.gain.setValueAtTime(SFX_VOLUME * 0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
            
        case SFX_TYPES.hover:
            oscillator.frequency.value = 400;
            gainNode.gain.setValueAtTime(SFX_VOLUME * 0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
            break;
            
        case SFX_TYPES.unlock:
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(SFX_VOLUME * 0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
            
        case SFX_TYPES.attack:
            oscillator.frequency.value = 200;
            oscillator.type = 'square';
            gainNode.gain.setValueAtTime(SFX_VOLUME * 0.5, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
            
        case SFX_TYPES.damage:
            oscillator.frequency.value = 150;
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(SFX_VOLUME * 0.6, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
            
        case SFX_TYPES.heal:
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(SFX_VOLUME * 0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            osc2.frequency.value = 800;
            osc2.type = 'sine';
            gain2.gain.setValueAtTime(SFX_VOLUME * 0.3, audioContext.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
            osc2.start(audioContext.currentTime);
            osc2.stop(audioContext.currentTime + 0.25);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.25);
            break;
            
        case SFX_TYPES.block:
            oscillator.frequency.value = 300;
            oscillator.type = 'triangle';
            gainNode.gain.setValueAtTime(SFX_VOLUME * 0.35, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
            
        case SFX_TYPES.power:
            oscillator.frequency.value = 500;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(SFX_VOLUME * 0.45, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
            
        case SFX_TYPES.card_get:
            oscillator.frequency.value = 700;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(SFX_VOLUME * 0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
            
        case SFX_TYPES.relic_get:
            oscillator.frequency.value = 600;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(SFX_VOLUME * 0.5, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
            
        case SFX_TYPES.gold_get:
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(SFX_VOLUME * 0.35, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
            
        case SFX_TYPES.win:
            [523.25, 659.25, 783.99].forEach((freq, i) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(SFX_VOLUME * 0.4, audioContext.currentTime + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.5);
                osc.start(audioContext.currentTime + i * 0.1);
                osc.stop(audioContext.currentTime + i * 0.1 + 0.5);
            });
            break;
            
        case SFX_TYPES.lose:
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(SFX_VOLUME * 0.5, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
            
        case SFX_TYPES.level_up:
            [440, 554.37, 659.25, 880].forEach((freq, i) => {
                const osc = audioContext.createOscillator();
                const gain = audioContext.createGain();
                osc.connect(gain);
                gain.connect(audioContext.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.setValueAtTime(SFX_VOLUME * 0.35, audioContext.currentTime + i * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.3);
                osc.start(audioContext.currentTime + i * 0.1);
                osc.stop(audioContext.currentTime + i * 0.1 + 0.3);
            });
            break;
    }
}

// 切换音效开关
function toggleSound() {
    soundEnabled = !soundEnabled;
    return soundEnabled;
}

// 切换音乐开关
function toggleMusic() {
    musicEnabled = !musicEnabled;
    return musicEnabled;
}

// 初始化音频上下文（需要用户交互）
function initAudio() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

// ==================== 卡牌收藏系统 ====================

// 收藏数据
let cardCollection = new Set();
let relicCollection = new Set();

// 战斗日志
let combatLog = [];
let currentTurn = 0;

// 初始化收藏系统
function initCollection() {
    const savedCards = localStorage.getItem('cardCollection');
    const savedRelics = localStorage.getItem('relicCollection');
    
    if (savedCards) {
        cardCollection = new Set(JSON.parse(savedCards));
    }
    
    if (savedRelics) {
        relicCollection = new Set(JSON.parse(savedRelics));
    }
}

// 记录获得的卡牌
function recordCard(cardId) {
    if (!cardCollection.has(cardId)) {
        cardCollection.add(cardId);
        saveCollection();
    }
}

// 记录获得的遗物
function recordRelic(relicId) {
    if (!relicCollection.has(relicId)) {
        relicCollection.add(relicId);
        saveCollection();
    }
}

// 保存收藏数据
function saveCollection() {
    localStorage.setItem('cardCollection', JSON.stringify([...cardCollection]));
    localStorage.setItem('relicCollection', JSON.stringify([...relicCollection]));
}

// 获取收藏进度
function getCollectionProgress() {
    const totalCards = Object.keys(CARD_DB).length;
    const totalRelics = Object.keys(RELIC_DB).length;
    
    return {
        cards: {
            collected: cardCollection.size,
            total: totalCards,
            percentage: Math.round((cardCollection.size / totalCards) * 100)
        },
        relics: {
            collected: relicCollection.size,
            total: totalRelics,
            percentage: Math.round((relicCollection.size / totalRelics) * 100)
        }
    };
}

// 显示收藏面板
function showCollectionPanel() {
    const panel = document.getElementById('collection-panel');
    renderCollectionList();
    panel.classList.add('show');
}

// 渲染收藏列表
function renderCollectionList() {
    const list = document.getElementById('collection-list');
    list.innerHTML = '';
    
    // 更新进度
    const progress = getCollectionProgress();
    
    // 统计各类型卡牌数量
    const cardTypeStats = {
        common: { total: 0, collected: 0 },
        uncommon: { total: 0, collected: 0 },
        rare: { total: 0, collected: 0 },
        legendary: { total: 0, collected: 0 }
    };
    
    for (const [cardId, cardData] of Object.entries(CARD_DB)) {
        const rarity = cardData.rarity || 'common';
        cardTypeStats[rarity].total++;
        if (cardCollection.has(cardId)) {
            cardTypeStats[rarity].collected++;
        }
    }
    
    // 构建进度显示，显示总体百分率
    const totalCards = progress.cards.total;
    const collectedCards = progress.cards.collected;
    const cardsPercentage = totalCards > 0 ? Math.round((collectedCards / totalCards) * 100) : 0;
    
    const totalRelics = progress.relics.total;
    const collectedRelics = progress.relics.collected;
    const relicsPercentage = totalRelics > 0 ? Math.round((collectedRelics / totalRelics) * 100) : 0;
    
    let progressHtml = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <div style="flex: 1;">
                <strong>🃏 卡牌：</strong>
                <span style="color: #ecf0f1; font-size: 1.2em; font-weight: bold;">${collectedCards}/${totalCards}</span>
                <span style="color: #95a5a6; margin-left: 10px;">(${cardsPercentage}%)</span>
            </div>
            <div style="flex: 1; text-align: right;">
                <strong>🎒 遗物：</strong>
                <span style="color: #f39c12; font-size: 1.2em; font-weight: bold;">${collectedRelics}/${totalRelics}</span>
                <span style="color: #95a5a6; margin-left: 10px;">(${relicsPercentage}%)</span>
            </div>
        </div>
        <div style="width: 100%; background: rgba(0,0,0,0.3); border-radius: 8px; overflow: hidden; display: flex; height: 8px;">
            <div style="flex: 1; background: linear-gradient(90deg, #ecf0f1, #bdc3c7); width: ${cardsPercentage}%;"></div>
            <div style="flex: 1; background: linear-gradient(90deg, #f39c12, #e67e22); width: ${relicsPercentage}%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 5px; font-size: 0.8em; color: #7f8c8d;">
            <span>🃏 卡牌 ${cardsPercentage}%</span>
            <span>🎒 遗物 ${relicsPercentage}%</span>
        </div>
    `;
    
    document.getElementById('collection-progress').innerHTML = progressHtml;
    
    // 卡牌收藏
    const cardsCategory = document.createElement('div');
    cardsCategory.className = 'collection-category';
    
    const cardsTitle = document.createElement('div');
    cardsTitle.className = 'collection-category-title';
    cardsTitle.textContent = '🃏 卡牌收藏';
    cardsCategory.appendChild(cardsTitle);
    
    // 按稀有度分组
    const rarities = {
        common: '普通卡牌',
        uncommon: '稀有卡牌',
        rare: '史诗卡牌',
        legendary: '传说卡牌'
    };
    
    for (const [rarity, title] of Object.entries(rarities)) {
        const rarityEl = document.createElement('div');
        rarityEl.className = `collection-rarity rarity-${rarity}`;
        
        const stats = cardTypeStats[rarity];
        const progressPercent = stats.total > 0 ? Math.round((stats.collected / stats.total) * 100) : 0;
        
        const rarityTitle = document.createElement('div');
        rarityTitle.className = 'collection-rarity-title';
        rarityTitle.innerHTML = `${title} <span style="float: right; font-size: 0.9em; color: #95a5a6;">${stats.collected}/${stats.total} (${progressPercent}%)</span>`;
        rarityEl.appendChild(rarityTitle);
        
        const rarityContainer = document.createElement('div');
        rarityContainer.className = 'collection-items';
        
        for (const [cardId, cardData] of Object.entries(CARD_DB)) {
            if (cardData.rarity === rarity) {
                const hasCard = cardCollection.has(cardId);
                const itemEl = document.createElement('div');
                itemEl.className = `collection-item ${hasCard ? 'unlocked' : 'locked'}`;
                itemEl.innerHTML = `
                    <div class="collection-item-icon">${cardData.icon}</div>
                    <div class="collection-item-info">
                        <div class="collection-item-name">${cardData.name}</div>
                        <div class="collection-item-desc">${cardData.desc}</div>
                    </div>
                `;
                rarityContainer.appendChild(itemEl);
            }
        }
        
        rarityEl.appendChild(rarityContainer);
        cardsCategory.appendChild(rarityEl);
    }
    
    list.appendChild(cardsCategory);
    
    // 遗物收藏
    const relicsCategory = document.createElement('div');
    relicsCategory.className = 'collection-category';
    
    const relicsTitle = document.createElement('div');
    relicsTitle.className = 'collection-category-title';
    relicsTitle.textContent = '🎒 遗物收藏';
    relicsCategory.appendChild(relicsTitle);
    
    const relicsContainer = document.createElement('div');
    relicsContainer.className = 'collection-items';
    
    for (const [relicId, relicData] of Object.entries(RELIC_DB)) {
        const hasRelic = relicCollection.has(relicId);
        const itemEl = document.createElement('div');
        itemEl.className = `collection-item ${hasRelic ? 'unlocked' : 'locked'}`;
        itemEl.innerHTML = `
            <div class="collection-item-icon">${relicData.icon}</div>
            <div class="collection-item-info">
                <div class="collection-item-name">${relicData.name}</div>
                <div class="collection-item-desc">${relicData.desc}</div>
            </div>
        `;
        relicsContainer.appendChild(itemEl);
    }
    
    relicsCategory.appendChild(relicsContainer);
    list.appendChild(relicsCategory);
}

// 关闭收藏面板
function closeCollectionPanel() {
    document.getElementById('collection-panel').classList.remove('show');
}

// ==================== 战斗日志系统 ====================

// 添加日志条目
function addCombatLog(type, text, value = null) {
    const entry = {
        type,
        text,
        value,
        turn: currentTurn,
        timestamp: Date.now()
    };
    
    combatLog.push(entry);
    
    // 如果日志太多，只保留最近的 50 条
    if (combatLog.length > 50) {
        combatLog = combatLog.slice(-50);
    }
    
    // 实时更新日志显示
    updateCombatLogDisplay();
}

// 更新回合
function updateCombatTurn() {
    currentTurn++;
    addCombatLog('turn', `第 ${currentTurn} 回合`);
}

// 显示战斗日志面板
function showCombatLogPanel() {
    const panel = document.getElementById('combat-log-panel');
    renderCombatLog();
    panel.classList.add('show');
}

// 渲染战斗日志
function renderCombatLog() {
    const list = document.getElementById('combat-log-list');
    list.innerHTML = '';
    
    if (combatLog.length === 0) {
        list.innerHTML = '<div style="text-align: center; color: #7f8c8d; padding: 40px;">暂无战斗记录</div>';
        return;
    }
    
    // 按回合分组
    const logByTurn = {};
    combatLog.forEach(entry => {
        if (!logByTurn[entry.turn]) {
            logByTurn[entry.turn] = [];
        }
        logByTurn[entry.turn].push(entry);
    });
    
    // 渲染日志
    for (const [turn, entries] of Object.entries(logByTurn).reverse()) {
        const turnEl = document.createElement('div');
        turnEl.className = 'combat-log-turn';
        turnEl.textContent = `第 ${turn} 回合`;
        list.appendChild(turnEl);
        
        entries.forEach(entry => {
            const entryEl = document.createElement('div');
            entryEl.className = `combat-log-entry ${entry.type}`;
            
            const icons = {
                damage: '💥',
                heal: '💚',
                block: '🛡️',
                power: '⚡',
                info: 'ℹ️',
                turn: '🔄'
            };
            
            const valueHtml = entry.value !== null 
                ? `<span class="combat-log-entry-value">${entry.value}</span>` 
                : '';
            
            entryEl.innerHTML = `
                <span class="combat-log-entry-icon">${icons[entry.type] || '•'}</span>
                <span class="combat-log-entry-text">${entry.text}${valueHtml}</span>
            `;
            
            list.appendChild(entryEl);
        });
    }
    
    // 添加清空按钮
    const clearBtn = document.createElement('button');
    clearBtn.className = 'btn-clear-log';
    clearBtn.textContent = '清空日志';
    clearBtn.onclick = clearCombatLog;
    list.appendChild(clearBtn);
}

// 更新战斗日志显示（实时）
function updateCombatLogDisplay() {
    // 如果面板已打开，重新渲染
    const panel = document.getElementById('combat-log-panel');
    if (panel && panel.classList.contains('show')) {
        renderCombatLog();
    }
}

// 清空战斗日志
function clearCombatLog() {
    combatLog = [];
    currentTurn = 0;
    renderCombatLog();
}

// 战斗开始时初始化
function initCombatLog() {
    combatLog = [];
    currentTurn = 1;
    addCombatLog('info', '战斗开始！');
}


// ==================== 成就系统 ====================

// 成就数据库（30 个成就）
const ACHIEVEMENT_DB = {
    // 基础成就（5 个）
    first_blood: { 
        id: 'first_blood', 
        name: '初出茅庐', 
        icon: '⚔️', 
        desc: '击败第一个敌人', 
        category: 'combat',
        condition: (stats) => stats.enemiesKilled >= 1 
    },
    veteran: { 
        id: 'veteran', 
        name: '身经百战', 
        icon: '🛡️', 
        desc: '击败 50 个敌人', 
        category: 'combat',
        condition: (stats) => stats.enemiesKilled >= 50 
    },
    slayer: { 
        id: 'slayer', 
        name: '杀戮者', 
        icon: '💀', 
        desc: '击败 100 个敌人', 
        category: 'combat',
        condition: (stats) => stats.enemiesKilled >= 100 
    },
    deck_builder: { 
        id: 'deck_builder', 
        name: '牌组大师', 
        icon: '🃏', 
        desc: '将牌组扩展到 20 张以上', 
        category: 'progression',
        condition: (stats) => stats.deckSize >= 20 
    },
    collector: { 
        id: 'collector', 
        name: '收藏家', 
        icon: '🎒', 
        desc: '收集 5 个遗物', 
        category: 'progression',
        condition: (stats) => stats.relicsCollected >= 5 
    },
    
    // 战斗成就（8 个）
    quick_victory: { 
        id: 'quick_victory', 
        name: '速战速决', 
        icon: '⚡', 
        desc: '在 3 回合内击败敌人', 
        category: 'combat',
        condition: (stats) => stats.quickVictories >= 1 
    },
    perfect_defense: { 
        id: 'perfect_defense', 
        name: '完美防御', 
        icon: '🛡️✨', 
        desc: '单回合格挡达到 30 点以上', 
        category: 'combat',
        condition: (stats) => stats.maxBlock >= 30 
    },
    no_damage: { 
        id: 'no_damage', 
        name: '完美无瑕', 
        icon: '✨', 
        desc: '单场战斗未受到伤害', 
        category: 'combat',
        condition: (stats) => stats.noDamageWins >= 1 
    },
    critical_strike: { 
        id: 'critical_strike', 
        name: '致命一击', 
        icon: '💥', 
        desc: '单次攻击造成 20 点以上伤害', 
        category: 'combat',
        condition: (stats) => stats.maxSingleDamage >= 20 
    },
    boss_slayer: { 
        id: 'boss_slayer', 
        name: 'Boss 杀手', 
        icon: '👑', 
        desc: '击败 3 个 Boss', 
        category: 'combat',
        condition: (stats) => stats.bossesDefeated >= 3 
    },
    elite_hunter: { 
        id: 'elite_hunter', 
        name: '精英猎手', 
        icon: '⭐', 
        desc: '击败 10 个精英敌人', 
        category: 'combat',
        condition: (stats) => stats.elitesDefeated >= 10 
    },
    combo_master: { 
        id: 'combo_master', 
        name: '连击大师', 
        icon: '🔥', 
        desc: '单回合打出 5 张以上卡牌', 
        category: 'combat',
        condition: (stats) => stats.maxCardsPlayed >= 5 
    },
    survivor: { 
        id: 'survivor', 
        name: '幸存者', 
        icon: '❤️', 
        desc: '生命值低于 10 点时赢得战斗', 
        category: 'combat',
        condition: (stats) => stats.lowHpWins >= 1 
    },
    
    // 进度成就（6 个）
    floor_1_clear: { 
        id: 'floor_1_clear', 
        name: '第一层通关', 
        icon: '🗺️', 
        desc: '完成第 1 层', 
        category: 'progression',
        condition: (stats) => stats.maxFloor >= 1 
    },
    floor_2_clear: { 
        id: 'floor_2_clear', 
        name: '第二层通关', 
        icon: '🗺️✨', 
        desc: '完成第 2 层', 
        category: 'progression',
        condition: (stats) => stats.maxFloor >= 2 
    },
    floor_3_clear: { 
        id: 'floor_3_clear', 
        name: '地牢征服者', 
        icon: '🗺️👑', 
        desc: '完成第 3 层', 
        category: 'progression',
        condition: (stats) => stats.maxFloor >= 3 
    },
    treasure_hunter: { 
        id: 'treasure_hunter', 
        name: '寻宝猎人', 
        icon: '💎', 
        desc: '累计获得 500 金币', 
        category: 'progression',
        condition: (stats) => stats.totalGold >= 500 
    },
    shop_regular: { 
        id: 'shop_regular', 
        name: '常客', 
        icon: '🏪', 
        desc: '在商店购买 10 次物品', 
        category: 'progression',
        condition: (stats) => stats.shopPurchases >= 10 
    },
    rest_master: { 
        id: 'rest_master', 
        name: '休息大师', 
        icon: '🔥', 
        desc: '在休息处升级卡牌 5 次', 
        category: 'progression',
        condition: (stats) => stats.cardsUpgraded >= 5 
    },
    
    // 职业成就（6 个）
    warrior_master: { 
        id: 'warrior_master', 
        name: '战士精通', 
        icon: '⚔️👑', 
        desc: '使用战士职业通关', 
        category: 'class',
        condition: (stats) => stats.classWins?.warrior >= 1 
    },
    mage_master: { 
        id: 'mage_master', 
        name: '法师精通', 
        icon: '🔮👑', 
        desc: '使用法师职业通关', 
        category: 'class',
        condition: (stats) => stats.classWins?.mage >= 1 
    },
    rogue_master: { 
        id: 'rogue_master', 
        name: '盗贼精通', 
        icon: '🗡️👑', 
        desc: '使用盗贼职业通关', 
        category: 'class',
        condition: (stats) => stats.classWins?.rogue >= 1 
    },
    monk_master: { 
        id: 'monk_master', 
        name: '武僧精通', 
        icon: '🥋👑', 
        desc: '使用武僧职业通关', 
        category: 'class',
        condition: (stats) => stats.classWins?.monk >= 1 
    },
    paladin_master: { 
        id: 'paladin_master', 
        name: '圣骑士精通', 
        icon: '✨👑', 
        desc: '使用圣骑士职业通关', 
        category: 'class',
        condition: (stats) => stats.classWins?.paladin >= 1 
    },
    all_classes: { 
        id: 'all_classes', 
        name: '全能冒险者', 
        icon: '🎭', 
        desc: '使用所有职业各通关一次', 
        category: 'class',
        condition: (stats) => {
            const classes = stats.classWins || {};
            return classes.warrior >= 1 && classes.mage >= 1 && classes.rogue >= 1 && 
                   classes.monk >= 1 && classes.paladin >= 1;
        } 
    },
    
    // 特殊成就（5 个）
    lucky: { 
        id: 'lucky', 
        name: '幸运儿', 
        icon: '🍀', 
        desc: '获得传说级遗物', 
        category: 'special',
        condition: (stats) => stats.legendaryRelics >= 1 
    },
    speed_runner: { 
        id: 'speed_runner', 
        name: '速通者', 
        icon: '⏱️', 
        desc: '在 30 回合内通关游戏', 
        category: 'special',
        condition: (stats) => stats.fastClears >= 1 
    },
    perfectionist: { 
        id: 'perfectionist', 
        name: '完美主义者', 
        icon: '💯', 
        desc: '以满血状态通关', 
        category: 'special',
        condition: (stats) => stats.fullHpClears >= 1 
    },
    hardcore: { 
        id: 'hardcore', 
        name: '硬核玩家', 
        icon: '💀', 
        desc: '在困难难度下通关', 
        category: 'special',
        condition: (stats) => stats.hardModeWins >= 1 
    },
    legendary: { 
        id: 'legendary', 
        name: '传奇冒险者', 
        icon: '👑✨', 
        desc: '解锁所有成就', 
        category: 'special',
        condition: (stats) => stats.achievementsUnlocked >= 30 
    }
};

// 成就状态
let unlockedAchievements = new Set();

// 检查并解锁成就
function checkAchievements(category, stats) {
    const newUnlocks = [];
    
    for (const [key, achievement] of Object.entries(ACHIEVEMENT_DB)) {
        if (achievement.category === category || !category) {
            if (!unlockedAchievements.has(key) && achievement.condition(stats)) {
                unlockedAchievements.add(key);
                newUnlocks.push(achievement);
            }
        }
    }
    
    if (newUnlocks.length > 0) {
        showAchievementNotifications(newUnlocks);
    }
    
    return newUnlocks;
}

// 显示成就解锁通知
function showAchievementNotifications(achievements) {
    achievements.forEach((achievement, index) => {
        // 播放解锁音效
        setTimeout(() => playSFX(SFX_TYPES.unlock), index * 200);
        
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-content">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.desc}</div>
            </div>
        `;
        document.body.appendChild(notification);
        
        // 2 秒后移除
        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    });
}

// 初始化成就系统
function initAchievements() {
    const saved = localStorage.getItem('achievements');
    if (saved) {
        unlockedAchievements = new Set(JSON.parse(saved));
    }
}

// 保存成就
function saveAchievements() {
    localStorage.setItem('achievements', JSON.stringify([...unlockedAchievements]));
}

// ==================== 新手引导系统 ====================


// 引导步骤配置
const TUTORIAL_STEPS = [
    {
        name: 'start_game',
        target: '#start-game-btn',
        message: '🎮 欢迎来到流浪地牢！<br>点击"开始新游戏"开启冒险之旅！',
        highlightClass: null
    },
    {
        name: 'choose_class',
        target: '.class-card',
        message: '👤 选择一个职业<br>战士：高血量，适合新手<br>法师：高伤害，需要策略<br>盗贼：高金币，灵活多变',
        highlightClass: 'class-card'
    },
    {
        name: 'confirm_class',
        target: '#confirm-class',
        message: '✅ 确认职业选择<br>进入地牢地图',
        highlightClass: null
    },
    {
        name: 'first_node',
        target: '.map-node.available',
        message: '⚔️ 点击绿色边框的节点<br>开始第一场战斗！',
        highlightClass: 'available'
    },
    {
        name: 'battle_cards',
        target: '.card',
        message: '🃏 点击卡牌打出<br>每张卡牌消耗 1 点能量<br>合理安排卡牌顺序！',
        highlightClass: 'card'
    },
    {
        name: 'end_turn',
        target: '#end-turn-btn',
        message: '⏹️ 点击"结束回合"<br>敌人将进行攻击',
        highlightClass: null
    },
    {
        name: 'complete',
        target: null,
        message: '🎉 恭喜完成新手引导！<br>现在你已掌握基本操作<br>继续探索地牢，收集卡牌和遗物吧！',
        highlightClass: null
    }
];

// 引导状态
let currentTutorialStep = 0;
let tutorialOverlay = null;
let highlightedElement = null;

// 显示当前引导步骤
function showTutorialStep() {
    if (currentTutorialStep >= TUTORIAL_STEPS.length) {
        completeTutorial();
        return;
    }
    
    const step = TUTORIAL_STEPS[currentTutorialStep];
    
    // 移除上一个高亮
    clearTutorialHighlight();
    
    // 高亮目标元素
    if (step.target && step.highlightClass) {
        highlightedElement = document.querySelector(step.target);
        if (highlightedElement) {
            highlightedElement.classList.add('tutorial-highlight');
        }
    }
    
    // 创建引导弹窗
    tutorialOverlay = document.createElement('div');
    tutorialOverlay.className = 'tutorial-overlay';
    tutorialOverlay.innerHTML = `
        <div class="tutorial-modal">
            <div class="tutorial-progress">步骤 ${currentTutorialStep + 1}/${TUTORIAL_STEPS.length}</div>
            <div class="tutorial-message">${step.message}</div>
            <button class="tutorial-btn" onclick="nextTutorialStep()">知道了</button>
        </div>
    `;
    
    document.body.appendChild(tutorialOverlay);
}

// 下一步引导
function nextTutorialStep() {
    // 关闭当前弹窗
    if (tutorialOverlay) {
        tutorialOverlay.remove();
        tutorialOverlay = null;
    }
    
    // 清除高亮
    clearTutorialHighlight();
    
    // 前进到下一步
    currentTutorialStep++;
    
    // 显示下一步
    showTutorialStep();
}

// 清除高亮
function clearTutorialHighlight() {
    if (highlightedElement) {
        highlightedElement.classList.remove('tutorial-highlight');
        highlightedElement = null;
    }
}

// 完成引导
function completeTutorial() {
    localStorage.setItem('tutorialComplete', 'true');
    currentTutorialStep = 0;
}

// 检查并启动引导
function startTutorialIfFirstTime() {
    const isCompleted = localStorage.getItem('tutorialComplete');
    if (!isCompleted) {
        // 延迟 500ms 确保页面完全加载
        setTimeout(() => {
            showTutorialStep();
        }, 500);
    }
}

// ==================== 怪物 SVG 精灵系统 ====================



// SVG 精灵图像库（扁平化矢量风格）
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
    `,
    
    // ==================== 新增敌人 SVG ====================
    // 第一层 - 毒蜘蛛
    spider: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="spiderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8e44ad;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#2c3e50;stop-opacity:1" />
                </linearGradient>
            </defs>
            <ellipse cx="50" cy="50" rx="25" ry="20" fill="url(#spiderGrad)"/>
            <circle cx="50" cy="40" r="12" fill="#34495e"/>
            <circle cx="45" cy="38" r="4" fill="#e74c3c"/>
            <circle cx="55" cy="38" r="4" fill="#e74c3c"/>
            <circle cx="45" cy="38" r="1.5" fill="#000"/>
            <circle cx="55" cy="38" r="1.5" fill="#000"/>
            <path d="M 35 45 Q 15 35 10 25" stroke="#2c3e50" stroke-width="3" fill="none"/>
            <path d="M 35 50 Q 15 50 10 55" stroke="#2c3e50" stroke-width="3" fill="none"/>
            <path d="M 35 55 Q 15 65 10 75" stroke="#2c3e50" stroke-width="3" fill="none"/>
            <path d="M 65 45 Q 85 35 90 25" stroke="#2c3e50" stroke-width="3" fill="none"/>
            <path d="M 65 50 Q 85 50 90 55" stroke="#2c3e50" stroke-width="3" fill="none"/>
            <path d="M 65 55 Q 85 65 90 75" stroke="#2c3e50" stroke-width="3" fill="none"/>
            <path d="M 42 52 L 38 60" stroke="#5d4037" stroke-width="2"/>
            <path d="M 58 52 L 62 60" stroke="#5d4037" stroke-width="2"/>
        </svg>
    `,
    // 第二层 - 吸血鬼
    vampire: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="vampireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#e74c3c;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8b0000;stop-opacity:1" />
                </linearGradient>
            </defs>
            <path d="M 20 80 Q 10 50 20 30 L 80 30 Q 90 50 80 80 Z" fill="#8b0000"/>
            <path d="M 25 75 Q 15 50 25 35 L 75 35 Q 85 50 75 75 Z" fill="#c0392b"/>
            <ellipse cx="50" cy="55" rx="20" ry="25" fill="#1a1a1a"/>
            <path d="M 45 50 L 50 60 L 55 50" fill="#c0392b"/>
            <ellipse cx="50" cy="35" rx="18" ry="20" fill="#f5d6c4"/>
            <path d="M 30 25 Q 30 10 50 10 L 50 10 Q 70 10 70 25 Q 70 15 50 15 Q 30 15 30 25" fill="#1a1a1a"/>
            <circle cx="45" cy="32" r="3" fill="#e74c3c"/>
            <circle cx="55" cy="32" r="3" fill="#e74c3c"/>
            <circle cx="45" cy="32" r="1" fill="#000"/>
            <circle cx="55" cy="32" r="1" fill="#000"/>
            <path d="M 47 42 L 45 48" stroke="#fff" stroke-width="1.5"/>
            <path d="M 53 42 L 55 48" stroke="#fff" stroke-width="1.5"/>
            <path d="M 42 50 L 50 48 L 58 50 L 50 52 Z" fill="#000"/>
        </svg>
    `,
    // 第二层 - 石像鬼
    golem: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="golemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#95a5a6;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#7f8c8d;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect x="30" y="40" width="40" height="50" rx="5" fill="url(#golemGrad)"/>
            <rect x="35" y="45" width="30" height="40" rx="3" fill="#879697"/>
            <rect x="35" y="15" width="30" height="28" rx="5" fill="url(#golemGrad)"/>
            <circle cx="45" cy="28" r="4" fill="#e74c3c"/>
            <circle cx="55" cy="28" r="4" fill="#e74c3c"/>
            <circle cx="45" cy="28" r="1.5" fill="#000"/>
            <circle cx="55" cy="28" r="1.5" fill="#000"/>
            <path d="M 50 18 L 50 25" stroke="#5d6d6e" stroke-width="1"/>
            <path d="M 50 48 L 50 60" stroke="#5d6d6e" stroke-width="1"/>
            <path d="M 60 55 L 65 65" stroke="#5d6d6e" stroke-width="1"/>
            <rect x="15" y="50" width="12" height="30" rx="4" fill="url(#golemGrad)"/>
            <rect x="73" y="50" width="12" height="30" rx="4" fill="url(#golemGrad)"/>
            <circle cx="21" cy="82" r="6" fill="url(#golemGrad)"/>
            <circle cx="79" cy="82" r="6" fill="url(#golemGrad)"/>
        </svg>
    `,
    // 第三层 - 凤凰
    phoenix: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="phoenixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f39c12;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#e74c3c;stop-opacity:1" />
                </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f39c12" stroke-width="2" opacity="0.6">
                <animate attributeName="stroke-width" values="1;3;1" dur="1s" repeatCount="indefinite"/>
            </circle>
            <ellipse cx="50" cy="55" rx="20" ry="25" fill="url(#phoenixGrad)"/>
            <circle cx="50" cy="35" r="15" fill="url(#phoenixGrad)"/>
            <path d="M 45 25 L 45 10 L 50 18 Z" fill="#e74c3c"/>
            <path d="M 50 23 L 50 5 L 55 16 Z" fill="#f39c12"/>
            <path d="M 55 25 L 55 10 L 50 18 Z" fill="#e74c3c"/>
            <circle cx="46" cy="32" r="3" fill="#fff"/>
            <circle cx="54" cy="32" r="3" fill="#fff"/>
            <circle cx="46" cy="32" r="1.5" fill="#000"/>
            <circle cx="54" cy="32" r="1.5" fill="#000"/>
            <path d="M 47 38 L 50 45 L 53 38 Z" fill="#f1c40f"/>
            <path d="M 30 50 Q 15 40 20 30 Q 25 45 35 52 Z" fill="#e74c3c">
                <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="1.5s" repeatCount="indefinite" additive="sum"/>
            </path>
            <path d="M 70 50 Q 85 40 80 30 Q 75 45 65 52 Z" fill="#e74c3c">
                <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="1.5s" repeatCount="indefinite" additive="sum"/>
            </path>
            <path d="M 40 75 Q 35 90 45 95" stroke="#f39c12" stroke-width="4" fill="none"/>
            <path d="M 50 78 Q 50 95 50 98" stroke="#e74c3c" stroke-width="4" fill="none"/>
            <path d="M 60 75 Q 65 90 55 95" stroke="#f39c12" stroke-width="4" fill="none"/>
        </svg>
    `,
    // 第三层 - 巫骑士
    lich_knight: `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="knightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#34495e;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#2c3e50;stop-opacity:1" />
                </linearGradient>
            </defs>
            <path d="M 25 80 Q 15 50 25 35 L 75 35 Q 85 50 75 80 Z" fill="#8b0000"/>
            <rect x="32" y="45" width="36" height="45" rx="8" fill="url(#knightGrad)"/>
            <rect x="38" y="50" width="24" height="35" rx="5" fill="#4a5d70"/>
            <path d="M 50 50 L 50 85" stroke="#ffd700" stroke-width="2"/>
            <circle cx="50" cy="60" r="4" fill="#ffd700"/>
            <circle cx="50" cy="70" r="4" fill="#ffd700"/>
            <circle cx="50" cy="80" r="4" fill="#ffd700"/>
            <ellipse cx="50" cy="32" rx="20" ry="18" fill="url(#knightGrad)"/>
            <path d="M 30 32 L 30 20 Q 50 10 70 20 L 70 32" fill="url(#knightGrad)"/>
            <line x1="45" y1="28" x2="45" y2="36" stroke="#1a2832" stroke-width="2"/>
            <line x1="55" y1="28" x2="55" y2="36" stroke="#1a2832" stroke-width="2"/>
            <circle cx="45" cy="30" r="3" fill="#00ffff"/>
            <circle cx="55" cy="30" r="3" fill="#00ffff"/>
            <rect x="75" y="40" width="6" height="50" fill="#7f8c8d"/>
            <path d="M 72 35 L 78 35 L 78 40 L 72 40 Z" fill="#bdc3c7"/>
            <path d="M 75 25 L 70 35 L 80 35 Z" fill="#95a5a6"/>
        </svg>
    `,
    
    // ==================== 新增 Boss SVG ====================
    boss_lich_king: `
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="lichKingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#2c3e50;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1a252f;stop-opacity:1" />
                </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="55" fill="none" stroke="#9b59b6" stroke-width="4" opacity="0.6">
                <animate attributeName="stroke-width" values="2;5;2" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
            </circle>
            <path d="M 35 30 L 35 15 L 45 25 L 50 10 L 55 25 L 60 12 L 65 25 L 70 15 L 85 30 Z" fill="#ffd700"/>
            <ellipse cx="60" cy="75" rx="40" ry="35" fill="url(#lichKingGrad)"/>
            <path d="M 40 60 L 60 50 L 80 60 L 80 90 L 40 90 Z" fill="#34495e"/>
            <path d="M 60 55 L 60 85" stroke="#9b59b6" stroke-width="3"/>
            <circle cx="60" cy="65" r="5" fill="#9b59b6"/>
            <circle cx="60" cy="75" r="5" fill="#9b59b6"/>
            <ellipse cx="60" cy="42" rx="28" ry="25" fill="#ecf0f1"/>
            <ellipse cx="50" cy="38" rx="8" ry="10" fill="#1a252f"/>
            <ellipse cx="70" cy="38" rx="8" ry="10" fill="#1a252f"/>
            <circle cx="50" cy="38" r="4" fill="#e74c3c"/>
            <circle cx="70" cy="38" r="4" fill="#e74c3c"/>
            <path d="M 56 45 L 60 52 L 64 45 Z" fill="#1a252f"/>
            <path d="M 52 58 L 52 65" stroke="#ecf0f1" stroke-width="2"/>
            <path d="M 58 58 L 58 65" stroke="#ecf0f1" stroke-width="2"/>
            <path d="M 64 58 L 64 65" stroke="#ecf0f1" stroke-width="2"/>
            <path d="M 70 58 L 70 65" stroke="#ecf0f1" stroke-width="2"/>
            <rect x="90" y="45" width="6" height="60" fill="#5d4037"/>
            <circle cx="93" cy="40" r="10" fill="#9b59b6">
                <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="93" cy="40" r="5" fill="#00ffff"/>
        </svg>
    `,
    boss_ancient_dragon: `
        <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="ancientDragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#c0392b;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8b0000;stop-opacity:1" />
                </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="55" fill="none" stroke="#e74c3c" stroke-width="5" opacity="0.7">
                <animate attributeName="stroke-width" values="3;6;3" dur="1.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.5s" repeatCount="indefinite"/>
            </circle>
            <ellipse cx="60" cy="110" rx="55" ry="10" fill="#e74c3c" opacity="0.7">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite"/>
            </ellipse>
            <path d="M 20 50 Q 5 20 30 30 L 45 45 Z" fill="#8b0000">
                <animateTransform attributeName="transform" type="scale" values="1;1.15;1" dur="2s" repeatCount="indefinite" additive="sum"/>
            </path>
            <path d="M 100 50 Q 115 20 90 30 L 75 45 Z" fill="#8b0000">
                <animateTransform attributeName="transform" type="scale" values="1;1.15;1" dur="2s" repeatCount="indefinite" additive="sum"/>
            </path>
            <ellipse cx="60" cy="70" rx="45" ry="38" fill="url(#ancientDragonGrad)"/>
            <circle cx="45" cy="60" r="3" fill="#922b21" opacity="0.6"/>
            <circle cx="55" cy="58" r="3" fill="#922b21" opacity="0.6"/>
            <circle cx="65" cy="58" r="3" fill="#922b21" opacity="0.6"/>
            <circle cx="75" cy="60" r="3" fill="#922b21" opacity="0.6"/>
            <ellipse cx="60" cy="40" rx="30" ry="25" fill="url(#ancientDragonGrad)"/>
            <path d="M 35 25 L 25 10 L 38 28 Z" fill="#2c3e50"/>
            <path d="M 85 25 L 95 10 L 82 28 Z" fill="#2c3e50"/>
            <ellipse cx="48" cy="35" r="8" fill="#f1c40f"/>
            <ellipse cx="72" cy="35" r="8" fill="#f1c40f"/>
            <circle cx="48" cy="35" r="3" fill="#000"/>
            <circle cx="72" cy="35" r="3" fill="#000"/>
            <circle cx="55" cy="42" r="2" fill="#922b21"/>
            <circle cx="65" cy="42" r="2" fill="#922b21"/>
            <path d="M 50 48 Q 60 55 70 48" stroke="#8b0000" stroke-width="3" fill="none"/>
            <path d="M 55 50 L 53 56" stroke="#fff" stroke-width="2"/>
            <path d="M 65 50 L 67 56" stroke="#fff" stroke-width="2"/>
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

// ==================== 成就系统函数 ====================

// 显示成就面板
function showAchievementsPanel() {
    const panel = document.getElementById('achievements-panel');
    renderAchievementsList();
    panel.classList.add('show');
}

// 渲染成就列表
function renderAchievementsList() {
    const list = document.getElementById('achievements-list');
    list.innerHTML = '';
    
    // 更新解锁数量
    document.getElementById('achievement-count').textContent = unlockedAchievements.size;
    
    // 按分类渲染
    const categories = {
        combat: '⚔️ 战斗成就',
        progression: '📈 进度成就',
        class: '🎭 职业成就',
        special: '🌟 特殊成就'
    };
    
    for (const [category, title] of Object.entries(categories)) {
        const categoryEl = document.createElement('div');
        categoryEl.className = 'achievement-category';
        
        const titleEl = document.createElement('div');
        titleEl.className = 'achievement-category-title';
        titleEl.textContent = title;
        categoryEl.appendChild(titleEl);
        
        // 添加该分类的成就
        for (const [key, achievement] of Object.entries(ACHIEVEMENT_DB)) {
            if (achievement.category === category) {
                const isUnlocked = unlockedAchievements.has(key);
                const itemEl = document.createElement('div');
                itemEl.className = `achievement-item ${isUnlocked ? 'unlocked' : ''}`;
                itemEl.innerHTML = `
                    <div class="achievement-item-icon">${achievement.icon}</div>
                    <div class="achievement-item-info">
                        <div class="achievement-item-name">${achievement.name}</div>
                        <div class="achievement-item-desc">${achievement.desc}</div>
                    </div>
                `;
                categoryEl.appendChild(itemEl);
            }
        }
        
        list.appendChild(categoryEl);
    }
}

// 关闭成就面板
function closeAchievementsPanel() {
    document.getElementById('achievements-panel').classList.remove('show');
}

// 点击面板外部关闭
document.addEventListener('click', (e) => {
    const panel = document.getElementById('achievements-panel');
    const btn = document.getElementById('view-achievements');
    if (panel && !panel.contains(e.target) && btn && !btn.contains(e.target)) {
        closeAchievementsPanel();
    }
});

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
        gameState.map = {
            floor: data.map.floor || 1,
            currentNode: data.map.currentNode || null,
            completedNodes: new Set(data.map.completedNodes || []),
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
        
        // 恢复战斗状态（如果有）
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
            console.log('[存档] 战斗状态已恢复，手牌数:', gameState.battle.hand.length);
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
    console.log('[存档] 存档已清除');
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
    const saveInfo = document.getElementById('save-info');
    const saveTime = document.getElementById('save-time');
    
    if (hasSave()) {
        continueBtn.style.display = 'block';
        saveInfo.style.display = 'block';
        saveTime.textContent = getSaveTime();
        continueBtn.textContent = `继续游戏 (${getSaveTime()})`;
    } else {
        continueBtn.style.display = 'none';
        clearBtn.style.display = 'none';
        saveInfo.style.display = 'none';
    }
}

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
        startingDeck: ['strike', 'strike', 'strike', 'strike', 'defend', 'defend', 'quick_attack', 'quick_attack', 'dagger_throw', 'backstab'],
        // 职业专属技能（冷却制）
        specialSkill: {
            name: '背刺',
            icon: '🗡️💨',
            desc: '对敌人造成 12 点伤害，如果敌人身后有队友则伤害翻倍',
            cost: 0,  // 不消耗能量，但有冷却
            cooldown: 3,  // 3 回合冷却
            maxCooldown: 3
        }
    },
    // ==================== 新增职业 ====================
    monk: {
        name: '武僧',
        icon: '🥋',
        maxHp: 70,
        energy: 3,
        startingDeck: ['strike', 'strike', 'defend', 'defend', 'punch', 'punch', 'kick', 'meditate', 'focus', 'iron_skin'],
        specialSkill: {
            name: '气功波',
            icon: '🌊',
            desc: '对所有敌人造成 8 点伤害，恢复 5 点生命',
            cost: 0,
            cooldown: 4,
            maxCooldown: 4
        }
    },
    paladin: {
        name: '圣骑士',
        icon: '✨',
        maxHp: 90,
        energy: 3,
        startingDeck: ['strike', 'strike', 'defend', 'defend', 'holy_strike', 'holy_strike', 'heal_light', 'divine_shield', 'blessing', 'smite'],
        specialSkill: {
            name: '圣光审判',
            icon: '⚖️✨',
            desc: '对敌人造成 15 点伤害，恢复自身 10 点生命',
            cost: 0,
            cooldown: 4,
            maxCooldown: 4
        }
    }
};

// 职业专属卡牌池（只能该职业获得）
const CLASS_EXCLUSIVE_CARDS = {
    warrior: ['war_cry', 'whirling_strike', 'last_stand', 'retaliate', 'execute'],
    mage: ['lightning_bolt', 'ice_shield', 'teleport', 'meteor_shower', 'time_warp'],
    rogue: ['shadow_step', 'poison_dagger', 'eviscerate', 'smoke_bomb', 'assassination'],
    monk: ['punch', 'kick', 'meditate', 'focus', 'iron_skin'],
    paladin: ['holy_strike', 'heal_light', 'divine_shield', 'blessing', 'smite']
};

// 职业专属遗物
const CLASS_RELICS = {
    warrior: ['berserker_armor', 'war_horn'],
    mage: ['archmage_staff', 'mana_crystal'],
    rogue: ['shadow_cloak', 'thief_ring'],
    monk: ['mystic_beads', 'dragon_gauntlets'],
    paladin: ['holy_avenger', 'divine_amulet']
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
    seeing_red: { name: '看见红色', cost: 1, type: 'skill', icon: '🔴', desc: '获得 2 点能量，将这张牌放入抽牌堆', effect: { energy: 2, shuffle: true } },
    
    // ==================== 新增战士卡牌（5 张） ====================
    war_cry: { name: '战吼', cost: 1, type: 'skill', icon: '📢', desc: '造成 5 点伤害，抽 1 张牌，获得 5 点格挡', effect: { damage: 5, draw: 1, block: 5 } },
    whirling_strike: { name: '旋风斩', cost: 2, type: 'attack', icon: '🌪️', desc: '对所有敌人造成 6 点伤害', effect: { damage: 6, area: true } },
    last_stand: { name: '殊死一搏', cost: 0, type: 'attack', icon: '⚔️', desc: '每损失 10 点生命造成 3 点额外伤害', effect: { damage: 3, hp_bonus: true } },
    retaliate: { name: '反击', cost: 1, type: 'skill', icon: '🛡️', desc: '本回合受伤时对攻击者造成 5 点伤害', effect: { retaliate: 5 } },
    execute: { name: '处决', cost: 2, type: 'attack', icon: '💀', desc: '对生命值低于 50% 的敌人造成 25 点伤害', effect: { damage: 25, execute: true } },
    
    // ==================== 新增法师卡牌（5 张） ====================
    lightning_bolt: { name: '闪电链', cost: 1, type: 'attack', icon: '⚡', desc: '造成 7 点伤害，随机弹射到另一个敌人造成 4 点伤害', effect: { damage: 7, bounce: 4 } },
    ice_shield: { name: '冰霜护盾', cost: 1, type: 'defense', icon: '❄️', desc: '获得 8 点格挡，下回合敌人伤害 -2', effect: { block: 8, weaken_next: 2 } },
    teleport: { name: '传送', cost: 0, type: 'skill', icon: '🌀', desc: '抽 2 张牌，丢弃 1 张', effect: { draw: 2, discard: 1 } },
    meteor_shower: { name: '陨石雨', cost: 3, type: 'attack', icon: '☄️', desc: '对所有敌人造成 10 点伤害', effect: { damage: 10, area: true } },
    time_warp: { name: '时间扭曲', cost: 2, type: 'skill', icon: '⏰', desc: '本回合额外获得 2 点能量', effect: { extra_energy: 2 } },
    
    // ==================== 新增盗贼卡牌（5 张） ====================
    shadow_step: { name: '暗影步', cost: 0, type: 'skill', icon: '👤', desc: '下张攻击牌伤害翻倍', effect: { next_damage_double: true } },
    poison_dagger: { name: '毒刃', cost: 1, type: 'attack', icon: '☠️', desc: '造成 5 点伤害，施加 2 层中毒', effect: { damage: 5, poison: 2 } },
    eviscerate: { name: '绞杀', cost: 2, type: 'attack', icon: '🔪', desc: '造成 8 点伤害，如果敌人有负面状态则额外造成 8 点', effect: { damage: 8, debuff_bonus: 8 } },
    smoke_bomb: { name: '烟雾弹', cost: 1, type: 'skill', icon: '💨', desc: '获得 10 点格挡，抽 1 张牌，敌人下回合命中率 -50%', effect: { block: 10, draw: 1, miss_chance: 0.5 } },
    assassination: { name: '暗杀', cost: 3, type: 'attack', icon: '💀', desc: '造成 20 点伤害，如果击杀敌人则抽 2 张牌', effect: { damage: 20, kill_draw: 2 } },
    
    // ==================== 武僧专属卡牌（5 张） ====================
    punch: { name: '拳击', cost: 1, type: 'attack', icon: '👊', desc: '造成 7 点伤害，如果本回合未受伤则额外造成 3 点', effect: { damage: 7, combo: 3 } },
    kick: { name: '飞踢', cost: 2, type: 'attack', icon: '🦵', desc: '造成 10 点伤害，获得 5 点格挡', effect: { damage: 10, block: 5 } },
    meditate: { name: '冥想', cost: 0, type: 'skill', icon: '🧘', desc: '恢复 5 点生命，抽 1 张牌', effect: { heal: 5, draw: 1 } },
    focus: { name: '专注', cost: 1, type: 'skill', icon: '🎯', desc: '本回合下张卡牌消耗 -1（最低 0）', effect: { next_cost_minus: 1 } },
    iron_skin: { name: '铁布衫', cost: 2, type: 'defense', icon: '🛡️', desc: '获得 15 点格挡，本回合受伤减半', effect: { block: 15, damage_halve: true } },
    
    // ==================== 圣骑士专属卡牌（5 张） ====================
    holy_strike: { name: '圣击', cost: 1, type: 'attack', icon: '⚔️✨', desc: '造成 8 点伤害，对亡灵敌人额外造成 6 点', effect: { damage: 8, undead_bonus: 6 } },
    heal_light: { name: '微光治愈', cost: 1, type: 'skill', icon: '💚', desc: '恢复 8 点生命', effect: { heal: 8 } },
    divine_shield: { name: '神圣护盾', cost: 2, type: 'defense', icon: '🛡️✨', desc: '获得 12 点格挡，下回合受到攻击时反弹 5 点伤害', effect: { block: 12, reflect: 5 } },
    blessing: { name: '祝福', cost: 1, type: 'skill', icon: '🙏', desc: '所有队友获得 3 点格挡，抽 1 张牌', effect: { team_block: 3, draw: 1 } },
    smite: { name: '制裁', cost: 2, type: 'attack', icon: '⚡✨', desc: '造成 12 点伤害，如果敌人有负面状态则额外造成 8 点', effect: { damage: 12, debuff_bonus: 8 } }
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
    boss_dragon: { name: '远古巨龙', hp: 200, icon: '🐲', pattern: 'boss', damage: 22 },
    
    // ==================== 新增敌人（5 个） ====================
    // 第一层新增
    spider: { name: '毒蜘蛛', hp: 25, icon: '🕷️', pattern: 'fast', damage: 7 },
    // 第二层新增
    vampire: { name: '吸血鬼', hp: 60, icon: '🧛', pattern: 'lifesteal', damage: 11 },
    golem: { name: '石像鬼', hp: 75, icon: '🗿', pattern: 'tank', damage: 9 },
    // 第三层新增
    phoenix: { name: '凤凰', hp: 90, icon: '🔥', pattern: 'regen', damage: 16 },
    lich_knight: { name: '巫骑士', hp: 85, icon: '💀⚔️', pattern: 'balanced', damage: 15 },
    
    // ==================== 新增 Boss（2 个） ====================
    boss_lich_king: { name: '巫妖王', hp: 250, icon: '👑💀', pattern: 'boss', damage: 25 },
    boss_ancient_dragon: { name: '上古邪龙', hp: 300, icon: '🐲🔥', pattern: 'boss', damage: 28 }
};

// 分层节点类型配置（扩展至 5 层）
const FLOOR_NODE_CONFIG = {
    1: {
        // 第一层：新手区 - 教学与适应
        battles: 0.55,      // 55% 战斗
        shops: 0.15,        // 15% 商店
        rests: 0.10,        // 10% 休息
        events: 0.13,       // 13% 事件
        elites: 0.02,       // 2% 精英
        boss: 0.05          // 5% Boss（第 3 行最后一个）
    },
    2: {
        // 第二层：新手区 - 深化与挑战
        battles: 0.60,      // 60% 战斗
        shops: 0.13,        // 13% 商店
        rests: 0.07,        // 7% 休息
        events: 0.13,       // 13% 事件
        elites: 0.02,       // 2% 精英
        boss: 0.05          // 5% Boss（第 3 行最后一个）
    },
    3: {
        // 第三层：进阶区 - 新敌人和机制
        battles: 0.65,      // 65% 战斗
        shops: 0.10,        // 10% 商店
        rests: 0.05,        // 5% 休息
        events: 0.10,       // 10% 事件
        elites: 0.05,       // 5% 精英
        boss: 0.05          // 5% Boss（迷你 Boss）
    },
    4: {
        // 第四层：进阶区 - 更高强度
        battles: 0.68,      // 68% 战斗
        shops: 0.08,        // 8% 商店
        rests: 0.04,        // 4% 休息
        events: 0.08,       // 8% 事件
        elites: 0.07,       // 7% 精英
        boss: 0.05          // 5% Boss（迷你 Boss）
    },
    5: {
        // 第五层：终局区 - 终极考验
        battles: 0.70,      // 70% 战斗
        shops: 0.06,        // 6% 商店
        rests: 0.02,        // 2% 休息
        events: 0.07,       // 7% 事件
        elites: 0.10,       // 10% 精英
        boss: 0.05          // 5% Boss（最终 Boss）
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
    gambling_chip: { name: '赌博筹码', icon: '🎰', desc: '战斗开始时丢弃任意张牌并抽等量牌', rarity: 'rare' },
    
    // ==================== 新增遗物（8 个） ====================
    // 普通遗物（4 个）
    lucky_gem: { name: '幸运宝石', icon: '💎', desc: '战斗开始时 30% 几率获得 5 点格挡', rarity: 'common' },
    vial_of_poison: { name: '毒液瓶', icon: '🧪', desc: '攻击敌人时 10% 几率施加 1 层中毒', rarity: 'common' },
    worn_cape: { name: '破旧斗篷', icon: '🧥', desc: '战斗开始时获得 5 点格挡', rarity: 'common' },
    copper_coin: { name: '铜币', icon: '🪙', desc: '每场战斗获得 10 金币', rarity: 'common' },
    
    // 稀有遗物（2 个）
    shadow_mirror: { name: '暗影之镜', icon: '🪞', desc: '每当你使用技能牌，对随机敌人造成 4 点伤害', rarity: 'uncommon' },
    phoenix_down: { name: '凤凰羽毛', icon: '🪶🔥', desc: '生命值降至 0 时保留 1 点生命并免疫所有伤害 1 回合（每场战斗一次）', rarity: 'rare' },
    
    // 传说遗物（2 个）
    dragon_heart: { name: '龙之心', icon: '❤️🐲', desc: '每损失 20% 生命，力量 +1', rarity: 'legendary' },
    time_keeper: { name: '时间守护者', icon: '⏰', desc: '每 3 回合，额外获得 2 点能量', rarity: 'legendary' },
    
    // ==================== 职业专属遗物（10 个） ====================
    // 战士专属
    berserker_armor: { name: '狂战士铠甲', icon: '👕⚔️', desc: '每损失 10 点生命，攻击伤害 +1', rarity: 'rare', exclusiveClass: 'warrior' },
    war_horn: { name: '战号角', icon: '🎺', desc: '战斗开始时，对所有敌人造成 5 点伤害', rarity: 'uncommon', exclusiveClass: 'warrior' },
    
    // 法师专属
    archmage_staff: { name: '大法师法杖', icon: '🪄✨', desc: '能量上限 +1', rarity: 'rare', exclusiveClass: 'mage' },
    mana_crystal: { name: '魔力水晶', icon: '💎🔮', desc: '每回合开始时恢复 1 点能量', rarity: 'uncommon', exclusiveClass: 'mage' },
    
    // 盗贼专属
    shadow_cloak: { name: '暗影斗篷', icon: '🧥👤', desc: '闪避几率 +15%（每回合一次）', rarity: 'rare', exclusiveClass: 'rogue' },
    thief_ring: { name: '盗贼戒指', icon: '💍🗡️', desc: '商店商品价格 -20%', rarity: 'uncommon', exclusiveClass: 'rogue' },
    
    // 武僧专属
    mystic_beads: { name: '神秘念珠', icon: '📿', desc: '每使用 5 张技能牌，恢复 10 点生命', rarity: 'rare', exclusiveClass: 'monk' },
    dragon_gauntlets: { name: '龙拳护手', icon: '🥊🐲', desc: '拳击和飞踢伤害 +3', rarity: 'uncommon', exclusiveClass: 'monk' },
    
    // 圣骑士专属
    holy_avenger: { name: '神圣复仇者', icon: '⚔️✨', desc: '对亡灵和恶魔敌人伤害 +5', rarity: 'rare', exclusiveClass: 'paladin' },
    divine_amulet: { name: '神圣护符', icon: '📿✨', desc: '治愈效果 +25%', rarity: 'uncommon', exclusiveClass: 'paladin' }
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

// Boss 战持续微震动（每 3 秒一次）
let bossShakeInterval = null;
function startBossShake() {
    if (bossShakeInterval) return;
    
    const enemy = gameState.battle.enemy;
    if (!enemy || !enemy.name.includes('Boss') && !enemy.name.includes('巨龙') && !enemy.name.includes('王')) {
        return;
    }
    
    bossShakeInterval = setInterval(() => {
        if (gameState.screen === 'battle') {
            shakeScreen('small');
        }
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
    // 加载最高分
    const savedScore = localStorage.getItem('dungeonCardHighScore');
    if (savedScore) {
        document.getElementById('menu-high-score').textContent = savedScore;
    }
    
    // 初始化收藏系统
    initCollection();
    
    // 初始化成就系统
    initAchievements();
    
    // 更新主菜单存档按钮状态
    updateMainMenu();
    
    // 绑定主菜单按钮
    document.getElementById('start-game').addEventListener('click', () => {
        initAudio();
        playSFX(SFX_TYPES.click);
        showScreen('class-select');
    });
    
    // 继续游戏按钮
    document.getElementById('continue-game').addEventListener('click', () => {
        playSFX(SFX_TYPES.click);
        if (loadGame()) {
            showScreen('map-screen');
            // 如果地图数据已恢复，直接渲染；否则生成新地图
            if (gameState.map.paths && gameState.map.paths.length > 0) {
                console.log('[继续游戏] 使用已保存的地图数据');
                renderMap(); // 只渲染，不重新生成
            } else {
                console.log('[继续游戏] 无地图数据，生成新地图');
                generateMap();
            }
        } else {
            alert('存档加载失败，请重新开始游戏');
        }
    });
    
    // 游戏统计按钮
    document.getElementById('view-stats').addEventListener('click', showStatsModal);
    
    // 查看成就
    document.getElementById('view-achievements').addEventListener('click', showAchievementsPanel);
    
    // 查看收藏
    document.getElementById('view-collection').addEventListener('click', showCollectionPanel);
    
    // 查看战斗日志
    document.getElementById('view-combat-log').addEventListener('click', showCombatLogPanel);
    
    // 点击面板外部关闭
    document.addEventListener('click', (e) => {
        const achievementsPanel = document.getElementById('achievements-panel');
        const collectionPanel = document.getElementById('collection-panel');
        const combatLogPanel = document.getElementById('combat-log-panel');
        const achievementsBtn = document.getElementById('view-achievements');
        const collectionBtn = document.getElementById('view-collection');
        const combatLogBtn = document.getElementById('view-combat-log');
        
        if (achievementsPanel && !achievementsPanel.contains(e.target) && achievementsBtn && !achievementsBtn.contains(e.target)) {
            closeAchievementsPanel();
        }
        
        if (collectionPanel && !collectionPanel.contains(e.target) && collectionBtn && !collectionBtn.contains(e.target)) {
            closeCollectionPanel();
        }
        
        if (combatLogPanel && !combatLogPanel.contains(e.target) && combatLogBtn && !combatLogBtn.contains(e.target)) {
            combatLogPanel.classList.remove('show');
        }
    });
    
    // 查看遗物（地图界面和战斗界面）
    const viewRelicsBtn = document.getElementById('view-relics');
    if (viewRelicsBtn) viewRelicsBtn.addEventListener('click', showRelicsList);
    
    const viewRelicsMapBtn = document.getElementById('view-relics-map');
    if (viewRelicsMapBtn) viewRelicsMapBtn.addEventListener('click', showRelicsList);
    
    const viewRelicsBattleBtn = document.getElementById('view-relics-battle');
    if (viewRelicsBattleBtn) viewRelicsBattleBtn.addEventListener('click', showRelicsList);
    
    const closeRelicsBtn = document.getElementById('close-relics');
    if (closeRelicsBtn) closeRelicsBtn.addEventListener('click', closeRelicsList);
    
    // 职业选择
    document.querySelectorAll('.class-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
        });
    });
    
    // 难度选择
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });
    
    document.getElementById('confirm-class').addEventListener('click', startNewGame);
    document.getElementById('back-to-menu').addEventListener('click', () => showScreen('main-menu'));
    
    // 其他按钮绑定
    const viewDeckBtn = document.getElementById('view-deck');
    if (viewDeckBtn) viewDeckBtn.addEventListener('click', showDeckModal);
    
    const viewDeckMapBtn = document.getElementById('view-deck-map');
    if (viewDeckMapBtn) viewDeckMapBtn.addEventListener('click', showDeckModal);
    
    const closeDeckBtn = document.getElementById('close-deck');
    if (closeDeckBtn) closeDeckBtn.addEventListener('click', hideDeckModal);
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
    document.getElementById('rest-heal').addEventListener('click', restHeal);
    document.getElementById('rest-upgrade').addEventListener('click', restUpgrade);
}

function startNewGame() {
    const selectedClass = document.querySelector('.class-card.selected').dataset.class;
    const selectedDifficulty = document.querySelector('.difficulty-btn.selected').dataset.difficulty || 'normal';
    const classData = CLASSES[selectedClass];
    
    // 根据难度调整参数
    let hpMultiplier = 1;
    let enemyDamageMultiplier = 1;
    let goldMultiplier = 1;
    
    if (selectedDifficulty === 'easy') {
        hpMultiplier = 1.2;  // 初始生命 +20%
        enemyDamageMultiplier = 0.8;  // 敌人伤害 -20%
        goldMultiplier = 1;
    } else if (selectedDifficulty === 'hard') {
        hpMultiplier = 1;
        enemyDamageMultiplier = 1.3;  // 敌人伤害 +30%
        goldMultiplier = 0.8;  // 金币 -20%
    }
    
    // 根据职业设置初始金币（战士 100，法师 80，盗贼 120）
    const initialGold = Math.floor((selectedClass === 'warrior' ? 100 :
                       selectedClass === 'mage' ? 80 : 120) * goldMultiplier);
    
    // 初始化玩家状态
    gameState.player = {
        class: selectedClass,
        difficulty: selectedDifficulty,
        hp: Math.floor(classData.maxHp * hpMultiplier),
        maxHp: Math.floor(classData.maxHp * hpMultiplier),
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
    
    // 首次游戏：启动新手引导
    startTutorialIfFirstTime();
}

// ==================== 地图系统 ====================

// 渲染地图（只渲染，不重新生成数据）
function renderMap() {
    console.log('[渲染地图] 开始渲染');
    console.log('[渲染地图] 楼层:', gameState.map.floor);
    console.log('[渲染地图] 路径:', gameState.map.paths);
    console.log('[渲染地图] 节点类型:', gameState.map.nodeTypes);
    console.log('[渲染地图] 已完成节点:', Array.from(gameState.map.completedNodes));
    
    if (!gameState.map.paths || gameState.map.paths.length === 0) {
        console.error('[渲染地图] 错误：没有路径数据！');
        // 如果没路径，生成新地图
        generateMap();
        return;
    }
    
    if (!gameState.map.nodeTypes || Object.keys(gameState.map.nodeTypes).length === 0) {
        console.error('[渲染地图] 错误：没有节点类型数据！');
        // 如果没节点类型，生成新地图
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
    
    // 添加地图说明
    const mapInfo = document.createElement('div');
    mapInfo.className = 'map-info';
    
    let floorHint = '';
    if (floor === 1) {
        floorHint = '🌱 第一层：新手区 - 熟悉机制，谨慎探索';
    } else if (floor === 2) {
        floorHint = '⚔️ 第二层：新手区 - 策略规划，资源管理';
    } else if (floor === 3) {
        floorHint = '🔥 第三层：进阶区 - 新挑战，新敌人';
    } else if (floor === 4) {
        floorHint = '💀 第四层：进阶区 - 高强度战斗';
    } else {
        floorHint = '👹 第五层：终局区 - 终极考验，全力以赴！';
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
    
    // 根据楼层动态设置行数（逐渐增加游戏流程）
    const rows = floor <= 1 ? 3 : (floor <= 2 ? 4 : (floor <= 3 ? 4 : 5));
    const nodesPerRow = 5;
    
    // 清空节点数组，重新构建
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
            
            nodeEl.innerHTML = `
                <span>${icons[type]}</span>
                <span class="node-label">${getNodeLabel(type)}</span>
            `;
            
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
                // Boss 行特殊处理：只要前一行的任意节点完成，Boss 节点就可用
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
    
    // 生成路径连线（延迟执行，确保元素已渲染）
    setTimeout(() => {
        generatePathLines(nodesContainer, gameState.map.paths);
    }, 100);
}

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
    
    // 根据楼层显示不同的提示（5 层扩展）
    let floorHint = '';
    if (floor === 1) {
        floorHint = '🌱 第一层：新手区 - 熟悉机制，谨慎探索';
    } else if (floor === 2) {
        floorHint = '⚔️ 第二层：新手区 - 策略规划，资源管理';
    } else if (floor === 3) {
        floorHint = '🔥 第三层：进阶区 - 新挑战，新敌人';
    } else if (floor === 4) {
        floorHint = '💀 第四层：进阶区 - 高强度战斗';
    } else {
        floorHint = '👹 第五层：终局区 - 终极考验，全力以赴！';
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
    // 根据楼层动态设置行数（逐渐增加游戏流程）
    const rows = floor <= 1 ? 3 : (floor <= 2 ? 4 : (floor <= 3 ? 4 : 5));
    const nodesPerRow = 5;  // 每行 5 个节点
    
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
            } else if (rowHasCompleted.has(row) && row < rows - 1) {
                // 只有非 Boss 行才检查"该行已完成则锁定其他节点"
                nodeEl.classList.add('locked');
            } else if (row === 0 && isOnAnyPath) {
                // 第一行可达的节点默认可用
                nodeEl.classList.add('available');
            } else if (row === rows - 1 && isOnAnyPath) {
                // Boss 行特殊处理：只要前一行的任意节点完成，Boss 节点就可用
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
    
    // 根据楼层动态计算总节点数（行数逐渐增加）
    const rows = floor <= 1 ? 3 : (floor <= 2 ? 4 : (floor <= 3 ? 4 : 5));
    const nodesPerRow = 5;
    const totalNodes = rows * nodesPerRow;
    
    const counts = {
        battle: Math.floor(totalNodes * config.battles),
        shop: Math.floor(totalNodes * config.shops),
        rest: Math.floor(totalNodes * config.rests),
        event: Math.floor(totalNodes * config.events),
        elite: Math.floor(totalNodes * config.elites)
    };
    
    // 确保总数正确，调整战斗数量
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
    
    // 只记录当前节点
    gameState.map.currentNode = node;
    
    // 根据节点类型决定是否立即标记为完成
    const isCombatNode = node.type === 'battle' || node.type === 'elite' || node.type === 'boss';
    
    if (!isCombatNode) {
        // 非战斗节点（商店、休息处、事件）立即标记为完成
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
            // 随机判断是否为特殊战斗（根据楼层难度）
            const floor = gameState.map.floor;
            let isElite = false;
            let isDouble = false;
            
            // 第 3-5 层有概率出现特殊战斗
            if (floor >= 3) {
                const specialChance = Math.random();
                if (floor >= 4 && specialChance < 0.15) {
                    isElite = true; // 15% 概率精英战
                } else if (specialChance < 0.10) {
                    isDouble = true; // 10% 概率连续战斗
                }
            }
            
            if (isElite) {
                startBattle(false, true, false);
            } else if (isDouble) {
                startBattle(false, false, true);
            } else {
                startBattle(false);
            }
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

function startBattle(isBoss, isElite = false, isDouble = false) {
    const floor = gameState.map.floor;
    let enemyType;
    
    // 初始化战斗日志
    initCombatLog();
    
    // 特殊战斗标记
    if (isDouble) {
        addCombatLog('info', '⚠️ 连续战斗！你将面对两个敌人！');
    }
    if (isElite) {
        addCombatLog('info', '💀 精英守卫！敌人更强，但奖励更丰厚！');
    }
    
    // 计算难度系数（每层增加 20% 难度）
    let difficultyMultiplier = 1 + (floor - 1) * 0.2;
    
    // 特殊战斗难度加成
    if (isElite) difficultyMultiplier *= 1.5;
    if (isDouble) difficultyMultiplier *= 1.3;
    
    if (isBoss) {
        // Boss 战开始，启动持续震动
        startBossShake();
        // Boss 额外增加 30% 难度
        const bossMultiplier = difficultyMultiplier * 1.3;
        
        // 根据楼层选择 Boss
        if (floor === 1) enemyType = 'boss_goblin_king';           // 第 1 层：哥布林王
        else if (floor === 2) enemyType = 'boss_lich';             // 第 2 层：巫妖
        else if (floor === 3) enemyType = 'boss_poison_spider';    // 第 3 层：毒蜘蛛（迷你 Boss）
        else if (floor === 4) enemyType = 'boss_vampire';          // 第 4 层：吸血鬼（迷你 Boss）
        else enemyType = 'boss_dragon';                            // 第 5 层：上古邪龙（最终 Boss）
        
        // 创建带难度调整的 Boss
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
        // 根据层数选择敌人池（5 层扩展）
        let enemyPool;
        if (floor === 1) {
            // 第 1 层：新手敌人
            enemyPool = ['goblin', 'slime', 'skeleton'];
        } else if (floor === 2) {
            // 第 2 层：中等难度敌人
            enemyPool = ['orc', 'dark_mage', 'werewolf'];
        } else if (floor === 3) {
            // 第 3 层：进阶敌人（新增）
            enemyPool = ['orc', 'dark_mage', 'werewolf', 'stone_golem', 'phantom'];
        } else if (floor === 4) {
            // 第 4 层：高难度敌人（新增）
            enemyPool = ['demon', 'dragon', 'stone_golem', 'phantom', 'necromancer'];
        } else {
            // 第 5 层：终极敌人
            enemyPool = ['demon', 'dragon', 'necromancer', 'chaos_beast'];
        }
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
    
    // 初始化战斗状态（如果是新战斗，而不是从存档恢复）
    if (!gameState.battle.hand || gameState.battle.hand.length === 0) {
        gameState.battle.hand = [];
        gameState.battle.drawPile = shuffle([...gameState.player.deck]);
        gameState.battle.discardPile = [];
        gameState.battle.exhaustPile = [];
        gameState.battle.turn = 1;
        gameState.battle.firstAttack = true;
        gameState.battle.noDraw = false;
        gameState.battle.ornamentalFanCount = 0;
    } else {
        // 从存档恢复战斗状态
        console.log('[战斗] 从存档恢复战斗状态');
        console.log('[战斗] 手牌数:', gameState.battle.hand.length);
        console.log('[战斗] 抽牌堆数:', gameState.battle.drawPile.length);
    }
    
    // 确保玩家格挡重置（除非从存档恢复）
    if (!gameState.battle.hand || gameState.battle.turn === 1) {
        gameState.player.block = 0;
    }
    
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
    
    // 根据层数选择精英敌人（扩展至 5 层）
    if (floor === 1) {
        // 第一层没有精英（配置为 0）
        startBattle(false);
        return;
    } else if (floor === 2) {
        enemyType = 'elite_orc';
    } else if (floor === 3) {
        enemyType = 'elite_demon';
    } else if (floor === 4) {
        enemyType = 'elite_dragon';
    } else {
        // 第 5 层终极精英
        enemyType = 'elite_ancient_dragon';
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
    
    // 更新敌人显示（使用 SVG 图像）
    const enemySpriteEl = document.querySelector('.enemy-sprite');
    const enemyType = enemy.type;
    const cssClass = ENEMY_CSS_CLASSES[enemyType] || enemyType;
    
    // 设置 SVG 图像
    enemySpriteEl.innerHTML = ENEMY_SPRITES[enemyType] || enemy.icon;
    enemySpriteEl.className = `enemy-sprite ${cssClass}`;
    enemySpriteEl.classList.remove('dead');
    
    // 如果是新进入战斗，触发登场动画
    if (!enemySpriteEl.dataset.entered) {
        enemySpriteEl.dataset.entered = 'true';
        setTimeout(() => {
            enemySpriteEl.classList.add('enemy-enter');
        }, 100);
    }
    
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
        
        // 添加延迟动画，让卡牌一张张出现
        cardEl.style.animationDelay = `${index * 0.05}s`;
        
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
            if (i === 0) playSFX(SFX_TYPES.attack);
        }
        
        gameState.battle.firstAttack = false;
    }
    
    // 格挡
    if (effect.block) {
        let block = effect.block;
        // 敏捷加成
        block += player.stats.dexterity;
        player.block += block;
        
        // 记录格挡日志
        addCombatLog('block', `获得格挡`, block);
        
        playSFX(SFX_TYPES.block);
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
    
    // 治疗
    if (effect.heal) {
        let healAmount = effect.heal;
        
        // 治疗量加成（如果有相关遗物或 buff）
        // 例如：圣杯类遗物可以增加治疗效果
        
        // 执行治疗
        const oldHp = player.hp;
        player.hp = Math.min(player.hp + healAmount, player.maxHp);
        const actualHeal = player.hp - oldHp;
        
        // 记录治疗日志
        addCombatLog('heal', `恢复 ${actualHeal} 点生命`, actualHeal);
        
        playSFX(SFX_TYPES.heal);
        showDamage(document.querySelector('.player-area'), actualHeal, 'heal');
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
        
        // 记录格挡日志
        if (amount > 0) {
            addCombatLog('info', `${enemy.name}的格挡吸收了 ${blockDamage} 点伤害`);
        }
    }
    
    // 扣除生命
    if (amount > 0) {
        enemy.currentHp -= amount;
        
        // 记录伤害日志
        addCombatLog('damage', `造成`, amount);
        
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
        
        // 如果触发了格挡，添加格挡效果
        if (oldHp - enemy.currentHp < amount) {
            createBlockEffect(enemyEl);
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
            
            // 记录格挡日志
            if (damage > 0) {
                addCombatLog('block', `格挡吸收了 ${blockAbsorb} 点伤害`);
            }
        }
        
        // 受到伤害
        if (damage > 0) {
            gameState.player.hp -= damage;
            
            // 记录受伤日志
            addCombatLog('damage', `${gameState.battle.enemy.name}对你造成`, damage);
            
            const playerArea = document.querySelector('.player-area');
            showDamage(playerArea, damage, 'damage');
            shakeElement(playerArea);
            
            // 添加玩家受击粒子效果
            createDamageNumber(playerArea, damage, damage > gameState.player.maxHp * 0.3);
            createSparks(playerArea, damage > 10 ? 12 : 6);
            
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
    // 停止 Boss 战震动
    stopBossShake();
    
    // 播放胜利音效
    playSFX(SFX_TYPES.win);
    
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
        // 记录治疗日志
        addCombatLog('heal', `恢复生命`, actualHeal);
        
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
    
    // 记录收藏
    recordCard(cardId);
    
    // 获取卡牌信息
    const card = CARD_DB[cardId];
    
    // 使用 alert 提示
    playSFX(SFX_TYPES.card_get);
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
    
    // 记录收藏
    recordRelic(relicId);
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
    // 游戏结束（胜利或失败）时清除存档
    clearSave();
    
    // 播放胜利或失败音效
    if (victory) {
        playSFX(SFX_TYPES.win);
    } else {
        playSFX(SFX_TYPES.lose);
    }
    
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
}

// ==================== 启动游戏 ====================

document.addEventListener('DOMContentLoaded', initGame);

// 页面关闭/刷新前自动保存
window.addEventListener('beforeunload', () => {
    if (gameState.player && gameState.player.class) {
        saveGame();
    }
});

