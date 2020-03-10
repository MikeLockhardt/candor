import React from 'react'
import { Audio } from 'expo-av'

export const initialState = {
  currentUser: {},
  // NOTE: We have the sound object live at the top level so we can access controls from
  // any page and to prevent more than one audio file from playing at the same time.
  soundObject: new Audio.Sound(),
  status: { isLoaded: false }, // the status of the audio content, set in Player component
  authState: null // null, 'signUp', 'logIn', 'forgot' (default: null),
}

export const Context = React.createContext(initialState)

export default Context
