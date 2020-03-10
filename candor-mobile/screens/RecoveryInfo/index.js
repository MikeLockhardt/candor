import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Context from '../../lib/context'
import myColors from '../../constants/colors';


class RecoveryInfo extends React.Component {

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
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/recovery_info.png')} style={styles.appLogo} />
                </View>
                <View style={{ flex: 1,  }}>
                    <Text style={styles.textTitle}>Check your Email</Text>
                    <Text style={styles.textOther}>We've sent a link on your Email to confirm a new password!</Text>

                    <TouchableOpacity
                        style={styles.btnSignup}
                        onPress={() => {

                        }}>
                        <Text style={{ color: myColors.app_regular_white }}>{`Open Mail`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btnSignIn]}
                        onPress={() => {
                            this.props.navigation.navigate('Landing');
                        }}>
                        <Text style={{ color: myColors.text_secondaryGrey, textAlign: 'center' }}>{`Not now`}</Text>
                    </TouchableOpacity>
                </View>
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
                    return <RecoveryInfo store={store} {...this.props} />
                }}
            </Context.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.app_regular_white,
        paddingTop: '20%'
    },
    logoContainer: {
        aspectRatio: 1 / 1,
        width: '60%',
        alignSelf: 'center',
        
    },
    appLogo: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover',
    },
    btnSignup: {
        marginTop: 50,
        marginBottom: 16,
        marginHorizontal: 25,
        borderRadius: 3,
        backgroundColor: myColors.app_cornflower_blue,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnSignIn: {
        marginHorizontal: 25,
    },
    bottomBar: {
        width: 140,
        height: 3,
        backgroundColor: '#e5e5e5',
        alignSelf: 'center',
        borderRadius: 100,
        position: 'absolute',
        bottom: 0,
        marginBottom: 10
    },
    textTitle: {
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: '20%'
    },
    textOther: {
        textAlign: 'center',
        fontSize: 14,
        color: myColors.text_secondaryGrey,
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: '22%'
    }
})

export default WithData
