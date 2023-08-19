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

export const addProducts = (req, res) => {
  const queryUser = `select * from usuarios where idusuarios = '${req.body.userId}'`

  const queryInsertProduct =
  "INSERT INTO chamados (`title`, `description`, `idusuario`) VALUES (?, ?, ?)";

  const queryInsertProductParams = [req.body.title, req.body.description];
 
    db.query(queryUser, (err, value) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Erro ao encontrar usuario no banco" });
      }

      if(value.length == 0)
        return res.status(500).json({error: "Usuario nao encontrado"})

      queryInsertProductParams.push(value[0].idusuarios)
      db.query(queryInsertProduct, queryInsertProductParams, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao criar chamado" });
        }
        return res.status(200).json("Chamado cadastrado com sucesso!");
      });
    })
  }

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
