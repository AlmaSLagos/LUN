$(document).ready(() => {
    $("#btnRegistro").click(agregarSocio);
    $("#btnAcceder").click(acceder);
    $("#btnRegistroIr").click(irRegistrar);
    $("#btnCerrarSesion").click(cerrarSesion);
    $("#btnHabilitarOinhabilitar").click(deshabilitarInicio);
    $("#btnCambiarPass").click(cambiarPassInicio);
    $("#btnReportesAdmin").click(reporteInicioA);
    $("#btnReportesSocio").click(reporteInicioS);
    $("#btnCompetencias").click(competenciaInicio);
    $("#btnEquipos").click(equiposInicio);
    $("#btnCancelarRegistro").click(cancelaRegistro);
    $("#atrasEquipo").click(volverAlMenu);
    $("#atrasCompetencia").click(volverAlMenu)
    $("#atrasReporteA").click(volverAlMenu);
    $("#atrasReporteS").click(volverAlMenu);
    $("#atrasCambiaPass").click(volverAlMenu);
    $("#atrasDeshabilita").click(volverAlMenu);
    $("#btnHabilitarDeshabilitar").click(cambiarEstado);
    $("#cambiarPass").click(cambiarPass);
    $("#irCrearEquipo").click(irCrearEquipo);
    $("#atrasCrearEquipo").click(atrasCrearEquipo);
    $("#btnCrearEquipo").click(crearEquipo);
    $("#btnIrCrearCompetencia").click(irCrearCompetencia);
    $("#btnCrearCompetencia").click(crearCompetencia);
    $("#btnAtrasCrearCompetencia").click(atrasCrearCompetencia)
    $("#btnIrIniciarCompetencia").click(irIniciaCompetencia);
    $("#atrasInicioCompetencia").click(atrasInicioCompetencia);
    $("#btnGuardarDatosCompetencia").click(datosCompetencia);
    preCargaDeDatos()
});
var administradores = new Array();
var socios = new Array();
var equipos = new Array();
var arrayCompetencias = new Array();
//OCULTAR PAG PRINCIPAL Y MOSTRAR PAG DE LAS DIFERENTES FUNCIONALIDADES 
//AL HACER CLICK EN BOTONES DEL INICIO

//CAMBIO DE PAGINAS
function equiposInicio() {
    $("title").html("EQUIPOS")
    $('#pagPrincipal').hide();
    $('#equipos').show();
    $("#divMostrar").html('');
    listarEquipos()
}
function competenciaInicio() {
    $("title").html("COMPETENCIAS")
    $('#pagPrincipal').hide();
    $('#competencias').show();
    $("#divMostrar").html('');
    listarCompetencias()
}
function reporteInicioA() {
    $("title").html("REPORTE")
    $('#pagPrincipal').hide();
    $('#reportesA').show();
    $("#divMostrar").html('');
}
function reporteInicioS() {
    $("title").html("REPORTE")
    $('#pagPrincipal').hide();
    $('#reportesS').show();
    $("#divMostrar").html('');
}
function cambiarPassInicio() {
    $("title").html("CAMBIAR CONTRASEÑA")
    $('#pagPrincipal').hide();
    $('#cambioPassword').show();
    $("#divMostrar").html('');
}
function deshabilitarInicio() {
    $("title").html("HABILITAR O DESHABILITAR")
    $('#pagPrincipal').hide();
    $('#deshabilitar').show();
    $("#divMostrar").html('');
    cargarSociosTabla()
}
function irRegistrar() {
    $('#divAccedoOregistro').hide();
    $('#divRegistro').show();
    $("#divMostrar").html('');
}
function cancelaRegistro() {
    $('#divAccedoOregistro').show();
    $('#divRegistro').hide();
    $("#divMostrar").html('');
}
function volverAlMenu() {
    $('#pagPrincipal').show();
    $('#equipos').hide();
    $('#deshabilitar').hide();
    $('#reportesA').hide();
    $('#reportesS').hide();
    $('#competencias').hide();
    $('#cambioPassword').hide();
    $('#divRegistro').hide();
    $('#divAccedoOregistro').hide();
    $("title").html("MENÚ PRINCIPAL");
    $("#divMostrar").html('');
}
function cerrarSesion() {
    $('#pagPrincipal').hide();
    $('#divAccedoOregistro').show();
    $('#btnReportesAdmin').hide();
    $('#btnReportesSocio').hide();
    $('#competenciasAdmin').hide();
    $('#competenciasSocio').hide();
    $('#btnCambiarPass').hide();
    $('#btnEquipos').hide();
    $('#btnHabilitarOinhabilitar').hide();
    $("#divMostrar").html('');
    sesionActual = null;
}
function irCrearEquipo() {
    $('#crearEquipo').show();
    $('#equipos').hide();
    $("#divMostrar").html('');
}
function atrasCrearEquipo() {
    $('#crearEquipo').hide();
    $('#equipos').show();
    $("#divMostrar").html('');
    listarEquipos();
}
function irCrearCompetencia() {
    $('#idCrearCompetencia').show();
    $('#competencias').hide();
    $("#divMostrar").html('');
}
function atrasCrearCompetencia() {
    $('#idCrearCompetencia').hide();
    $('#competencias').show();
    $("#divMostrar").html('');
}
function irIniciaCompetencia() {
    $('#idInicioCompetencia').show();
    $('#competencias').hide();
    $("#divMostrar").html('');
}
function atrasInicioCompetencia() {
    $('#idInicioCompetencia').hide();
    $('#competencias').show();
    $("#divMostrar").html('');
}
//FUNCIONALIDAD DE LA PAGINA


