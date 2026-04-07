function initStatus()
{
    const siteSoundSetting = document.getElementById("SoundSetting");
    const logoutBtn = document.getElementById("logoutBtn");

    // Function to update displayed value
    function updateSliderValue() {                                        
        siteSoundSetting.nodeValue = 10;
        console.log(siteSoundSetting.value);
    }

    // Add the onchange event listener
    siteSoundSetting.onchange = updateSliderValue;

    // Optional: Update the value initially to reflect the default value
    updateSliderValue();
    GetSiteSoundValue();

    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            await window.supabaseClient.auth.signOut();
        });
    }
}

function GetSiteSoundValue()
{
    return (document.getElementById("SoundSetting").value / 100);

}