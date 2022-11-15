import { useEffect, useState } from "react";
import "./layout.css";
import SingleCard from "./SingleCard";
import Select from "./select";
import ThemeSelector from "./ThemeSelector";

const cardImages = [
  { src: "/img/luffy.jfif", matched: false, anime: "one piece" },
  { src: "/img/zoro.jfif", matched: false, anime: "one piece" },
  { src: "/img/gojo.jpg", matched: false, anime: "jujutsu kaisen" },
  { src: "/img/geto.jpg", matched: false, anime: "jujutsu kaisen" },
  { src: "/img/naruto.jpg", matched: false, anime: "naruto" },
  { src: "/img/sasuke.jpg", matched: false, anime: "naruto" },
  { src: "/img/hinata.jpg", matched: false, anime: "haikyuu" },
  { src: "/img/kageyama.jpg", matched: false, anime: "haikyuu" },
  { src: "/img/killua.jpg", matched: false, anime: "HxH" },
  { src: "/img/gon.jpg", matched: false, anime: "HxH" },
  { src: "/img/goku.jpg", matched: false, anime: "dragon ball" },
  { src: "/img/vegetaa.jpg", matched: false, anime: "dragon ball" },
];

const Layout = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [numberOfCards, setNumberOfCards] = useState(6);
  const [won, setWon] = useState(false);
  const [matchedCards, setMatchedCards] = useState(0);

  //handle selection
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setMatchedCards((prevMatchedCards) => prevMatchedCards + 2);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => reset(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //shuffle cards
  const shuffleCards = () => {
    const cardImages2 = cardImages.slice(0, numberOfCards);
    const shuffledCards = [...cardImages2, ...cardImages2]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setMatchedCards(0);
    setWon(false);
  };

  //Displaying items on reload
  useEffect(() => {
    shuffleCards();
  }, [numberOfCards]);

  //handle choice selection
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //reset
  const reset = () => {
    if (choiceOne && choiceTwo) {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns((prevTurns) => prevTurns + 1);
      setDisabled(false);
    }
  };

  //Number of cards
  const handleNumberOfCards = (number) => {
    setNumberOfCards(number);
  };

  //when user wins
  // setMatchedCards(cards.filter((card) => card.matched === true));

  useEffect(() => {
    console.log(matchedCards);
    if (matchedCards === numberOfCards * 2) {
      setWon(true);
    }
  }, [matchedCards]);
  return (
    <>
      <ThemeSelector />
      <Select handleNumberOfCards={handleNumberOfCards} />
      <h1>Anime Memory Game</h1>
      <button className="btn" onClick={shuffleCards}>
        New Game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne || card === choiceTwo || card.matched === true
            }
            disabled={disabled}
          />
        ))}
      </div>
      {won && <h3>You Wins</h3>}
      <p className="turns">Turns: {turns}</p>
    </>
  );
};

export default Layout;
