var whoweare_profiles = [];
var faq_questions     = [];
var experience_items  = [];
var about_items       = [];

var testimonials_wheel = {
    entries: [],
    focus:   0
};

var animation_id    = null;
var last_client_top = -1;


function isVisible (e)
{
    var rect = e.getBoundingClientRect();
    if(rect.top >= 0 &&
       rect.top <= window.innerHeight ||
       rect.bottom >= 0 &&
       rect.bottom <= window.innerHeight)
    {
        return true;
    }

    return false;
}

function showBanner ()
{
    document.getElementById("banner").style.display = "block";
    return true;
}

function hideBanner ()
{
    document.getElementById("banner").style.display = "none";
    return true;
}

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

function removeWheelAttrs (e)
{
    e.classList.remove("anim_in");
    e.classList.remove("anim_left");
    e.classList.remove("anim_right");
    e.classList.remove("hidden_left");
    e.classList.remove("hidden_right");
    e.classList.remove("visible");
}

function changeWheelFocus (wheel, dir)
{
    var new_focus = wheel.focus+dir;
    if(new_focus < 0)
        new_focus = wheel.entries.length-1;
    else if(new_focus >= wheel.entries.length)
        new_focus = 0;

    var new_focus_e = wheel.entries[new_focus];
    var focus_e     = wheel.entries[wheel.focus];

    removeWheelAttrs(new_focus_e);
    removeWheelAttrs(focus_e);

    if(dir < 0)
    {
        focus_e.classList.add("visible");
        focus_e.classList.add("anim_right");
        new_focus_e.classList.add("hidden_left");
        new_focus_e.classList.add("anim_in");
    }
    else
    {
        focus_e.classList.add("visible");
        focus_e.classList.add("anim_left");
        new_focus_e.classList.add("hidden_right");
        new_focus_e.classList.add("anim_in");
    }

    wheel.focus = new_focus;

    return true;
}

function resetWheelClasses (wheel)
{
    for(var index = wheel.entries.length; index-- > 0;)
    {
        removeWheelAttrs(wheel.entries[index]);
        if(index != wheel.focus)
            wheel.entries[index].classList.add("hidden_left");
    }
}

function initWheel (wheel, selector)
{
    wheel.entries = document.querySelectorAll(selector);
    wheel.focus   = 0;

    resetWheelClasses(wheel);
}

function toggleCollapse (e, collapsible_e, expanded_class, collapsed_class)
{
    var c = e;

    var matches = null;
    while((matches = c.querySelectorAll(collapsible_e)).length == 0)
    {
        c = c.parentElement;
        if(c == null)
            return false;
    }

    if(matches[0].style.display == "block")
    {
        matches[0].style.display = "none";

        var arrow = c.querySelectorAll("." + collapsed_class);
        if(arrow.length > 0)
        {
            arrow[0].classList.remove(collapsed_class);
            arrow[0].classList.add(expanded_class);
        }
    }
    else
    {
        matches[0].style.display = "block";

        var arrow = c.querySelectorAll("." + expanded_class);
        if(arrow.length > 0)
        {
            arrow[0].classList.remove(expanded_class);
            arrow[0].classList.add(collapsed_class);
        }
    }

    return true;
}

function animateOnVisible (e)
{
    if(!e.classList.contains("anim") && isVisible(e))
        e.classList.add("anim");
}

function tryStopAnimation ()
{
    if(animation_id != null)
    {
        clearInterval(animation_id);
        animation_id    = null;
        last_client_top = -1;
    }
}

function stepScrolling (e, dest_y)
{
    var rect      = e.getBoundingClientRect();
    var destDelta = dest_y - rect.top;
    if(Math.abs(destDelta) < 2)
    {
        tryStopAnimation();
        return;
    }

    var rate = Math.abs(destDelta / 5);
    if(rate < 1)
        rate = 1;

    if(destDelta > 0)
        rate = -rate;

    window.scrollBy(0, rate);

    var newRect = e.getBoundingClientRect();
    if(newRect.top == rect.top)
        tryStopAnimation();
    if(last_client_top == newRect.top)
    tryStopAnimation();
    if((window.scrollYOffset + window.innerHeight) >= document.body.scrollHeight)
    tryStopAnimation();

    last_client_top = newRect.top;
}

function smoothScroll (e)
{
    var dest_y   = 0;
    var frame_ms = 1000/24;

    var e = document.getElementById(e);
    if(e != null)
    {
        tryStopAnimation();

        animation_id = setInterval(function() { stepScrolling(e, dest_y) }, frame_ms);

        return false;
    }

    return true;
}

function updatePage ()
{
    for(var i = 0; i < whoweare_profiles.length; i++)
        animateOnVisible(whoweare_profiles[i]);

    for(var i = 0; i < faq_questions.length; i++)
        animateOnVisible(faq_questions[i]);

    for(var i = 0; i < experience_items.length; i++)
        animateOnVisible(experience_items[i]);

    for(var i = 0; i < about_items.length; i++)
        animateOnVisible(about_items[i]);
}

function handleScroll ()
{
    updatePage();
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

function initPage ()
{
    whoweare_profiles = document.querySelectorAll("#whoweare .body .profile");
    faq_questions     = document.querySelectorAll("#faq .body .question");
    experience_items  = document.querySelectorAll("#experience_details ul li");
    about_items       = document.querySelectorAll("#test_automation #cur_details ul li");

    console.log('AAA', about_items)

    window.onscroll = handleScroll;

    var main = document.getElementById("main");

    main.style.display = "block";

    initWheel(testimonials_wheel, "#testimonials .wheel .content .statement");
    updatePage();
    //showBanner();

    initContactUsModal();

    /* Here you can initialize Countdown timer. Just pass a valid date. */
    initCountdown('Sep 13, 2020 00:00:00');

    initChatWidget();
}

function initChatWidget () {
    const chatWidgetBtn = document.querySelector('.chat_widget .pulse-button');
    const chatWidgetActions = document.querySelector('.chat_widget .actions');

    chatWidgetBtn.addEventListener('click', () => {
        console.log('toggling', chatWidgetActions.classList)
        chatWidgetActions.classList.toggle('open')
    })
}

window.onload = initPage;
