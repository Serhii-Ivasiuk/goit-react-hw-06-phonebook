// Libs
import PropTypes from 'prop-types';
// Styled components
import { Label, LabelText, Input } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  return (
    <Label>
      <LabelText>Find contacts by name</LabelText>
      <Input
        type="text"
        name="filter"
        title="Please enter a name to find your contacts"
        value={value}
        onChange={onChange}
      />
    </Label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
