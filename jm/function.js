 
$(function() {
	$('#rechercher_formation').bind( "tap", envoie_formulaire );	
	
	function envoie_formulaire(){
		
	discipline = $("#discipline").val();
	pays = $("#pays").val();
	
	etablissement = $("#etablissement").val();
	niveau = $("#niveau").val();
	url1 = '';
	if(pays!= 0){
       url1 += "etablissement__pays__code_iso3="+pays;
    }
	url = "https://cartographie.auf.org/etablissement/api/?etablissement__region__nom=Asie-Pacifique&"+ url1;
    url += "&format=jsonp";
	
	var test = 'Romaric est le fils du Dieu tout puissant';
	var resultat ='';
	ajax(url);
	


}
function ajax(theurl){
	
	aaa=  $.ajax({
		type: 'GET',
		dataType: "jsonp",
		url: theurl,
		crossDomain: true,
		success: function (responseData, textStatus, jqXHR) {
			$('#loadgif').hide();
			
				
				var datas = responseData.results;
				var  template='';
				var encours ='';
				var encours_nom ='';
				nbre =1;
				
				for(i=0;i<datas.length;i++ ){
				
     if(encours != datas[i].etablissement.id){
		if(encours!=''){ template +=' </ul> <h5 >'+encours_nom+'<span class="ui-li-count">'+nbre+'</span></h5></div>';nbre =1;}
		 
		 template +='<div data-role="collapsible" data-theme="a">';
  		 
		template +=' <ul data-role="listview" data-theme="a" data-divider-theme="b" class="ui-listview">';
		template +=' <li data-role="list-divider" class="first">'+datas[i].etablissement.nom+' </li>';
		template +='  <li><a href="index.html">';
		template +='  <h5 class="white-space">'+datas[i].nom+'</h5>';
		template +=' <p><strong>'+datas[i].etablissement.pays.nom+'</strong> '+datas[i].niveau_diplome.nom+' </p></a></li>';
		encours = datas[i].etablissement.id;
		encours_nom = datas[i].etablissement.nom
         
       
		}else{
			nbre++;
			template +='  <li><a href="index.html">';
           template +='  <h5 class="white-space">'+datas[i].nom+'</h5>';
           template +=' <p><strong>'+datas[i].etablissement.pays.nom+'</strong> '+datas[i].niveau_diplome.nom+' </p></a></li>';
		   
			}
    
				}
				
				$('#resultat_recherche').append(template).listview();
				
				
				if(responseData.next === null){
					
					$.mobile.changePage('#resultat', "slide", true, true);
				}else{
					ajax(responseData.next);
				}
				
		},
		error: function (responseData, textStatus, errorThrown) {
				alert('POST failed.'+errorThrown);
		},
		details_formation: function(){
			alert('pourquoi?');
		}
	});
	
}
});

