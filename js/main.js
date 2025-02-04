let cards = document.querySelector("#cards")
let card

function getCard(){
    fetch("https://679505fcaad755a134eb02e3.mockapi.io/api/authors", { method: "GET" })
    .then((res)=>{
        return res.json()
    })
    .then((response)=>{
        renderCard(response)
    })
    .catch((error)=>{
        console.log(error.message);
        
    })
}

function renderCard(card){
  cards.innerHTML=""
    card.forEach((element , index)=>{
        let fragment =document.createElement("div")
        fragment.classList.add("bg-sky-700" , "rounded-lg")
        let box=`
        <div class="p-4 text-white text-wrap">
        <div class="flex justify-between">
         <p class="font-bold">${element.id}</p>
         <button class="bg-red-500 active:bg-red-900 px-2 rounded-lg" onclick="deleteCard(${element.id})" >X</button>
        </div>
        <p>${element.title}</p>
        <p>${element.description}</p>
        <p>${formatDate(element.created_at)}</p>
        <p class=" overflow-hidden">${(element.poster)}</p>
        </div>
        `


        fragment.innerHTML = box
        cards.appendChild(fragment)
    })

}

getCard()


function formatDate(date) {
    let current_date = new Date(date);
    return `${current_date.getFullYear()} - ${String(
      current_date.getMonth() + 1
    ).padStart(2, 0)} - ${String(current_date.getDate()).padStart(2, 0)}`;
  }


  async function deleteCard(id) {
    console.log("remove ", id);
    let res = await fetch(`https://679505fcaad755a134eb02e3.mockapi.io/api/authors/${id}`, {
        method: "DELETE"
    })
    res= await res.json();
    if (res) {
      getCard()
    }
  } 