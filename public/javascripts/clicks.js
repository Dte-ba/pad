//fix for jqDock v2.0.0 noAntiFlutter bug...
if(jQuery.jqdock && jQuery.jqdock.version === '2.0.0'){
	jQuery.jqdock.defaults.noAntiFlutter = 1;
}
//debug assistant...
var DBG = function(c, x){
			var dbg = $('#dbg'), len, ct;
			if(!dbg.length){
				dbg = $('body')
					.append('<div id="dbg" style="width:350px; position:absolute; top:160px; left:160px; color:#ff0000; font-size:10px; background-color:#ffffff; border:1px solid #000000; z-index:50;"></div>')
					.find('#dbg');
			}
			len = dbg.children().length;
			if(!len){
				dbg.append('<div style="border-bottom:1px solid;"><span id="dbgxy" style="float:right;"></span><a id="dbgclear" href="#">Clear</a>&nbsp;/&nbsp;<a id="dbgdisable" href="#">Disable</a><input type="text" id="dbgct" value="" style="padding:0;margin-left:20px;font-size:10px;width:24px;" /></div>')
					.find('#dbgclear').click(function(e){ dbg.children().slice(1).remove(); return false; }).end()
					.find('#dbgdisable').click(function(e){ DBG = function(){}; dbg.remove(); return false; }).end();
			}
			ct = $('#dbgct').val()||0;
			if(x || (ct && len > ct)){
				dbg.children().slice(1, x ? len : len+1-ct).remove();
			}
			dbg.append('<div>'+c+'</div>');
		}
	//default click handler for examples...
	, exampleClicks = function(ev){
			//alert("Por el momento sin asignar '"+($(this).parent().find('img').jqDock('get').Title)+"' <"+this.tagName.toUpperCase()+">");

			switch(($(this).parent().find('img').jqDock('get').Title)){ 
				case "Inicio":
					location.href="/"
					break;
				case "Contacto":
					location.href="http://nticx.net/pad/contacto"
					break;
				case "Nube":
					location.href="/"
					break;
				case "Orientaciones":
					location.href="/ejes/Orientación PAD"
					break;
				case "Transversales":
					location.href="/ejes/Temas Transversales"
					break;
				

			}
			this.blur();
			return false;
		};
jQuery(document).ready(function($){
	// set a click handler on all items (children) within #menu...
	$('#menu').children().click(exampleClicks);
	//show the versions...
	$('#versions').html('jQuery v' + $().jquery + '&nbsp;&nbsp;&nbsp;&nbsp;jqDock v' + ($.jqDock ? $.jqDock.version : '?'));
	// target blank window for the html file...
	$('a.descFile').attr('target', '_blank').addClass('targetBlank');
	// target top window for the examples page...
	$('a.descList').attr('target', '_top');
	// just for example.php, allow expand/collapse of code samples...
	$('#description .exco').click(function(){
			$(this).parent().next('.codex').slideToggle();
			this.blur();
			return false;
		});
});

