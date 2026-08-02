import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { Radio, RadioGroup, RadioOption } from "../../ui/RadioElement";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import SelectElement from "../../ui/SelectElement";
import Spinner from "../../ui/Spinner";
import { useGuests } from "./useGuests";
import { useAvailableCabins } from "./useAvailableCabins";
import { useForm } from "react-hook-form";

const defaultEndDate = new Date();
defaultEndDate.setDate(defaultEndDate.getDate() + 2);

function CreateBookingForm({ onCloseModal }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [numGuests, setNumGuests] = useState(1);

  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];

  // const { cabins, isLoading: isLoadingCabins } = useCabins();
  const { guests, isLoading: isLoadingGuests } = useGuests();

  const { availableCabins, isLoading: isLoadingAvailableCabins } =
    useAvailableCabins(start, end, numGuests);

  if (isLoadingAvailableCabins || isLoadingGuests) return <Spinner />;

  return (
    <Form type={onCloseModal ? "model" : "regular"}>
      <FormRow label="Select Existing Guest">
        <SelectElement
          {...register("guest", { required: "This field is required" })}
        >
          {guests?.map((guest) => (
            <option key={guest.id}>{guest.fullName}</option>
          ))}
        </SelectElement>
      </FormRow>

      <FormRow label="Number of Guests (max 10)">
        <Input
          type="number"
          id="numGuests"
          value={numGuests}
          onChange={(e) => Number(setNumGuests(e.target.value))}
          min="1"
          max="10"
        />
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

      <FormRow label="Cabin name">
        <SelectElement>
          {availableCabins?.map((availableCabin) => (
            <option key={availableCabin.id}>{availableCabin.name}</option>
          ))}
        </SelectElement>
      </FormRow>

      <FormRow label="Breakfast included">
        <RadioGroup>
          <RadioOption>
            <Radio type="radio" id="yes" name="hasBreakfast" value="true" />
            Yes
          </RadioOption>

          <RadioOption>
            <Radio type="radio" id="no" name="hasBreakfast" value="false" />
            No
          </RadioOption>
        </RadioGroup>
      </FormRow>

      <FormRow label="Payment confirmed">
        <RadioGroup>
          <RadioOption>
            <Radio type="radio" id="yes" name="isPaid" value="true" />
            Yes
          </RadioOption>

          <RadioOption>
            <Radio type="radio" id="no" name="isPaid" value="false" />
            No
          </RadioOption>
        </RadioGroup>
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
