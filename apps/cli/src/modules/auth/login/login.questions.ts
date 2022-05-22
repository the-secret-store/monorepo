import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'token' })
export class LoginQuestions {
  @Question({
    message: 'Please paste your auth token here:',
    name: 'token',
  })
  parseTask(val: string) {
    return val;
  }
}
