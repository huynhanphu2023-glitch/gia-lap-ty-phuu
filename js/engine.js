const GameEngine = {
    timer: null,
    baseInterval: 1000, // 1 giây mỗi tick ở tốc độ 1x

    init() {
        if (SaveSystem.load()) {
            console.log("Đã tải trạng thái game cũ.");
        } else {
            console.log("Khởi tạo trạng thái game mới.");
        }
        this.start();
    },

    start() {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            if (!GameState.time.isPaused) {
                this.processTick();
            }
        }, this.baseInterval / GameState.time.speed);
    },

    setSpeed(speed) {
        GameState.time.speed = speed;
        this.start();
    },

    togglePause() {
        GameState.time.isPaused = !GameState.time.isPaused;
        EventBus.emit('pauseToggled', GameState.time.isPaused);
    },

    processTick() {
        GameState.time.tick++;
        GameState.time.hour++;

        if (GameState.time.hour >= 24) {
            GameState.time.hour = 0;
            GameState.time.day++;
            EventBus.emit('dayPassed', GameState.time.day);

            if (GameState.time.day > 30) {
                GameState.time.day = 1;
                GameState.time.month++;
                EventBus.emit('monthPassed', GameState.time.month);

                if (GameState.time.month > 12) {
                    GameState.time.month = 1;
                    GameState.time.year++;
                    EventBus.emit('yearPassed', GameState.time.year);
                }
            }
        }

        EventBus.emit('tick', GameState.time.tick);
    }
};
