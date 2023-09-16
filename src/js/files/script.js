// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Создаем кнопку "Показать еще"
const cards = document.querySelector(".cards__body");

const showMoreButton = document.createElement("button");
showMoreButton.insertAdjacentHTML("afterbegin", `<span>Загрузть еще</span>`);
showMoreButton.classList.add("btn", "cards__btn");

cards.after(showMoreButton);

// Количество карточек, которые нужно отобразить
const totalCards = 30;
// Количество карточек, отображаемых за один раз
const cardsPerLoad = 5;
// Счетчик для отслеживания текущего количества отображенных карточек
let displayedCards = 5;

// Функция для загрузки и отображения карточек
function loadCards() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      // Отображение дополнительных карточек
      for (let i = displayedCards; i < displayedCards + cardsPerLoad; i++) {
        // Создаем элемент карточки
        const card = document.createElement("div");
        card.classList.add("card");
        card.insertAdjacentHTML(
          "afterbegin",
          `
								<img class="card__img" src="img/card.jpg" alt="card-img">
								<div class="card__body">
									<div class="card__title">${data[i].title}</div>
									<p class="card__subTitle">How to increase your productivity with a Music</p>
									<p class="card__desc">${data[i].body}</p>
									<div class="card__data">Posted by <b>Eugenia</b>, on July 24, 2019</div>
									<button class="card__btn">Continue reading</button>
								</div>
							
				`
        );
        cards.appendChild(card);
      }
      // Увеличиваем счетчик отображенных карточек
      displayedCards += cardsPerLoad;

      // Проверка, если отображены все карточки, скрываем кнопку "Показать еще"
      if (displayedCards >= totalCards) {
        showMoreButton.style.display = "none";
      }
    })
    .catch((error) => {
      console.log("Произошла ошибка при загрузке карточек:", error);
    });
}

// Обработчик события клика по кнопке "Показать еще"
showMoreButton.addEventListener("click", loadCards);

// Отображение изначальных 4 карточек
loadCards();
