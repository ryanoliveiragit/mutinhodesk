import "./styles.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Axios from "axios";

const called = z.object({
  title: z.string().nonempty("Preencha o campo Titulo"),
  description: z.string().nonempty("Descrição do produto necessaria."),
});

type CalledProps = z.infer<typeof called>;
export const Chamados = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalledProps>({
    resolver: zodResolver(called),
    mode: "all",
  });

  const handleCalled = async (data: CalledProps) => {
    const user = localStorage.getItem('user')
    const jwt = localStorage.getItem('jwt')
    await Axios.post("http://localhost:3300/", {
      title: data.title,
      description: data.description,
      user: user
    }, { headers: { 'Authorization': `Bearer ${jwt}` } })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ data }) => console.log(data));
  };

  return (
    <div>
      <h1>Chamados</h1>
      <form onSubmit={handleSubmit(handleCalled)}>
        <TextField
          {...register("title")}
          error={!!errors.title?.message}
          type="text"
          placeholder="Título do chamado"
        />
        <TextField
          {...register("description")}
          error={!!errors.description?.message}
          type="text"
          placeholder="Descrição do chamado"
        />
        <button type="submit">Enviar chamado</button>
      </form>
    </div>
  );
};
