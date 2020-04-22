$(document).ready(inicializarEventos);

function inicializarEventos() {
  
  $("#btemp").click(presionEnlace);
  $("#btpostxid").click(postPorID);//llamadas a cada boton
  $("#btCrearPost").click(crearPost);
  $("#btBorrar").click(borrarPost);
  $("#btActualizarpost").click(ActualizarPost);
}
function presionEnlace() {
    $.get("https://jsonplaceholder.typicode.com/posts",
    function( data ) {
        let arreglo = data;
        let x = $('#posts');
        for (let i=0;i<=arreglo.length;i++)
        {
          x.append("<div> usuario: "+ arreglo[i].userId + "</div> <div> id del post : "+ arreglo[i].id + " </div> <div> titulo : "+ arreglo[i].title + "</div>");
        }
      }
    );
}

function postPorID(){
    let i = $("#idpost").val();//meto en una variable el id del post, que ingrese en el formulario
    $.get( ("https://jsonplaceholder.typicode.com/posts/" + i),//hago un get de esa posicion
    function( data ) {
        let x = $('#postID');
        x.append("<div> usuario: "+ data.userId + "</div> <div> id del post : "+ data.id + " </div> <div> titulo : "+ data.title + "</div>");
        }
    );
}

function crearPost(){
  let i = JSON.stringify({title: $("#idTitulo").val(),body: $("#idCreaBody").val(), userId: $("#idUser").val()
})
  $.post('https://jsonplaceholder.typicode.com/posts', {body : i,headers: {
      "Content-type": "application/json; charset=UTF-8"
    }})
    .done(function() {
    alert( "Se ha creado el post" );
  })
  .fail(function() {
    alert( "error" );
  })
  .always(function() {
    alert( "finished" );
  });
}

function borrarPost(){
  $.ajax({
    url: ('https://jsonplaceholder.typicode.com/posts/' + $('#IdBorrarpost').val()),
    type: 'DELETE',
    success: function(result) {
      console.log(result);
      alert("se ha eliminado el post");
    }
});
}

function ActualizarPost(){
  var act = JSON.stringify({id: $('#PostAActualiz').val(),title: $("#idTitulo").val(),
  body: $("#idCreaBody").val(), userId: $("#idUser").val()});
  $.ajax({
  url: 'https://jsonplaceholder.typicode.com/posts/'+ $('#PostAActualiz').val(),
  type: 'PUT',
  data: act ,
  success: function(data) {
    alert('la actualizacion fue correcta.');
  }
});
}
