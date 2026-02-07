"use client";
import { useState, useEffect, useCallback, useRef } from 'react';

const LifeCells = initCells(30, 30,0);
const ExempleOne = initCells(30,30,1);
const ExempleTwo = initCells(30, 30,2);
const ExempleThree = initCells(30, 30,3);

function initCells(rows: number, cols: number, seed: number): boolean[][] {
    const cells = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));
    if (seed === 0) {return cells;}
    if (seed === 1) {
        cells[5][3] = true;
        cells[5][4] = true;
        cells[5][5] = true;
        cells[4][14] = true;
        cells[5][14] = true;
        cells[6][14] = true;

        cells[11][9] = true;
        cells[11][10] = true;
        cells[11][11] = true;
        cells[10][10] = true;
        cells[12][10] = true;
    }
    else if (seed === 2) {
        cells[1][2] = true;
        cells[2][2] = true;
        cells[3][2] = true;
        cells[2][0] = true;
        cells[3][1] = true;
    }
    else if (seed === 3) {
        cells[2][0] = true;
        cells[4][0] = true;
        cells[2][3] = true;
        cells[3][4] = true;
        cells[4][4] = true;
        cells[5][4] = true;
        cells[5][3] = true;
        cells[5][2] = true;
        cells[5][1] = true;

        cells[10][0] = true;
        cells[12][0] = true;
        cells[10][3] = true;
        cells[11][4] = true;
        cells[12][4] = true;
        cells[13][4] = true;
        cells[13][3] = true;
        cells[13][2] = true;
        cells[13][1] = true;

        cells[18][0] = true;
        cells[20][0] = true;
        cells[18][3] = true;
        cells[19][4] = true;
        cells[20][4] = true;
        cells[21][4] = true;
        cells[21][3] = true;
        cells[21][2] = true;
        cells[21][1] = true;
    }

    return cells;
}

const Cell = ({ alive, onClick }: { alive: boolean; onClick: () => void }) => {
  return (
    <div className={`md:p-4 p-2 cell ${alive ? 'alive' : 'dead'}`} onClick={onClick}/>
  );
}

function Board({ cells }: { cells: boolean[][] }) {

    function handleCellClick(rowIndex: number, colIndex: number) {
        cells[rowIndex][colIndex] = !cells[rowIndex][colIndex];
        console.log(`Cell at (${rowIndex}, ${colIndex}) toggled`);
    }

  return (
    <div className="grid grid-cols-20 gap-0 border border-red-500">

      {cells.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} alive={cell} onClick={() => handleCellClick(rowIndex, colIndex)} />
        ))
      ))}
    </div>
  );
}

function countAliveNeighbors(cells: boolean[][], r: number, c: number) {
    const rows = cells.length;
    const cols = cells[0].length;
    let count = 0;  
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                if (cells[nr][nc]) count++;
            }
        }
    }
    return count;
}

function updateCells(cells: boolean[][]) {
    const rows = cells.length;
    const cols = cells[0].length;
    const newCells = cells.map(row => [...row]);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const aliveNeighbors = countAliveNeighbors(cells, r, c);
            if (cells[r][c]) {
                newCells[r][c] =  aliveNeighbors === 2 || aliveNeighbors === 3;
            } else {
                newCells[r][c] = aliveNeighbors === 3;
            }
        }
    }
    return newCells;
}

const Grid = () => {
    const [cells, setCells] = useState(LifeCells);
    const [setting,setSetting] = useState(0);
    const [running, setRunning] = useState(false);
    const [speed, setSpeed] = useState(100);
    const timeRef = useRef<NodeJS.Timeout | null>(null);

    const runSimulation = useCallback(() => {
    if (!running) return;

    setCells((currentGrid) => {
        const newGrid = updateCells(currentGrid);
        return newGrid;
    });
    }, [running]);

           
   useEffect(() => {
    if (running) {
        timeRef.current = setInterval(() => {
        runSimulation();
    }, speed );
    } else if (timeRef.current) {
        clearInterval(timeRef.current as any);
    }
    return () => clearInterval(timeRef.current as any);
  }, [runSimulation,running, speed]);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
        const newCells = cells.map(row => [...row]);
        newCells[rowIndex][colIndex] = !cells[rowIndex][colIndex];
        setCells(newCells);
    }

    // Gestionnaire pour changer la vitesse
    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(Number(e.target.value));
    };

  return (
    <div className="flex flex-col items-center justify-center ">
        <div className='flex flex-wrap gap-8 sm:flex-row mb-4'>
            <button onClick={() => setRunning(!running)} className="flex px-4 py-2 bg-blue-500 text-white rounded">   {running ? 'Stop' : 'Start'}</button>
            <button onClick={() => {setCells(LifeCells); setSetting(0)}} className="flex px-4 py-2 bg-red-500 text-white rounded"> Reset</button>
            <button onClick={() => {setCells(ExempleOne); setSetting(1)}} className="flex px-4 py-2 bg-green-500 text-white rounded">Exemple 1</button>
            <button onClick={() => {setCells(ExempleTwo); setSetting(2)}} className="flex px-4 py-2 bg-yellow-500 text-white rounded">Example 2</button>
            <button onClick={() => {setCells(ExempleThree); setSetting(3)}} className="flex px-4 py-2 bg-purple-500 text-white rounded">Example 3</button>
            <div className="flex px-4 py-2">
                <label htmlFor="speed">Vitesse (ms) : </label>
                    <input
                        type="range"
                        id="speed"
                        min="50"
                        max="1000"
                        step="50"
                        value={speed}
                        onChange={handleSpeedChange}
                />
                <span>{speed} ms</span>
            </div>
        </div>
        <div className='text-center'>
            {running ? <div className="text-green-600 font-bold mb-4">Simulation en cours...</div> : <div className="text-red-600 font-bold mb-4">Simulation en pause</div>}
                {
                setting === 0 ? <div className=" mb-4"> Cliquez sur une cellule pour la faire changer d'état, puis appuyez sur "Start" pour voir l'évolution.</div> :
                setting === 1 ? <div className=" mb-4">Exemple 1 : Des "blinker" (oscillateurs)</div> :
                setting === 2 ? <div className=" mb-4">Exemple 2 : Un simple planneur</div> :
                setting === 3 ? <div className=" mb-4">Exemple 3 : Plusieurs "spaceship" (vaisseau spatial)</div> :
                null

            } 
        </div>
        <div className="grid grid-cols-30 gap-0 border border-red-500">

        {cells.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
            <Cell 
                key={`${rowIndex}-${colIndex}`} 
                alive={cell} 
                onClick={() => handleCellClick(rowIndex, colIndex)} 
            />
            ))
        ))} 
        </div>
    </div>
  );
}

export default function GameOfLife() {
    return (
        <Grid />
    );
}