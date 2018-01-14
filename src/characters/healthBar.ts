namespace Arena.Characters {
  export class healthbar {
    private game: Phaser.Game;
    private width: number;
    private height: number;
    private x: number;
    private y: number;
    private bg_color: string;
    private bar_color: string;
    private animationDuration: number;
    private bgSprite: Phaser.Sprite;
    private barSprite: Phaser.Sprite;

    constructor(new_game: Phaser.Game, x: number, y: number) {
      this.game = new_game;
      this.configure(x, y);
      this.drawBackground();
      this.drawHealthBar();
    }

    private configure(new_x: number, new_y: number): void {
      this.width = 75;
      this.height = 14;
      this.x = new_x;
      this.y = new_y;
      this.bg_color = "#fff";
      this.bar_color = "#3ad949";
      this.animationDuration = 200;
    }

    private drawBackground(): void {
      const bmd = this.game.add.bitmapData(this.width, this.height);
      bmd.ctx.fillStyle = this.bg_color;
      bmd.ctx.beginPath();
      bmd.ctx.rect(0, 0, this.width, this.height);
      bmd.ctx.fill();
      bmd.update();

      this.bgSprite = this.game.add.sprite(this.x, this.y, bmd);
      this.bgSprite.anchor.set(0.5);
    }

    private drawHealthBar(): void {
      const bmd = this.game.add.bitmapData(this.width, this.height);
      bmd.ctx.fillStyle = this.bar_color;
      bmd.ctx.beginPath();
      bmd.ctx.rect(0, 0, this.width, this.height);
      bmd.ctx.fill();
      bmd.update();

      this.barSprite = this.game.add.sprite(
        this.x - this.bgSprite.width / 2,
        this.y,
        bmd
      );
      this.barSprite.anchor.y = 0.5;
    }

    public setPercent = function(newValue: number) {
      if (newValue < 0) newValue = 0;
      if (newValue > 100) newValue = 100;

      let newWidth = newValue * this.width / 100;

      this.setWidth(newWidth);
    };

    public setWidth(newWidth: number): void {
      this.game.add
        .tween(this.barSprite)
        .to(
          { width: newWidth },
          this.animationDuration,
          Phaser.Easing.Linear.None,
          true
        );
    }
  }
}
