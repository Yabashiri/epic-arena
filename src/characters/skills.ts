namespace Arena.Characters {
  export class skill extends ArenaObject {
    public id: number;
    public display_name: string;
    public description: string;
    public cost: Array<number>;

    constructor(
      new_id: number,
      new_name: string,
      new_display_name: string,
      new_description: string,
      new_cost: Array<number>
    ) {
      super();
      this.id = new_id;
      this.name = `${new_name}-${this.id}`;
      this.description = new_description;
      this.display_name = new_display_name;
      this.cost = new_cost;
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

    public eventCost(game: Phaser.Game): void {
      this.sprite.events.onInputDown.add(() => {
        Arena.State.Play.updateCost(this.cost, game);
      });
    }
  }
}
