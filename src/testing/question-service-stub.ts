import {Observable} from "rxjs/Observable";
import {QuestionDTO} from "../app/models/QuestionDTO";
import {QuestionAnswerItemDTO} from "../app/models/QuestionAnswerItemDTO";
import {ResponseMessage} from "../app/models/ResponseMessage";

export class QuestionServiceStub {

  getAllQuestion(): Observable<QuestionDTO[]> {
    //return this.http.get<QuestionDTO[]>(this.getAllQuestionURL);
    return null;
  }
  findQuestionById(id: number): Observable<QuestionDTO> {
    //let findQuestionByIdURL_temp = this.findQuestionByIdURL.replace("{id}",id.toString(10));
    //return this.http.get<QuestionDTO>(this.findQuestionByIdURL+`${id}`);
    return null;
  }
  createQuestion(data: QuestionDTO): Observable<QuestionDTO> {
    //return this.http.post<QuestionDTO>(this.createQuestionURL, data, httpOptions);
    return null;
  }

  createQuestionAnswerPair(data: QuestionAnswerItemDTO): Observable<QuestionAnswerItemDTO> {
    //return this.http.post<QuestionAnswerItemDTO>(this.createQuestionAnswerURL, data, httpOptions);
    return null;
  }

  updateQuestionAnswerPair(data: QuestionAnswerItemDTO): Observable<QuestionAnswerItemDTO> {
    //return this.http.post<QuestionAnswerItemDTO>(this.updateQuestionAnswerURL, data, httpOptions);
    return null;
  }

  updateQuestion(data: QuestionDTO): Observable<QuestionDTO> {
    //return this.http.post<QuestionDTO>(this.updateQuestionURL, data, httpOptions);
    return null;
  }
  deleteQuestion(id: number): Observable<ResponseMessage> {
    //let deleteQuestionURL_temp = this.deleteQuestionURL.replace("{id}",id.toString(10));
    //return this.http.delete<ResponseMessage>(this.deleteQuestionURL+`${id}`, httpOptions);
    return null;
  }

  findQuestionByQuestionCategoryId(id: number): Observable<QuestionDTO[]>{
    //let findQuestionByQuestionCategoryIdURL_temp = this.findQuestionByQuestionCategoryIdURL.replace("{id}", id.toString(10));
    //return this.http.get<QuestionDTO[]>(this.findQuestionByQuestionCategoryIdURL+`${id}`);
    return null;
  }
  findQuestionByQuestionLevelId(id: number): Observable<QuestionDTO[]>{
    //let findQuestionByQuestionLevelIdURL_temp = this.findQuestionByQuestionLevelIdURL.replace("{id}", id.toString(10));
    //return this.http.get<QuestionDTO[]>(this.findQuestionByQuestionLevelIdURL+`${id}`);
    return null;
  }
  findQuestionByAnswerId(id: number): Observable<QuestionDTO[]>{
    //let findQuestionByAnswerIdURL_temp = this.findQuestionByAnswerIdURL.replace("{id}", id.toString(10));
    //return this.http.get<QuestionDTO[]>(this.findQuestionByAnswerIdURL+`${id}`);
    return null;
  }
  findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerId(id0: number,id1: number,id2: number): Observable<QuestionDTO[]>{
    //this.findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerIdURL = this.findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerIdURL.replace("{id0}", id0.toString(10)).replace("{id1}", id1.toString(10)).replace("{id2}", id2.toString(10));
    //return this.http.get<QuestionDTO[]>(this.findQuestionByQuestionCategoryIdAndQuestionLevelIdAndAnswerIdURL+`${id0}/${id1}/${id2}`);
    return null;
  }
}
