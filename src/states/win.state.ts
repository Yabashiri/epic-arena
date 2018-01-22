namespace Arena.State {
  export class Win extends Phaser.State {
    public preload(): void {
      this.game.load.image("win", "assets/win.png");
    }

    public create(): void {
      this.game.add.sprite(160, 100, "win");
      let text = this.game.add.text(
        420,
        160,
        `You won a battle against ${
          Global.connectionDetails.opponentName
        }!`.toUpperCase(),
        Global.Constants.style_black
      );
      text.wordWrap = true;
      text.wordWrapWidth = 200;
    }
  }
}
