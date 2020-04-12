//Service Worker
if ('serviceWorker' in navigator) {	

	navigator.serviceWorker.register('./sw.js')
	.then(res => console.log('serviceWorker cargado correctamente', res))
	.catch(err => console.warn('serviceWorker no se a podido registrar', err));
	
}else{
	console.log('No Puedes usar los serviceWorker en tu Navegador');
}
////////////////////////////////////////////////////////////////////////////
// Scroll suavizado
$(document).ready(function(){
	
	$("#menu a").click(function(e){
		e.preventDefault();

		$("html, body").animate({
			scrollTop: $($(this).attr('href')).offset().top
		});
		return false;
	});
});
///////////////////////////////////////////////////////////////////////////////