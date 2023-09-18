"use strict";
import nodemailer, {SentMessageInfo, Transporter} from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";
import * as http from "http";

export async function sendEmail(to: string, html: string): Promise<void> {
    const transporter: Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "tressie.haley4@ethereal.email",
            pass: "udNJrrf7aajsn6Y5vb",
        },
    });
    const info: SentMessageInfo = await transporter.sendMail({
        from: 'Big Boss',
        to: to,
        subject: "At your Service",
        html: html
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
