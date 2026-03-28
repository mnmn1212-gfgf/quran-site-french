import React, { useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import sanaLogo from "./assets/sana-logo.png";
import voiceMp3 from "./assets/voice.mp3";
import {
  BookOpen,
  Building2,
  Crown,
  ExternalLink,
  Eye,
  Globe,
  Headphones,
  HeartHandshake,
  Languages,
  Layers3,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Sparkles,
  Stars,
  Target,
  Users,
  Volume2,
} from "lucide-react";

// 🎨 DESERT LUXURY PALETTE
const ACCENT = "#C2A878";
const ACCENT_SOFT = "#E8D8C3";
const ACCENT_ROSE = "#A47148";
const BG_DEEP = "#2B2118";
const BG_PANEL = "rgba(43,33,24,0.78)";
const CTA_DARK = "#3A2C20";

const OUTER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(33,24,18,0.97)_0%,rgba(55,40,29,0.95)_38%,rgba(92,61,42,0.92)_100%)]";
const INNER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(32,24,18,0.98)_0%,rgba(56,40,29,0.95)_55%,rgba(122,84,56,0.92)_100%)]";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pulseGlow = {
  opacity: [0.18, 0.42, 0.18],
  scale: [1, 1.04, 1],
  transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
};

const shimmer = {
  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
};

const containerClass =
  "relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-14";
const glass =
  "border border-white/10 bg-white/[0.08] md:backdrop-blur-2xl backdrop-blur-md shadow-[0_16px_50px_rgba(0,0,0,0.30)]";
const softCard = `rounded-[2rem] ${glass}`;
const gradientOuterCard = `rounded-[2rem] border border-[rgba(232,216,195,0.12)] ${OUTER_GRADIENT} md:backdrop-blur-2xl backdrop-blur-md shadow-[0_16px_50px_rgba(0,0,0,0.30)]`;

