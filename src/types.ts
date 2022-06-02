
export type Writeable<T> = {
  -readonly[P in keyof T]: T[P];
}

export type Color = [number,number,number,number];