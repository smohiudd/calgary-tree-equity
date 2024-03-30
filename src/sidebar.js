import React from "react";
import "./sidebar.css";

export default function Sidebar(props) {

  let years = [2012,2013,2015,2017,2020,2022]

  const toggleCanopy =()=> props.setCanopyLayer(e => !e)
  const toggleCanopyDiff =()=> props.setCanopyDiffLayer(e => !e)
  const toggleCanopyPerc = () => props.setCoverPercLayer(e => !e)
  const toggleAerial = () => props.setAerialLayer(e => !e)
  const toggleCompare = () => props.setCompare(e => !e)
  const selectYear = (e) => props.setYear(e.target.value)
  const selectCompareYear = (e) => props.setCompareYear(e.target.value); 

  return (
    <div className="sidebar-container prose">
      
      <h2 className="color-green">Calgary Tree Equity</h2>
      <p>This tools uses various data sources to help users analyze the equity and 
        change in Calgary's tree cover over time. Data sources are retrieved 
        from Calgary Open Data and Census Canada and analysis 
        completed by Calgary Climate Hub volunteers.</p>

      <h4 className='txt-bold'>Select a Year</h4>
      <div className='grid grid--gut12 mb24'>
        <div className='col w-1/3 '>
            <div className='select-container'>
              <select
                  className="select select--stroke color-green txt-bold"
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
        </div>
        <div className='col w-2/3 shadow-darken25 py12 px12'>
          <label className='checkbox-container'>
            <input  type='checkbox' 
                    checked={props.canopyLayer}
                    onChange={toggleCanopy}
            />
            <div className='checkbox mr6'>
              <svg className='icon'><use xlinkHref='#icon-check' /></svg>
            </div>
            Tree Canopy Layer
          </label>

          <label className='checkbox-container mt6'>
            <input  type='checkbox' 
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

          <label className='checkbox-container mt6'>
            <input  type='checkbox' 
                    checked={props.aerialLayer}
                    onChange={toggleAerial}
            />
            <div className='checkbox mr6'>
              <svg className='icon'><use xlinkHref='#icon-check' /></svg>
            </div>
            Orthophoto Layer
          </label>
        </div>
      </div>
      

      
      <label className='checkbox-container'>
        <input  type='checkbox' 
                checked={props.compare}
                onChange={toggleCompare}
        />
        <div className='checkbox mr6'>
          <svg className='icon'><use xlinkHref='#icon-check' /></svg>
        </div>
        <span className="txt-bold">Compare to Year: </span>
      </label>

      <div className='select-container ml6'>
      <select
          className="select select--stroke color-green txt-bold"
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
      <br/>
      <div className='flex flex--end-main'>
        <img src={process.env.PUBLIC_URL + '/assets/Logo-Transparent-climate-hub.png'} alt="image" className="logo-style mt12" />
      </div>
      
    </div>
  );
}
