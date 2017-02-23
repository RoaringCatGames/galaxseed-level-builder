
export interface OffsetPoint {
  x: number,
  y: number,
  offsetQuadrant: string
}

export interface Spawn {
  spawnTime: number;
  enemyType: string; 
  shouldGeneratePowerUp: boolean; 
  startPosition: OffsetPoint  
  midBezierPoint?: OffsetPoint;
  endPoint?: OffsetPoint;
  speed: {
    x: number,
    y: number
  };  
}
export interface Level {
  id?: string; //Marked optional to allow DB to auto init
  name: string;
  length: number;
  spawns: Array<Spawn>;
}
