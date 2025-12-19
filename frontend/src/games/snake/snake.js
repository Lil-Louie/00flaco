import { Fragment, useRef, useState, useEffect } from 'react';
import Header from './pages/Header';
import GameBoard from './pages/GameBoard';
import PlayButton from './pages/PlayButton';
import { sizes } from './utils/dimensions';
import { Box } from '@mui/material';

function Snake() {

  const GameStatus = {
    READY: 'ready',
    RUNNING: 'running',
    PAUSED: 'paused',
    GAMEOVER: 'gameover',
  };
  
  const snake = useRef(new Array(sizes.boardSize)); // holds (r,c)
  const head = useRef(0);
  const tail = useRef(0);
  const freePool = useRef([]); // array of (r,c)
  const dir = useRef({ dr: 0, dc: 1 }); // current unit vector
  const lastMoveAt = useRef(performance.now());
  const [board, setBoard] = useState(() => initBoard(sizes.rows, sizes.columns));


  //Makes a new board with index 0 to board.length
  function initBoard(rows, cols) {
    const newBoard = [];
    let freepool_idx = 0;
    for (let i = 0; i < rows; i++) {
      newBoard[i] = [];
      for (let j = 0; j < cols; j++) {
        if (j === 0 || j === cols - 1 || i === 0 || i === rows - 1) {
          newBoard[i][j] = -1; // wall
        } else {
          newBoard[i][j] = freepool_idx; // free
          freepool_idx++;
        }
      }
    }
    return newBoard;
  }

  const [status, setStatus] = useState('ready');
  const [score, setScore] = useState(0);

  const initialFreeCells = (tempBoard) => {
    freePool.current = [];
    for (let i = 1; i < sizes.rows - 1; i++) {
      for (let j = 1; j < sizes.columns - 1; j++) {
        if (tempBoard[i][j] >= 0) {
          freePool.current.push({ row: i, col: j });
        }
      }
    }
  };

  function removeFromFreePool(temp, i, value) {
    const last = freePool.current.length - 1
    if (i !== last) {
        const removeCell = freePool.current[i]
        const swappedCell = freePool.current[last]
        freePool.current[last] = freePool.current[i]
        freePool.current[i] = swappedCell
        temp[swappedCell.row][swappedCell.col] = i
        temp[removeCell.row][removeCell.col] = value
    }
    freePool.current.pop()
    return temp
}

function addToFreePool( temp, cell) {
  freePool.current.push(cell)
  temp[cell.row][cell.col] = freePool.current.length - 1
  return temp
}

  function placeFood(temp) {
    if (freePool.current.length === 0) return temp
    const idx = Math.floor(Math.random() * freePool.current.length)
    const newFoodCell = freePool.current[idx]
    const fp_idx_of_food = temp[newFoodCell.row][newFoodCell.col]
    temp = removeFromFreePool(temp, fp_idx_of_food, -3)
    return temp;
  }

  function handleFood(temp) {
    setScore(prev => prev + 1);
    temp = placeFood(temp);
    return temp;
  }

  function setSnakeWithFood(temp) {

    let new_row = 9, new_col = 9;
    tail.current = 0;
    head.current = 2;

    for (let i = 0; i < 3; i++) {
      snake.current[i] = { row: new_row, col: new_col + i };
      const fp_idx_of_snake = temp[new_row][new_col + i];
      temp = removeFromFreePool(temp, fp_idx_of_snake, -2);
    }
    temp = placeFood(temp);
    return temp;

  }

  function clearBoard(){
    let tempBoard = initBoard(sizes.rows, sizes.columns);
    initialFreeCells(tempBoard);
    tempBoard = setSnakeWithFood(tempBoard);
    return tempBoard;
  }


  function startGame() {
    setStatus('running');
    setScore(0);
    dir.current = { dr: 0, dc: 1 };
    setBoard(clearBoard());
    lastMoveAt.current = performance.now();
  }

  function computeTickLength(score) {
    const base = 200; // ms per tick at score 0
    const speedUp = score * 5;
    const min = 60;
    return Math.max(base - speedUp, min);
  }

  function legalTurn(next) {
    return !(next.dr === -dir.current.dr && next.dc === -dir.current.dc);
  }

  function onKeyDown(e) {
    const next = mapKeyToVector(e.key);
    if (!next) return;
    if (legalTurn(next)) dir.current = next;
  }

  function mapKeyToVector(key) {
    switch (key) {
      case 'w':
      case 'W':
      case 'ArrowUp':
        return { dr: -1, dc: 0 };
      case 's':
      case 'S':
      case 'ArrowDown':
        return { dr: 1, dc: 0 };
      case 'a':
      case 'A':
      case 'ArrowLeft':
        return { dr: 0, dc: -1 };
      case 'd':
      case 'D':
      case 'ArrowRight':
        return { dr: 0, dc: 1 };
      default:
        return null;
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);


  useEffect(() => {
    if (status !== 'running') return;

    const TICK_MS = computeTickLength(score);
    const timer = setInterval(() => {
      const now = performance.now();
      if (now - lastMoveAt.current >= TICK_MS) {
        step()
      }
    }, 16)

    return () => clearInterval(timer);
  }, [status, score]);

  

  
  function step() {
    setBoard(prevBoard => {
      let temp = prevBoard.map(row => [...row]);

      const oldHead = snake.current[head.current];

      if (!oldHead) return prevBoard;
      const newHeadCell = { row: oldHead.row + dir.current.dr, col: oldHead.col + dir.current.dc };
      const newHeadValue = temp[newHeadCell.row][newHeadCell.col];

      //check if game over
      if (newHeadValue === undefined || newHeadValue === -1 || newHeadValue === -2) {
        setStatus('gameover');
        return prevBoard;
      }
      // If not game over, then continue the game
      head.current = (head.current + 1) % snake.current.length;
      snake.current[head.current] = newHeadCell;

      //If the snake ate food then 
      if (newHeadValue === -3) {
        temp = handleFood(temp);
      } else {
        temp = removeFromFreePool(temp, newHeadValue, -2);
        temp = addToFreePool(temp, snake.current[tail.current]);
        tail.current = (tail.current + 1) % snake.current.length;
      }
      console.log(temp)
      return temp;
    });
    lastMoveAt.current = performance.now();
  }

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 1,
          mt: 1,
        }}
      >
        <Header 
          title={
            status === 'gameover'
              ? 'Game Over!'
              : `Score: ${score}`
          }
        />

        <Box
          sx={{
            backgroundColor: 'blue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid black',
          }}
        >
          <GameBoard board={board} freePool={freePool} snake={snake} />

        </Box>
        {(status === 'ready' || status === 'gameover') && (
          <PlayButton title='Play Snake' onClick={startGame} />
          
        )}
      </Box>

    </Fragment>
  );
}

export default Snake;
