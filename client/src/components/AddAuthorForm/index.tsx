import * as Yup from 'yup'
import { useFormik, Form, FormikProvider } from 'formik'
import { Action } from 'redux'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { AuthorsState, AppState } from '../../types'
import { addNewAuthor, resetAutorsError } from '../../redux/actions'

// ----------------------------------------------------------------------

export default function AddAuthorForm() {
  const dispatch = useDispatch()

  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [isSuccessVisible, setIsSuccessVisible] = useState(false)

  const { isAuthorAdded, error } = useSelector(
    (state: AppState) => state.authors
  )

  useEffect(() => {
    if (error) {
      setIsErrorVisible(true)
    }
    if (isAuthorAdded) {
      setIsSuccessVisible(true)
    }
  }, [error, isAuthorAdded])

  useEffect(() => {
    return () => {
      dispatch(resetAutorsError())
    }
  }, [])

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last name required'),
    birthYear: Yup.number()
      .min(1500, 'Must be later than 1500!')
      .max(2022, "Author wasn't born yet!")
      .required('Birth year required'),
    biography: Yup.string()
      .min(2, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Biography required'),
  })

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      birthYear: '',
      biography: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (initialValues, { setSubmitting, resetForm }) => {
      console.log(initialValues)
      setIsErrorVisible(false)
      ;(dispatch as ThunkDispatch<AuthorsState, void, Action>)(
        addNewAuthor(
          initialValues.firstName,
          initialValues.lastName,
          initialValues.birthYear,
          initialValues.biography
        )
      )
      if (isAuthorAdded) {
        setIsSuccessVisible(true)
        //resetForm()
      } else if (error) {
        setIsErrorVisible(true)
      }
      setSubmitting(false)
    },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

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
          autoHideDuration={3000}
          onClose={handleSuccessSnackbarClose}
        >
          <Alert
            onClose={handleSuccessSnackbarClose}
            sx={{ marginBottom: 2 }}
            severity="success"
          >
            Author added successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={isErrorVisible}
          autoHideDuration={3000}
          onClose={handleErrorSnackbarClose}
        >
          <Alert
            onClose={handleErrorSnackbarClose}
            sx={{ marginBottom: 2 }}
            severity="error"
          >
            Could not add author: {error}
          </Alert>
        </Snackbar>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            label="Birth year"
            {...getFieldProps('birthYear')}
            error={Boolean(touched.birthYear && errors.birthYear)}
            helperText={touched.birthYear && errors.birthYear}
          />

          <TextField
            fullWidth
            multiline
            minRows={5}
            maxRows={10}
            type="text"
            label="Biography"
            {...getFieldProps('biography')}
            error={Boolean(touched.biography && errors.biography)}
            helperText={touched.biography && errors.biography}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Add author
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}
