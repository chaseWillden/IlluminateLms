export interface RouteType {
  type: string;
  title: string;
  path: string;
}

export const RouteData: RouteType[] = [
  {type: "page", title: "Courses", path: "/courses"},
  {type: "page", title: "Course List", path: "/courses/list"},
  {type: "page", title: "Create Course", path: "/courses/create"},
  {type: "page", title: "People", path: "/people"},
  {type: "page", title: "User List", path: "/people/list"},
  {type: "page", title: "Create a User", path: "/people/create"},
  {type: 'page', title: 'Role List', path: '/roles/list'},
  {type: 'page', title: 'Create a Role', path: '/roles/create'}
];