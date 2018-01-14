namespace Arena {
  export class Chakra {
    private chakraUI: Phaser.Group;
    private value: Array<number>;

    private taiText: Phaser.Text;
    private bloodText: Phaser.Text;
    private ninText: Phaser.Text;
    private genText: Phaser.Text;
    private randomText: Phaser.Text;

    constructor() {
      this.value = [0, 0, 0, 0];
      if (Global.connectionDetails.turn == true) this.addRandomChakra();
    }

    private generateRandomChakra(): number {
      return Math.floor(Math.random() * 4);
    }

    public addRandomChakra(): void {
      this.value[this.generateRandomChakra()]++;
      console.log(this.value);
    }

    public addTurnChakra(): void {
      for (let i = 0; i <= 2; i++) this.addRandomChakra();
    }

    public getTotalChakra(): number {
      return this.value[0] + this.value[1] + this.value[2] + this.value[3];
    }

    public addChakraUI(game: Phaser.Game): void {
      this.chakraUI = game.add.group();
      this.addChakraImages(game);
      this.addChakraText(game);
      this.addTextToGroup();
    }

    private addChakraImages(game: Phaser.Game): void {
      let current_sprite = game.add.sprite(293, 58, "tai");
      this.chakraUI.add(current_sprite);
      current_sprite = game.add
        .sprite(0, 0, "blood")
        .alignTo(current_sprite, Phaser.RIGHT_TOP, 31);
      this.chakraUI.add(current_sprite);
      current_sprite = game.add
        .sprite(0, 0, "nin")
        .alignTo(current_sprite, Phaser.RIGHT_TOP, 31);
      this.chakraUI.add(current_sprite);
      current_sprite = game.add
        .sprite(0, 0, "gen")
        .alignTo(current_sprite, Phaser.RIGHT_TOP, 31);
      this.chakraUI.add(current_sprite);
      current_sprite = game.add
        .sprite(0, 0, "random")
        .alignTo(current_sprite, Phaser.RIGHT_TOP, 31);
      this.chakraUI.add(current_sprite);
    }

    private addChakraText(game: Phaser.Game): void {
      this.taiText = game.add.text(
        305,
        54,
        "x" + this.value[0],
        Global.Constants.style_black
      );
      this.bloodText = game.add
        .text(0, 0, "x" + this.value[1], Global.Constants.style_black)
        .alignTo(this.taiText, Phaser.RIGHT_TOP, 25);
      this.ninText = game.add
        .text(0, 0, "x" + this.value[2], Global.Constants.style_black)
        .alignTo(this.bloodText, Phaser.RIGHT_TOP, 25);
      this.genText = game.add
        .text(0, 0, "x" + this.value[3], Global.Constants.style_black)
        .alignTo(this.ninText, Phaser.RIGHT_TOP, 25);
      this.randomText = game.add
        .text(0, 0, "x" + this.getTotalChakra(), Global.Constants.style_black)
        .alignTo(this.genText, Phaser.RIGHT_TOP, 25);
    }

    private addTextToGroup(): void {
      this.chakraUI.add(this.taiText);
      this.chakraUI.add(this.bloodText);
      this.chakraUI.add(this.ninText);
      this.chakraUI.add(this.genText);
      this.chakraUI.add(this.randomText);
    }

    public updateUI(): void {
      this.taiText.setText("x" + this.value[0]);
      this.bloodText.setText("x" + this.value[1]);
      this.ninText.setText("x" + this.value[2]);
      this.genText.setText("x" + this.value[3]);
      this.randomText.setText("x" + this.getTotalChakra());
    }
  }
}