function preCargaDeDatos() {
    //Los administradores ya estan guardados:
    var adminUno = { "Nombre": "Antonio", "Password": "a1234", "Mail": "tony@gmail.com" };
    var adminDos = { "Nombre": "Maria", "Password": "b1234", "Mail": "mary@gmail.com" };
    var adminTres = { "Nombre": "Juan", "Password": "c1234", "Mail": "juan@hotmail.com" };
    administradores.push(adminUno);
    administradores.push(adminDos);
    administradores.push(adminTres);
}

//Lo que ingresa la persona para gegistrarse:
function agregarSocio() {
    var nombre = $("#name").val();
    var password = $("#pass").val();
    var mail = $("#mail").val();
    var estado = "Habilitado";
    guardarAux(nombre, password, mail, estado);

}

//Traigo para aca los returns de las funciones que verifican:
function guardarAux(pNombre, pPassword, pMail, pEstado) {
    var pEquipo = " "; //si no esta en ningun equipo el valor es espacio " "
    var mensaje1 = "";
    var mensaje2 = "";
    var mensaje3 = "";
    var repetidoMail = existeMailUsuario(pMail);
    var nombreMal = validarNombre(pNombre);
    var passValido = passCorrecto(pPassword);
    //antes de guardar cambia la inicial del nombre a mayuscula.
    pNombre = pNombre.replace(pNombre[0], pNombre[0].toUpperCase())
    if (!repetidoMail && !nombreMal && passValido) {
        //cuando guarde borro las barras te texto.
        //se valida todo 
        $("#mail").val("");
        $("#name").val("");
        $("#pass").val("");
        $('#divAccedoOregistro').show();
        $('#divRegistro').hide();
        guardar(pNombre, pPassword, pMail, pEstado, pEquipo);
    } if (repetidoMail) {
        mensaje2 = "Esta direccion de correo electronico ya esta en uso.";
    } if (nombreMal) {
        mensaje1 = "El nombre debe tener minimo dos letras y no debe incluir numeros y signos";
    } if (!passValido) {
        mensaje3 = "Su password debe tener almenos un numero y una letra.";
    }
    //muestro los errores.
    $("#divMostrarA").html(mensaje1);
    $("#divMostrarB").html(mensaje2);
    $("#divMostrarC").html(mensaje3);
}
//Tomo los parametros de guardarAux para pushiar todos los datos de UN socio juntos:
function guardar(pNombre, pPassword, pMail, pEstado, pEquipo) {
    var unSocio = { Nombre: pNombre, Password: pPassword, Mail: pMail, Estado: pEstado, Equipo: pEquipo };
    socios.push(unSocio);
}
//FUNCIONES QUE VERIFICAN:

