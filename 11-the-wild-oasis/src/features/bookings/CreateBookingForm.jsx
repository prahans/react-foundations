import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";

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
        <select>
          <option value="unconfirmed">unconfirmed</option>
          <option value="checked-in">checked-in</option>
          <option value="checked-out">checked-out</option>
        </select>
      </FormRow>
      <FormRow label="Amount">
        <Textarea type="number" id="description" />
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
