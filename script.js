const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";

const quoteDisplayElement = document.getElementById("quote-display");
const quoteInputElement = document.getElementById("quote-input");
const timerElement = document.getElementById("timer");

quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayInput = quoteInputElement.value.split("");

  let correct = true;

  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayInput[index];

    // when there is no input simply remove everything from quotes.
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    }
    else if (character == characterSpan.innerText) {
      correct = true;
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else if (character != characterSpan.innerText) {
      correct = false;
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
    }
  });

  if (correct) renderNewQuote();
});

const getRandomQuote = async () => {
  const response = await fetch(RANDOM_QUOTE_API_URL);
  const data = await response.json();
  return data.content;
};

const renderNewQuote = async () => {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerText = "";

  // convert the quote into array of every charachter and then use forEach to loop through each character
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;

  startTimer();
};

const startTimer = () => {
  timerElement.innerText = 0;
  setInterval(() => {
    timerElement.innerText++;
  }, 1000);
};

renderNewQuote();
