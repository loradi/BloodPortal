var uid;
var bool = "1";
var bool_hospital = "2";
var address_hospital;
var name_hospital;
var postalCode_hospital;
var contact_hospital;
var personName_hospital;
var units_hospital;
var contactEmail_hospital;
var BloodBank_hospital;
const db = firebase.firestore();



validateHospital();
//logica para mostrar los datos en pantalla 
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      // User is signed in.
      console.log("ACA  SE REVISA EL BOOL"+bool_hospital);
      if(bool_hospital == "1"){
        //console.log("7");
      document.getElementById("user_div").style.display = "block";
      //console.log("8");
      document.getElementById("user_div2").style.display = "none";

    }else{
      document.getElementById("user_div").style.display = "none";
      //console.log("9");
      document.getElementById("user_div2").style.display = "block";
      //console.log("10");
    }
      document.getElementById("card_form").style.display = "block";
      //console.log("11");
      document.getElementById("show").style.display = "block";
      //console.log("12");
      document.getElementById("login_div").style.display = "none";
      //console.log("13");
      document.getElementById("hide").style.display = "none";
      
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        uid = user.uid;
        document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
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

        var request_unities = db.collection("HOSPITAL_DB/").add({arrayData});
        //request_unities.set(arrayData);
        console.log(arrayData.unidades+ uid);
      }
    }

    // funcion para insertar un Hospital 
    function insertHospital(){

      name_hospital = getID("name_hospital");
      address_hospital = getID("address_hospital");
      postalCode_hospital = getID("postalcode_hospital");
      personName_hospital = getID("personname_hospital");
      contactNumber_hospital = getID("contact_hospital");
      contactEmail_hospital = getID("contactEmail_hospital");
      bloodBank_hospital  = getID("bloodBank_hospital");
      

      if (address_hospital == "" ||  contact_hospital =="" || name_hospital == "" || personName_hospital == "" ||  postalCode_hospital =="" || contactEmail_hospital == "" || BloodBank_hospital==""){
        alert("Please fill all the inputs");
      }else{
        //console.log(bloodBank_hospital.length);
        if (bloodBank_hospital.length > 2){
          
          bloodBank_hospital = true;
          console.log(bloodBank_hospital);
        }else{
          
          bloodBank_hospital = false;
          console.log(bloodBank_hospital);
        }
        var regex = /^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/;
        var match = regex.exec(postalCode_hospital);
        if(match){
 
      //console.log("ESTOS SON LOS DATOS "+ address_hospital.lenght+ contact_hospital);
      var arrayData = arrayHospital(uid, address_hospital,name_hospital,postalcode_hospital,contact_hospital,personname_hospital, units_hospital);
      var Hospital_insert = db.collection("HOSPITAL_DB/").add({
        uid: uid,
        name: name_hospital,
        address: address_hospital,
        postalCode: postalCode_hospital,
        personName: personName_hospital,
        contactNumber: contactNumber_hospital,
        contactEmail: contactEmail_hospital,
        isBloodBank: bloodBank_hospital
      });
      //Hospital_insert.set(arrayData);
      alert("The Registration was successfull!!");
      cleanForm("address_hospital","");
      cleanForm("contact_hospital","");
      cleanForm("name_hospital","");
      cleanForm("personname_hospital","");
      cleanForm("postalcode_hospital","");
      cleanForm("contactEmail_hospital","");
    }else{
      alert("the Postal Code doesnt have the right format ");
    }
      }
    }
// function to clean form 
    function cleanForm(id,clean){
      return document.getElementById(id).value = clean;
    }
//Function to validate if the Hospital exist or not 
    function validateHospital(){
      //console.log("1");
      db.collection('HOSPITAL_DB/').get().then((snapshot) =>{
        snapshot.docs.forEach(doc => {
          console.log("ESTOS SON LOS DATOS "+ doc.data().uid);
          if(doc.data().uid == uid){
            console.log("7");
          document.getElementById("user_div").style.display = "block";
          console.log("8");
          document.getElementById("user_div2").style.display = "none";
          }
        });
      });

    }

  
    // esta es la funcion para desloguearse del sistema 
  function logout(){
    firebase.auth().signOut();
    location.reload();
  }
  