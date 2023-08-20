import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatDate } from "../../../utils/formData";
import Axios from "axios";
import { Link } from "react-router-dom";

interface ControlledAccordionsProps {
  called: CalledsProps;
}

interface CalledsProps {
  idchamados: number;
  title?: string;
  description?: string;
  user?: string;
  date?: string;
  status?: string;
  responsible?: string;
  client: string;
}

export default function ControlledAccordions({
  called: { idchamados, title, description, user, date, client, status },
}: ControlledAccordionsProps) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const userResponsible = localStorage.getItem("user");

  const data: unknown = {
    idchamados: idchamados,
    title: title,
    description: description,
    client: client,
    user: user,
    date: new Date(),
    status: "Em andamento",
    responsible: userResponsible,
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleCalled = async () => {
    const jwt = localStorage.getItem("jwt");

    try {
      await Axios.put(`http://localhost:3300/${idchamados}`, data, {
        headers: { Authorization: `Bearer ${jwt}`, data },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formattedDate = formatDate(date);

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "10%", flexShrink: 1.6 }}>
            #{idchamados}
          </Typography>
          <Typography sx={{ width: "100%", flexShrink: 1.6 }}>
            {title}
          </Typography>
          <Typography sx={{ width: "50%", color: "text.secondary" }}>
            #{user}
          </Typography>
          <Typography sx={{ width: "50%", color: "text.secondary" }}>
            {status}
          </Typography>
          <Typography sx={{ width: "50%", color: "text.secondary" }}>
            {formattedDate}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            textAlign: "left",
            width: "100%",
            fontSize: "12px",
            color: "text.secondary",
          }}
        >
          <Typography
            sx={{ width: "96%", fontSize: "12px", color: "text.secondary" }}
          >
            <div>{description}</div>
            <button id="called" onClick={handleCalled}>
              ASSUMIR CHAMADO
            </button>

            <Link to={`/chamado/${idchamados}`}>
              <button id="called">DETALHES DO CHAMADO</button>
            </Link>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