function existeMailUsuario(pMailUser) {
    //Si el mail no es el mismo que el de un admi, y si ya hay otros socios registrados, uso un for para ver si no es el mismo nombre que el de otro.
    var ocurrencia = false;
    if (pMailUser === "tony@gmail.com" || pMailUser === "mary@gmail.com" || pMailUser === "juan@hotmail.com") {
        ocurrencia = true;
    } else {
        for (var i = 0; i < socios.length; i++) {
            if (socios[i].Mail === pMailUser) {
                ocurrencia = true;
            }
        }
    }
    return ocurrencia;
}
//Si no tiene mas de dos letras, nombre mal es verdadero 
//si tiene dos letras esta bien y recorro para ver que solo use letras 
//si tiene algo que no sea letra nombre mal es verdad, retorna nombre mal.

function validarNombre(pNombreUser) {
    var nombreMal = false;
    if (pNombreUser.length >= 2) {
        i = 0
        while (i < pNombreUser.length) {
            var letras = pNombreUser[i].charCodeAt();
            if (letras > 64 && letras < 91 || letras > 96 && letras < 123) {
            } else {
                nombreMal = true;
            }
            i++
        }
    } else {
        nombreMal = true;
    }
    return nombreMal;
}
//Validar el password, debe tener almenos una letra y un numero.
function passCorrecto(texto) {
    var passBien = false;
    //Creo la variable y dos contadores, uno para la letra y otro para los numeros.
    var i = 0, num = 0, letra = 0;
    //recorro en password y si encuentro letras las guardo en el contador letra y si encuentro numeros los guardo en el contador numeros. 
    while (i < texto.length) {
        var textoi = texto[i].charCodeAt();
        if (textoi > 64 && textoi < 91 || textoi > 96 && textoi < 123) {
            letra++;
        } else if (textoi > 47 && textoi < 58) {
            num++
        }
        i++
    }
    //si el password tiene ambos contadores mayores a cero significa que el texto contiene por lo menos una letra y un numero :)
    if (num > 0 && letra > 0) {
        passBien = true;
    }
    return passBien;
}
//acceder a la pagina principal. 
//Distinguir si es socio o admin.
function acceder() {
    var correoAcceder = $("#mailAc").val();
    var passAcceder = $("#passAc").val();
    loginAdminoSocio(correoAcceder, passAcceder);
}

function loginAdminoSocio(elCorreo, elPassword) {
    var ok = false;
    var esAdmin = false;
    var esSocio = false;
    for (var i = 0; i < administradores.length; i++) {
        var elAdministrador = administradores[i];

        if (elAdministrador.Mail === elCorreo && elAdministrador.Password === elPassword) {
            ok = true;
            esAdmin = true;


        } else {
            $("#divMostrar").html("Mail o contraseña es incorrecta");
        }
    }
    if (!ok && !esAdmin) {
        for (var i = 0; i < socios.length; i++) {
            var elSocio = socios[i];
            if (elSocio.Mail === elCorreo && elSocio.Password === elPassword) {
                ok = true;
                esSocio = socios[i].Estado;


            } else {
                $("#divMostrar").html("Mail o contraseña es incorrecta");
            }
        }
    }
    if (ok && esAdmin) {
        //mostrar menu admin
        $('#divAccedoOregistro').hide();
        $('#pagPrincipal').show();
        $('#competenciasAdmin').show();
        $('#btnHabilitarOinhabilitar').show();
        $('#btnReportesAdmin').show();
        $("title").html("MENÚ PRINCIPAL");
        $("#divMostrar").html('');
        sesionActual = elCorreo;
    } else if (ok && esSocio == 'Habilitado') {
        //mostrar menu socio
        $('#divAccedoOregistro').hide();
        $('#pagPrincipal').show();
        $('#competenciasSocio').show();
        $('#btnEquipos').show();
        $('#btnCambiarPass').show();
        $('#btnReportesSocio').show();
        $("title").html("MENÚ PRINCIPAL");
        $("#divMostrar").html('');
        sesionActual = elCorreo;
    } else {
        $("#divMostrar").html("No puedes acceder, contactate con un Administrador");
    }


}
//LISTAR SOCIOS
function cargarSociosTabla() {
    $('#tablaSocios').html('<tr><td>Nombre</td><td>Mail</td><td>Estado</td></tr>');

    for (var i = 0; i < socios.length; i++) {
        var Nombre = socios[i].Nombre;

        var Mail = socios[i].Mail;
        var Estado = socios[i].Estado;

        $('#tablaSocios').append('<tr><td>' + Nombre + '</td><td>' + Mail + '</td><td>' + Estado + '</td></tr>');

    }
}

