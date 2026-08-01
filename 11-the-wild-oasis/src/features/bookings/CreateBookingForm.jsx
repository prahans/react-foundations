import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

function CreateBookingForm() {
  return (
    <Form>
      <FormRow label="Cabin name">
        <Input type="text" id="name" />
      </FormRow>
      <FormRow label="Guest full name">
        <Input type="text" id="maxCapacity" />
      </FormRow>
      <FormRow label="Start date & end date">
        <Input type="number" id="regularPrice" />
      </FormRow>
      <FormRow label="Status">
        <Input type="number" id="discount" />
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
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
