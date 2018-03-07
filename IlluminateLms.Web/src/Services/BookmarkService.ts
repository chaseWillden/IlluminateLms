import {Result, BookmarkedCourse} from "../Models";
import {ApiService} from "./ApiService";

export class BookmarkService extends ApiService{

  static BASE = "/api/bookmark/courses";

  /**
   * Create bookmarked Course
   * @param bookmarkedCourse 
   */
  static async CreateBookmark(bookmarkedCourse: BookmarkedCourse) : Promise<BookmarkedCourse>{
    let bookmark = await this.Post<Result<BookmarkedCourse>>(this.BASE, bookmarkedCourse);
    return bookmark.data;
  }

  /**
   * Get all course bookmarks
   */
  static async GetAllCourseBookmarks() : Promise<BookmarkedCourse[]>{
    let bookmarks = await this.Get<Result<BookmarkedCourse[]>>(this.BASE);
    return bookmarks.data;
  }

  /**
   * Get bookmark by course id
   * @param courseId
   */
  static async GetBookmarkByCourseId(courseId: number) : Promise<BookmarkedCourse>{
    let bookmark = await this.Get<Result<BookmarkedCourse>>(this.BASE + '/' + courseId);
    return bookmark.data || {} as BookmarkedCourse;
  }

  /**
   * Remove course bookmark
   * @param courseId 
   */
  static async RemoveCourseBookmark(courseId: number): Promise<boolean>{
    let removed = await this.Delete<Result<boolean>>(this.BASE + '/' + courseId);
    return removed.data;
  }
}