$(document).ready(function() {

//Array for searched feelings to be added
var topics = [];

  //Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
  //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
  function displayFeelings() {

  var x = $(this).data("search");
  console.log(x);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";

  console.log(queryURL);

  $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          var results = response.data;
          console.log(results);
          for (var i = 0; i < results.length; i++) {
          
          var feelingDiv = $("<div class='col-md-4'>");

          var rating = results[i].rating;
          var defaultAnimatedSrc = results[i].images.fixed_height.url;
          var staticSrc = results[i].images.fixed_height_still.url;
          var feelingImage = $("<img>");
          var p = $("<p>").text("Rating: " + rating);

          feelingImage.attr("src", staticSrc);
          feelingImage.addClass("feelingsGiphy");
          feelingImage.attr("data-state", "still");
          feelingImage.attr("data-still", staticSrc);
          feelingImage.attr("data-animate", defaultAnimatedSrc);
          feelingDiv.append(p);
          feelingDiv.append(feelingImage);
          $("#gifArea").prepend(feelingDiv);

        }
  });
}

  //Submit button and adds button with new term
  $("#addFeeling").on("click", function(event) {
        event.preventDefault();
        var newFeeling = $("#feelingsInput").val().trim();
        topics.push(newFeeling);
        console.log(topics);
        $("#feelingsInput").val('');
        displayButtons();
      });

  //Function iterates through topics array to display button with array values in "myButtons" section of HTML
  function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-default">');
      a.attr("id", "feeling");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $("#myButtons").append(a);
    }
  }


  displayButtons();

  //Click event on button with id of "feelings" executes displayFeelings function
  $(document).on("click", "#feeling", displayFeelings);

  //Click event on gifs with class of "feelingsGiphy" executes pausePlayGifs function
  $(document).on("click", ".feelingsGiphy", pausePlayGifs);

  //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
  function pausePlayGifs() {
     var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

});