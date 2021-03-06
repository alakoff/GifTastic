//GifTastic Gifs Search

function loadInitialTopics() {

    var initialTopics = ['cat','dog','skiing','golfing'];

    //Display buttons container
    $(".btnBox").css('display', 'block');

    for (i=0;i<initialTopics.length;i++) {

        //Create new button, id=topic, text=topic, store in var btnNew
        var btnNew = $('<button>').attr('id',initialTopics[i]).attr('class','buttons').text(initialTopics[i]);

        //Appends new button to buttons box div at top of page
        $('.btnBox').append(btnNew);
    }

}  //End loadInitialTopics Function


//Add button for button topic
function addButton() {

    //Stores entered button term in variable called topic
    var topic = $('#btnTerm').val();

    //Check for empty term before adding button
    if (topic==="") {
        alert('Please enter a search term');
    } else {

        //Display buttons
        $(".btnBox").css('display', 'block');

        //Create new button, id=topic, text=topic, store in var btnNew
        var btnNew = $('<button>').attr('id',topic).attr('class','buttons').text(topic);

        //Appends new button to buttons div at top of page
        $('.btnBox').append(btnNew);

        //Clears current button term
        $('#btnTerm').val('');
    }

}  //End addButton Function


function getGifs(btnId) {
    //Clears current gifs and then retrieves 10 static gifs for whatever
    //button was clicked

    //ApiKey
    var apiKey = 'HfEhbmgMfKBB9Lc98mmWHQfm8dC6pSMx';

    //URL query string
    var urlQuery = 'https://api.giphy.com/v1/gifs/search?q=' +
    btnId + '&api_key=' + apiKey + "&rating=g"


    //AJAX call to get giphy images
     $.ajax({
        url: urlQuery,
        method: "GET"
     }).then(function(response) {

         //Clear current gif images
         $(".images").empty();
         $(".images1").empty();

         //Response processing
         var results = response.data;

         //Loop to get 10 images only
         for (var i = 0; i < 10; i++) {

            var gifDiv = $('<div>');
            var title = $("<p>").text("Title: " + results[i].title);
            var p = $("<p>").text("Rating: " + results[i].rating);
            var gifImage = $("<img>");

            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr('data-state','still');
            gifImage.attr("class","gifs");


            //Creates download link with specified attributes
            var btnLink = $("<a target='_blank' download>");
            btnLink.attr("class", "btn-download");
            btnLink.attr('id','btn-download'+i);
            btnLink.attr('href', gifImage.attr("src"));

            //Add download image to btnLink
            var img = '<img src="assets/images/download.png" height=30 width=30 />';
            btnLink.append(img);

            //Appends title, rating, download link and image to div
            gifDiv.append(title);
            gifDiv.append(p);
            gifDiv.append(gifImage);
            //gifDiv.append(btnLink);


            //First five images go in first div and second five images go in second div
            if (i<5) {
                $(".images").append(gifDiv);
            } else {
                $(".images1").append(gifDiv);
            }

         }

    })

} //End getGifs Function



function animateGifs(gifImage) {
    //Checks the current animation state of the clicked gif image
    //If current data-state is 'still', then update image url to animated url

    if (gifImage.attr("data-state") === "still") {

        gifImage.attr("src", gifImage.attr("data-animate"));
        gifImage.attr("data-state", "animate");

    } else {

        gifImage.attr("src", gifImage.attr("data-still"));
        gifImage.attr("data-state", "still");

    }

}  //End animateGifs Function


//Document ready function
$(document).ready(function () {

    //Loads initial search terms from a fixed array
    loadInitialTopics();

    //Adds a search term if a new search term is entered
    $(document).on("click","#btnAdd", function() {
        addButton();
    })

    //Get gifs for the topic of the buttion clicked
    $(document).on("click",".btnBox .buttons", function() {
        var btnId = $(this).attr('id');
        getGifs(btnId);
    })

    //Animate or stop animation of clicked gif image
    $(document).on("click",".images .gifs", function() {
        var gifImage = $(this);
        animateGifs(gifImage);
    })

    $(document).on("click",".images1 .gifs", function() {
        var gifImage = $(this);
        animateGifs(gifImage);
    })

    //Clear all search terms and gif images
    $(document).on("click","#btnClear",function() {
        $(".btnBox").empty();
        $(".images").empty();
        $(".images1").empty();
    })

})  //End Document Ready
