// var logindisplay = document.getElementById('logindisplay').style.display = 'none'

function openFormLogin(boo){
    if(boo){
        document.getElementById('manche').style.animation = "openLogin linear 0.5s forwards"
        document.getElementById('logindisplay').style.display = 'block'
        document.getElementById('registerdisplay').style.display = 'none'

    }
    else{
        document.getElementById('manche').style.animation = "closeLogin linear 0.5s forwards"
        document.getElementById('logindisplay').style.display = 'none'
        document.getElementById('registerdisplay').style.display = 'block'


    }
}