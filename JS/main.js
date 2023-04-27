//TexBox And Button Create
let productName=document.querySelector("#productName");
let price=document.querySelector("#price");
let taxes=document.querySelector("#taxes");
let ads=document.querySelector("#ads");
let discount=document.querySelector("#discount");
let count=document.querySelector("#count");
let category=document.querySelector("#category");
let total=document.querySelector("#total");


let tbody=document.querySelector("#tbody");
let txtsearch=document.querySelector("#search");

let deleteall=document.querySelector("#deleteall");
let btnsearchbyname=document.querySelector("#searchbyname");
let btnsearchbycategory=document.querySelector("#searchbycategory");
let btncreate=document.querySelector("#btncreate");

let arr;
let id;

btncreate.onclick=function(){

if(btncreate.value !="Updated"){
    addData();
}else{
    ExcuteUpdate();
}
 
   
}
function getTotal(){
if(price.value != ''){
    let res=(+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML=res;
    total.style.background="green";
}
else{
    total.innerHTML='';
    total.style.background="red";
}

   
  

}


//Add New Data And GetLocalStorage

function addData(){

    let obj={
        productName:productName.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        category:category.value,
        total:total.innerHTML,
        category:category.value.toLowerCase()
    }
    if(productName.value !=''){
        if(count.value ==1){
            arr.push(obj);
        }
        else{
            let numCount=count.value;

            
            for(let x=0;x<numCount;x++){    
                arr.push(obj);

            }
            console.log(obj)
        }
        
    
        
        localStorage.setItem("allProduct",JSON.stringify(arr));
        clearData();
        showData();
        //function showdata
     
    }
    else{
        alert("You Should Enter Data Less Than Name And Count");
    }
    
    
}
showData();
//Show Data In Table

function showHideDeleteAll(){
    if(arr.length >1){
        deleteall.innerHTML=`
        <input type="button" value="Delete All" onclick="deleteAll()" class="btndelete"   /> 
        `
    }else{
        deleteall.innerHTML='';
    }
     
}
function showData(){
    let table='';
    if(localStorage.allProduct !=null){
        arr= JSON.parse(localStorage.allProduct);
    
        for(let x=0;x<arr.length;x++){
            table+=`
           <tr>
           <td>${x+1}</td>
           <td>${arr[x].productName}</td>
           <td>${arr[x].price}</td>
           <td>${arr[x].taxes}</td>
           <td>${arr[x].ads}</td>
           <td>${arr[x].discount}</td>
           <td>${arr[x].total}</td>
           <td>${arr[x].category}</td>
           <td><input type="button" value="Update" onclick="showInControls(${x})"  class="btnupdate" /> </td>
           <td><input type="button" value="Delete" class="btndelete" onclick="Delete(${x})"  /> </td>
       
       </tr>
           `
           tbody.innerHTML=table;
       }
       
    }else{
        arr=[];
        localStorage.setItem("allProduct",JSON.stringify(arr));
 
        tbody.innerHTML=table;
   
    }
    showHideDeleteAll();
   
  
   
  
}
function deleteAll(){
   
    arr.splice(0);
    arr=[];
    localStorage.clear();
   
    showData();
    

   
 
}

function Delete(e){

if(confirm("Are you sure you want to delete")){
    arr.splice(e,1);
    localStorage.setItem("allProduct",JSON.stringify(arr));
}
   
    showData();
    
}


function showInControls(e){
    productName.value=arr[e].productName;
    price.value=arr[e].price;
    taxes.value=arr[e].taxes;
    ads.value=arr[e].ads;
    discount.value=arr[e].discount;
    category.value=arr[e].category;
    total.style.background="green";
    total.innerHTML=arr[e].total;
    count.value=arr[e].count;
    id=e;
    btncreate.value="Updated";
    scroll({
        top: 0,
        behavior:"smooth"
    })
   
    
}
function ExcuteUpdate(){
   
        
        arr[id].productName=productName.value;
        arr[id].price=price.value;
        arr[id].taxes=taxes.value;
        arr[id].ads=ads.value;
        arr[id].discount=discount.value;
        arr[id].category=category.value;
        arr[id].total=total.innerHTML;
        arr[id].count=count.value;
    
        localStorage.setItem("allProduct",JSON.stringify(arr));
        total.style.background="red";
        btncreate.value="create";

        clearData();
        showData();
  
}
function clearData(){
    productName.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    category.value=''
    total.innerHTML='';
    count.value='';

}






function GetName(e){
 
    console.log("E IS"+e);



    //Default + Name

    if(txtsearch.value !=''){
        let table='';
        for(var x = 0; x < arr.length; x++) {
       
   
        if(e.id==btnsearchbyname.id ||e.id != btnsearchbycategory.id){
   console.log("btnsearchbyname"+e.value);
   
              
                    if (arr[x].productName.includes(txtsearch.value.toLowerCase())) {
                    table+=`
                    <tr>
                    <td>${x+1}</td>
                    <td>${arr[x].productName}</td>
                    <td>${arr[x].price}</td>
                    <td>${arr[x].taxes}</td>
                    <td>${arr[x].ads}</td>
                    <td>${arr[x].discount}</td>
                    <td>${arr[x].total}</td>
                    <td>${arr[x].category}</td>
                    <td><input type="button" value="Update" onclick="showInControls(${x})"  class="btnupdate" /> </td>
                    <td><input type="button" value="Delete" class="btndelete" onclick="Delete(${x})"  /> </td>
                
                </tr>
                    ` 
                      tbody.innerHTML=table;
                 
            }
          

        }
         if(e.id==btnsearchbycategory.id){
            
           
                if (arr[x].category.includes(txtsearch.value.toLowerCase())) {
                console.log("btnsearchbycategory"+e);
             
                table+=`
                <tr>
                <td>${x+1}</td>
                <td>${arr[x].productName}</td>
                <td>${arr[x].price}</td>
                <td>${arr[x].taxes}</td>
                <td>${arr[x].ads}</td>
                <td>${arr[x].discount}</td>
                <td>${arr[x].total}</td>
                <td>${arr[x].category}</td>
                <td><input type="button" value="Update" onclick="showInControls(${x})"  class="btnupdate" /> </td>
                <td><input type="button" value="Delete" class="btndelete" onclick="Delete(${x})"  /> </td>
            
            </tr>
                `
                tbody.innerHTML=table;
            
            }
        }

     

    }
   


            
       
            }else{
                showData();
            }
        }
  
  

