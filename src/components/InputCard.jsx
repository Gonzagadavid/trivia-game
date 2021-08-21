import React from 'react';
import { string, func, oneOfType, number } from 'prop-types';

const InputCard = ({ labelText, id, name, type, value, onChange }) => (
  <div className="input-container">
    <label htmlFor={ id }>
      { labelText }
      <br />
      <input
        className="login-input"
        id={ id }
        name={ name }
        type={ type }
        value={ value }
        data-testid={ id }
        onChange={ onChange }
      />
    </label>
  </div>
);

InputCard.propTypes = {
  labelText: string.isRequired,
  id: string.isRequired,
  value: oneOfType([string, number]).isRequired,
  onChange: func.isRequired,
  type: string.isRequired,
  name: string.isRequired,
};

export default InputCard;
