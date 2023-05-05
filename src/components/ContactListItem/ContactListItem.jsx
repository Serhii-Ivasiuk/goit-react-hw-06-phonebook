// Libs
import PropTypes from 'prop-types';

export const ContactListItem = ({ contactName, contactNumber, onClick }) => {
  return (
    <li>
      <span>
        {contactName}: {contactNumber}
      </span>
      <button type="button" onClick={onClick}>
        Remove
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contactName: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