const navItems = [
  { label: "À propos", href: "#about" },
  { label: "Fonctionnalités", href: "#features" },
  { label: "Nos réalisations", href: "#portfolio" },
  { label: "Partenaires", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { value: "+100", label: "Langues mondiales ciblées" },
  { value: "24/7", label: "Diffusion continue" },
  { value: "114", label: "Sourates complètes" },
  { value: "Premium", label: "Qualité audio-visuelle" },
];

const heroCards = [
  { value: "114", label: "Sourates" },
  { value: "30", label: "Ajza’" },
  { value: "Élégant", label: "Contenu AV" },
];

const heroBadges = [
  { icon: Sparkles, title: "Lumière et beauté du Coran" },
  { icon: Globe, title: "Un message universel" },
];

const identityCards = [
  {
    icon: Users,
    title: "Qui sommes-nous",
    text: "Sana est une initiative fondée en waqf, dédiée à la transmission des sens du Saint Coran au monde à travers des canaux audio et visuels raffinés. Nous unissons la beauté de la récitation à la fidélité de la traduction pour offrir une expérience spirituelle noble qui rapproche les paroles d’Allah des cœurs dans les grandes langues du monde.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "Devenir une référence internationale dans la diffusion des sens du Saint Coran à chaque personne, dans sa propre langue, grâce à une approche contemporaine alliant excellence, élégance et innovation technologique.",
  },
  {
    icon: Target,
    title: "Mission",
    text: "Proposer un contenu coranique audio-visuel traduit, clair et accessible, afin de faire connaître les paroles d’Allah avec profondeur, beauté et impact auprès des publics du monde entier.",
  },
];

const features = [
  {
    icon: Languages,
    title: "Traductions multilingues",
    desc: "Les sens du Saint Coran sont présentés avec précision et clarté dans les langues des peuples, dans le respect du message voulu.",
  },
  {
    icon: Headphones,
    title: "Expérience audio-visuelle immersive",
    desc: "Une rencontre harmonieuse entre récitation émouvante et texte traduit, dans un univers digne de la majesté du Coran.",
  },
  {
    icon: Globe,
    title: "Rayonnement international continu",
    desc: "Une présence digitale et satellitaire pensée pour toucher les publics sur tous les continents, à toute heure.",
  },
  {
    icon: HeartHandshake,
    title: "Un waqf pour Allah",
    desc: "Un projet de da‘wa mondial où chaque soutien, participation ou bénéfice s’inscrit dans une œuvre durable et méritoire.",
  },
];

const channels = [
  {
    icon: Radio,
    title: "Chaînes satellitaires et radio",
    desc: "Des canaux audio et visuels qui diffusent les sens du Saint Coran dans les langues des peuples, au-delà des frontières.",
  },
  {
    icon: MonitorPlay,
    title: "Réseaux sociaux et sites web",
    desc: "Une présence numérique élégante et dynamique qui rend le contenu coranique simple d’accès, de consultation et de partage.",
  },
  {
    icon: Layers3,
    title: "Applications et médias numériques",
    desc: "Une expérience souple et moderne adaptée aux usages actuels, sur différents appareils et plateformes.",
  },
];

const partners = [
  {
    icon: ShieldCheck,
    title: "Institutions islamiques et autorités savantes",
    desc: "Des partenaires ayant contribué à des traductions validées des sens du Coran, garantissant authenticité, précision et solidité scientifique.",
  },
  {
    icon: Mic2,
    title: "Récitateurs de renom",
    desc: "Des voix humbles et émouvantes qui donnent au projet une présence spirituelle forte et profondément touchante.",
  },
  {
    icon: Headphones,
    title: "Studios audio et partenaires techniques",
    desc: "Des experts ayant assuré des enregistrements de haute qualité et un traitement audio-visuel professionnel.",
  },
  {
    icon: Users,
    title: "Producteurs et bénévoles",
    desc: "Des contributeurs engagés qui ont participé à la conception, au développement et à la diffusion mondiale du contenu.",
  },
];

const impactCards = [
  {
    icon: Globe,
    title: "Portée mondiale",
    desc: "Le message du Saint Coran atteint des foyers à travers le monde, dans des langues qui parlent directement au cœur des peuples.",
  },
  {
    icon: Languages,
    title: "Traductions fiables",
    desc: "Les traductions des sens du Coran sont réalisées sous supervision savante, afin d’en préserver la justesse et la profondeur.",
  },
  {
    icon: Headphones,
    title: "Expérience intégrée",
    desc: "L’alliance entre récitation humble et traduction visuelle crée une expérience spirituelle fluide, noble et accessible.",
  },
  {
    icon: Send,
    title: "Message durable",
    desc: "Le projet contribue à faire connaître les paroles d’Allah à travers un langage visuel moderne, capable de toucher des publics variés.",
  },
];

const portfolioVideos = [
  { id: "v1", src: `${import.meta.env.BASE_URL}videos/v1.mp4` },
  { id: "v2", src: `${import.meta.env.BASE_URL}videos/v2.mp4` },
  { id: "v3", src: `${import.meta.env.BASE_URL}videos/v3.mp4` },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function sectionBadge(icon, text, textColor = "text-white") {
  const Icon = icon;
  return (
    <div
      className={`inline-flex max-w-full items-center gap-3 rounded-full border border-[rgba(232,216,195,0.16)] bg-[rgba(255,255,255,0.08)] px-4 py-2.5 text-xs font-semibold ${textColor} backdrop-blur-md shadow-[0_12px_26px_rgba(0,0,0,0.22)] sm:px-5 sm:py-3 sm:text-sm`}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function LargeSectionBadge({ icon: Icon, text }) {
  return (
    <div
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-[rgba(232,216,195,0.14)] bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.04))] px-5 py-3 text-base font-bold backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.24)] sm:px-8 sm:py-4 sm:text-xl lg:text-2xl"
      style={{ color: ACCENT_SOFT }}
    >
      <Icon
        className="h-5 w-5 shrink-0 sm:h-7 sm:w-7"
        style={{ color: ACCENT }}
      />
      <span className="truncate">{text}</span>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 15.5 14.5 8" />
      <path d="M11 8h4" />
      <path d="M9.5 15.5H15" />
      <path d="M10.5 12h5" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4.5v15l8.8-7.5L5 4.5Z" />
      <path d="m13.8 12 3.6-3 1.6 1.1c1.2.8 1.2 2.1 0 2.9L17.4 14l-3.6-2Z" />
      <path d="m17.4 9-8.2-3.6" />
      <path d="m17.4 15-8.2 3.6" />
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function HeroAudioPlayer({ isMobile }) {
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousBarsRef = useRef([]);

  const BARS_COUNT = isMobile ? 24 : 48;
  const HALF_BARS = BARS_COUNT / 2;
  const MIN_BAR_HEIGHT = isMobile ? 8 : 10;
  const MAX_BAR_HEIGHT = isMobile ? 22 : 34;

  const idleBars = useMemo(() => {
    const half = Array.from({ length: HALF_BARS }, (_, i) => {
      const t = i / Math.max(1, HALF_BARS - 1);
      return Math.round((isMobile ? 9 : 12) + t * 3);
    });
    return [...half.slice().reverse(), ...half];
  }, [HALF_BARS, isMobile]);

  const [bars, setBars] = useState(idleBars);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    previousBarsRef.current = idleBars;
    setBars(idleBars);
  }, [idleBars]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const loadAudioAsBlob = async () => {
      try {
        const response = await fetch(voiceMp3, { cache: "force-cache" });
        const blob = await response.blob();
        if (cancelled) return;

        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        audio.src = objectUrl;
        audio.load();
      } catch {
        if (!cancelled) {
          audio.src = voiceMp3;
          audio.load();
        }
      }
    };

    loadAudioAsBlob();

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      previousBarsRef.current = idleBars;
      setBars(idleBars);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [idleBars]);

  useEffect(() => {
    if (isMobile && !isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);
      return;
    }

    if (!isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const animateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      let total = 0;
      for (let i = 0; i < bufferLength; i += 1) total += dataArray[i];
      const globalEnergy = total / bufferLength / 255;

      const halfBars = Array.from({ length: HALF_BARS }, (_, index) => {
        const start = Math.floor((index / HALF_BARS) * bufferLength);
        const end = Math.floor(((index + 1) / HALF_BARS) * bufferLength);

        let localSum = 0;
        let count = 0;

        for (let i = start; i < end; i += 1) {
          localSum += dataArray[i];
          count += 1;
        }

        const localEnergy = count ? localSum / count / 255 : 0;
        const mixedEnergy = localEnergy * 0.68 + globalEnergy * 0.32;
        const height =
          MIN_BAR_HEIGHT + mixedEnergy * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);

        return clamp(height, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT);
      });

      const mirroredBars = [...halfBars.slice().reverse(), ...halfBars];

      const animatedBars = mirroredBars.map((value, index) => {
        const previous = previousBarsRef.current[index] ?? idleBars[index];
        return Math.round(previous * 0.55 + value * 0.45);
      });

      previousBarsRef.current = animatedBars;
      setBars(animatedBars);
      animationFrameRef.current = requestAnimationFrame(animateBars);
    };

    animationFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [
    HALF_BARS,
    MAX_BAR_HEIGHT,
    MIN_BAR_HEIGHT,
    idleBars,
    isPlaying,
    isMobile,
  ]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const setupAnalyser = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.92;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume().catch(() => {});
    }
  };

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    await setupAnalyser();

    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const seekBy = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(
      0,
      Math.min(el.duration || 0, (el.currentTime || 0) + delta)
    );
  };

  const replay = async () => {
    const el = audioRef.current;
    if (!el) return;
    await setupAnalyser();
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleSeek = (event) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Number(event.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  return (
    <div className="mt-5 rounded-[1.45rem] border border-[rgba(232,216,195,0.14)] bg-[rgba(43,33,24,0.76)] p-3 sm:p-4 shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
      <audio
        ref={audioRef}
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="mb-4 flex h-14 items-end gap-[2px] overflow-hidden rounded-2xl border border-[rgba(232,216,195,0.14)] bg-black/20 px-2 py-3 sm:h-18">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height }}
            transition={{ duration: isMobile ? 0.2 : 0.14, ease: "easeOut" }}
            className="flex-1 self-end rounded-full bg-gradient-to-t from-[#8B5E3C] via-[#E8D8C3] to-[#FFF5EA] opacity-95"
            style={{ maxHeight: `${MAX_BAR_HEIGHT}px` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.14)] bg-white/5 text-white transition hover:bg-white/10"
          aria-label={isPlaying ? "Pause" : "Lire"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" style={{ color: ACCENT }} />
          ) : (
            <Play className="h-4 w-4" style={{ color: ACCENT }} />
          )}
        </button>

        <button
          type="button"
          onClick={() => seekBy(-10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.14)] bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Retour"
        >
          <SkipBack className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={replay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.14)] bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Rejouer"
        >
          <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={() => seekBy(10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.14)] bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Avancer"
        >
          <SkipForward className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.14)] bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Volume"
        >
          <Volume2
            className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
            style={{ color: ACCENT }}
          />
        </button>

        <div className="min-w-[52px] text-xs text-white/75">
          {formatTime(currentTime)}
        </div>

        <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#8B5E3C] via-[#E8D8C3] to-[#FFF5EA]"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="audio-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>

      <style>{`
        .audio-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .audio-range::-moz-range-track { height: 8px; background: transparent; }
        .audio-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .audio-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
}

function StructuredCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -8, scale: 1.012 }}
      className={`${gradientOuterCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-[rgba(232,216,195,0.10)] bg-white/[0.04] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-[rgba(232,216,195,0.10)] bg-gradient-to-l from-white/[0.03] to-white/[0.08] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.10)] bg-[rgba(194,168,120,0.12)]">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold leading-7 text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-[rgba(232,216,195,0.10)] bg-[rgba(42,31,23,0.58)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function IdentityCard({ icon: Icon, title, text, large = false, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -8, scale: 1.012 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-[rgba(232,216,195,0.10)] bg-white/[0.04] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-[rgba(232,216,195,0.10)] bg-gradient-to-l from-white/[0.03] to-white/[0.08] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.10)] bg-[rgba(194,168,120,0.12)]">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <div
            className={`rounded-2xl border border-[rgba(232,216,195,0.10)] bg-white/[0.04] px-4 py-2 font-bold text-white ${
              large ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </div>
        </div>
        <div
          className={`mt-4 rounded-2xl border border-[rgba(232,216,195,0.10)] bg-[rgba(42,31,23,0.58)] px-4 py-4 text-white/82 ${
            large
              ? "text-base leading-8 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10"
              : "text-base leading-8 sm:text-lg"
          }`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function ImpactCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -8, scale: 1.012 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-[rgba(232,216,195,0.10)] bg-white/[0.04] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-[rgba(232,216,195,0.10)] bg-gradient-to-l from-white/[0.03] to-white/[0.08] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.10)] bg-[rgba(194,168,120,0.12)]">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-[rgba(232,216,195,0.10)] bg-[rgba(42,31,23,0.58)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function ProtectedHlsVideoCard({
  video,
  index,
  isMobile,
  activeVideoId,
  onActivate,
  onDeactivate,
  registerVideo,
}) {
  const videoRef = useRef(null);
  const previewCapturedRef = useRef(false);
  const previewSeekingRef = useRef(false);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [posterFrame, setPosterFrame] = useState("");
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    if (!registerVideo) return undefined;
    return registerVideo(video.id, videoRef);
  }, [registerVideo, video.id]);

  const capturePosterFrame = () => {
    const element = videoRef.current;
    if (!element || previewCapturedRef.current) return;
    if (!element.videoWidth || !element.videoHeight) return;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = element.videoWidth;
      canvas.height = element.videoHeight;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.drawImage(element, 0, 0, canvas.width, canvas.height);
      const frame = canvas.toDataURL("image/jpeg", 0.92);

      if (frame) {
        setPosterFrame(frame);
        previewCapturedRef.current = true;
      }
    } catch {
      // تجاهل أي خطأ في إنشاء صورة المعاينة
    }
  };

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    const preparePreviewFrame = () => {
      if (previewCapturedRef.current || previewSeekingRef.current) return;
      if (!Number.isFinite(element.duration) || element.duration <= 0) return;

      previewSeekingRef.current = true;
      const previewTime = Math.min(0.1, Math.max(0, element.duration / 100));

      try {
        element.currentTime = previewTime;
      } catch {
        previewSeekingRef.current = false;
      }
    };

    const onLoaded = () => {
      setDuration(element.duration || 0);
      setIsReady(true);
      preparePreviewFrame();
    };

    const onCanPlay = () => {
      setIsReady(true);
      preparePreviewFrame();
    };

    const onSeeked = () => {
      if (previewSeekingRef.current && !previewCapturedRef.current) {
        capturePosterFrame();
        element.pause();
        element.currentTime = 0;
        previewSeekingRef.current = false;
        return;
      }

      capturePosterFrame();
    };

    const onTimeUpdate = () => setCurrentTime(element.currentTime || 0);

    const onPlay = () => {
      setHasPlayedOnce(true);
      setIsPlaying(true);
      onActivate(video.id);
    };

    const onPause = () => {
      setIsPlaying(false);
      if (activeVideoId === video.id) {
        onDeactivate(video.id);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (activeVideoId === video.id) {
        onDeactivate(video.id);
      }
    };

    element.addEventListener("loadedmetadata", onLoaded);
    element.addEventListener("loadeddata", onLoaded);
    element.addEventListener("canplay", onCanPlay);
    element.addEventListener("durationchange", onLoaded);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("ended", onEnded);
    element.addEventListener("seeked", onSeeked);

    return () => {
      element.removeEventListener("loadedmetadata", onLoaded);
      element.removeEventListener("loadeddata", onLoaded);
      element.removeEventListener("canplay", onCanPlay);
      element.removeEventListener("durationchange", onLoaded);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("ended", onEnded);
      element.removeEventListener("seeked", onSeeked);
    };
  }, [activeVideoId, onActivate, onDeactivate, video.id]);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    if (activeVideoId !== null && activeVideoId !== video.id && !element.paused) {
      element.pause();
    }
  }, [activeVideoId, video.id]);

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const playVideo = () => {
    const el = videoRef.current;
    if (!el) return;

    onActivate(video.id);
    setHasPlayedOnce(true);
    el.play().catch(() => {});
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      playVideo();
    } else {
      el.pause();
    }
  };

  const replayVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    playVideo();
  };

  const handleSeek = (e) => {
    const el = videoRef.current;
    if (!el) return;
    const next = Number(e.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 12 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.08 }}
      whileHover={isMobile ? {} : { y: -8, scale: 1.012 }}
      className={`${softCard} p-3 sm:p-4`}
    >
      <div className="relative overflow-hidden rounded-[1.4rem] border border-[rgba(232,216,195,0.12)] bg-black/30">
        <video
          ref={videoRef}
          src={video.src}
          poster={posterFrame || undefined}
          className="aspect-video w-full object-cover"
          playsInline
          preload="auto"
          controls={false}
          muted={muted}
          onContextMenu={(e) => e.preventDefault()}
        />

        {!hasPlayedOnce && posterFrame && (
          <img
            src={posterFrame}
            alt="Aperçu vidéo"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        )}

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/18 transition hover:bg-black/10"
            aria-label="Lire la vidéo"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(255,255,255,0.22)] bg-white/10 backdrop-blur-md shadow-[0_0_32px_rgba(164,113,72,0.22)] sm:h-18 sm:w-18">
              <Play className="ml-1 h-7 w-7 text-white" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-[rgba(232,216,195,0.12)] bg-black/35 px-3 py-1 text-[11px] text-white/80 backdrop-blur-md">
          {!hasPlayedOnce
            ? posterFrame
              ? "Aperçu prêt"
              : "Chargement de l’aperçu"
            : isReady
            ? "Prêt à lire"
            : "Chargement vidéo"}
        </div>
      </div>

      <div className="mt-4 rounded-[1.3rem] border border-[rgba(232,216,195,0.12)] bg-[rgba(42,31,23,0.58)] p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.12)] bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Couper ou réactiver le son"
          >
            <Volume2
              className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
              style={{ color: ACCENT }}
            />
          </button>

          <button
            type="button"
            onClick={replayVideo}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.12)] bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Rejouer"
          >
            <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.12)] bg-white/5 text-white transition hover:bg-white/10"
            aria-label={isPlaying ? "Pause" : "Lire"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" style={{ color: ACCENT }} />
            ) : (
              <Play className="h-4 w-4" style={{ color: ACCENT }} />
            )}
          </button>

          <div className="min-w-[52px] text-xs text-white/75">
            {formatTime(currentTime)}
          </div>

          <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#8B5E3C] via-[#E8D8C3] to-[#FFF5EA]"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="video-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            />
          </div>
        </div>
      </div>

      <style>{`
        .video-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .video-range::-moz-range-track { height: 8px; background: transparent; }
        .video-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .video-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </motion.div>
  );
}

