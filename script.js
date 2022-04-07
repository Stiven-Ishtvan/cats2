let container = document.querySelector(".container");
function setCard(info = {}) {
    let div = document.createElement("div");
    div.className = "cat";
    div.id = `cat_${info.id}`;
    div.innerHTML = `
        <div class="img" style="background-image: url(${info.img_link || 'img/ili.jpg'})"></div>
        <div class="name">${info.name || "Vasya"}</div>
        <div class="del">×</div>
        
    `;
    // <a></a>
    div.addEventListener("click", function(e) {
        window.location.replace(`cat.html#${info.id}`);
    });
    container.append(div);
}

let path = {
    getAll: "http://sb-cats.herokuapp.com/api/2/stiven/show",
    getOne: "http://sb-cats.herokuapp.com/api/2/stiven/show/",
    getId: "http://sb-cats.herokuapp.com/api/2/stiven/ids",
    add: "http://sb-cats.herokuapp.com/api/2/stiven/add",
    upd: "http://sb-cats.herokuapp.com/api/2/stiven/update/",
    del: "http://sb-cats.herokuapp.com/api/2/stivenol/delete/"
}
let cats = storage.getItem("cats");
if (!cats) {
    fetch(path.getAll)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            if (result.data) {
                storage.setItem("cats", JSON.stringify(result.data));
                result.data.forEach(cat => {
                    setCard(cat);
                });
            }
        });
} else {
    JSON.parse(cats).forEach(cat => {
        setCard(cat);
    });
}


/*
    Если вдруг база обновилась, а данные хронятся в локальном хранилище - их надо очистить (обновить)

    Для этого можно создать кнопку "Загрузить с сервера новые данные"
*/

let catBlocks = document.querySelectorAll(".cat>.del");
catBlocks.forEach(name => {
    name.addEventListener("click", function(e) {
        e.stopPropagation();
        name.parentElement.remove();
        let id = +name.parentElement.id.split("_")[1];
        console.log(id);
        let obj = JSON.parse(cats);
        // Дано: массив с котами
        //       id кота

        /*
            fetch("", {method: DELETE})
        */

        let index = obj.findIndex((el, i) => el.id === id);
        obj.splice(index, 1);
        console.log(obj);
        storage.setItem("cats", JSON.stringify(obj));
    });
});