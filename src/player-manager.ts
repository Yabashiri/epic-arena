/// <reference path="arena-object.ts" />

namespace Arena {
  export class player extends ArenaObject {
    private characters: Array<Arena.Characters.character>; //три персонажа
    private who: string;

    constructor(char1: string, char2: string, char3: string, who: string) {
      super();
      if (who == "you") this.yourDetails();
      else this.opponentDetails();
      if (this.display_name == "") this.display_name = "Un-named";
      if (this.description == "") this.description = "Un-titled";
      this.who = who;
      this.characters = [];
      this.characters.push(
        Arena.Characters.character.createCharacter(1, char1)
      );
      this.characters.push(
        Arena.Characters.character.createCharacter(2, char2)
      );
      this.characters.push(
        Arena.Characters.character.createCharacter(3, char3)
      );
    }

    private yourDetails(): void {
      this.name = "yabashiri";
      this.display_name = Global.connectionDetails.name;
      this.description = Global.connectionDetails.title;
    }

    private opponentDetails(): void {
      this.name = "junko";
      this.display_name = Global.connectionDetails.opponentName;
      this.description = Global.connectionDetails.opponentTitle;
    }

    public get getCharacters(): Array<Arena.Characters.character> {
      return this.characters;
    }

    public damage(game: Phaser.Game, i: number) {
      this.characters[i].damageHealth(game, 20);
    }

    public preloadImages(game: Phaser.Game) {
      //предзагрузка картинок
      if (this.who == "you")
        game.load.image("yabashiri", "assets/yabashiri.png");
      else game.load.image("junko", "assets/Junko.jpg");
      for (let i = 0; i <= 2; i++) {
        const path = `assets/characters/${this.characters[i].getName}/`;
        this.characters[i].loadImage(game, path);
        for (let j = 0; j < this.characters[i].skills_number; j++)
          this.characters[i].skills_list[j].loadImage(game, path);
      }
    }

    public deployPortraits(game: Phaser.Game, side: string) {
      this.deployPortrait(game, side);
      for (let i = 1; i <= 3; i++)
        this.characters[i - 1].deployPortrait(game, side);
      this.initHealth(game, side);
    }

    private deployPortrait(game: Phaser.Game, side: string) {
      if (side == "left") {
        this.sprite = game.add.sprite(
          Global.Constants.leftPlayerX,
          Global.Constants.PlayerY,
          this.name
        );
        let text = game.add.text(
          Global.Constants.leftPlayerTextX,
          Global.Constants.PlayerNameY,
          this.display_name.toUpperCase(),
          Global.Constants.player_red
        );
        text.setTextBounds(0, 0);
        text.boundsAlignH = "right";
        let title = game.add.text(
          Global.Constants.leftPlayerTextX,
          Global.Constants.PlayerTitleY,
          this.description.toUpperCase(),
          Global.Constants.style_black
        );
        title.setTextBounds(0, 0);
        title.boundsAlignH = "right";
      } else {
        this.sprite = game.add.sprite(
          Global.Constants.rightPlayerX,
          Global.Constants.PlayerY,
          this.name
        );
        let text = game.add.text(
          Global.Constants.rightPlayerTextX,
          Global.Constants.PlayerNameY,
          this.display_name.toUpperCase(),
          Global.Constants.player_red
        );
        let title = game.add.text(
          Global.Constants.rightPlayerTextX,
          Global.Constants.PlayerTitleY,
          this.description.toUpperCase(),
          Global.Constants.style_black
        );
      }
      this.sprite.scale.setTo(0.65);
      this.addTapEvent(game);
    }

    private initHealth(game: Phaser.Game, side: string): void {
      let x, y;
      y = Global.Constants.hpFirstY;
      if (side == "left") x = Global.Constants.hpLeftX;
      else x = Global.Constants.hpRightX;
      for (let i = 0; i <= 2; i++) {
        this.characters[i].initHealth(
          game,
          x,
          y + Global.Constants.hpIncrementY * i
        );
      }
    }

    public deploySkills(game: Phaser.Game, signal: Phaser.Signal) {
      let y = Global.Constants.firstSkillY;
      for (let i = 0; i <= 2; i++) {
        let j = 0;
        let skill = (this.characters[
          i
        ].skills_list[0].setSprite = game.add.sprite(
          Global.Constants.firstSkillX,
          y,
          `${this.characters[i].getName}-${j}`
        ));
        this.characters[i].skills_list[0].addTapEvent(game);
        this.characters[i].skills_list[0].eventCost(game, signal);
        for (j = 1; j < 4; j++) {
          skill = this.characters[i].skills_list[j].setSprite = game.add
            .sprite(0, 0, `${this.characters[i].getName}-${j}`)
            .alignTo(skill, Phaser.RIGHT_TOP, 8);
          this.characters[i].skills_list[j].addTapEvent(game);
          this.characters[i].skills_list[j].eventCost(game, signal);
        }
        y += Global.Constants.skillDistanceY;
      }
    }

    public blockAllCharacters(): void {
      for (let i = 0; i <= 2; i++) {
        if (this.characters[i].dead == false) this.characters[i].blockSkills();
      }
    }

    public unblockAllCharacters(): void {
      for (let i = 0; i <= 2; i++) this.characters[i].unblockSkills();
    }

    public findCharacter(char_name: string): Arena.Characters.character {
      for (let i = 0; i <= 2; i++)
        if (this.characters[i].getName == char_name) return this.characters[i];
    }

    public addEnemyListeners(game: Phaser.Game, signal: Phaser.Signal) {
      for (let i = 0; i <= 2; i++) {
        if (this.characters[i].dead == false)
          this.characters[i].listenToSkillEnemy(signal, game);
      }
    }

    public renewCharacter(game: Phaser.Game) {
      for (let i = 0; i <= 2; i++) {
        if (this.characters[i].dead == false)
          this.characters[i].disableHighlight(game);
      }
    }

    public getCost(character: string, skill: number): Array<number> {
      return this.findCharacter(character).skills_list[skill].cost;
    }

    public blockCharacter(
      game: Phaser.Game,
      character: string,
      skill: number,
      signal: Phaser.Signal
    ) {
      let char = this.findCharacter(character);
      char.active_skill = skill;
      char.createActiveSkillSprite(game, skill);
      //char.createCancelling(signal, game);
    }

    public createUnknown(game: Phaser.Game) {
      for (let i = 0; i <= 2; i++) this.characters[i].createUnknown(game);
    }

    public checkDead(): boolean {
      for (let i = 0; i <= 2; i++) {
        if (this.characters[i].dead == false) return false;
      }
      return true;
    }

    public countAlive(): number {
      let alive = 0;
      for (let i = 0; i <= 2; i++) {
        if (this.characters[i].dead == false) alive++;
      }
      return alive;
    }
  }
}
