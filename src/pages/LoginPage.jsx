import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginThunk } from 'redux/AuthReducer';

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch()

  const onSubmit = data => {
    dispatch(loginThunk(data))
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span>Email</span>
        <input {...register('email',{ required: true })}  type="email"/>
        {errors.email && <span>This field is required</span>}
      </label>
      <label>
        <span>Password</span>
        <input {...register('password',{ required: true, minLength: 7 })} />
        {errors.password && <span>This field is required</span>}
      </label>

      <input type="submit" />
    </form>
  );
}
