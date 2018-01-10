namespace Arena.State {

    export class Play extends Phaser.State {

        private you: player;
        private opponent: player;
        private character1: Arena.Characters.character;
        private static description_name: Phaser.Text;
        private static description: Phaser.Text;
        private static descriptionImage: Phaser.Sprite;

        public preload(): void {
            this.you = new player(
                Arena.Global.connectionDetails,
                Arena.Global.Constants.char1,
                Arena.Global.Constants.char2,
                Arena.Global.Constants.char3);
            this.you.preloadImages(this.game);

            this.opponent = new player (
                Arena.Global.connectionDetails,
                Arena.Global.Constants.char2,
                Arena.Global.Constants.char1,
                Arena.Global.Constants.char3);
            this.opponent.preloadImages(this.game);

            this.game.load.image('battle', 'assets/battle1.jpg');
            this.game.load.image('pokemon', 'assets/pokemon.png');
        }

        public create(): void {
            this.game.stage.backgroundColor = "#fff";
            //this.game.add.image(0, 0, 'battle');
            this.game.add.image(0,0,'pokemon');

            this.you.deployPortraits(this.game, "left");
            this.opponent.deployPortraits(this.game, "right");
            this.you.deploySkills(this.game);

            Play.initDescription(this);

            this.game.stage.disableVisibilityChange = true; //не паузим игру в фоне
            const text = this.game.add.text(330,10,"PRESS WHEN READY",Global.Constants.style_black);
            
            /*text.inputEnabled = true;
            text.events.onInputUp.add(() => {
                Global.socket.emit('turn-switch', Global.connectionDetails.opponentID);
                Global.connectionDetails.turn = !Global.connectionDetails.turn;
                text.setText("OPPONENT\'S TURN");
                text.inputEnabled = false;
            },this);

            Global.socket.on("turn-switch", () => {
                text.setText("PRESS WHEN READY");
                Global.connectionDetails.turn = !Global.connectionDetails.turn;
                text.inputEnabled = true;
            });*/
        }

        public static initDescription(play: Arena.State.Play): void {
            Play.description_name = play.game.add.text(Global.Constants.descX, Global.Constants.descTitleY,play.you.getDisplayName.toUpperCase(),Global.Constants.style_red);
            Play.description = play.game.add.text(Global.Constants.descX,Global.Constants.descY,play.you.getDescription.toUpperCase(),Global.Constants.style_black_small);
            Play.descriptionImage = play.game.add.sprite(Global.Constants.descImageX,Global.Constants.descImageY,'yabashiri');
        }

        public static updateDescription(object: ArenaObject, game: Phaser.Game): void {
            this.description_name.setText(object.getDisplayName.toUpperCase());
            this.description.setText(object.getDescription.toUpperCase());
            this.description.wordWrap = true;
            this.description.wordWrapWidth = Global.Constants.descWidth;
            this.description.lineSpacing = -6;
            this.descriptionImage.destroy();
            this.descriptionImage = game.add.sprite(Global.Constants.descImageX,Global.Constants.descImageY,object.getName);
        }
    }
}