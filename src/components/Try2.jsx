import React, { useState, useRef, useEffect } from "react";
import "./Wheel-spin.css";

const WheelSpin = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef();

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

    const rotations = 10; // Number of full rotations
    const segments = 6; // Number of segments
    const segmentAngle = 360 / segments;

    const wheel = wheelRef.current;

    // Clear any existing transitions and reset the transform
    wheel.style.transition = "none";
    wheel.style.transform = "rotate(0deg)";

    // Calculate a random segment to stop at
    const randomSegment = Math.floor(Math.random() * segments);

    // Calculate the target rotation angle
    const targetRotation = rotations * 360 + randomSegment * segmentAngle;

    // Apply the rotation and start the animation
    wheel.style.transition = `transform 5s cubic-bezier(0.25, 1, 0.5, 1)`;
    wheel.style.transform = `rotate(${targetRotation}deg)`;

    // Clear the result
    setResult(null);
  };

  useEffect(() => {
    if (spinning) {
      const wheel = wheelRef.current;

      // Add a transitionend event listener to determine the final rotation angle
      wheel.addEventListener("transitionend", () => {
        const style = window.getComputedStyle(wheel);
        const transform = style.getPropertyValue("transform");
        const values = transform.split("(")[1].split(")")[0].split(",");
        const finalRotation = Math.round(
          Math.atan2(values[1], values[0]) * (180 / Math.PI)
        );

        // Calculate the result based on the final rotation angle
        const normalizedRotation = (finalRotation + 360) % 360;
        const stoppedSegment = Math.floor(
          normalizedRotation / (360 / segments)
        );

        setResult(stoppedSegment);
        setSpinning(false);
        console.log(result + 1)

        // Remove the transitionend event listener to avoid multiple calls
        wheel.removeEventListener("transitionend");
      });
    }
  }, [spinning]);

  return (
    <div className="wheel-spin" onClick={startSpin}>
      <div className={`wheel ${spinning ? "spin" : ""}`} ref={wheelRef}>
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
      <div className="Btn-container">
        <button onClick={startSpin} className={spinning ? "selected" : ""}>
          {spinning ? "Spinning..." : "Spin the Wheel"}
        </button>
        {result !== null && <p>Result: Segment {result + 1}</p>}
      </div>
    </div>
  );
};

export default WheelSpin;
