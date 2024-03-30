export default function PopupContent({ id, frac }) {  
    return (
    <div className="popup">
        <p>Community: {id} </p>
        <p>Canopy Cover: {frac}%</p>
      </div>
    );
  }