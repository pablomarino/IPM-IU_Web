//var data;
var menuState = 0;

function clasificacion_switch(s){
    if(s==1){
        document.getElementById("view_clasificacion").setAttribute("style","display:none");
        document.getElementById("view_resultados").setAttribute("style","display:reset");
    }else{
        document.getElementById("view_clasificacion").setAttribute("style","display:reset");
        document.getElementById("view_resultados").setAttribute("style","display:none");
    }
}

function patines_switch(s){
    if(s==0){
        document.getElementById("view_patines_resumen").style.display="block";
        document.getElementById("view_patines_resultado").style.display="none";
        document.getElementById("view_patines_plantilla").style.display="none";
    }else if(s==1){
        document.getElementById("view_patines_resumen").style.display="none";
        document.getElementById("view_patines_resultado").style.display="block";
        document.getElementById("view_patines_plantilla").style.display="none";
    }else{
        document.getElementById("view_patines_resumen").style.display="none";
        document.getElementById("view_patines_resultado").style.display="none";
        document.getElementById("view_patines_plantilla").style.display="block";
    }
}

function changeMenuState(){

    if(menuState == 0){
        //document.getElementById("bt_menu").setAttribute("style","display:none");
        document.getElementById("bt_eventos").style.display="block";
        document.getElementById("bt_clasificacion").style.display="block";
        document.getElementById("bt_patines").style.display="block";
        menuState = 1;
    }else{
        //document.getElementById("bt_menu").setAttribute("style","display:reset");
        document.getElementById("bt_eventos").style.display="none";
        document.getElementById("bt_clasificacion").style.display="none";
        document.getElementById("bt_patines").style.display="none";
        menuState = 0;
    }
}

function loadSection(file,id,callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.responseType = 'document';
    xhr.onload = function(e) {
        var content = e.target.response.querySelector('body').childNodes;
        for (var i=1;i<content.length;i++) document.getElementById(id).appendChild(content[i]);
        if(callback){callback();}
      };
    xhr.send();
}

function resizeListener(){
    if(window.outerWidth>640 &&  document.getElementById("bt_eventos").style.display=="none")changeMenuState();
}

//function updatePatinesEquipo(v){}

function updatePatinesContenido(){
    document.getElementById("nombre_equipo").innerText = document.getElementById("patines_equipo").value;
}

/*
function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    data =JSON.parse(xhr.responseText);
                    success();
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}
*/

function setup(){
    loadSection("eventos.html?rand="+Math.random(),"eventos");
    loadSection("clasificacion.html?rand="+Math.random(),"clasificacion",clasificacion_switch);
    loadSection("patines.html?rand="+Math.random(),"patines");
}


