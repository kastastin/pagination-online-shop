let productList = [
    new Product("Dianrad", "img/1.png", 920000, 2, "2-кімнатна | 77,34 кв.м", "Квартира", 'Більше 60 кв.м'),
    new Product("Yalti", "img/2.png", 790000, 4, "2-кімнатна | 59,81 кв.м", "Квартира", 'Менше 60 кв.м'),
    new Product("Bermudi", "img/3.png", 615000, 3, "1-кімнатна | 51,33 кв.м", "Квартира", 'Менше 60 кв.м'),
    new Product("Hamilton", "img/4.jpg", 2100000, 3, "Спальні: 3 | 318 кв.м", "Будинок", 'Більше 60 кв.м'),
    new Product("Quebec", "img/5.jpg", 2200000, 2, "Спальні: 3 | 319 кв.м", "Будинок", 'Більше 60 кв.м'),
    new Product("Alberta", "img/6.jpg", 2500000, 0, "Спальні: 5 | 319 кв.м", "Будинок", 'Більше 60 кв.м'),
    new Product("Zeliot", "img/7.png", 756000, 3, "2-кімнатна | 56,67 кв.м", "Квартира", 'Менше 60 кв.м'),
    new Product("Kinost", "img/8.png", 835000, 5, "2-кімнатна | 71,58 кв.м", "Квартира", 'Більше 60 кв.м'),
    new Product("Urins", "img/9.png", 610000, 0, "1-кімнатна | 51,68 кв.м", "Квартира", 'Менше 60 кв.м'),
    new Product("Edmonton", "img/10.jpg", 1900000, 1, "Спальні: 4 | 312 кв.м", "Будинок", 'Більше 60 кв.м'),
    new Product("Montreal", "img/11.jpg", 1400000, 3, "Спальні: 3 | 246 кв.м", "Будинок", 'Більше 60 кв.м'),
    new Product("Calgary", "img/12.jpg", 1600000, 1, "Спальні: 3 | 278 кв.м", "Будинок", 'Більше 60 кв.м')
];
let currentSort = 0;
let selectedTypes = [];
let quantityPerPage = 8;
let lastPage = 0;
let selectedPage = 0;
let basket = new Basket();
let pagination = document.querySelectorAll(".pagination-main");
pagination[0].addEventListener("mousedown ", toStart);
pagination[1].addEventListener("mousedown ", ToEnd);
//Навесить обработчики событий на ссылки
let ul = document.querySelector("ul");
ul.children[0].firstElementChild.addEventListener("click", ShowMain);
ul.children[1].firstElementChild.addEventListener("click", ShowBasket);


//На первую страницу
function toStart() {
    selectedPage = 0;
    recalculate();
}

//На последнюю страницу
function ToEnd() {
    selectedPage = lastPage;
    recalculate();
}

//Перейти на Main
function ShowMain() {
    document.getElementById("mainDisplay").style.display = 'flex';
    document.getElementById("basketDisplay").style.display = 'none';
}

//Перейти на Basket
function ShowBasket() {
    document.getElementById("mainDisplay").style.display = 'none';
    document.getElementById("basketDisplay").style.display = 'flex';
}




let minPrice = 0;
let maxPrice = 0;
const cards = document.querySelector('.content').children;

function getMinPrice(price) {
    minPrice += +price;
}

function getMaxPrice(price) {
    maxPrice += +price;
}

let hiddens = 0;

btnChoosePrice = document.querySelector('.btnChoosePrice');
btnChoosePrice.addEventListener('click', () => {
    currentSort = 0;
    hiddens = 0;
    
    if (minPrice > maxPrice) {
        alert('Error');
    } else {
        for (let i = 0; i < cards.length - 1; i++) {
            if (parseInt(productList[cards[i].children[5].id].price) > minPrice && parseInt(productList[cards[i].children[5].id].price) < maxPrice) {
                cards[i].hidden = false;
            } else {
                cards[i].hidden = true;
                hiddens++;
            }
        }
    }
    if (hiddens == 12) {
        alert('Error. Try again!');
        showCard();
    }
    

    resetPrices();
});

function resetPrices() {
    minPrice = 0;
    maxPrice = 0;
}

function showCard() {
    for (let i = 0; i < cards.length - 1; i++) {
        cards[i].hidden = false;
    }
}