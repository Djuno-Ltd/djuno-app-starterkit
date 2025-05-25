# 🚀 djuno-app-starterkit

A modern starter kit for building decentralized applications (dApps) with [Djuno Cloud](https://djuno.io). It includes built-in support for Web3Auth, IPFS integration, and automated workflows. The UI is powered by [djuno-design](https://github.com/Djuno-Ltd/djuno-design), a sleek component library built for Djuno-based apps.

---

## 🌿 Branch Overview

This repository offers different starter flavors depending on your preferred integration method with Djuno Cloud:

| Branch                                                                                  | Description                                                                                                                                                                                                                                                                            | Related Package(s)                                             |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [`main`](https://github.com/Djuno-Ltd/djuno-app-starterkit/tree/main)                   | Built for React-based projects, this version uses [`@djuno/web3auth-ui`](https://www.npmjs.com/package/@djuno/web3auth-ui), a plug-and-play UI component package that includes prebuilt authentication screens and flows. Ideal for rapid prototyping with minimal custom UI work.     | `@djuno/web3auth-ui` (built on top of `@djuno/web3auth-hook`)  |
| [`hook-version`](https://github.com/Djuno-Ltd/djuno-app-starterkit/tree/hook-version)   | Built for React-based projects, this version uses [`@djuno/web3auth-hook`](https://www.npmjs.com/package/@djuno/web3auth-hook), a lightweight wrapper providing React hooks around the core SDK. It simplifies integration while leveraging the same underlying `@djuno/web3auth-sdk`. | `@djuno/web3auth-hook` (built on top of `@djuno/web3auth-sdk`) |
| [`sdk-version`](https://github.com/Djuno-Ltd/djuno-app-starterkit/tree/sdk-version)     | Uses the [`@djuno/web3auth-sdk`](https://www.npmjs.com/package/@djuno/web3auth-sdk) package to provide a full-featured, modular SDK for Web3 authentication and wallet integration. This version is suitable for developers who want fine-grained control and direct SDK access.       | `@djuno/web3auth-sdk`                                          |
| [`purejs-version`](https://github.com/Djuno-Ltd/djuno-app-starterkit/tree/hook-version) | Basic starter with direct REST API calls using `axios` and environment-based configuration.                                                                                                                                                                                            | Native REST                                                    |

> ✨ Choose the branch that matches your preferred abstraction level and framework.

---

## ⚙️ Environment Setup

Before running the project, create a `.env.local` file in the root and add the following variables:

```env
REACT_APP_API_URL=https://web3auth.djuno.cloud/v1
REACT_APP_ACCESS_KEY=<<YOUR_ACCESS_KEY_WEB3_AUTH>>
REACT_APP_WORKFLOW_URL=<<WF-WEBHOOK>>
REACT_APP_IPFS_URL=<<IPFS_URL>>
REACT_APP_IPFS_API_KEY=<<IPFS_KEY>>
```

> ⚠️ Never commit or expose your `.env.local` file publicly.

---

## 🛠️ Getting Started (Local Development)

1. **Clone the repository**

```bash
git clone https://github.com/your-org/djuno-app-starterkit.git
cd djuno-app-starterkit
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the app**

```bash
npm start
```

> The development server will start at [http://localhost:7200](http://localhost:7200)

> Windows users can use:

```bash
npm run start:win
```

---

## 🐳 Running with Docker Compose

If you'd like to run the app as a production-ready static site served by Nginx:

1. **Ensure your `.env.local` is set up** as shown above.

2. **Build and run the container:**

```bash
docker compose up --build
```

3. Visit your app at [http://localhost:8080](http://localhost:8080)

> This will:
>
> - Embed the environment variables during the build
> - Build the React app with `react-app-rewired build`
> - Serve the compiled app using Nginx

> The Dockerfile and Nginx config are included in the repo.

---

## 📜 Available Scripts

- `npm start`: Runs the app in development mode (Linux/macOS)
- `npm run start:win`: Same as above (for Windows environments)
- `npm run build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm run eject`: Ejects CRA configuration (not reversible)

---

## 🌐 Djuno Cloud Integrations

| Feature      | Service             | Documentation Link                                                              |
| ------------ | ------------------- | ------------------------------------------------------------------------------- |
| Web3Auth     | Web3Auth Service    | [Web3Auth Docs](https://docs.djuno.io/en/articles/10108332-web3-0-auth-service) |
| IPFS Uploads | IPFS API            | [IPFS Docs](https://docs.djuno.io/en/articles/10108735-managed-ipfs)            |
| Workflows    | Workflow Automation | [Workflow Docs](https://docs.djuno.io/en/articles/10108417-workflow-studio)     |

---

## 🚀 Deployment

After building the project using:

```bash
npm run build
```

You can deploy the contents of the `/build` folder to any static hosting provider, including:

- **Vercel**
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**
- **AWS S3 + CloudFront**

---

## 🤝 Contributing

We welcome contributions! Feel free to open an issue or submit a pull request.

```bash
# Create a new branch
git checkout -b feature/my-feature

# Commit changes
git commit -m "Add my feature"

# Push and open a PR
git push origin feature/my-feature
```

---

## 🛡 License

MIT License © [Djuno Ltd](https://djuno.io)
