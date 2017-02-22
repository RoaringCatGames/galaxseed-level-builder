export interface Spawn {
  time: number;
  enemyType: string;
  offsetType: string;
  offsetPosition: {
    x: number,
    y: number
  };
  velocity: {
    x: number,
    y: number
  };
}
export interface Level {
  id: string;
  name: string;
  spawns: Array<Spawn>;
}
