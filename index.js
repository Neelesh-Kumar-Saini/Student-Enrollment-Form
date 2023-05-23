    $("#RollNo").focus();

    function saveRecNo2LS(jsonObj){
        var lvData = JSON.parse(jsonObj.data);
        localStorage.setItem('recno', lvData.rec_no);
    }

    function getRollNoAsJsonObj(){
        var RollNo = $('#RollNo').val();
        var jsonStr = {
            RollNo: RollNo
        };
        return JSON.stringify(jsonStr);
    }

    function fillData(jsonObj){
        saveRecNo2LS(jsonObj);
        var record = JSON.parse(jsonObj.data).record;
        $('#FullName').val(record.FullName);
        $("#Class").val(record.Class);
        $('#BirthDate').val(record.BirthDate);
        $('#Address').val(record.Address);
        $('#EnrollmentDate').val(record.EnrollmentDate);


    }

    function resetForm() {
        $("#RollNo").val("");
        $("#FullName").val("");
        $("#Class").val("");
        $("#BirthDate").val("");
        $("#Address").val("");
        $("#EnrollmentDate").val("");
        $("#RollNo").prop("disabled", false);
        $("#save").prop("disabled", true);
        $("#change").prop("disabled", true);
        $("#reset").prop("disabled", true);
        $("#RollNo").focus();
    }

    function validateAndGetFormData() {
        var RollNo, FullName, Class, BirthDate, Address, EnrollmentDate;
        RollNo = $("#RollNo").val();
        FullName = $("FullName").val();
        Class = $("Class").val();
        BirthDate = $("#BirthDate").val();
        Address = $("#Address").val();
        EnrollmentDate = $("#EnrollmentDate").val();

        if (RollNo === "") {
            alert("Roll No Required Value");
            $("#RollNo").focus();
            return "";
        }
        
        if (FullName === "") {
            alert("Student Name is Required Value");
            $("#FullName").focus();
            return "";
        }

        if (Class === "") {
            alert("Class Required Value");
            $("#Class").focus();
            return "";
        }
        if (BirthDate === "") {
            alert("Birth Date Required Value");
            $("#BirthDate").focus();
            return "";
        }
        if (Address === "") {
            alert("Address Required Value");
            $("#Address").focus();
            return "";
        }
        if (EnrollmentDate === "") {
            alert("Enrollment Date Required Value");
            $("#EnrollmentDate").focus();
            return "";
        }

        
        var jsonStrObj = {
            RollNo: RollNo,
            FullName: FullName,
            Class: Class,
            BirthDate: BirthDate,
            Address: Address,
            EnrollmentDate: EnrollmentDate,
        };
        alert(JSON.stringify(jsonStrObj));
        return JSON.stringify(jsonStrObj);
    }

    function getStudent(){
        var RollNoJsonObj = getRollNoAsJsonObj();
        var getRequest = createGET_BY_KEYRequest("90933212|-31949279395033845|90950684", "SCHOOL-DB", "STUDENT-TABLE", RollNoJsonObj);
        jQuery.ajaxSetup({ async: false });
        var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, "http://api.login2explore.com:5577", "/api/irl");

        jQuery.ajaxSetup({ async: true });
        if(resJsonObj.status===400){
            $("#save").prop("disabled", false);
            $("#reset").prop("disabled", false);
            $("FullName").focus();
        }
        else if(resJsonObj.status===200){
            $("#RollNo").prop("disabled", true);
            fillData(resJsonObj);

            $("#change").prop("disabled", false);
            $("#reset").prop("disabled", false);
            $("FullName").focus();
        }
    }

    function saveData() {
        var jsonStrObj = validateAndGetFormData();
        if (jsonStrObj === "") {
            return "";
        }
        alert(jsonStrObj);
        var putReqStr = createPUTRequest("90933212|-31949279395033845|90950684",
            jsonStrObj, "SCHOOL-DB", "STUDENT-TABLE");
        alert(putReqStr);
        jQuery.ajaxSetup({ async: false });
        var resJsonObj = executeCommandAtGivenBaseUrl(putReqStr,
            "http://api.login2explore.com:5577", "/api/iml");
        
        jQuery.ajaxSetup({ async: true });
        alert(JSON.stringify(resJsonObj));

        resetForm();
        $("#RollNo").focus();
    }

    function changeData(){
        $("change").prop("disabled", true);
        jsonChg = validateAndGetFormData();
        var updateRequest = createUPDATERecordRequest("90933212|-31949279395033845|90950684", jsonChg, "SCHOOL-DB",  "STUDENT-TABLE", localStorage.getItem('recno'));
        jQuery.ajaxSetup({ async: false });
        var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, "http://api.login2explore.com:5577", "/api/iml");
        jQuery.ajaxSetup({ async: true });
        console.log(resJsonObj);
        resetForm();
        $("#RollNo").focus();
    }
