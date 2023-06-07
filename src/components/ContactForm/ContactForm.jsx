// Libs
import { useSelector, useDispatch } from 'react-redux';
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
// Redux selectors
import { getContacts } from 'redux/selectors';
// Redux actions
import { addContact } from 'redux/contactsSlice';

const initialValues = { name: '', number: '' };

const validationSchema = (() => {
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
})();

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const { name, number } = values;
    const { resetForm } = actions;

    const isExistName = contacts.some(item => item.name === name);
    const isExistNumber = contacts.find(item => item.number === number);

    if (isExistName) {
      return alert(`Contact with name "${name}" is already in contacts`);
    } else if (isExistNumber) {
      return alert(
        `Number "${number}" is already in contacts with name "${isExistNumber.name}"`
      );
    }

    dispatch(addContact(name, number));

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
