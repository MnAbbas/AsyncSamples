
const waitFor = (ms) => new Promise(r => setTimeout(r, ms))

const asyncLoop = async (array, callback) => {
    for (const item of array){
        await callback(item)
    }
}


const doIt = async () => {
        await asyncLoop([1, 2, 3 ,4 , 5], async (num) => {
        console.log(num)
        await waitFor(500)
    })
    console.log('Done')
}

doIt()