const dbURL = "http://localhost:3000/employees";

function getSalary(level){
    switch (level) {
        case '1':
            return 30000;
            break;
        case '2':
            return 50000;
            break;
        case '3':
            return 80000;
            break;
        case '4':
            return 120000;
            break;
        case '5':
            return 170000;
            break;
        case '6':
            return 250000;
            break;
        case '7':
            return 350000;
            break;
        case '8':
            return 670000;
            break;
        case '9':
            return 1500000;
            break;
        case '10':
            return 2500000;
            break;
    
        default:
            return 0;
            break;
    }
}

function addEmployee(employee){
    $.ajax({
        type: 'POST',
        url: dbURL,
        data : employee,

        success: function(response){
            document.location.href = "main.html";
        }
    });
}

function updateEmployeeTable(){
    
    let employeeInfo = "";
    let buttons = '<button type="button" id="check">Check</button>'
    $.getJSON(dbURL, function(response){
        $.each(response, function(key, value){
            console.log(response);
            employeeInfo+= "<tr>"
            employeeInfo+= "<td>"+value.id+"</td>"
            employeeInfo+= "<td>"+value.name+"</td>"
            employeeInfo+= "<td>"+value.sex+"</td>"
            employeeInfo+= "<td>"+value["date-of-birth"]+"</td>"
            employeeInfo+= "<td>"+value.position+"</td>"
            employeeInfo+= "<td>"+value.qualification+"</td>"
            employeeInfo+= "<td>"+value.salary+"</td>"
            employeeInfo+= "<td>"+value["payment-status"]+"</td>"
            employeeInfo+= '<td>"<button class = "deleteEntry" type="button" data-id="'+value.id+'" >'
            employeeInfo+= 'Delete</button'
            employeeInfo+= "</tr>"
        })
        $('#employee').append(employeeInfo);
    });
}

function deleteEmployee(id){
    $.ajax({
        type: 'DELETE',
        url: dbURL+"/"+id,
        success:function(response){
        },
        error: function(){
            return "error";
        }
    });
}

function editEmployeeInfo(employeeInfo, id){
    $.ajax({
        type: "PUT",
        url: dbURL+'/'+id,
        data: employeeInfo,

        success: function (response) {
            
        }
    });
}

function searchEmployee(search){

}

function payAllEmployees(){
    $.ajax({
        type: "PATCH",
        url: dbURL,
        data: "data",
        dataType: "dataType",
        success: function (response) {
            
        }
    });
}

//document ready
$(function(){
    let $employeeTable = $('#employee');
    updateEmployeeTable()

    $employeeTable.delegate('.deleteEntry','click', function(){
        let id = $(this).attr('data-id');
        deleteEmployee(id);
        $(this).closest('tr').remove();
    })

    $("#loadModal").on("click",function(e){
        e.preventDefault();
        $('#createEmployee').modal('show');
    })

    $('#submit').on('click', function () {
        var name = $("#name").val()
        var sex = $("#sex").val()
        var position = $("#position").val()
        var dateOfBirth = $("#birthDate").val()
        var level = $("#level").val()
        var email = $("#email").val()
        var qualification = $("#qualification").val()

        let employee = {
            "name": name,
            "sex": sex,
            "position": position,
            "date-of-birth": dateOfBirth,
            "level": level,
            "salary": getSalary(level),
            "email": email,
            "qualification": qualification,
            "payment-status": false
        };

        
        addEmployee(employee);
    });

})