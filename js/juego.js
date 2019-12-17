function iniciarJuego(imagenes) {

    // PASO: DESORDENA LAS IMAGENES
    var imagenesDesordenadas = crearImagenesDesordenadas(imagenes);

    // PASO: CREA LAS CARTAS EN BASE A LAS IMAGENES DESORDENADAS!!
    for (var i = 0; i < imagenesDesordenadas.length; i++) {
        // creo los img y le pongo el id que cree arriba, y a todos la imagen base
        $('.grid').append('<img id="' + i + '" class="carta" src="' + imagenesDesordenadas[i] + '" alt="imagen">');
    }


    // PASO: CUANDO HAGO CLICK EN INICIAR...
    $("#iniciar").click(function () {

        // PASO: LE PONE A TODAS LAS IMAGENES (EN REALIDAD LE PONE A TODO LO QUE TENGA LA CLASE carta) LA IMAGEN BASE
        $(".carta").attr("src", "imagenes/base.png");

        // PASO: OBTENGO AL AZAR EL OBJETIVO DEL MEMO TEST, Y LO PONGO EN LA IMAGEN pokemon-objetivo
        var pokemonObjetivo = obtenerImagenAlAzar(imagenes);
        $("#pokemon-objetivo").attr("src", pokemonObjetivo);

        // PASO: CREO UN CONTEO REGRESIVO, Y CUANDO LLEGA A CERO MUESTRO QUE PERDISTE!
        var tiempo = 5;
        var timer = window.setInterval(function () {
            if (tiempo == 0) {
                clearInterval(timer);
                alert("Perdiste");
                $(".carta").off("click");
            } else {
                tiempo = tiempo - 1;
                $('#conteo').text(tiempo);
            }
        }, 1000);

        $(".carta").click(function () {

            // PASO: CUANDO HAGO CLICK EN UNA CARTA, FRENO EL CONTEO REGRESIVO!!!!
            clearInterval(timer);

            // PASO: Cambio la carta a la imagen que le corresponde
            var id = $(this).attr("id");
            var imagenPokemon = imagenesDesordenadas[id];
            $(this).attr("src", imagenPokemon);

            //
            if (imagenPokemon == $("#pokemon-objetivo").attr("src")) {
                window.setTimeout(function () {
                    alert("Ganaste");
                   if (nivel == 1){
                        window.location = "instrucciones2.html";
                    } else {
                        window.location = "principal.html";
                    }

                }, 200); // MILISEGUNDOS....

            } else {
                window.setTimeout(function () {
                    alert("Perdiste");
                    reiniciar(imagenes);
                }, 150);
            }

            // NO HAGAS MAS CLICKS EN LAS CARTAS
            $(".carta").off("click");
        });
    })

}

function reiniciar(imagenes) {

    // LIMPIO TODO
    $('.grid img').remove(); // ahora si, no inventes -.-
    $('#conteo').text("-");
    $("#iniciar").off("click");

    iniciarJuego(imagenes);
}

// le paso un array de imagenes, y me devuelve otro desordenado!
function crearImagenesDesordenadas(imagenes) {
    var salieron = [];

    do {
        var azar = 0;

        // toma un numero al azar, lo multiplica por la cantidad de elementos y lo redondea
        // me da un numero entr 0 y imagenes.length - 1
        // por ejemplo, si imagenes.length es igual a 4, me va a dar un valor entre 0 y 3
        // oseaaa, te da un numero al azar entre 0 y imagenes.length
        azar = Math.floor(Math.random() * imagenes.length); //este cacho de codigo es complicado, ni yo se como funciona

        // si no existe lo agrego, hasta tener una lista de INDICES desordenados
        if (salieron.indexOf(azar) == -1) {
            salieron.push(azar);
        }
    } while (salieron.length != imagenes.length); // MIENTRAS NO SEAN IGUALES en cantidad de elementos, REPETIR!!!

    var imagenesDesordenadas = []
    for (var i = 0; i < salieron.length; i++) {
        // CARGO EL NUEVO ARRAY CON LAS IMAGENES DESORDENADAS
        var indice = salieron[i]; // me traigo el indice de imagenes, que esta desordenado
        var imagen = imagenes[indice]; // me traigo la imagen de ese indice
        imagenesDesordenadas.push(imagen) // guardo la imagen en el nuevo array
    }

    return imagenesDesordenadas;
}

// obtengo una imagen al azar de la lista
function obtenerImagenAlAzar(imagenes) {

    var azar = Math.floor(Math.random() * imagenes.length); //este cacho de codigo es complicado, ni yo se como funciona

    return imagenes[azar]
}
