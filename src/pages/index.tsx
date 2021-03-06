/* @jsx jsx */
import { useEffect, useReducer } from 'react';
import { Button, Card, jsx } from 'theme-ui';
import { questions } from '../common/questions';

import { Hero } from '../components/Hero';
import { Page } from '../components/Page';
import { Question } from '../components/Question';
import { Results } from '../components/Results';
import { Section } from '../components/Section';

export type State = {
  status: 'initial' | 'quiz-in-progress' | 'quiz-finished';
  answers: { [questionId: number]: number };
  currentQuestionIndex: number;
};

const initialState: State = {
  status: 'initial',
  answers: {},
  currentQuestionIndex: 0,
};

export type Action =
  | {
      type: 'start-quiz';
    }
  | {
      type: 'select-answer';
      questionId: number;
      answerId: number;
    }
  | {
      type: 'go-to-next-question';
    }
  | {
      type: 'go-to-prev-question';
    }
  | {
      type: 'finish-quiz';
    }
  | {
      type: 'start-over';
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'start-quiz':
      return {
        ...state,
        status: 'quiz-in-progress',
      };
    case 'go-to-next-question':
      if (state.currentQuestionIndex >= questions.length) {
        return state;
      }
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case 'go-to-prev-question':
      if (state.currentQuestionIndex <= 0) {
        return state;
      }
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex - 1,
      };
    case 'select-answer':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.answerId,
        },
      };
    case 'finish-quiz':
      return {
        ...state,
        status: 'quiz-finished',
      };
    case 'start-over':
      return { ...initialState, status: 'quiz-in-progress' };

    default:
      return state;
  }
};

export default function IndexPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(
      "%cPlease don't cheat in my quiz 😊",
      'color: blue; font-size: x-large; background: white'
    );
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Backspace':
          dispatch({ type: 'go-to-prev-question' });
          return;
        case ' ':
          dispatch({ type: 'go-to-next-question' });
          return;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <Page>
      <Section>
        {state.status === 'initial' && (
          <Card>
            <Hero />
            <Button
              sx={{ mt: 3 }}
              onClick={() => dispatch({ type: 'start-quiz' })}
            >
              Start
            </Button>
          </Card>
        )}
        {state.status === 'quiz-in-progress' && (
          <Question
            selectedAnswer={state.answers[state.currentQuestionIndex]}
            questionIndex={state.currentQuestionIndex}
            dispatch={dispatch}
          />
        )}
        {state.status === 'quiz-finished' && (
          <Results answers={state.answers} dispatch={dispatch} />
        )}
      </Section>
    </Page>
  );
}
