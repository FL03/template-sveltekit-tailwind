# template-sveltekit-tailwind

[![Firebase](https://github.com/FL03/template-sveltekit-tailwind/actions/workflows/firebase.yml/badge.svg)](https://github.com/FL03/template-sveltekit-tailwind/actions/workflows/firebase.yml)

[![Desktop](https://github.com/FL03/template-sveltekit-tailwind/actions/workflows/desktop.yml/badge.svg)](https://github.com/FL03/template-sveltekit-tailwind/actions/workflows/desktop.yml)
[![Docker](https://github.com/FL03/template-sveltekit-tailwind/actions/workflows/docker.yml/badge.svg)](https://github.com/FL03/template-sveltekit-tailwind/actions/workflows/docker.yml)
[![npm](https://github.com/FL03/template-sveltekit-tailwind/actions/workflows/npm.yml/badge.svg)](https://github.com/FL03/template-sveltekit-tailwind/actions/workflows/npm.yml)

---

template-sveltekit-tailwind is a template application for SvelteKit with TailwindCSS. The template is designed to be used as a starting point for new projects, simplifying the initial setup and
providing several useful components.

## Getting Started

### Building from the Source

Make sure you have nodejs installed on your host system

#### _Clone the repository_

```bash
git clone https://github.com/FL03/template-sveltekit-tailwind
```

#### _Setup the environment_

```bash
npm install
npm run build
```

#### _Start the application_

```bash
npm run start
```

### Docker

Make sure you have docker installed on the target system

#### _Pull the image_

```bash
docker pull jo3mccain/template-sveltekit-tailwindcss:latest
```

#### _Build the image locally (optional)_

```bash
docker buildx build --tag template-sveltekit-tailwindcss:latest .
```

#### _Run the image_

```bash
docker run -p 3000:3000 jo3mccain/template-sveltekit-tailwindcss:latest
```

## Contributors

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

- [Apache-2.0](https://choosealicense.com/licenses/apache-2.0/)
- [MIT](https://choosealicense.com/licenses/mit/)
