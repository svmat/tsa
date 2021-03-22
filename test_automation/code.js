
var experience_items  = [];
var about_items       = [];

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

function initPage ()
{
    whoweare_profiles = document.querySelectorAll("#whoweare .body .profile");
    faq_questions     = document.querySelectorAll("#faq .body .question");
    experience_items  = document.querySelectorAll("#experience_details ul li");
    about_items       = document.querySelectorAll("#test_automation #cur_details ul li");

    window.onscroll = handleScroll;

    var main = document.getElementById("test_automation");

    main.style.display = "block";

    //initWheel(testimonials_wheel, "#testimonials .wheel .content .statement");
    updatePage();
    //showBanner();

    //initContactUsModal();

    /* Here you can initialize Countdown timer. Just pass a valid date. */
    //initCountdown('Mar 28, 2021 00:00:00');

    initChatWidget();
}

function initChatWidget () {
    const chatWidgetBtn = document.querySelector('.chat_widget .pulse-button');
    const chatWidgetActions = document.querySelector('.chat_widget .actions');

    chatWidgetBtn.addEventListener('click', () => {
        chatWidgetActions.classList.toggle('open')
    })
}

window.onload = initPage;