import { db } from "../db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from 'jsonwebtoken';
import { secretKey } from "../tokens/secret-token.js";


export const getProducts = (req, res) => {
  const q = "SELECT * FROM chamados";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const updateFields = (req, res) => {
  const chamadoId = req.params.id; // Obtém o ID do chamado da URL

  // Campos que você deseja atualizar
  const { title, responsible, status } = req.body;

  const queryUpdateProduct =
    "UPDATE chamados SET title = ?, responsible = ?, status = ? WHERE idchamados = ?";
 
  const queryUpdateProductParams = [
    title,
    responsible,
    status,
    chamadoId
  ];

  db.query(queryUpdateProduct, queryUpdateProductParams, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao atualizar chamado" });
    }

    return res.status(200).json("Chamado atualizado com sucesso!");
  });
};



export const addProducts = (req, res) => {
  console.log(req.body);

  if (!req.body.user || !req.body.userId) {
    return res.status(400).json({ error: "Dados de usuário incompletos" });
  }

  const queryUser = `SELECT * FROM usuarios WHERE idusuarios = '${req.body.userId}'`;

  const userEmail = req.body.user;
  const username = userEmail.split('@')[0];
  const cleanUsername = username.replace(/"/g, '');

  const queryInsertProduct =
    "INSERT INTO chamados (`title`, `responsible`, `status`, `description`, `client`, `user`, `idusuario`, `date`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
 
  const queryInsertProductParams = [
    req.body.title,
    req.body.responsible,
    req.body.status,
    req.body.description,
    req.body.client,
    cleanUsername,
    req.body.userId,
    req.body.date
  ];

  db.query(queryUser, (err, value) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Erro ao encontrar usuário no banco" });
    }

    if (value.length === 0) {
      return res.status(500).json({ error: "Usuário não encontrado" });
    }

    queryInsertProductParams.push(value[0].idusuarios);
    db.query(queryInsertProduct, queryInsertProductParams, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Erro ao criar chamado" });
      }
      return res.status(200).json("Chamado cadastrado com sucesso!");
    });
  });
};


export const deleteProducts = (req, res) => {
  const q = "DELETE FROM chamados WHERE `idchamados` = ?";

  db.query(q, [req.params.id], (err) => {
      if (err) return res.json(err);

      return res.sendStatus(200).json('Chamado deletado com sucesso');
  });
}

export const Login = (req, res) => {
  console.log('Chegamos no Login');
  const email = req.body.email;
  const password = req.body.password;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching user' });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.status(500).json({ error: 'Error comparing passwords' });
        }

        if (response) {
          const user = result[0];

          // Gerar o token JWT com informações do usuário
          const token = jwt.sign({userId: user.idusuarios}, secretKey, {
            expiresIn: '24h',
          });

          delete user.password;

          res.status(200).json({ msg: 'Usuário logado com sucesso!', token: token, user });
        } else {
          res.status(401).json({ msg: 'Senha incorreta' }); // Retornar a mensagem no corpo da resposta
        }
      });
    } else {
      res.status(401).json({ msg: 'Usuário não registrado!' });
    }
  });
};


export const Register = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const accessLevel = req.body.accessLevel === true ? 'admin' : 'user'; // Converta o valor de accessLevel para 'admin' ou 'user'

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO usuarios (email, password, accessLevel) VALUES (?, ?, ?)",
          [email, hash, accessLevel], // Use accessLevel para determinar o valor 'admin' ou 'user'
          (error, response) => {
            if (error) {
              res.send(error);
            }

            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
}
