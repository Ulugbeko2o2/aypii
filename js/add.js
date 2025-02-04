let author_select = document.querySelector("#author_select");
let title = document.querySelector("#title");
let description = document.querySelector("#description");
let image = document.querySelector("#image");

// Mualliflarni olish va select listga qo'shish
async function getAthor(){
    let response = await fetch("https://679505fcaad755a134eb02e3.mockapi.io/api/authors", {method: "GET"});
    response = await response.json();
    author_select.innerHTML = "";  // O'zgaruvchini tozalash
    response?.forEach((element) => {
        let option = document.createElement("option");
        option.textContent = element?.first_name + " " + element?.last_name;
        option.value = element?.id;  // Tanlangan muallifning ID sini value sifatida qo'shish
        author_select.appendChild(option);
    });
    console.log(response);
}
getAthor();

// Yangi post qo'shish
async function addCard() {
    let data = {
      title: title.value,
      poster: image.value,
      description: description.value,
      authorId: author_select.value,  // Muallif ID sini olish
    };

    let response = await fetch("https://679505fcaad755a134eb02e3.mockapi.io/api/authors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
          body: JSON.stringify(data),
        }
      );

    response = await response.json();
    if (response && response.id) {  // Agar response muvaffaqiyatli bo'lsa
        window.location.href = "/";  // Bosh sahifaga qaytish
    } else {
        alert("Blog postini qo'shishda xatolik yuz berdi.");
    }
}