//FUNCION PARA HABILITAR O DESHABILITAR SOCIO
function cambiarEstado() {
    var ocurrencia = false;
    var iteradorAux = 0;
    var correoACambiar = $('#correoUsuario').val();
    for (var i = 0; i < socios.length; i++) {
        if (socios[i].Mail === correoACambiar) {
            ocurrencia = true;
            iteradorAux = i;
        }
    }
    if (ocurrencia) {
        if (socios[iteradorAux].Estado === "Habilitado") {
            socios[iteradorAux].Estado = "Deshabilitado";
            dejarEquipo(socios[iteradorAux].Equipo, iteradorAux);
            socios[iteradorAux].Equipo = " ";
        } else {
            socios[iteradorAux].Estado = "Habilitado"
        }
        cargarSociosTabla()
    } else {
        $('#mostrarHabilitarDeshabilitar').html('El correo electronico es incorrecto');
    }
}

//funcion para cambiar contraseña.
function cambiarPass() {
    var mensajeCambiarPass = "";
    var elSocio = socioActual();
    var passActual = $("#passActual").val();
    var passNuevo = $("#passNuevo").val();
    var confirmarPassNuevo = $("#confirmarPassNuevo").val();
    if (socios[elSocio].Password === passActual) {
        if (passNuevo === confirmarPassNuevo) {
            if (passNuevo != passActual) {
                socios[elSocio].Password = passNuevo;
                mensajeCambiarPass = "La password se cambio correctamente."
            } else {
                mensajeCambiarPass = "La nueva password no puede ser igual a la anterior!"
            }
        } else {
            mensajeCambiarPass = "La password nueva no coincide con la confirmacion!!";
        }
    } else {
        mensajeCambiarPass = "La password actual no es correcta!!"
    }
    $("#divMostrar").html(mensajeCambiarPass);
}

//funcion listar equipos

function listarEquipos() {
    var elSocio = socioActual();
    var yaEsta = false;
    $("#tablaEquipos").html("<tr><td>Logo</td><td>Equipo</td><td>Miembro 1</td><td>Miembro 2</td><td>Miembro 3</td><td></td><td></td></tr>")
    for (var i = 0; i < equipos.length; i++) {
        var nombreEquipo = equipos[i].Nombre;
        var logoEquipo = equipos[i].Logo;
        var miembro1 = equipos[i].Miembros[0];
        var miembro2 = equipos[i].Miembros[1];
        var miembro3 = equipos[i].Miembros[2];
        var sinEquipo = comprobarSocioEquipo();
        var laFila = '<tr><td><img src="/img/' + logoEquipo + '" width="50px" height="50px"></td>';
        laFila += '<td>' + nombreEquipo + '</td><td>';
        if (socios[elSocio].Equipo == nombreEquipo) {
            yaEsta = true
        }
        if (miembro1 != undefined) {
            laFila += miembro1;
        }
        laFila += '</td><td>';
        if (miembro2 != undefined) {
            laFila += miembro2;
        }
        laFila += '</td><td>'
        if (miembro3 != undefined) {
            laFila += miembro3;
        }
        laFila += '</td><td>'
        if (sinEquipo && miembro3 == undefined && !yaEsta) {
            laFila += '<input class="botonUnirmeEquipo" type="button" value="Unirme" onclick="unirseEquipo(`' + nombreEquipo + '`)"/>';
        }
        laFila += '</td><td>'
        if (socios[elSocio].Equipo == nombreEquipo) {
            laFila += '<input class="botonDejarEquipo" type="button" value="Dejar" onclick="dejarEquipo(`' + nombreEquipo + '`)"/>';
        }
        laFila += '</td></tr>';
        $("#tablaEquipos").append(laFila);
    }
}
//funcion crear equipos 

