import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useForm } from "react-hook-form";

function UpdateSettingsForm() {
  // const {
  //   minBookingLength,
  //   maxBookingLength,
  //   maxGuestsPerBooking,
  //   breakfastPrice,
  // } = useSettings();
  const { settings = {}, isPending: isSettingsLoading } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  function handleUpdate(evnt, field) {
    const { value } = evnt.target;

    if (!value) return;

    updateSetting({ [field]: value });
  }

  if (isSettingsLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(evnt) => handleUpdate(evnt, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(evnt) => handleUpdate(evnt, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(evnt) => handleUpdate(evnt, "maxGuestPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(evnt) => handleUpdate(evnt, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
