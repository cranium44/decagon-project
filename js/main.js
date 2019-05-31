const dbURL = "http://localhost:3000/employees";

function getSalary(level) {
  switch (level) {
    case "1":
      return 30000;
      break;
    case "2":
      return 50000;
      break;
    case "3":
      return 80000;
      break;
    case "4":
      return 120000;
      break;
    case "5":
      return 170000;
      break;
    case "6":
      return 250000;
      break;
    case "7":
      return 350000;
      break;
    case "8":
      return 670000;
      break;
    case "9":
      return 1500000;
      break;
    case "10":
      return 2500000;
      break;

    default:
      return 0;
      break;
  }
}

function addEmployee(employee) {
  $.ajax({
    type: "POST",
    url: dbURL,
    data: employee,

    success: function(response) {
      document.location.href = "main.html";
    }
  });
}

function updateEmployeeTable() {
  let employeeInfo = "";
  let buttons =
    '<button type="button" class = "checkEntry" data>Check</button>';
  $.getJSON(dbURL, function(response) {
    $.each(response, function(key, value) {
      employeeInfo += "<tr>";
      employeeInfo += "<td>" + value.id + "</td>";
      employeeInfo += "<td>" + value.name + "</td>";
      employeeInfo += "<td>" + value.sex + "</td>";
      employeeInfo += "<td>" + value.dateBirth + "</td>";
      employeeInfo += "<td>" + value.position + "</td>";
      employeeInfo += "<td>" + value.qualification + "</td>";
      employeeInfo += "<td>" + value.salary + "</td>";
      employeeInfo += "<td>" + value.status + "</td>";
      employeeInfo +=
        '<td><button class = "deleteEntry" type="button" data-id="' +
        value.id +
        '" >';
      employeeInfo += "Delete</button>";
      employeeInfo +=
        '<button type="button" class = "checkEntry" data-id="' +
        value.id +
        '">';
      employeeInfo += "Edit</button>";
      employeeInfo += "</tr>";
    });
    $("#employee").append(employeeInfo);
  });
}

function deleteEmployee(id) {
  $.ajax({
    type: "DELETE",
    url: dbURL + "/" + id,
    success: function(response) {},
    error: function() {
      return "error";
    }
  });
}

function editEmployeeInfo(employeeInfo, id) {
  $.ajax({
    type: "PUT",
    url: dbURL + "/" + id,
    data: employeeInfo,

    success: function(response) {
        alert('success');
    }
  });
}

function searchEmployee(search) {
  $.getJSON(dbURL, function(data) {
    var regex = new RegExp(search, "i");
    var output = "";

    $.each(data, function(key, value) {
      if (regex.test(value.id) || regex.test(value.name)) {
        output += "<tr>";
        output += "<td>" + value.id + "</td>";
        output += "<td>" + value.name + "</td>";
        output += "<td>" + value.sex + "</td>";
        output += "<td>" + value.dateBirth + "</td>";
        output += "<td>" + value.position + "</td>";
        output += "<td>" + value.qualification + "</td>";
        output += "<td>" + value.salary + "</td>";
        output += "<td>" + value.status + "</td>";
        output +=
          '<td><button class = "deleteEntry" type="button" data-id="' +
          value.id +
          '" >';
        output += "Delete</button";
        output +=
        '<button type="button" class = "checkEntry" data-id="' +
        value.id +
        '">';
        output += "Edit</button>";
        output += "</tr>";
      }
    });
    $("#employee").html(output);
  });
}

function payAllEmployees() {
  let ids;
    $.getJSON(dbURL,
        function (response) {
            $.each(response, function (indexInArray, valueOfElement) { 
                 if(valueOfElement.status == false){
                     valueOfElement.status = true;
                     $.ajax({
                         type: "PUT",
                         url: dbURL+"/"+valueOfElement.id,
                         data: response,
                         
                         success: function (response) {
                             console.log('sucess')
                         },
                         error: function(response){
                             console.error('error');
                             
                         }
                     });
                 }
            });
        }
    );
}

//document ready
$(function() {
  let $employeeTable = $("#employee");
  updateEmployeeTable();

  $employeeTable.delegate(".deleteEntry", "click", function() {
    let id = $(this).attr("data-id");
    deleteEmployee(id);
    $(this)
      .closest("tr")
      .remove();
  });

  //REGISTER EMPLOYEE
  $("#submit").on("click", function() {
    var name = $("#name").val();
    var sex = $("#sex").val();
    var position = $("#position").val();
    var dateOfBirth = $("#birthDate").val();
    var level = $("#level").val();
    var email = $("#email").val();
    var qualification = $("#qualification").val();

    let employee = {
      name: name,
      sex: sex,
      position: position,
      dateBirth: dateOfBirth,
      level: level,
      salary: getSalary(level),
      email: email,
      qualification: qualification,
      status: false
    };

    addEmployee(employee);
  });

  //UPDATE EMPLOYEE
  $("#submit2").on("click", function() {
    var id = $('#id').val();
    var name = $("#name2").val();
    var sex = $("#sex2").val();
    var position = $("#position2").val();
    var dateOfBirth = $("#birthDate2").val();
    var level = $("#level2").val();
    var email = $("#email2").val();
    var qualification = $("#qualification2").val();

    let employee = {
      name: name,
      sex: sex,
      position: position,
      dateBirth: dateOfBirth,
      level: level,
      salary: getSalary(level),
      email: email,
      qualification: qualification,
      status: false
    };

    console.log(employee);
    
    $.ajax({
        type: "GET",
        url: dbURL,
       
        success: function (response) {
          console.log(response);
            $.each(response, function (indexInArray, value) { 
              console.log(id +" "+value.id)
               if(id == value.id){
                 console.log("passed condition")
                 $.ajax({
                   type: "PUT",
                   url: dbURL+"/"+id,
                   data: employee,
                   
                   success: function (response) {
                     console.log('success');
                     
                   },
                    error: function (response) {
                      console.error(response);
                      
                    }
                    
                 });
               } 
            });
        }
    });
  });

 

  $("#search").keydown(function(e) {
    var search = $("#search").val();
    searchEmployee(search);
  });
  //PAY ALL EMPLOYEES
  $("#payall").on("click", function() {
    payAllEmployees();
  });
});
