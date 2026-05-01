import { describe, it, expect } from 'vitest';
import {
  getRandomQuestions,
  calculateScore,
  QUIZ_QUESTIONS,
} from './quiz';

describe('Quiz Utilities', () => {
  describe('getRandomQuestions', () => {
    it('returns correct number of questions', () => {
      const questions = getRandomQuestions(3);
      expect(questions).toHaveLength(3);
    });

    it('returns all quiz questions when count exceeds total', () => {
      const questions = getRandomQuestions(100);
      expect(questions.length).toBeLessThanOrEqual(QUIZ_QUESTIONS.length);
    });

    it('returns different questions on multiple calls', () => {
      const batch1 = getRandomQuestions(5);
      const batch2 = getRandomQuestions(5);
      // Highly unlikely to get the same order twice
      const batch1Ids = batch1.map((q) => q.id).join(',');
      const batch2Ids = batch2.map((q) => q.id).join(',');
      expect(batch1Ids).not.toBe(batch2Ids);
    });
  });

  describe('calculateScore', () => {
    it('returns 0 score for empty answers', () => {
      const result = calculateScore({});
      expect(result.score).toBe(0);
      expect(result.total).toBe(0);
    });

    it('correctly calculates score for correct answers', () => {
      const q1 = QUIZ_QUESTIONS[0];
      const correctIndex = q1.options.findIndex((opt) => opt.correct);
      const result = calculateScore({
        [q1.id]: correctIndex,
      });
      expect(result.score).toBe(1);
      expect(result.total).toBe(1);
    });

    it('correctly calculates score for wrong answers', () => {
      const q1 = QUIZ_QUESTIONS[0];
      const wrongIndex = q1.options.findIndex((opt) => !opt.correct);
      const result = calculateScore({
        [q1.id]: wrongIndex,
      });
      expect(result.score).toBe(0);
      expect(result.total).toBe(1);
    });

    it('handles mixed correct and incorrect answers', () => {
      const q1 = QUIZ_QUESTIONS[0];
      const q2 = QUIZ_QUESTIONS[1];
      const correctIndex1 = q1.options.findIndex((opt) => opt.correct);
      const wrongIndex2 = q2.options.findIndex((opt) => !opt.correct);

      const result = calculateScore({
        [q1.id]: correctIndex1,
        [q2.id]: wrongIndex2,
      });
      expect(result.score).toBe(1);
      expect(result.total).toBe(2);
    });

    it('ignores answers for non-existent questions', () => {
      const result = calculateScore({
        'non-existent-id': 0,
      });
      expect(result.score).toBe(0);
      expect(result.total).toBe(0);
    });
  });

  describe('QUIZ_QUESTIONS', () => {
    it('contains questions with valid structure', () => {
      QUIZ_QUESTIONS.forEach((question) => {
        expect(question.id).toBeDefined();
        expect(question.question).toBeDefined();
        expect(question.options.length).toBeGreaterThan(0);
        expect(question.category).toBeDefined();

        question.options.forEach((option) => {
          expect(option.text).toBeDefined();
          expect(typeof option.correct).toBe('boolean');
          expect(option.explanation).toBeDefined();
        });
      });
    });

    it('has at least one correct option per question', () => {
      QUIZ_QUESTIONS.forEach((question) => {
        const correctCount = question.options.filter(
          (opt) => opt.correct
        ).length;
        expect(correctCount).toBeGreaterThan(0);
      });
    });
  });
});
