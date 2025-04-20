export class CanvasLocal {
    constructor(g, canvas, s) {
        this.graphics = g;
        this.rWidth = s;
        this.rHeight = s;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = 0;
        this.centerY = 0;
        this.qrCode = null;
    }
    iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
    iY(y) { return Math.round(this.centerY + y / this.pixelSize); }
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    dibujarPixel(x, y) {
        this.graphics.fillRect(this.iX(x), this.iY(y), (this.iX(1) - this.iX(0)) + 1, (this.iX(1) - this.iX(0)) + 1);
    }
    generarQR(matriz) {
        for (let i = 0; i < this.maxX; i++) {
            for (let l = 0; l < this.maxY; l++) {
                if (matriz[i][l]) {
                    this.graphics.fillStyle = "black";
                    this.dibujarPixel(i, l);
                }
                else {
                    this.graphics.fillStyle = "white";
                    this.dibujarPixel(i, l);
                }
            }
        }
    }
}
