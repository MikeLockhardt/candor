import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native'
import Modal from 'react-native-modal'
import { Formik } from 'formik'
import {
  colors
} from '@corcos/lib'

import Context from '../../lib/context'
import { firebase } from '../../lib/firebase'

import {
  Button
} from '../../components'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    position: 'relative'
  },
  close: {
    minHeight: 50,
    minWidth: 50,
    position: 'absolute',
    top: 0,
    right: 0
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey[300],
    padding: 10,
    borderRadius: 5,
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    color: colors.grey[600],
    marginBottom: 10
  },
  link: {
    fontSize: 16,
    color: colors.blue[500],
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  links: {
    marginTop: 15
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: colors.grey[800],
    marginBottom: 30
  },
  error: {
    color: colors.red[700],
    fontSize: 16
  }
})

class ErrorMessage extends React.Component {
  render () {
    return (
      <View>
        <Text style={styles.error}>{this.props.value}</Text>
      </View>
    )
  }
}

class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    }
  }

  render () {
    return (
      <Context.Consumer>
        {store => {
          return (
            <View style={{ marginTop: 50 }}>
              <Formik
                onSubmit={async ({ email, password }) => {
                  try {
                    await firebase.auth().createUserWithEmailAndPassword(email, password)
                  } catch (err) {
                    this.setState({ error: err.message })
                  }
                }}
                initialValues={{ email: '', password: '' }}>
                {props => {
                  return (
                    <View>
                      <Text style={styles.title}>Sign Up</Text>
                      <ErrorMessage value={this.state.error} />
                      <Text style={styles.label}>Email</Text>
                      <TextInput
                        placeholder='E.g. john.smith@gmail.com'
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={v => props.handleChange('email')(v.toLowerCase())}
                        onBlur={props.handleBlur('email')}
                        value={props.values.email} />
                      <Text style={styles.label}>Password</Text>
                      <TextInput
                        secureTextEntry
                        placeholder='E.g. ••••••••••'
                        autoCorrect={false}
                        style={styles.input}
                        onChangeText={v => props.handleChange('password')(v)}
                        onBlur={props.handleBlur('password')}
                        value={props.values.password} />
                      <View style={{ height: 30 }} />
                      <Button onPress={props.handleSubmit} title='Submit' />
                      <TouchableOpacity onPress={() => store.set('authState', 'logIn')}>
                        <View style={styles.links}>
                          <Text style={styles.link}>Already have an account? Log in</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                }}
              </Formik>
            </View>
          )
        }}
      </Context.Consumer>
    )
  }
}

class LogIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: ''
    }
  }

  render () {
    return (
      <Context.Consumer>
        {store => {
          return (
            <View style={{ marginTop: 50 }}>
              <Formik
                onSubmit={async ({ email, password }) => {
                  try {
                    await firebase.auth().signInWithEmailAndPassword(email, password)
                  } catch (err) {
                    this.setState({ error: err.message })
                  }
                }}
                initialValues={{ email: '', password: '' }}>
                {props => {
                  return (
                    <View>
                      <Text style={styles.title}>Log in</Text>
                      <ErrorMessage value={this.state.error} />
                      <Text style={styles.label}>Email</Text>
                      <TextInput
                        placeholder='E.g. john.smith@gmail.com'
                        style={styles.input}
                        onChangeText={v => props.handleChange('email')(v.toLowerCase())}
                        onBlur={props.handleBlur('email')}
                        value={props.values.email} />
                      <Text style={styles.label}>Password</Text>
                      <TextInput
                        secureTextEntry
                        placeholder='E.g. ••••••••••'
                        style={styles.input}
                        onChangeText={v => props.handleChange('password')(v)}
                        onBlur={props.handleBlur('password')}
                        value={props.values.password} />
                      <View style={{ height: 30 }} />
                      <Button onPress={props.handleSubmit} title='Submit' />
                      <TouchableOpacity onPress={() => store.set('authState', 'signUp')}>
                        <View style={styles.links}>
                          <Text style={styles.link}>Don't have an account? Sign up</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                }}
              </Formik>
            </View>
          )
        }}
      </Context.Consumer>
    )
  }
}

const renderModalContent = (props, store) => {
  if (store.currentUser.uid) {
    return (
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity onPress={() => store.set('authState', null)}>
          <View style={styles.close}>
            <Text style={{ fontSize: 42 }}>x</Text>
          </View>
        </TouchableOpacity>
        <Text>Logged in as {store.currentUser.email}</Text>
        <Button title='Log out' onPress={async () => { await store.signOut(); props.navigation.navigate('Landing') }} />
      </View>
    )
  }
  if (store.authState === 'logIn') return <LogIn {...props} />
  return <SignUp {...props} />
}

class AuthModal extends React.Component {
  render () {
    return (
      <Context.Consumer>
        {store => {
          return (
            <Modal isVisible={this.props.isOpen}>
              <View style={styles.container}>
                <TouchableOpacity onPress={() => store.set('authState', null)}>
                  <View style={styles.close}>
                    <Text style={{ fontSize: 42 }}>x</Text>
                  </View>
                </TouchableOpacity>
                {renderModalContent(this.props, store)}
              </View>
            </Modal>
          )
        }}
      </Context.Consumer>
    )
  }
}

AuthModal.defaultProps = {
  isOpen: false
}

export default AuthModal
