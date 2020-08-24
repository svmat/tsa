function showMenuLinks ()
{
    var open_e  = document.getElementById("menu_open");
    var links_e = document.getElementById("menu_links");

    open_e.style.display  = "none";
    links_e.style.display = "flex";

    return true;
}

function hideMenuLinks ()
{
    var open_e  = document.getElementById("menu_open");
    var links_e = document.getElementById("menu_links");

    open_e.style.display  = "flex";
    links_e.style.display = "none";

    return true;
}

function initCountdown (finishDate) {
    console.log('Initializing countdown', finishDate)

    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let countDown = new Date(finishDate).getTime();

    const timer = setInterval(function() {
        let now = new Date().getTime();
        let distance = countDown - now;

        if (distance < 0) {
            clearInterval(timer);
            initCountdown(Date.now() + 1000 * 60 * 60 * 24 * 7);
        }

        document.getElementById('countdown-days').innerText = Math.floor(distance / (day)),
        document.getElementById('countdown-hours').innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById('countdown-minutes').innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('countdown-seconds').innerText = Math.floor((distance % (minute)) / second);
    }, second)
}

function initContactUsModal () {
    const modal = document.querySelector("#main #packages .payment-ways .contact-us-modal");
    const trigger = document.querySelector("#main #packages .payment-ways .contact-us-trigger");

    console.log(modal, trigger)

    function toggleModal() {
        modal.classList.toggle("show-modal");
    }

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }

    trigger.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);
}


function initChatWidget () {
    const chatWidgetBtn = document.querySelector('.chat_widget .pulse-button');
    const chatWidgetActions = document.querySelector('.chat_widget .actions');

    chatWidgetBtn.addEventListener('click', () => {
        console.log('toggling', chatWidgetActions.classList)
        chatWidgetActions.classList.toggle('open')
    })
}
