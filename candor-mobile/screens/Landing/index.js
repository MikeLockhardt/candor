import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native'
import { colors } from '@corcos/lib'
import { NavigationActions } from 'react-navigation'
import { Button } from '../../components'
import Context from '../../lib/context'
import myColors from '../../constants/colors';


class Landing extends React.Component {

  componentDidUpdate() {
    // if the user is already logged in, skip the landing page and reset the stack
    // to have the Library component at the bottom of the stack.
    if (this.props.store.currentUser.uid) {
      this
        .props
        .navigation
        .reset([NavigationActions.navigate({ routeName: 'Library' })], 0)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.title}>Candor</Text> */}
        <StatusBar backgroundColor={myColors.app_cornflower_blue} barStyle="light-content" />
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.appLogo} />
        </View>
        <View style={{ flex: 1 }} />
        {/* <Button
          title='Sign up'
          onPress={() => this.props.store.set('authState', 'signUp')} />
        <TouchableOpacity onPress={() => this.props.store.set('authState', 'logIn')}>
          <View>
            <Text style={styles.logInText}>Log in</Text>
          </View>
        </TouchableOpacity> */}

        {/* Signup Button - White with AppBlue text */}
        <TouchableOpacity
          style={styles.btnSignup}
          onPress={() => {
            this.props.store.set('authState', 'signUp');
            this.props.store.set('currentActivity', 'signup');
            this.props.store.set('headerText', 'Create Your Profile');
            this.props.navigation.navigate('LoginActivity', { activity: 'signup' });
          }}>
          <Text style={{ fontSize: 18, color: myColors.app_cornflower_blue }}>Sign Up</Text>
        </TouchableOpacity>

        {/* Login Button - AppBlue with white text */}
        <TouchableOpacity
          style={[styles.btnSignIn]}
          onPress={() => {
            this.props.store.set('authState', 'logIn');
            this.props.store.set('currentActivity', 'login');
            this.props.store.set('headerText', 'Sign In');
            this.props.navigation.navigate('LoginActivity', { activity: 'login' });
          }}>
          <Text style={{ fontSize: 18, color: myColors.app_regular_white }}>Log In</Text>
        </TouchableOpacity>

        {/* Mildly visible bar at the bottom */}
        <View style={styles.bottomBar}></View>
      </View>
    )
  }
}

class WithData extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <Context.Consumer>
        {store => {
          return <Landing store={store} {...this.props} />
        }}
      </Context.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.app_cornflower_blue,
    paddingTop: 280
  },
  logInText: {
    color: colors.blue[500],
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 15
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    color: colors.blue[500]
  },
  logoContainer: {
    height: 31,
    width: 196,
    alignSelf: 'center'
  },
  appLogo: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
  },
  btnSignup: {
    marginBottom: 16,
    marginHorizontal: 25,
    borderRadius: 3,
    backgroundColor: myColors.app_regular_white,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnSignIn: {
    marginBottom: 68,
    marginHorizontal: 25,
    borderRadius: 3,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: myColors.app_regular_white,
    borderWidth: 0.5
  },
  bottomBar: {
    width: 140,
    height: 3,
    backgroundColor: '#5DA0EE',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 100
  }
})

export default WithData
