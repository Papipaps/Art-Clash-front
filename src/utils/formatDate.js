
export function dateUtils(d){
   const formattedDate =  d.getFullYear().toString()
            +"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"
            +(d.getMonth()+1).toString())
            +"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())
            +" "+(d.getHours().toString().length==2?d.getHours().toString():"0"
            +d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";

return formattedDate ;
}

export function paginate(array, page_size, page_number) { 
   return array.slice((page_number - 1) * page_size, page_number * page_size);
 }