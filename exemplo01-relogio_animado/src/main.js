function carregar() {
    var msg = window.document.getElementById('header')
    var img = window.document.getElementById('image-home')
    var myClock = window.document.getElementById('myclock')
    var data = new Date()
    var hora = data.getHours()
    var minute = data.getMinutes()
    
    if (hora >= 0 && hora < 12) {
        //bom dia
        msg.innerHTML = "Bom dia!"
        document.body.style.background = "#F0E68C"
        myClock.innerHTML = hora + `:` + minute
        img.innerHTML = "<img src='img/sol1.svg'>"
    } else if (hora > 12 && hora < 18) {
        //boa tarde
        msg.innerHTML = "Boa tarde!"
        document.body.style.background = "#FF8C00"
        myClock.innerHTML = hora + `:` + minute
        img.innerHTML = "<img src='img/sol2.svg'>"
    } else {
        //boa noite
        msg.innerHTML = "Boa noite!"
        document.body.style.background = "#483D8B"
        myClock.innerHTML = hora + `:` + minute
        img.innerHTML = "<img src='img/lua.svg'>"
    }

}

// atualiza relogio
var atualizaRelogio = setInterval(carregar, 1000)