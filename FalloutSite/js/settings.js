function initStatus()
{
    const siteSoundSetting = document.getElementById("SoundSetting");

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
}

function GetSiteSoundValue()
{
    return (document.getElementById("SoundSetting").value / 100);

}