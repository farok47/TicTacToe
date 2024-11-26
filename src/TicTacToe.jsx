import React, { useEffect, useState } from "react";
import "./index.css";

function Square({ value, onClick }) {
  return (
    <button onClick={onClick} className="squares">
      {value}{" "}
    </button>
  );
}
function TicTacToe() {
  const [squares, setsquares] = useState(Array(9).fill(""));
  const [isxiturn, setisxiturn] = useState(true);
  const [status, setstatus] = useState("");

  function getwinner(squares) {
    const winnigpaterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winnigpaterns.length; i++) {
      const [x, y, z] = winnigpaterns[i];
      if (squares[x] && squares[x] === squares[y] && squares[x] === squares[z])
        return squares[x];
    }
    return null;
  }

  function handleclick(getcurrevtsquare) {
    let cpysquares = [...squares];
    if (getwinner(cpysquares) || cpysquares[getcurrevtsquare]) return;
    cpysquares[getcurrevtsquare] = isxiturn ? "x" : "o";
    setisxiturn(!isxiturn);
    setsquares(cpysquares);
  }

  useEffect(() => {
    if (!getwinner(squares) && squares.every((item) => item !== "")) {
      setstatus("this is a draw please restart the game");
      console.log(squares);
    } else if (getwinner(squares)) {
      setstatus(`${getwinner(squares)} is the winner please restart the game`);
    } else {
      setstatus(`the next player is ${isxiturn ? "X" : "O"}`);
    }
  }, [isxiturn, squares]);
  function handlerestart(){
    setisxiturn(true)
    setsquares(Array(9).fill(""))
  }

  return (
    <div className="container">
      <div className="row">
        <Square value={squares[0]} onClick={() => handleclick(0)} />
        <Square value={squares[1]} onClick={() => handleclick(1)} />
        <Square value={squares[2]} onClick={() => handleclick(2)} />
      </div>

      <div className="row">
        
        <Square value={squares[3]} onClick={() => handleclick(3)} />
        <Square value={squares[4]} onClick={() => handleclick(4)} />
        <Square value={squares[5]} onClick={() => handleclick(5)} />
      </div>

      <div className="row">
        <Square value={squares[6]} onClick={() => handleclick(6)} />
        <Square value={squares[7]} onClick={() => handleclick(7)} />
        <Square value={squares[8]} onClick={() => handleclick(8)} />
      </div>
      <h1>{status}</h1>
      <button onClick={handlerestart}>restart</button>
    </div>
  );
}

export default TicTacToe;
