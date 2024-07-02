<div align="center">

  <img src="https://github.com/svyatoslavw/hackhub/blob/main/screens/5.png" alt="logo" width="100" height="100" />
  
  <h1>Forum App with Next.js and Nest.js</h1>
  
  <p>
  (Rest API, Passport, JWT, Websokets, Hook Form, React Query, Redux TK)
  </p>
  
<h4>
    <a href="https://github.com/svyatoslavw/hackhub/blob/master/README.md">Documentation</a>
  <span> · </span>
    <a href="https://github.com/svyatoslavw/hackhub/issues">Report Bugs</a>
  <span> · </span>
    <a href="https://github.com/svyatoslavw/hackhub/issues">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

## :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Screenshots](#camera-screenshots)
  - [Technologies Stack](#space_invader-tech-stack)
- [Getting Started](#toolbox-getting-started)
  - [Environment Variables](#key-environment-variables)
  - [Installation](#gear-installation)
  - [Run Locally](#running-run-locally)

<!-- About the Project -->

## :star2: About the Project

Authorization with confirmation by mail or phone with two tokens.<a href="https://nodemailer.com/smtp/">Nodemailer</a> and <a href="https://www.twilio.com/docs/voice/sdks/javascript/get-started/">Twilio</a> were used as the basis for sending messages.

<a href="https://tiptap.dev/docs/editor/getting-started/overview">Tiptap</a> library was used to work with the message and post editor

To interact with the server side, <a href="https://axios-http.com/ru/docs/intro">axios</a> was used together with the state manager <a href="https://tanstack.com/query/latest">React Query</a>.

<!-- Screenshots -->

### :camera: Screenshots

<div align="center">
  <a href="#"><img src="https://github.com/svyatoslavw/hackhub/blob/main/screens/1.png" alt="1" /></a><br>
  <a href="#"><img src="https://github.com/svyatoslavw/hackhub/blob/main/screens/2.png" alt="2" /></a><br>
  <a href="#"><img src="https://github.com/svyatoslavw/hackhub/blob/main/screens/3.png" alt="3" /></a><br>
  <a href="#"><img src="https://github.com/svyatoslavw/hackhub/blob/main/screens/4.png" alt="4" /></a><br>
</div>

##

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://nextjs.org/">Next.js</a></li>
    <li><a href="https://axios-http.com/ru/docs/intro">Axios</a></li>
    <li><a href="https://tanstack.com/query/latest/docs/framework/react/overview">Tanstack Query</a></li>
    <li><a href="https://ui.shadcn.com/docs">Shadcn UI</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCSS</a></li>
    <li><a href="https://zod.dev/">Zod</a></li>
  </ul>
</details>

<details>
<summary>Server</summary>
  <ul>
    <li><a href="https://docs.nestjs.com/">Nest.js</a></li>
    <li><a href="https://www.postgresql.org/docs/">PostgreSQL</a></li>
    <li><a href="https://www.prisma.io/docs/getting-started">Prisma</a></li>
    <li><a href="https://jwt.io/introduction/">JWT</a></li>
    <li><a href="https://www.passportjs.org/">Passport.js</a></li>
    <li><a href="https://nodemailer.com/smtp/">Nodemailer</a></li>
    <li><a href="https://www.twilio.com/docs/voice/sdks/javascript/get-started">Twilio</a></li>
    <li><a href="https://zod.dev/">Zod</a></li>
  </ul>
</details>
<br />

<table>
    <tr>
        <td>
<a href="#"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="" width="30" height="30" /></a>
        </td>
                        <td>
<a href="#"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" alt="" width="30" height="30" /></a>
        </td>
                        <td>
<a href="#"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="" width="30" height="30" /></a>
        </td>
                                <td>
<a href="#"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="" width="30" height="30" /></a>
        </td>
                                <td>
<a href="#"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="" width="30" height="30" /></a>
        </td>
    </tr>
</table>

## :toolbox: Getting Started

<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL =`
`JWT_SECRET =`

`MAILER_HOST =`
`MAILER_USER =`
`MAILER_PASSWORD =`

`TWILIO_ACCOUNT_SID =`
`TWILIO_AUTH_TOKEN =`
`TWILIO_VERIFICATION_SERVICE_SID =`

`GOOGLE_CLIENT_ID =`
`GOOGLE_SECRET =`

`SERVER_URL=`
`WEBSOKET_URL=`

### :gear: Installation

Clone the project

```
git clone https://github.com/svyatoslavw/hackhub.git
```

```
cd hackhub
```

<!-- Run Locally -->

### :running: Run Locally

Install dependencies

```bash
  npm install
  # or
  yarn dev
```

## Getting Started

Start the server
First, run the development server:

```bash
  cd back
```

```bash
  npm run start:dev
  # or
  yarn start:dev
```

After,start client server:

```bash
  cd front
```

```bash
  npm run dev
  # or
  yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

### Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

### License

Nest is [MIT licensed](LICENSE).
