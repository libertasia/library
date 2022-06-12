import { Card, Stack, Container, Typography } from '@mui/material'

export default function MyBooks() {
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          My Books
        </Typography>
      </Stack>

      <Card>
        {/* <BooksTable books={books} totalBooksCount={booksCount} /> */}
      </Card>
    </Container>
  )
}
