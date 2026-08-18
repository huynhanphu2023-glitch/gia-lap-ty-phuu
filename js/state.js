const GameState = {
    time: {
        tick: 0,
        hour: 8,
        day: 1,
        month: 1,
        year: 2026,
        speed: 1,
        isPaused: false
    },
    player: {
        name: "Nguyễn Văn A",
        title: "Nhà đầu tư khởi nghiệp"
    },
    personalFinance: {
        cash: 1000000000, // 1 tỷ VNĐ vốn khởi đầu cá nhân
        assetsValue: 0
    },
    companies: [],
    economy: {
        inflationRate: 0.04,
        gdpIndex: 100
    },
    markets: {},
    npcs: {},
    production: {},
    logistics: {},
    banks: {},
    properties: {},
    employees: {},
    events: [],
    world: {
        regions: ["Phường 1", "Phường 8"]
    }
};

const SaveSystem = {
    save() {
        localStorage.setItem('CaMauEmpireSave', JSON.stringify(GameState));
        EventBus.emit('gameSaved');
    },
    load() {
        const data = localStorage.getItem('CaMauEmpireSave');
        if (data) {
            const parsed = JSON.parse(data);
            Object.assign(GameState, parsed);
            EventBus.emit('gameLoaded');
            return true;
        }
        return false;
    },
    reset() {
        localStorage.removeItem('CaMauEmpireSave');
        location.reload();
    }
};
const GameState = {
    time: {
        tick: 0,
        hour: 8,
        day: 1,
        month: 1,
        year: 2026,
        speed: 1,
        isPaused: false
    },
    player: {
        name: "Nguyễn Văn A",
        title: "Nhà đầu tư khởi nghiệp"
    },
    personalFinance: {
        cash: 1000000000,
        assetsValue: 0
    },
    companies: [],
    economy: {
        inflationRate: 0.04,
        gdpIndex: 100
    },
    markets: {},
    npcs: {
        list: [], // Danh sách các NPC trong game
        totalPopulation: 500
    },
    production: {},
    logistics: {},
    banks: {},
    properties: {},
    employees: {},
    events: [],
    world: {
        regions: [
            { id: "p1", name: "Phường 1", population: 300, avgIncome: 8000000, economicActivity: "Thương mại & Dịch vụ" },
            { id: "p8", name: "Phường 8", population: 200, avgIncome: 6000000, economicActivity: "Dân cư & Tiểu thủ công" }
        ]
    }
};

const SaveSystem = {
    save() {
        localStorage.setItem('CaMauEmpireSave', JSON.stringify(GameState));
        EventBus.emit('gameSaved');
    },
    load() {
        const data = localStorage.getItem('CaMauEmpireSave');
        if (data) {
            const parsed = JSON.parse(data);
            Object.assign(GameState, parsed);
            EventBus.emit('gameLoaded');
            return true;
        }
        return false;
    },
    reset() {
        localStorage.removeItem('CaMauEmpireSave');
        location.reload();
    }
};
