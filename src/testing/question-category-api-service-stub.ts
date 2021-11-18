import {Observable} from "rxjs/Observable";
import {QuestionCategoryDTO} from "../app/models/QuestionCategoryDTO";
import {ResponseMessage} from "../app/models/ResponseMessage";

export class QuestionCategoryApiServiceStub {

  getAllQuestionCategory(): Observable<QuestionCategoryDTO[]> {
    //return this.http.get<QuestionCategoryDTO[]>(this.getAllQuestionCategoryURL);
    return null;
  }
  findQuestionCategoryById(id: number): Observable<QuestionCategoryDTO> {
    //let findQuestionCategoryByIdURL_temp = this.findQuestionCategoryByIdURL.replace("{id}",id.toString(10));
    //return this.http.get<QuestionCategoryDTO>(this.findQuestionCategoryByIdURL+`${id}`);
    return null;
  }
  createQuestionCategory(data: QuestionCategoryDTO): Observable<QuestionCategoryDTO> {
    //return this.http.post<QuestionCategoryDTO>(this.createQuestionCategoryURL, data, httpOptions);
    return null;
  }
  updateQuestionCategory(data: QuestionCategoryDTO): Observable<QuestionCategoryDTO> {
    //return this.http.post<QuestionCategoryDTO>(this.updateQuestionCategoryURL, data, httpOptions);
    return null;
  }
  deleteQuestionCategory(id: number): Observable<ResponseMessage> {
    //let deleteQuestionCategoryURL_temp = this.deleteQuestionCategoryURL.replace("{id}",id.toString(10));
    //return this.http.delete<ResponseMessage>(this.deleteQuestionCategoryURL+`${id}`, httpOptions);
    return null;
  }
}
