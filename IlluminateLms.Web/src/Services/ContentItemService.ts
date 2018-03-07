import {Result, ContentItem} from "../Models";
import {ApiService} from "./ApiService";

export class ContentItemService extends ApiService{

  static BASE = "/api/contentitem";

  /**
   * Create content item
   * @param item 
   * @param courseId 
   */
  static async CreateContentItem(item: ContentItem, courseId: number) : Promise<ContentItem>{
    let results = await this.Post<Result<ContentItem>>(`${this.BASE}/${courseId}`, item);
    return results.data;
  }

  /**
   * Get content items for course
   * @param courseId 
   */
  static async GetContentItemsForCourse(courseId: number) : Promise<ContentItem[]>{
    let results = await this.Get<Result<ContentItem[]>>(`${this.BASE}/${courseId}/course`);
    return results.data;
  }

  /**
   * Delete content item
   * @param contentItemId 
   */
  static async DeleteContentItem(contentItemId: number) : Promise<boolean>{
    let results = await this.Delete<Result<boolean>>(`${this.BASE}/${contentItemId}`);
    return results.data;
  }

  /**
   * Copy content item
   * @param contentItemId 
   */
  static async CopyContentItem(contentItemId: number) : Promise<ContentItem>{
    let results = await this.Post<Result<ContentItem>>(`${this.BASE}/${contentItemId}/copy`, {});
    return results.data;
  }

  /**
   * Rename content item
   * @param contentItemId 
   * @param title 
   */
  static async RenameContentItem(contentItemId: number, title: string) : Promise<ContentItem>{
    let results = await this.Post<Result<ContentItem>>(`${this.BASE}/${contentItemId}/rename`, title);
    return results.data;
  }

  /**
   * Reorder content items
   * @param  {number[]}         contentItemIds [description]
   * @return {Promise<boolean>}                [description]
   */
  static async ReorderContentItems(contentItemIds: number[]) : Promise<boolean>{
    let results = await this.Post<Result<boolean>>(`${this.BASE}/reorder`, contentItemIds);
    return results.data;
  }

  /**
   * Get content item by id
   * @param  {number}               contentItemId [description]
   * @return {Promise<ContentItem>}               [description]
   */
  static async GetContentItemById(contentItemId: number) : Promise<ContentItem>{
    let results = await this.Get<Result<ContentItem>>(`${this.BASE}/${contentItemId}`);
    return results.data;
  }
}