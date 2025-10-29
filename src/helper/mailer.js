/* eslint-disable no-undef */
// bu kod orqali email ga xabar yuboramiz.
import nodemailer from "nodemailer"
import "dotenv/config"

const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:process.env.GOOGLE_EMAIL,
        pass:process.env.EMAIL_PASSWORD,
    },

});

(async () => {
    const info = await transport.sendMail({
        from:`"Mengilov Axrorbek" <mengilovahrorbek5@gmail.com>`,
        to:"gulomjonovbunyodbek60@gmail.com,sirojiddinoyosboyev@gmail.com",
        subject:"Salom dunyo",
        html:"<b>Bu test</b>"
    })

console.log("Message sent:",info.messageId)
console.log({ info })
})()