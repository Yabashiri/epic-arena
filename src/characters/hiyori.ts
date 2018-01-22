namespace Arena.Characters {
  export class Hiyori extends character {
    constructor(order: number) {
      super(order);
      this.name = "hiyori";
      this.display_name = "Sarugaki Hiyori";
      this.description =
        "The former lieutenant of the 12th Division, Hiyori is a short-tempered, festering girl with very violent tendencies.";
      this.skills_number = 4;

      this.skills_list.push(
        new skill(
          0,
          "hiyori",
          "Flying Kick",
          "This skills deals 55 damage to a single enemy.",
          [0, 2],
          "enemy",
          55
        )
      );
      this.skills_list.push(
        new skill(
          1,
          "hiyori",
          "Serpent Strike",
          "This skills deals 40 damage to a single enemy.",
          [1, 0, 0, 1],
          "enemy",
          40
        )
      );
      this.skills_list.push(
        new skill(
          2,
          "hiyori",
          "Sweeping Cero",
          "This skills deals 75 damage to a single enemy.",
          [0, 0, 1, 2],
          "enemy",
          75
        )
      );
      this.skills_list.push(
        new skill(
          3,
          "hiyori",
          "Serpent Parry",
          "This skills deals 20 damage to a single enemy.",
          [0, 0, 1, 0],
          "enemy",
          20
        )
      );
    }
  }
}
