
/*
* @param
*
* */

const qu = ()=>{
    return false
}
const success = ()=>{
    console.log('success')
}

function sumOfMultiples() {
    let num = 0
    for(let a = 0;a<1000;a++){

        if((a%3 === 0)&&(a%5!==0)){
            num +=a
        }
        if(a%5 === 0){
            num +=a
        }

    }
    return num
    // Implement your solution here
}


// console.log(sumOfMultiples())
function omniPoller(queryStatus, successCallback) {
    // Implement your solution here
    'use strict'
    const fn = (i = 0)=>{
        console.log(i)
        setTimeout( ()=>{
            if(i){
                if( queryStatus()){
                    successCallback()
                }else{
                    i++
                    return  fn(i)
                }
            }else{
                i++
                return fn(i)
            }
        },Math.pow(1.5,i)*1000)
    }
    fn()
}
/*function omniPoller(queryStatus, successCallback) {
    // Implement your solution here
    let n = 0
    const fn = ()=>{
        (
            function(){
                setTimeout(()=>{
                    console.log(n)
                    if(n){
                        if(queryStatus()){
                            successCallback()
                        }else{
                            n++
                            fn()
                        }
                    }else{
                        n++
                        fn()
                    }
                },Math.pow(1500,n))
            }
          )()
    }
    fn()
}*/
/*let n = 0
function omniPoller(queryStatus, successCallback) {
    // Implement your solution here
    const fn = ()=>{
        /!*console.log('done')
        console.log(n)*!/
       /!* (
            function(){*!/
                console.log(n)
                setTimeout(()=>{
                    if(n){
                        if(queryStatus()){
                            successCallback()
                        }else{
                            n++
                            fn()
                        }
                    }else{
                        n++
                        fn()
                    }
                },Math.pow(1.5,n)*1000)
     /!*       }
        )()*!/
    }
    fn()
}*/
omniPoller(qu,success)
