import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
function ResponseComponent({
  ws,
  newWs,
  countdown,
  setCountdown,
  responseData,
  setResponseData,
}) {
  const [isRecording, setIsRecording] = useState(false); // State for recording state
  const [showMicOffMessage, setShowMicOffMessage] = useState(false); // State for the microphone icon
  const [input, setInput] = useState(""); // State for the user input for OpenAI configuration

  // Hook to deal with timer and microphone icon
  useEffect(() => {
    let timer;
    if (isRecording && countdown > 0) {
      setShowMicOffMessage(false);
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 || !isRecording) {
      setIsRecording(false);
      setShowMicOffMessage(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, setCountdown, isRecording]);

  const handleChange = (newValue) => {
    setInput(newValue);
  };

  // Function to send "start_recording" message to the server
  const startRecording = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        command: "start_recording",
        userInput: input,
      });
      ws.send(message);
      setIsRecording(true);
      setShowMicOffMessage(false);
    } else {
      console.log("WebSocket is not connected.");
    }
  };
  // Function to send "stop_recording" message to the server
  const stopRecording = () => {
    if (newWs && newWs.readyState === WebSocket.OPEN) {
      newWs.send("stop_recording");
    } else {
      console.log("Second WebSocket is not connected.");
    }
    setIsRecording(false);
    setShowMicOffMessage(true);
  };
  // When the button is clicked, timer and recording starts
  const handleButtonClick = () => {
    setCountdown(30); // Set your desired countdown duration here
    startRecording();
  };
  //function to clear the chat from the screen
  //clears the array of messages from the screen
  
  const clearChat = () => {
    setResponseData([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Buttons and Countdown Container */}
        <View style={styles.buttonContainer}>
          {/* Images and Messages */}
          {showMicOffMessage ? (
            <Image
              source={require("my-app/assets/no-microphone.gif")}
              style={styles.image}
            />
          ) : (
            isRecording &&
            countdown !== null && (
              <Image
                source={require("my-app/assets/podcast.gif")}
                style={styles.image}
              />
            )
          )}
          {/* Buttons */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity onPress={handleButtonClick} style={styles.micOnButton}>
              <Text style={styles.buttonText}>Mic On</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={stopRecording} style={styles.micOffButton}>
              <Text style={styles.buttonText}>Mic Off</Text>
              </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            value={input}
            placeholder="Customize OpenAI -> ex: Talk to me like I'm a 3 year old"
          />
        </View>
        <FlatList
          data={responseData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.messageBubbleSent}>{item.prompt}</Text>
              <Text style={styles.messageBubbleReceived}>{item.response}</Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <>
              <Text style={styles.messageBubbleSent}>
                Welcome to Audible Assistant!
              </Text>
              <Text style={styles.messageBubbleReceived}>
                Turn on the microphone to begin your conversation!
              </Text>
              <Text style={styles.messageBubbleSent}>
                You can customize how you want OpenAI to respond by setting it
                up above!
              </Text>
            </>
          )}
          style={styles.messagesContainer}
        />
        <View style={styles.bottomButtons}>
          <Button onPress={clearChat} title="Clear Chat" color="orange" />
          {/* Add other buttons */}
        </View>
      </View>
    </View>
  );
}

export default ResponseComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Changed to flex-start to align children to the top
    backgroundColor: "#fff", // Assuming a white background
  },
  image: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginLeft: 175,
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  bottomButtons: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginLeft: 115,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    maxWidth: screenWidth * 0.4,
    marginTop: 10,
  },
  offButton: {},
  onButton: {},

  messagesContainer: {
    paddingHorizontal: 10, // Add horizontal padding
    marginTop: 10,
    backgroundColor: "#b0c4de",
    borderRadius: 4,
    marginVertical: 10,
    height: 500,
    borderWidth: 2,
    borderColor: "black",
  },
  messageBubbleSent: {
    fontFamily: "Arial-BoldMT",
    backgroundColor: "#faf0e6",
    padding: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    marginTop: 24,
    marginLeft: 16,
    marginRight: 2,
    lineHeight: 15,
    borderRadius: 10,
    color: "black",
    alignSelf: "flex-end",
    maxWidth: screenWidth * 0.75,
    marginHorizontal: 10,
  },
  messageBubbleReceived: {
    fontFamily: "Arial-BoldMT",
    padding: 10,
    paddingHorizontal: 15,
    marginBottom: 4,
    marginTop: 12,
    marginLeft: 1,
    marginRight: 16,
    lineHeight: 15,
    borderRadius: 4,
    color: "white",
    backgroundColor: "#e9967a",
    alignSelf: "flex-start",
    maxWidth: screenWidth * 0.75,
    marginHorizontal: 10,
  },
  innerContainer: {
    paddingHorizontal: 10, // Add horizontal padding
  },
  input: {
    backgroundColor: "lightgrey",
    borderRadius: 4,
    maxHeight: 75,
    padding: 10,
  },
  micOnButton: {
    backgroundColor: "#20b2aa",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4, // Optional: if you want rounded corners
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  micOffButton: {
    backgroundColor: "#ff6347",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4, // Optional: if you want rounded corners
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16, // Adjust size as needed
  },
});
