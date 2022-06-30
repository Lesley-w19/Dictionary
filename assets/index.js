const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  synonyms = wrapper.querySelector(".synonym .list"),
  volume = wrapper.querySelector(".word i"),
  removeIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text");
let audio;

// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}

searchInput.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchApi(e.target.value);
  }
});

const data = (result, word) => {
  if (result.title) {
    infoText.innerHTML = `Oops! No Definitions Found for ${word}`;
  } else {
    wrapper.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0].definition;
    audio = result[0].phonetics[0].audio;
    document.getElementById("myAudio").src = audio ? audio : "";
    document.querySelector("#audio").addEventListener("click", (e) => {
      document.getElementById("myAudio").play();
    });
    document.querySelector("#wrd").innerHTML = result[0].word;

    let phonetic = result[0].phonetics[0].text;
    let synonym = result[0].meanings[1];
    document.getElementById("meaning").innerHTML = definitions;
    document.getElementById(
      "phn"
    ).innerHTML = `Commonly pronounced as ${phonetic}`;
    document.querySelector(".example span").innerHTML = definitions.example
      ? definitions.example
      : "No example here.";

    document.querySelector(".list").innerHTML = synonym
      ? synonym.synonyms[0]
        ? synonym.synonyms[0]
        : "No synonym found."
      : "No synonym found.";
    document.querySelector(".list").style.color = "#9a9a9a";
  }
};

removeIcon.addEventListener("click", (e) => {
  searchInput.value = "";
  searchInput.focus();
  infoText.style.color = "#9a9a9a";
  wrapper.classList.remove("active");
  infoText.innerHTML =
    " Type any existing word and press enter to get meaning, example,synonyms, etc.";
});
