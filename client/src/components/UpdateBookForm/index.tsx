import * as Yup from 'yup'
import { useFormik, Form, FormikProvider } from 'formik'
import { Action } from 'redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import MenuItem from '@mui/material/MenuItem'

import {
  BooksState,
  AppState,
  CategoriesState,
  AuthorsState,
  BookPropType,
} from '../../types'
import {
  resetBooksFormSnackbar,
  getCategories,
  getAuthors,
  resetAutorsLoadedStatus,
  updateBook,
} from '../../redux/actions'

// ----------------------------------------------------------------------

export default function UpdateBookForm({ book }: BookPropType) {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const authorsIds = book.authors.map((author) => author._id)

  const { isBookUpdated, error } = useSelector(
    (state: AppState) => state.booksData
  )

  const { categories, isCategoriesLoaded } = useSelector(
    (state: AppState) => state.categories
  )

  const { authors, isAuthorsLoaded } = useSelector(
    (state: AppState) => state.authors
  )

  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [isSuccessVisible, setIsSuccessVisible] = useState(false)

  useEffect(() => {
    return () => {
      dispatch(resetBooksFormSnackbar())
      dispatch(resetAutorsLoadedStatus())
    }
  }, [dispatch])

  useEffect(() => {
    if (!isCategoriesLoaded) {
      ;(dispatch as ThunkDispatch<CategoriesState, void, Action>)(
        getCategories()
      )
    }
  }, [dispatch, isCategoriesLoaded])

  useEffect(() => {
    if (!isAuthorsLoaded) {
      ;(dispatch as ThunkDispatch<AuthorsState, void, Action>)(getAuthors())
    }
  }, [dispatch, isAuthorsLoaded])

  const RegisterSchema = Yup.object().shape({
    isbn: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(13, 'ISBN must contain 13 digits!')
      .max(13, 'ISBN must contain 13 digits!')
      .required('ISBN required'),
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Title required'),
    categoryId: Yup.string().required('Category required'),
    description: Yup.string()
      .min(2, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Description required'),
    publisher: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Publisher required'),
    authorsIds: Yup.array().required('Author required'),
    publishedYear: Yup.number()
      .min(1377, 'Must be later than 1377!')
      .max(2022, 'Can not be in future!')
      .required('Published year required'),
    numPage: Yup.number()
      .min(1, 'Must be greater than 1!')
      .max(9999, 'Must be less than 9999!')
      .required('Number of pages required'),
  })

  const formik = useFormik({
    initialValues: {
      isbn: book.isbn,
      title: book.title,
      categoryId: book.category._id,
      description: book.description,
      publisher: book.publisher,
      authorsIds: authorsIds,
      publishedYear: book.publishedYear,
      numPage: book.numPage,
    },
    validationSchema: RegisterSchema,
    onSubmit: (initialValues, { setSubmitting, resetForm }) => {
      setIsErrorVisible(false)
      ;(dispatch as ThunkDispatch<BooksState, void, Action>)(
        updateBook(
          book._id,
          initialValues.isbn,
          initialValues.title,
          initialValues.categoryId,
          initialValues.description,
          initialValues.publisher,
          initialValues.authorsIds,
          initialValues.publishedYear,
          initialValues.numPage
        )
      )
      setSubmitting(false)
    },
  })

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    resetForm,
  } = formik

  useEffect(() => {
    if (error) {
      setIsErrorVisible(true)
    }
    if (isBookUpdated) {
      dispatch(resetAutorsLoadedStatus())
      setIsSuccessVisible(true)
      resetForm()
      navigate('/dashboard/books', { replace: true })
    }
  }, [dispatch, error, isBookUpdated, resetForm, navigate])

  const handleSuccessSnackbarClose = () => {
    setIsSuccessVisible(false)
  }

  const handleErrorSnackbarClose = () => {
    setIsErrorVisible(false)
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Snackbar
          open={isSuccessVisible}
          autoHideDuration={5000}
          onClose={handleSuccessSnackbarClose}
        >
          <Alert
            onClose={handleSuccessSnackbarClose}
            sx={{ marginBottom: 2 }}
            severity="success"
          >
            Book updated successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={isErrorVisible}
          autoHideDuration={5000}
          onClose={handleErrorSnackbarClose}
        >
          <Alert
            onClose={handleErrorSnackbarClose}
            sx={{ marginBottom: 2 }}
            severity="error"
          >
            Could not update book: {error}
          </Alert>
        </Snackbar>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Title"
            {...getFieldProps('title')}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              id="select-category"
              select
              label="Category"
              {...getFieldProps('categoryId')}
              error={Boolean(touched.categoryId && errors.categoryId)}
              helperText={touched.categoryId && errors.categoryId}
            >
              {categories.map((category) => (
                <MenuItem key={category.title} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              id="select-authors"
              select
              SelectProps={{
                multiple: true,
              }}
              label="Authors"
              {...getFieldProps('authorsIds')}
              error={Boolean(touched.authorsIds && errors.authorsIds)}
              helperText={touched.authorsIds && errors.authorsIds}
            >
              {authors.map((author) => (
                <MenuItem key={author._id} value={author._id}>
                  {author.firstName.charAt(0)} {author.lastName}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="ISBN"
              {...getFieldProps('isbn')}
              error={Boolean(touched.isbn && errors.isbn)}
              helperText={touched.isbn && errors.isbn}
            />

            <TextField
              fullWidth
              label="Publisher"
              {...getFieldProps('publisher')}
              error={Boolean(touched.publisher && errors.publisher)}
              helperText={touched.publisher && errors.publisher}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Published year"
              {...getFieldProps('publishedYear')}
              error={Boolean(touched.publishedYear && errors.publishedYear)}
              helperText={touched.publishedYear && errors.publishedYear}
            />

            <TextField
              fullWidth
              label="Number of pages"
              {...getFieldProps('numPage')}
              error={Boolean(touched.numPage && errors.numPage)}
              helperText={touched.numPage && errors.numPage}
            />
          </Stack>

          <TextField
            fullWidth
            multiline
            minRows={5}
            maxRows={10}
            type="text"
            label="Description"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Add book
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}
