import {QuestionCategoryDTO} from "../app/models/QuestionCategoryDTO";
import {QuestionCategoryService} from "../app/services/questioncategory/question-category.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class QuestionCategoryServiceStub {
  public changeLoaded(input: any) {
    console.log("inside QuestionCategoryServiceStub.changeLoaded method");
  }
  public changeAddMode(input: any) {
    console.log("inside QuestionCategoryServiceStub.changeAddMode method");
  }

  public changeEditMode(input: any) {
    console.log("inside QuestionCategoryServiceStub.changeEditMode method");
  }
  public disablePagination(input: any) {
    console.log("inside QuestionCategoryServiceStub.disablePagination method");
  }
  public changeShowForm(input: any) {
    console.log("inside QuestionCategoryServiceStub.changeShowForm method");
  }

  public reloadCategory() {
    console.log("inside QuestionCategoryServiceStub.reloadCategory method");
  }

  public searchQuestionCategory(searchTerm: string): void {
    console.log("inside QuestionCategoryServiceStub. method");
  }

  public initiateAddCategory(): QuestionCategoryDTO {
    console.log("inside QuestionCategoryServiceStub.initiateAddCategory method");
    const dto:QuestionCategoryDTO = {
      questionCategoryId: 0,
      questionCategoryDesc: '',
      evntTmestmp: null,
      evntOperId: '',
      displayCde: ''
    };
    return dto;
  }

  initiateEditCategoryItem(i: number): QuestionCategoryDTO {
    console.log("inside QuestionCategoryServiceStub.initiateEditCategoryItem method");
    const dto:QuestionCategoryDTO = {
      questionCategoryId: 0,
      questionCategoryDesc: '',
      evntTmestmp: null,
      evntOperId: '',
      displayCde: ''
    };
    return dto;
  }

  public deleteCategoryItem(i: number) {
    console.log("inside QuestionCategoryServiceStub.deleteCategoryItem method");
  }

  public saveResultsCategory(item: QuestionCategoryDTO) {
    console.log("inside QuestionCategoryServiceStub.saveResultsCategory method");
  }

  public destroy() {
    console.log("inside QuestionCategoryServiceStub.destroy method");
  }
}
