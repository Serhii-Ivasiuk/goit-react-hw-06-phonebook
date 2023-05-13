// Libs
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
// Styled components
import {
  AddContactForm,
  Label,
  InputHeading,
  Input,
  SubmitBtn,
  ValidationMessage,
} from './ContactForm.styled';

const initialValues = { name: '', number: '' };

const createValidationSchema = () => {
  const nameRegExp =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  const numberRegExp =
    /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  return Yup.object().shape({
    name: Yup.string()
      .matches(
        nameRegExp,
        'Name may contain only letters, apostrophe, dash and spaces.'
      )
      .required('Name is required'),

    number: Yup.string()
      .matches(
        numberRegExp,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with "+".'
      )
      .required('Number is required'),
  });
};

export const ContactForm = ({ onSubmit }) => {
  const validationSchema = createValidationSchema();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ dirty, isValid, errors, touched }) => {
        return (
          <AddContactForm autoComplete="off">
            <Label>
              <InputHeading>Name</InputHeading>
              <Input
                type="text"
                name="name"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                validate={errors.name && touched.name}
              />
              <ValidationMessage name="name" component="span" />
            </Label>
            <Label>
              <InputHeading>Number</InputHeading>
              <Input
                type="tel"
                name="number"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                validate={errors.number && touched.number}
              />

              <ValidationMessage name="number" component="span" />
            </Label>
            <SubmitBtn disabled={!dirty || !isValid} type="submit">
              Add contact
            </SubmitBtn>
          </AddContactForm>
        );
      }}
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
