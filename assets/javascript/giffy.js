//GifTastic Gifs Search

//Add button for button topic
function addButton() {

    $("#btnAdd").on('click', function() {

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
        //Get Gifs Function
        getGifs();
    })
    
}  //End addButton Function


function getGifs() {
    //Clears current gifs and then retrieves 10 static gifs for whatever
    //button was clicked
    
    $(".buttons").on("click", function () {

        //Get button ID for clicked button
        var btnId = $(this).attr('id');

        //ApiKey
        var apiKey = 'HfEhbmgMfKBB9Lc98mmWHQfm8dC6pSMx';

        //URL query string
        var urlQuery = 'https://api.giphy.com/v1/gifs/search?q=' +
        btnId + '&api_key=' + apiKey;


        //AJAX call to get giphy images
         $.ajax({
            url: urlQuery,
            method: "GET"
         }).then(function(response) {
             
                 //Clear current gif images
                 $(".images").empty();

                 //Response processing
                 var results = response.data;
             
                 //Loop to get 10 images only
                 for (var i = 0; i < 10; i++) {
                     
                    var gifDiv = $('<div>');
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);                
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr('data-state','still');
                    gifImage.attr("class","gifs");
                    gifDiv.append(p);
                    gifDiv.append(gifImage);
                    $(".images").prepend(gifDiv);
                 }
             
             animateGifs();
            })
        
//        animateGifs();  
        
    })
    
} //End getGifs Function


function animateGifs() {
    //Checks the current animation state of the clicked gif image
    //If current data-state is 'still', then update image url to animated url\
    
    $(".gifs").on("click", function () {
        
        console.log("animate funct")
           
        var state = $(this).attr("data-state");

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));     
            $(this).attr("data-state", "animate");
        }

        if (state === "animate") {

            $(this).attr("src", $(this).attr("data-still"));     
            $(this).attr("data-state", "still");
        }   

    })
    

}  //End animateGifs Function

        
$(document).ready(function () {   
    addButton();
})


    



    

