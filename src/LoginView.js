/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import FBSDK, {LoginButton, AccessToken} from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux'

import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCdsT8WvqLkYVTDThQJzKXe2uwukaxsy_8",
    authDomain: "platzimusic-1b9c9.firebaseapp.com",
    databaseURL: "https://platzimusic-1b9c9.firebaseio.com",
    projectId: "platzimusic-1b9c9",
    storageBucket: "platzimusic-1b9c9.appspot.com",
    messagingSenderId: "345336731283"
};
firebase.initializeApp(config);

const { FacebookAuthProvider } = firebase.auth()
const auth = firebase.auth()

export default class LoginView extends Component {

    authenticateUser(accessToken) {
        alert("inicio");
        const credential = FacebookAuthProvider.credential(accessToken)
        // Get reference to the currently signed-in user
        var prevUser = auth.currentUser;
        // Sign in user with another account
        auth.signInWithCredential(credential).then(function(user) {
        console.log("Sign In Success", user);
        var currentUser = user;
        // Merge prevUser and currentUser data stored in Firebase.
        // Note: How you handle this is specific to your application

        // After data is migrated delete the duplicate user
        return user.delete().then(function() {
            // Link the OAuth Credential to original account
            return prevUser.link(credential);
        }).then(function() {
            // Sign in with the newly linked credential
            return auth.signInWithCredential(credential);
        });
        }).catch(function(error) {
        console.log("Sign In Error", error);
        });
    }

    handleLoginFinished = (error, result) => {
        if (error) {
          console.error("login has error: " + error);
        } else if (result.isCancelled) {
          alert("login is cancelled.");
        } else {
          AccessToken.getCurrentAccessToken().then(() => {
            //Actions.home()
            alert("in");
            this.authenticateUser(data.accesToken)
          })
        }
    }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> 
            Bienvenidos a PlatziMusic
        </Text>

        <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={this.handleLoginFinished}
          onLogoutFinished={() => alert("logout.")}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 20
  }
});
