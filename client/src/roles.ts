export const RBAC_RULES = {
  ANONYMOUS: {
    view: ['library', 'authors', 'login'],
    actions: ['auth:login'],
  },
  USER: {
    view: ['library', 'my_books', 'authors'],
    actions: ['books:borrow', 'books:return', 'auth:logout'],
  },
  ADMIN: {
    view: ['library', 'my_books', 'authors', 'add_author', 'add_book'],
    actions: [
      'books:borrow',
      'books:return',
      'auth:logout',
      'books:add',
      'books:delete',
      'books:update',
      'authors:add',
      'authors:delete',
      'authors:update',
    ],
  },
}
