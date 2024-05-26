const lightSwitch = document.getElementById('switch');
const lightbulb = document.getElementById('lightbulb');


lightSwitch.addEventListener('click', e => {
    if (lightSwitch.classList.contains('off')) {
        lightSwitch.classList.remove('off');
        lightbulb.classList.contains('off') && lightbulb.classList.remove('off');
    } else  {
        lightSwitch.classList.add('off');
        lightbulb.classList.add('off');
    }
})