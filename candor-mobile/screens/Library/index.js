import React from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text
} from 'react-native'
import Data from 'firestore-data'
import {
  colors
} from '@corcos/lib'

import Context from '../../lib/context'
import { db } from '../../lib/firebase'
import NavigationService from '../../lib/NavigationService'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: (item) => ({
    borderBottomColor: colors.grey[400],
    borderBottomWidth: 1,
    opacity: item.free ? 1 : 0.5
  })
})

class ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onPress = (item) => {
    if (!item.free) {
      window.alert('Purchase premium for access to all content.')
    } else {
      if (this.state[item.id] === undefined) {
        // if the item is free, show the opened verion with parts visible
        this.setState({ [item.id]: true })
      } else {
        this.setState({ [item.id]: !this.state[item.id] })
      }
    }
  }

  render() {
    return (
      // <TouchableOpacity key={this.props.item.id} onPress={() => this.props.navigation.push('Player', { itemId: this.props.item.id })}>
      // if it has multiple items, expand. otherwise route.
      <View style={styles.item(this.props.item)}>
        <TouchableOpacity key={this.props.item.id} onPress={() => this.onPress(this.props.item)}>
          <View style={{ padding: 20 }}>
            <Text>{this.props.item.title}</Text>
          </View>
        </TouchableOpacity>

        <View style={this.state[this.props.item.id] ? { display: 'flex', paddingTop: 20 } : { display: 'none' }}>
          {this.props.item.content && Object.keys(this.props.item.content)
            .map(key => ({
              key,
              value: this.props.item.content[key]
            }))
            .map(({ key, value }) => {
              return (
                <TouchableOpacity key={`part-${key}-${this.props.item.id}`} onPress={() => this.props.navigation.push('Player', { itemId: this.props.item.id, partId: Number(key) })}>
                  <View style={{ padding: 20 }}>
                    <Text>Part {Number(key) + 1}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
        </View>
      </View>
    )
  }
}

/**
 * This component shows the list of topics that are covered by Candor. Each item in the list is
 * selectable and brings the user to the player.
 */
class Library extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ListItem key={item.id} item={item} {...this.props} />}
          data={Object.keys(this.props.users).map(key => this.props.users[key])} />
      </View>
    )
  }
}

class WithData extends React.Component {
  static navigationOptions = {
    title: 'Library',
    headerRight: (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => NavigationService.navigate('Profile')}>
          <View style={{ marginRight: 15 }}>
            <Text style={{ color: colors.blue[500] }}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationService.navigate('Analytics')}>
          <View style={{ marginRight: 15 }}>
            <Text style={{ color: colors.blue[500] }}>Analytics</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <Context.Consumer>
        {store => {
          return (
            <Data query={db.collection('library')}>
              {({ data: users, loading }) => {
                if (loading) return null
                return <Library store={store} users={users} {...this.props} />
              }}
            </Data>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default WithData
