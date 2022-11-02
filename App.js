import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGame from "./screens/StartGame";
import Game from "./screens/Game";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import Colors from "./utils/colors";
import GameOver from "./screens/GameOver";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [number, setNumber] = useState();
  const [isGameOver, setIsGameOver] = useState(false);
  const [rounds, setRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const startGame = (n) => {
    setNumber(n);
  };

  const increaseRound = () => {
    setRounds((prev) => prev + 1);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  const startNewGame = () => {
    setIsGameOver(false);
    setRounds(0);
    setNumber();
  };

  let screen = <StartGame startGame={startGame} />;

  if (number) {
    screen = (
      <Game
        chosenNumber={number}
        gameOver={handleGameOver}
        incrementRound={increaseRound}
      />
    );
  }

  if (isGameOver) {
    screen = (
      <GameOver
        chosenNumber={number}
        rounds={rounds}
        startNewGame={startNewGame}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary800, Colors.accent500]}
        style={styles.screen}
      >
        <ImageBackground
          resizeMode="cover"
          style={styles.screen}
          imageStyle={styles.bgImage}
          source={require("./assets/images/background.png")}
        >
          <SafeAreaView style={styles.screen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bgImage: {
    opacity: 0.15,
  },
});
