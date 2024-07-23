import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";

const EMAIL_REGEX = /\S+@\S+\.\S+/;

// register function returns an object with props to spread onto the form field element

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { signup, isPending: isSigningUp } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      { onSettled: () => reset()}
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} >
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Please provide a valid email address"
            }
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs to be at least 8 characters long"
            }
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => value === getValues().password || "Passwords need to match"
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={reset}
          disabled={isSigningUp}
        >
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
