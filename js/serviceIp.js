var serverIp = "http://192.168.0.105:8080/";
/***
 * 虚拟机ip
 *
 */
var VMwareIp = "http://192.168.0.102:8080/";
function clear(){
    removeCookie("userId");
    removeCookie("SESSION");
    removeCookie("userImage");
    removeCookie("userNickName");
    removeCookie("typeId");
    removeCookie("admin");
    removeCookie("user");
    window.location.href="index.html"
}
function box(text){
    document.getElementById('v').innerText = text
    document.getElementById('v').style.display='block'
    setTimeout("document.getElementById('v').style.display='none'",3000);
}
function xufu1(){
    document.getElementById('xufu').style.display = 'none'
    document.getElementById('music').style.display = 'block'
}
function xufu2(){
    document.getElementById('xufu').style.display = 'none'
}
function xufu3(){
    document.getElementById('xufu').style.display = 'block'
    document.getElementById('music').style.display = 'none'
}