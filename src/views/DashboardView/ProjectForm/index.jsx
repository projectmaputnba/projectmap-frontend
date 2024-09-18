import { Field, Form, Formik } from 'formik';

import Button from 'components/commons/Button';

import { validateField } from 'helpers/validateField';
import InputV2 from 'components/inputs/InputV2';
import { Box } from '@mui/material';

const ProjectForm = ({ onSubmit }) => (
  <Formik onSubmit={onSubmit} initialValues={{ titulo: '', descripcion: '' }}>
    {({ handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <Field
          name="titulo"
          fieldLabel="Nombre del proyecto"
          component={InputV2}
          validate={validateField}
        />
        <Field
          name="descripcion"
          fieldLabel="Descripción"
          multiline
          component={InputV2}
          validate={validateField}
        />
        <Box sx={{ paddingLeft: '30%', paddingRight: '30%' }}>
          <Button type="submit">
            Crear
          </Button>
        </Box>
      </Form>
    )}
  </Formik>
);

export default ProjectForm;
