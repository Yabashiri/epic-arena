namespace Arena {

    export class ArenaObject {
        
        protected display_name: string; 
        protected description: string;
        protected name: string;
        protected sprite: Phaser.Sprite;

        constructor() {}

        public loadImage(game: Phaser.Game, path: string) {
            game.load.image(this.name, path + `${this.name}.png`);
        }

        public get getDisplayName(): string {
            return this.display_name;
        }

        public get getName(): string {
            return this.name;
        }

        public get getDescription(): string {
            return this.description;
        }

        public addTapEvent(game: Phaser.Game): void {
            this.sprite.inputEnabled = true;
            let image = game.add.sprite(Global.Constants.descImageX,Global.Constants.descImageY,this.name);
            this.sprite.events.onInputDown.add(() => {
                Arena.State.Play.updateDescription(this,game);
            });
        }
    }
}