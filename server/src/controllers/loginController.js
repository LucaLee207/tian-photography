
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const loginAdmin = async(req, res) => {

    try{
        const { email, password } = req.body;
        const storedEmail = process.env.LOGIN_EMAIL;
        const hashedPassword = process.env.LOGIN_HASHED_PASSWORD;
        if (email !== storedEmail) {
            return res.status(401).json({ message: "Wrong email or password" });
        }

        // Step 2: SECURELY compare the submitted password against the stored hash
        const match = await bcrypt.compare(password, hashedPassword);
        if (match) {
            // Step 3: Login Success - Generate a secure token (JWT)
            const token = jwt.sign({username: email, role: 'admin'}, process.env.JWT_SECRET, {expiresIn: '24h'}); 

            return res.status(200).json({
                message: "Login Successfully",
                authenticated: true,
                token: token // Send the token back to the client
            });
        } else {
            // Step 4: Login Failure
            return res.status(401).json({ message: "Wrong email or password" });
        }
    }catch(err){
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

export const verifyToken = async(req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: "No token, user mode", authenticated: false });
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({message: "token vaild, admin mode", authenticated:true });
    }
    catch(err){
        return res.status(403).json({message: "token is invalid or expired, user mode", authenticated:false});
    }
}

