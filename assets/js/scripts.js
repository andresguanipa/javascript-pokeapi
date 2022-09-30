var pokemons = [];
var data = null;
var pokemon = null;
var htmlList = '';

async function testing() {

    for (let i = 0; i < 100; i++) {

        data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);

        let name = firstUpper(data.data.name);


        let pokemon = {
            name,
            number: data.data.id,
            img: data.data.sprites.front_default
        }

        pokemons.push(pokemon);

    }


    for (let i = 0; i < 100; i++) {

        htmlList += `
        <tr>
            <th scope="row">${pokemons[i].number}</th>
            <td>${pokemons[i].name}</td>
            <td><img src="${pokemons[i].img}"></td>
            <td><b><a href="details.html?pok=${pokemons[i].number}">Info</a></b></td>
        </tr>
        `

    }

    document.getElementById("lds-roller").style.display = "none";
    document.getElementById('contenedor').style.display = "none";
    document.getElementById("list").innerHTML = htmlList;


}

function getUrlParameter() {

    var url = new URL(window.location.href);
    var pok = url.searchParams.get("pok");
    console.log(pok);

    if (pok == undefined || pok == null || pok == '') {
        window.location.href = "index.html";
        return;
    }

    return pok;

}

function firstUpper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getPokemon() {

    let pok = getUrlParameter();

    if (pok && pok >= 1 && pok <= 100) {

        pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pok}`);

        let name = firstUpper(pokemon.data.name);
        let pokedex = pokemon.data.id;
        let type = pokemon.data.types;
        let height = pokemon.data.height;
        let weight = pokemon.data.weight;
        let frontImg = pokemon.data.sprites.front_default;
        let backImg = pokemon.data.sprites.back_default;
        let frontShinyImg = pokemon.data.sprites.front_shiny;
        let backShinyImg = pokemon.data.sprites.back_shiny;
        let moves = pokemon.data.moves;
        let stats = pokemon.data.stats;


        document.getElementById("name").innerHTML = `<b>${name}</b>`;
        document.getElementById("pokedex").innerHTML = `<b>Pokedex number: </b> ${pokedex}`;
        document.getElementById("type-label").innerHTML += `${name} is type:`;


        for (let i = 0; i < type.length; i++) {
            document.getElementById("type").innerHTML += `<li>${firstUpper(type[i].type.name)}</li>`;
        }

        document.getElementById("height").innerHTML = `<b>Height: </b> ${parseInt(height) / 10}m`;
        document.getElementById("weight").innerHTML = `<b>Weight: </b> ${parseInt(weight) / 10}kg`;
        document.getElementById("frontImg").innerHTML = `<img src="${frontImg}">`;
        document.getElementById("backImg").innerHTML = `<img src="${backImg}">`;
        document.getElementById("frontShinyImg").innerHTML = `<img src="${frontShinyImg}">`;
        document.getElementById("backShinyImg").innerHTML = `<img src="${backShinyImg}">`;

        for (let i = 0; i < moves.length; i++) {

            if (i == moves.length - 1) {
                document.getElementById("moves").innerHTML += `${firstUpper(moves[i].move.name)}.`;
            } else {
                document.getElementById("moves").innerHTML += `${firstUpper(moves[i].move.name)}, `;

            }

        }


        let statsHtml = ['ps', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];

        for (let i = 0; i < stats.length; i++) {

            document.getElementById(statsHtml[i]).innerHTML = `${stats[i].base_stat}`;

        }

    } else {

        window.location.href = "index.html";

    }

}
