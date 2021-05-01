import {InterviewUserDTO} from "./InterviewUserDTO";
import {QuestionDTO} from "./QuestionDTO";
import {AnswerDTO} from "./AnswerDTO";

export class QuestionAnswerItemDTO {
  questionId?: number;
  questionCategoryId?: number;
  questionLevelId?: number;
  answerId?: number;
  questionTxt?: string;
  answerTxt?: string;

  constructor() {
    this.questionId = null;
    this.questionCategoryId = null;
    this.questionLevelId = null;
    this.answerId = null;
    this.answerTxt = '';
    this.questionTxt = '';
  }

  fromDtos(question: QuestionDTO, answer: AnswerDTO) {
    this.questionId = question.questionId;
    this.questionCategoryId = question.questionCategoryId;
    this.questionLevelId = question.questionLevelId;
    this.answerId = question.answerId;
    this.answerTxt = answer.answerTxt;
    this.questionTxt = question.questionTxt;
  }
}
