
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email.value,
        password: password.value
    });

    if (error) {
        console.error(error.message);
        return;
    }

    window.location.href = "/index.html";

});