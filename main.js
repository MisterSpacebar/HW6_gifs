var animalArray = [];

$("#add-search").on("click",function(event){
    event.preventDefault();

    var newAnimal = $("#search-input").val();
    animalArray.push(newAnimal);
    // --- make buttons and add to view
    var newbutton = $("<button>");
    newbutton.addClass("btn animal-buttons");
    newbutton.attr("id",newAnimal);
    newbutton.text(newAnimal);
    newbutton.css("margin-right","5px");
    newbutton.css("background-color","lightskyblue");
    newbutton.css("color","black");
    $("#buttons-view").prepend(newbutton);
    // --- clear search field
    $("#search-input").val("");
});

$(document).on("click",".animal-buttons",displayAnimalGifs);

var animals;
var queryURL;

function displayAnimalGifs(){
    $("#gif-window").empty();
    $("button").css("color","black");
    $("button").css("background-color","lightskyblue");
    $(this).css("background-color","blue");
    $(this).css("color","white");

    animals = $(this).attr("id");
    queryURL = "http://api.giphy.com/v1/gifs/search?q="+animals+"&api_key=YXIrmneXIrga1DDVW61VFBCCkukPVuzC";

    displayGifs(queryURL);
}

function RNG(upperBound){
    var temp = Math.floor(Math.random()*upperBound);
    return temp;
}

function randomSelector(array){
    var tempArray = [];
    var arraySize = 5;

    for(var j=0;j<arraySize;j++){
        var random = RNG(array.length);
        tempArray.push(usefulArray[random]);
        usefulArray = removeFromArray(usefulArray,random);
    }

    return tempArray;
}

function removeFromArray(array,position){
    var tempArray = [];
    array[position] = null;

    for(var k=0;k<array.length;k++){
        if(array!==null){
            tempArray.push(array[k]);
        }
    }
    return tempArray;
}

var usefulArray = [];

function displayGifs(gifURL){
    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function(response){
        usefulArray = response.data;
        var animalGIFs = randomSelector(usefulArray);
        console.log(animalGIFs);

        for(var i=0;i<animalGIFs.length;i++){
            var currentAnimal = animalGIFs[i];
            console.log(currentAnimal);
            var newGIF = $("<img>");

            newGIF.attr("src",currentAnimal.images.downsized_still.url);
            console.log(currentAnimal.images.downsized_still.url);

            newGIF.addClass("gif");
            newGIF.attr("data-still",currentAnimal.images.downsized_still.url);
            newGIF.attr("data-animate",currentAnimal.images.downsized.url);
            newGIF.attr("data-state", "still");

            $("#gif-window").append(newGIF);
        }
    });
}

$(document).on("click",".gif",animatedGIF);

function animatedGIF(){
    var state = $(this).attr("data-state");
    var stillIMG = $(this).attr("data-still");
    var animateIMG = $(this).attr("data-animate");

    if(state==="still"){
        $(this).attr("src",animateIMG);
        console.log(animateIMG);
        $(this).attr("data-state","animate");
    } else if(state==="animate"){
        $(this).attr("src",stillIMG);
        console.log(stillIMG);
        $(this).attr("data-state","still");
    }
}