import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { CalledsProps } from "../meusChamados/meusChamados";
import "./styles.css";

export const DetalhesChamadoPage = () => {
  const [calleds, setCalleds] = useState<CalledsProps[]>([]);

  const jwt = localStorage.getItem("jwt");

  const { idchamados } = useParams();

  const fetchCalleds = () => {
    Axios.get("http://localhost:3300/", {
      headers: { Authorization: `Bearer ${jwt}` },
    })
      .then((response) => {
        const filteredCalleds = response.data.filter(
          (called: CalledsProps) => called.idchamados === Number(idchamados) // Converte para número
        );
        setCalleds(filteredCalleds);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCalleds();
  }, []);

  return (
    <div>
      <Header />
      <div className="detailsCalled">
        <div>
          <h1>Detalhes do Chamado {idchamados}</h1>
          {calleds.map((item) => (
            <div key={item.idchamados}>
              <h4>Criado por: #{item.user}</h4>
              <h4>Titulo: {item.title}</h4>
              <p>Cliente: {item.client}</p>
              <p>Descrição: {item.description}</p>
            </div>
          ))}
          <button>Resolver chamado</button>
        </div>
      </div>
    </div>
  );
};
