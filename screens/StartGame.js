import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  Text,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import Title from "../components/Title";
import Colors from "../utils/colors";

const StartGame = ({ startGame }) => {
  const [enteredValue, setEnteredValue] = useState("");

  const { width, height } = useWindowDimensions();
  const marginTop = height < 380 ? 30 : 100;

  const handleChange = (enteredNumber) => {
    setEnteredValue(enteredNumber);
  };

  const handleReset = () => {
    setEnteredValue("");
  };

  const handleConfirm = () => {
    const chosenNumber = +enteredValue;

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number", "Choose number between 1 and 99", [
        {
          text: "Okay",
          style: "destructive",
          onPress: handleReset,
        },
      ]);
      return;
    }

    startGame(chosenNumber);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
        <View style={[styles.screen, { marginTop }]}>
          <Title>Guess My Number</Title>
          <View style={styles.inputContainer}>
            <Text style={styles.instruction}>Enter number</Text>
            <TextInput
              onChangeText={handleChange}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.numberInput}
              value={enteredValue}
            />
            <View style={styles.buttons}>
              <View style={styles.button}>
                <PrimaryButton onPress={handleReset}>Reset</PrimaryButton>
              </View>
              <View style={styles.button}>
                <PrimaryButton onPress={handleConfirm}>Confirm</PrimaryButton>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    padding: 16,
    marginTop: 36,
    marginHorizontal: 24,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 8,
    shadowColor: "black",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  numberInput: {
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    width: 50,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
  instruction: {
    color: Colors.accent500,
    fontSize: 18,
  },
});

export default StartGame;
