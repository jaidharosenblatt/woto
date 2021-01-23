import { useEffect } from "react";
import soundfile from "../static/audio/NotificationAudio.mp3";

export default function HelpReady(help) {
  useEffect(() => {
    const studentNotJoined = help && !help.joinedAt;
    const audio = new Audio(soundfile);
    if (studentNotJoined) {
      audio.play();
    }
  }, [help]);

  return null;
}
