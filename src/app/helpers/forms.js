import React from 'react';

export default {
  buildFormGroup(name, attr) {
    return (
      <div className="form-group">
        <label htmlFor={attr.id}>{name}</label>
        <input
          className="form-control"
          {...attr}
        />
      </div>
    );
  },
};
