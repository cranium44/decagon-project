const dbURL = "http://localhost:3000/employees";

function addEmployee(employee){
    $.ajax({
        type: 'POST',
        url: dbURL,
        data : employee,

        success: function(response){
            updateEmployeeTable();
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
            employeeInfo+= "<td>"+value.name+"</td>"
            employeeInfo+= "<td>"+value.name+"</td>"
            employeeInfo+= "<td>"+value.sex+"</td>"
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

function editEmployeeInfo(employeeInfo){

}
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

})