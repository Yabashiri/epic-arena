namespace Arena.Characters {
  export class Ritsu extends character {
    constructor(order: number) {
      super(order);
      this.name = "ritsu";
      this.display_name = "Tainaka Ritsu";
      this.description =
        "Self-appointed president of the Light Music Club, and the drummer of the band Ho-kago Tea Time.";
      this.skills_number = 4;

      this.skills_list.push(
        new skill(
          0,
          "ritsu",
          "Drums Release",
          "This skills deals 20 damage to a single enemy.",
          [0, 1],
          "enemy",
          20
        )
      );
      this.skills_list.push(
        new skill(
          1,
          "ritsu",
          "All Out",
          "This skills deals 40 damage to a single enemy.",
          [0, 1, 1, 0, 0],
          "enemy",
          40
        )
      );
      this.skills_list.push(
        new skill(
          2,
          "ritsu",
          "Final Song",
          "This skills deals 95 damage to a single enemy.",
          [1, 1, 1, 1],
          "enemy",
          95
        )
      );
      this.skills_list.push(
        new skill(
          3,
          "ritsu",
          "Sky High",
          "This skills deals 75 damage to a single enemy.",
          [0, 2, 1],
          "enemy",
          75
        )
      );
    }
  }
}
