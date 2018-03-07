import { ContentItem, Course, User } from "../Models/index";
import { 
  CREATED_CONTENT_ITEM,
  LIST_CONTENT_ITEMS,
  SELECTED_CONTENT_ITEM
} from "../Constants/ActionTypes";

let initialState : ContentItem = {
  contentItemId: -1,
  course: new Course({}),
  createdBy: new User({}),
  createdDate: new Date(),
  description: '',
  title: ''
};

export const listContentItems = (state: ContentItem[] = [], action: any) => {
  switch (action.type){
    case LIST_CONTENT_ITEMS:
      return action.listContentItems;
    default:
      return state;
  }
}

export const createdContentItem = (state: ContentItem = initialState, action: any) => {
  switch (action.type){
    case CREATED_CONTENT_ITEM:
      return action.createdContentItem;
    default:
      return state;
  }
}

export const selectedContentItem = (state: ContentItem = initialState, action: any) => {
  switch (action.type){
    case SELECTED_CONTENT_ITEM:
      return action.selectedContentItem;
    default:
      return state;
  }
}