function crearEquipo() {
    var elSocio = socioActual();
    var sinEquipo = comprobarSocioEquipo();
    var nombreEquipo = $('#nombreEquipo').val();

    pNombreEqui = nombreEquipo.toLowerCase();
    pNombreEqui = pNombreEqui.replace(pNombreEqui[0], pNombreEqui[0].toUpperCase());

    var equipoRepetido = existeNombreEquipo(pNombreEqui);
    var nombreEquipoMal = validarNombreEquipo(pNombreEqui);
    var logoEquipo = $('[name="elegirLogo"]:checked').val();
    if (sinEquipo && !equipoRepetido && !nombreEquipoMal && logoEquipo) {
        var miembrosEquipo = new Array();
        miembrosEquipo.push(sesionActual);
        var info = { Logo: logoEquipo, Nombre: pNombreEqui, Miembros: miembrosEquipo };
        equipos.push(info);
        socios[elSocio].Equipo = pNombreEqui;
        atrasCrearEquipo()
        $("#divMostrar").html('')
    } else if (!sinEquipo) {
        $("#divMostrar").html("No puede crear un equipo si ya pertenece a uno.");
    } else if (equipoRepetido) {
        $("#divMostrar").html("Ya existe un equipo con este nombre.");
    } else if (nombreEquipoMal) {
        $("#divMostrar").html("El nombre debe incluir solo letras sin espacios.");
    } else if (!logoEquipo) {
        $("#divMostrar").html("Tiene que elegir un logo.");
    }
}

//FUNCION PARA VALIDAR EL NOMBRE DE UN EQUIPO
function validarNombreEquipo(pNombreEquipo) {
    var nombreEquipoMal = false;
    if (pNombreEquipo.length >= 2) {
        i = 0
        while (i < pNombreEquipo.length) {
            var letras = pNombreEquipo[i].charCodeAt();
            if (letras > 64 && letras < 91 || letras > 96 && letras < 123) {
            } else {
                nombreEquipoMal = true;
            }
            i++
        }
    } else {
        nombreEquipoMal = true;
    }
    return nombreEquipoMal;
}

function socioActual() {
    aux = 0;
    for (var i = 0; i < socios.length; i++) {
        if (socios[i].Mail === sesionActual) {
            aux = i;
        }
    }
    return aux;
}

//No puedes crear equipos ni unirte a otros si ya estas en un equipo
function comprobarSocioEquipo() {
    var elSocio = socioActual();
    var sinEquipo = false;
    if (socios[elSocio].Equipo === ' ') {
        sinEquipo = true;
    }
    return sinEquipo;
}

//No puede haber equipos con el mismo nombre
function existeNombreEquipo(pEquipoRepetido) {
    var equipoRepetido = false;
    for (var i = 0; i < socios.length && !equipoRepetido; i++) {
        if (socios[i].Equipo === pEquipoRepetido) {
            equipoRepetido = true;
        }
    }
    return equipoRepetido;
}
//FUNCION PARA DEJAR UN EQUIPO
function dejarEquipo(nombreEquipo, user) {
    if (user) {
        elSocio = user;
    } else {
        elSocio = socioActual();
    }

    elEquipo = null;
    elMiembro = null;
    socios[elSocio].Equipo = ' ';

    for (var i = 0; i < equipos.length; i++) {
        if (equipos[i].Nombre == nombreEquipo) {
            elEquipo = i;
        }
    }
    if (elEquipo != null) {
        for (var e = 0; e < equipos[elEquipo].Miembros.length; e++) {
            if (equipos[elEquipo].Miembros[e] == socios[elSocio].Mail) {
                elMiembro = e;
            }
        }
        equipos[elEquipo].Miembros.splice(elMiembro, 1)
    }
    listarEquipos();
}
//FUNCION PARA UNIRSE A UN EQUIPO
function unirseEquipo(nombreEquipo) {
    elSocio = socioActual();
    elEquipo = 0;
    if (socios[elSocio].Equipo != ' ') {
        dejarEquipo(socios[elSocio].Equipo)
    }
    for (var i = 0; i < equipos.length; i++) {
        if (equipos[i].Nombre == nombreEquipo) {
            elEquipo = i;
        }
    }
    equipos[elEquipo].Miembros.push(socios[elSocio].Mail);
    socios[elSocio].Equipo = nombreEquipo;
    listarEquipos();
}
//SI LAS VALIDACIONES ESTAN BIEN GUARDO EN EL ARRAY

