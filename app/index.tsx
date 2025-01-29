import React, { useState } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from "react-native";



const Player = (props: any) => {
  return (
    <View>
      <TextInput
        style={styles.playerName}
        placeholder={props.placeholder}
        onChangeText={newText => props.onChangeName(newText)}
        defaultValue={props.name}
      />
      <Text style={{ height: 40, padding: 5 }}>
        Health: {props.health - (parseInt(props.damage) || 0)}
      </Text>
      <View style={{flexDirection: 'row', width: 200, height: 100}}>
        <Button
          onPress={() => {
            props.onChangeHealth(props.health + 1)
          }}
          title="increase"
        />
        <Button
          onPress={() => {
            props.onChangeHealth(props.health - 1)
          }}
          title="decrease"
        />
      </View>
      <TextInput
        style={{ height: 40, padding: 5 }}
        placeholder="Type damage here"
        onChangeText={newText => props.onChangeDamage(newText)}
        value={props.damage}
      />
    </View>
  )
}

const Health = (props: any) => {
  const [playerOneName, setPlayerOneName] = useState('Player 1');
  const [playerOneHealth, setPlayerOneHealth] = useState(50);
  const [playerOneDamage, setPlayerOneDamage] = useState('');

  const [playerTwoName, setPlayerTwoName] = useState('Player 2');
  const [playerTwoHealth, setPlayerTwoHealth] = useState(50);
  const [playerTwoDamage, setPlayerTwoDamage] = useState('');

  const [curTurn, setCurTurn] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>
        Player {(curTurn + 1) % 2 ? playerOneName || 'Player 1' : playerTwoName || 'Player 2'} acts
      </Text>

      <View style={styles.scoreboard}>
        <Player
          style={styles.player}
          name={playerOneName}
          onChangeName={setPlayerOneName}
          placeholder='Player 1'
          health={playerOneHealth}
          onChangeHealth={setPlayerOneHealth}
          damage={playerOneDamage}
          onChangeDamage={setPlayerOneDamage}
        />

        <Player
          style={styles.player}
          name={playerTwoName}
          onChangeName={setPlayerTwoName}
          placeholder='Player 2'
          health={playerTwoHealth}
          onChangeHealth={setPlayerTwoHealth}
          damage={playerTwoDamage}
          onChangeDamage={setPlayerTwoDamage}
        />
      </View>

      <Button
        onPress={() => {
          setCurTurn(curTurn + 1)

          setPlayerOneHealth(playerOneHealth - (parseInt(playerOneDamage) || 0))
          setPlayerOneDamage('')

          setPlayerTwoHealth(playerTwoHealth - (parseInt(playerTwoDamage) || 0))
          setPlayerTwoDamage('')
        }}
        title='next turn'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  player: {
    flexGrow: 1,
    margin: 10,
  },
  playerName: {
    fontSize: 40,
    textAlign: 'center',
  },
  HD: {
    width: 100, 
    height: 100,
  },
});

export default Health;
