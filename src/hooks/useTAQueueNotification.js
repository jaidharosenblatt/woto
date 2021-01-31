import { useEffect } from "react";
import soundfile from "../static/audio/NotificationAudio.mp3";
import addNotification from "react-push-notification";

export default function useTAQueueNotification(queue) {
  useEffect(() => {
    const name = queue && queue[0]?.name
    const audio = new Audio(soundfile);
    if (queue.length === 1) {
      audio.play();
      addNotification({
        title: "A Student Joined the Queue",
        message: `${name} is waiting to be helped`,
        native: true, // when using native, your OS will handle theming.
      });
    }
  }, [queue]);

  return null;
}
