import React from 'react';
import { string, func } from 'prop-types';

const InputCard = ({ labelText, id, name, type, value, onChange }) => (
  <label htmlFor={ id }>
    { labelText }
    <input
      id={ id }
      name={ name }
      type={ type }
      value={ value }
      data-testid={ id }
      onChange={ onChange }
    />
  </label>
);

InputCard.propTypes = {
  labelText: string.isRequired,
  id: string.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  type: string.isRequired,
  name: string.isRequired,
};

export default InputCard;
