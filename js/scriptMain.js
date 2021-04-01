//Создаь карточки из массива продукотов
function createCards() {
    let pag = document.querySelector('.pagination');
    for (let i = 0; i < productList.length; i++) {
        pag.before(productList[i].init(i));
    }
};


//Функция сортировки
function mysort(func) {
    let items = document.querySelector(".content").children;
    let arrayOfItems = [];
    for (let elem in items) {
        if (items[elem].nodeType == 1) {
            arrayOfItems.push(items[elem]);
        }
    }
    arrayOfItems.sort(func);

    for (let i = 0; i < arrayOfItems.length; ++i) {
        document.querySelector(".content").appendChild(arrayOfItems[i]);
    }
}

// Сортування за зростанням ціни
function sortByPriceIncrease() {
    mysort(function (a, b) {
        if (a.getAttribute("class") == "pagination" || b.getAttribute("class") == "pagination") return 0;
        if (parseInt(a.children[2].textContent) > parseInt(b.children[2].textContent)) {
            return 1;
        }
        if (parseInt(a.children[2].textContent) < parseInt(b.children[2].textContent)) {
            return -1;
        }
        return 0;
    });
}

// Сортування за спаданням ціни
function sortByPriceFalling() {
    mysort(function (a, b) {
        if (a.getAttribute("class") == "pagination" || b.getAttribute("class") == "pagination") return 0;
        if (parseInt(a.children[2].textContent) > parseInt(b.children[2].textContent)) {
            return -1;
        }
        if (parseInt(a.children[2].textContent) < parseInt(b.children[2].textContent)) {
            return 1;
        }
        return 0;
    });
}


//Отсортировать по имени А-Я
function sortByNameToZ() {
    mysort(function (a, b) {
        if (a.getAttribute("class") == "pagination" || b.getAttribute("class") == "pagination") return 0;
        if (a.children[1].textContent > b.children[1].textContent) {
            return 1;
        }
        if (a.children[1].textContent < b.children[1].textContent) {
            return -1;
        }
        return 0;
    });
}

//Отсортировать по имени Я-А
function sortByNameToA() {
    mysort(function (a, b) {
        if (a.getAttribute("class") == "pagination" || b.getAttribute("class") == "pagination") return 0;
        if (a.children[1].textContent > b.children[1].textContent) {
            return -1;
        }
        if (a.children[1].textContent < b.children[1].textContent) {
            return 1;
        }
        return 0;
    });
}

// Сортування вибором ціни
function sortByPrice() {
    mysort(function (a, b) {
        if (a.getAttribute("class") == "pagination" || b.getAttribute("class") == "pagination") return 0;
        if (parseInt(a.children[2].textContent) > parseInt(b.children[2].textContent)) {
            return 1;
        }
        if (parseInt(a.children[2].textContent) < parseInt(b.children[2].textContent)) {
            return -1;
        }
        return 0;
    });
}

//Сортировка
function sort() {
    switch (currentSort) {
        case 0:
            sortByNameToZ();
            break;
        case 1:
            sortByNameToA();
            break;
        case 2:
            sortByPriceIncrease();
            break;
        case 3:
            sortByPriceFalling();
            break;
    }
}

//Выбор сортировки
function setSort(selectedObject) {
    currentSort = +selectedObject.value;
    sort();
}








