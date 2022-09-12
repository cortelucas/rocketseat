import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface ButtonProps {
  title: string
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello React Native
      </Text>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.test}>Caralho moleque</Text>
        <StatusBar style='auto' backgroundColor='#cecece'></StatusBar>
      </View>
      <View>
        <Button title='Issaê'/>
      </View>
    </View>
  )
}

function Button({ title }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.buttonOp}>
      <Text>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#633bbc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    color: '#cecece'
  },
  title: {
    color: '#cecece',
    fontSize: 40
  },
  buttonOp: {
    padding: 22,
    border: '2px'
  }
})
