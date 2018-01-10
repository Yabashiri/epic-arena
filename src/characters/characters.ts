namespace Arena.Characters {

    export class character extends ArenaObject {

        public state: character_state;
        public avatar: Phaser.Point;
        public display_name: string;
        public description: string;
        public hp: number;
        public skills_list: Array<skill>;
        public skills_number: number;
        public character_order: number;

        constructor(order: number) {
            super();
            this.character_order = order;
            this.hp = 100;
            this.state = 1;
            this.skills_list = [];
        }

        public deployPortrait(game: Phaser.Game, side: string): void {
            let y;
            switch(this.character_order) {
                case 1: y = Global.Constants.firstCharacterY;
                break;
                case 2: y = Global.Constants.secondCharacterY;
                break;
                case 3: y = Global.Constants.thirdCharacterY;
                break;
            }
            if(side == "left")
                this.sprite = game.add.sprite(Global.Constants.leftCharacterX,y,this.name);
            else {
                this.sprite = game.add.sprite(Global.Constants.rightCharacterX+75,y,this.name);
                this.sprite.scale.x *= -1;
            }
            this.addTapEvent(game);
        }

        //! Список всех персонажей
        public static createCharacter(new_order: number, char_name: string): character {
            switch(char_name) {
                case 'ritsu':
                    return new Ritsu(new_order);
                case 'hiyori':
                    return new Hiyori(new_order);
                case 'yoroi':
                    return new Yoroi(new_order);
            } 
        }
    }

    export enum character_state {

        alive = 1,
        stunned,
        invulnerable,
        dead,
    }

    export interface character_list {
        one: string;
        two: string;
        three: string;
    }
}