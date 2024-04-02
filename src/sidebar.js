import React from "react";
import "./sidebar.css";

export default function Sidebar(props) {

  let years = [2012,2013,2015,2017,2020,2022]

  const toggleLayer =(e)=> {
    props.setLayer(e.target.value)
    props.setCanopyLayer(false)
    props.setAerialLayer(false)
    props.setCompare(false)
  }
  const toggleCanopy =()=> {
    props.setLayer("")
    props.setCanopyLayer(e => !e)
  }
  const toggleAerial = () => {
    props.setLayer(false)
    props.setAerialLayer(e => !e)
  }
  const toggleCompare = () =>{
    props.setLayer(false)
    props.setCompare(e => !e)
  }
  const selectYear = (e) => props.setYear(e.target.value)
  const selectCompareYear = (e) => props.setCompareYear(e.target.value); 

  return (
    <div className="sidebar-container prose">

    <div className='grid'>
      <div className='col w-1/2'>
        <span className="color-green-deep txt-h2 txt-bold">Calgary Tree Equity</span>
      </div>
      <div className='col w-1/2'>
        <a href="https://www.calgaryclimatehub.ca/" target="_blank"><img src={process.env.PUBLIC_URL + '/assets/Logo-Transparent-climate-hub.png'} alt="image" className="logo-style mt6" /></a>
      </div>
    </div>
      
      
      <p className="mt12 mb24 txt-ms ">This tools uses various data sources to help users analyze <a href="https://www.calgaryclimatehub.ca/calgary_tree_equity">tree equity</a> and 
        change in Calgary's tree cover over time.</p>

        <hr class='txt-hr'/>
        
        
        <span className="txt-h5 txt-bold block">Select a Year </span>
  
        <div className='select-container block mt12'>
              <select
                  className="select select--stroke color-green txt-bold txt-h4"
                  value={props.year}
                  onChange={selectYear}
                >
                  {years.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              <div className='select-arrow'></div>
        </div>  
  

      <div className="mt12 mb12">
      <label className='radio-container'>
        <input 
          // disabled = {props.compare || props.canopyLayer || props.aerialLayer? "disabled" : ""}
          name='radio-basic' 
          type='radio'
          onChange={toggleLayer}
          value="index"
          checked={props.layer === "index"}
        />
        <div className='radio mr6 radio--green'></div>
        Tree Equity Index (2020 only)
      </label>
      <label className='radio-container mt6 mb6'>
        <input 
            // disabled = {props.compare || props.canopyLayer || props.aerialLayer? "disabled" : ""}
            name='radio-basic' 
            type='radio'
            onChange={toggleLayer}
            value="cover"
            checked={props.layer === "cover"}
        />
        <div className='radio mr6 radio--green'></div>
        Canopy Cover by Community (%)
      </label>

      </div>

      <span className="txt-h5 txt-bold">Compare to </span>

      <div className='select-container block mt12'>
          <select
              className="select select--stroke color-green txt-bold txt-h4"
              value={props.compareyear}
              onChange={selectCompareYear}
            >
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>
          <div className='select-arrow'></div>
      </div> 

      
          <div className="block mt12">

          <label className='radio-container mt6 mb6'>
            <input
                // disabled = {props.compare || props.canopyLayer || props.aerialLayer? "disabled" : ""}
                name='radio-basic' 
                type='radio'
                onChange={toggleLayer}
                value="diff"
                checked={props.layer === "diff"}
            />
            <div className='radio mr6 radio--green'></div>
            Canopy Cover Change (%)
          </label>
            <label className='checkbox-container'>
              <input  type='checkbox' 
                      checked={props.canopyLayer}
                      onChange={toggleCanopy}
              />
              <div className='checkbox mr6 checkbox--green'>
                <svg className='icon'><use xlinkHref='#icon-check' /></svg>
            </div>
              Tree Canopy
            </label>
            </div>

            <div className="block">
          <label className='checkbox-container mt6 mb6'>
            <input  type='checkbox' 
                    checked={props.aerialLayer}
                    onChange={toggleAerial}
            />
            <div className='checkbox mr6 checkbox--green'>
              <svg className='icon'><use xlinkHref='#icon-check' /></svg>
            </div>
            Orthophoto (Aerial View)
          </label>
          </div>



        <label class='switch-container mb12'>
          <input
            disabled = {props.layer || (!props.aerialLayer && !props.canopyLayer) ? "disabled" : ""}
            type='checkbox' 
            checked={props.compare}
            onChange={toggleCompare}
          />
          <div class='switch switch--green mr6'></div>
          <span className="txt-s mt3">Compare Years</span>
        </label>

      
      <br/>

      <hr class='txt-hr'/>

      <p className="txt-s">This tool was made by volunteers at the <a target="_blank" href="https://www.calgaryclimatehub.ca">Calgary Climate Hub</a> using <a target="_blank" href="https://data.calgary.ca/">open data</a> and open-source tools. See the <a target="_blank" href="https://github.com/smohiudd/calgary-tree-equity">github page</a> for more info about how the data was processed.</p>
      

    </div>
  );
}
