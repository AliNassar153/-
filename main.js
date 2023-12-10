let title =document.getElementById("title")
let price =document.getElementById("price")
let discount =document.getElementById("discount")
let total =document.getElementById("total")
let count =document.getElementById("count")
let submit  =document.getElementById("submit")
let j;
let mood= "create"
// get total
function getTotal(){
  if(price.value != ''){
    let result = (+price.value)- +discount.value;
    total.innerHTML=`  ${result} `;
    total.style.backgroundColor="#040"
  }else{
    total.innerHTML=""; 
    total.style.backgroundColor= "rgb(128, 0, 0)"
    total.style.width="100%"
  }
}

// creat product
let dataPro;
if(localStorage.product!=null){
  dataPro = JSON.parse(localStorage.product)
}else{
  dataPro =[];
}
submit.onclick= function(){
  let newPro ={
    title:title.value.toLowerCase(),
    price:price.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
  }
  if(title.value!=""&&price.value!=""&&newPro.count<1000){
    if(mood === "create"){
    if(newPro.count>1){
      for(let i =0 ; i<newPro.count ; i++){
        dataPro.push(newPro)
      }
    }else{
      dataPro.push(newPro)
    }
  }else{
    dataPro[j]=newPro;
    mood="create"
    submit.innerHTML="انشاء"
    count.style.display="block"
  }
  clearData()
  }
  // save in local storge
  localStorage.setItem('product',JSON.stringify(dataPro))
  showData()
}

// clear inputs
function clearData(){
  title.value="",
  price.value="",
  discount.value="",
  total.innerHTML="",
  count.value=""
}
// read 
  function showData(){
    getTotal()
    let table='';
    for(i = 0 ; i < dataPro.length ; i++){
      table +=`
          <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <th><button onclick="updateData(${i})" id="updte">تعديل</button></th>
            <th><button onclick="deleteData(${i})" id="delete">حذف</button></th>
          </tr> 
      `;
    }

    tbody= document.getElementById('tbody').innerHTML =table;
    let btnDelete =document.getElementById("deleteAll");
    if(dataPro.length > 0){
      btnDelete.innerHTML =`
      <button onclick="deletAll()">(${dataPro.length})  حذف الكل</button>
      `
    }else{
      btnDelete.innerHTML =''
    }
  }
  showData()
  // delete
function deleteData(o){
  dataPro.splice(o,1);
  localStorage.product=JSON.stringify(dataPro)
  showData()
}
function deletAll(){
  localStorage.clear()
  dataPro.splice(0)
  showData()
}
// count

// update
function updateData(i){
  j=i;
  title.value=dataPro[i].title
  price.value=dataPro[i].price
  discount.value=dataPro[i].discount
  total.value=dataPro[i].total
  getTotal()
  count.style="display:none;"
  submit.innerHTML="تعديل"
  mood="update"
  scrollTo({ top: 0, behavior: 'smooth' });
}
// search
let search=document.getElementById("search")
let searchMood= 'title';
function getSearchMood(id){
  if(id=="searchTitle"){
    searchMood= 'title';
    search.placeholder ="البحث بالعنوان"
  }
  search.focus()
  search.value=""
  showData()
}
function searchDAta(value){
  let table='';
  for(let i=0 ; i<dataPro.length ; i++){
  if (searchMood=="title"){
      if(dataPro[i].title.includes(value.toLowerCase())){
        table +=`
        <tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].total}</td>
          <th><button onclick="updateData(${i})" id="updte">تعديل</button></th>
          <th><button onclick="deleteData(${i})" id="delete">حذف</button></th>
        </tr> 
    `;
      }
  }
  }
  document.getElementById('tbody').innerHTML =table;

}
// clean data
