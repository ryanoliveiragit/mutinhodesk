import express from "express";
import {
  getProducts,
  addProducts,
  Login,
  Register,
  deleteProducts
} from "../controllers/produtos.js";
import jwt from 'jsonwebtoken';
import {secretKey} from '../tokens/secret-token.js'

const router = express.Router();

const validJwt = (req, res, next) => {
  const authToken = req.headers.authorization
  if(!authToken)
    return res.send(403)

  const jwtToken = authToken.split(' ')[1]
  const jwtPayload = jwt.verify(jwtToken, secretKey)
  if(!jwtPayload)
    return res.send(403)

  req.body.userId = jwtPayload.userId

  next()
}

router.get("/", validJwt, getProducts);
router.post("/login", Login)
router.post("/register", Register)
router.post("/", validJwt, addProducts);
router.delete("/:id", deleteProducts);

export default router;