function crearCompetencia() {
    var nombre = $("#txtNuevaCompetencia").val();
    nombre = nombre.toLowerCase();
    nombre = nombre.replace(nombre[0], nombre[0].toUpperCase());
    var nombreMal = validarNombreCompetencia(nombre);
    var mensajeCrearCompetencia = "";
    //si este bien
    if (!nombreMal) {
        arrayCompetencias.push({ Nombre: nombre, Equipos: [] });
        atrasCrearCompetencia()
        $("#divMostrar").html('')
    } else {
        mensajeCrearCompetencia = "El nombre debe tener minimo dos litras y no debe tener numeros u otros caracteres. Si no es el caso, puede que otro Equipo ya este usando este nombre, pruebe con otro.";
        $("#divMostrar").html(mensajeCrearCompetencia);
    }

}
//VALIDO CREACION DE COMPETENCIA
function validarNombreCompetencia(pNombre) {
    var ocurrencia = false;
    var nombreCompetenciaMal = false;
    for (var i = 0; i < arrayCompetencias.length; i++) {
        if (arrayCompetencias[i].Nombre == nombre) {
            ocurrencia = true;
        }
    }
    if (pNombre.length >= 2 && !ocurrencia) {
        i = 0
        while (i < pNombre.length) {
            var letras = pNombre[i].charCodeAt();
            if (letras > 64 && letras < 91 || letras > 96 && letras < 123) {
            } else {
                nombreCompetenciaMal = true;
            }
            i++
        }
    } else {
        nombreCompetenciaMal = true;
    }
    return nombreCompetenciaMal;
}
//LITAR COMPETENCIAS EN UNA TABLA CON SUS EQUIPOS
function listarCompetencias() {
    var miEquipo = comprobarMiEquipo();
    var laFila = "";
    $("#tablaCompetencias").html("<tr><td>Competencia</td><td>Equipo</td><td>Miembro 1</td><td>Miembro 2</td><td>Miembro 3</td><td>Metros</td><td>Inscribirse</td></tr>")

    for (var i = 0; i < arrayCompetencias.length; i++) {


        if (arrayCompetencias[i].Equipos.length == 0) {
            laFila += "<tr><td>" + arrayCompetencias[i].Nombre + "</td>";
            laFila += "<td> </td><td> </td><td> </td><td> </td><td> </td>";
            var yaEsta = false;
            if (miEquipo != 'SE' && miEquipo != 'SM') {
                for (let y = 0; y < arrayCompetencias[i].Equipos.length; y++) {
                    if (equipos[miEquipo].Nombre == arrayCompetencias[i].Equipos[y].Nombre) {
                        yaEsta = true;
                    }
                }
            }
            if (yaEsta) {
                laFila += "<td>Inscrito</td>";
            } else {
                laFila += "<td><button onclick='inscribirseCompetencia(" + i + ")'>Inscribirme</button></td>";
            }
        } else {
            laFila += "<tr><td rowspan=" + arrayCompetencias[i].Equipos.length + ">" + arrayCompetencias[i].Nombre + "</td>";
            for (let e = 0; e < arrayCompetencias[i].Equipos.length; e++) {
                var miembro1 = arrayCompetencias[i].Equipos[e].Miembros[0];
                var miembro2 = arrayCompetencias[i].Equipos[e].Miembros[1];
                var miembro3 = arrayCompetencias[i].Equipos[e].Miembros[2];
                var metros = 0;
                var miEquipo = comprobarMiEquipo();
                if (e == 0) {
                    laFila += "<td>" + arrayCompetencias[i].Equipos[e].Nombre + "</td><td>";
                } else {
                    laFila += "<tr><td>" + arrayCompetencias[i].Equipos[e].Nombre + "</td><td>";
                }

                if (miembro1 != undefined) {
                    laFila += miembro1.Nombre;
                    metros += parseInt(miembro1.Metros);
                }
                laFila += '</td><td>';
                if (miembro2 != undefined) {
                    laFila += miembro2.Nombre;
                    metros += parseInt(miembro2.Metros);
                }
                laFila += '</td><td>'
                if (miembro3 != undefined) {
                    laFila += miembro3.Nombre;
                    metros += parseInt(miembro3.Metros);
                }
                laFila += "</td><td>";
                if (metros != undefined) {
                    laFila += metros;
                }
                laFila += "</td>";
                if (e == 0) {
                    var yaEsta = false;
                    if (miEquipo != 'SE' && miEquipo != 'SM') {
                        for (let y = 0; y < arrayCompetencias[i].Equipos.length; y++) {
                            if (equipos[miEquipo].Nombre == arrayCompetencias[i].Equipos[y].Nombre) {
                                yaEsta = true;
                            }
                        }
                    }
                    if (yaEsta) {
                        laFila += "<td rowspan=" + arrayCompetencias[i].Equipos.length + ">Inscrito</td>";
                    } else {
                        laFila += "<td rowspan=" + arrayCompetencias[i].Equipos.length + "><button onclick='inscribirseCompetencia(" + i + ")'>Inscribirme</button></td>";
                    }

                }
            }
        }
        laFila += "</tr>";
    }
    $("#tablaCompetencias").append(laFila);
}

