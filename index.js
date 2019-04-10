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
var fechadesolicitud;
var email_id ;
var responds = [];
const db = firebase.firestore();



validateHospital();
//logica para mostrar los datos en pantalla 
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      // User is signed in.
      //console.log("ACA  SE REVISA EL BOOL"+bool_hospital);
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
  
        email_id = user.email;
        uid = user.uid;
        document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
      }
  
    } else {
      // No user is signed in.
      //console.log("ESTE ES EL DATO "+ bool);

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
    var myVar = setInterval(refresh, 1000);
  
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
      var date = new Date();

      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var min = date.getMinutes();
      var sec = date.getSeconds();
  
      month = (month < 10 ? "0" : "") + month;
      day = (day < 10 ? "0" : "") + day;
      hour = (hour < 10 ? "0" : "") + hour;
      min = (min < 10 ? "0" : "") + min;
      sec = (sec < 10 ? "0" : "") + sec;
  
      var str = date.getFullYear() + "-" + month + "-" + day + " " +  hour + ":" + min + ":" + sec;
      console.log("LOS DATOS "+ contactEmail_hospital+"/"+address_hospital+"/"+name_hospital+"/"+postalCode_hospital+"/"+personName_hospital+"/"+contactNumber_hospital+"/"+uid);
  
      //alert(str);
      if (unidades <= 0 || unidades > 40){

        alert("You need to select units betwwen the range 1 - 40");
        
      }else{
        var date = new Date();
        if(tipo_sangre == "A+"){
          var blood = 1;
        }
        if(tipo_sangre == "A-"){
          var blood = 2;
        }
        if(tipo_sangre== "B+"){
          var blood = 3;
        }
        if(tipo_sangre == "B-"){
          var blood = 4;
        }
        if(tipo_sangre == "O+"){
          var blood = 5;
        }
        if(tipo_sangre == "0-"){
          var blood = 6;
        }
        if(tipo_sangre == "AB+"){
          var blood = 7;
        }
        if(tipo_sangre == "AB-"){
          var blood = 8;
        }
        if(tipo_sangre == "RARE_TYPE"){
          var blood = 9;
        } 

        var min=1111111111; 
        var max=9999999999;  
        var random =Math.floor(Math.random() * (+max - +min)) + +min;
          
        var unities = parseInt(unidades);
        var request_unities = db.collection("REQUEST_DB/").add({
          orgName: name_hospital,
          orgAddress: address_hospital,
          orgPostalCode: postalCode_hospital,
          personName: personName_hospital,
          contactNumber: contactNumber_hospital,
          contactEmail: contactEmail_hospital,
          hospitalID: uid,
          bloodGroup: blood,
          units: unities,
          timestampCreated: date,
          requestID: random
        });
        //request_unities.set(arrayData);
        alert("The Request was successfull!!");
        cleanForm("unitis","");
        //setTimeout(refresh(),1500);
        var myVar = setInterval(refresh, 1000);
        

      }
    }
 

    // funcion para insertar un Hospital 
    function insertHospital(){

      name_hospital = getID("name_hospital");
      address_hospital = getID("address_hospital");
      postalCode_hospital = getID("postalcode_hospital");
      personName_hospital = getID("personname_hospital");
      contactNumber_hospital = getID("contact_hospital");
      bloodBank_hospital  = getID("bloodBank_hospital");
      

      if (address_hospital == "" ||  contact_hospital =="" || name_hospital == "" || personName_hospital == "" ||  postalCode_hospital =="" || contactEmail_hospital == "" || BloodBank_hospital==""){
        alert("Please fill all the inputs");
      }else{
        //console.log(bloodBank_hospital.length);
        if (bloodBank_hospital.length > 2){
          
          bloodBank_hospital = true;
          //console.log(bloodBank_hospital);
        }else{
          
          bloodBank_hospital = false;
          //console.log(bloodBank_hospital);
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
        contactEmail: email_id,
        isBloodBank: bloodBank_hospital
      });
      //Hospital_insert.set(arrayData);
      alert("The Registration was successfull!!");
      cleanForm("address_hospital","");
      cleanForm("contact_hospital","");
      cleanForm("name_hospital","");
      cleanForm("personname_hospital","");
      cleanForm("postalcode_hospital","");
      var secondvar = setInterval(refresh, 1000);
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
      console.log("1");
      var count = 0;
      db.collection('HOSPITAL_DB/').get().then((snapshot) =>{
        console.log("2");
        snapshot.docs.forEach(doc => {
          count++;
          console.log("3"+count);
          console.log("ESTOS SON LOS DATOS "+ doc.data().uid+"_____"+count);
          if(doc.data().uid == uid){
            console.log("4"+count);
            contactNumber_hospital = doc.data().contactNumber;
            contactEmail_hospital = doc.data().contactEmail;
            name_hospital = doc.data().name;
            address_hospital = doc.data().address;
            postalCode_hospital = doc.data().postalCode;
            personName_hospital = doc.data().personName;
            
          document.getElementById("user_div").style.display = "block";
          //console.log("8");
          document.getElementById("user_div2").style.display = "none";
          populateTable();
          }
          console.log("5");
        });
        console.log("6"); 
      });
      console.log("7");

    }

