
var jpdbBaseUrl = "http://api.login2explore.com:5577";
var jpdbIml= "/api/iml";
var jpdbIrl= "/api/irl";
var stdDbName = "Schl_Db";
var StdRelName= "Std_table";
var connToken = "90932936|-31949281180408971|90947741";


function saveRecNO2Ls(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recon",lvData.rec_no);
}

function getStdRollAsJsonObj(){
    var rollNo = $("#rollNo").val();
    var jsonStr = {
        Roll_no:rollNo
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNO2Ls(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#fullName").val(record.Name);
    $("#gender").val(record.Gender);
    $("#class1").val(record.Class);
    $("#birth_date").val(record.Dob);
    $("#address").val(record.Address);
    $("#enrollment_date").val(record.Enrollment_Date);
}

function resetForm() {
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#class1").val("");
    $("#birth_date").val("");
    $("#address").val("");
    $("#enrollment_date").val("");
    $("#rollNo").prop("disabled",false);
    $("#stdSave").prop("disabled",true)
    $("#stdChange").prop("disabled",true);
    $("#stdReset").prop("disabled",true);
    $("#rollNo").focus();
}


function validateData(){ 
    var rollNo = $("#rollNo").val();
    if(rollNo === ""){
        alert("Roll no. is missing");
        $("#rollNo").focus();
        return "";
    }

    var fullName = $("#fullName").val();
    if(fullName === ""){
        alert("Name is missing");
        $("#fullName").focus();
        return "";
    }

    var class1 = $("#class1").val();
    if(class1 === ""){
        alert("class is missing");
        $("#class1").focus();
        return "";
    }

    var birth_date = $("#birth_date").val();
    if(birth_date === ""){
        alert("Birth Date is missing");
        $("#birth_date").focus();
        return "";
    }

    var address = $("#address").val();
    if(address === ""){
        alert("Address ia missing");
        $("#address").focus();
        return "";
    }

    var enrollment_date = $("#enrollment_date").val();
    if(enrollment_date === ""){
        alert("Enrollment Date is missing");
        $("#enrollment_date").focus();
        return "";
    }

    var jsonStrObj = {
        Roll_no:rollNo,
        Name:fullName,
        Class:class1,
        Dob:birth_date,
        Address:address,
        Enrollment_Date:enrollment_date
    };
    return JSON.stringify(jsonStrObj);
}

function getStd(){
    var stdrollJsonObj = getStdRollAsJsonObj();
    var getRequest =  createGET_BY_KEYRequest(connToken,stdDbName,StdRelName,stdrollJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseUrl,jpdbIrl);
    jQuery.ajaxSetup({async:true});
    if(resJsonObj.status === 400){
        $("#stdSave").prop("disabled",false);
        $("#stdReset").prop("disabled",false);
        $("#fullName").focus();
    }

    else if(resJsonObj.status === 200){
        $("#rollNo").prop("disabled",true);
        fillData(resJsonObj);
        $("#stdChange").prop("disabled",false);
        $("#stdReset").prop("disabled",false);
        $("#fullName").focus();

    }
}


function saveStudent(){
    var jsonStrObj = validateData();
    if(jsonStrObj==""){
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj,stdDbName,StdRelName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseUrl,jpdbIml);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $("#rollNo").focus();
}


function changeData(){
    $("#stdChange").prop("disabled",true);
    jsoncng = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsoncng,stdDbName,StdRelName,localStorage.getItem("recon"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseUrl,jpdbIml);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $("#rollNo").focus();
}