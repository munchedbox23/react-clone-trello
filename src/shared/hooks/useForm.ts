import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/providers/StoreProvider";
import { ROUTE } from "../helpers/constants";

interface IFormValues {
  email?: string;
  name?: string;
  password?: string;
  columnName?: string;
  cardName?: string;
}

export const useForm = <T extends IFormValues>(input: T) => {
  const [formState, setFormState] = useState(input);
  const [isFormValid, setIsFormValid] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: ChangeEvent<T>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const isValid = Object.values(formState).every((value) => !!value);
    setIsFormValid(isValid);
  }, [formState]);

  const onSubmit = (e: FormEvent<HTMLFormElement>, asyncThunk: any) => {
    e.preventDefault();
    dispatch(asyncThunk(formState))
      .then(() => navigate(`${ROUTE.home}`, { replace: true }))
      .catch((error: unknown) => console.error(error));
    setFormState(input);
  };

  return { formState, setFormState, onChange, onSubmit, isFormValid };
};
