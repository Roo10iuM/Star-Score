import React, { useRef, useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet, Image, ImageBackground, TouchableHighlight, Dimensions, StatusBar, TouchableOpacity } from "react-native";



const Player = (props: any) => {
  const name = useRef();

  return (
    <View style={styles.player}>
      <TextInput
        style={styles.playerName}
        placeholder={props.placeholder}
        placeholderTextColor='white'
        maxLength={9}
        value={props.name}
        onChangeText={newText => props.onChangeName(newText)}
        onEndEditing={() => props.onChangeName(props.name.trim())}
      />

      <Text style={styles.health}>
        {props.health - (parseInt(props.damage) || 0)}
      </Text>

      <View style={styles.inde}>
        <TouchableOpacity
          style={styles.indebutton}
          onPress={() => {
            props.onChangeHealth(props.health - 1)
          }}
          activeOpacity={0.7}
        >
          <Image style={{ width: 70, height: 70, flex: 1, resizeMode: 'contain' }} source={require('../assets/images/hpdec.png')} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.indebutton}
          onPress={() => {
            props.onChangeHealth(props.health + 1)
          }}
          activeOpacity={0.7}
        >
          <Image style={{ width: 95, height: 95, flex: 1, resizeMode: 'contain' }} source={require('../assets/images/hpinc.png')} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.damageInput}
        placeholder="Type damage here"
        placeholderTextColor="white"
        onChangeText={newText => props.onChangeDamage(newText)}
        value={props.damage}
        inputMode='decimal'
      />
    </View>
  )
}

const Health = (props: any) => {
  const [playerOneName, setPlayerOneName] = useState('Artem');
  const [playerOneHealth, setPlayerOneHealth] = useState(50);
  const [playerOneDamage, setPlayerOneDamage] = useState('');

  const [playerTwoName, setPlayerTwoName] = useState('Danil');
  const [playerTwoHealth, setPlayerTwoHealth] = useState(50);
  const [playerTwoDamage, setPlayerTwoDamage] = useState('');

  const [curTurn, setCurTurn] = useState(0);

  return (
    <ImageBackground
      source={require('../assets/images/space.jpg')}
      style={styles.container}
    >
      <StatusBar backgroundColor='black' barStyle='dark-content'/>
      <Text style={styles.turnBar}>
        {((curTurn + 1) % 2 ? playerOneName || 'Player 1' : playerTwoName || 'Player 2').trim()} acts
      </Text>

      <View style={styles.scoreboard}>
        <Player
          name={playerOneName}
          onChangeName={setPlayerOneName}
          placeholder='Player 1'
          health={playerOneHealth}
          onChangeHealth={setPlayerOneHealth}
          damage={playerOneDamage}
          onChangeDamage={setPlayerOneDamage}
        />

        <Player
          name={playerTwoName}
          onChangeName={setPlayerTwoName}
          placeholder='Player 2'
          health={playerTwoHealth}
          onChangeHealth={setPlayerTwoHealth}
          damage={playerTwoDamage}
          onChangeDamage={setPlayerTwoDamage}
        />
      </View>
      <View style={{ flexGrow: 1 }}></View>
      <TouchableOpacity
        style={styles.turnButton}
        onPress={() => {
          setCurTurn(curTurn + 1)

          setPlayerOneHealth(playerOneHealth - (parseInt(playerOneDamage) || 0))
          setPlayerOneDamage('')

          setPlayerTwoHealth(playerTwoHealth - (parseInt(playerTwoDamage) || 0))
          setPlayerTwoDamage('')
        }}
      >
        <Text style={styles.textTurnButton}>NEXT TURN</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    //flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10,
  },
  turnBar: {
    fontSize: 40, 
    textAlign: 'center', 
    color: 'white', 
    borderBottomWidth: 1, 
    borderBottomColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'white',
    marginTop: 40,
    padding: 0, 
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  player: {
    flexGrow: 1,
    margin: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'green'
  },
  playerName: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },
  health: {
    color: 'white',
    fontSize: 80,
    textAlign: 'center',
  },
  inde: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: 200,
    height: 100,
  },
  indebutton: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  damageInput: {
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.67)',
    width: 200,
    //minHeight: 40,
    fontSize: 18,
    marginTop: 10,
    padding: 5,
    textAlign: 'center',
  },
  turnButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.67)', 
    height: 60,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'white',
    justifyContent: 'center',
    marginBottom: 10,
  },
  textTurnButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Health;
