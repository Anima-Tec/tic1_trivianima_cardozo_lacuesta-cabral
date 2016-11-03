$(document).ready(function() {

    jugar(1,0);
    $('#iniciar-btn').click (function() {
        remplazarTitulo();
        $('#iniciar').fadeOut(500, function() {
            nuevoJuego();
            selecionarPreguntas();
            cargarPreguntas();
            $('#pagina').fadeIn(500);
        });
        $('#juego').fadeOut(500);
        $('.disclaim').fadeOut(500);
    });
    $('#respuesta-btn').click(function() {
        var respuestaUsuario = $('input:radio[name=ans]:checked').val();
        if (!respuestaUsuario) {
          swal({   title: "Error!",   text: "No haz ingresado ninguna opción, por favor ingresa una!",   type: "error",   confirmButtonText: "Aceptar" });
        } else {
            if (correcto(respuestaUsuario)) {
                $('#pagina').fadeOut(500, function() {

                    puntos+=3;
                    updatePuntos();
                    $('.respuesta-exp').text(pagina_Preguntas[num]["respuesta-exp"]);
                    $('#correcto').fadeIn(500);
                });
            } else {
                $('#pagina').fadeOut(500, function() {
                  puntos--;
                  updatePuntos();
                    $('.respuesta-exp').text(pagina_Preguntas[num]["respuesta-exp"]);
                    $('#incorrecto').fadeIn(500);
                });
            }
        }
    });
    $('.cont-btn').click(function() {
        $('#correcto').fadeOut(500, function() {
            $('#incorrecto').fadeOut(500, function() {
                if (count >= num_preg) {
                    updatePuntos();
                    updateRank();
                    $('#final').fadeIn(500);
                } else {
                    selecionarPreguntas();
                    cargarPreguntas();
                    $('form input').prop('checked', false);
                    $('#pagina').fadeIn(500);
                }
            });
        });
    });
    $('#iniciar-nuev').click(function() {
        $('#final').fadeOut(500, function() {
            nuevoJuego();
            selecionarPreguntas();
            cargarPreguntas();
            $('form input').prop('checked', false);
            $('#pagina').fadeIn(500);
        });
    });
});

var num = 0;
var count = 0;
var num_preg = 8;
var puntos = 0;
var prior_Preguntas = [];

var remplazarTitulo = function() {
    var head = $("<span>BIOLOGÍA</span>");
    $('h1').find("span").remove();
    $('h1').append(head);
};
var jugar = function(index,prev) {
    $('#juego').children('p:eq(' + prev + ')').delay(1800).fadeOut(800, function(){
        $('#juego').children('p:eq(' + index + ')').fadeIn(800, function(){
            prev = index;
            if (index === 3){
                index = 0;
            } else {
                index++;
            }
            jugar(index,prev);
        });
    });
};
var nuevoJuego = function() {
    num = 0;
    count = 0;
    puntos = 0;
    prior_Preguntas = [];
};
var selecionarPreguntas = function() {
    abrirPregunta();
    while (wasAsked()) {
        abrirPregunta();
    }
};
var abrirPregunta = function() {
    var limit = Object.keys(pagina_Preguntas).length;
    num = Math.floor((Math.random() * limit) + 1)
};
var wasAsked = function() {
    var resultado = false;
    for (var i=0;i<=prior_Preguntas.length;i++){
        if (num == prior_Preguntas[i]) {
            resultado = true;
        }
    }
    return resultado;
};
var cargarPreguntas = function() {
    prior_Preguntas.push(num);
    $('#icon').html("<i class=\"fa fa-"+pagina_Preguntas[num]["icon"]+"\"></i>");
    $('#text').html(pagina_Preguntas[num]["Pregunta"]);
    $('#opcion-1').html(pagina_Preguntas[num]["opciones"][1]);
    $('#opcion-2').html(pagina_Preguntas[num]["opciones"][2]);
    $('#opcion-3').html(pagina_Preguntas[num]["opciones"][3]);
    $('#opcion-4').html(pagina_Preguntas[num]["opciones"][4]);
    $('#opcion-5').html(pagina_Preguntas[num]["opciones"][5]);
    updatePuntos();
    count++;
    $('.progreso').text(count+"/"+num_preg);
};
var correcto = function(respuestaUsuario) {
    if (respuestaUsuario == pagina_Preguntas[num]["respuesta"]) {
        return true;
    } else {
        return false;
    }
};
var updatePuntos = function() {
    $('.puntos').text(puntos);


    }

