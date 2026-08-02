import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { Radio, RadioGroup, RadioOption } from "../../ui/RadioElement";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useCabins } from "../cabins/useCabins";
import SelectElement from "../../ui/SelectElement";

function CreateBookingForm({ onCloseModal }) {
  const { cabins, isLoading } = useCabins();
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 2);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(defaultEndDate);
  return (
    <Form type={onCloseModal ? "model" : "regular"}>
      <FormRow label="Cabin name">
        <SelectElement>
          {cabins.map((cabin) => (
            <option key={cabin.id}>{cabin.name}</option>
          ))}
        </SelectElement>
      </FormRow>
      <FormRow label="Select Existing Guest">
        <Input type="text" id="maxCapacity" />
      </FormRow>
      <FormRow label="Start date">
        <DatePicker
          id="date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          customInput={<Input />}
        />
      </FormRow>
      <FormRow label="End date">
        <DatePicker
          id="date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          customInput={<Input />}
        />
      </FormRow>
      <FormRow label="Status">
        <RadioGroup>
          <RadioOption>
            <Radio
              type="radio"
              id="unconfirmed"
              name="status"
              value="unconfirmed"
              defaultChecked
            />
            unconfirmed
          </RadioOption>
          <RadioOption>
            <Radio
              type="radio"
              id="checked-in"
              name="status"
              value="checked-in"
            />
            checkedIn
          </RadioOption>
          <RadioOption>
            <Radio
              type="radio"
              id="checked-out"
              name="status"
              value="checked-out"
            />
            checkedOut
          </RadioOption>
        </RadioGroup>
      </FormRow>
      <FormRow label="Has breakfast">
        <RadioGroup>
          <RadioOption>
            <Radio type="radio" id="yes" name="hasBreakfast" value="true" />
            Yes
          </RadioOption>

          <RadioOption>
            <Radio
              type="radio"
              id="no"
              name="hasBreakfast"
              value="false"
              defaultChecked
            />
            No
          </RadioOption>
        </RadioGroup>
      </FormRow>
      <FormRow label="Amount">
        <Input type="number" id="description" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>Create new booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
