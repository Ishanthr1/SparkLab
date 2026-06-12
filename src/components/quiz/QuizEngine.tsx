"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import { SparkSays } from "@/components/mascot/SparkSays";
import { CircuitFigure } from "@/components/quiz/CircuitFigure";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { MatchQuestion, QuizQuestion } from "@/types";

interface QuizEngineProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
}

const CORRECT_CHEERS = [
  "Great job! ⚡",
  "Nailed it!",
  "You're on fire (the good kind)!",
  "Exactly right!",
  "Spark-tastic!",
];

const WRONG_ENCOURAGEMENT = [
  "Oops! Not quite — but now you know.",
  "Engineers make mistakes all the time. Let's learn from this one!",
  "Close! Check out why below.",
  "No worries — this one trips up lots of engineers.",
];

export function QuizEngine({ questions, onComplete }: QuizEngineProps) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<null | { correct: boolean }>(null);

  const question = questions[index];
  const isLast = index === questions.length - 1;

  function handleAnswer(correct: boolean) {
    if (answered) return;
    setAnswered({ correct });
    if (correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (isLast) {
      onComplete(score, questions.length);
    } else {
      setIndex((i) => i + 1);
      setAnswered(null);
    }
  }

  return (
    <div>
      {/* progress dots */}
      <div
        className="flex items-center justify-center gap-2"
        aria-label={`Question ${index + 1} of ${questions.length}`}
      >
        {questions.map((q, i) => (
          <span
            key={q.id}
            aria-hidden="true"
            className={cn(
              "h-3 w-3 rounded-full border-2 border-spark-blue",
              i < index || (i === index && answered)
                ? "bg-spark-blue"
                : i === index
                  ? "bg-spark-yellow"
                  : "bg-surface",
            )}
          />
        ))}
        <span className="ml-2 text-sm font-bold text-muted">
          {index + 1} / {questions.length}
        </span>
      </div>

      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-6"
      >
        <h3 className="text-center font-display text-xl font-bold sm:text-2xl">
          {question.prompt}
        </h3>

        {question.type === "circuit-id" && (
          <div className="mt-4">
            <CircuitFigure figure={question.figure} />
          </div>
        )}

        <div className="mt-6">
          {question.type === "multiple-choice" || question.type === "circuit-id" ? (
            <OptionButtons
              options={question.options}
              correctIndex={question.correctIndex}
              answered={Boolean(answered)}
              onAnswer={handleAnswer}
            />
          ) : question.type === "true-false" ? (
            <OptionButtons
              options={["True", "False"]}
              correctIndex={question.answer ? 0 : 1}
              answered={Boolean(answered)}
              onAnswer={handleAnswer}
            />
          ) : (
            <MatchBoard question={question} onAnswer={handleAnswer} />
          )}
        </div>
      </motion.div>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
          aria-live="polite"
        >
          <SparkSays mood={answered.correct ? "cheering" : "oops"} size={90}>
            <span className="font-bold">
              {answered.correct
                ? CORRECT_CHEERS[index % CORRECT_CHEERS.length]
                : WRONG_ENCOURAGEMENT[index % WRONG_ENCOURAGEMENT.length]}
            </span>{" "}
            {question.explanation}
          </SparkSays>
          <div className="mt-4 text-center">
            <Button size="lg" onClick={handleNext}>
              {isLast ? "Finish quiz" : "Next question"}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* --------------------------- option-style answers --------------------------- */

function OptionButtons({
  options,
  correctIndex,
  answered,
  onAnswer,
}: {
  options: string[];
  correctIndex: number;
  answered: boolean;
  onAnswer: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);

  function pick(i: number) {
    if (answered) return;
    setPicked(i);
    onAnswer(i === correctIndex);
  }

  return (
    <ul className="mx-auto grid max-w-xl gap-3">
      {options.map((option, i) => {
        const isCorrect = answered && i === correctIndex;
        const isWrongPick = answered && picked === i && i !== correctIndex;
        return (
          <li key={option}>
            <button
              type="button"
              onClick={() => pick(i)}
              disabled={answered}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold transition-colors",
                !answered && "border-border bg-surface hover:border-spark-blue hover:bg-spark-blue-soft",
                isCorrect && "border-spark-green bg-spark-green-soft",
                isWrongPick && "border-spark-red bg-spark-red-soft",
                answered && !isCorrect && !isWrongPick && "border-border bg-surface opacity-60",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-display font-bold",
                  isCorrect
                    ? "border-spark-green bg-spark-green text-white"
                    : isWrongPick
                      ? "border-spark-red bg-spark-red text-white"
                      : "border-border",
                )}
              >
                {isCorrect ? <Check className="h-5 w-5" /> : isWrongPick ? <X className="h-5 w-5" /> : String.fromCharCode(65 + i)}
              </span>
              {option}
              {isCorrect && <span className="sr-only">(correct answer)</span>}
              {isWrongPick && <span className="sr-only">(your answer, incorrect)</span>}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------ match answers ------------------------------ */

/**
 * Drag-and-drop style matching, implemented as click-to-place so it works
 * with touch, mouse, and keyboard alike: pick up a chip, then choose a slot.
 */
function MatchBoard({
  question,
  onAnswer,
}: {
  question: MatchQuestion;
  onAnswer: (correct: boolean) => void;
}) {
  // Shuffle deterministically by id so the order is stable across renders.
  const shuffled = useMemo(() => {
    const rights = question.pairs.map((p) => p.right);
    const seed = [...question.id].reduce((a, c) => a + c.charCodeAt(0), 0);
    return rights
      .map((value, i) => ({ value, key: (i * 31 + seed) % 97 }))
      .sort((a, b) => a.key - b.key)
      .map((x) => x.value);
  }, [question]);

  const [held, setHeld] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const unplacedChips = shuffled.filter(
    (r) => !Object.values(placed).includes(r),
  );
  const allPlaced = question.pairs.every((p) => placed[p.left]);

  function placeOnSlot(left: string) {
    if (checked) return;
    setPlaced((prev) => {
      const next = { ...prev };
      if (held) {
        next[left] = held;
      } else if (next[left]) {
        // Tapping a filled slot with empty hands picks the chip back up.
        setHeld(next[left]);
        delete next[left];
        return next;
      }
      return next;
    });
    if (held) setHeld(null);
  }

  function check() {
    setChecked(true);
    const correct = question.pairs.every((p) => placed[p.left] === p.right);
    onAnswer(correct);
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-center text-sm font-semibold text-muted">
        Tap an answer chip, then tap the matching slot. Tap a filled slot to
        pick its chip back up.
      </p>

      {/* chip bank */}
      <ul className="mt-4 flex min-h-12 flex-wrap items-center justify-center gap-2">
        {unplacedChips.map((chip) => (
          <li key={chip}>
            <button
              type="button"
              onClick={() => setHeld(held === chip ? null : chip)}
              aria-pressed={held === chip}
              disabled={checked}
              className={cn(
                "rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors",
                held === chip
                  ? "border-spark-orange bg-spark-orange-soft ring-2 ring-spark-orange"
                  : "border-spark-blue bg-spark-blue-soft hover:bg-spark-blue hover:text-white",
              )}
            >
              {chip}
            </button>
          </li>
        ))}
        {unplacedChips.length === 0 && (
          <li className="text-sm font-semibold text-muted">All chips placed!</li>
        )}
      </ul>

      {/* slots */}
      <ul className="mt-4 grid gap-3">
        {question.pairs.map((pair) => {
          const value = placed[pair.left];
          const isRight = checked && value === pair.right;
          const isWrong = checked && value !== pair.right;
          return (
            <li key={pair.left} className="grid grid-cols-[1fr_1fr] items-center gap-3">
              <span className="text-right font-display font-bold">{pair.left}</span>
              <button
                type="button"
                onClick={() => placeOnSlot(pair.left)}
                disabled={checked}
                className={cn(
                  "min-h-12 rounded-xl border-2 border-dashed px-3 py-2 text-sm font-bold transition-colors",
                  !value && "border-border bg-background text-muted",
                  value && !checked && "border-spark-blue border-solid bg-spark-blue-soft",
                  isRight && "border-solid border-spark-green bg-spark-green-soft",
                  isWrong && "border-solid border-spark-red bg-spark-red-soft",
                )}
              >
                {value ?? (held ? "Drop here" : "Empty")}
                {isRight && <Check aria-label="correct" className="ml-1 inline h-4 w-4" />}
                {isWrong && (
                  <span className="block text-xs font-semibold text-spark-red">
                    answer: {pair.right}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {!checked && (
        <div className="mt-4 text-center">
          <Button onClick={check} disabled={!allPlaced}>
            Check my matches
          </Button>
        </div>
      )}
    </div>
  );
}
