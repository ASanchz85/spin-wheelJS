import "./Wheel-spin.css";
import React, { useState } from "react";

const WheelSpin = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const questions = [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5",
    "Question 6",
  ];

  const startSpin = () => {
    if (spinning) return;

    setSpinning(true);

    // Simulate a random rotation duration (between 3 and 5 seconds)
    const rotationDuration = Math.floor(Math.random() * 3 + 3) * 1000;
    const rotationAngle = Math.floor(Math.random() * 360); // Random initial angle

    const wheel = document.querySelector(".wheel");
    wheel.style.transition = `transform ${
      rotationDuration / 1000
    }s ease-in-out`;
    wheel.style.transform = `rotate(${rotationAngle + 360 * 10}deg)`; // ??Rotate 10 times and then to the result

    setTimeout(() => {
      const wheelAngle = rotationAngle % 360;
      const segmentAngle = 360 / 6; // Six segments
      const resultIndex = Math.floor(wheelAngle / segmentAngle);
      setResult(resultIndex);

      setSpinning(false);
    }, rotationDuration);
  };

  return (
    <>
      <div className="wheel-spin">
        <div className="spinBtn" onClick={startSpin}>spin</div>
        <div className={`wheel ${spinning ? "spin" : ""}`}>
          {questions.map((question, index) => (
            <div
              key={index}
              className={`segment segment-${index + 1}`}
              style={{
                "--i": index + 1,
                "--clr": `hsl(${(index * 360) / questions.length}, 100%, 50%)`,
              }}
            >
              <span className={result === index ? "selected" : ""}>{question}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="Btn-container">
        <button onClick={startSpin} disabled={spinning}>
          {spinning ? "Spinning..." : "Spin the Wheel"}
        </button>
        {result !== null && (
          <p>
            Result: {questions[result]} (Segment {result + 1})
          </p>
        )}
      </div>
    </>
  );
};

export default WheelSpin;
