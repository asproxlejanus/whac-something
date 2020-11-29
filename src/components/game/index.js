import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ScreenBreakPoints = {
  mobile: 720,
  desktop: 1024,
};

const Container = styled.div`
  width: 100%;
`;

const GameContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 80vh;
  max-width: 600px;
  max-height: 600px;
  border: 1px solid gainsboro;
  border-radius: 5px;
  margin: auto;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

const GameHeader = styled.div`
  height: 70px;
  background-color: white;
  margin: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

const GameDetails = styled.div`
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  > h1 {
    width: 100%;
    text-align: center;
    margin: 5px;
  }
  > .match-details {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;

    > ul {
      list-style: none;
      display: flex;
      margin: 0px;

      > li {
        margin: 0px 10px;
      }
    }
  }
`;

const GameSettings = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  align-self: center;
  font-size: 36px;
  text-align: center;
  color: gray;
`;

const Mole = styled.div`
  position: relative;
  background-color: pink;
  width: 40px;
  height: 60px;
  border-radius: 5px;
`;

const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 10;
`;

const GameModal = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  max-width: 350px;
  max-height: 300px;
  min-width: 230px;
  min-height: 130px;
  display: fleX;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
  border-radius: 6px;

  > h3 {
    border-bottom: 1px solid gray;
    width: 100%;
    text-align: center;
    padding: 10px;
  }

  > span {
    border: 1px solid green;
    border-radius: 5px;
    color: white;
    background-color: teal;
    padding: 10px 20px;
  }
  > span:hover {
    transform: scale(1.1);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button``;

const Game = () => {
  const [mole, MolePosition] = useState({ x: 0, y: 0 });
  const [containerDetails, setContainerDetails] = useState({ x: 0, y: 0 });
  const [timer, setTimer] = useState(30);
  const [points, setPoints] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [settings, showSettings] = useState(false);
  const [moleSpeed, setMoleSpeed] = useState(600);
  const [isGamingPlaying, setIsGamePlaying] = useState(false);

  const containerRef = useRef();
  const moleRef = useRef();

  const setDefaults = () => {
    MolePosition({ x: 0, y: 0 });
    setTimer(0);
    setPoints(0);
    setClicks(0);
  };

  useEffect(() => {
    const gametimer = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(gametimer);
  }, [timer]);

  useEffect(() => {
    let x = containerRef.current.clientWidth;
    let y = containerRef.current.clientHeight;
    setContainerDetails({ x, y });
  }, []);

  useEffect(() => {
    //TO DO Save this molTimeOut id on State, to use it later from return.
    const moleTimeOut = setTimeout(() => {
      timer > 0 && setMolePosition();
    }, moleSpeed);

    timer === 0 && gameEnded();

    return () => {
      timer > 0 && clearTimeout(moleTimeOut);
    };
  }, [mole]);

  const clickPosition = (e) => {
    if (timer === 0) return;
    setClicks(clicks + 1);
    let xClick = e.clientX;
    let yClick = e.clientY;

    let xMolePosition = moleRef.current.offsetLeft;
    let yMolePosition = moleRef.current.offsetTop;
    let moleHeight = moleRef.current.clientHeight;
    let moleWidth = moleRef.current.clientWidth;

    let onRangeX = xClick < xMolePosition + moleWidth && xClick > xMolePosition;
    let onRangeY =
      yClick < yMolePosition + moleHeight && yClick > yMolePosition;

    if (onRangeX && onRangeY) {
      setPoints(points + 1);
      setMolePosition();
    }
  };

  const setMolePosition = () => {
    let clientX = containerDetails.x;
    let clientY = containerDetails.y;
    let moleHeight = moleRef.current.clientHeight;
    let moleWidth = moleRef.current.clientWidth;

    let randonNumberX = Math.floor(
      Math.random() * (clientX - moleWidth - 0) + 0
    );
    let randonNumberY = Math.floor(
      Math.random() * (clientY - moleHeight - 0) + 0
    );
    return MolePosition({
      x: randonNumberX > 0 ? randonNumberX : 0,
      y: randonNumberY > 0 ? randonNumberY : 0,
    });
  };

  const startGame = () => {
    setDefaults();
    setTimer(30);
    setIsGamePlaying(true);
    setGameOver(false);
  };

  const gameEnded = () => {
    setGameOver(true);
    setIsGamePlaying(false);
  };

  const startGamePopUp = (
    <ModalContainer>
      <GameModal>
        <h1>Start Playing!</h1>
        <span onClick={() => startGame()}>Start</span>
      </GameModal>
    </ModalContainer>
  );

  const gameSettings = (
    <ModalContainer>
      <GameModal>
        <h3>Settings</h3>
        <form className="ui form">
          <div className="field">
            <label>Game timer</label>
            <input
              type="text"
              placeholder="time in seconds"
              value={timer}
              onChange={(e) => setTimer(e.target.value)}
            />
          </div>
          <br />

          <div className="field">
            <label>Game speed</label>
            <input
              type="text"
              placeholder="time en miliseconds"
              value={moleSpeed}
              onChange={(e) => setMoleSpeed(e.target.value)}
            />
          </div>
        </form>
        <button className="ui teal button" onClick={() => showSettings(false)}>
          Save
        </button>
      </GameModal>
    </ModalContainer>
  );
  return (
    <Container>
      {!isGamingPlaying && !gameOver && startGamePopUp}
      {settings && gameSettings}
      <GameHeader>
        <GameDetails>
          <h1>
            <i className="clock outline icon"></i>
            {timer}
          </h1>
          <div className="match-details">
            <ul>
              <li>
                <i class="trophy icon"></i>
                Points: {points}
              </li>
              <li>
                <i className="flag checkered icon"></i>
                Clicks: {clicks}
              </li>
              <li>
                <i class="bullseye icon"></i>Accuracy:
                {Math.round((points * 100) / clicks)
                  ? Math.round((points * 100) / clicks)
                  : "0"}
                %
              </li>
            </ul>
          </div>
        </GameDetails>
        <GameSettings onClick={() => showSettings(!settings)}>
          <h5 className="ui header">
            <i className="settings icon"></i>
          </h5>
        </GameSettings>
      </GameHeader>
      <GameContainer
        ref={containerRef}
        onClick={(e) => clickPosition(e)}
        clientHeight={containerDetails.y}
        clientWidth={containerDetails.x}
      >
        <Mole style={{ top: mole.y, left: mole.x }} ref={moleRef} />
      </GameContainer>
    </Container>
  );
};

export default Game;
