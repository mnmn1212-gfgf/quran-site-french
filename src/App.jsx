
// === MODIFIED VERSION ===
// Fixes:
// 1. Show video thumbnail using poster
// 2. preload changed to metadata
// 3. auto-pause other videos

import React, { useRef, useState, useEffect } from "react";

let currentPlayingVideo = null;

export default function VideoCard({ video, index }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    // stop any other playing video
    if (currentPlayingVideo && currentPlayingVideo !== el) {
      currentPlayingVideo.pause();
    }

    if (el.paused) {
      el.play().catch(() => {});
      currentPlayingVideo = el;
    } else {
      el.pause();
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: 400 }}>
      <div style={{ position: "relative" }}>
        <video
          ref={videoRef}
          src={video}
          preload="metadata"
          poster={`/videos/thumb-${index + 1}.jpg`}
          style={{ width: "100%", borderRadius: 12 }}
          playsInline
          muted={muted}
        />

        {!isPlaying && (
          <button
            onClick={togglePlay}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.5)",
              color: "white",
              fontSize: 20,
              border: "none",
              cursor: "pointer",
            }}
          >
            ▶
          </button>
        )}
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
        <button onClick={togglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={toggleMute}>
          {muted ? "Unmute" : "Mute"}
        </button>
      </div>
    </div>
  );
}
