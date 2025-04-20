export class CanvasLocal {
    constructor(g, canvas) {
        this.graphics = g;
        this.rWidth = 37;
        this.rHeight = 37;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = 0;
        this.centerY = this.maxY;
    }
    iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
    iY(y) { return Math.round(y / this.pixelSize); }
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    /*fx(x:number):number {
      return Math.sin(x*2.5);
    }*/
    dibujarPixel(x, y) {
        this.graphics.fillRect(this.iX(x), this.iY(y), this.iX(1) - this.iX(0), this.iX(1) - this.iX(0));
    }
    dibujarCuadrado(x, y) {
        this.graphics.fillStyle = "black";
        for (let i = 0; i < 7; i++) {
            this.dibujarPixel(x - i, y);
            this.dibujarPixel(x - i, y + 6);
        }
        for (let i = 0; i < 7; i++) {
            this.dibujarPixel(x, y + i);
            this.dibujarPixel(x - 6, y + i);
        }
        for (let i = 0; i < 3; i++) {
            this.dibujarPixel(x - 2 - i, y + 2);
            this.dibujarPixel(x - 2 - i, y + 4);
        }
        this.dibujarPixel(x - 2, y + 3);
        this.dibujarPixel(x - 3, y + 3);
        this.dibujarPixel(x - 4, y + 3);
    }
    cuadradoPequeño(x, y) {
        for (let i = 0; i < 5; i++) {
            this.dibujarPixel(x - i, y);
            this.dibujarPixel(x - i, y + 4);
        }
        for (let i = 0; i < 5; i++) {
            this.dibujarPixel(x, y + i);
            this.dibujarPixel(x - 4, y + i);
        }
        this.graphics.fillStyle = "white";
        for (let i = 1; i < 4; i++) {
            this.dibujarPixel(x - i, y + 1);
            this.dibujarPixel(x - i, y + 3);
        }
        for (let i = 1; i < 4; i++) {
            this.dibujarPixel(x - 1, y + i);
            this.dibujarPixel(x - 3, y + i);
        }
        this.graphics.fillStyle = "black";
        this.dibujarPixel(x - 2, y + 2);
    }
    dibujolineas() {
        let bandera = true;
        for (let i = 0; i < 21; i++) {
            if (bandera) {
                this.dibujarPixel(28 - i, 6);
                bandera = false;
            }
            else {
                bandera = true;
            }
        }
        bandera = true;
        for (let i = 0; i < 21; i++) {
            if (bandera) {
                this.dibujarPixel(6, 28 - i);
                bandera = false;
            }
            else {
                bandera = true;
            }
        }
    }
    textToBinary(text) {
        return text.split('')
            .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'));
    }
    almacena(conf) {
        let x = 36;
        let y = 36;
        let b = 1;
        for (let i = 0; i < conf.length; i++) {
            if (conf[i] == "1") {
                this.dibujarPixel(x, y);
            }
            x--;
            if (b == 2) {
                y--;
                x = 36;
                b = 1;
            }
            else {
                b++;
            }
        }
    }
    caracteres(carac) {
        let x = 36;
        let y = 34;
        let b = 1;
        for (let i = 0; i < carac.length; i++) {
            if (carac[i] == "1") {
                this.dibujarPixel(x, y);
            }
            x--;
            if (b == 2) {
                y--;
                x = 36;
                b = 1;
            }
            else {
                b++;
            }
        }
    }
    llenadoTotal(binario) {
        let llenado = ["a", "a", "a", "a", "a", 0, "a", "a", "a", "a", "a", "a", 0, "e", "a", "a", "a", "a", 2, "a", "a", "a",
            "a", "b", 4, "c", "a", "a", "a", "a", "d", 'a', 1, "f", "a", "a", "a", "a", "a", "a", "a", 1, "a", "a", "a", "a", "a",
            "a", "d", "a", 1, "f", "a", "a", "a", "a", "a", "a", "a", 1, "a", "a", "a", "a", "a", "a", "d", "a", 1, "f", "a", "a",
            "a", "a"];
        let xi = 36;
        let yi = 30;
        let b = 1;
        let orientacion = true;
        for (let i = 0; i < binario.length; i++) {
            if (llenado[i] == "a") {
                console.log(binario[i]);
                for (let l = 0; l < binario[i].length; l++) {
                    if (binario[i][l] == "1") {
                        this.dibujarPixel(xi, yi);
                    }
                    xi--;
                    if (b == 2) {
                        orientacion == true ? yi-- : yi++;
                        xi += 2;
                        b = 1;
                    }
                    else {
                        b++;
                    }
                }
            }
            else {
                if (llenado[i] == "b") {
                    console.log(binario[i]);
                    yi += 5;
                    for (let l = 0; l < binario[i].length; l++) {
                        if (binario[i][l] == "1") {
                            this.dibujarPixel(xi, yi);
                        }
                        xi--;
                        if (b == 2) {
                            orientacion == true ? yi-- : yi++;
                            xi += 2;
                            b = 1;
                        }
                        else {
                            b++;
                        }
                    }
                    xi -= 2;
                    yi--;
                }
                else {
                    if (llenado[i] == "c") {
                        console.log(binario[i]);
                        xi--;
                        let cambio = ['a', 'a', 'a', 'a', 'ad', 'i', 'ad', 'i'];
                        for (let l = 0; l < binario[i].length; l++) {
                            if (binario[i][l] == "1") {
                                this.dibujarPixel(xi, yi);
                            }
                            if (cambio[l] == 'i') {
                                xi--;
                            }
                            if (cambio[l] == 'ad') {
                                xi++;
                                yi--;
                            }
                            if (cambio[l] == 'a') {
                                yi--;
                            }
                        }
                        b++;
                    }
                    else {
                        if (llenado[i] == "d") {
                            console.log(binario[i]);
                            let cambio = ['ad', 'i', 'ad', 'i', 'ad', 'i', 'aad', 'i'];
                            for (let l = 0; l < binario[i].length; l++) {
                                if (binario[i][l] == "1") {
                                    this.dibujarPixel(xi, yi);
                                }
                                if (cambio[l] == 'i') {
                                    xi--;
                                }
                                if (cambio[l] == 'ad') {
                                    xi++;
                                    yi--;
                                }
                                if (cambio[l] == 'a') {
                                    yi--;
                                }
                                if (cambio[l] == 'aad') {
                                    yi -= 2;
                                    xi++;
                                }
                            }
                            //this.graphics.fillStyle = "red";
                        }
                        else {
                            if (llenado[i] == "e") {
                                console.log(binario[i]);
                                let aSalto = 0;
                                for (let l = 0; l < binario[i].length; l++) {
                                    if (binario[i][l] == "1") {
                                        this.dibujarPixel(xi, yi);
                                    }
                                    xi--;
                                    aSalto++;
                                    if (aSalto == 4) {
                                        yi -= 5;
                                    }
                                    if (b == 2) {
                                        orientacion == true ? yi-- : yi++;
                                        xi += 2;
                                        b = 1;
                                    }
                                    else {
                                        b++;
                                    }
                                }
                            }
                            else {
                                if (llenado[i] == "f") {
                                    console.log(binario[i]);
                                    let cambio = ['abd', 'i', 'abd', 'i', 'abd', 'i', 'abbd', 'i'];
                                    for (let l = 0; l < binario[i].length; l++) {
                                        if (binario[i][l] == "1") {
                                            this.dibujarPixel(xi, yi);
                                        }
                                        if (cambio[l] == 'i') {
                                            xi--;
                                        }
                                        if (cambio[l] == 'abd') {
                                            xi++;
                                            yi++;
                                        }
                                        if (cambio[l] == 'abbd') {
                                            yi += 2;
                                            xi++;
                                        }
                                    }
                                    // b++;
                                }
                                else {
                                    if (orientacion) {
                                        console.log(binario[i]);
                                        let cambio = ['i', 'ad', 'i', 'i', 'i', 'abd', 'i', 'abd', 'i', 'abd', 'i', 'abd', 'i'];
                                        for (let l = 0; l < binario[i].length; l++) {
                                            if (binario[i][l] == "1") {
                                                this.dibujarPixel(xi, yi);
                                            }
                                            if (cambio[l + llenado[i]] == 'i') {
                                                xi--;
                                            }
                                            if (cambio[l + llenado[i]] == 'ad') {
                                                xi++;
                                                yi--;
                                            }
                                            if (cambio[l + llenado[i]] == 'abd') {
                                                xi++;
                                                yi++;
                                            }
                                        }
                                        orientacion = false;
                                    }
                                    else {
                                        console.log(binario[i]);
                                        let cambio = ['i', 'abd', 'i', 'i', 'i', 'ad', 'i', 'ad', 'i', 'ad', 'i', 'ad', 'i'];
                                        for (let l = 0; l < binario[i].length; l++) {
                                            if (binario[i][l] == "1") {
                                                this.dibujarPixel(xi, yi);
                                            }
                                            if (cambio[l + llenado[i]] == 'i') {
                                                xi--;
                                            }
                                            if (cambio[l + llenado[i]] == 'ad') {
                                                xi++;
                                                yi--;
                                            }
                                            if (cambio[l + llenado[i]] == 'abd') {
                                                xi++;
                                                yi++;
                                            }
                                        }
                                        orientacion = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (llenado[i] == 0) {
            }
            if (llenado[i] == 3) {
                console.log(binario[i]);
                let cambio = ['i', 'i', 'i', 'ad', 'i', 'ad', 'i'];
                for (let l = 0; l < binario[i].length; l++) {
                    if (binario[i][l] == "1") {
                        this.dibujarPixel(xi, yi);
                    }
                    if (cambio[l] == 'i') {
                        xi--;
                    }
                    if (cambio[l] == 'ad') {
                        xi++;
                        yi--;
                    }
                    if (cambio[l] == 'abd') {
                        xi++;
                        yi++;
                    }
                }
                xi++;
                yi--;
                orientacion = true;
            }
        }
    }
    paint() {
        this.drawLine(this.iX(0), this.iY(0), this.iX(25), this.iY(0));
        let tamX = 37;
        let tamY = 37;
        this.graphics.fillStyle = "black";
        for (let x = 0; x <= tamX; x++)
            this.drawLine(this.iX(x), this.iY(0), this.iX(x), this.iY(tamX));
        for (let y = 0; y <= tamY; y++)
            this.drawLine(this.iX(0), this.iY(y), this.iX(tamY), this.iY(y));
        //llenado de tablas 
        this.almacena("0100");
        const url = "https://example.com/this-is-a-very-long-url-that-fits-in-version-5-QR-code";
        const binario = this.textToBinary(url);
        this.caracteres(binario.length.toString(2).padStart(8, '0'));
        this.llenadoTotal(binario);
        //genera cuadros obligatorios
        this.dibujarCuadrado(6, 0);
        this.dibujarCuadrado(36, 0);
        this.dibujarCuadrado(6, 30);
        this.cuadradoPequeño(32, 28);
        this.dibujolineas();
    }
}