//Пересоздание кнопок навигации
function recalcButtons() {
    let items = document.querySelector(".content").children;
    let pags = document.querySelector(".content").children[document.querySelector(".content").children.length - 1];
    let sel;
    if (selectedTypes.length == 0) {
        sel = Math.floor((items.length - 1) / quantityPerPage);
    } else {
        let kol = 0;
        for (let i = 0; i < items.length - 1; i++) {
            if (selectedTypes.includes(productList[items[i].children[5].id].type)) {
                kol++;
            }
        }
        sel = Math.floor(kol / quantityPerPage);
    }
    lastPage = sel;


    //Если количество страниц в пагинации неправильное, то пересоздаём пагинацию
    if (pags.children.length != sel + 3) {
        for (let i = 0; i < pags.children.length; i++) {
            if (pags.children[i].getAttribute("class") == "pagination-page") {
                pags.children[i].remove();
                i--;
            }
        }
        for (let i = 0; i <= sel; i++) {
            let newPage = document.createElement("a");
            newPage.href = "#";
            newPage.setAttribute("class", "pagination-page");
            newPage.textContent = i + 1;
            newPage.setAttribute("onclick", "toPage(this)");
            pags.insertBefore(newPage, pags.lastElementChild);
        }
        selectedPage = 0;
    }
}

//Пересчитать видимость в зависимости от пагинации и группировки
function recalculate() {
    const checkboxes = document.querySelectorAll('.groupingCheckBox');
    isAlreadyChoosen = 0; 
    checkboxes.forEach(item => {
        if (item.firstChild.checked) {
            isAlreadyChoosen++;
        }
        if (isAlreadyChoosen > 1) {
            isAlreadyChoosen--;
            alert('Можна вибирати товари лише за 1 фільтрем!\nОберіть знову.');
            checkboxes.forEach(element => {
                element.firstChild.checked = false;
            });
        }       
    });
    let items = document.querySelector(".content").children;
    if (selectedTypes.length != 0) {
        let j = 0;
        for (let i = 0; i < items.length - 1; i++) {
            if (selectedTypes.includes(productList[items[i].children[5].id].type) || selectedTypes.includes(productList[items[i].children[5].id].filter)) {
                if (j >= quantityPerPage * selectedPage && j < quantityPerPage * (selectedPage + 1)) {
                    items[i].hidden = false;
                } else {
                    items[i].hidden = true;
                }
                j++;
            } else items[i].hidden = true;
        }
    } else {
        for (let i = 0; i < items.length - 1; i++) {
            if (i >= quantityPerPage * selectedPage && i < quantityPerPage * (selectedPage + 1)) {
                items[i].hidden = false;
            } else {
                items[i].hidden = true;
            }
        }
    }
}

//Выбор отображения
function setQuantity(selectedObject) {
    quantityPerPage = +selectedObject.value;
    recalcButtons();
    recalculate();
}

//Перети на страницу
function toPage(page) {
    selectedPage = +page.textContent - 1;
    recalculate();
}



//Группировка
function grouping() {
    selectedTypes = [];
    let group = document.querySelector(".grouping");
    for (let i = 0; i < group.children.length; i++) {
        if (group.children[i].firstElementChild.checked == true) {
            selectedTypes.push(group.children[i].firstElementChild.value);
        }
    }
    recalcButtons();
    recalculate();
}

//Сбросить фильтры
function resetFilters() {
    let group = document.querySelector(".grouping");
    for (let i = 0; i < group.children.length; i++) {
        group.children[i].firstElementChild.checked = false;
    }
    grouping();
}


//Инициализировать документ
function initDocument() {
    createCards();

    let types = new Set();
    for (let i = 0; i < productList.length; i++) {
        types.add(productList[i].type);
        types.add(productList[i].filter);
    }

    let group = document.querySelector(".grouping");
    for (let t of types) {
        let newCheckBox = document.createElement("input");
        newCheckBox.type = "checkbox";
        newCheckBox.id = t;
        newCheckBox.value = t;
        newCheckBox.setAttribute("onclick", "grouping()");

        let newLabel = document.createElement("label");
        newLabel.setAttribute("for", t);
        newLabel.textContent = " " + t;

        let newP = document.createElement("p");
        newP.setAttribute("class", "groupingCheckBox");
        newP.appendChild(newCheckBox);
        newP.appendChild(newLabel);

        group.appendChild(newP);
    }

    sort();
    recalcButtons();
    recalculate();
}