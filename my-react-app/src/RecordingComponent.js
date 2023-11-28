import React from 'react';

function RecordingComponent({ ws }) {
    // Function to handle the start recording action
    const startRecording = () => {
        // Check if the WebSocket instance exists and is in the OPEN state
        if (ws && ws.readyState === WebSocket.OPEN) {
            // Send a message to the WebSocket server to start recording
            ws.send("start_recording");
        } else {
            // Log a message if the WebSocket is not connected
            console.log("WebSocket is not connected.");
        }
    };

    // Render the component
    return (
        <div>
            {/* Button that triggers the startRecording function when clicked */}
            <button onClick={startRecording}>Start Recording</button>
        </div>
    );
}

export default RecordingComponent;
