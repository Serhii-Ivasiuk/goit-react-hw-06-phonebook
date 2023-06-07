// Libs
import { useDispatch, useSelector } from 'react-redux';
// Styled components
import { Label, InputHeading, Input } from './Filter.styled';
// Redux actions
import { filterContacts } from 'redux/filterSlice';
// Redux selectors
import { getFilter } from 'redux/selectors';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleFilterInput = event => {
    dispatch(filterContacts(event.target.value));
  };

  return (
    <Label>
      <InputHeading>Find contacts by name</InputHeading>
      <Input
        type="text"
        name="filter"
        title="Please enter a name to find your contacts"
        value={filter}
        onChange={handleFilterInput}
      />
    </Label>
  );
};
