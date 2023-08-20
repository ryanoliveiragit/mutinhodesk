import "./styles.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

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

   const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleForm = (data: LoginFormInputs) => {
    Axios.post("http://localhost:3300/login", {
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        if (
          response.status === 200 &&
          response.data.msg === "Usuário logado com sucesso!"
        ) {
          console.log("logado com sucesso");
          localStorage.setItem("auth", "true");
          localStorage.setItem("jwt", response.data.token);
          localStorage.setItem("accessLevel", response.data.user.accessLevel);
          const userData = response.data.user.email;
          localStorage.setItem("user", JSON.stringify(userData));
  
          // Determine a rota de destino com base no nível de acesso
          const destinationRoute =
            response.data.user.accessLevel === "admin"
              ? "/admin/chamados"
              : "/user/chamados";
  
          navigate(destinationRoute);
        }
        console.log("Resposta inesperada do servidor:", response);
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              console.log(error.response.data.msg);
          }
        }
      });
  };
  
  

  return (
   <div>
    <div className="container">
      <form onSubmit={handleSubmit(handleForm)} className="form">
      <h1>MutantWhats</h1>
      <br />
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
   </div>
  );
};
