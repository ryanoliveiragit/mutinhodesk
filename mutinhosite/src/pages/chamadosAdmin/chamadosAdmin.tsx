import { useEffect, useState } from "react";
import Axios from "axios";
import ControlledAccordions from "./components/acordion";
import { Header } from "../../components/header";
import './styles.css'

interface CalledsProps {
  client: string;
  description: string;
  idchamados: number;
  idusuario: number;
  title: string;
  user: string;
  date: string;
}

export const AdminChamados = () => {
  const [calleds, setCalleds] = useState<CalledsProps[]>([]);

  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    Axios.get("http://localhost:3300/", {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then((response) => {
        setCalleds(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
   <div>
     <Header />
    <div className="calledAdmin">
     <div>
     <h1>Chamados em aberto:</h1>
      <br />
      <br />
      {calleds.map((item) => {
        return (
          <div key={item.idchamados} className="component">
            <ControlledAccordions called={item} /> <br />
          </div>
        );
      })}
     </div>
    </div>
   </div>
  );
};
