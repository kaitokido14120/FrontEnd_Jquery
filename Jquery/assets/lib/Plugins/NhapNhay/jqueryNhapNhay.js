//Plugin cho jquery
window.jQuery.prototype.NhapNhay = function(soLanNhapNhay){
    var This = $(this);
    for(var i = 0;i<soLanNhapNhay ; i++)
    {
        This.fadeOut(500);
        This.fadeIn(500);
    }
}