export default function QuranTranslationLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const isMobile = useIsMobile();
  const videoRefs = useRef({});

  const registerVideo = (videoId, ref) => {
    videoRefs.current[videoId] = ref;
    return () => {
      delete videoRefs.current[videoId];
    };
  };

  const pauseOtherVideos = (nextVideoId) => {
    Object.entries(videoRefs.current).forEach(([id, ref]) => {
      const element = ref?.current;
      if (!element) return;
      if (id !== nextVideoId && !element.paused) {
        element.pause();
      }
    });
  };

  const handleActivateVideo = (videoId) => {
    pauseOtherVideos(videoId);
    setActiveVideoId(videoId);
  };

  const handleDeactivateVideo = (videoId) => {
    setActiveVideoId((current) => (current === videoId ? null : current));
  };

  return (
    <LazyMotion features={domAnimation}>
      <div
        dir="ltr"
        className="relative min-h-screen overflow-hidden bg-transparent text-white"
      >
        <motion.div
          animate={shimmer}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(194,168,120,0.16),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(164,113,72,0.18),transparent_20%),radial-gradient(circle_at_20%_75%,rgba(107,74,53,0.22),transparent_28%),linear-gradient(180deg,#1C140F_0%,#2B2118_34%,#4A3527_68%,#6B4A35_100%)] bg-[length:140%_140%]"
        />

        {!isMobile && (
          <>
            <motion.div
              className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[rgba(194,168,120,0.14)] blur-3xl"
              animate={pulseGlow}
            />
            <motion.div
              className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[rgba(164,113,72,0.12)] blur-3xl"
              animate={pulseGlow}
            />
            <div className="absolute inset-0 opacity-[0.05]">
              <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
            </div>
          </>
        )}

        <div className={containerClass}>
          <header className="pt-4 sm:pt-6">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className={`mx-auto flex items-center justify-between gap-3 rounded-[1.6rem] px-3 py-3 sm:rounded-[2rem] sm:px-4 ${glass}`}
              style={{ backgroundColor: BG_PANEL }}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[rgba(232,216,195,0.18)] bg-white/10 shadow-[0_0_24px_rgba(194,168,120,0.12)] sm:h-16 sm:w-16">
                  <img
                    src={sanaLogo}
                    alt="Logo des chaînes coraniques Sana"
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="truncate text-sm font-bold tracking-[0.18em] text-white/90 uppercase sm:text-xl">
                  Sana Quranic Channels
                </div>
              </div>

              <nav className="hidden items-center gap-3 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-[rgba(232,216,195,0.10)] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/85 transition hover:border-[rgba(164,113,72,0.30)] hover:bg-white/[0.08] hover:text-[#F7EEE4]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.10)] bg-white/[0.04] md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </motion.div>

            {menuOpen && (
              <div
                className={`mt-3 rounded-[1.4rem] p-3 md:hidden sm:rounded-[1.6rem] sm:p-4 ${glass}`}
                style={{ backgroundColor: BG_PANEL }}
              >
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl border border-[rgba(232,216,195,0.10)] bg-white/[0.04] px-4 py-3 text-sm text-white/85 sm:text-base"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </header>

          <section className="relative grid min-h-[auto] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[84vh] lg:grid-cols-[1.03fr_0.97fr] lg:py-20">
            <div className="order-1 lg:order-1">
              <motion.div
                custom={0}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(164,113,72,0.18)] bg-white/[0.06] px-4 py-2 text-xs backdrop-blur-md sm:text-sm"
                style={{ color: ACCENT_SOFT }}
              >
                <Stars className="h-4 w-4" style={{ color: ACCENT }} />
                <span>Une signature spirituelle, pensée avec élégance</span>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="text-3xl font-black leading-[1.12] sm:text-5xl lg:text-7xl"
              >
                <span className="block bg-[linear-gradient(90deg,#FFF4E9_0%,#E8D8C3_36%,#C2A878_70%,#A47148_100%)] bg-clip-text text-transparent">
                  Chaînes coraniques Sana
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-5 max-w-2xl text-base leading-7 text-white/74 sm:text-lg sm:leading-8 lg:text-xl"
              >
                Une plateforme audio-visuelle dédiée à la diffusion raffinée des
                sens du Saint Coran dans les langues du monde, comme une œuvre
                de waqf sincère au service du message divin.
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <a
                  href="#features"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 text-sm font-bold shadow-[0_10px_28px_rgba(0,0,0,0.26)] transition hover:scale-[1.02] sm:px-7 sm:py-4 sm:text-base"
                  style={{
                    background: "linear-gradient(135deg,#3A2C20 0%, #5B4431 100%)",
                    borderColor: "rgba(164,113,72,0.28)",
                    color: ACCENT_SOFT,
                  }}
                >
                  <Sparkles
                    className="h-5 w-5 transition group-hover:rotate-12"
                    style={{ color: ACCENT }}
                  />
                  Découvrir la plateforme
                </a>

                <a
                  href="https://www.youtube.com/@SANA-Fr"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[rgba(232,216,195,0.14)] bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-[rgba(164,113,72,0.22)] hover:bg-white/[0.10] sm:px-7 sm:py-4 sm:text-base"
                >
                  <Play className="h-5 w-5" style={{ color: ACCENT }} />
                  Visiter notre chaîne
                </a>
              </motion.div>

              <motion.div
                custom={4}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4"
              >
                {stats.map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={isMobile ? {} : { y: [0, -4, 0] }}
                    transition={
                      isMobile
                        ? {}
                        : {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="rounded-3xl border border-[rgba(232,216,195,0.10)] bg-white/[0.06] p-3 text-center backdrop-blur-md shadow-[0_10px_24px_rgba(0,0,0,0.20)] sm:p-4"
                  >
                    <div
                      className="text-xl font-black sm:text-2xl"
                      style={{ color: ACCENT_SOFT }}
                    >
                      {item.value}
                    </div>
                    <div className="mt-2 text-xs text-white/68 sm:text-sm">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: isMobile ? 0 : -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 relative lg:order-2"
            >
              <motion.div
                animate={isMobile ? {} : { y: [0, -10, 0] }}
                transition={
                  isMobile
                    ? {}
                    : { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }
                className={`relative mx-auto max-w-2xl p-3 sm:p-4 ${softCard}`}
              >
                <div className="rounded-[1.75rem] border border-[rgba(232,216,195,0.10)] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-white/50 sm:text-sm">
                        Langue actuelle
                      </p>
                      <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                        Coran en arabe
                      </h3>
                    </div>
                    <div className="w-fit rounded-2xl border border-[rgba(164,113,72,0.22)] bg-[rgba(164,113,72,0.12)] px-4 py-2 text-xs text-[#F5E8D8] sm:text-sm">
                      Diffusion en direct
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.5rem] border border-[rgba(232,216,195,0.10)] bg-[rgba(42,31,23,0.70)] p-4 sm:mt-8 sm:p-6">
                    <div className="mb-4 flex items-start gap-3 text-sm text-white/80 sm:items-center sm:text-base">
                      <Headphones
                        className="mt-0.5 h-5 w-5 shrink-0 sm:mt-0"
                        style={{ color: ACCENT }}
                      />
                      <span>
                        Écoutez la récitation avec une présentation visuelle
                        raffinée des sens du Coran
                      </span>
                    </div>

                    {!isMobile && (
                      <div className="space-y-3">
                        {[65, 88, 42].map((w, idx) => (
                          <motion.div
                            key={idx}
                            animate={{
                              width: [`${w - 14}%`, `${w}%`, `${w - 8}%`],
                            }}
                            transition={{
                              duration: 3 + idx,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="h-3 rounded-full bg-gradient-to-r from-[#8B5E3C] via-[#E8D8C3] to-[#FFF5EA]"
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-3 gap-2 text-center sm:mt-8 sm:gap-3">
                      {heroCards.map((item) => (
                        <div
                          key={item.label}
                          className="flex min-h-[108px] flex-col items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.10)] bg-white/[0.04] px-2 py-3 sm:min-h-[120px] sm:p-4"
                        >
                          <div
                            className="text-[13px] font-bold leading-tight sm:text-lg"
                            style={{ color: ACCENT_SOFT }}
                          >
                            {item.value}
                          </div>
                          <div className="mt-2 text-[10px] leading-4 text-white/65 sm:text-xs sm:leading-5">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <HeroAudioPlayer isMobile={isMobile} />
                  </div>
                </div>
              </motion.div>

              <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                {heroBadges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="w-full rounded-[1.5rem] border border-[rgba(232,216,195,0.10)] bg-white/[0.06] px-5 py-4 text-center backdrop-blur-md shadow-[0_10px_24px_rgba(0,0,0,0.18)] sm:min-w-[220px] sm:w-auto sm:rounded-[1.6rem]"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.10)] bg-white/[0.04] sm:h-11 sm:w-11">
                          <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                        </div>
                        <div className="text-sm font-bold text-white sm:text-base">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <section id="about" className="py-4 lg:py-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-8 text-center"
            >
              <LargeSectionBadge
                icon={BookOpen}
                text="Une identité coranique mondiale"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.16 }}
                custom={0}
                variants={fadeUp}
              >
                <IdentityCard {...identityCards[0]} large isMobile={isMobile} />
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-2">
                {identityCards.slice(1).map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.16 }}
                    custom={i + 1}
                    variants={fadeUp}
                  >
                    <IdentityCard {...card} isMobile={isMobile} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 lg:py-12">
            <div className="mb-6 text-center">
              <LargeSectionBadge
                icon={Building2}
                text="Exécution et supervision"
              />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className={`relative overflow-hidden p-5 sm:p-6 md:p-10 ${gradientOuterCard}`}
            >
              {!isMobile && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(194,168,120,0.08),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(245,230,200,0.06),transparent_32%)]" />
              )}

              <div className="relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
                  <div className="rounded-[1.8rem] border border-[rgba(232,216,195,0.10)] bg-[rgba(52,39,29,0.44)] p-4 sm:p-6">
                    <div className="h-full rounded-2xl border border-[rgba(232,216,195,0.10)] bg-white/[0.04] p-4 sm:p-5">
                      <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
                        Un partenariat exécutif de confiance
                      </h2>
                      <p className="mt-5 text-base leading-8 text-white/75 sm:text-lg">
                        Le projet{" "}
                        <span className="font-bold text-white">
                          Chaînes coraniques Sana
                        </span>{" "}
                        est exécuté par{" "}
                        <span
                          className="font-bold"
                          style={{ color: ACCENT_SOFT }}
                        >
                          Saudi Jordanian Satellite Broadcasting Company (JASCO)
                        </span>{" "}
                        à Amman, en Jordanie, avec une expertise reconnue dans la
                        production médiatique et la diffusion professionnelle.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-[rgba(232,216,195,0.10)] bg-[rgba(52,39,29,0.72)] p-4 sm:p-6">
                    <div className="flex h-full flex-col justify-center rounded-2xl border border-[rgba(232,216,195,0.10)] bg-white/[0.04] p-4 sm:p-5">
                      <div className="text-sm uppercase tracking-[0.18em] text-white/55">
                        Site officiel
                      </div>
                      <div className="mt-2 text-xl font-bold sm:text-2xl">
                        Jasco Media City
                      </div>
                      <a
                        href="https://jascomediacity.net/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl border border-[rgba(164,113,72,0.22)] bg-[rgba(164,113,72,0.12)] px-5 py-3 text-sm text-[#F5E8D8] transition hover:bg-[rgba(164,113,72,0.16)] sm:text-base"
                      >
                        Visiter le site Jasco
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="features" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Sparkles, "Fonctionnalités de la plateforme")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Un design noble, un message universel
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Une plateforme coranique contemporaine qui conjugue rigueur
                savante, finesse visuelle et technologies modernes pour faire
                rayonner les sens du Saint Coran.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-10 lg:py-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Send, "Canaux de diffusion et de portée")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Une présence pensée pour le monde
              </h2>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {channels.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="portfolio" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Crown, "Nos réalisations")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Exemples de notre univers visuel et sonore
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                De belles récitations du Coran accompagnées de traductions
                élégantes des sens, pensées pour toucher les cœurs à travers le
                monde.
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {portfolioVideos.map((video, i) => (
                <ProtectedHlsVideoCard
                  key={video.id}
                  video={video}
                  index={i}
                  isMobile={isMobile}
                  activeVideoId={activeVideoId}
                  onActivate={handleActivateVideo}
                  onDeactivate={handleDeactivateVideo}
                  registerVideo={registerVideo}
                />
              ))}
            </div>
          </section>

          <section className="py-12 lg:py-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Globe, "Impact du projet")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                L’impact et le rayonnement du projet
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Un projet international qui rend les sens du Saint Coran plus
                proches, plus compréhensibles et plus présents dans les foyers
                du monde entier.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {impactCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <ImpactCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="partners" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Users, "Partenaires du succès")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Une réussite portée par la collaboration
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Le projet s’est développé grâce à une coopération harmonieuse
                entre institutions savantes, experts médias, équipes techniques
                et bénévoles engagés.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {partners.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-8 lg:py-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="text-center">
                <div
                  className="inline-flex max-w-full items-center gap-3 rounded-full border border-[rgba(232,216,195,0.12)] bg-white/[0.06] px-5 py-3 text-base font-semibold backdrop-blur-md shadow-[0_12px_26px_rgba(0,0,0,0.18)] sm:px-7 sm:py-4 sm:text-lg"
                  style={{ color: ACCENT_SOFT }}
                >
                  <Sparkles
                    className="h-5 w-5 shrink-0"
                    style={{ color: ACCENT }}
                  />
                  <span>Contactez-nous</span>
                </div>

                <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-white/75 sm:text-lg">
                  Sana est un message de da‘wa mondial. Nous accueillons avec
                  attention vos questions, suggestions et opportunités de
                  partenariat avec clarté, respect et professionnalisme.
                </p>
              </div>

              <div
                className={`mt-8 rounded-[2rem] p-4 sm:p-6 md:p-8 ${gradientOuterCard}`}
              >
                <div className="rounded-[2rem] border border-[rgba(232,216,195,0.10)] bg-[rgba(52,39,29,0.68)] p-4 sm:p-6">
                  <div className="rounded-[1.5rem] border border-[rgba(232,216,195,0.10)] bg-white/[0.04] p-4 sm:p-5">
                    <div className="mb-4 text-xl font-bold sm:text-2xl">
                      Entrer en contact
                    </div>
                    <div className="space-y-3 text-white/75">
                      <div className="rounded-2xl bg-white/[0.04] px-4 py-3 text-sm sm:text-base">
                        Notre équipe vous répondra avec plaisir dans les plus
                        brefs délais.
                      </div>
                      <a
                        href="mailto:snachannel159@gmail.com"
                        className="flex items-center justify-center gap-3 rounded-2xl border border-[rgba(164,113,72,0.22)] bg-[rgba(164,113,72,0.12)] px-4 py-3 text-center text-sm font-semibold text-[#F5E8D8] transition hover:bg-[rgba(164,113,72,0.16)] sm:text-base"
                      >
                        <Mail className="h-4 w-4" style={{ color: ACCENT }} />
                        Envoyer un e-mail
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="pb-8 pt-4 sm:pb-10">
            <div
              className={`rounded-[2rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 ${glass}`}
              style={{ backgroundColor: BG_PANEL }}
            >
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_1fr]">
                <div
                  className={`rounded-[1.8rem] border border-[rgba(232,216,195,0.10)] p-4 text-center sm:p-6 ${INNER_GRADIENT}`}
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(232,216,195,0.14)] bg-white/[0.08] shadow-[0_0_24px_rgba(194,168,120,0.12)] backdrop-blur-md sm:h-24 sm:w-24">
                    <img
                      src={sanaLogo}
                      alt="Logo Sana"
                      className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex rounded-full border border-[rgba(232,216,195,0.10)] bg-white/[0.05] px-4 py-2 text-xs text-white/90 sm:px-5 sm:text-sm">
                      Chaînes coraniques Sana
                    </span>
                  </div>

                  <div
                    className="mt-4 text-2xl font-black sm:text-3xl"
                    style={{ color: ACCENT_SOFT }}
                  >
                    Sana... Un message pour tous les mondes
                  </div>

                  <p className="mx-auto mt-4 max-w-xl rounded-[1.4rem] border border-[rgba(164,113,72,0.16)] bg-[linear-gradient(135deg,rgba(43,33,24,0.78)_0%,rgba(91,68,49,0.70)_100%)] px-4 py-4 text-sm leading-7 text-white/90 sm:px-5 sm:text-base sm:leading-8">
                    Des chaînes audio et visuelles dédiées aux traductions des
                    sens du Coran dans les langues du monde, dans une identité
                    élégante, fidèle et profondément inspirante.
                  </p>
                </div>

                <div className="rounded-[1.6rem] border border-[rgba(232,216,195,0.10)] bg-white/[0.04] p-4 sm:p-5">
                  <div className="mb-4 flex items-center gap-2 text-base font-bold text-white sm:text-lg">
                    <MessageCircle
                      className="h-5 w-5"
                      style={{ color: ACCENT }}
                    />
                    Nos coordonnées
                  </div>

                  <div className="space-y-4 text-white/72">
                    <a
                      href="mailto:snachannel159@gmail.com"
                      className="flex items-center gap-3 break-all rounded-2xl border border-[rgba(232,216,195,0.10)] bg-[rgba(42,31,23,0.52)] px-4 py-3 text-sm transition hover:bg-white/[0.08] sm:text-base"
                    >
                      <Mail
                        className="h-4 w-4 shrink-0"
                        style={{ color: ACCENT }}
                      />
                      snachannel159@gmail.com
                    </a>

                    <div className="flex items-center gap-3 rounded-2xl border border-[rgba(232,216,195,0.10)] bg-[rgba(42,31,23,0.52)] px-4 py-3 text-sm sm:text-base">
                      <MapPin
                        className="h-4 w-4 shrink-0"
                        style={{ color: ACCENT }}
                      />
                      Amman - Jordanie
                    </div>
                  </div>

                  <div className="mt-5 rounded-[1.4rem] border border-[rgba(232,216,195,0.10)] bg-[rgba(59,44,33,0.46)] p-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61570530674973"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-[rgba(232,216,195,0.10)] bg-white/[0.04] py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-white/[0.08]"
                    >
                      <Globe className="h-4 w-4" style={{ color: ACCENT }} />
                      Suivez-nous sur Facebook
                    </a>

                    <p className="mt-4 text-center text-sm leading-6 text-white/70">
                      Commencez votre parcours coranique dès maintenant
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-[rgba(232,216,195,0.10)] bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 backdrop-blur-md sm:p-5">
                  <div className="mb-5 flex items-center gap-2 text-base font-bold text-white sm:text-lg">
                    <Link2 className="h-5 w-5" style={{ color: ACCENT }} />
                    Liens de l’application
                  </div>

                  <div className="rounded-[1.4rem] border border-[rgba(232,216,195,0.10)] bg-[rgba(59,44,33,0.46)] p-4">
                    <p className="mb-4 text-sm leading-7 text-white/65">
                      Téléchargez l’application officielle pour suivre le contenu
                      coranique avec fluidité et élégance sur vos plateformes
                      préférées.
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.sana_all&pcampaignid=web_share"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-[rgba(232,216,195,0.10)] bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.10)] bg-[rgba(164,113,72,0.12)] text-white">
                            <GooglePlayIcon />
                          </div>
                          <span className="whitespace-nowrap text-sm font-bold text-white sm:text-base">
                            Google Play
                          </span>
                        </div>
                      </a>

                      <a
                        href="https://apps.apple.com/us/app/sana-tv-%D8%B3%D9%86%D8%A7/id6742054715"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-[rgba(232,216,195,0.10)] bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(232,216,195,0.10)] bg-[rgba(164,113,72,0.12)] text-white">
                            <AppStoreIcon />
                          </div>
                          <span className="text-sm font-bold text-white sm:text-base">
                            App Store
                          </span>
                        </div>
                      </a>
                    </div>

                    <div className="mt-5 rounded-[1.4rem] border border-[rgba(232,216,195,0.10)] bg-[rgba(59,44,33,0.62)] p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/65">
                        <span className="flex items-center gap-1.5">
                          <span style={{ color: ACCENT }}>★</span> Note de 4,9
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span style={{ color: ACCENT }}>🌍</span> 100+ pays
                        </span>
                      </div>

                      <a
                        href="https://www.youtube.com/@SANA-Fr"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[rgba(164,113,72,0.22)] bg-[rgba(164,113,72,0.12)] py-3 text-sm font-bold text-[#F5E8D8] transition hover:scale-[1.01] hover:bg-[rgba(164,113,72,0.16)]"
                      >
                        <Sparkles className="h-4 w-4" />
                        Commencer maintenant
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-[rgba(232,216,195,0.10)] pt-5 text-center text-xs text-white/55 sm:text-sm">
                Tous droits réservés © Chaînes coraniques Sana.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LazyMotion>
  );
}