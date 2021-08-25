import React from 'react';
import '../App.css';

class GameTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {classes: ''};
        this.checkTile = this.checkTile.bind(this);
    }

    checkTile = () => {
        if (!this.props.timerRunning && this.props.correctTiles.length && !this.props.won && (this.props.tilesClickedOn.indexOf(this.props.tileNumber) < 0)) {
            if (this.props.correctTiles.indexOf(this.props.tileNumber) > -1) {
                this.setState({classes: 'correctTile'});
                this.props.setTileFound(this.props.tileNumber);
            } else {
                this.setState({classes: 'wrongTile'});
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.timerRunning !== prevProps.timerRunning) {
            if (this.props.timerRunning && this.props.correctTiles.indexOf(this.props.tileNumber) > -1 && this.state.classes !== 'previewTile') {
                this.setState({classes: 'previewTile'});
            } else if ((!this.props.timerRunning && (this.state.classes !== 'correctTile' && this.state.classes !== 'wrongTile')) || !this.props.correctTiles.length){
                this.setState({classes: ''});
            }
        }
    }

    render() {
        return(
            <div className={`tile ${this.state.classes}`} onClick={() => this.checkTile()}></div>
        )
    }
}

export default GameTile;