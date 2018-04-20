export interface PlayerInterface {
  viewPortX?: number;
  viewPortY?: number;
  viewPortH?: number;
  viewPortW?: number;
  zoom?: number;
}

export function createPlayer() {
  return {
    viewPortX: 100,
    viewPortY: 100,
    viewPortH: 128,
    viewPortW: 128,
    zoom: 1
  };
}
