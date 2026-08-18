const NPCManager = {
    init() {
        if (GameState.npcs.list.length === 0) {
            this.generateInitialNPCs();
        }
        EventBus.on('dayPassed', (day) => this.processDailyCycle(day));
    },

    generateInitialNPCs() {
        const firstNames = ["Văn", "Thị", "Hoàng", "Minh", "Thanh", "Ngọc", "Hồng", "Tuấn", "Hải", "Phương"];
        const middleNames = ["Đức", "Thị Mỹ", "Văn", "Gia", "Hữu", "Khánh", "Thu", "Quốc"];
        const lastNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ"];
        const jobs = [
            { title: "Nhân viên văn phòng", income: 250000 },
            { title: "Công nhân", income: 180000 },
            { title: "Tiểu thương", income: 350000 },
            { title: "Lập trình viên", income: 500000 },
            { title: "Thợ xây", income: 200000 }
        ];

        // Khởi tạo 20 NPC đại diện cho nền kinh tế vi mô
        for (let i = 1; i <= 20; i++) {
            const fName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const mName = middleNames[Math.floor(Math.random() * middleNames.length)];
            const lName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const job = jobs[Math.floor(Math.random() * jobs.length)];
            const region = GameState.world.regions[Math.floor(Math.random() * GameState.world.regions.length)];

            GameState.npcs.list.push({
                id: i,
                name: `${fName} ${mName} ${lName}`,
                regionId: region.id,
                jobTitle: job.title,
                dailyIncome: job.income,
                cash: Math.floor(Math.random() * 10000000) + 2000000,
                consumptionNeeds: Math.floor(job.income * 0.6) // Tiêu dùng 60% thu nhập mỗi ngày
            });
        }
    },

    processDailyCycle(day) {
        // Mỗi ngày NPC nhận lương và chi tiêu sinh hoạt, tạo ra dòng tiền trong thị trường
        GameState.npcs.list.forEach(npc => {
            npc.cash += npc.dailyIncome;
            // Chi tiêu nhu cầu cơ bản
            if (npc.cash >= npc.consumptionNeeds) {
                npc.cash -= npc.consumptionNeeds;
            }
        });
        EventBus.emit('npcsUpdated');
    }
};
