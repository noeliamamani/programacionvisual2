function prepararJuego(imagenes) {
    var imagenesDesordenadas = crearImagenesDesordenadas(imagenes);

    for (var i = 0; i < imagenesDesordenadas.length; i++) {
        // creo los img y le pongo el id que cree arriba, y a todos la imagen base
        $('.grid').append('<img id="' + i + '" class="carta" src="' + imagenesDesordenadas[i] + '" alt="imagen">');
    }


    // CUANDO HAGO CLICK EN INICIAR
    $("#iniciar").click(function () {

        // limpio
        $(".carta").attr("src", "imagenes/base.png")

        // me traigo una carta al azar
        var pokemonObjetivo = obtenerImagenAlAzar(imagenes)

        $("#pokemon-objetivo").attr("src", pokemonObjetivo)

        // 5 segundos
        var tiempo = 5

        // hago un conteo, y bajo un segundo cada vez
        var timer = window.setInterval(function() {
            tiempo--;
            // actualizo el elemento, para que muestre
            $('#conteo').text(tiempo);

            // cuando llega a cero, limpio el intervalo
            if (tiempo == 0) {
                clearInterval(timer);
                window.setTimeout(function () {
                    alert("Perdiste");
                }, 200);
                // NO HAGAS MAS CLICKS EN LAS CARTAS
                $(".carta").off("click");
            }
        }, 1000);

        // recorro todas las cartas y cuando hago click...
        $(".carta").click(function () {

            // paro el contador!
            clearInterval(timer);

            // LIMPIO TODAS LAS CARTAS
            var id = $(this).attr("id");

            // obtengo la imagen con ese id
            var imagenPokemon = imagenesDesordenadas[id]

            // le cambio la imagen al que hice click!!!
            $(this).attr("src", imagenPokemon)

            if (imagenPokemon == $("#pokemon-objetivo").attr("src")) {
                window.setTimeout(function () {
                    alert("Ganaste");
                }, 200);

            } else {
                window.setTimeout(function () {
                    alert("Perdiste");
                }, 200);
            }

            // NO HAGAS MAS CLICKS EN LAS CARTAS
            $(".carta").off("click");
        });
    })

}

// le paso un array de imagenes, y me devuelve otro desordenado!
function crearImagenesDesordenadas(imagenes) {
    var salieron = [];

    do {
        var azar = 0;

        // toma un numero al azar, lo multiplica por la cantidad de elementos y lo redondea
        // me da un numero entr 0 y imagenes.length - 1
        // por ejemplo, si imagenes.length es igual a 4, me va a dar un valor entre 0 y 3
        azar = Math.floor(Math.random() * imagenes.length);

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

    var azar = Math.floor(Math.random() * imagenes.length);

    return imagenes[azar]
}
