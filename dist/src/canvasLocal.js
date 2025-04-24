export class CanvasLocal {
    constructor(g, canvas) {
        this.graphics = g;
        this.rWidth = 25;
        this.rHeight = 25;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = 0;
        this.centerY = 0;
        this.matriz = Array.from({ length: 25 }, () => Array(25).fill(-2));
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
        // Calculamos el tamaño exacto una vez
        const pixelSize = this.iX(1) - this.iX(0);
        // Ajustamos ligeramente el tamaño para evitar espacios
        this.graphics.fillRect(this.iX(x), this.iY(y), pixelSize + 1, pixelSize + 1);
    }
    dibujarCuadrado(x, y) {
        this.graphics.fillStyle = "black";
        for (let i = 0; i < 7; i++) {
            this.matriz[x - i][y] = 1;
            this.matriz[x - i][y + 6] = 1;
            this.matriz[x][y + i] = 1;
            this.matriz[x - 6][y + i] = 1;
        }
        for (let i = 0; i < 3; i++) {
            this.matriz[x - 2 - i][y + 2] = 1;
            this.matriz[x - 2 - i][y + 4] = 1;
        }
        this.matriz[x - 2][y + 3] = 1;
        this.matriz[x - 3][y + 3] = 1;
        this.matriz[x - 4][y + 3] = 1;
    }
    dibujarBlanco() {
        this.graphics.fillStyle = "white";
        for (let i = 0; i < 8; i++) {
            this.matriz[i][7] = 0;
            this.matriz[i][this.rWidth - 8] = 0;
            this.matriz[7][i] = 0;
            this.matriz[this.rWidth - 8 + i][7] = 0;
            this.matriz[this.rWidth - 8][i] = 0;
            this.matriz[7][this.rWidth - 8 + i] = 0;
        }
        for (let i = 1; i < 6; i++) {
            this.matriz[1][i] = 0;
            this.matriz[5][i] = 0;
            this.matriz[i][1] = 0;
            this.matriz[i][5] = 0;
        }
        for (let i = 1; i < 6; i++) {
            this.matriz[this.rWidth - 6][i] = 0;
            this.matriz[this.rWidth - 2][i] = 0;
            this.matriz[this.rWidth - 7 + i][1] = 0;
            this.matriz[this.rWidth - 7 + i][5] = 0;
        }
        for (let i = 1; i < 6; i++) {
            this.matriz[1][this.rWidth - 1 - i] = 0;
            this.matriz[5][this.rWidth - 1 - i] = 0;
            this.matriz[i][this.rWidth - 2] = 0;
            this.matriz[i][this.rWidth - 6] = 0;
        }
        this.graphics.fillStyle = "black";
        this.matriz[this.rWidth - 8][7] = 1;
    }
    cuadradoPequeño(x, y) {
        for (let i = 0; i < 5; i++) {
            this.matriz[x - i][y] = 1;
            this.matriz[x - i][y + 4] = 1;
        }
        for (let i = 0; i < 5; i++) {
            this.matriz[x][y + i] = 1;
            this.matriz[x - 4][y + i] = 1;
        }
        this.graphics.fillStyle = "white";
        for (let i = 1; i < 4; i++) {
            this.matriz[x - i][y + 1] = 0;
            this.matriz[x - i][y + 3] = 0;
        }
        for (let i = 1; i < 4; i++) {
            this.matriz[x - 1][y + i] = 0;
            this.matriz[x - 3][y + i] = 0;
        }
        this.graphics.fillStyle = "black";
        this.matriz[x - 2][y + 2] = 1;
    }
    dibujolineas(z) {
        let bandera = true;
        for (let i = 0; i < 9; i++) {
            if (z == 1) {
                this.matriz[this.rWidth - 9 - i][6] = 0;
            }
            if (bandera) {
                if (z != 1) {
                    this.matriz[this.rWidth - 9 - i][6] = 1;
                }
                bandera = false;
            }
            else {
                bandera = true;
            }
        }
        bandera = true;
        for (let i = 0; i < 9; i++) {
            if (z == 1) {
                this.matriz[6][this.rWidth - 9 - i] = 0;
            }
            if (bandera) {
                if (z != 1) {
                    this.matriz[6][this.rWidth - 9 - i] = 1;
                }
                bandera = false;
            }
            else {
                bandera = true;
            }
        }
    }
    lineasErrores() {
        for (let i = this.rWidth - 1; i > this.rWidth - 9; i--) {
            this.matriz[8][i] = 0;
            this.matriz[i][8] = 0;
        }
        for (let i = 0; i < 9; i++) {
            if (this.matriz[8][i] != 1) {
                this.matriz[8][i] = 0;
            }
            if (this.matriz[i][8] != 1) {
                this.matriz[i][8] = 0;
            }
        }
    }
    recorrido(y) {
        let bandera = 0;
        let maxX = this.rWidth - 1;
        let maxY = this.rWidth - 1;
        let orientacion = true;
        for (let j = 10; j > 0; j--) {
            if (orientacion) {
                for (let i = maxY; i >= 0; i--) {
                    for (let l = maxX; l > maxX - 2; l--) {
                        if (this.matriz[i][l] != 0 && this.matriz[i][l] != 1 && l >= 0 && bandera < y.length) {
                            this.matriz[i][l] = parseInt(y[bandera]);
                            bandera++;
                        }
                    }
                    if (i == 0) {
                        maxY = 0;
                        orientacion = false;
                    }
                }
                maxX -= 2;
            }
            else {
                for (let i = maxY; i < this.rWidth; i++) {
                    for (let l = maxX; l > maxX - 2; l--) {
                        if (this.matriz[i][l] != 0 && this.matriz[i][l] != 1 && bandera < y.length) {
                            this.matriz[i][l] = parseInt(y[bandera]);
                            bandera++;
                        }
                    }
                    if (i == this.rWidth - 1) {
                        orientacion = true;
                        maxY = this.rWidth - 1;
                    }
                }
                maxX -= 2;
            }
        }
    }
    textToBinary(text) {
        return text.split('')
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join('');
    }
    llenado() {
        for (let i = 0; i < this.rWidth; i++) {
            for (let l = 0; l < this.rWidth; l++) {
                if (this.matriz[i][l] == 1) {
                    this.graphics.fillStyle = "black";
                    this.dibujarPixel(l, i);
                }
                else {
                    /*this.graphics.fillStyle = "white";
                    this.dibujarPixel(l,i)*/
                }
            }
        }
    }
    // Update your paint method
    paint(URL) {
        this.drawLine(this.iX(0), this.iY(0), this.iX(25), this.iY(0));
        let tamX = this.rWidth;
        let tamY = this.rWidth;
        this.graphics.fillStyle = "black";
        for (let x = 0; x <= tamX; x++)
            this.drawLine(this.iX(x), this.iY(0), this.iX(x), this.iY(tamX));
        for (let y = 0; y <= tamY; y++)
            this.drawLine(this.iX(0), this.iY(y), this.iX(tamY), this.iY(y));
        // URL to encod
        // Prepare data
        const configuracion = "0100";
        const binario = this.textToBinary(URL);
        let caracteres = URL.length.toString(2).padStart(8, '0');
        let datosFinales = configuracion + caracteres + binario + "0000";
        // Apply error correction
        //const finalBinary = this.applyErrorCorrection(binaryData);
        // Draw fixed patterns
        this.dibujarCuadrado(6, 0);
        this.dibujarCuadrado(24, 0);
        this.dibujarCuadrado(6, 18);
        this.cuadradoPequeño(20, 16);
        this.dibujolineas(1);
        this.dibujarBlanco();
        this.lineasErrores();
        this.dibujolineas(2);
        this.recorrido(datosFinales);
        this.llenado();
        console.log(datosFinales);
        console.log(this.matriz);
    }
}
