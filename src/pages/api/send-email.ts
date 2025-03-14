// import { defineMiddleware } from "astro/middleware";
// import nodemailer from "nodemailer";

// export const POST = async ({ request }) => {
//   try {
//     const { email } = await request.json();

//     let transporter = nodemailer.createTransport({
//       service: "gmail", // Or use SMTP
//       auth: {
//         user: "levietdat22@gmail.com",
//         pass: "pun123456789DN@",
//       },
//     });

//     await transporter.sendMail({
//       from: "levietdat22@gmail.com",
//       to: email,
//       subject: "Subscription Confirmation",
//       text: "Thank you for subscribing!",
//     });

//     return new Response(JSON.stringify({ success: true }), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// };
