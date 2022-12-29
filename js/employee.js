// adding staff info
$(document).ready(function(){

   loadData(); 

  
})

let adding_button = document.getElementById("list-button");
function myFunction(){
    document.getElementById("ctn").style.filter = "blur(2px)"
    document.getElementById("af").style.visibility = "visible";
}
adding_button.addEventListener("dblclick",myFunction);

// close adding form
let close_button = document.getElementById("header-icon");
let cancel_button = document.getElementById("cancel");
function close(){
    document.getElementById("ctn").style.filter = "blur(0px)"
    document.getElementById("af").style.visibility = "hidden";
}
close_button.addEventListener("click",close);

cancel_button.addEventListener("click",close);

//validate dữ liệu

let textName = document.getElementById("text-name");
console.log(textName)
textName.addEventListener('click', function(){
      console.log(textName.value);
      if (textName.value == 'a'){
        document.getElementById("af").style.filter = "blur(2px)"
         document.getElementById("dialog").style.visibility = "visible";

        }
      else {
        textName.style.borderColor = "blue";
      }
});


// var close_button2 = document.getElementsByClassName("dialog__icon");
// console.log(close_button2)
// var dialog_close_button = close_button2.item[1];
// console.log(dialog_close_button);
// var dialog_close_button = document.getElementById("dgn");
// console.log(dialog_close_button);
// function close1(){
//     document.getElementById("af").style.filter = "blur(0px)";
//     document.getElementById("dialog").style.visibility = "hidden";
// }
// dialog_close_button.addEventListener("click",close1);

$("#dgn").click( function(){
  document.getElementById("af").style.filter = "blur(0px)";
  document.getElementById("dialog").style.visibility = "hidden";
});

// định dạng hiển thị ngày tháng năm
function formatDate(date){
  try{
      if(date){
          date = new Date(date);

         let day = date.getDate() ;
         day = day < 10 ? `0${day}` :day ;
         let month = date.getMonth()+1;
         month = month < 10 ? `0${month}` : month;
         let year = date.getFullYear();

         return `${day}/${month}/${year}`;
      }
      else{
        return ``;
      }

  }
  catch(error){
    console.log(error);
  }
}

function formatWS(ws){
  try{
     if (ws == 1){
        return `Đang thử việc`;
     }
     if (ws == 2){
        return `Nhân viên chính thức`;
     }
  }
  catch(error)
  {
  console.log(error);
  }
}
 async function loadData(){
  //Gọi API lấy dữ liệu
 await fetch("https://cukcuk.manhnv.net/api/v1/Employees", {method:"GET"})
  .then(res => res.json())
  .then(res =>{
        //  log(res);
        // console.log(res);
         let ths = $("table#EmployeeList  th") ;
         
         for(const emp of res){
                // duyệt từng cột
                var trHTML_new = $('<tr class ="js"></tr>');
            for(const th of ths){
//lấy propValue tương ứng vói các cột
              
              const propValue = $(th).attr("propValue");
              const format = $(th).attr("format");
              //Lấy giá trị tương ứng với tên của propValue
              var value = emp[propValue];
             

              switch(format){
                case "date":
                      value = formatDate(value);
                      
                      break;
                case "ws":
                     value = formatWS(value);
                default:
                   break;
              }
              let thHTML = `<th>${value ||""}</th>`;
              // console.log(typeof thHTML);
             
             
             
              trHTML_new.append(thHTML);
              
             
             } 
             
             $("table#EmployeeList ").append(trHTML_new);
           
            

             
            }
           
      //       var employeeCode = emp.EmployeeCode;
      //      var fullName = emp.FullName;
      //      var dob = emp.DateOfBirth;
      //      // địng dạng ngày sinh\
      //      dob = formatDate(dob);
      //      var gender = emp.GenderName;
      //      var email = emp.Email;
      //      var phone = emp.PhoneNumber;
      //      var department = emp.DepartmentName;
      //      var pos = emp. PositionName;
      //      var workState = emp.WorkStatus;
      //      // build các tr html
      //      var trHTML = `<tr>
      //      <td>${employeeCode}</td>
      //      <td>${fullName}</td>
      //      <td>${gender}</td>
      //      <td>${dob}</td>
      //      <td>${phone||""}</td>
      //      <td>${email}</td>
      //      <td>${pos}</td>
      //      <td>${department}</td>
      //      <td>${workState}</td>
      //  </tr>`;
      //      //append html tr
         
      //    }$("table#EmployeeList ").style.color = "white";
      
  })
  .catch(res =>{
         console.log(res);
         
  })

  //Xử lý dữ liệu

}
console.log(document.getElementsByClassName("js"));
// style.color = "white";
document.getElementById("EmployeeList").style.fontWeight= "500";