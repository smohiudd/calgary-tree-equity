import React from "react";
import "./sidebar.css";

export default function Sidebar(props) {

  let years = [2012,2013,2015,2017,2020,2022]

  const toggleLayer =(e)=> props.setLayer(e.target.value)
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
      
      <span className="color-green-deep txt-h1 txt-bold">Calgary Tree Equity</span>
      <p className="mt12 mb24">This tools uses various data sources to help users analyze the equity and 
        change in Calgary's tree cover over time.</p>


        <span className="txt-h3 txt-bold color-yellow-deep">See how Calgary's Tree <br/>Canopy in </span>
  
        <div className='select-container mr6'>
              <select
                  className="select color-green txt-bold txt-h3"
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
        <br/>
        <span className="txt-h3 txt-bold color-yellow-deep">...compares to </span>

        <div className='select-container'>
          <select
              className="select color-green txt-bold txt-h3"
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


      
      <div className="mt24">
      <label className='radio-container'>
        <input 
          disabled = {props.compare || props.canopyLayer || props.aerialLayer? "disabled" : ""}
          name='radio-basic' 
          type='radio'
          onChange={toggleLayer}
          value="index"
          checked={props.layer === "index"}
        />
        <div className='radio mr6'></div>
        Tree Equity Index (2020 only)
      </label>
      <label className='radio-container mt6'>
        <input 
            disabled = {props.compare || props.canopyLayer || props.aerialLayer? "disabled" : ""}
            name='radio-basic' 
            type='radio'
            onChange={toggleLayer}
            value="cover"
            checked={props.layer === "cover"}
        />
        <div className='radio mr6'></div>
        Canopy Cover by Community (%)
      </label>
      <label className='radio-container mt6 mb12'>
        <input
            disabled = {props.compare || props.canopyLayer || props.aerialLayer? "disabled" : ""}
            name='radio-basic' 
            type='radio'
            onChange={toggleLayer}
            value="diff"
            checked={props.layer === "diff"}
        />
        <div className='radio mr6'></div>
        Canopy Cover Change (%)
      </label>

      </div>

        {/* <div>
          <label className='checkbox-container mt6'>
            <input checked disabled  type='checkbox' 
                    checked=""
                    onChange=""
            />
            <div className='checkbox mr6'>
              <svg className='icon'><use xlinkHref='#icon-check' /></svg>
            </div>
            Tree Equity
          </label>
          <label className='checkbox-container mt6'>
            <input   type='checkbox' 
                    checked={props.coverPercLayer}
                    onChange={toggleCanopyPerc}
            />
            <div className='checkbox mr6'>
              <svg className='icon'><use xlinkHref='#icon-check' /></svg>
            </div>
            Canopy Coverage by Census Tract (%)
          </label>

          <label className='checkbox-container mt6'>
            <input  type='checkbox' 
                    checked={props.canopyDiffLayer}
                    onChange={toggleCanopyDiff}
            />
            <div className='checkbox mr6'>
              <svg className='icon'><use xlinkHref='#icon-check' /></svg>
            </div>
            Canopy Change Between Compare Year (%)
          </label>


      </div> */}
      
      
          <div className="block mt12">
            <label className='checkbox-container'>
              <input  type='checkbox' 
                      checked={props.canopyLayer}
                      onChange={toggleCanopy}
              />
              <div className='checkbox mr6'>
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
            <div className='checkbox mr6'>
              <svg className='icon'><use xlinkHref='#icon-check' /></svg>
            </div>
            Orthophoto (Aerial View)
          </label>
          </div>



        <label class='switch-container'>
          <input

            type='checkbox' 
            checked={props.compare}
            onChange={toggleCompare}
          />
          <div class='switch mr6'></div>
          Compare Years
        </label>

        {/* <label className='checkbox-container'>
          <input  type='checkbox' 
                  checked={props.compare}
                  onChange={toggleCompare}
          />
          <div className='checkbox mr6'>
            <svg className='icon'><use xlinkHref='#icon-check' /></svg>
          </div>
          <span className="txt-bold">Compare years </span>
        </label> */}
            
  


    



      <br/>
      <div className='flex flex--end-main'>
        <img src={process.env.PUBLIC_URL + '/assets/Logo-Transparent-climate-hub.png'} alt="image" className="logo-style mt12" />
      </div>
      
    </div>
  );
}
