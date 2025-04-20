declare module 'reed-solomon' {
    export class ReedSolomonEncoder {
      static encode(data: Uint8Array, ecSymbols: number): Uint8Array;
    }
  }
  