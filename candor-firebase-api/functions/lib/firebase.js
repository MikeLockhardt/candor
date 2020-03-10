const admin = require('firebase-admin')
const path = require('path')
const Firestore = require('firestore-rest')

// TODO change out the service account json file here
// if you don't have this file, get it from admin or generate a new one from
// the firebase console => project settings => service accounts => generate a new private key
var serviceAccount = require('../credentials/candor-90942-firebase-adminsdk-s2osl-883b28b3fc.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // TODO get the databaseURL from the web credentials and add it here
  databaseURL: 'https://candor-90942.firebaseio.com'
})

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, '../credentials/candor-90942-firebase-adminsdk-s2osl-883b28b3fc.json')
process.env.GCLOUD_PROJECT = 'candor-90942'

const db = admin.firestore()
const dbRest = new Firestore()

module.exports = {
  db,
  admin,
  dbRest
}
