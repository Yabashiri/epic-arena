namespace Arena.State {
  export class Play extends Phaser.State {
    private you: player;
    private opponent: player;
    private character1: Arena.Characters.character;
    private turn_text: Phaser.Text;
    private chakra: Chakra;

    private static description_name: Phaser.Text;
    private static description: Phaser.Text;
    private static descriptionImage: Phaser.Sprite;

    private static cost_images: Phaser.Group;
    private static cost_text: Phaser.Text;

    preload(): void {
      this.you = new player(
        Arena.Global.connectionDetails,
        Arena.Global.Constants.char1,
        Arena.Global.Constants.char2,
        Arena.Global.Constants.char3
      );
      this.you.preloadImages(this.game);

      this.opponent = new player(
        Arena.Global.connectionDetails,
        Arena.Global.Constants.char2,
        Arena.Global.Constants.char1,
        Arena.Global.Constants.char3
      );
      this.opponent.preloadImages(this.game);
      this.preloadChakra();

      this.game.load.image("battle", "assets/battle1.jpg");
      this.game.load.image("pokemon", "assets/pokemon.png");
    }

    private preloadChakra(): void {
      this.game.load.image("tai", "assets/chakra/tai.png");
      this.game.load.image("blood", "assets/chakra/blood.png");
      this.game.load.image("nin", "assets/chakra/nin.png");
      this.game.load.image("gen", "assets/chakra/gen.png");
      this.game.load.image("random", "assets/chakra/random.png");
    }

    public create(): void {
      this.game.stage.backgroundColor = "#fff";
      //this.game.add.image(0, 0, "battle");
      this.game.add.image(0, 0, "pokemon");

      this.you.deployPortraits(this.game, "left");
      this.opponent.deployPortraits(this.game, "right");
      this.you.deploySkills(this.game);

      Play.initDescription(this);
      Play.initCost(this.game);

      this.game.stage.disableVisibilityChange = true; //не паузим игру в фоне

      this.chakra = new Chakra(); //если игрок ходит первый, то начнёт с одной чакрой
      this.chakra.addChakraUI(this.game);

      this.initTurnText();
      if (Global.connectionDetails.turn == false) this.you.blockAllCharacters();
      this.onTurnSwitch();
    }

    public initTurnText(): void {
      this.turn_text = this.game.add.text(
        325,
        10,
        this.turnTextResolve(),
        Global.Constants.style_black
      );
      this.turn_text.inputEnabled = Global.connectionDetails.turn;
    }

    public onTurnSwitch(): void {
      this.turn_text.events.onInputUp.add(() => {
        Global.socket.emit("turn-switch", Global.connectionDetails.opponentID);
        Global.connectionDetails.turn = !Global.connectionDetails.turn;
        this.turn_text.setText(this.turnTextResolve());
        this.turn_text.inputEnabled = Global.connectionDetails.turn;
        this.you.blockAllCharacters();
      }, this);

      Global.socket.on("turn-switch", () => {
        Global.connectionDetails.turn = !Global.connectionDetails.turn;
        this.turn_text.setText(this.turnTextResolve());
        this.turn_text.inputEnabled = Global.connectionDetails.turn;
        this.chakra.addTurnChakra();
        this.chakra.updateUI();
        this.you.unblockAllCharacters();
      });
    }

    public turnTextResolve(): string {
      if (Global.connectionDetails.turn == true) return "PRESS WHEN READY";
      else return "OPPONENT'S TURN";
    }

    public static initDescription(play: Arena.State.Play): void {
      Play.description_name = play.game.add.text(
        Global.Constants.descX,
        Global.Constants.descTitleY,
        play.you.getDisplayName.toUpperCase(),
        Global.Constants.style_red
      );
      Play.description = play.game.add.text(
        Global.Constants.descX,
        Global.Constants.descY,
        play.you.getDescription.toUpperCase(),
        Global.Constants.style_black_small
      );
      Play.descriptionImage = play.game.add.sprite(
        Global.Constants.descImageX,
        Global.Constants.descImageY,
        "yabashiri"
      );
    }

    public static updateDescription(
      object: ArenaObject,
      game: Phaser.Game
    ): void {
      this.description_name.setText(object.getDisplayName.toUpperCase());
      this.description.setText(object.getDescription.toUpperCase());
      this.description.wordWrap = true;
      this.description.wordWrapWidth = Global.Constants.descWidth;
      this.description.lineSpacing = -6;
      this.descriptionImage.destroy();
      this.descriptionImage = game.add.sprite(
        Global.Constants.descImageX,
        Global.Constants.descImageY,
        object.getName
      );
    }

    public static initCost(game: Phaser.Game) {
      this.cost_text = game.add.text(
        Global.Constants.descX + 290,
        Global.Constants.descTitleY,
        "ENERGY:",
        Global.Constants.style_black_small
      );
      this.cost_text.alpha = 0.7;
      this.cost_text.visible = false;
      this.cost_images = game.add.group();
    }

    public static disableCost() {
      Arena.State.Play.cost_text.visible = false;
      Arena.State.Play.cost_images.visible = false;
    }

    public static enableCost() {
      Arena.State.Play.cost_text.visible = true;
    }

    public static updateCost(cost: Array<number>, game: Phaser.Game) {
      let images: Array<Phaser.Sprite>;
      images = [];
      for (let i = 0; i < cost.length; i++) {
        let chakra_needed = cost[i];
        while (chakra_needed > 0) {
          images.push(game.add.sprite(0, 0, Chakra.chakraResolve(i)));
          chakra_needed--;
          console.log(cost.length);
        }
      }

      if (images.length != 0) {
        this.cost_images.destroy();
        this.cost_images = game.add.group();
        this.cost_images.add(images[0]);
        for (let i = 1; i < images.length; i++) {
          images[i].alignTo(images[i - 1], Phaser.RIGHT_TOP, 5);
          this.cost_images.add(images[i]);
        }
      }

      this.cost_images.alignTo(this.cost_text, Phaser.RIGHT_TOP, 5, -2);
    }
  }
}
