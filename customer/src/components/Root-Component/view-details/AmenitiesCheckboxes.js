import React from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export default function AmenitiesCheckboxes() {
  const [state, setState] = React.useState({
    breakfast: false,
    airConditioning: false,
    wifi: false,
    parking: false,
    swimmingPool: false,
    gym: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.breakfast}
            onChange={handleChange}
            name="breakfast"
          />
        }
        label="Breakfast Available"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.airConditioning}
            onChange={handleChange}
            name="airConditioning"
          />
        }
        label="Air Conditioning Available"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.wifi}
            onChange={handleChange}
            name="wifi"
          />
        }
        label="WiFi Available"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.parking}
            onChange={handleChange}
            name="parking"
          />
        }
        label="Parking Available"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.swimmingPool}
            onChange={handleChange}
            name="swimmingPool"
          />
        }
        label="Swimming Pool Available"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.gym}
            onChange={handleChange}
            name="gym"
          />
        }
        label="Gym Available"
      />
    </FormGroup>
  );
}
