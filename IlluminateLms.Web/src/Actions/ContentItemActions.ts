import {
  LIST_CONTENT_ITEMS,
  CREATED_CONTENT_ITEM,
  SELECTED_CONTENT_ITEM
} from "../Constants/ActionTypes";
import { ContentItem } from "../Models";
import { ContentItemService } from "../Services";

/**
 * Create content item success
 * @param createdContentItem 
 */
const CreateContentItemSuccess = (createdContentItem: ContentItem) => ({
  type: CREATED_CONTENT_ITEM,
  createdContentItem
});

/**
 * Create content item
 * @param item 
 * @param courseId 
 */
export const CreateContentItem = (item: ContentItem, courseId: number) => (dispatch: any) => {
  return ContentItemService.CreateContentItem(item, courseId)
    .then(item => dispatch(CreateContentItemSuccess(item)))
    .catch(err => {
      throw err;
    })
}

const ListContentItemsSuccess = (listContentItems: ContentItem[]) => ({
  type: LIST_CONTENT_ITEMS,
  listContentItems
});

/**
 * List content items
 * @param courseId 
 */
export const ListContentItems = (courseId: number) => (dispatch: any) => {
  return ContentItemService.GetContentItemsForCourse(courseId)
    .then(items => dispatch(ListContentItemsSuccess(items)))
    .catch(err => {
      throw err;
    })
}

/**
 * Select content item success
 * @type {[type]}
 */
const SelectContentItemSuccess = (selectedContentItem: ContentItem) => ({
  type: SELECTED_CONTENT_ITEM,
  selectedContentItem
});

/**
 * Select content item
 * @type {[type]}
 */
export const SelectContentItem = (contentItemId: number) => (dispatch: any) => {
  return ContentItemService.GetContentItemById(contentItemId)
    .then(item => dispatch(SelectContentItemSuccess(item)))
    .catch(err => {
      throw err;
    })
}