import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/storage'

export const config = {
  apiKey: 'AIzaSyAXZJJeyutHf6PV3G8-aPhKYcpxwlv6J-E',
  authDomain: 'candor-90942.firebaseapp.com',
  databaseURL: 'https://candor-90942.firebaseio.com',
  projectId: 'candor-90942',
  storageBucket: 'candor-90942.appspot.com',
  messagingSenderId: '420991832845'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

// https://forums.expo.io/t/process-env-node-env-is-flaky/7256
// use __DEV__ global instead of `process.env.NODE_ENV`
if (__DEV__) { // eslint-disable-line no-undef
  // https://stackoverflow.com/questions/50884534/how-to-test-functions-https-oncall-firebase-cloud-functions-locally
  firebase.functions().useFunctionsEmulator('http://localhost:5000')
} else {
  firebase.functions()
}

const db = firebase.firestore()

export {
  firebase,
  db
}
