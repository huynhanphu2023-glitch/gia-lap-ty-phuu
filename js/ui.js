const UI = {
    init() {
        this.cacheDom();
        this.bindEvents();
        this.render();
    },

    cacheDom() {
        this.elTick = document.getElementById('stat-tick');
        this.elDate = document.getElementById('stat-date');
        this.elCash = document.getElementById('stat-cash');
        this.elSpeed = document.getElementById('stat-speed');
        this.elLog = document.getElementById('log-container');
        
        document.getElementById('btn-pause').addEventListener('click', () => GameEngine.togglePause());
        document.getElementById('btn-speed-1').addEventListener('click', () => GameEngine.setSpeed(1));
        document.getElementById('btn-speed-2').addEventListener('click', () => GameEngine.setSpeed(2));
        document.getElementById('btn-speed-5').addEventListener('click', () => GameEngine.setSpeed(5));
        document.getElementById('btn-save').addEventListener('click', () => SaveSystem.save());
        document.getElementById('btn-reset').addEventListener('click', () => SaveSystem.reset());
        
        document.getElementById('btn-spend-living').addEventListener('click', () => {
            const cost = 500000;
            if (GameState.personalFinance.cash >= cost) {
                GameState.personalFinance.cash -= cost;
                this.log(`Chi phí sinh hoạt cá nhân: -${cost.toLocaleString()} VNĐ`);
                this.render();
            } else {
                this.log(`Lỗi: Không đủ tiền mặt cá nhân để chi tiêu sinh hoạt!`);
            }
        });
    },

    bindEvents() {
        EventBus.on('tick', () => this.render());
        EventBus.on('dayPassed', (day) => this.log(`--- Ngày ${day} / Tháng ${GameState.time.month} / Năm ${GameState.time.year} ---`));
        EventBus.on('monthPassed', (month) => this.log(`=== Kết thúc Tháng ${month} ===`));
        EventBus.on('gameSaved', () => this.log(`[Hệ thống]: Đã lưu game vào bộ nhớ trình duyệt.`));
        EventBus.on('gameLoaded', () => this.log(`[Hệ thống]: Đã tải game từ bộ nhớ.`));
        EventBus.on('pauseToggled', (isPaused) => this.log(isPaused ? `[Hệ thống]: Game đã TẠM DỪNG.` : `[Hệ thống]: Game tiếp tục chạy.`));
    },

    log(message) {
        const div = document.createElement('div');
        div.className = 'log-item';
        div.innerText = `[Giờ ${GameState.time.hour}:00] ${message}`;
        this.elLog.prepend(div);
        if (this.elLog.children.length > 50) {
            this.elLog.removeChild(this.elLog.lastChild);
        }
    },

    render() {
        if (this.elTick) this.elTick.innerText = GameState.time.tick;
        if (this.elDate) this.elDate.innerText = `Ngày ${GameState.time.day}/${GameState.time.month}/${GameState.time.year} (${GameState.time.hour}:00)`;
        if (this.elCash) this.elCash.innerText = GameState.personalFinance.cash.toLocaleString('vi-VN') + " VNĐ";
        if (this.elSpeed) this.elSpeed.innerText = `${GameState.time.speed}x (${GameState.time.isPaused ? 'Tạm dừng' : 'Chạy'})`;
    }
};

window.addEventListener('DOMContentLoaded', () => {
    GameEngine.init();
    UI.init();
});
