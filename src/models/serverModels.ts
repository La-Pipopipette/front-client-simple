export interface UserServer {
  id: bigint;
  name: string;
  jwt: string;
}

export interface SquareServer {
  h: boolean;
  v: boolean;
  filledBy: number|undefined;
}

export interface PlayerServer {
  id: number;
  name: string;
  score: number;
  active: boolean;
}

export interface TurnServer {
  playerId: number;
  x: number;
  y: number;
  vertical: boolean;
}

export interface GameServer {
  id: string;
  nbPlayers: number;
  width: number;
  height: number;
  players: { [playerId: number]: PlayerServer };
  board: Array<Array<SquareServer>>;
  playerIdToPlay: number|null;
  started: boolean;
  finished: boolean;
  winnersIds: number[];
  lastPlayedTurn: TurnServer|undefined;
}

export interface ErrorServer {
  localizedMessage: string;
}
