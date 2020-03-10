import React from 'react'

/**
 * A component that is used to bind the current user the store using Firebase
 *
 * @param {function} store.setCurrentUser - must receive a `store` prop that has a `setCurrentUser` function
 * @param {Object} firebase - must receive an initialized `firebase` as a prop
 *
 * Render this alongside the top-level component of your app. Should only be rendered once.
 */
class AuthBindings extends React.Component {
  constructor (props) {
    super(props)
    this.authListener = this.authListener.bind(this)
    this.authListener(props.store)
    if (!props.firebase) {
      throw new Error('Must pass `firebase` as a prop to `AuthBindings`')
    }
  }

  authListener (store) {
    this.stateListener = this.props.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.setCurrentUser(user)
      } else {
        // user is not logged in

      }
    })
  }

  componentWillUnmount () {
    this.stateListener = undefined
    this.authListener = undefined
  }

  render () {
    return null
  }
}

export default AuthBindings
