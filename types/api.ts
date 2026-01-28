type Vector = {
  x: number | null;
  y: number | null;
  z: number | null;
};

type StateVectors = {
  date: string | null;
  time: string | null;
  position: Vector;
  velocity: Vector;
};

type StateVectorsForBody = {
  name: string | null;
  stateVectors: StateVectors[];
};

export type { StateVectorsForBody, StateVectors, Vector };
