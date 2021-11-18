import styles from "./bjj_score.module.css";

import { useState, useEffect } from "react";

//IBJJF Official Rules
const POINT_VALUES = {
  takeDown: 2,
  sweep: 2,
  kneeOnBelly: 2,
  pass: 3,
  mount: 4,
  back: 4,
  penalty: -1,
  advantage: 0.5,
};

function toDisplayTime(s) {
  var date = new Date(null);
  date.setSeconds(s);
  return date.toISOString().substr(14, 5);
}

export default function Scoreboard() {
  const [aScore, setAScore] = useState(0);
  const [bScore, setBScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [clockRunning, setClockRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (clockRunning) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!clockRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [clockRunning, seconds]);

  return (
    <div className={styles.container}>
      <div
        className={styles.timer}
        onClick={() => {
          setSeconds(0);
          setClockRunning(!clockRunning);
        }}
      >
        {toDisplayTime(seconds)}
      </div>
      <div className={styles.scoreBoard}>
        <div className={styles.scoreA}>{aScore}</div>
        <div className={styles.scoreB}>{bScore}</div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.competitor}>
          <button onClick={() => setAScore(aScore + POINT_VALUES.takeDown)}>
            Take Down
          </button>
          <button onClick={() => setAScore(aScore + POINT_VALUES.sweep)}>
            Sweep
          </button>
          <button onClick={() => setAScore(aScore + POINT_VALUES.kneeOnBelly)}>
            Knee on Belly
          </button>
          <button onClick={() => setAScore(aScore + POINT_VALUES.pass)}>
            Pass
          </button>
          <button onClick={() => setAScore(aScore + POINT_VALUES.mount)}>
            Mount
          </button>
          <button onClick={() => setAScore(aScore + POINT_VALUES.back)}>
            Back
          </button>
          <button
            className={styles.penalty}
            onClick={() => setAScore(aScore + POINT_VALUES.penalty)}
          >
            Penalty
          </button>
          <button onClick={() => setAScore(aScore + POINT_VALUES.advantage)}>
            Advantage
          </button>
        </div>
        <div className={styles.competitor}>
          <button onClick={() => setBScore(bScore + POINT_VALUES.takeDown)}>
            Take Down
          </button>
          <button onClick={() => setBScore(bScore + POINT_VALUES.sweep)}>
            Sweep
          </button>
          <button onClick={() => setBScore(bScore + POINT_VALUES.kneeOnBelly)}>
            Knee on Belly
          </button>
          <button onClick={() => setBScore(bScore + POINT_VALUES.pass)}>
            Pass
          </button>
          <button onClick={() => setBScore(bScore + POINT_VALUES.mount)}>
            Mount
          </button>
          <button onClick={() => setBScore(bScore + POINT_VALUES.back)}>
            Back
          </button>
          <button
            className={styles.penalty}
            onClick={() => setBScore(bScore + POINT_VALUES.penalty)}
          >
            Penalty
          </button>
          <button onClick={() => setBScore(bScore + POINT_VALUES.advantage)}>
            Advantage
          </button>
        </div>
      </div>
      <button
        className={styles.reset}
        onClick={() => {
          setAScore(0);
          setBScore(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}
