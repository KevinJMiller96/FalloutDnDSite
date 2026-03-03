const hpSlider = document.getElementById("hpSlider");
const radSlider = document.getElementById("radSlider");
const hpValue = document.getElementById("hpValue");
const radValue = document.getElementById("radValue");

hpSlider.oninput = () => {
    hpValue.textContent = hpSlider.value + " / 100";
};

radSlider.oninput = () => {
    radValue.textContent = radSlider.value + " RADS";
};