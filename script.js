var palabras = ["perro", "gato", "casa", "animal", "ojos", "archivo", "imagen","futbol", "java", "html"];

var tamanoPalabra = 52;
var espacio = 8;

const iniciarJuego = document.querySelector(".juego");
const menuJuego = document.querySelector(".botonesMenu");
const menuAgregar = document.querySelector(".botonesAgregar");
const menuAgregar2 = document.querySelector(".nuevaPalabra");

const pantalla = document.querySelector('.lienzo');

var pantalla2 = document.querySelector('canvas');
var pincel = pantalla2.getContext('2d');

var fallos = 0;
var aciertos = 0;

var palabraAleat = elegirPalabra(palabras);;
var largo = palabraAleat.length*(tamanoPalabra+espacio);
var posX = (1150-largo)/2;

var letraPresionada = [];

function btnIniciar() {
    menuJuego.style.display = "none";
    iniciarJuego.style.display = "flex";

    palabraAleat = elegirPalabra(palabras);
    largo = palabraAleat.length*(tamanoPalabra+espacio);
    posX = (1150-largo)/2;
    letraPresionada = [];

    fallos = 0;
    aciertos = 0;
    indicarLetras(palabraAleat);

    document.addEventListener('keypress',pantallaJuego , false);
}

function btnDesistir() {
    menuJuego.style.display = "flex";
    iniciarJuego.style.display = "none";
    pincel.clearRect(0, 0, pantalla2.width, pantalla2.height);
    location.reload();    
    aciertos=0;
    fallos=0;
}

function btnNuevo(){
    pincel.clearRect(0, 0, pantalla2.width, pantalla2.height);
    pincel.resetTransform();

    palabraAleat = elegirPalabra(palabras);
    largo = palabraAleat.length*(tamanoPalabra+espacio);
    posX = (1150-largo)/2;
    letraPresionada = [];

    aciertos=0;
    fallos=0;
    indicarLetras(palabraAleat);
    document.addEventListener('keypress',pantallaJuego , false);
}

function btnAgregar() {
    menuJuego.style.display = "none";
    menuAgregar.style.display = "flex";
    menuAgregar2.style.display = "flex";
}

function btnCancelar() {
    menuJuego.style.display = "flex";
    iniciarJuego.style.display = "none";
    menuAgregar.style.display = "none";
    menuAgregar2.style.display = "none";
    menuAgregar2.value = "";
}

function btnGuardar() {

    if (menuAgregar2.value) {
        palabras.push(menuAgregar2.value);
        palabraAleat = menuAgregar2.value;

        iniciarJuego.style.display = "flex";

        menuAgregar.style.display = "none";
        menuAgregar2.style.display = "none";
        menuAgregar2.value = "";


        largo = palabraAleat.length*(tamanoPalabra+espacio);
        posX = (1150-largo)/2;
        letraPresionada = [];

        fallos = 0;
        aciertos = 0;
        indicarLetras(palabraAleat);

        document.addEventListener('keypress',pantallaJuego , false);
    }    

}

function elegirPalabra(palabras) {
    indice = Math.floor(Math.random()*palabras.length)
    return  palabras[indice]
}

function esLetra(str) {
    return (/[a-zA-Z]/).test(str);
  }

function pertenece(letra, palabra) {

    var indices = [];

    for (var i = 0; i < palabra.length; i++) {
        if (palabra[i] == letra) {
            indices.push(i);
        }

    }
    return indices;

}

function dibujarHombre(fallos){
    switch (fallos) {
        case 1:                    
            pincel.fillRect(300, 450, 600, 10);
            break;
        case 2:                    
            pincel.fillRect(450, 0, 10, 460);
            break;
        case 3:                    
            pincel.fillRect(450, 0, 250, 10);
            break;
        case 4:                    
            pincel.fillRect(690, 0, 10, 60);
            break;
        case 5:                    
            pincel.beginPath();
            pincel.arc(695, 100, 40, 0, 2*3.14);
            pincel.fill();
            pincel.fillStyle = '#f3f5fc';
            pincel.beginPath();
            pincel.arc(695, 100, 35, 0, 2*3.14);
            pincel.fill();
            pincel.fillStyle = '#0A3871';
            break;
        case 6:                    
            pincel.fillStyle = '#0A3871';
            pincel.fillRect(690, 140, 10, 130);
            break;
        case 7:                    
            pincel.translate(695,155);    
            pincel.rotate(45* Math.PI / 180);
            pincel.fillRect(0,0,100,10);
            break;
        case 8:
            pincel.translate(695,155);    
            pincel.rotate(315* Math.PI / 180);     
            pincel.fillRect(0,0,-100,10);
            break;
        case 9:
            pincel.translate(695,260);                
            pincel.rotate(45* Math.PI / 180);
            pincel.fillRect(0,0,100,10);
            break;
        case 10:
            pincel.translate(695,260);                                    
            pincel.rotate(315* Math.PI / 180);
            pincel.fillRect(0,0,-100,10);
            break;
        default:
            break;
    }
}

function ganar(aciertos,palabraAleat){
    if (aciertos == palabraAleat.length) {
        pincel.resetTransform();
        pincel.fillStyle = 'green';
        pincel.font = "30px Arial";
        pincel.fillText("Felicitaciones, ganaste!", 500, 400);
        document.removeEventListener('keypress',pantallaJuego , false);
    }

}

function perder(fallos){
    if (fallos == 10) {
        pincel.resetTransform();
        pincel.fillStyle = 'red';
        pincel.font = "30px Arial";
        pincel.fillText("Fin del juego, intenta una vez más!", 500, 400);
        document.removeEventListener('keypress',pantallaJuego , false);
    }

}

function indicarLetras(palabraAleat) {

    pincel.resetTransform();
    pincel.fillStyle = '#0A3871'; 

    for (var i = 0; i < palabraAleat.length; i++) {
        pincel.resetTransform();
        pincel.fillRect(posX+((tamanoPalabra*i)+espacio*i),550,tamanoPalabra,10);        
    }   
}

function letraRepetida(letraPresionada,letra){
    var estado = false;
    for (var i = 0; i < letraPresionada.length; i++) {
        if(letra == letraPresionada[i]){
            estado = true;
            break;
        }     
    }
    return estado;
}

function pantallaJuego(event) {
    var letra = event.key;
    var indices = pertenece(letra, palabraAleat);

    console.log(indices.length)
    console.log(letra)
    pincel.resetTransform();

    if (iniciarJuego.style.display == "flex") {

        nonuevaLetra = letraRepetida(letraPresionada,letra)
        console.log(nonuevaLetra);
        console.log(letraPresionada);
        if (nonuevaLetra == false) {

            letraPresionada.push(letra);

            if (indices.length != 0) {
                for (var i = 0; i < indices.length; i++) {
                    aciertos+=1;
                    pincel.font = "40px Arial";
                    pincel.fillText(palabraAleat[indices[i]].toUpperCase(), (tamanoPalabra/5) + posX + ((tamanoPalabra*indices[i]) + espacio*indices[i]), 540);
                }
            }
            else{
                fallos+=1;
                console.log(fallos);

                pincel.fillStyle = '#0A3871';
                pincel.font = "20px Arial";
                pincel.fillText(letra.toUpperCase(), (tamanoPalabra/5) + posX + ((tamanoPalabra*(fallos-1)) + espacio*(fallos-1)), 600);

                dibujarHombre(fallos);
            } 

            perder(fallos);
            ganar(aciertos,palabraAleat);
        }

    }


}

/*document.addEventListener('keypress',pantallaJuego , false);*/

