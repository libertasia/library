import { AuthorType } from './types'

export function getFilteredAuthors(authors: AuthorType[], filterValue: string) {
  return authors.filter(
    (author) =>
      author.firstName.toLowerCase().startsWith(filterValue.toLowerCase()) ||
      author.lastName.toLowerCase().startsWith(filterValue.toLowerCase())
  )
}
