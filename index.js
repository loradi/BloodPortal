var uid;
var bool = "2";
var address_hospital;
var name_hospital;
var postalcode_hospital;
var contact_hospital;
var personname_hospital;
var units_hospital;

//logica para mostrar los datos en pantalla 
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      if(bool == "1"){
        console.log("entro al If");
      document.getElementById("user_div").style.display = "block";
      document.getElementById("user_div2").style.display = "none";

    }else{
      document.getElementById("user_div").style.display = "none";
      document.getElementById("user_div2").style.display = "block";
    }
      document.getElementById("card_form").style.display = "block";
      document.getElementById("show").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      document.getElementById("hide").style.display = "none";
      
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        uid = user.uid;
        document.getElementById("user_para").innerHTML = "Welcome User : " + email_id+ uid;
  
      }
  
    } else {
      // No user is signed in.
      console.log("ESTE ES EL DATO "+ bool);

      document.getElementById("card_form").style.display = "none";
      document.getElementById("user_div").style.display = "none";
      document.getElementById("user_div2").style.display = "none";
      document.getElementById("show").style.display = "none";
      document.getElementById("login_div").style.display = "block";
      document.getElementById("hide").style.display = "block";
      //document.getElementById("first_time").style.display = "block";
  
    }
  });
  
// esta es la funcion para loguearse en firebase 

  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
  
  }
  // esta es la funcion para traer el elemento por id 
  function getID(id){
    return document.getElementById(id).value;
    }

// esta es la funcion para armar el arreglo del request 
    function arrayJSON1(unidades, tipo_sangre){
      var arreglo = {
        unidades: unidades,
        tipo_sangre: tipo_sangre
      };
      return arreglo;

    }
// esta es la funcion para armar el arreglo del request 
function arrayHospital(uid, address_hospital,name_hospital,postalcode_hospital,contact_hospital,personname_hospital, units_hospital){
  var arreglo = {
    uid: uid,
    address_hospital: address_hospital,
    name_hospital: name_hospital,
    postalcode_hospital: postalcode_hospital,
    contact_hospital: contact_hospital,
    personname_hospital: personname_hospital,
    units_hospital: units_hospital
  };
  return arreglo;

}

    // esta es la funcion para insertar el requerimiento de unidades 
    function insertRequest(){
      var unidades = getID("unitis");
      var tipo_sangre = getID("type_blood");
      if (unidades == 0 ){
        alert("You need to select at least one unit to send the request");
      }else{
        var arrayData = arrayJSON1(unidades,tipo_sangre);
        var request_unities = firebase.database().ref("HOSPITAL_DB/");
        request_unities.set(arrayData);
        console.log(arrayData.unidades+ uid);
      }
    }

    // funcion para insertar un Hospital 
    function insertHospital(){
      address_hospital = getID("address_hospital");
      contact_hospital = getID("contact_hospital");
      name_hospital = getID("name_hospital");
      personname_hospital = getID("personname_hospital");
      postalcode_hospital = getID("postalcode_hospital");
      units_hospital  = getID("units_hospital");


      if (address_hospital == "" ||  contact_hospital =="" || name_hospital == "" || personname_hospital == "" ||  postalcode_hospital =="" || units_hospital == ""){
        alert("Please fill all the inputs");
      }else{
      console.log("ESTOS SON LOS DATOS "+ address_hospital.lenght+ contact_hospital);
      var arrayData = arrayHospital(uid, address_hospital,name_hospital,postalcode_hospital,contact_hospital,personname_hospital, units_hospital);
      var Hospital_insert = firebase.database().ref("HOSPITAL_DB/"+uid);
      Hospital_insert.set(arrayData);
      alert("The Registration was successfull!!");
      cleanForm("address_hospital","");
      cleanForm("contact_hospital","");
      cleanForm("name_hospital","");
      cleanForm("personname_hospital","");
      cleanForm("postalcode_hospital","");
      cleanForm("units_hospital","");

      }
    }
// function to clean form 
    function cleanForm(id,clean){
      return document.getElementById(id).value = clean;
    }

  
    // esta es la funcion para desloguearse del sistema 
  function logout(){
    firebase.auth().signOut();
  }
  