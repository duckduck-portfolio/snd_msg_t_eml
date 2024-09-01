const bodyParser = require('body-parser');
const express = require('express')
const nodemailer= require('nodemailer')

const app = express();
const PORT = 3000;

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});



app.post('/snd_mil', async (req, res) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
              user: 'duckduckportfolio@gmail.com',
              pass: 'tibq wcyn knfx zsvm'
            }
          });
        var mailOptions = {
            from: "duckduckportfolio@gmail.com",
            to: req.body.host_mail + "",
            subject: `Bạn nhận được tin nhắn mới từ ${req.body.from_name} thông qua Portfolio!`,
            html: `<p>Tên người gửi: ${req.body.from_name}</p>
                    <p>Địa chỉ email: ${req.body.from_email}</p>
                    <p>Nội dung tin nhắn: <code>${req.body.from_msg}</code></p>
                    `
        };
        await transporter.sendMail(mailOptions)
        return res.status(200).json("Done")
    } catch(err){
        console.log(err)
        return res.status(500).json("ERROR")
    }

})

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});