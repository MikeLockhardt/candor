import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text, TextInput, StatusBar } from 'react-native'
import { colors } from '@corcos/lib'
import { NavigationActions } from 'react-navigation'
import { Button } from '../../components'
import Context from '../../lib/context'
import myColors from '../../constants/colors';
import { Formik } from 'formik'
import { firebase } from '../../lib/firebase'


class LoginActivity extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: ''
        }
    }

    renderForm(store) {
        switch (store.currentActivity) {
            case 'signup':
                return <SignUp />
            case 'login':
                return <LogIn />
            case 'forgot':
                return <ForgotPass navigation={this.props.navigation} />
            default:
                return null;
        }
    }

    render() {
        return (
            <Context.Consumer>
                {store => {
                    return (
                        <View style={styles.container}>
                            <StatusBar backgroundColor={myColors.app_regular_white} barStyle="light-content" />
                            <View style={styles.logoContainer}>
                                <Image source={require('../../assets/logo.png')} style={styles.appLogo} />
                            </View>
                            <View style={{ flex: 1 }} />

                            {this.renderForm(store)}

                            {
                                store.currentActivity == 'login' &&
                                <TouchableOpacity onPress={() => {
                                    store.set('currentActivity', 'forgot');
                                    store.set('headerText', 'Recover Password');
                                }} style={styles.forgotPassText}>
                                    <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                                </TouchableOpacity>
                            }

                            {/* Mildly visible bar at the bottom */}
                            <View style={styles.bottomBar}></View>
                        </View>
                    )
                }}
            </Context.Consumer>)
    }
}

class WithData extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            // title: navigation.getParam('activity') == 'signup' ? 'Create Your Profile' : 'Sign In'
            headerTitle: <HeaderTitle />,
        };
    };

    render() {
        return (
            <Context.Consumer>
                {store => {
                    return <LoginActivity store={store} {...this.props} />
                }}
            </Context.Consumer>
        )
    }
}

class HeaderTitle extends React.Component {

    render() {
        return (
            <Context.Consumer>
                {store => {
                    return (
                        <Text
                            style={{
                                fontSize: 20,
                                // flex: 1,
                                // marginRight: '15%',
                                // textAlign: 'center',
                                // borderWidth: 1, borderColor: 'red'
                            }}>
                            {store.headerText ? store.headerText : ''}
                        </Text>
                    )
                }}
            </Context.Consumer>
        );
    }
}



class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: ''
        }
    }
    render() {
        return (
            <Context.Consumer>
                {store => {
                    return (
                        <View style={styles.formView}>
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
                                            <ErrorMessage value={this.state.error} />
                                            <TextInput
                                                placeholder='Email'
                                                autoCorrect={false}
                                                style={styles.input}
                                                onChangeText={v => props.handleChange('email')(v.toLowerCase())}
                                                onBlur={props.handleBlur('email')}
                                                value={props.values.email} />
                                            <TextInput
                                                secureTextEntry
                                                placeholder='Password'
                                                autoCorrect={false}
                                                style={styles.input}
                                                onChangeText={v => props.handleChange('password')(v)}
                                                onBlur={props.handleBlur('password')}
                                                value={props.values.password} />
                                            <TextInput
                                                placeholder='Email'
                                                autoCorrect={false}
                                                style={styles.input}
                                                onChangeText={v => props.handleChange('email')(v.toLowerCase())}
                                                onBlur={props.handleBlur('email')}
                                                value={props.values.email} />
                                            {/* <View style={{ height: 30 }} /> */}
                                            <Button onPress={props.handleSubmit} title='Create' />
                                            <TouchableOpacity onPress={() => {
                                                store.set('authState', 'logIn');
                                                store.set('currentActivity', 'login');
                                                store.set('headerText', 'Sign In');
                                            }} style={{ marginTop: 25 }}>
                                                <View style={[styles.links, { flexDirection: 'row', justifyContent: 'center' }]}>
                                                    <Text style={[styles.link, { color: myColors.text_secondaryGrey }]}>Or </Text><Text style={styles.link}>Sign In</Text>
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
    constructor(props) {
        super(props)
        this.state = {
            error: ''
        }
    }
    render() {
        return (
            <Context.Consumer>
                {store => {
                    return (
                        <View style={[styles.formView, { flex: 1 }]}>
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
                                            <ErrorMessage value={this.state.error} />
                                            <TextInput
                                                placeholder='Email'
                                                style={styles.input}
                                                onChangeText={v => props.handleChange('email')(v.toLowerCase())}
                                                onBlur={props.handleBlur('email')}
                                                value={props.values.email} />
                                            <TextInput
                                                secureTextEntry
                                                placeholder='Password'
                                                style={styles.input}
                                                onChangeText={v => props.handleChange('password')(v)}
                                                onBlur={props.handleBlur('password')}
                                                value={props.values.password} />
                                            {/* <View style={{ height: 30 }} /> */}
                                            <Button onPress={props.handleSubmit} title='Log In' />
                                            <TouchableOpacity onPress={() => {
                                                store.set('authState', 'signup');
                                                store.set('currentActivity', 'signup');
                                                store.set('headerText', 'Create Your Profile');
                                            }} style={{ marginTop: 25 }}>
                                                <View style={[styles.links, { flexDirection: 'row', justifyContent: 'center' }]}>
                                                    <Text style={[styles.link, { color: myColors.text_secondaryGrey }]}>Or </Text><Text style={styles.link}>Sign Up</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                            </Formik>
                            {/* <TouchableOpacity onPress={() => {
                                store.set('currentActivity', 'forgot');
                                store.set('headerText', 'Recover Password');
                            }} style={{ marginTop: '75%' }}>
                                <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                            </TouchableOpacity> */}
                        </View>
                    )
                }}
            </Context.Consumer>
        )
    }
}

class ForgotPass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: ''
        }
    }
    render() {
        return (
            <Context.Consumer>
                {store => {
                    return (
                        <View style={[styles.formView, { flex: 1 }]}>
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
                                            <ErrorMessage value={this.state.error} />
                                            <TextInput
                                                placeholder='Email'
                                                style={styles.input}
                                                onChangeText={v => props.handleChange('email')(v.toLowerCase())}
                                                onBlur={props.handleBlur('email')}
                                                value={props.values.email} />
                                            <TextInput
                                                secureTextEntry
                                                placeholder='New Password'
                                                style={styles.input}
                                                onChangeText={v => props.handleChange('password')(v)}
                                                onBlur={props.handleBlur('password')}
                                                value={props.values.password} />
                                            {/* <View style={{ height: 30 }} /> */}
                                            <Button
                                                onPress={() => {
                                                    this.props.navigation.navigate('RecoveryInfo');
                                                }}
                                                title='Recover Password' />
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

class ErrorMessage extends React.Component {
    render() {
        return (
            <View>
                <Text style={styles.error}>{this.props.value}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.app_regular_white,
        paddingTop: 280
    },
    logoContainer: {
        height: 30,
        width: 150,
        alignSelf: 'center'
    },
    appLogo: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover',
    },
    bottomBar: {
        width: 140,
        height: 3,
        backgroundColor: '#e5e5e5',
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 100
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
        // textDecorationLine: 'underline',
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
    },
    formView: {
        position: 'absolute',
        top: 0,
        width: '100%',
        padding: 25,
        marginTop: 10,
    },
    forgotPasswordText: {
        color: myColors.text_secondaryGrey,
        alignSelf: 'center',
    },
    forgotPassText: {
        alignSelf: 'center',
        marginBottom: 40,
    }
})

export default WithData;