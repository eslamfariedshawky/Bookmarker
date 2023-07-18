var websiteName = document.getElementById("name");
var siteUrl = document.getElementById("site-url");
var submit = document.getElementById("submit");
var reset =document.getElementById("reset")
var valid =false;




websiteName.addEventListener("input" , nameValidation)
siteUrl.addEventListener("input" , urlValidation)
submit.addEventListener("click" , validateAll);
reset.addEventListener("click" , resetAll);

  var data ;


    chkLocalStorage();






preview();

function nameValidation(){
    if(websiteName.value.length > 3)
    {
        websiteName.className= "form-control is-valid"
        valid =true;
        
    }
    else{
        websiteName.className= "form-control is-invalid"
        valid = false;
    }
    
}

function urlValidation(){
        if(isValidUrl(siteUrl.value))
        {
           siteUrl.className= "form-control is-valid"
           valid =true;
        }
        else{
            siteUrl.className= "form-control is-invalid"
            valid =false;
        }
              
}



function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }


  function validateAll()
  {
    if(valid==true)
    {
        add();
        preview();
        clear();
        valid =false;
    }
    else{
        valid =false
        swal("Site Name or Url is not valid, Please follow the rules below :", "Site name must contain at least 3 characters  And   Site URL must be a valid one : Ex (https://www.example.com/)" );
        console.log("false entry ")
    }
  }

  function add(){
    var webName= websiteName.value;
    var site = siteUrl.value;

    var webData = {
         webName , site
    }

    data.push(webData);
    localSave();
    
  }

  function preview()
  {
    var trs ='' ;
    for(var i = 0 ; i < data.length ; i ++ )
    {
        trs+= `<tr class="table-light">
        <td >${i+1}</td>
        <td>${data[i].webName}</td>
        <td><a href="${data[i].site}" target=”_blank” ><button type="button" class="btn btn-success btn-lg" id="visit"> <i class="fa-solid fa-eye pe-2" ></i> Visit</button></a></td>
        <td><button type="button" class="btn btn-danger btn-lg" onclick="deleteIndex(${i})"> <i class="fa-solid fa-eye pe-2"></i> Delete</button></td>
      </tr>`
    }
    document.getElementById('tbody').innerHTML = trs;
  }


  function deleteIndex(index){
        data.splice(index, 1);
        localStorage.clear();
        localSave()
        
        preview();

  }

  function clear ()
  {
    websiteName.value=""
    siteUrl.value=""
    siteUrl.className= "form-control "
    websiteName.className= "form-control "


  }

  function localSave () {
    localStorage.setItem("allData" , JSON.stringify(data))
  }

  function chkLocalStorage(){
      if(localStorage.allData != null)
    {
        data = JSON.parse(localStorage.allData);
        
    }
    else {
        data = []; 
    }
  }

  function resetAll(){
    if(localStorage.allData != null)
    {   

        localStorage.clear();
        data.splice(0);
         preview();
    }
  }







    