let ingredients = ['Salatgurke', 'Paprika', 'Tomate', 'Zwiebeln', 'Schafskäse', 'Glas Oliven swarz ca 100g', 'Salz und Peffer', 'Essig', 'Olivenöl', 'Oregano'];
let measurement = ['(n)', '(n)', '(n)', '(n)', '(n)', 'Glas', 'Prise', 'ml', 'ml', 'Prise'];
let dose = ['0.25', '0.5', '125', '0.5', '50', '0.25', '0.25', '20', '30', '0.25'];
let time = "15 Min.";
let level = ['Easy', 'Middle', 'Difficult'];
let dateOfRezept = "15.11.2021";

let calcPortion = [];

function start() {
    includeHTML();
    setVariable();
    calculatePortion();
}

function setVariable() {
    document.getElementById('time').innerHTML = `
    <img class="img-icons" src="img/icons/clock-regular.svg" alt=""/>
    ${time}
    `;
    document.getElementById('level').innerHTML = `
    <img class="img-icons" src="img/icons/brain-solid.svg" alt=""/>
    ${level[0]}
    `;
    document.getElementById('dateOfRezept').innerHTML = `
    <img class="img-icons" src="img/icons/calendar-alt-regular.svg" alt="">
    ${dateOfRezept}
    `;
    document.getElementById('timeVorbereitung').innerHTML = `
    <img class="img-icons" style="height: 20px; width: 20px;" src="./img/icons/clock-regular.svg" alt="">
            <p> Vorbereitungszeit ${time}</p>
    `;
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}


function calculatePortion() {
    getAmount();
    resetIngredientsList();
    showIngredientsList(calcPortion);
}



function getAmount() {
    let portion = document.getElementById('int-num').value;
    if (portion < 1) {
        alert("Das Gericht sollte mindestens für 1 Person sein.");
    } else {
        for (let i = 0; i < ingredients.length; i++) {
            if (dose[i] == "n.B") {
                calcPortion[i] = dose[i];
            } else {
                calcPortion[i] = dose[i] * portion;
            }
        }
        return calcPortion;
    }
}

function resetIngredientsList() {
    document.getElementById('ingredients--list').innerHTML = '';
}

function showIngredientsList(calcPortion) {
    for (let i = 0; i < ingredients.length; i++) {

        if (i % 2 == 0) {
            document.getElementById('ingredients--list').innerHTML += `
            <li>
                <p style="border-radius: 50px;" >${calcPortion[i]} ${ingredients[i]} ${measurement[i]}</p>
            </li>
            `;

        } else {
            document.getElementById('ingredients--list').innerHTML += `
            <li>
            <p>${calcPortion[i]} ${ingredients[i]} ${measurement[i]}</p>
            </li>
            `;
        }
    }
}