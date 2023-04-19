<script>
    import { enhance } from "$app/forms";
    
    let password = "";
    let username = "";
</script>

<form 
    class="p-3 prose rounded"
    method="POST"
    use:enhance
>
    <input
        class="flex px-3 py-2 rounded shadow-lg my-3"
        placeholder="Username"
        value={username}
    />
    <input
        class="flex px-3 py-2 rounded shadow-lg my-3"
        placeholder="Password"
        value={password}
    />
    <div class="divide-x">
        <button>
            Login
        </button>
    </div>
</form>


<style>

</style>