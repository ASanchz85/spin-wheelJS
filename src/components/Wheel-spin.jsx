import "./Wheel-spin.css";
import React, { useState, useRef } from "react";

const WheelSpin = () => {
  const initalPosition = 345;
  const wheelTransition = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [angle, setAngle] = useState(initalPosition);

  const questions = [
    "Beginner",
    "Pre-Inter",
    "Intermediate",
    "Upper-Inter",
    "Advanced",
    "Proficient",
  ];

  const startSpin = () => {
    if (spinning) return;

    setSpinning(true);

    const rotationAngle = Math.floor(Math.random() * 360) * 10; // Random initial angle

    setAngle(rotationAngle + angle);

    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };

  const handleTransition = () => {
    const wheelPosition = Number(
      wheelTransition.current.style.transform
        .split("rotate(")[1]
        .split("deg)")[0]
    );
    console.log(wheelPosition);
    
    let evaluatedAngle = (wheelPosition % 360) - initalPosition;
    if (evaluatedAngle < 0) evaluatedAngle *= -1;

    if (
      (evaluatedAngle >= 316 && evaluatedAngle <= 360) ||
      (evaluatedAngle >= 0 && evaluatedAngle <= 15)
    ) {
      setResult(0);
    } else if (evaluatedAngle >= 16 && evaluatedAngle <= 75) {
      setResult(1);
    } else if (evaluatedAngle >= 76 && evaluatedAngle <= 135) {
      setResult(2);
    } else if (evaluatedAngle >= 136 && evaluatedAngle <= 195) {
      setResult(3);
    } else if (evaluatedAngle >= 196 && evaluatedAngle <= 255) {
      setResult(4);
    } else if (evaluatedAngle >= 256 && evaluatedAngle <= 315) {
      setResult(5);
    }
  };

  //?? fast the wheel -- pending

  return (
    <>
      <div className="wheel-spin">
        <div className="spinBtn" onClick={startSpin}>
          spin
        </div>
        <div
          className={`wheel`}
          style={{
            transform: `rotate(${angle}deg)`,
            transition: `transform 3s ease-out`,
          }}
          ref={wheelTransition}
          onTransitionEnd={handleTransition}
        >
          {questions.map((question, index) => (
            <div
              key={index}
              className={`segment segment-${index + 1}`}
              style={{
                "--i": index + 1,
                "--clr": `hsl(${(index * 360) / questions.length}, 100%, 50%)`,
              }}
            >
              <span className={result === index ? "selected" : ""}>
                {question}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="Btn-container">
        <button onClick={startSpin} disabled={spinning}>
          {spinning ? "Spinning..." : "Spin the Wheel"}
        </button>
        {result !== null && (
          <p style={{ color: "whitesmoke" }}>
            Result: {questions[result]} (Segment {result + 1})
          </p>
        )}
      </div>
    </>
  );
};

export default WheelSpin;
