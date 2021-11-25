import { TestBed, async } from '@angular/core/testing';
import {GoogleRequestDTO} from "./GoogleRequestDTO";
import {QuestionAnswerItemDTO} from "./QuestionAnswerItemDTO";
import {QuestionDTO} from "./QuestionDTO";
import {AnswerDto} from "./answer-dto";
import {CheckPasswordResetResponseDTO} from "./CheckPasswordResetResponseDTO";

describe('ModelsTester', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
    }).compileComponents();
  }));
  it('should create a GoogleRequestDTO object', () => {
    const obj = new GoogleRequestDTO('any value');
    expect(obj).toBeTruthy();
  });
  it('should create a QuestionAnswerItemDTO object', () => {
    const obj = new QuestionAnswerItemDTO();
    expect(obj).toBeTruthy();
  });
  it('should populate a QuestionAnswerItemDTO object from a QuestionDTO and an AnswerDto', () => {
    let question:QuestionDTO = {
      questionId: 0,
      questionCategoryId: 0,
      questionLevelId: 0,
      answerId: 0,
      questionTxt: 'QUESTION',
      evntTmestmp: null,
      evntOperId: ''
    };
    let answer:AnswerDto = {
      answerId:0,
      answerTxt: 'ANSWER',
      evntTmestmp: null,
      evntOperId: ''
    };
    const obj = new QuestionAnswerItemDTO();
    obj.fromDtos(question, answer);
    expect(obj.questionTxt).toEqual('QUESTION');
    expect(obj.answerTxt).toEqual('ANSWER');
  });
  it('should create CheckPasswordResetResponseDTO, invoking all of the possible constructors', () => {
    const obj1 = new CheckPasswordResetResponseDTO();
    expect(obj1).toBeTruthy();
    expect(obj1.foundRecord).toBeFalse();
    expect(obj1.uniqueId).toBeFalsy();
    expect(obj1.emailAddress).toBeFalsy();
    const obj2 = new CheckPasswordResetResponseDTO(true);
    expect(obj2).toBeTruthy();
    expect(obj2.foundRecord).toBeTrue();
    expect(obj2.uniqueId).toBeFalsy();
    expect(obj2.emailAddress).toBeFalsy();
    const obj3 = new CheckPasswordResetResponseDTO(true,'email');
    expect(obj3).toBeTruthy();
    expect(obj3.foundRecord).toBeTrue();
    expect(obj3.uniqueId).toBeFalsy();
    expect(obj3.emailAddress).toEqual('email');
    const obj4 = new CheckPasswordResetResponseDTO(true,'email','XXX');
    expect(obj4).toBeTruthy();
    expect(obj4.foundRecord).toBeTrue();
    expect(obj4.uniqueId).toEqual('XXX');
    expect(obj4.emailAddress).toEqual('email');
  });
});
