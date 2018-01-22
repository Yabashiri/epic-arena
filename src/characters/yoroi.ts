namespace Arena.Characters {
  export class Yoroi extends character {
    constructor(order: number) {
      super(order);
      this.name = "yoroi";
      this.display_name = "Akadou Yoroi";
      this.description = "The best character to be ever created.";
      this.skills_number = 4;

      this.skills_list.push(
        new skill(
          0,
          "yoroi",
          "Chidori",
          "This skills deals 20 damage to a single enemy.",
          [0, 0, 0, 1],
          "enemy",
          20
        )
      );
      this.skills_list.push(
        new skill(
          1,
          "yoroi",
          "Kirin",
          "This skills deals 55 damage to a single enemy.",
          [0, 0, 0, 2],
          "enemy",
          55
        )
      );
      this.skills_list.push(
        new skill(
          2,
          "yoroi",
          "Sharingan",
          "This skills deals 65 damage to a single enemy.",
          [1, 1, 0, 1],
          "enemy",
          65
        )
      );
      this.skills_list.push(
        new skill(
          3,
          "yoroi",
          "Vodovorot",
          "This skills deals 100 damage to a single enemy",
          [0, 0, 0, 3],
          "enemy",
          100
        )
      );
    }
  }
}
