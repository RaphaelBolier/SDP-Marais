import React, { Component } from 'react'

const PlayerContext = React.createContext()

class PlayerProvider extends Component {
  // Context state
  state = {
    player: {},
  }

  // Method to update state
  setPlayer = (player) => {
    this.setState((prevState) => ({ player }))
  }

  render() {
    const { children } = this.props
    const { player } = this.state
    const { setPlayer } = this

    return (
      <PlayerContext.Provider
        value={{
          player,
          setPlayer,
        }}
      >
        {children}
      </PlayerContext.Provider>
    )
  }
}

export default PlayerContext

export { PlayerProvider }