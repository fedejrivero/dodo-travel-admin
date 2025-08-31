import React from 'react';
import { format, parseISO } from 'date-fns';

const Rates = ({rates, removeRate}) => {

  return (
    <div className="rates">
      <ul className="rates-list">
        {rates.map((rate) => (
          rate && (
            <li key={rate.id} className="rate-item">
              {rate.hotel} - {format(parseISO(rate.date), 'dd/MM/yyyy')}
              {rate.busBed && ' - ' + rate.busBed}
              {rate.regime && ' - ' + rate.regime}
              {!!rate.assist && ' - Assist'}
              {!!rate.excursions && ' - Excursión'}
              {' - ' + rate.currency}{rate.price}
              <button
                type="button"
                onClick={() => removeRate(rate.id)}
                className="remove-button"
              >
                ×
              </button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default Rates;