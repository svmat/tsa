var whoweare_profiles = [];
var faq_questions     = [];

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
}

function handleScroll ()
{
    updatePage();
}

function initPage ()
{
    whoweare_profiles = document.querySelectorAll("#whoweare .body .profile");
    faq_questions     = document.querySelectorAll("#faq .body .question");

    window.onscroll = handleScroll;

    var main = document.getElementById("main");

    main.style.display = "block";

    updatePage();
}


window.onload = initPage;
