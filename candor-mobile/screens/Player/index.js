import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import Data from 'firestore-data'
import Slider from 'react-native-slider'

import { Context, initialState } from '../../lib/context'
import { db } from '../../lib/firebase'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playButton: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

// TODO
// 1. playback speed
// 2. play and pause?
// 3. view current location
// 4. jump +/- 30 seconds

class Player extends React.Component {
  onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.props.store.set('status', {
        isLoaded: status.isLoaded,
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: true
      })
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`)
      }
    }
  };

  async componentDidMount () {
    // partId specifies which piece of content within the overall piece of content is being played
    // passed from params on route
    const partId = this.props.navigation.getParam('partId', 'NO-ID')
    try {
      // check if there is already something loaded
      const status = await this.props.store.soundObject.getStatusAsync()
      // if there is already something loaded, dump it
      if (status.isLoaded !== false) {
        // https://docs.expo.io/versions/latest/sdk/av/#returns
        await this.props.store.soundObject.unloadAsync()
        // after unloading it, reset `status` to original state
        await this.props.store.set('status', initialState.status)
      }
      // set the status update callback
      await this.props.store.soundObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
      // load the piece of content
      await this.props.store.soundObject.loadAsync({ uri: this.props.item.content[partId] })
    } catch (err) {
      console.error('Failed to load ', err)
    }
  }

  async play () {
    try {
      await this.props.store.soundObject.playAsync()
    } catch (err) {
      console.error('error playing ', err)
    }
  }

  async pause () {
    try {
      await this.props.store.soundObject.pauseAsync()
    } catch (err) {
      console.error('error pausing', err)
    }
  }

  render () {
    if (!this.props.store.status.isLoaded) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.store.status.isPlaying ? this.pause() : this.play()}>
          <View style={styles.playButton}>
            <Text>{this.props.store.status.isPlaying ? 'Pause' : 'Play'}</Text>
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row' }}>
          <Text>Playback Speed</Text>
          <TouchableOpacity onPress={() => this.props.store.soundObject.setRateAsync(1, true)}>
            <View style={{ margin: 5, backgroundColor: '#CCCCCC', padding: 10 }}>
              <Text>1x</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.store.soundObject.setRateAsync(1.5, true)}>
            <View style={{ margin: 5, backgroundColor: '#CCCCCC', padding: 10 }}>
              <Text>1.5x</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.store.soundObject.setRateAsync(2, true)}>
            <View style={{ margin: 5, backgroundColor: '#CCCCCC', padding: 10 }}>
              <Text>2x</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Slider
          style={{ width: '80%' }}
          minimumValue={0}
          maximumValue={this.props.store.status.playbackInstanceDuration}
          value={this.props.store.status.playbackInstancePosition}
          onValueChange={value => this.props.store.soundObject.setPositionAsync(value)}
        />
        <View style={{ width: '80%', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text>{Math.round((this.props.store.status.playbackInstanceDuration - this.props.store.status.playbackInstancePosition) / 1000)} left</Text>
          <Text>{Math.round(this.props.store.status.playbackInstanceDuration / 1000)}</Text>
        </View>
      </View>
    )
  }
}

class WithData extends React.Component {
  static navigationOptions = {
    title: 'Player'
  }

  render () {
    // ids of item and specific part come from the route
    const itemId = this.props.navigation.getParam('itemId', 'NO-ID')

    return (
      <Context.Consumer>
        {store => {
          return (
            <Data query={db.collection('library').doc(itemId)}>
              {({ data: item, loading }) => {
                if (loading) return null
                return <Player store={store} item={item} {...this.props} />
              }}
            </Data>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default WithData
