function HanoiView(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setUpTowers();
    this.render();
    this.clickTower();
}

HanoiView.prototype.setUpTowers = function () {
    for (let i = 0; i < 3; i++) {
        let $ul = $("<ul>");
        $ul.data("id", i);
        for (let j = 0; j < 3; j++) {
            let $li = $("<li>");
            $ul.append($li);
        }
        this.$el.append($ul);
    }
}

HanoiView.prototype.render = function () {
    let $allUls = $("ul");
    let towers = this.game.towers;
    $allUls.each( (index, ul) => {
        let $ul = $(ul);
        let tower = towers[index];
        for (let i = 0; i < 3; i++) {
            let $li = $($ul.children()[3 - 1 - i]); // the iteration sequence matters!
            $li.removeClass();
            $li.addClass("size" + tower[i]);
        }
    });
}

HanoiView.prototype.clickTower = function () {
    $("ul").on("click", event => {
        this.takeInputs();
        this.makeMove();
        this.checkWon();
    });
}

HanoiView.prototype.takeInputs = function () {
    const $ul = $(event.currentTarget);
    const $allUls = $("ul");
    let userInput = $ul.data("id");
    if (this.fromTower === undefined) {
        this.fromTower = userInput;

        // show selected pile
        $allUls.removeClass("to");
        $ul.toggleClass("from");
    } else {
        this.toTower = userInput;

        // show selected pile
        $allUls.removeClass("from");
        $ul.toggleClass("to");
    }
}

HanoiView.prototype.makeMove = function () {
    if (this.fromTower !== undefined && this.toTower !== undefined) {
        if (this.game.isValidMove(this.fromTower, this.toTower)) {
            this.game.move(this.fromTower, this.toTower);
            this.render();
        } else {
            alert("Invalid move!");
        }
        this.fromTower = undefined;
        this.toTower = undefined;
    }
}

HanoiView.prototype.checkWon = function () {
    if (this.game.isWon()) {
        // append a congratulation message
        let $h1 = $("<h1>");
        const $main = $("main");
        $h1.text("Congratulations! You win!");
        $main.append($h1);

        // turn off the event listner
        $("ul").off("click");

        // turn the pile color to green
        const winIdx = this.game.towers[1].length !== 0 ? 1 : 2;
        const winUl = $("ul")[winIdx];
        const $winUl = $(winUl);
        $winUl.children().addClass("winner");
    }
}

module.exports = HanoiView;