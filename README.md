# Ping CRM

A demo application to illustrate how Inertia.js works.

![](https://raw.githubusercontent.com/mahendra7041/pingcrm-react-inertia/master/screenshot.png)

## Installation

Clone the repo locally:

```sh
git clone https://github.com/mahendra7041/pingcrm-react-inertia.git pingcrm

cd pingcrm
```

Install dependencies:

```sh
npm install
```

Setup configuration:

```sh
cp .env.example .env
```

Generate prisma client:

```sh
npx prisma generate
```

Run database seeder:

```sh
npm run prisma:seed
```

Run the dev server

```sh
npm run dev
```

You're ready to go! Visit Ping CRM in your browser, and login with:

- **Username:** johndoe@example.com
- **Password:** secret
