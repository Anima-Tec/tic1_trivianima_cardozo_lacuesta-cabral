$(document).ready(function() {
    cycleTestimonials(1,0);
    $('#iniciar-btn').click(function() {
        remplazarHeading();
        $('#iniciar').fadeOut(500, function() {
            nuevoJuego();
            selecionarPreguntas();
            cargarPreguntas();
            $('#quiz').fadeIn(500);
        });
        $('#testimonials').fadeOut(500);
        $('.disclaim').fadeOut(500);
    });
    $('#respuesta-btn').click(function() {
        var respuestaUsuario = $('input:radio[name=ans]:checked').val();
        if (!respuestaUsuario) {
            alert('Seleccione una opción!');
        } else {
            if (correcto(respuestaUsuario)) {
                $('#quiz').fadeOut(500, function() {
                    puntos++;
                    updatePuntos();
                    $('.respuesta-exp').text(quiz_Preguntas[num]["respuesta-exp"]);
                    $('#correcto').fadeIn(500);
                });
            } else {
                $('#quiz').fadeOut(500, function() {
                    $('.respuesta-exp').text(quiz_Preguntas[num]["respuesta-exp"]);
                    $('#incorrecto').fadeIn(500);
                });
            }
        }
    });
    $('.cont-btn').click(function() {
        $('#correcto').fadeOut(500, function() {
            $('#incorrecto').fadeOut(500, function() {
                if (count >= count_limit) {
                    updatePuntos();
                    updateRank();
                    $('#final').fadeIn(500);
                } else {
                    selecionarPreguntas();
                    cargarPreguntas();
                    $('form input').prop('checked', false);
                    $('#quiz').fadeIn(500);
                }
            });
        });
    });
    $('#iniciar-over').click(function() {
        $('#final').fadeOut(500, function() {
            nuevoJuego();
            selecionarPreguntas();
            cargarPreguntas();
            $('form input').prop('checked', false);
            $('#quiz').fadeIn(500);
        });
    });
});

var num = 0;
var count = 0;
var count_limit = 8;
var puntos = 0;
var prior_Preguntas = [];

var remplazarHeading = function() {
    var head = $("<span>BIOLOGÍA</span>");
    $('h1').find("span").remove();
    $('h1').append(head);
};
var cycleTestimonials = function(index,prev) {
    $('#testimonials').children('p:eq(' + prev + ')').delay(1800).fadeOut(800, function(){
        $('#testimonials').children('p:eq(' + index + ')').fadeIn(800, function(){
            prev = index;
            if (index === 3){
                index = 0;
            } else {
                index++;
            }
            cycleTestimonials(index,prev);
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
    var limit = Object.keys(quiz_Preguntas).length;
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
    $('#icon').html("<i class=\"fa fa-"+quiz_Preguntas[num]["icon"]+"\"></i>");
    $('#text').html(quiz_Preguntas[num]["Pregunta"]);
    $('#opcion-1').html(quiz_Preguntas[num]["opciones"][1]);
    $('#opcion-2').html(quiz_Preguntas[num]["opciones"][2]);
    $('#opcion-3').html(quiz_Preguntas[num]["opciones"][3]);
    $('#opcion-4').html(quiz_Preguntas[num]["opciones"][4]);
    $('#opcion-5').html(quiz_Preguntas[num]["opciones"][5]);
    updatePuntos();
    count++;
    $('.progress').text(count+"/"+count_limit);
};
var correcto = function(respuestaUsuario) {
    if (respuestaUsuario == quiz_Preguntas[num]["respuesta"]) {
        return true;
    } else {
        return false;
    }
};
var updatePuntos = function() {
    $('.puntos').text(puntos*3);

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
var quiz_Preguntas = {
    1: {
        "icon": "graduation-cap",
        "Pregunta": "Que son las enzimas?",
  "opciones": {
      1: "Un atomo",
      2: "Una celula",
      3: "Un catalizador biologico",
      4: "Una biomolecula",
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
      "Pregunta": "como se llama la glandua mas grande del cuerpo humano?",
      "opciones": {
          1: "Tiroides",
          2: "Corazón",
          3: "Pulmones",
          4: "Higado",
          5: "Cerebro"
      },
      "respuesta": 4,
      "respuesta-exp": "La glandua mas grande del ser humano es el higado"
    },
    5: {
      "icon": "graduation-cap",
              "Pregunta": "En la meiosis cuantas celulas genera la celula madre?",
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
          2: "Jim &amp; Billy's Great Journey",
          3: "Bob's Outstanding Journey in Time",
          4: "Nathan's Big Adventure, Ya Hosers!",
          5: "The Newf's Exceptional Escapade"
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
      "Pregunta": "9x1",
      "opciones": {
          1: "10 ",
          2: "09",
          3: "88",
          4: "7",
          5: "9"
      },
      "respuesta": 5,
      "respuesta-exp": "Porque si"
  },
  14: {
      "icon": "graduation-cap",
      "Pregunta": "1+1",
      "opciones": {
          1: "3",
          2: "6",
          3: "90",
          4: "2",
          5: "09"
      },
      "respuesta": 4,
      "respuesta-exp": "Porque si"
  },
  15: {
      "icon": "graduation-cap",
      "Pregunta": "7x1",
      "opciones": {
          1: "7",
          2: "12",
          3: "90",
          4: "16",
          5: ")"
      },
      "respuesta": 1,
      "respuesta-exp": "Porque si"
  },
  16: {
      "icon": "graduation-cap",
      "Pregunta": "10x10",
      "opciones": {
          1: "400",
          2: "300",
          3: "100",
          4: "90",
          5: "76"
      },
      "respuesta": 3,
      "respuesta-exp": "Porque si"
  },
  17: {
      "icon": "graduation-cap",
      "Pregunta": "9x9",
      "opciones": {
          1: "72",
          2: "81",
          3: "32",
          4: "67",
          5: "54"
      },
      "respuesta": 2,
      "respuesta-exp": "Porque si"
  },
  18: {
      "icon": "graduation-cap",
      "Pregunta": "3x3",
      "opciones": {
          1: "12",
          2: "10",
          3: "9",
          4: "76",
          5: "65"
      },
      "respuesta": 3,
      "respuesta-exp": "Porque si"
  },
  19: {
      "icon": "graduation-cap",
      "Pregunta": "4x2",
      "opciones": {
          1: "23",
          2: "87",
          3: "54",
          4: "6",
          5: "8"
      },
      "respuesta": 5,
      "respuesta-exp": "Porque si"

    },
    20: {
      "icon": "graduation-cap",
      "Pregunta": "2x3",
      "opciones": {
          1: "3",
          2: "2",
          3: "9",
          4: "10",
          5: "6"
      },
      "respuesta": 5,
      "respuesta-exp": "Porque si"
    }
};

/*



*/
