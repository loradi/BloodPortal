var uid;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("user_div").style.display = "block";
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
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("card_form").style.display = "none";
      document.getElementById("show").style.display = "none";
      document.getElementById("login_div").style.display = "block";
      document.getElementById("hide").style.display = "block";
  
    }
  });
  
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
  function getID(id){
    return document.getElementById(id).value;
    }
    function arrayJSON1(unidades, tipo_sangre){
      var arreglo = {
        unidades: unidades,
        tipo_sangre: tipo_sangre
      };
      return arreglo;

    }
    function insertRequest(){
      var unidades = getID("unitis");
      var tipo_sangre = getID("type_blood");
      if (unidades == 0 ){
        alert("You need to select at least one unit to send the request");
      }else{
        var arrayData = arrayJSON1(unidades,tipo_sangre);
        //var request_unities = firebase.database().ref("requestes");
        console.log(arrayData.unidades+ uid);
      }
    }
  
  function logout(){
    firebase.auth().signOut();
  }
  