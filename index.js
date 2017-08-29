
var place_types=["art_gallery","beauty_salon","bakery","bar","book_store","cafe","casino","dentist","department_store","doctor","florist","gym","lodging","laundry","police","liquor_store","meal_delivery","meal_takeaway","museum","night_club","park","post_office","restaurant","spa"];
var types =new Array();
var diff=types.filter(function(val) {
  return returned_types.indexOf(val) != -1;
});



function startApp(){
  $(".init_app").click(function(){
    $('.js_submit_type').toggle();
    $('.sub_head').hide();
    renderTypes();
    console.log('listener ran')
    $(".init_app").hide();
    $('.question').toggle();


    // $('js_submit_form').toggle();
  })}


function listenTypeSubmit(){
  console.log('listenTypeSubmit ran');
  $(".js_submit_type").submit(event=>{
    event.preventDefault();
    $('.js_types input[type="checkbox"]:checked').each(function(){
      types.push($(this).attr("value"));
      console.log('listenTypeSubmit ran');
      console.log(types);
      $(".js_submit_type").hide();
      $('.js_submit_form').show();
      $('.init_app').hide();
      $('.question').hide();
      listenSubmit();
    });
});
}

function listenSubmit(){
    console.log('listenSubmit ran');
  $('.js_submit_form').submit(event=> {
    event.preventDefault();
    const queryTarget= $(event.currentTarget).find('.address_query_input');
    const query=queryTarget.val();
    $('.js_display_div').show();
    $('.js_submit_form').hide();
    queryTarget.val("");
    console.log('listenSubmit ran');
    getGeoCode(query);
    console.log(query);
  })
}

  function renderTypes(){
    for(var i=0;i<place_types.length;i++){
     $(".js_types").append(`<input type="checkbox" name="checkbox_input${place_types[i]}" value="${place_types[i]}" class="js_submit_type">
    <label for="google_place_types" class="js_type">${place_types[i].replace('_',' ')}</label><br>`)
    console.log('render types ran');
   }
 }

function getGeoCode(query){
  var geocoder= new google.maps.Geocoder();
  geocoder.geocode({address:query}, function(results,status){
    if (results.length){
  var latlng=results[0].geometry.location;
  newMap(latlng);
}})
}

function createResults(results){
  console.log('createResults ran');
  const jsonresults = results;
  const returned_types= results.types;
  console.log(diff);
  let photo_ref=jsonresults.photos["0"].getUrl({'maxWidth': 100})

  $('.js_display_div').append(`<div class="col-3 js_your_results">
    <h1 class="type_place">${jsonresults.types[0]}</h1>
    <h2 class="js_name">${jsonresults.name}</h2>
    <h3 class="js_vicinity">${jsonresults.vicinity}</h3>
    <a class="js_more_info" href="https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${jsonresults.place_id}">More Information</a>
    <div class="pic_div">
      <img class="google_img" src="${photo_ref}"width = "100px" height = "75px">
    </div>
    </div>
    `);
  }


function renderResult(jsonresult){
  console.log('renderResult ran')
  //render the results in the DOM
}

  function handleMap(){
    // renderTypes();
    listenTypeSubmit();
  }
  //https://maps.googleapis.com/maps/api/place/details/json?placeid=${jsonresults.place_id}&key=AIzaSyBZ7m7GCdTNU6w7AT_IfdAtJh8xu41dCUw.results.website
  // "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${jsonresults.getUrl}"
$(handleMap);