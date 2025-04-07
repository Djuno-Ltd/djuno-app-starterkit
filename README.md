# 🚀 djuno-app-starterkit

A modern starter kit for building decentralized applications (dApps) with [Djuno Cloud](https://djuno.io). It includes built-in support for Web3Auth, IPFS integration, and automated workflows. The UI is powered by [djuno-design](https://github.com/Djuno-Ltd/djuno-design), a sleek component library built for Djuno-based apps.

## ⚙️ Environment Setup

Before running the project, create a `.env` file in the root and add the following variables:

```env
REACT_APP_API_URL=https://web3auth.djuno.cloud/v1
REACT_APP_ACCESS_KEY=your_access_key_from_djuno
REACT_APP_WORKFLOW_URL=https://api.djuno.cloud/workflows/your_workflow_webhook
REACT_APP_IPFS_URL=https://api.djuno.cloud/ipfs
REACT_APP_IPFS_API_KEY=your_ipfs_api_key
```

You can obtain these values from your [Djuno Console](https://console.djuno.io):

- `REACT_APP_ACCESS_KEY`: From **Web3Auth** section
- `REACT_APP_WORKFLOW_URL`: From your selected workflow > webhook URL
- `REACT_APP_IPFS_URL` and `REACT_APP_IPFS_API_KEY`: From **IPFS > API Settings**

> ⚠️ Never commit or expose your `.env` file publicly.

## 🛠️ Getting Started

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

> The development server will start at [http://localhost:7200](http://localhost:7200) (Port 7200 is defined in the `package.json`)

> Windows users can use:

```bash
npm run start:win
```

## 📜 Available Scripts

- `npm start`: Runs the app in development mode (Linux/macOS)
- `npm run start:win`: Same as above (for Windows environments)
- `npm run build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm run eject`: Ejects CRA configuration (not reversible)

Visit the GitHub repo for full documentation and customization examples.

## 🌐 Djuno Cloud Integrations

| Feature      | Service             | Documentation Link                                                              |
| ------------ | ------------------- | ------------------------------------------------------------------------------- |
| Web3Auth     | Web3Auth Service    | [Web3Auth Docs](https://docs.djuno.io/en/articles/10108332-web3-0-auth-service) |
| IPFS Uploads | IPFS API            | [IPFS Docs](https://docs.djuno.io/en/articles/10108735-managed-ipfs)            |
| Workflows    | Workflow Automation | [Workflow Docs](https://docs.djuno.io/en/articles/10108417-workflow-studio)     |

## 🧪 Testing

Run the test suite with:

```bash
npm test
```

Customize test config via `react-app-rewired` if needed.

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

## 🛡 License

MIT License © [Djuno Ltd](https://djuno.io)
