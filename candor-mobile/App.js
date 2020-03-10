import React from 'react'
import { View } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import NavigationService from './lib/NavigationService'
import Context, { initialState } from './lib/context'
import { firebase } from './lib/firebase'

import {
  Provider,
  AuthBindings,
  AuthModal
} from './components'
import {
  Library,
  Landing,
  User,
  Profile,
  Player,
  LoginActivity,
  RecoveryInfo,
  Analytics
} from './screens'

// const styles = StyleSheet.create({
//   hamburger: {
//     color: config.bankSecondaryColor,
//     fontSize: 24,
//     marginRight: 15
//   }
// })

const AppNavigator = createStackNavigator({
  Library: { screen: Library },
  Landing: { screen: Landing },
  Profile: { screen: Profile },
  Player: { screen: Player },
  User: { screen: User },
  LoginActivity: { screen: LoginActivity },
  RecoveryInfo: { screen: RecoveryInfo },
  Analytics: { screen: Analytics },
  // Login: { screen: Login },
  // Transactions: { screen: Transactions }
}, {
    initialRouteName: 'Landing'
    // defaultNavigationOptions: {
    //   headerStyle: {
    //     backgroundColor: config.bankPrimaryColor
    //   },
    //   headerTintColor: config.bankSecondaryColor,
    //   headerTitleStyle: {
    //     fontWeight: 'bold'
    //   },
    //   title: config.bankName,
    //   headerRight: (
    //     <TouchableOpacity onPress={() => window.alert('Coming soon')}>
    //       <View>
    //         <Text style={styles.hamburger}>&#9776;</Text>
    //       </View>
    //     </TouchableOpacity>
    //   )
    // }
  })

const App = createAppContainer(AppNavigator)

class _App extends React.Component {
  render() {
    return (
      <Provider ref={this.provider} context={Context} initialState={initialState}>
        <Context.Consumer>
          {store => {
            return (
              <View style={{ flex: 1 }}>
                <AuthBindings firebase={firebase} store={store} />
                {/* Removed in favor of screen over modal as per design */}
                {/* <AuthModal isOpen={!!store.authState} /> */}
                <App ref={ref => { NavigationService.setTopLevelNavigator(ref) }} {...this.props} />
              </View>
            )
          }}
        </Context.Consumer>
      </Provider>
    )
  }
}

export default _App
