import { useEffect, useMemo, useState } from "react";

function normalize(text) {
  return text
    .split(/\r?\n/)
    .map((w) => w.trim())
    .filter(Boolean)
    .map((w) => w.toUpperCase());
}

// Pick any fixed date; changing it changes the “daily” mapping.
const EPOCH = new Date("2024-01-01T00:00:00Z");

function dayNumberUTC(date = new Date()) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const epochUtc = Date.UTC(EPOCH.getUTCFullYear(), EPOCH.getUTCMonth(), EPOCH.getUTCDate());
  return Math.floor((utc - epochUtc) / msPerDay);
}

export function useWordLists() {
  const [answers, setAnswers] = useState([]);
  const [allowed, setAllowed] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/answers.txt").then((r) => r.text()),
      fetch("/allowed.txt").then((r) => r.text()),
    ])
      .then(([a, g]) => {
        setAnswers(normalize(a));
        setAllowed(normalize(g));
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to load word lists");
      });
  }, []);

  const allowedSet = useMemo(() => new Set(allowed), [allowed]);
  const answersSet = useMemo(() => new Set(answers), [answers]);

  const answer = useMemo(() => {
    if (answers.length === 0) return "";
    const idx = ((dayNumberUTC() % answers.length) + answers.length) % answers.length;
    return answers[idx];
  }, [answers]);

  const isValidGuess = (guess) => {
    const g = guess.toUpperCase();
    return allowedSet.has(g) || answersSet.has(g);
  };

  return { answer, isValidGuess, loaded: answers.length > 0 && allowed.length > 0, error };
}
