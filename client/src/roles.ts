export const RBAC_RULES = {
  ANONYMOUS: {
    view: ['library', 'authors', 'login'],
    actions: ['auth:login'],
  },
  USER: {
    view: ['library', 'my_books', 'authors'],
    actions: ['books:borrow', 'books:return', 'auth:logout'],
  },
}
