import "./styles.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

const loginFormSchema = z.object({
  email: z
    .string({
      errorMap: () => {
        return { message: "Digite um e-mail válido" };
      },
    })
    .email(),
  password: z.string({
    errorMap: () => {
      return { message: "Senha inválida" };
    },
  }),
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;
export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleForm = (data: LoginFormInputs) => {
    console.log(data, "enviando dados");
    reset();
  };

  return (
    <div className="container">
      <h1>MutantWhats</h1>
      <form onSubmit={handleSubmit(handleForm)}>
        <TextField
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          type="text"
          {...register("email")}
          placeholder="E-mail"
        />
        <TextField
        error={!!errors.password?.message}
        helperText={errors.password?.message}
          type="password"
          {...register("password")}
          placeholder="Senha"
        />
        <span>{!!errors.password?.message}</span>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
