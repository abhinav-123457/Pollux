import { useState } from "react";
import { getRandomQuestions, calculateScore, type QuizQuestion } from "../lib/quiz";
import Card from "../components/Card";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Badge from "../components/Badge";

/**
 * Interactive Election Knowledge Quiz
 * 
 * Features:
 * - Multiple choice questions
 * - Immediate feedback with explanations
 * - Score tracking
 * - Category-based questions
 * - Accessible design with ARIA labels
 */

interface AnswerState {
  [questionId: string]: number;
}

export default function Quiz() {
  const [questions] = useState<QuizQuestion[]>(() => getRandomQuestions(3));
  const [answers, setAnswers] = useState<AnswerState>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (!submitted) {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: optionIndex,
      }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowResults(false);
  };

  const { score, total } = calculateScore(answers);
  const allAnswered = Object.keys(answers).length === questions.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <main
      className="flex-grow flex flex-col items-center justify-center px-4 py-16 md:py-24 max-w-4xl mx-auto w-full"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Header */}
      <section className="text-center w-full mb-12 flex flex-col items-center">
        <Badge variant="highlight">Test Your Knowledge</Badge>
        <Heading level={2} className="mt-4 mb-2">
          Election Knowledge Quiz
        </Heading>
        <p
          className="mt-4 max-w-2xl text-lg"
          style={{
            color: "var(--pollux-text-muted)",
          }}
        >
          Test your understanding of the Indian electoral process with our interactive quiz.
        </p>
      </section>

      {/* Quiz Container */}
      <div className="w-full max-w-2xl space-y-6">
        {/* Questions */}
        {questions.map((question, qIndex) => {
          const isAnswered = question.id in answers;
          const selectedIndex = answers[question.id];

          return (
            <Card
              key={question.id}
              className="!p-6 md:!p-8"
              role="region"
              ariaLabel={`Question ${qIndex + 1}: ${question.question}`}
            >
              {/* Question header */}
              <div className="flex items-start gap-3 mb-6">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-white font-bold"
                  style={{
                    backgroundColor: "var(--pollux-red)",
                  }}
                >
                  {qIndex + 1}
                </span>
                <div className="flex-1">
                  <h3
                    className="text-lg font-semibold"
                    style={{
                      color: "var(--pollux-text)",
                    }}
                  >
                    {question.question}
                  </h3>
                  <Badge variant="secondary" className="mt-2">
                    {question.category}
                  </Badge>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, oIndex) => {
                  const isSelected = selectedIndex === oIndex;
                  const showFeedback =
                    submitted && isSelected && isAnswered;
                  const isOptionCorrect = option.correct;

                  return (
                    <div
                      key={oIndex}
                      className="group"
                    >
                      <button
                        onClick={() =>
                          handleOptionSelect(question.id, oIndex)
                        }
                        disabled={submitted}
                        className={`w-full text-left p-4 rounded border-2 transition-all duration-150 ${
                          isSelected
                            ? isOptionCorrect
                              ? "border-green-500 bg-green-50"
                              : "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        } ${submitted ? "cursor-not-allowed" : "cursor-pointer"}`}
                        aria-pressed={isSelected}
                        aria-label={`Option ${oIndex + 1}: ${option.text}`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`flex items-center justify-center w-5 h-5 rounded border-2 shrink-0 mt-0.5 transition-colors ${
                              isSelected
                                ? isOptionCorrect
                                  ? "bg-green-500 border-green-500"
                                  : "bg-red-500 border-red-500"
                                : "border-gray-300"
                            }`}
                            style={{
                              color: isSelected ? "white" : "transparent",
                            }}
                          >
                            {isSelected && (
                              <span
                                className="material-symbols-outlined text-sm"
                                aria-hidden="true"
                              >
                                {isOptionCorrect ? "check" : "close"}
                              </span>
                            )}
                          </span>
                          <div className="flex-1">
                            <span
                              style={{
                                color: "var(--pollux-text)",
                              }}
                            >
                              {option.text}
                            </span>
                          </div>
                        </div>
                      </button>

                      {/* Feedback */}
                      {showFeedback && (
                        <div
                          className="mt-2 p-3 rounded text-sm"
                          style={{
                            backgroundColor: isOptionCorrect
                              ? "#f0fdf4"
                              : "#fef2f2",
                            color: isOptionCorrect
                              ? "#166534"
                              : "#7f1d1d",
                          }}
                        >
                          <strong>
                            {isOptionCorrect ? "✓ Correct!" : "✗ Incorrect"}
                          </strong>
                          <p className="mt-1">{option.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}

        {/* Results Summary */}
        {showResults && (
          <Card className="!p-8 text-center" role="status" style={{ backgroundColor: "rgba(230, 57, 70, 0.1)", borderLeft: "4px solid var(--pollux-red)" }}>
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--pollux-text)" }}
            >
              Quiz Complete!
            </h3>
            <div
              className="mb-6"
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: percentage >= 70 ? "var(--pollux-red)" : "rgba(255,255,255,0.6)",
              }}
            >
              {percentage}%
            </div>
            <p
              className="mb-4 text-lg"
              style={{ color: "var(--pollux-text-muted)" }}
            >
              You got <strong>{score}</strong> out of <strong>{total}</strong> questions correct.
            </p>
            <p
              style={{ color: "var(--pollux-text-muted)" }}
            >
              {percentage >= 80
                ? "Excellent! You have a strong understanding of the election process."
                : percentage >= 60
                  ? "Good effort! Review the explanations above to strengthen your knowledge."
                  : "Keep learning! Read the explanations to improve your election knowledge."}
            </p>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap pt-4">
          {!submitted ? (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              title={
                allAnswered
                  ? "Submit your answers"
                  : `Answer all ${questions.length} questions to submit`
              }
            >
              Submit Quiz
            </Button>
          ) : (
            <Button onClick={handleReset}>Try Again</Button>
          )}
        </div>
      </div>
    </main>
  );
}
