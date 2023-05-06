// Libs
import PropTypes from 'prop-types';
// Styled components
import { Label, InputHeading, Input } from './Filter.styled';

export const Filter = ({ value, onChange }) => {
  return (
    <Label>
      <InputHeading>Find contacts by name</InputHeading>
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
