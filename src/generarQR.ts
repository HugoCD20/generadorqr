declare var qrcode: any;

export class generarQR{
    protected qrCode: any;
    protected matriz:boolean[][];
    public constructor() {
        this.qrCode = null;
      }
    generarQR(texto: string, tamanoQR: number = 10) {
          this.qrCode = (window as any).qrcode(0, 'L');
          this.qrCode.addData(texto);
          this.qrCode.make();
          const qrTamaño = this.qrCode.getModuleCount();
      
          this.matriz= Array.from({ length: qrTamaño }, () => Array(qrTamaño).fill(false))
          for (let x = 0; x < qrTamaño; x++) {
            for (let y = 0; y < qrTamaño; y++) {
              if (this.qrCode.isDark(x, y)) {
                this.matriz[x][y]=true
              }
            }
          }
          
          return this.matriz
      }
}