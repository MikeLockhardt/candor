import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'

import Context from '../../lib/context'
import { db } from '../../lib/firebase'

import {
  Data
} from '../../components'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class User extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Foobar?</Text>
      </View>
    )
  }
}

class WithData extends React.Component {
  render () {
    return (
      <Context.Consumer>
        {store => {
          if (!store.currentUser.uid) return null
          return (
            <Data query={db.collection('users').doc(this.props.navigation.state.params.userId)}>
              {({ data: user, loading }) => {
                return <User store={store} user={user} {...this.props} />
              }}
            </Data>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default WithData
