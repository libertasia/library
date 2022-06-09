import * as Yup from 'yup'
import { useFormik, Form, FormikProvider } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'

// ----------------------------------------------------------------------

export default function AddAuthorForm() {
  const navigate = useNavigate()

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
    onSubmit: () => {
      navigate('/dashboard/authors', { replace: true })
    },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
