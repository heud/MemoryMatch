// This would be stored in the 'src' folder of the GitHub repository
// memory-match.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const MemoryMatch = ({ assetsUrl }) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
      const cardImages = [
        "card1.png",
        "card2.png",
        "card3.png",
        "card4.png",
        "card5.png",
        "card6.png",
        "card1.png",
        "card2.png",
        "card3.png",
        "card4.png",
        "card5.png",
        "card6.png",
      ];
      const shuffledCards = cardImages
        .sort(() => Math.random() - 0.5)
        .map((image, index) => ({
          id: index,
          image: `${assetsUrl}/${image}`,
          flipped: false,
        }));
      setCards(shuffledCards);
    }, [assetsUrl]);

    const flipCard = (index) => {
      if (flippedCards.length === 2 || matchedCards.includes(index)) return;

      const newFlippedCards = [...flippedCards, index];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        const [firstIndex, secondIndex] = newFlippedCards;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];

        if (firstCard.image === secondCard.image) {
          setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        }

        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);

        setMoves(moves + 1);
      }
    };

    return React.createElement(
      "div",
      { className: "memory-match" },
      React.createElement("h2", null, "Memory Match"),
      React.createElement("p", null, `Moves: ${moves}`),
      React.createElement(
        "div",
        { className: "game-board" },
        cards.map((card, index) =>
          React.createElement(
            "div",
            {
              key: card.id,
              className: `card ${
                flippedCards.includes(index) || matchedCards.includes(index)
                  ? "flipped"
                  : ""
              }`,
              onClick: () => flipCard(index),
            },
            (flippedCards.includes(index) || matchedCards.includes(index)) &&
              React.createElement("img", { src: card.image, alt: "Card" })
          )
        )
      )
    );
  };

  return () => React.createElement(MemoryMatch, { assetsUrl: assetsUrl });
};

console.log("Memory Match game script loaded");
