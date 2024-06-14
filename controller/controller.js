import path from "path";
import { users } from "../data/agentes.js";
import jwt from "jsonwebtoken";
const __dirname = path.resolve();
process.loadEnvFile();

const secretKey = process.env.JWT_SECRET_KEY;

export const home = (req, res) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
}

export const login = (req, res) => {
    const { email, password } = req.query;
    
    
    try {
        const user = users.find((u) => u.email === email && u.password === password);
        if (email === user.email && password === user.password) {
            const token = jwt.sign({ email }, secretKey, { expiresIn: 20 });
            console.log(token)
            
            res.send(`<a href="/Dashboard?token=${token}"> <p> Ir al Dashboard </p> </a>  
     Bienvenido, ${email}. 
    <script> 
    sessionStorage.setItem('token', JSON.stringify("${token}")) 
    </script> 
               `);
        }
    } catch (error) {
        res.status(401).send({ error: "Invalid credentials", message: error.message });
    }
}

export const dashboard = (req, res) => {
    let { token } = req.query;
    jwt.verify(token, secretKey, (err, decoded) => {
      err
        ? res.status(401).send({ error: "401 Unauthorized", message: err.message })
        : res.send(` 
         Bienvenido al Dashboard ${decoded.email} 
         <script> 
         localStorage.setItem('email', "${decoded.email}") 
         </script> 
       `);
    });
}