const apiKey = "1";

const searchBtn      = document.getElementById("searchBtn");
const mealsContainer = document.getElementById("meals");
const mealsDetail    = document.getElementById("meal-detail");

searchBtn.addEventListener('click',getMeals);
mealsContainer.addEventListener('click',getMealDetail);


function getMeals (){
  let searchTerm=document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${searchTerm}`)
    .then( res => res.json())
    .then( data  => {
        //console.log(data)
        
        let HTMLCard = ''
        if(data.meals){
          data.meals.forEach(meal=>{
            HTMLCard += `
            <div class="card" data-id="${meal.idMeal}">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="card-content">
            <h3>${meal.strMeal}</h3>
          </div>
          <div class="card-actions">
          <a href="#" onclick="hapus('meals')" class="btn-detail" data-id="${data.id}">
          Detail
          </a>
            
          </div>
        </div>
            
            `  ;
          });
        }else{
          HTMLCard=alert("Sorry, we can't find some of food");
        }
        mealsContainer.innerHTML = HTMLCard;

        let links = document.getElementsByClassName('card')
        for (let link of links) {
            link.addEventListener('click', () => {
                let id = link.dataset.id
                getMealDetail(id)            
    
            })
        }
            
    })
}
function hapus(meals) {
  var i;
  var x = document.getElementsByClassName("meals");
  for (i = 0; i < x.length; i++) {
  x[i].style.display = "none"; 
  }
  document.getElementById(meals).box.removeChild('meals');
  
 }
 function tambah(meals) {
  var i;
  var x = document.getElementsByClassName("meals");
  for (i = 0; i < x.length; i++) {
  x[i].style.display = "none"; 
  }
  document.getElementById(meals).box.appendChild('meals');
  
 }
function getMealDetail(e) {
  e.preventDefault();
  if(e.target.classList.contains('btn-detail')){
    let item=e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/lookup.php?i=${item.dataset.id}`)
    .then(res =>res.json())
    .then(data =>mealModal(data.meals));
  }
}

function mealModal(meal){
  meal=meal[0]
  let html =`
  <h2 class="detail-title">${meal.strMeal}</h2>
          <p class="category">${meal.strCategory}</p>
          <div class="intruction">
            <h3>Instructions : </h3>
            <p>${meal.strInstructions}</p>
          </div>
          <div class="detail-img">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          </div>
          <div class="link">
            <a href="${meal.strYoutube}" target="_blank"></a>
          </div>
          <a href="index.html"class="button" id="back" onclick="tambah('meals')" >BACK</a>
          
  `
  mealsDetail.innerHTML=html;
  
}
