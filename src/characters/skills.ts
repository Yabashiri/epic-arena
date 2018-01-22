namespace Arena.Characters {
  export class skill extends ArenaObject {
    public id: number;
    public display_name: string;
    public description: string;
    public cost: Array<number>;
    public target?: string;
    public status: string;
    public belongsToCharacter: string;
    public damage: number;

    constructor(
      new_id: number,
      new_name: string,
      new_display_name: string,
      new_description: string,
      new_cost: Array<number>,
      new_target?: string,
      damage?: number
    ) {
      super();
      this.id = new_id;
      this.name = `${new_name}-${this.id}`;
      this.belongsToCharacter = new_name;
      this.description = new_description;
      this.display_name = new_display_name;
      this.cost = new_cost;
      this.target = new_target;
      this.damage = damage;
    }

    public deploySkill(game: Phaser.Game, character_order: number): void {
      let y = Global.Constants.firstSkillY;
      let j = 0;
    }

    public set setSprite(new_sprite: Phaser.Sprite) {
      this.sprite = new_sprite;
      this.sprite.scale.setTo(0.72);
    }

    public lowerOpacity(): void {
      this.sprite.alpha = 0.5;
    }

    public restoreOpacity(): void {
      this.sprite.alpha = 1.0;
    }

    public makeUsable(): void {
      this.restoreOpacity();
      this.status = "usable";
      this.sprite.tint = 0xffffff;
    }

    public makeUnusable(): void {
      this.lowerOpacity();
      this.sprite.tint = 0xffffff;
      this.status = "unusable";
    }

    public makeActive(game: Phaser.Game, signal: Phaser.Signal): void {
      this.sprite.tint = 0xb4e9ff; //подсвечиваем
      signal.dispatch("select", this.target, this.belongsToCharacter, this.id); //отправляем сигнал целям, чтобы подсветить их, заодно передаём айди скилла
      signal.addOnce(this.makeUnactive, this); //когда мы выберем цель или новый скилл, этот перестанет быть активным
    }

    public makeUnactive(): void {
      this.sprite.tint = 0xffffff;
    }

    public eventCost(game: Phaser.Game, signal: Phaser.Signal): void {
      this.sprite.events.onInputDown.add(() => {
        Arena.State.Play.updateCost(this.cost, game);
        if (this.status == "usable") this.makeActive(game, signal);
      });
    }

    public get getSprite(): Phaser.Sprite {
      return this.sprite;
    }
  }
}
