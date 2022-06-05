export function fields(subcat,queries){
    if(subcat=='spotlight'){ 
      /* let ff=[]
      for (let key in queries) {
        if (['slug','subslug','check'].includes(key)) continue
        else if(['brand','color','lampholder','material','ledbacklight','function','flaskshape'].includes(key)){
         if(typeof queries[key]=='string') ff.push(`{or:[{${key}:{contains:"${queries[key]}"}} ]}`)
         else{let str='{or:['
          queries[key].forEach(el => {str=str+'{'+key+':{contains:"'+el+'"}} '})
          str=str+']}'
          ff.push(str)
         }
        }
        else if(['mortisediam','price','rating'].includes(key)){
           ff.push(`{and:[{${key}:{gte:${queries[key][0]}}} {${key}:{lte:${queries[key][1]}}}]}`)
         }
      }    
      let filtr='{and:['
      if(ff.length>0)ff.forEach(el => {filtr=filtr+el});
      filtr=filtr+']}' */
      return ({fields:'createdAt height width mortisediam lampholder color brand material ledbacklight ipclass name price shortdesc longdesc listimage instock sold rating ratecount article EAN13 length countryorigin warranty flaskshape function',
             // filters:filtr
              })
    }
    else if(subcat=='terminalblock'){ 
  /*     let ff=[]
      for (let key in queries) {
        if (['slug','subslug','check'].includes(key)) continue
        else if(['conntype','material'].includes(key)){
         if(typeof queries[key]=='string') ff.push(`{or:[{${key}:{contains:"${queries[key]}"}} ]}`)
         else{let str='{or:['
          queries[key].forEach(el => {str=str+'{'+key+':{contains:"'+el+'"}} '})
          str=str+']}'
          ff.push(str)
         }
        }
        else if(['qtycontacts','price','rating','wirethickmin','wirethickmax','amperage'].includes(key)){
           ff.push(`{and:[{${key}:{gte:${queries[key][0]}}} {${key}:{lte:${queries[key][1]}}}]}`)
         }
      }    
      let filtr='{and:['
      if(ff.length>0)ff.forEach(el => {filtr=filtr+el});
      filtr=filtr+']}' */
      return ({fields:'createdAt height width length color brand material name price shortdesc longdesc listimage instock sold rating ratecount article EAN13 countryorigin qtycontacts conntype wirethickmin wirethickmax amperage',
           //   filters:filtr
              })
    }
    else if(subcat=='lamp'){ 
     /*  let ff=[]
      for (let key in queries) {
        if (['slug','subslug','check'].includes(key)) continue
        else if(['brand','color','lampholder','type','Voltage','function','flaskshape'].includes(key)){
         if(typeof queries[key]=='string') ff.push(`{or:[{${key}:{contains:"${queries[key]}"}} ]}`)
         else{let str='{or:['
          queries[key].forEach(el => {str=str+'{'+key+':{contains:"'+el+'"}} '})
          str=str+']}'
          ff.push(str)
         }
        }
        else if(['Lifetime','luminous','price','Wattage','rating'].includes(key)){
           ff.push(`{and:[{${key}:{gte:${queries[key][0]}}} {${key}:{lte:${queries[key][1]}}}]}`)
         }
      }    
      let filtr='{and:['
      if(ff.length>0)ff.forEach(el => {filtr=filtr+el});
      filtr=filtr+']}' */
      return ({fields:'createdAt lampholder color brand type Wattage Voltage Lifetime luminous name price shortdesc longdesc listimage instock  sold rating ratecount article EAN13 countryorigin warranty flaskshape function',
              //filters:filtr
              })
    }
  }