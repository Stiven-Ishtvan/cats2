const catId = window.location.hash.split("#")[1];
console.log(catId);

const setContent = function(obj) {
    return `
        <h1><span class=${obj.favourite ? "fav" : null} name="name">${obj.name}
        
        </span></h1>
        <div class="person_pic" style="background-image: url(${obj.img_link || 'img/ili.jpg'})"></div>
        <table>
            <tr><th>Возраст:</th><td>
                <span name="rate">${obj.age || "Возраст ещё не введен"}
                    <button class="upd" onclick="updateRow(this)" ><img src='img/pen-solid.svg' width="10" height="10"></button>
                </span>
            </td></tr>
           
            <tr><th>Рейтинг:</th><td>
                <span name="rate">${obj.rate || "Рейтинг ещё не поставлен"}
                    <button class="upd" onclick="updateRow(this)"><img src='img/pen-solid.svg' width="10" height="10"></button>
                </span>
            </td></tr>

            <tr><th>Описание:</th><td>
                <span name="description">${obj.description || "Описания ещё нет"}
                    <button class="upd" onclick="updateRow(this)"><img src='img/pen-solid.svg' width="10" height="10"></button>
                </span>
            </td></tr>
        </table>
    `
}

const updateRow = function(el) {
    let row = el.parentElement;
    let parent = row.parentElement;
    let clone = row.cloneNode(true);
    let name = row.getAttribute("name");
    let text = el.previousSibling.textContent.trim();
    parent.innerHTML = `
        <input name="${name}" value="${text}" class=${clone.className}>
        <button class="accept" onclick="acceptUpd(this)">ok</button>
        <button class="cancel">no</button>
    `;
    parent.querySelector(".cancel").addEventListener("click", function() {
        console.log(clone);
        parent.innerHTML = "";
        parent.append(clone);
    });
}

const acceptUpd = function(el) {
    const val = el.previousElementSibling.value;
    const name = el.previousElementSibling.name;
    const parent = el.parentElement;
    let fav = el.previousElementSibling.classList.contains("fav");
    console.log(val, name);
    const body = {};
    body[name] = val;
    updateCat(catId, body, parent, fav);
}

const updateCat = async function(id, body, parent, fav) {
    let res = await fetch(`https://sb-cats.herokuapp.com/api/2/stiven/update/${id}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(body)
    });
    let ans = await res.json();
    console.log(ans);
    let name = Object.keys(body)[0];
    parent.innerHTML = `
        <span name=${name} class=${fav ? "fav" : null}>${body[name]} <button class="upd" onclick="updateRow(this)"><img src='img/pen-solid.svg' width="10" height="10"></button></span>
    `;
}

const getCat = async function(id) {
    let res = await fetch("https://sb-cats.herokuapp.com/api/2/stiven/show/" + id);
    let ans = await res.json();
    console.log(ans);
    document.querySelector("main").innerHTML = setContent(ans.data);
}

getCat(catId);