window.onLoad=setup();
/*
function mostrarEquipos(){
    //Ocultamos lo que está abierto
    document.getElementById("seleccionCalendario").style.display="none";
    document.getElementById("titleCalendario").style.display="none";
    document.getElementById("tablaCalendario").style.display="none";
    //Mostramos el equipo
    document.getElementById("titleEquipos").style.display="block";
    document.getElementById("seleccionEquipo").style.display="block";
    document.getElementById("btnEstadistica").style.display="block";
}

function mostrarCalendario(){
    //Ocultamos lo que está abierto
    document.getElementById("titleEquipos").style.display="none";
    document.getElementById("seleccionEquipo").style.display="none";
    document.getElementById("btnEstadistica").style.display="none";
    //Mostramos el calendario
    cargarCalendario();
    document.getElementById("seleccionCalendario").style.display="block";
    document.getElementById("titleCalendario").style.display="block";
    document.getElementById("tablaCalendario").style.display="block";
}

function ligaSeleccionada(){
    //*****Obtenemos el valor del desplegable de ligas*****
    var ligas = document.getElementById("liga");
    var indiceLigas = ligas.selectedIndex;
    var ligaSeleccionada = ligas.options[indiceLigas];

    // Obtener el texto de la opción seleccionada
    return ligaSeleccionada.text;
}

function equipoSeleccionado(){
    //*****Obtenemos el valor del desplegable de equipos*****
    var equipos = document.getElementById("equipo");
    var indiceEquipos = equipos.selectedIndex;
    var equipoSeleccionado = equipos.options[indiceEquipos];

    // Obtener el texto de la opción seleccionada
    return equipoSeleccionado.text;
}

function equipoCalendarioSeleccionado(){
    //*****Obtenemos el valor del desplegable de equipos*****
    var equipos = document.getElementById("equipoCalendario");
    var indiceEquipos = equipos.selectedIndex;
    var equipoSeleccionado = equipos.options[indiceEquipos];

    // Obtener el texto de la opción seleccionada
    return equipoSeleccionado.text;
}

function cargarDatosPlantilla(){

    var jugelegidos;	//Jugadores que cumplen las características de los filtros

    var table = document.getElementById("tablaPlant");
    //or use :  var table = document.all.tableid;
    for(var i = table.rows.length - 1; i > 0; i--)
    {
        table.deleteRow(i);
    }

    var textoLiga = ligaSeleccionada();
    var textoEquipo = equipoSeleccionado();


    var j = 0;
    if ("--Todos--".localeCompare(textoLiga) != -1){
        jugelegidos = data.jugadores;
    }

    else{
        for (i=0; i<data.jugadores.length; i++){
            if (textoLiga.localeCompare(data.jugadores[i].liga) == 0){
                if(textoEquipo.localeCompare(data.jugadores[i].equipo) == 0){
                    jugElegidos[j] = data.jugadores[i];
                    j++;
                }
            }
        }
    }

    for (i=0; i<jugelegidos.length; i++){
        // Insert a row in the table at the last row
        var newRow   = table.insertRow(table.rows.length);
        // Insert a cell in the row at index 0
        newRow.insertCell(0).innerHTML = jugelegidos[i].nacionalidad;
        newRow.insertCell(1).innerHTML = jugelegidos[i].nombre;
        newRow.insertCell(2).innerHTML = jugelegidos[i].goles;
        newRow.insertCell(3).innerHTML = jugelegidos[i].pjugados;
        newRow.insertCell(4).innerHTML = jugelegidos[i].asistencias;
        newRow.insertCell(5).innerHTML = jugelegidos[i].penalizaciones;
        newRow.insertCell(6).innerHTML = jugelegidos[i].tazules;
        newRow.insertCell(7).innerHTML = jugelegidos[i].trojas;
    }
    document.getElementById("tablaPlant").style.display="block";

}

function calcularEstadisticas(){
    var jugElegidos=null;

    var table = document.getElementById("tablaEst");
    //or use :  var table = document.all.tableid;
    for(var i = table.rows.length - 1; i > 0; i--)
    {
        table.deleteRow(i);
    }

    var textoLiga = ligaSeleccionada();
    var textoEquipo = equipoSeleccionado();


    var j = 0;

    if ("--Todos--".localeCompare(textoLiga) != -1){
        jugElegidos = data.jugadores;
    }

    else{
        for (i=0; i<data.jugadores.length; i++){
            if (textoLiga.localeCompare(data.jugadores[i].liga) == 0){
                if(textoEquipo.localeCompare(data.jugadores[i].equipo) == 0){
                    jugElegidos[j] = data.jugadores[i];
                    j++;
                }
            }
        }
    }

    for (i=0; i<jugElegidos.length; i++){
        table = document.getElementById('tablaEst');
        // Insert a row in the table at the last row
        var newRow   = table.insertRow(table.rows.length);
        // Insert a cell in the row at index 0
        newRow.insertCell(0).innerHTML = jugElegidos[i].nombre;
        newRow.insertCell(1).innerHTML = Number(parseInt(jugElegidos[i].goles)/parseInt(jugElegidos[i].pjugados)).toFixed(3);
        newRow.insertCell(2).innerHTML = Number(parseInt(jugElegidos[i].asistencias)/parseInt(jugElegidos[i].pjugados)).toFixed(3);
        newRow.insertCell(3).innerHTML = Number(parseInt(jugElegidos[i].penalizaciones)/parseInt(jugElegidos[i].pjugados)).toFixed(3);
        newRow.insertCell(4).innerHTML = Number(parseInt(jugElegidos[i].tazules)/parseInt(jugElegidos[i].pjugados)).toFixed(3);
        newRow.insertCell(5).innerHTML = Number(parseInt(jugElegidos[i].trojas)/parseInt(jugElegidos[i].pjugados)).toFixed(3);
    }

    document.getElementById("titleEst").style.display="block";
    document.getElementById("subTitleEst").style.display="block";
    document.getElementById("tablaEst").style.display="block";
}

function cargarCalendario(){

    var partidosElegidos=null;
    var tableCal = document.getElementById("tablaCalendario");
    //or use :  var table = document.all.tableid;
    for(var i = tableCal.rows.length - 1; i > 0; i--)
    {
        tableCal.deleteRow(i);
    }

    var textoLiga = ligaSeleccionada();
    var textoEquipoPartido = equipoCalendarioSeleccionado();

    var j = 0;
    if ("--Todos--".localeCompare(textoLiga) != -1){
        partidosElegidos = data.partidos;
    }

    else{
        for (i=0; i<data.partidos.length; i++){
            if (textoLiga.localeCompare(data.partidos[i].liga) == 0){
                if(textoEquipoPartido.localeCompare(data.partidos[i].elocal) == 0){
                    partidosElegidos[j] = partidos[i];
                    j++;
                }
                else if(textoEquipoPartido.localeCompare(data.partidos[i].evisitante) == 0){
                    partidosElegidos[j] = partidos[i];
                    j++;
                }
            }
        }
    }

    for (i=0; i<partidosElegidos.length; i++){
        // Insert a row in the table at the last row
        var newRow   = tableCal.insertRow(tableCal.rows.length);
        // Insert a cell in the row at index 0
        newRow.insertCell(0).innerHTML = partidosElegidos[i].fecha;
        newRow.insertCell(1).innerHTML = partidosElegidos[i].hora;
        newRow.insertCell(2).innerHTML = partidosElegidos[i].elocal;
        newRow.insertCell(3).innerHTML = partidosElegidos[i].evisitante;
        newRow.insertCell(4).innerHTML = partidosElegidos[i].resultado;
        newRow.insertCell(5).innerHTML = partidosElegidos[i].arbitro;
    }

}

*/