//COMPROBAR TODO ANTES DE INSCRIBIRSE A UNA COMPETENCIA
function comprobarMiEquipo() {
    var elSocio = socioActual();
    elSocio = socios[elSocio].Mail;
    var aux = null;
    for (let i = 0; i < equipos.length; i++) {
        for (let e = 0; e < equipos[i].Miembros.length; e++) {
            if (elSocio == equipos[i].Miembros[e]) {
                aux = i;
            }
        }
    }
    if (aux != null) {
        var resultado = aux;
        if (equipos[aux].Miembros.length != 3) {
            resultado = 'SM'
        }
    } else {
        resultado = 'SE'
    }
    return resultado;
}

//FUNCION PARA INSCRIBIRSE EN UNA COMPETENCIA
function inscribirseCompetencia(laCompetencia) {
    var elEquipo = comprobarMiEquipo();
    if (elEquipo == 'SE') {
        alert('No tienes Equipo')
    } else if (elEquipo == 'SM') {
        alert('tu equipo debe tener 3 miembros');
    } else {
        var equi = { Nombre: equipos[elEquipo].Nombre, Miembros: [{ Nombre: equipos[elEquipo].Miembros[0], Metros: '0' }, { Nombre: equipos[elEquipo].Miembros[1], Metros: '0' }, { Nombre: equipos[elEquipo].Miembros[2], Metros: '0' }] }
        arrayCompetencias[laCompetencia].Equipos.push(equi)
    }
    listarCompetencias()
}
//DAR INICIO A LA COMPETENCIA
function datosCompetencia(){
    var laFila1="";
    var laFila2="";
    var competencia = $("#txtInicioCompetencia").val();
    var equipo = $("#txtEquipoParticipando").val();
    var metrosMiembro1 = $("#metrosMiembro1").val();
    var metrosMiembro2 = $("#metrosMiembro2").val();
    var metrosMiembro3 = $("#metrosMiembro3").val();
    var cantidadEquiposInscriptos=0;
    while (i < metrosMiembro1.length) {
        var numeros1 = metrosMiembro1[i].charCodeAt();
        if (numeros1 > 48 && numeros1 < 57) {
            var metrosUno = parseInt(metrosMiembro1);
        }
        i++
    }
    while (i < metrosMiembro2.length) {
        var numeros2 = metrosMiembro2[i].charCodeAt();
        if (numeros2 > 48 && numeros2 < 57) {
            var metrosDos = parseInt(metrosMiembro2);
        }
        i++
    }
    while (i < metrosMiembro3.length) {
        var numeros3 = metrosMiembro3[i].charCodeAt();
        if (numeros3 > 48 && numeros3 < 57) {
            var metrosTres = parseInt(metrosMiembro3);
        }
        i++
    }
    for(var i=0; arrayCompetencias.length>i;i++){
        if(arrayCompetencias[i].Nombre==competencia){
            for(var a=0; arrayCompetencias[i].Equipos.length>a;a++){
                cantidadEquiposInscriptos+=1;
                if(cantidadEquiposInscriptos>=2 && equipo==arrayCompetencias[i].Equipos[a]){
                    laFila1="<tr><td>" + competencia + "</td><td>" + equipo + "</td><td>" + arrayCompetencias[i].Equipos[a].Logo + "</td><td>" + metrosUno + "</td><td>" + metrosDos + "</td><td>" + metrosTres + "</td></tr>";
                }
            }
        }
    }
    $("#tablaReporteAdmin").append(laFila1);
    $("#tablaReporteSocios").append(laFila2);
}