import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  FlatList,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Title from "../components/Title";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../utils/colors";
import { Ionicons } from "@expo/vector-icons";

function genRandNum(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return genRandNum(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minB = 1;
let maxB = 100;

const Game = ({ chosenNumber, gameOver, incrementRound }) => {
  const [currGuess, setCurrGuess] = useState(() =>
    genRandNum(1, 100, chosenNumber)
  );
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (currGuess === chosenNumber) {
      gameOver();
    }
  }, [currGuess, chosenNumber]);

  useEffect(() => {
    minB = 1;
    maxB = 100;
  }, []);

  const nextGuess = (dir) => {
    if (dir === "lower" && currGuess < chosenNumber) {
      Alert.alert("Dont lie!", "You know this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (dir === "higher" && currGuess > chosenNumber) {
      Alert.alert("Dont lie!", "You know this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (dir === "lower") {
      maxB = currGuess;
    } else {
      minB = currGuess + 1;
    }
    const newRndNum = genRandNum(minB, maxB, currGuess);
    incrementRound();
    setLogs((prev) => [newRndNum, ...prev]);
    setCurrGuess(newRndNum);
  };

  const { width, height } = useWindowDimensions();

  let content = (
    <>
      <NumberContainer>{currGuess}</NumberContainer>
      <View>
        <Text style={styles.instruction}>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={() => nextGuess("higher")}>
            <Ionicons name="md-add" size={24} color="white" />
          </PrimaryButton>
          <PrimaryButton onPress={() => nextGuess("lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </PrimaryButton>
        </View>
      </View>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <PrimaryButton onPress={() => nextGuess("higher")}>
            <Ionicons name="md-add" size={24} color="white" />
          </PrimaryButton>
          <NumberContainer>{currGuess}</NumberContainer>
          <PrimaryButton onPress={() => nextGuess("lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </PrimaryButton>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={logs}
          keyExtractor={(item, index) => item}
          renderItem={(item) => <Text style={styles.log}>{item.item}</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  instruction: {
    color: Colors.accent500,
    fontSize: 18,
    marginBottom: 16,
    fontFamily: "open-sans",
  },
  listContainer: {
    flex: 1,
  },
  log: {
    color: Colors.primary800,
    borderWidth: 1,
    width: 40,
    height: 40,
    textAlign: "center",
    padding: 12,
    marginBottom: 5,
    borderColor: Colors.primary600,
    borderRadius: "20%",
  },
});

export default Game;
