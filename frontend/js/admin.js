
let counter = 0;

// Adds buttons on page load.
function buttonsOnload(){
    const buttonTemplate = '<button type="button" class="button" id="addQuote" onclick="addBlankQuote()">Add new quote</button>' + 
    '<button type="button" class="button" id="saveAll" onclick="saveAll()">Save All</button><br><br><br>' + '</div>';

    const loadButtons = document.createElement('div');
    loadButtons.innerHTML = buttonTemplate;
    defaultButtons.appendChild(loadButtons);
}

function addBlankQuote(){
    let i = counter+1;

    // Without save and delete buttons per quote
    const blankTemplate = '<div id="duplicate' + i + '">' + '<textarea type="text" id="quote' + i + '" name="quote" class="quote"></textarea>&nbsp' + 
    '<button type="button" class="deleteQuote" id="deleteQuote' + i + '" onclick="deleteQuote(' + i + ')">Delete</button>' + '<br><br><br>' + '</div>';

    counter = i;

    // Append the new blank quote and buttons to the existing div
    const anotherQuote = document.createElement('div');
    anotherQuote.innerHTML = blankTemplate;
    divContainer.appendChild(anotherQuote);
}

function addQuote(i) {
    // Without save and delete buttons per quote
    const blankTemplate = '<div id="duplicate' + i + '">' + '<textarea type="text" id="quote' + i + '" name="quote" class="quote"></textarea>&nbsp' + 
    '<button type="button" class="deleteQuote" id="deleteQuote' + i + '" onclick="deleteQuote(' + i + ')">Delete</button>' + '<br><br><br>' + '</div>';

    counter = i;

    // Append the new blank quote and buttons to the existing div
    const anotherQuote = document.createElement('div');
    anotherQuote.innerHTML = blankTemplate;
    divContainer.appendChild(anotherQuote);
}

function newQuoteObj(quoteID, quoteText){
    this.quoteID = quoteID;
    this.quoteText = quoteText;
}

function saveAll(){
    let quoteArray = [];
    let i = counter;
    // store the quotes into an array to be sent to DB
    try{
        for (let j = 1; j<=i; j++){
            let testText = document.getElementById("quote" + j).value;
            if(testText.trim().length == 0){
                throw  "You cannot save an empty quote";
            }
            else{
                let newQuote = new newQuoteObj(j, document.getElementById("quote" + j).value);
                quoteArray.push(newQuote);
            }
        }

        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://www.thomasbotelho.com/COMP351/individualProject/appwrite", true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(JSON.stringify(quoteArray));
    }
    catch(err){
        alert(err);
    }
}

// First runs saveAll without sending to the DB
// Then it rearranges the items removing the item matching the id of the delete button
// Then sends the remaining object to the DB
// Finally it removes the item from the page
function deleteQuote(i){
    let quoteArray = [];
    let counter2 = counter;

    // store the quotes into an array to be sent to DB
    for (let j = 1; j<=counter2; j++){
        let newQuote = new newQuoteObj(j, document.getElementById("quote" + j).value);
        quoteArray.push(newQuote);
    }
    
    for(let k = i-1; k < quoteArray.length-1; k++){
        quoteArray[k].quoteText = quoteArray[k+1].quoteText;
    }
    quoteArray.pop();

    for(let n = i+1; n <= quoteArray.length+1; n++){
        let merger = n-1;
        let newDup = "duplicate" + merger;
        document.getElementById("duplicate" + n).id = newDup;
        let newQuo = "quote" + merger;
        document.getElementById("quote" + n).id = newQuo;
    }
    
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://www.thomasbotelho.com/COMP351/individualProject/appwrite", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify(quoteArray));

    let deleteQuote = document.getElementById("duplicate" + i);
    deleteQuote.remove();
    counter = counter-1;
}

// Adds all entries from the DB to the page to be edited.
function load(){
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
}
