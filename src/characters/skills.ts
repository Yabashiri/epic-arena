namespace Arena.Characters {

    export class skill extends ArenaObject {

        public id: number;
        public display_name: string;
        public description: string;

        constructor(new_id: number, new_name: string, new_display_name: string, new_description: string) {
            super();
            this.id = new_id;
            this.name = `${new_name}-${this.id}`;
            this.description = new_description;
            this.display_name = new_display_name;
        }

        public deploySkill(game: Phaser.Game, character_order: number): void {
            let y = Global.Constants.firstSkillY;
            let j = 0;
        }

        public set setSprite(new_sprite: Phaser.Sprite) {
            this.sprite = new_sprite;
            this.sprite.scale.setTo(0.72);
            //this.addTapEvent(game);
        }
    }
}