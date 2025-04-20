export class generarQR {
    constructor() {
        this.qrCode = null;
    }
    generarQR(texto, tamanoQR = 10) {
        this.qrCode = window.qrcode(0, 'L');
        this.qrCode.addData(texto);
        this.qrCode.make();
        const qrTamaño = this.qrCode.getModuleCount();
        this.matriz = Array.from({ length: qrTamaño }, () => Array(qrTamaño).fill(false));
        for (let x = 0; x < qrTamaño; x++) {
            for (let y = 0; y < qrTamaño; y++) {
                if (this.qrCode.isDark(x, y)) {
                    this.matriz[x][y] = true;
                }
            }
        }
        return this.matriz;
    }
}
