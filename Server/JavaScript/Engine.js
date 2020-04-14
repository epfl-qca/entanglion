export var EngineCard = Object.freeze({
    H: 1,
    CNOT: 2,
    X: 3,
    SWAP: 4,
    PROBE: 5,
    initial_count: {
        1: 8,
        2: 7,
        3: 5,
        4: 3,
        5: 1
    }
})

export const EngineCards = [EngineCard.H, EngineCard.CNOT, EngineCard.X, EngineCard.SWAP, EngineCard.PROBE];

export class EngineStack {
    constructor() {
        this.never_reset = true;
        this.stack = new Map();

        EngineCards.forEach(card => this.stack.set(card, EngineCard.initial_count[card]));
    }

    empty() {
        return this.stack.size === 0;
    }

    reset(blue_deck, red_deck, mechanic_deck) {
        EngineCards.forEach(card => this.stack.set(card, EngineCard.initial_count[card]));
        function rm(card) {
            this.stack.set(card, this.stack.get(card) - 1);
        }

        blue_deck.forEach(rm);
        red_deck.forEach(rm);
        mechanic_deck.forEach(rm);

        this.never_reset = false;
    }

    draw () {
        drawn = null;
        function rand() {
            var array = [];
            this.stack.forEach(function(key, value) {
                for (let i = 0; i < value; ++i) {
                    array.push(key);
                }
            });

            return array[Math.floor(Math.random() * array.length)];
        }

        if (this.never_reset) {
            this.stack.delete(EngineCard.PROBE);
            if (this.empty()) {
                return EngineCard.PROBE;
            }
            drawn = rand();
            this.stack.set(EngineCard.PROBE, EngineCard.properties[EngineCard.PROBE]);
        } else {
            drawn = rand();
        }

        this.stack.set(drawn, this.stack.get(drawn) - 1);
        if (this.stack.get(drawn) == 0) {
            this.stack.delete(drawn);
        }

        return drawn;
    }
}

export const ENGINE_CONTROL_MAX_SIZE = 6;
export const ENGINE_DECK_INIT_SIZE = 3;

export class EngineControl {
    constructor() {
        this.control = [];
    }

    full() {
        this.control.length === ENGINE_CONTROL_MAX_SIZE;
    }

    add(engine_card) {
        if (this.full()) {
            throw new Error("Engine Control full, Engine Card cannot be added!");
        }
        self.control.push(engine_card);
    }

    reset() {
        this.control = [];
    }
}