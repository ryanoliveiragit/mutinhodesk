import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import DataTable from "./components/table";
import "./styles.css";

export interface CalledsProps {
  client: string;
  description: string;
  idchamados: number;
  idusuario: number;
  title: string;
  user: string;
  date: string;
}

export const MeusChamadosPage = () => {
  const [calleds, setCalleds] = useState<CalledsProps[]>([]);
  const jwt = localStorage.getItem("jwt");
  const storedUser = localStorage.getItem("user");
  
  const username = storedUser.split("@")[0];
  const cleanUsername = username.replace(/"/g, "");
  
  console.log(cleanUsername);

  const fetchCalleds = () => {
    axios
      .get("http://localhost:3300/", {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        const filteredCalleds = response.data.filter(
          (called: CalledsProps) => called.user === cleanUsername
        );
        setCalleds(filteredCalleds);
      })
      .catch((error) => {
        console.error(error);
      });
      console.log('aa')
  };

  useEffect(() => {
    fetchCalleds(); 
  }, []);

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <h1>Meus chamados</h1>
      <ul className="teste">

        <br />
        {calleds.length > 0 ? (
          <DataTable rows={calleds} />
        ) : (
          <p>Nenhum chamado encontrado.</p>
        )}
      </ul>
    </div>
  );
};
