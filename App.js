import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import Card from "./Card";

const cards = ["🍰", "🎂", "🍨", "🍦", "🍬", "🍭", "🍷", "🍺"];

export default function App() {
  const [board, setBoard] = React.useState(() => shuffle([...cards, ...cards]));
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [matchedCards, setMatchedCards] = React.useState([]);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    if (selectedCards.length < 2) return;
    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
    } else {
      const timeoutID = setTimeout(() => setSelectedCards([]), 1000);
      return () => clearTimeout(timeoutID);
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]);
    setScore(score + 1);
  };

  const didPlayerWin = () => matchedCards.length === board.length;
  const resetGame = () => {
    setMatchedCards([]);
    setScore(0);
    setSelectedCards([]);
    setBoard(shuffle([...cards, ...cards]));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {didPlayerWin() ? "🎊 Bien hecho! 🎊" : "Memorama"}
      </Text>
      <Text style={styles.score}>Puntaje: {score}</Text>
      <View style={styles.board}>
        {board.map((card, index) => {
          const isTurnedOver =
            selectedCards.includes(index) || matchedCards.includes(index);
          return (
            <Card
              key={index}
              isTurnedOver={isTurnedOver}
              onPress={() => handleTapCard(index)}
            >
              {card}
            </Card>
          );
        })}
      </View>
      {didPlayerWin() && (
        <Button
          onPress={resetGame}
          title="Reset"
          color="#d97706"
          style={styles.button}
        />
      )}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    paddingTop: 100,
  },
  title: {
    fontSize: 32,
    color: "#f8fafc",
    fontWeight: "900",
  },
  score: {
    fontSize: 20,
    color: "#cbd5e1",
    fontWeight: "900",
  },
  board: {
    paddingVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

/**Devuelve el array random */

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
