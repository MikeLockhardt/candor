import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { colors } from '@corcos/lib'

class Button extends React.Component {
  render () {
    const styles = StyleSheet.create({
      button: {
        backgroundColor: this.props.disabled ? '#CCCCCC' : this.props.color,
        borderRadius: 5,
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
      },
      text: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
      }
    })

    return (
      <TouchableOpacity disabled={this.props.disabled} onPress={() => this.props.onPress()}>
        <View style={{ ...styles.button, ...this.props.style }}>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

Button.defaultProps = {
  onPress: () => { },
  style: {},
  color: colors.blue[500],
  title: 'Submit'
}

export default Button