var updateRank = function() {
    if (puntos == 8){
        $('.rank').text('Perfecto');
        $('.rank-msg').text('Excelente! alcanzaste el maximo puntos!)');
    } else if (puntos >= 7 && puntos <=  9) {
        $('.rank').text('Muy bien!!!');
        $('.rank-msg').text('Falto poquito para alcanzar el maximo puntaje, seguro para la proxima lo logras!');
    } else if (puntos >= 4 && puntos <= 6) {
        $('.rank').text('Bien!');
        $('.rank-msg').text('Llegaste a la mitad de los puntos. Sigue intentando!');
    } else if (puntos >= 1 && puntos <= 3) {
        $('.rank').text('Falta mucho aún!');
        $('.rank-msg').text('No haz alcanzado la mitad de los puntos, continua intentando!');
    } else if (puntos == 0) {
        $('.rank').text('NO!');
        $('.rank-msg').text('No haz acertado niguna!! .');
    }
};
var pagina_Preguntas = {
    1: {
        "icon": "graduation-cap",
        "Pregunta": "Que son las enzimas?",
  "opciones": {
      1: "Un atomo",
      2: "Una celula",
      3: "Un catalizador biologico",
      4: "El nombre que se le da a el proceso de la meiosis",
      5: "Una neurona"

        },
        "respuesta": 3,
        "respuesta-exp": "Las enzimas son catalizadores biologicos"
    },
    2: {
        "icon": "graduation-cap",
        "Pregunta": "Son un conjunto de membranas que protegen al sistema nervioso.",
        "opciones": {
            1: "Tejidos",
            2: "Neuronas",
            3: "Cerebelo",
            4: "Meninges",
            5: "Liquido Céfalo raquídeo"
        },
        "respuesta": 4,
        "respuesta-exp": "Las meninges son un conjunto de membranas que protegen al sistema nervioso"
    },
    3: {
      "icon": "graduation-cap",
      "Pregunta": "Que nombre recibe la estructura biologica que une al musculo y al hueso?",
      "opciones": {
          1: "Musculos",
          2: "Tendones",
          3: "Venas",
          4: "Huesos",
          5: "Organos"
      },
      "respuesta": 2,
      "respuesta-exp": "Los tendones unen al musculo con el hueso"
    },
    4: {
      "icon": "graduation-cap",
      "Pregunta": "como se llama la glandula mas grande del cuerpo humano?",
      "opciones": {
          1: "Tiroides",
          2: "Corazón",
          3: "Pulmones",
          4: "pancreas",
          5: "Cerebro"
      },
      "respuesta": 4,
      "respuesta-exp": "La glandua mas grande del ser humano es el higado"
    },
    5: {
      "icon": "graduation-cap",
              "Pregunta": "Cual es el resultado la meiosis ?",
              "opciones": {
                  1: "4 hijas",
                  2: "2 hijas",
                  3: "1 hija",
                  4: "8 hijas",
                  5: "ninguna"
              },
              "respuesta": 1,
              "respuesta-exp": "En la meiosis la celula madre genera 2 hijas"    },
      6: {
      "icon": "graduation-cap",
      "Pregunta": "como esta formado un nuceotido?",
      "opciones": {
          1: "AZUCAR, NITROGENO, FOSFATO",
          2: "FOSFATO, AZUCAR, BASE NITORGENADA",
          3: "AZUCAR, HIDROGENO, FOSFATO",
          4: "NUCLEOTIDOS, AZUCAR, FOSFATO",
          5: "FOSFATO, NITROGENO, HIDROGENO"
      },
      "respuesta": 2,
      "respuesta-exp": "Un nuceotido se forma por FOSFATO, AZUCAR, BASE NITORGENADA"
},
  7: {
      "icon": "graduation-cap",
      "Pregunta": "En que periodo aparecieron los dinosaurios?",
      "opciones": {
          1: "Periodo jurasico ",
          2: "Ayer",
          3: "El mes pasado",
          4: "Hace 10 meses",
          5: "Hace 3 horas"
      },
      "respuesta": 1,
      "respuesta-exp": "Norman's Awesome Experience (1989) involves an American scientist, a fashion model, and her photographer who are accidentally transported back in time to the 1st Century A.D. in an area of present day Switzerland controlled by the Roman Empire."
  },
  8: {
      "icon": "graduation-cap",
      "Pregunta": "Se considera como el fundador de la Iatroquimíca:",
      "opciones": {
          1: "Aristóteles",
          2: "Hipócrates",
          3: "Paracelso",
          4: "Erasistrato",
          5: "Avicena"
      },
      "respuesta": 3,
      "respuesta-exp": "Se considera a Paracelso como el fundado de la Iatroquimica"
  },
  9: {
      "icon": "graduation-cap",
      "Pregunta": "Estudia las diferentes funciones vitales de los seres orgánicos:",
      "opciones": {
          1: "Anatomía",
          2: "Terapéutica",
          3: "Biofísica",
          4: "Fisiología",
          5: "Etología"
      },
      "respuesta": 4,
      "respuesta-exp": "La fisiología estudia las diferentes funciones vitales de los seres organicos"
  },
  10: {
      "icon": "graduation-cap",
      "Pregunta": "Un acontecimiento exclusivo de la meiosis es:",
      "opciones": {
          1: "La duplicación del ADN al inicio de la división",
          2: "la observación de cromosomas duplicados",
          3: "el intercambio de información genética",
          4: "la separación de cromátides",
      },
      "respuesta": 3,
      "respuesta-exp": "Un acontecimiento exclusivo de la meiosis es el intercambio de información genética"
    },
  11: {
      "icon": "graduation-cap",
      "Pregunta": "Proceso por el cual a partir de una célula madre se originan nuevas células",
      "opciones": {
          1: "Bipartición",
          2: "Reproducción celular",
          3: "Reproducción vegetativa",
          4: "Fragmentación",
          5: "Partenogénesis"
      },
      "respuesta": 2,
      "respuesta-exp": "El proceso por el cual a partir de una celula se orginian nuevas se llama reproduccion celular"
  },
  12: {
      "icon": "graduation-cap",
      "Pregunta": "Fase mitótica que permite estudiar a los cromosomas humanos",
      "opciones": {
          1: "Interfase",
          2: "Profase",
          3: "Metafase",
          4: "Prometafase",
          5: "Telofase"
      },
      "respuesta": 3,
      "respuesta-exp": "La fase mitonica que permite estudiar los cromosomas humanos se llama Metafase"
  },
  13: {
      "icon": "graduation-cap",
      "Pregunta": "Es la biomolécula que contiene la información genética de cada ser vivo.",
      "opciones": {
          1: "Proteinas ",
          2: "Carbohidratos",
          3: "ADN",
          4: "Lipidos",
          5: "Grasas"
      },
      "respuesta": 3,
      "respuesta-exp": "La biomolecula que contiene la informacion genética de cada ser vivo es el ADN"
  },
  14: {
      "icon": "graduation-cap",
      "Pregunta": "Es una secuencia ordenada de nucleótidos  en la molécula de ADN  y que contiene la información necesaria para la síntesis de proteínas.",
      "opciones": {
          1: "Codigo Genetico",
          2: "Gen",
          3: "Fenotipo",
          4: "Cariotipo",
          5: "Alelo dominante"
      },
      "respuesta": 1,
      "respuesta-exp": " El codigo Genetico es una secuencia ordenada de nucleótidos  en la molécula de ADN  y que contiene la información necesaria para la síntesis de proteínas"
  },
  15: {
      "icon": "graduation-cap",
      "Pregunta": "Cómo se le llama a la unidad básica de la herencia?",
      "opciones": {
          1: "Gen",
          2: "Fenotipo",
          3: "ARN",
          4: "Genotipo",
          5: "Caracter"
      },
      "respuesta": 1,
      "respuesta-exp": "La unidad basica de la herencia es el Gen"
  },
  16: {
      "icon": "graduation-cap",
      "Pregunta": "Los genes estás conformador por:",
      "opciones": {
          1: "Proteinas",
          2: "Lipidos",
          3: "Ácidos nucleicos",
          4: "Carbohidratos",
          5: "Aminoácidos"
      },
      "respuesta": 3,
      "respuesta-exp": "Los genes de conforman de Ácidos nucleicos"
  },
  17: {
      "icon": "graduation-cap",
      "Pregunta": "¿Cómo se le llama a la unidad básica de la herencia?",
      "opciones": {
          1: "Eucariotas",
          2: "Gen",
          3: "Animales",
          4: "Procariotas",
          5: "Ningina"
      },
      "respuesta": 2,
      "respuesta-exp": "La unidad básica de la herencia es el GEN"
  },
  18: {
      "icon": "graduation-cap",
      "Pregunta": "Cual es la primera fase del proceso Mitosis",
      "opciones": {
          1: "Profase",
          2: "Metafase",
          3: "Prometafase",
          4: "Telofase",
          5: "Ninguna de la anteriores"
      },
      "respuesta": 1,
      "respuesta-exp": "La primera fase del proceso mitosis es la Profase"
  },
  19: {
      "icon": "graduation-cap",
      "Pregunta": "realizan la sintesis de las proteinas",
      "opciones": {
          1: "Ribosomas",
          2: "Litiosomas",
          3: "Mitocondrias",
          4: "retuculo endoplasmatico",
          5: "Ninguna de las anteriores"
      },
      "respuesta": 1,
      "respuesta-exp": "Los ribosomas realizan la sinteensis de las proteinas"

    },
    20: {
      "icon": "graduation-cap",
      "Pregunta": "Que pasa en la profase?",
      "opciones": {
          1: "Los cromosomas se alinean en el plano ecuatorial",
          2: "Alcanza el maximo nivel de compactación de compacatcion del ADN",
          3: "Aparece la membrana nueclear",
          4: "Se definen los polos celulares",
      },
      "respuesta": 5,
      "respuesta-exp": ""
    }
};

/*



*/
