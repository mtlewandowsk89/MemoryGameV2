import React from 'react';
import '../App.css';
import GameTile from './tile.js';

class GameBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            difficulty: 2,
            timer: false,
            correctTiles: [],
            tilesClickedOn: [],
            won: false,
            tilesFound: 0,
            gameStarted: false,
            tiles: [],
            gridColumns: '',
            winMessage: ''
        }
        this.startGame = this.startGame.bind(this);
        this.setTileFound = this.setTileFound.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
    }

    startGame = () => {
        let correctTileStorage = [];
        if (!this.state.gameStarted) {
            this.setState({gameStarted: true});
            for (let i = 0; i < this.state.difficulty; i++) {
                let number = Math.floor(Math.random() * (this.state.difficulty * this.state.difficulty)) + 1;
                if (correctTileStorage.indexOf(number) < 0) {
                    correctTileStorage.push(number);              
                } else { 
                    i--;
                }
            }
            this.setState({
                correctTiles: correctTileStorage,
                timer: true
            });
            setTimeout(() => {
                this.setState({timer: false});
            }, 3000)
        }
    }

    setTileFound = (tileID) => {
        this.setState({
            tilesClickedOn: [...this.state.tilesClickedOn, tileID],
            tilesFound: this.state.tilesFound + 1
        }, () => {
            if (this.state.tilesFound === this.state.correctTiles.length) {
                this.setState({
                    won: true,
                    winMessage: <div className="win">Congratulations, you've found all the correct tiles!</div>
                });
            }
        });
        
    }

    resetGame = (e) => {
        this.setState({
            difficulty: e ? e.target.value : this.state.difficulty,
            timer: false,
            correctTiles: [],
            tilesFound: 0,
            won: false,
            gameStarted: false,
            tilesClickedOn: [],
            winMessage: '',
            tiles: [],
            gridColumns: ''
        }, () => {this.updateBoard()});
    }

    componentDidMount() {
        this.updateBoard();
    }

    updateBoard = () => {
        // update number of tiles
        let tempTiles = [];
        for (let i = 1; i <= (this.state.difficulty * this.state.difficulty); i++){
            tempTiles.push({
                index: i
            });
        }

        //update grid settings
        let tempGrid = '';
        for (let i = 0; i < this.state.difficulty; i++) {
            tempGrid += 'auto ';
        }

        this.setState({
            tiles: tempTiles,
            gridColumns: tempGrid
        })
    }
    
    render() {
        return(
            <div>
                <label className="difficultyLabel">
                    Change difficulty: 
                    <input type="range" min="2" max="20" value={this.state.difficulty} onChange={(e) => {this.resetGame(e)}} className="slider" id="myRange" />
                </label>
                <div className="difficulty">Difficulty: {this.state.difficulty}</div>
                <button className="startButton" onClick={() => this.startGame()}>Start</button><button className="resetButton" onClick={() => this.resetGame()}>Reset</button>
                <div className="gameBoard" style={{gridTemplateColumns: this.state.gridColumns}}>
                    {this.state.tiles.map(tile => <GameTile tileNumber={tile.index} correctTiles={this.state.correctTiles} won={this.state.won} tilesClickedOn={this.state.tilesClickedOn} timerRunning={this.state.timer} setTileFound={(tileID) => this.setTileFound(tileID)} key={tile.index}></GameTile>)}
                    {this.state.winMessage}
                </div> 
            </div>
        )
    }
}

export default GameBoard;