# Project Setup

## Prerequisites

* Node.js (v18 or later recommended)
* npm (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

2. Install dependencies:

```bash
npm install
```

This command will automatically create the `node_modules` folder and install all required packages listed in `package.json`.

## Environment Variables

Create a `.env` file in the project root and add the required configuration:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
```

## Run the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Notes

* `node_modules` is not included in the repository.
* Run `npm install` after downloading or cloning the project.
* Do not commit `.env` files containing secrets.
