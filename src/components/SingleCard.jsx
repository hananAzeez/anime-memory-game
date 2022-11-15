import "./SingleCard.css";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="image front" className="front" />
        <img
          src="/img/cover.jpg"
          alt="cover image"
          className="back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
