
const gradients = {
    cyan: ["bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-900"]
}


export let theme = {
    secondary: gradients.cyan[0],
    button: {
        primary: "flex flex-initial px-3 py-1 rounded items-center justify-center"
    },
    link: "flex flex-initial overflow-y-clip hover:underline px-3 py-2 hover:opacity-75 text-white"
}

let metadata = {

    social: {
        discord: '',
        github: 'FL03',
        linkedin: 'joe-mccain-iii',
        twitter: 'jo3mccain'
    }
}

export let info = {
    description: '',
    homepage: '/',
    metadata: metadata,
    name: 'Template',
    slug: 'template-sveltekit-tailwindcss',
    tags: [],
    url: 'http://localhost:3000',
    sitemap: {
        dashboard: {
            href: "/dashboard",
            label: "Dashboard",
            links: [
                { href: '/settings', label: 'Settings' }
            ]
        }
    },
    theme: theme
}
