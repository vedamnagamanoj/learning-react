import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createCabin } from "../../services/apiCabins";

function CreateCabinForm({ cabinToEdit }) {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    getValues: getFormValues,
    formState: { errors: formError },
  } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      resetForm();
    },
    onError: (err) => toast.error(err.message),
  });
  function onSubmit(data) {
    // console.log(data);
    mutate({ ...data, image: data.image[0] });
  }
  // function onError(errors) {
  //   console.log(errors);
  // }
  return (
    // <Form onSubmit={handleSubmit(onSubmit, onError)}>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={formError?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={formError?.maxCapacity?.message}>
        <Input
          type="text"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be atleast 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={formError?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 100, message: "Price should be atleast 100" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={formError?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getFormValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={formError?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          disabled={isCreating}
          id="image"
          accept="image/*"
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
