namespace Arena.Characters {
  export class character extends ArenaObject {
    public avatar: Phaser.Point;
    public display_name: string;
    public description: string;
    public skills_list: Array<skill>;
    public skills_number: number;
    public character_order: number;
    public health_bar: healthbar;
    public health_text: Phaser.Text;
    public active_skill: number;
    public unknown: Phaser.Sprite;
    public active_skill_sprite: Phaser.Sprite;
    public dead: boolean = false;

    constructor(order: number) {
      super();
      this.character_order = order;
      this.skills_list = [];
      this.active_skill = -1;
    }

    public deployPortrait(game: Phaser.Game, side: string): void {
      let y;
      switch (this.character_order) {
        case 1:
          y = Global.Constants.firstCharacterY;
          break;
        case 2:
          y = Global.Constants.secondCharacterY;
          break;
        case 3:
          y = Global.Constants.thirdCharacterY;
          break;
      }
      if (side == "left")
        this.sprite = game.add.sprite(
          Global.Constants.leftCharacterX,
          y,
          this.name
        );
      else {
        this.sprite = game.add.sprite(
          Global.Constants.rightCharacterX + 75,
          y,
          this.name
        );
        this.sprite.scale.x *= -1;
      }
      this.addTapEvent(game);
    }

    //! Список всех персонажей
    public static createCharacter(
      new_order: number,
      char_name: string
    ): character {
      switch (char_name) {
        case "ritsu":
          return new Ritsu(new_order);
        case "hiyori":
          return new Hiyori(new_order);
        case "yoroi":
          return new Yoroi(new_order);
      }
    }

    public initHealth(game: Phaser.Game, x: number, y: number) {
      this.sprite.maxHealth = 100;
      this.sprite.health = 100;
      this.health_bar = new healthbar(game, x, y);
      this.health_bar.setPercent(100);
      this.health_text = game.add.text(
        x,
        y - 7,
        `${this.sprite.health}/${this.sprite.maxHealth}`,
        Global.Constants.style_black_small
      );
      this.health_text.setTextBounds(0, 0);
      this.health_text.boundsAlignH = "center";
    }

    public damageHealth(game: Phaser.Game, value: number) {
      if (this.sprite.health <= value) this.kill(game, value);
      else this.updateHealthDamage(game, value);
    }

    private updateHealthDamage(game: Phaser.Game, value: number) {
      this.sprite.damage(value);
      this.health_bar.setPercent(this.sprite.health);
      let health = this.sprite.health;
      if (health < 0) health = 0;
      this.health_text.setText(`${health}/${this.sprite.maxHealth}`, true);
    }

    public blockSkills(): void {
      for (let i = 0; i < this.skills_number; i++) {
        this.skills_list[i].makeUnusable();
      }
    }

    public unblockSkills(): void {
      for (let i = 0; i < this.skills_number; i++) {
        this.skills_list[i].makeUsable();
      }
    }

    public listenToSkillEnemy(signal: Phaser.Signal, game: Phaser.Game): void {
      signal.add(this.onActiveSkillEnemy, this, 0, game, signal);
    }

    public onActiveSkillEnemy(): void {
      if (arguments[1] == "enemy")
        this.addHighlight(arguments[4], arguments[5]);
      else this.sprite.tint = 0xffffff; //иначе не подсвечиваем
    }

    public addHighlight(game: Phaser.Game, signal: Phaser.Signal): void {
      this.sprite.tint = 0xb4e9ff;
      this.sprite.events.onInputDown.addOnce(() => {
        signal.dispatch("target", "none", this.name);
      });
    }

    public disableHighlight(game: Phaser.Game): void {
      this.sprite.tint = 0xffffff; //иначе не подсвечиваем
      this.sprite.events.destroy();
      this.addTapEvent(game);
    }

    public createUnknown(game: Phaser.Game): void {
      this.unknown = game.add
        .sprite(0, 0, "unknown")
        .alignTo(this.skills_list[0].getSprite, Phaser.LEFT_TOP, 21);
    }

    public createActiveSkillSprite(game: Phaser.Game, skill: number): void {
      this.active_skill_sprite = game.add
        .sprite(0, 0, `${this.name}-${skill}`)
        .alignTo(this.skills_list[0].getSprite, Phaser.LEFT_TOP, 1, -1);
      this.active_skill_sprite.scale.setTo(0.72);
    }

    public createCancelling(signal: Phaser.Signal, game: Phaser.Game): void {
      signal.add(this.cancelActiveSkill, this);
      this.active_skill_sprite.events.onInputDown.add(() => {
        signal.dispatch("cancel", "none", this.name, this.active_skill);
      });
      this.active_skill_sprite.inputEnabled = true;
    }

    public cancelActiveSkill(): void {
      if (this.active_skill != -1) {
        this.active_skill = -1;
        this.active_skill_sprite.destroy();
      }
    }

    private kill(game: Phaser.Game, value: number): void {
      let sprite = game.add
        .sprite(0, 0, "dead")
        .alignIn(this.sprite, Phaser.CENTER);
      this.dead = true;
      this.health_bar.setPercent(0);
      this.health_text.setText(`0/${this.sprite.maxHealth}`, true);
      this.sprite.visible = false;
    }
  }
}
