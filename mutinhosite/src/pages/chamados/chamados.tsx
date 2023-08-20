import "./styles.css";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import { Header } from "../../components/header";

const called = z.object({
  title: z.string().nonempty("Preencha o campo Título"),
  client: z.string().nonempty("Preencha o campo Cliente"),
  description: z.string().nonempty("Descrição do produto necessária."),
});

type CalledProps = z.infer<typeof called> & {
  date: string;
};

export const Chamados = () => {
  const { register, handleSubmit, reset } = useForm<CalledProps>({
    resolver: zodResolver(called),
    mode: "all",
  });


  const handleCalled = async (data: CalledProps) => {
    const user = localStorage.getItem("user");
    const jwt = localStorage.getItem("jwt");
    const currentDate = new Date().toString(); // Obtém a data atual no formato ISO

    await Axios.post(
      "http://localhost:3300/",
      {
        title: data.title,
        client: data.client,
        description: data.description,
        responsible: 'Não atribuido',
        status: "Pendente",
        user: user,
        email: user,
        date: currentDate, // Adiciona a data ao objeto enviado
      },
      { headers: { Authorization: `Bearer ${jwt}` } }
    )
      .then(({ data }) => {
        console.log(data);
        reset();
      })
      .catch(({ data }) => console.log(data));
  };

  return (
   <div>
     <Header />
    <div className="containerBody">
      <form onSubmit={handleSubmit(handleCalled)}>
      <h1>Enviar novo chamado</h1>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Selecione o chamado
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("title")}
            label="Selecione o chamado"
          >
            <MenuItem value={"Ativação de número"}>Ativação de número</MenuItem>
            <MenuItem value={"Cancelamento de número"}>
              Cancelamento de número
            </MenuItem>
            <MenuItem value={"Troca de número"}>Troca de número</MenuItem>
            <MenuItem value={"Criação de ambiente"}>
              Criação de ambiente
            </MenuItem>
            <MenuItem value={"Reset de senha ezfront"}>
              Reset de senha ezfront
            </MenuItem>
            <MenuItem value={"Reset de senha Irís"}>
              Reset de senha Irís
            </MenuItem>
          </Select>
          <br />
          <TextField
            id="client"
            label="Cliente"
            multiline
            maxRows={4}
            {...register("client")}
          />
          <textarea
            {...register("description")}
            id="outlined-multiline-static"
            placeholder="Descrição do chamado..."
          />
        </FormControl>
        <button type="submit">Enviar chamado</button>
      </form>
    </div>
   </div>
  );
};
