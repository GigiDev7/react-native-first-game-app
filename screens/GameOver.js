import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import Colors from "../utils/colors";
import Title from "../components/Title";
import PrimaryButton from "../components/PrimaryButton";

const GameOver = ({ chosenNumber, rounds, startNewGame }) => {
  return (
    <View style={styles.screen}>
      <Title>GAME OVER!</Title>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={require("../assets/images/success.png")}
        />
      </View>
      <View>
        <Text style={styles.text}>
          Phone needed <Text style={styles.highlight}>{rounds}</Text> rounds to
          guess number <Text style={styles.highlight}>{chosenNumber}</Text>
        </Text>
        <PrimaryButton onPress={startNewGame}>Start New Game</PrimaryButton>
      </View>
    </View>
  );
};

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: {
    borderRadius: deviceWidth < 380 ? 75 : 150,
    width: deviceWidth < 380 ? 150 : 300,
    height: deviceWidth < 380 ? 150 : 300,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontFamily: "open-sans",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 14,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});

export default GameOver;
