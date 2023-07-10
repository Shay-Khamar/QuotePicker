  // This function loads all the quotes that I have save to my JSON file and uses them to populate my Select Element, which Is how I am listing them.
window.onload = getQuoteList();
function getQuoteList(){
  var sel = document.getElementById("quotes")
  let request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    let response = ""
    if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
       response = JSON.parse(this.responseText).quoteObject;
      for (let i = 0; i < response.length; i++) {
        sel.innerHTML = sel.innerHTML + '<option value="' + response[i].Author + '">' + response [i].theQuote + '</option>';
      }
      //process the response
    }else if(this.readyState == 4 && !this.status === 200){
      //show error
      response = "ERROR " + this.statusText;
      alert("not working")
    }
  }

  request.open("GET","/api/getQuote",true)
  request.send()
}

// This quote gives function to the plus button on my page, it allows me to change the display value of the object so that it is only display when the button is pressed.

  document.getElementById("addB").addEventListener("click",function(){
  document.querySelector(".pwindow").style.display = "flex";
  })

    document.querySelector(".exitButton").addEventListener("click",function(){
      document.querySelector(".pwindow").style.display = "none";
    })

  // This Function is going to be used to add Qutoes to my "SELECT" element through user input

//This should retrive the quotes that are stored in the "JSON",and put them into to my drop down

//Adding Quotes to my drop donw
function addQuote(){
    // Feteching my elements via the Id's I assigned to them and putting them into variables
    var select = document.getElementById("quotes");
    let userInput = document.getElementById("qBox").value;
    let theAuthor = document.getElementById("aBox").value;
     let newQuote = document.createElement("option");
    let newQuoteVal = document.createTextNode(userInput);
    newQuote.value = theAuthor;
   if(userInput == "" && theAuthor == ""){
     alert("You have not input anything")
   }else{
    newQuote.appendChild(newQuoteVal);
    select.insertBefore(newQuote,select.firstChild);
  }
  confirm();
 }

//Saving the Quote to a JSON File
function savingChanges(){
   var select = document.getElementById("quotes");
  var myOptions = select.options
  let request = new XMLHttpRequest();
  
  let newQuoteObject = {
    Author: document.getElementById('aBox').value,
     theQuote: document.getElementById("qBox").value 
  }

  jsonObject = {
    quoteObject: []
  }

  for (item of myOptions){
    let quote = item.text;
    let value = item.value;

    let newQuoteObject = {
      Author: value,
      theQuote: quote
    }
    jsonObject.quoteObject.push(newQuoteObject)
  }

  console.log(jsonObject);
  
  request.onreadystatechange = function(){
    let response = ""
    if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
      alert("Complete")
      //process the response
    }else if(this.readyState == 4 && !this.status === 200){
      //show error
      response = "ERROR " + this.statusText;
      alert("not working")
    }
  }

  document.getElementById('aBox').value = "";
  document.getElementById("qBox").value = "";
  
  request.open("PUT","/api/addQuote",true)
  request.setRequestHeader("Content-Type", "application/json")
  request.send(JSON.stringify(jsonObject))
}
u// It check what the selected position is in my select elements and then deletes it
function deleteQuote(){
var x = document.getElementById("quotes");
if(x.selectedIndex.text == ""){
  alert("There was nothing to remove")
}else{
  x.remove(x.selectedIndex);
  alert("Quote removed")
  }
  confirm();
}

function putQuote(){
  let para = document.getElementById("Qholder");
  let sel = document.getElementById("quotes");
  var options = sel.options[sel.selectedIndex];
  para.innerHTML = options.text;
  
}

function RandomQuote(){
  let para = document.getElementById("Qholder");
  let list = document.getElementById("quotes");
  var randomQ = Math.floor(Math.random() * (list.length));
  return randomQ;
}

function displayRandom(){
  let para = document.getElementById("Qholder");
  let list = document.getElementById("quotes");
  let operation = list.options[RandomQuote()];
  para.innerHTML = operation.text;
    
}

function confirm(){
var yesB = document.getElementById("yButton");
var noB = document.getElementById("nButton");
document.querySelector(".pwindow").style.display = "none";
document.querySelector(".confirmWindow").style.display = "flex";
}

function yesButton(){
 savingChanges(); document.querySelector(".confirmWindow").style.display = "none";
}

function noButton(){ document.querySelector(".confirmWindow").style.display = "none";
}
  
  /*Open up the modal
  give the user the option weather to save there changes YES/NO
  Based off that decision run the function which updates JSON file
  function is going to go into both the delete and add function
  The user is going to prompt this every time they attempt to add or delete
  
  */
