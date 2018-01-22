namespace Arena {
  export class queue {
    private active_character: string;
    private active_skill: number;
    private temp_skills: Array<elem> = [];
    //private all_skills: Array<elem> = [];

    constructor() {
      this.setActiveNone();
    }

    public setActive(name: string, id: number): void {
      this.active_character = name;
      this.active_skill = id;
    }

    private setActiveNone(): void {
      this.active_character = "none";
      this.active_skill = -1;
    }

    public addTempSkill(target: string): void {
      let new_skill = new elem(
        this.active_character,
        this.active_skill,
        target
      );
      this.temp_skills.push(new_skill);
      this.setActiveNone();
    }

    public get getActiveCharacter(): string {
      return this.active_character;
    }

    public get getActiveSkill(): number {
      return this.active_skill;
    }

    public getQueueItem(): elem {
      return this.temp_skills.shift();
    }

    public getQueueLength(): number {
      return this.temp_skills.length;
    }

    public getQueue(): Array<elem> {
      return this.temp_skills.slice();
    }

    public setQueue(queue: Array<elem>) {
      this.temp_skills = queue.slice();
    }
  }

  export class elem {
    //элемент очереди
    public character: string;
    public skill: number;
    public target: string;

    constructor(character: string, skill: number, target: string) {
      this.character = character;
      this.skill = skill;
      this.target = target;
    }
  }
}
