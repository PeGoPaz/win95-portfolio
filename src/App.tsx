import { useEffect, useRef, useState } from "react";
import { AGENTS, ClippyProvider } from "@react95/clippy";
import WindowBar from "./components/WindowBar";
import DesktopIcon from "./components/DesktopIcon";
import Contact from "./components/Contact";
import { Inetcpl1313, Joy102, Wordpad, Mail } from "@react95/icons";
import Resume from "./components/Resume";
import Game from "./components/Game";
import MusicPlayer from "./components/MusicPlayer";
import StartupScreen from "./components/StartupScreen";
import logoSrc from "./assets/images/logo.png";
import startupSoundSrc from "./assets/sounds/startup.mp3";
import clickSoundSrc from "./assets/sounds/mouse_click.mp3";

function App() {
  const [showDesktop, setShowDesktop] = useState(false);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const clickAudio = new Audio(clickSoundSrc);
    clickAudio.volume = 0.08;
    clickAudio.preload = "auto";
    clickAudioRef.current = clickAudio;

    return () => {
      clickAudio.pause();
      clickAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleClick = () => {
      const clickAudio = clickAudioRef.current;
      if (!clickAudio) return;

      clickAudio.currentTime = 0;
      void clickAudio.play().catch(() => undefined);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        background: "#098684",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {!showDesktop && (
        <StartupScreen
          logoSrc={logoSrc}
          soundSrc={startupSoundSrc}
          onComplete={() => setShowDesktop(true)}
        />
      )}

      {showDesktop && (
        <>
          <img
            src={logoSrc}
            width={400}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-70%)",
            }}
          />

          <ClippyProvider agentName={AGENTS.MERLIN}>
            <div className="fixed">
              <DesktopIcon icon={<Inetcpl1313 variant="32x32_4" />} name="Browser">
                <iframe width={800} height={500} src="https://wiby.org/" title="Wiby" />
              </DesktopIcon>
              <DesktopIcon width={650} icon={<Wordpad variant="32x32_4" />} name="Resume">
                <Resume />
              </DesktopIcon>
              <DesktopIcon width={420} height={500} icon={<Joy102 variant="32x32_4" />} name="Game">
                <Game />
              </DesktopIcon>
              <DesktopIcon width={400} icon={<Mail variant="32x32_4" />} name="Contact">
                <Contact />
              </DesktopIcon>
            </div>
            <MusicPlayer />
            <WindowBar />
          </ClippyProvider>
        </>
      )}
    </div>
  );
}

export default App;
