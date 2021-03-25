let i = 0;

function addQuote(i) {
    //Create a blank quote with its own buttons
    const blankTemplate = '<div id="duplicate' + i + '">' + '<textarea type="text" id="quote' + i + '" name="quote" class="quote"readonly></textarea><br>' + '<br><br><br>' + '</div>';

    // Append the new blank quote and buttons to the existing div
    const anotherQuote = document.createElement('div');
    anotherQuote.innerHTML = blankTemplate;
    divContainer.appendChild(anotherQuote);
}

// Retrieves all entries from the DB and will add a blank quote to the page if there are none saved in the DB.
// If there are quotes in the DB it will populate the page with them to be edited/deleted.
function loadAll(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://www.thomasbotelho.com/COMP351/individualProject/appread", true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            quoteList = JSON.parse(this.responseText);
            if(quoteList.length == 0){
                alert("There are no quotes to display");
            }
            else{
                for(j = 0; j < quoteList.length; j++){
                    addQuote(quoteList[j].quoteID);
                    document.getElementById("quote" + quoteList[j].quoteID).value = quoteList[j].quoteText;
                }
            }
        }
    }
    let removeButtons = document.getElementById("buttons");
    removeButtons.remove();
}

function loadRecent(){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://www.thomasbotelho.com/COMP351/individualProject/appread", true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            quoteList = JSON.parse(this.responseText);
            if(quoteList.length == 0){
                alert("There are no quotes to display");
            }
            else{
                j = quoteList.length-1;      
                addQuote(quoteList[j].quoteID);
                document.getElementById("quote" + quoteList[j].quoteID).value = quoteList[j].quoteText;
            }
        }
    }
    let removeButtons = document.getElementById("buttons");
    removeButtons.remove();
}