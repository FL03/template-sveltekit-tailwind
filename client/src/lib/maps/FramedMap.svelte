<script>
    export const mode = "place";
    export const params = "Caesars+Palace,+Las+Vegas,+NV+89109,+USA";
</script>

<iframe
    allowfullscreen
    frameborder="0"
    referrerpolicy="no-referrer-when-downgrade"
    src="https://www.google.com/maps/embed/v1/{mode}?key={process.env.GOOGLE_MAPS_API_KEY}&q={params}"
    title="Map"
>
</iframe>

<style>
    iframe {
        border: 0;
        height: 100%;
        width: 100%;
    }
</style>