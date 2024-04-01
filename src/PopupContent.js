import { forwardRef } from 'react';

const PopupContent = forwardRef(function PopupContent(props, ref) {
  return (
    <div ref={ref} className="prose">
      <div className='txt-m txt-bold'>{props.content.name}</div>
      <div className='txt-h1 txt-bold color-green'>{props.content.frac}%</div>
      <div className='txt-s txt-bold color-green'>Canopy Cover in {props.content.year}</div>
    </div>
  );
});


const PopupContentDiff = forwardRef(function PopupContent(props, ref) {

  return (
    <div ref={ref} className="prose">
      {/* <h5>{props.content.name}</h5> */}
      <div className='txt-m txt-bold'>{props.content.name}</div>
      <div className='txt-h1 txt-bold' style={{color:props.content.diff <0 ? "red" : "green"}}>{props.content.diff}%</div>
      <div className='txt-s txt-bold' style={{color:props.content.diff < 0 ? "red" : "green"}}>Change between {props.content.current_year} and {props.content.next_year}</div>
    </div>
  );
});

export {PopupContent, PopupContentDiff};