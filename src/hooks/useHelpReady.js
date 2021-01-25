import { useEffect } from "react";
import soundfile from "../static/audio/NotificationAudio.mp3";
import addNotification from "react-push-notification";

export default function HelpReady(help) {
  useEffect(() => {
    const studentNotJoined = help && !help.joinedAt;
    const audio = new Audio(soundfile);
    if (studentNotJoined) {
      audio.play();
      addNotification({
        title: "Its Your Turn to Get Helped!",
        message: `${help.assistant.name} is ready to see you.`,
        native: true, // when using native, your OS will handle theming.
      });
    }
  }, [help]);

  return null;
}
