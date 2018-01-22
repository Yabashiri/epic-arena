namespace Arena.State {
  export class Lose extends Phaser.State {
    public preload(): void {
      this.game.load.image("lose", "assets/lose.png");
    }

    public create(): void {
      this.game.add.sprite(160, 100, "lose");
      let text = this.game.add.text(
        420,
        160,
        `You lost a battle against ${
          Global.connectionDetails.opponentName
        }!`.toUpperCase(),
        Global.Constants.style_black
      );
      text.wordWrap = true;
      text.wordWrapWidth = 200;
    }
  }
}
