import React from 'react';

const validationRules = {
  min: {
    aprove: (value, length) => {
      if (typeof value === 'string') {
        return value.length >= length;
      } else if (typeof value === 'number') {
        return value >= length;
      } else if (typeof value.length !== 'undefined') {
        return value.length >= length;
      }

      return false;
    },
    message: (value, length) => {
      if (typeof value === 'string') {
        return `A frase precisa ser ter mais que ${length} caractere(s).`;
      } else if (typeof value === 'number') {
        return `O número precisa ser maior que ${length}.`;
      } else if (typeof value.length !== 'undefined') {
        return `A lista precisa de pelo menos ${length} item(s).`;
      }

      return 'Formato inválido.';
    },
  },
  required: {
    aprove: (value) => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      } else if (typeof value === 'number') {
        return value.toString().trim().length > 0;
      } else if (typeof value.length !== 'undefined') {
        return value.length > 0;
      }

      return false;
    },
    message: () => 'Esse campo é obrigatório.',
  },
};

export default {
  buildFormGroup(name, attr) {
    const hasError = attr.error && attr.error.length;
    return (
      <div className="form-group">
        <label htmlFor={attr.id}>{name}</label>
        {
          attr.type === 'select' ?
            <select
              className={`form-control ${hasError ? 'is-invalid' : ''}`}
              {...attr}
            >
              <option value="">Selecione...</option>
              {
                attr.options.map(o => (
                  <option key={o.value} value={o.value}>{o.name}</option>
                ))
              }
            </select> :
            <input
              className={`form-control ${hasError ? 'is-invalid' : ''}`}
              {...attr}
            />
        }
        {
          hasError ?
            <div className="invalid-feedback">
              {attr.error[0]}
            </div> :
            null
        }
      </div>
    );
  },

  validateRules(rules, value) {
    return rules.filter((rule) => {
      const ruleName = rule.split(':').length > 1 ?
        rule.split(':')[0] : rule;
      const ruleParam = rule.split(':').length > 1 ?
        rule.split(':')[1] : undefined;

      return validationRules[ruleName] !== undefined &&
      !validationRules[ruleName].aprove(value, ruleParam);
    }).map((rule) => {
      const ruleName = rule.split(':').length > 1 ?
        rule.split(':')[0] : rule;
      const ruleParam = rule.split(':').length > 1 ?
        rule.split(':')[1] : undefined;

      return validationRules[ruleName].message(value, ruleParam);
    });
  },
};
