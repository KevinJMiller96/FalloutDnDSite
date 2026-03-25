
const supabaseClient = window.supabaseClient;

const loginBtn = document.getElementById("loginBtn");
const errorDiv = document.getElementById("error");

loginBtn.addEventListener("click", async () => {

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email.value,
        password: password.value
    });

    if (error) {
        errorDiv.innerHTML = error.message;
    } 
    else
        window.location.href = "/boot_screen.html";
});