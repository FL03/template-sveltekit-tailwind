# template-sveltekit-tailwind

[![Docker](https://github.com/FL03/template-sveltekit-tailwind/actions/workflows/docker.yml/badge.svg)](https://github.com/FL03/template-sveltekit-tailwind/actions/workflows/docker.yml)

***

template-sveltekit-tailwind is a template application for SvelteKit with TailwindCSS. The template is designed to be used as a starting point for new projects, simplifying the initial setup and
providing several useful components.

## Getting Started

### Building from the Source

Make sure you have nodejs installed on your host system

#### *Clone the repository*

```bash
git clone https://github.com/FL03/template-sveltekit-tailwindcss
```

#### *Setup the environment*

```bash
npm install
npm run build
```

#### *Start the application*

```bash
npm run start
```

### Docker

Make sure you have docker installed on the target system

#### *Pull the image*

```bash
docker pull jo3mccain/template-sveltekit-tailwindcss:latest
```

#### *Build the image locally (optional)*

```bash
docker buildx build --tag template-sveltekit-tailwindcss:latest .
```

#### *Run the image*

```bash
docker run -p 3000:3000 jo3mccain/template-sveltekit-tailwindcss:latest
```

## Contributors

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

- [Apache-2.0](https://choosealicense.com/licenses/apache-2.0/)
- [MIT](https://choosealicense.com/licenses/mit/)
