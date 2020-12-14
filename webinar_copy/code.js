
function isVisible (e) {
    const rect = e.getBoundingClientRect();

    if (rect.top >= 0 &&
        rect.top <= window.innerHeight ||
        rect.bottom >= 0 &&
        rect.bottom <= window.innerHeight)
    {
        return true;
    }

    return false;
}

function animateOnVisible (e) {
    if(!e.classList.contains("anim") && isVisible(e))
        e.classList.add("anim");
}

function initRequestSimulationModal () {
    const modal = document.querySelector("#landing #register-form .simulation-modal");
    const trigger1 = document.querySelector("#landing .trigger-modal1");
    const trigger2 = document.querySelector("#landing .trigger-modal2");
    const closeButton = document.querySelector("#landing #register-form .close-button");

    function toggleModal() {
        modal.classList.toggle("show-modal");
    }

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }

    trigger1.addEventListener("click", toggleModal);
    trigger2.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);

    updatePage()
}

function updatePage() {
    for(let i = 0; i < landing_points.length; i++)
        animateOnVisible(landing_points[i]);
}

function initPage ()
{
    initCountdown('Dec 20, 2020 12:00:00');

    initChatWidget();

    initRequestSimulationModal();
}

window.onscroll = updatePage;

window.onload = initPage;
