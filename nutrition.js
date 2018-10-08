var myIn = document.querySelector('#myIn');
var info = document.querySelector('#info');
var calculations = document.querySelector('#calculations');
var emptyListText = document.querySelector('#emptyListText');
var totalSumBtn = document.querySelector('#totalSumBtn');
var headerRight = document.querySelector('#headerRight');
var total = document.querySelector('#total');
var lorem = document.querySelector('#lorem');

lorem.style.visibility = 'hidden';
totalSumBtn.style.visibility = 'hidden';
info.style.visibility= 'hidden';
calculations.style.visibility="hidden";

//Enable enter key to click
$("#myIn").keyup(function (e) {
    if (e.keyCode === 13) {
        $("#btn").click();     
     }
    });

//Get data from nutrionix
$(document).ready(function() {
 $("#btn").click(function(){
    $('#info').empty(); //clear results after new search is made
    info.style.visibility= 'visible';
    var input = myIn.value;
    
    var url = "https://api.nutritionix.com/v1_1/search/"+input+"?results=0:20&fields=item_name,brand_name,item_id,nf_calories,nf_sodium&appId=1fe4da1c&appKey=db9034658c72139e03dab5c6dd4356d1";
    $.ajax({
        url: url,
        type: "GET",
        async: true,
        dataType: "json",
        success: function(data){
            search(data);
        } 
    }); 
});

function search(data){
   for( let i =0; i< data.hits.length; i++){
    //console.log(data.hits[i].fields["item_name"]);
    //html += "<li>" + data.hits[i].fields["item_name"] + "<br>" + "Brand name: " +  data.hits[i].fields["brand_name"] + "</li>";
    addItem(data.hits[i].fields);
      }
    }
});

//Add items to my calories list and sum the total
function addCalc(){
    calculations.style.visibility="visible";
    totalSumBtn.style.visibility = 'visible';
    lorem.style.visibility = 'visible';
    emptyListText.style.visibility = 'hidden';
    //to find the calorie number
  
     
    var listCalories = document.createElement("div");
    listCalories.className = "list";
    
    calculations.appendChild(listCalories);
    
    var xOut = this.previousSibling.lastChild.innerHTML;
     
    listCalories.innerHTML = xOut;
    var del = document.createElement("button");
    del.innerHTML = "x";
    del.className = "btn RemoveBtn";
    listCalories.appendChild(del);
    del.addEventListener('click', function(){
        var yOut = this.parentNode;
        var parent = yOut.parentNode;
    parent.removeChild(yOut);
    });
    
    totalSumBtn.addEventListener('click', function(){
      var totalBtn = calculations.innerHTML;
      var sum = 0;
      $(totalBtn).each(function(){
        sum += parseInt($(this).text());

      }); 
      
      //console.log(sum);
      var outputTotalCalories = document.createElement("div");
      total.appendChild(outputTotalCalories);
      this.innerHTML = sum;
      
     if(parseInt(sum) == 0){
        calculations.style.visibility="hidden";
        totalSumBtn.style.visibility = 'hidden';
        lorem.style.visibility = 'hidden';
        emptyListText.style.visibility = 'visible';
     }
   });
    
}

function addItem(text){
    
    //console.log(text["item_name"]);
    var item = document.createElement("li");
    item.className = "foodList";
    var html ="<strong>" + text["item_name"] + "</strong>" + "<br>" + "<strong>Brand name: </strong> " +  text["brand_name"] ;
    item.style.color= 'black';
    item.innerHTML = html;
   
    var inputs = document.createElement("div");
    
    var servingInput = document.createElement("div");
    servingInput.innerHTML = "Serving size: ";
    var servingNum = document.createElement("input");
    servingNum.className="input-group mb-1";
    servingNum.setAttribute("type", "number");
    servingNum.value = 1;
  
    
    var calorieInput = document.createElement("div");
    calorieInput.innerHTML = "Calories: ";
    var calorieNum = document.createElement("div");
     var calories =  parseInt(text["nf_calories"]);
     calorieInput.className ="mb-2";
     calorieInput.style.color= 'white';
    calorieNum.innerHTML =  calories;
    
    //Event listener to update calories based on serving size
    servingNum.addEventListener('input',function(){
     var yes = servingNum.value;
     var okay = eval(yes * calories);
     calorieNum.innerHTML = okay;
    });


    var addtoMyCalList = document.createElement("button");
    addtoMyCalList.className = "btn btn-dark buttonAdd";
    addtoMyCalList.innerHTML = "+";
    
    
    addtoMyCalList.addEventListener('click', addCalc);
   
    
    info.appendChild(item);
    item.appendChild(inputs);
    inputs.appendChild(servingInput);
    servingInput.appendChild(servingNum);
    inputs.appendChild(calorieInput);
    calorieInput.appendChild(calorieNum);
    inputs.appendChild(addtoMyCalList);
    
}

//Scroll Reveal animations

window.sr= ScrollReveal();
sr.reveal('#titleText', {
  duration: 1000, 
  origin: 'top'
});


window.sr= ScrollReveal();
sr.reveal('.moto', {
  duration: 2000, 
  origin: 'top'
})

window.sr= ScrollReveal();
sr.reveal('.buttonDown', {
  duration: 3000, 
  origin: 'top',
  distance: '200px'
})

window.sr= ScrollReveal();
sr.reveal('.newContText', {
  duration: 1500, 
  origin: 'bottom',
  distance: '200px',
  viewFactor: 0.2
})

window.sr= ScrollReveal();
sr.reveal('.newContentTwo', {
  duration: 1500, 
  origin: 'left',
  distance: '200px',
  viewFactor: 0.2
})

window.sr= ScrollReveal();
sr.reveal('#searchStart', {
  duration: 2000, 
  origin: 'top',
  distance: '200px',
  viewFactor: 0.2
})

//Change Navbar color at scroll

var navColorChnage = $('.navColorChangePoint').offset().top + $('.navColorChangePoint').height();

$(window).on('scroll',function(){

    // we round here to reduce a little workload
    var stop = Math.ceil($(window).scrollTop());
    if (stop > navColorChnage) {
        $('.navbar').addClass('alt-color');
    } else {
        $('.navbar').removeClass('alt-color');
   }

});


