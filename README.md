Voice-Activated Chatbot Application

Description:

This Python application integrates various components to create a voice-activated chatbot. It uses speech recognition to interpret spoken input, converts text to speech for audible responses, and leverages the OpenAI GPT-3 model for intelligent and interactive conversation. The application provides an interactive experience where users can speak to the application and receive spoken responses from the chatbot.

Features:

- Speech Recognition: Converts spoken words into text using Google's speech recognition.
- Text to Speech: Converts chatbot responses into spoken words.
- OpenAI Chatbot: Integrates with OpenAI's GPT-3 model to generate conversational responses.
- Trigger Word Detection: The application listens for a specific trigger word to activate the chatbot response.

Requirements:

    * Python 3.x
    * PyAudio
    * SpeechRecognition
    * gTTS (Google Text-to-Speech)
    * playsound
    * OpenAI Python client

Installation:

Ensure Python 3.x is installed on your system.
Install required Python packages in bash termianl:

~pip install pyaudio speech_recognition gtts playsound openai~

Clone this repository or download the source code.

Configuration:

Obtain an API key from OpenAI and set it in the keys.py file as OPENAI_AUTH_TOKEN.

Usage
Run the main application script in bash termianl:

~python main_application.py~

-Speak into your microphone after the application starts.
-Say the trigger word "application" followed by your message to interact with the chatbot.
-Say "stop" to exit the application.

Important Notes:
* Ensure your microphone is properly configured and working.
* The application is currently set to respond when it detects the word "application" in the speech.
* Internet connection is required for speech recognition and OpenAI API calls.