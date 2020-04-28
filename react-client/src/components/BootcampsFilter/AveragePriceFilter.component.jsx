import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Slider, Switch, InputNumber } from 'antd';

import { fetchBootcampsStartAsync } from 'redux/bootcamps/bootcamps.actions';

const AveragePriceFiler = ({ fetchBootcampsStartAsync }) => {

  const [firstPrice, setFirstPrice] = useState(1000);
  const [secondPrice, setSecondPrice] = useState(15000);
  const [disablePriceFilter, setDisablePriceFilter] = useState(true);

  return (
    <div style={{ width: 230 }}>
      <p>
        <b>Average Price</b>
      </p>
      <Slider
        disabled={disablePriceFilter}
        range
        tipFormatter={(value) => `$${value}000`}
        min={1}
        max={15}
        step={1}
        value={[firstPrice / 1000, secondPrice / 1000]}
        onAfterChange={() =>
          fetchBootcampsStartAsync({
            prices: [firstPrice, secondPrice],
            courses,
            otherFilters,
          })
        }
        onChange={(value) => {
          filtersStart.current = true;
          const [firstValue, secondValue] = value;
          setFirstPrice(firstValue * 1000);
          setSecondPrice(secondValue * 1000);
        }}
      />
      <InputNumber
        disabled={disablePriceFilter}
        formatter={(value) => `$ ${value}`}
        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        min={1000}
        max={15000}
        value={firstPrice}
        step={1000}
        onChange={(value) => setFirstPrice(value || 0)}
      />
      &nbsp;&nbsp; - &nbsp;&nbsp;
      <InputNumber
        disabled={disablePriceFilter}
        formatter={(value) => `$ ${value}`}
        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        min={1000}
        max={15000}
        value={secondPrice}
        step={1000}
        onChange={(value) => setSecondPrice(value || 0)}
      />
      <div style={{ marginTop: 10 }}>
        <Switch
          checked={!disablePriceFilter}
          onChange={() => {
            filtersStart.current = true;
            setDisablePriceFilter(!disablePriceFilter);
          }}
        />
      </div>
    </div>
  );
};

export default connect(null, { fetchBootcampsStartAsync })(AveragePriceFiler);
