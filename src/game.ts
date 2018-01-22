namespace Arena {
  export interface IConnectionDetails {
    name: string;
    title: string;
    turn?: boolean;
    opponentID?: string;
    opponentName?: string;
    opponentTitle?: string;
  }

  export class Game extends Phaser.Game {
    constructor(elementName: string) {
      let element = document.getElementById(elementName);

      super(
        Global.Constants.gameWidth,
        Global.Constants.gameHeight,
        Phaser.AUTO,
        element.id,
        Arena.State.Blank
      );

      this.state.add("play", Arena.State.Play);
      this.state.add("win", Arena.State.Win);
      this.state.add("lose", Arena.State.Lose);
    }

    public connect(
      connectionDetails: IConnectionDetails,
      callback: (socket: SocketIOClient.Socket) => {}
    ): void {
      Global.socket = io.connect(Global.Constants.serverUrl, {
        query: `name=${connectionDetails.name}&title=${connectionDetails.title}`
      });

      Global.socket.on("turn", (turn: boolean) => {
        connectionDetails.turn = turn;
        console.log(turn);
      });

      Global.socket.on(
        "start-battle",
        (opponent: string, opponentName: string, opponentTitle: string) => {
          connectionDetails.opponentID = opponent;
          connectionDetails.opponentName = opponentName;
          connectionDetails.opponentTitle = opponentTitle;
          this.state.start("play");
          $("#game").show();
          callback(Global.socket);
        }
      );

      Global.connectionDetails = connectionDetails;
    }
  }
}
