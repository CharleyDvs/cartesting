const URL = 'http://localhost:4040';

const startBtn = document.querySelector('.start-btn');

const refresh = () => {
  const nodesToRemove = document.querySelectorAll('.rm');
  nodesToRemove.forEach((node) => {
    node.parentElement.removeChild(node);
  });
};

const getHands = async () => {
  refresh();
  try {
    const response = await fetch(`${URL}/play`);
    const sortedCards = await response.json();
    console.log(sortedCards);
    const { currentHands, remainingCards } = sortedCards;

    const deckList = document.createElement('ul');
    deckList.className = 'rm';
    remainingCards.forEach((card) => {
      const li = document.createElement('li');
      li.textContent = card;
      deckList.appendChild(li);
    });
    const listContainer = document.querySelector('.deck');
    const totalCardCount = document.createElement('p');
    totalCardCount.className = 'rm';
    totalCardCount.textContent = `Cards left in deck: ${remainingCards.length}`;
    listContainer.appendChild(deckList);
    listContainer.appendChild(totalCardCount);

    Object.keys(currentHands).forEach((player) => {
      const playerContainer = document.querySelector('.player-hands');
      const playerArea = document.createElement('div');
      playerArea.className = 'rm';
      const playerName = document.createElement('h3');
      playerName.innerText = player;
      playerArea.appendChild(playerName);
      const playerHand = document.createElement('ul');
      currentHands[player].cards.forEach((playerCard) => {
        const cardName = document.createElement('li');
        cardName.innerText = playerCard;
        playerHand.appendChild(cardName);
      });
      playerArea.appendChild(playerHand);
      playerContainer.appendChild(playerArea);
    });
  } catch (error) {
    console.warn(error);
  }
};

startBtn.addEventListener('click', getHands);
