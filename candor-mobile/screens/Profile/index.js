import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'
import Data from 'firestore-data'
import {
  NavigationActions
} from 'react-navigation'

import Context from '../../lib/context'
import { db } from '../../lib/firebase'

import {
  Button
} from '../../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  }
})

class Profile extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>{this.props.user.email}</Text>
        <Button title='Logout' onPress={() => {
          this.props.store.signOut()
          // after signout, go to landing and reset the stack
          // https://reactnavigation.org/docs/en/navigation-prop.html
          this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Landing' })], 0)
        }} />
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
            <Data query={db.collection('users').doc(store.currentUser.uid)}>
              {({ data: user, loading }) => {
                return <Profile store={store} user={user} {...this.props} />
              }}
            </Data>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default WithData
