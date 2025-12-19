

export const loginAdmin = async(req, res) => {
    const { email, password } = req.body;

    // AVOID THIS: This is for demonstration of the logic fix only.
    const storedEmail = process.env.LOGIN_EMAIL;
    const storedHash = process.env.LOGIN_PASSWORD; // Assume this holds a bcrypt hash

    if (email !== storedEmail) {
        // Return generic error for security
        return res.status(401).json({ message: "Invalid credentials." });
    }

    // Step 2: SECURELY compare the submitted password against the stored hash
    // const match = await bcrypt.compare(password, storedHash);
    
    // TEMPORARY: Assuming the password is NOT hashed for this example only!
    const match = (password === process.env.LOGIN_PASSWORD);


    if (match) {
        // Step 3: Login Success - Generate a secure token (JWT)
        // const token = generateAdminToken(storedEmail); 

        return res.status(200).json({
            message: "Login Successfully",
            authenticated: true,
            // token: token // Send the token back to the client
        });
    } else {
        // Step 4: Login Failure
        return res.status(401).json({ message: "Invalid credentials." });
    }
}
