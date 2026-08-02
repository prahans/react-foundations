import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import SelectElement from "../../ui/SelectElement";
import { Radio, RadioGroup, RadioOption } from "../../ui/RadioElement";

function CreateBookingForm({ onCloseModal }) {
  return (
    <Form>
      <FormRow label="Cabin name">
        <Input type="text" id="name" />
      </FormRow>
      <FormRow label="Select Existing Guest">
        <Input type="text" id="maxCapacity" />
      </FormRow>
      <FormRow label="Arrive date">
        <Input type="number" id="regularPrice" />
      </FormRow>
      <FormRow label="departure date">
        <Input type="number" id="regularPrice" />
      </FormRow>
      <FormRow label="Status">
        <RadioGroup>
          <RadioOption>
            <Radio
              type="radio"
              id="unconfirmed"
              name="status"
              value="unconfirmed"
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
        <input type="number" id="description" />
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
        <Button size="small">Create new guest</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
