export interface ImageType {
  url: string;
  x: number;
  y: number;
}

export interface LineType {
  tool: string;
  points: number[];
  strokeWidth: number;
  color: string;
}

export interface BoardsType {
  [key: string]: (LineType | ImageType)[];
}
