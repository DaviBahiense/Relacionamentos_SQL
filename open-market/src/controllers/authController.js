import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../db.js'


export async function register (req, res)  {
    const {nome, email, senha} = req.body
    
     const hashPass = bcrypt.hashSync(senha, 1); 
     
  try {
     await connection.query(`
      INSERT INTO usuarios (nome, email, senha)
      VALUES ($1, $2, $3) 
    `, [nome, email, hashPass])


    res.sendStatus(201)
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

export async function login(req, res)  {
  const { email, senha } = req.body;
  try {
      const result = await connection.query(`
        select * from usuarios where email=$1
      `,[email])
/*         
    if (result.rowCount === 0) {
      return res.sendStatus(401);
    } */

    const user = result.rows[0];
  console.log(user)
    if (!bcrypt.compareSync(senha, user.senha)) {
      return res.sendStatus(401);
    }
    
    const token = uuid();

    await connection.query(`
      INSERT INTO 
        sessoes ("idUsuario", token)
        VALUES ($1, $2)
    `, [user.id, token]);

    res.send({
      token
    });
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}