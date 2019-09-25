document.addEventListener("DOMContentLoaded", function() {
  // server

  function get(url) {
    return fetch(url).then(resp => resp.json());
  }

  function post(url) {}

  function patch(url, id, data) {
    return fetch(`${url}${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(resp => resp.json());
  }

  function destroy(url, id, data) {
    return fetch(`${url}${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(resp => resp.json());
  }

  API = { get, post, patch, destroy };

  // const

  const BASE_URL = "http://localhost:3000";
  const TRAINERS_URL = `${BASE_URL}/trainers`;
  const POKEMONS_URL = `${BASE_URL}/pokemons`;
  const mainDiv = document.querySelector("main");
  let newList = document.createElement("ul");
  newList.className = "trainer-list";
  mainDiv.append(newList);
  const trainerList = document.querySelector(".trainer-list");

  // functions

  function getAndAppendTrainers() {
    API.get(TRAINERS_URL).then(trainers => appendAllTrainers(trainers));
  }

  function appendAllTrainers(trainers) {
    trainers.forEach(trainer => appendATrainerDiv(trainer));
  }

  function appendATrainerDiv(trainer) {
    let trainerDiv = document.createElement("div");
    trainerDiv.setAttribute("class", "card");
    let trainerName = document.createElement("p");
    trainerName.innerText = trainer.name;
  let addPokemonButton = document.createElement("button");
    addPokemonButton.innerText = "Add Pokémon";
    addPokemonButton.setAttribute("data-trainer-id", trainer.id);
    trainerDiv.append(addPokemonButton)
    addPokemon(addPokemonButton); 

    let pokemonDiv = document.createElement("div");

    let pokemonList = document.createElement("ul");
    pokemonList.className = "pokeList";
    pokemonDiv.append(pokemonList);

    trainer.pokemons.forEach(pokemon => appendPokemon(pokemon, pokemonList));

    trainerDiv.append(trainerName);
    trainerDiv.append(addPokemonButton);
    trainerDiv.appendChild(pokemonDiv);

    trainerList.appendChild(trainerDiv);
  }

  

  function appendPokemon(pokemon, pokemonList) {
    let pokeLi = document.createElement("li");
    pokeLi.innerText = `${pokemon.nickname} (${pokemon.species})`;
    let releaseButton = document.createElement("button");
    releaseButton.className = "release";
    releaseButton.innerText = "Release";

    pokemonList.append(releaseButton);
    pokemonList.append(pokeLi);

    releaseButton.addEventListener("click", () => {
      releasePokemon(pokemon);
      location.reload()
    });
  }

  function addPokemon(button) {
    button.addEventListener("click", event => {
      const trainerData = {
        trainer_id: event.target.getAttribute("data-trainer-id")
      };

      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(trainerData)
      };

      fetch(POKEMONS_URL, configObj)
        .then(resp => resp.json())
        .then(data => appendPokemon(data));
        location.reload()
    });
  }

  function releasePokemon(pokemon) {
    fetch(`${POKEMONS_URL}/${pokemon.id}`, { method: "DELETE" })
    }


  // client
  getAndAppendTrainers();
});
