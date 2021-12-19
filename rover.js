$(document).ready(function () {
  $.ajax({
    url: "https://localhost:7233/GetRoverPosition",
    context: document.body
  }).done(function (response) {
    $('#message').html(response);
  });

  $("#btnSubmit").click(function () {
    RefreshPlanet();
  });

  function RefreshPlanet() {
    $.ajax({
      url: "https://localhost:7233/GetPlanet",
      context: document.body
    }).done(function (response) {

      var grid = '<table><tr">';
      var oldRow = 0;
      var oldColums = 0;
      var numRow = 10;
      var numCol = 10;

      for (var i = 0; i < response.length; i++) {

        var currentRow = response[i].row;
        var currentCol = response[i].col;
        var currentValue = response[i].value;
        var currentOrientation = response[i].roverPosition;
        if (currentOrientation === "undefined" || currentOrientation == null)
          currentOrientation = "";

        if (currentRow == oldRow) {
          grid += "<td class=\"cell\">" + currentRow + ":" + currentCol + "<br/><span>" + currentValue + "</span><br/><span>" + currentOrientation + "</span></td>";
        }
        else {
          oldRow = currentRow;
          grid += "</tr>";
          grid += "<tr>";
          grid += "<td class=\"cell\">" + currentRow + ":" + currentCol + "<br/><span>" + currentValue + "</span><br/><span>" + currentOrientation + "</span></td>";
        }

      }
      grid += "</table>";
      console.log(grid);

      $('#grid').html(grid);
    });
  }

  RefreshPlanet();

});