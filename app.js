const ADVICE_URL = "https://api.adviceslip.com/advice";
const ADVICE_BUTTON = document.querySelector(".advice__button");
const ADVICE_ID = document.querySelector(".advice__id");
const ADVICE__CONTAINER = document.querySelector(".advice__quote");
const ADVICE_QUOTE = document.querySelector(".advice__text");
const CONTAINER = document.querySelector(".container");
class Advice {
  constructor(id, quote) {
    this.id = id;
    this.quote = quote;
  }
  renderQuote() {
    if (this.id === undefined || this.quote === undefined) {
      ADVICE_ID.textContent = "Error";
      ADVICE_QUOTE.textContent = "Try again later";
      return;
    }
    CONTAINER.classList.add("is-flipped");
    setTimeout(() => {
      ADVICE_ID.textContent = this.id;
      ADVICE_QUOTE.textContent = `"${this.quote}"`;
      CONTAINER.classList.remove("is-flipped");
    }, 500);
  }
  fetchAdvice() {
    fetch(ADVICE_URL)
      .then((response) => response.json())
      .then((data) => {
        this.id = data.slip.id;
        this.quote = data.slip.advice;
        this.renderQuote();
      })
      .catch((error) => console.log(error));
  }
}

ADVICE_BUTTON.addEventListener("click", () => new Advice().fetchAdvice());
new Advice().fetchAdvice();
