import React, { useState } from 'react';
import { Text, View, Button, TextInput } from "react-native";


const Player = props => {
  return (
    <View>
      <TextInput
        placeholder={props.placeholder}
        onChangeText={newText => props.onChangeName(newText)}
        defaultValue={props.name}
      />
      <Text style={{ height: 40, padding: 5 }}>
        Health: {props.health - (parseInt(props.damage) || 0)}
      </Text>
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
      <TextInput
        style={{ height: 40, padding: 5 }}
        placeholder="Type damage here"
        onChangeText={newText => props.onChangeDamage(newText)}
        value={props.damage}
      />
    </View>
  )
}

const Health = props => {
  const [playerOneName, setPlayerOneName] = useState('Player 1');
  const [playerOneHealth, setPlayerOneHealth] = useState(50);
  const [playerOneDamage, setPlayerOneDamage] = useState('');

  const [playerTwoName, setPlayerTwoName] = useState('Player 2');
  const [playerTwoHealth, setPlayerTwoHealth] = useState(50);
  const [playerTwoDamage, setPlayerTwoDamage] = useState('');

  const [curTurn, setCurTurn] = useState(0);

  return (
    <View>
      <Text>
        Player {(curTurn + 1) % 2 ? playerOneName || 'Player 1' : playerTwoName || 'Player 2'} acts
      </Text>

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

      <Button
        onPress={() => {
          setCurTurn(curTurn + 1)

          setPlayerOneHealth(playerOneHealth - (parseInt(playerOneDamage)||0))
          setPlayerOneDamage('')

          setPlayerTwoHealth(playerTwoHealth - (parseInt(playerTwoDamage)||0))
          setPlayerTwoDamage('')
        }}
        title='next turn'
      />
    </View>
  )
}

export default Health;