//populate html 
function innerHTML(id,result){
  return document.getElementById(id).innerHTML += result;
}

//create tables 
    function createTable(name_hospital,address_hospital,type_blood,units_hospital,timestampCreated){
      return '<tr>'+
        '<td>'+name_hospital+'</td>'+
        '<td>'+address_hospital+'</td>'+
        '<td>'+type_blood+'</td>'+
        '<td>'+units_hospital+'</td>'+
        '<td>'+timestampCreated+'</td>'+
      '</tr>';
    }
//fill the table 
    function populateTable(){
      db.collection('REQUEST_DB/').get().then((snapshot) =>{
        snapshot.docs.forEach(doc =>{
          //console.log("ESTOS SON LOS DATOS DE LA TABLA"+doc.length);
          if(doc.data().hospitalID == uid){
            if(doc.data().bloodGroup == 1){
              var blood = "A+";
            }
            if(doc.data().bloodGroup == 2){
              var blood = "A-";
            }
            if(doc.data().bloodGroup == 3){
              var blood = "B+";
            }
            if(doc.data().bloodGroup == 4){
              var blood = "B-";
            }
            if(doc.data().bloodGroup == 5){
              var blood = "O+";
            }
            if(doc.data().bloodGroup == 6){
              var blood = "O-";
            }
            if(doc.data().bloodGroup == 7){
              var blood = "AB+";
            }
            if(doc.data().bloodGroup == 8){
              var blood = "AB-";
            }
            if(doc.data().bloodGroup == 9){
              var blood = "RARE_TYPE";
            }

            var dates =  new Date(doc.data().timestampCreated);
            
            var utc = dates.getTime() + (dates.getTimezoneOffset() * 60000);  //This converts to UTC 00:00
            var nd = new Date(utc + (3600000*dates));

            var month = dates.getMonth() + 1;
            var day = dates.getDate();
            var hour = dates.getHours();
            var min = dates.getMinutes();
            var sec = dates.getSeconds();
        
            month = (month < 10 ? "0" : "") + month;
            day = (day < 10 ? "0" : "") + day;
            hour = (hour < 10 ? "0" : "") + hour;
            min = (min < 10 ? "0" : "") + min;
            sec = (sec < 10 ? "0" : "") + sec;
        
            var str = dates.getFullYear() + "-" + month + "-" + day + " " +  hour + ":" + min + ":" + sec;
            console.log(doc.data().timestampCreated+"///"+nd.toLocaleString());

          var tablaHospital = createTable(doc.data().orgName,doc.data().orgAddress,blood,doc.data().units);
          //console.log("SE ESTA REPITIENDO");
          innerHTML("loadtask", tablaHospital);
          }else{
            // console.log("No son compatibles los UID");
          }

        });
      });
    }

    function convertEpochToSpecificTimezone(offset){
      var d = new Date(1495159447834);
      var utc = d.getTime() + (d.getTimezoneOffset() * 60000);  //This converts to UTC 00:00
      var nd = new Date(utc + (3600000*offset));
      return nd.toLocaleString();
  }

    function refresh(){
      location.reload();
    }
  
    // esta es la funcion para desloguearse del sistema 
  function logout(){
    firebase.auth().signOut();
    location.reload();
  }
  