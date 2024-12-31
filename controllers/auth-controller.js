const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const baseUrl = 'https://devi-education.onrender.com';
const bcrypt = require("bcryptjs");






const home = async (req, res) => {

    try {
        res.status(200).send("Welcome to your home page");

    }

    catch (error) {
        console.log(error);
    }

}




// new register logic
const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: "Email Already Registered" });
        }

        // Generate a verification token
        const verificationToken = jwt.sign({ username, email, phone, password }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "nutangupta0276@gmail.com", // Replace with your email
                pass: "cjsh drix gmcb yljq", // Replace with your email password or app-specific password
            },
        });

        // Email content
        const mailOptions = {
            from: '"DEVI EDUCATION PRIVATE LIMITED" <nutangupta0276@gmail.com>',
            to: email,
            subject: "Email Verification Link - Greetings from Devi Education Private Limited",
            html: ` <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    background-color:rgb(54, 253, 253);
                    max-width: 600px;
                    margin: 30px auto;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    color: #007bff;
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                .content {
                    font-size: 16px;
                    color:rgb(14, 13, 13);
                    line-height: 1.6;
                }
                .content p {
                    margin: 10px 0;
                }
                .cta-button {
                    display: block;
                    margin: 20px auto;
                    padding: 10px 20px;
                    font-size: 20px;
                    font-weight: bold;
                    color: yellow;
                    background-color: #007bff;
                    text-decoration: none;
                    border-radius: 15px;
                    text-align: center;
                    width: fit-content;
                }
                .footer {
                    font-size: 14px;
                    color:rgb(7, 0, 0);
                    margin-top: 30px;
                    border-top: 1px solidrgb(12, 0, 0);
                    padding-top: 15px;
                }
                .footer p {
                    margin: 5px 0;
                }
                .signature {
                    font-size: 16px;
                    color:rgb(251, 5, 5);
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">Greetings from Devi Education Private Limited</div>
                <div class="content">
                    <p>Dear<Strong> ${username}</strong>,</p>
                    <p>We hope this message finds you well!</p>
                    <p>To complete your registration with us, please verify your email by clicking the button below:</p>
                    <a href="${baseUrl}/api/auth/verify?token=${verificationToken}" class="cta-button"><strong style="color: yellow;">Verify Email</strong></a>
                    <p>If you did not request this, please ignore this email.</p>
                </div><div class="signature">
                    <p>Thanks & Regards,</p>
                    <p><strong>Sourabh Gupta</strong></p>
                    <p>Director</p>
                    <p>Devi Education Private Limited</p>
                </div>
                <div class="footer">
                    <p>This is an automated email, please do not reply.</p>
                    <p>If you have any questions, feel free to contact us at <a href="mailto:director@devieducation.com">director@devieducation.com</a></p>
                    </div>
            </div>


        </body>
        </html>
            `,
        };



        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Verification email sent. Please check your inbox." });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while sending the email." });
    }
};

// Let me Verify 

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { username, email, phone, password } = decoded;
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Registration Successful</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            color: #333;
                        }
                        .container {
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            text-align: center;
                            max-width: 500px;
                        }
                        h1 {
                            color: #007bff;
                        }
                        p {
                            margin: 15px 0;
                            font-size: 16px;
                        }
                        .button {
                            display: inline-block;
                            margin-top: 20px;
                            padding: 10px 20px;
                            font-size: 16px;
                            color: #ffffff;
                            background-color: #007bff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        .button:hover {
                            background-color: #0056b3;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Registration Successful</h1>
                        <p>Thank you for registering with us! Your account has been successfully created.</p>
                        <p>You can now log in to your account by clicking the button below.</p>
                        <a href="https://kushagra0207.github.io/Devi-Education-Private-Limited/" class="button">Login Now !</a>
                    </div>
                </body>
                </html>
            `);
        }

        const userCreated = await User.create({ username, email, phone, password });

        res.status(201).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Registration Successful</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        color: #333;
                    }
                    .container {
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        text-align: center;
                        max-width: 500px;
                    }
                    h1 {
                        color: #007bff;
                    }
                    p {
                        margin: 15px 0;
                        font-size: 16px;
                    }
                    .button {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 10px 20px;
                        font-size: 16px;
                        color: #ffffff;
                        background-color: #007bff;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                    .button:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Registration Successful</h1>
                    <p>Thank you for registering with us! Your account has been successfully created.</p>
                    <p>You can now log in to your account by clicking the button below.</p>
                    <a href="https://kushagra0207.github.io/Devi-Education-Private-Limited/" class="button">Login Now !</a>
                </div>
            </body>
            </html>
        `);
        
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token." });
    }
};



// Department of Login


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        // console.log(userExist);
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // comparing password

        // const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);



        if (user) {

            res.status(200).json({ message: 'Login Successful', token: await userExist.generateToken(), userId: userExist._id.toString(), });

        }
        else {
            res.status(401).json({ message: "Invalid Mail or passwod" });
        }


    }
    catch (error) {
        res.status(500).json("Login Side Error Message");

    }

}

// To send user data - User Logic

const user = async (req, res) => {
    try {
        const userData = req.user;
        // console.log(userData);
        return res.status(200).json({ userData });
        // res.status(200).json({msg: "Hi User"});

    }
    catch (error) {
        console.log(`Error from the user route ${error}`);
    }

}


const all = async (req, res) => {

    try {
        res.status(200).send("Page Not Found 404");

    }

    catch (error) {
        console.log(error);
    }

}




module.exports = { home, register, verifyEmail, login, user, all };
