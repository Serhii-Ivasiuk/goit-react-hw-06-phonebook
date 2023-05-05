// Libs
import PropTypes from 'prop-types';
// Styled components
import { ListItem, Text, Number, RemoveBtn } from './ContactListItem.styled';

export const ContactListItem = ({ contactName, contactNumber, onClick }) => {
  return (
    <ListItem>
      <Text>
        {contactName}: <Number>{contactNumber}</Number>
      </Text>

      <RemoveBtn type="button" onClick={onClick}>
        Remove
      </RemoveBtn>
    </ListItem>
  );
};

ContactListItem.propTypes = {
  contactName: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
