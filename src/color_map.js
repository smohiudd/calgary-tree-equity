import * as d3 from "d3";


const getColorMap = async (url,year) => {
  return new Promise((resolve)=>{
    d3.json(url).then(data => {
      let minmax = d3.extent(data.features.map(e=>e.properties[year]))
      let scale = d3.scaleQuantile(data.features.map(e=>e.properties[year]),d3.schemeGreens[5])
      resolve(d3.range(minmax[0],minmax[1]).map(x=>[x, scale(x)]))
    })
  })
}

// const getColorMapDiff = async (url,year,compareyear) => {
//   return new Promise((resolve)=>{
//     d3.json(url).then(data => {
//       let diffs = data.features.map((e)=>{
//         let curr_year = e.properties[String(year)]
//         let next_year = e.properties[String(compareyear)]
//         return ((curr_year-next_year)/curr_year)*100
//       })
//       console.log("color up updated")
//       let extents = d3.extent(diffs)
//       let linear = d3.scaleLinear()
//         .domain(extents)
//         .range(["red","green"])

//       resolve(d3.range(extents[0],extents[1]).map((x)=>[x,linear(x)]).flat())
//     })
//   })
// }

const colorMapDiff=()=>{
  return d3.scaleDiverging()
  .domain([-150, 0, 70])
  .interpolator(d3.interpolateRdYlGn)
}

const colorMapDiffFlat=()=>{
  let scale = d3.scaleDiverging()
  .domain([-150, 0, 70])
  .interpolator(d3.interpolateRdYlGn)
  return d3.range(-150,70).map((x)=>[x,scale(x)]).flat().slice(1)
}



export {getColorMap, colorMapDiff, colorMapDiffFlat}

// const getColorMap = async (url,year) => {
//     d3.json(url).then(data => {
//       let minmax = d3.extent(data.features.map(e=>e.properties[year]))
//       let scale = d3.scaleQuantile(data.features.map(e=>e.properties[year]),d3.schemeGreens[5])
//       return d3.range(minmax[0],minmax[1], 0.1).map(x=>[x, scale(x)])
//     })
// }

