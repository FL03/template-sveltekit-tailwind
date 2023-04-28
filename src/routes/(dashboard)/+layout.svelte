<script>
    import { info } from '$lib/constants.js';
    import { Navbar, Sidebar, Toolbar } from '$lib';

    let open = false;

    const handle_click = () => {
        
    }
</script>

<Sidebar bind:open>
	Control Center
</Sidebar>

<Navbar name={info.name}>
    <button 
        class="bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-900 prose prose-invert overflow-x-hidden py-1 px-2 inline-block mx-auto rounded center w-24" 
        on:click={handle_click}>
        Login
    </button>
</Navbar>
<div class="flex flex-col grow items-center justify-center min-h-full max-h-screen min-w-full max-w-screen z-0" id="content-section">
    <main class="bg-zinc-700 flex container mx-auto prose prose-invert rounded p-3">
        <slot/>
    </main>
</div>
<Toolbar 
    linktree={info.sitemap.dashboard.links} 
    bind:sidebar={open}
/>

<style>
    .btn {
        border-radius: 0.25rem;
        display: inline-block;
        padding: 0.5rem 1rem;
    }
    .center {
        align-items: center;
        justify-content: center;
    }
    
</style>