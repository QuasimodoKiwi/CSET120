

window.onload = randomize ();






// Math.random Math.floor * times the number you want minus 1 
function randomize () {
    a = Math.floor(Math.random() * 9 )+1;
    b = Math.floor(Math.random() * 9 )+1;
    c = Math.floor(Math.random() * 9 )+1;
    d = Math.floor(Math.random() * 9 )+1;
    e = Math.floor(Math.random() * 9 )+1;

    console.log(a,b,c,d,e)
    document.getElementById("numbergen").innerHTML = "#" + [a, b,c,d,e]
}

