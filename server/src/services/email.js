/**
 *  send various emails
 */

import nodemailer from 'nodemailer';
import 'dotenv/config';

const info = {
    host: 'smtp.gmail.com',
    auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USERNAME,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
}
const transport = nodemailer.createTransport(info)
/**
 * sends a welcome email to the newly signed up user
 * @param {String} to receiver
 */
export async function sendWelcomeEmail(user) {
    try {
        await transport.sendMail({
            from: 'Studygram < alzabilla09@mail.com >',
            to: user.email,
            subject: 'Welcome to Studygram!',
            html: ` <div class='email'> 
                        <h1 align='center'> Welcome ${user.firstname} ${user.lastname} </h1>
                        <h3> The entire community at Studygram is so happy to have you with us.
                        Here you are gonna meet with learners with whom you can learn and grow
                        together. We wish you all the best!
                        </h3>
                    <div>`
        })
    } catch (error) {
        console.log("An error occured while sending welcome email to the user \n", error)
    }
}