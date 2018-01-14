namespace Arena.Global {
  export class Constants {
    public static gameHeight: number = 560;
    public static gameWidth: number = 770;
    public static char1: string = "ritsu";
    public static char2: string = "hiyori";
    public static char3: string = "yoroi";
    public static player_name: string = "yabashiri";
    public static rightPlayerX: number = 506;
    public static leftPlayerX: number = 224;
    public static PlayerY: number = 10;

    public static leftPlayerTextX: number = 214;
    public static rightPlayerTextX: number = 566;
    public static PlayerNameY: number = 23;
    public static PlayerTitleY: number = 44;

    public static leftCharacterX: number = 33;
    public static rightCharacterX: number = 660;
    public static firstCharacterY: number = 64;
    public static secondCharacterY: number = 185;
    public static thirdCharacterY: number = 306;

    public static unknownX: number = 125;
    public static firstSkillY: number = 99.5;
    public static firstSkillX: number = 202;
    public static skillDistanceY: number = 121;

    public static descX: number = 365;
    public static descY: number = 467;
    public static descTitleY: number = 452;
    public static descWidth: number = 380;
    public static descImageX: number = 279;
    public static descImageY: number = 454;

    public static hpLeftX: number = 70.5;
    public static hpRightX: number = 697.5;
    public static hpFirstY: number = 150;
    public static hpIncrementY: number = 121;

    public static style_black = {
      font: "bold 14px Trebuchet MS",
      fill: "#000",
      align: "left"
    };
    public static style_black_small = {
      font: "bold 11px Trebuchet MS",
      fill: "#000",
      align: "left"
    };
    public static style_red = {
      font: "bold 14px Trebuchet MS",
      fill: "#ba1a1c",
      align: "left"
    };
    public static player_red = {
      font: "bold 18px Trebuchet MS",
      fill: "#ba1a1c"
    };

    public static get serverUrl(): string {
      if (
        window.location.href === "http://127.0.0.1:8080/" ||
        window.location.href === "http://localhost:8080/"
      ) {
        return "http://localhost:9001";
      } else {
        return "http://naruto-arena.com";
      }
    }
  }
}
