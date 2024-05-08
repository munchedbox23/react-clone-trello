import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../services/store/hooks";
import { useNavigate } from "react-router";
import { ROUTE } from "../utils/constants";

export const useForm = <T>(input: T) => {
  const [formState, setFormState] = useState(input);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>, asyncThunk: any) => {
    e.preventDefault();
    dispatch(asyncThunk(formState))
      .then(() => navigate(`${ROUTE.home}`, { replace: true }))
      .catch((error: unknown) => console.error(error));
    setFormState(input);
  };

  return { formState, setFormState, onChange, onSubmit };
};
