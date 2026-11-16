"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function WelcomeExperience({
  initialSoundOn,
}: {
  initialSoundOn: boolean;
}) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundOn, setSoundOn] = useState(initialSoundOn);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!soundOn) return;
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;
    audio.volume = 0.55;

    const attempt = () => {
      audio
        .play()
        .then(() => {
          if (!cancelled) setAudioBlocked(false);
        })
        .catch(() => {
          if (!cancelled) setAudioBlocked(true);
        });
    };

    // Autoplay first; if the browser blocks it, retry on the first gesture.
    attempt();
    const onGesture = () => attempt();
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      audio.pause();
    };
  }, [soundOn]);

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    document.cookie = `dn_sound=${next ? "on" : "off"}; Path=/; Max-Age=31536000; SameSite=Lax`;

    const audio = audioRef.current;
    if (!audio) return;

    if (next) {
      audio.volume = 0.55;
      audio.currentTime = 0;
      void audio
        .play()
        .then(() => setAudioBlocked(false))
        .catch(() => setAudioBlocked(true));
    } else {
      audio.pause();
    }
  }

  function handleStart() {
    if (leaving) return;
    setLeaving(true);
    document.cookie =
      "dn_intro_seen=1; Path=/; Max-Age=604800; SameSite=Lax";

    const audio = audioRef.current;
    if (audio && !audio.paused) {
      let volume = audio.volume;
      const fade = window.setInterval(() => {
        volume = Math.max(0, volume - 0.07);
        audio.volume = volume;
        if (volume === 0) {
          window.clearInterval(fade);
          audio.pause();
        }
      }, 45);
    }

    window.setTimeout(() => router.push("/login"), 620);
  }

  return (
    <main className="intro-shell relative flex min-h-dvh flex-col overflow-hidden">
      <div aria-hidden className="intro-orb left-[-10%] top-[8%] h-[30rem] w-[30rem] bg-violet-600/28" />
      <div aria-hidden className="intro-orb right-[-8%] top-[26%] h-[26rem] w-[26rem] bg-fuchsia-700/18 [animation-delay:-6s]" />
      <div aria-hidden className="intro-orb bottom-[-16%] left-1/3 h-[28rem] w-[28rem] bg-violet-700/24 [animation-delay:-11s]" />
      <div aria-hidden className="absolute inset-0 grid-fade opacity-30" />
      <div aria-hidden className="intro-grain" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(4,3,8,0.85)_100%)]"
      />

      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        <div className="intro-rise flex items-center gap-2.5">
          <LogoMark className="h-6 w-6" />
          <span className="font-mono text-[0.52rem] uppercase tracking-[0.24em] text-ash">
            Darknote Hosts
          </span>
        </div>

        <div className="flex items-center gap-3">
          {audioBlocked && soundOn ? (
            <span
              aria-live="polite"
              className="hidden font-mono text-[0.52rem] uppercase tracking-[0.12em] text-ash/80 sm:block"
            >
              Sound starts on first tap
            </span>
          ) : null}

          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-black/25 px-3.5 py-2 text-[0.68rem] text-mist backdrop-blur-md transition-colors hover:border-violet-400/40 hover:text-chalk"
          >
            {soundOn ? (
              <Volume2 className="h-3.5 w-3.5 text-violet-300" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-ash" />
            )}
            <span className="hidden sm:inline">
              Sound {soundOn ? "on" : "off"}
            </span>
          </button>
        </div>
      </header>

      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-12 pt-6 text-center sm:px-8">
        <div className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
          <div className="intro-orbit absolute inset-0 rounded-full border border-violet-500/15">
            <span className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-200 shadow-[0_0_14px_rgba(196,181,253,0.95)]" />
          </div>
          <div className="intro-orbit-reverse absolute inset-6 rounded-full border border-dashed border-violet-400/15" />
          <div className="absolute inset-6 rounded-full bg-violet-500/30 blur-3xl" />
          <LogoMark className="intro-mark relative h-24 w-24 sm:h-28 sm:w-28" />
          <div className="intro-sweep pointer-events-none absolute inset-y-2 left-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-md" />
        </div>

        <p className="eyebrow intro-rise intro-d1 mt-10">Welcome to</p>

        <h1 className="mt-4">
          <span className="intro-rise intro-d2 block text-[clamp(2rem,7vw,4.2rem)] font-semibold leading-none tracking-[0.26em] text-chalk [text-shadow:0_0_50px_rgba(124,77,255,0.35)]">
            DARKNOTE
          </span>
          <span className="intro-rise intro-d3 mt-3 block text-[0.72rem] tracking-[0.68em] text-violet-300 sm:text-[0.86rem]">
            HOSTS
          </span>
        </h1>

        <div
          aria-hidden
          className="intro-line mt-8 h-px w-28 origin-center bg-gradient-to-r from-transparent via-violet-400/70 to-transparent"
        />

        <p className="intro-rise intro-d3 mt-8 max-w-xl text-balance text-[1.02rem] leading-relaxed text-mist sm:text-[1.18rem]">
          Always-on hosting for the bots that keep your work moving.
        </p>
        <p className="intro-rise intro-d4 mt-3 max-w-lg text-balance text-[0.78rem] leading-relaxed text-ash sm:text-[0.84rem]">
          An independent control plane for messaging bots and internal
          automations — isolated workspaces, supervised runtimes and a quieter
          way to operate.
        </p>

        <div className="intro-rise intro-d5 mt-10 w-full max-w-[17rem]">
          <Button
            size="lg"
            className="w-full"
            onClick={handleStart}
            disabled={leaving}
          >
            {leaving ? "Entering…" : "Get Started"}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>

        <p className="intro-rise intro-d6 mt-6 font-mono text-[0.52rem] uppercase tracking-[0.2em] text-ash/60">
          {soundOn ? "Sound on" : "Sound off"} · Press start to continue
        </p>
      </section>

      <footer className="relative z-10 flex items-center justify-between gap-4 border-t border-[var(--hairline)] px-5 py-4 font-mono text-[0.52rem] uppercase tracking-[0.16em] text-ash/50 sm:px-8">
        <span>{site.name}</span>
        <span className="hidden sm:inline">Private control plane</span>
        <span>v{site.version}</span>
      </footer>

      <div
        aria-hidden
        className={cn("intro-veil", leaving && "intro-veil-active")}
      />

      <audio
        ref={audioRef}
        src="/audio/darknote-startup.wav"
        preload="auto"
        aria-hidden
      />
    </main>
  );
}
