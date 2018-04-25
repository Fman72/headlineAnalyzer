import React from "react";

import {initialCapsString} from '~/util';

import ReactSelect from 'react-select';

function ControlledSelect(props){

  let options = [];

  if(typeof(props.options[0]) === 'string')
  {
     options = props.options.map((currentValue) => {
       return {value: currentValue, label: initialCapsString(currentValue)};
     });
  }
  else
  {
    options = props.options;
  }

  return (
    <ReactSelect
      {...props}
      options = {options}
    />
  );

}

export default ControlledSelect;
