export interface User {
  id: bigint;
  name: string;
  jwt: string;
}

export interface Square {
  h: boolean;
  v: boolean;
  filledBy: number|undefined;
}

export interface Player {
  id: number;
  index: number;
  name: string;
  score: number;
  active: boolean;
  icon: string;
  color: string;
}

export interface Turn {
  playerId: number;
  x: number;
  y: number;
  vertical: boolean;
}

export interface Game {
  id: string|null;
  nbPlayers: number;
  width: number;
  height: number;
  players: Record<number, Player>|null;
  board: Array<Array<Square>>|null;
  playerIdToPlay: number|null;
  started: boolean;
  finished: boolean;
  winnersIds: number[];
  lastPlayedTurn: Turn|null;
}

export interface Message {
  text: string;
  type: string;
  show: boolean;
}

export interface StoreType {
  game: Game;
  message: Message;
  player: User;
}
