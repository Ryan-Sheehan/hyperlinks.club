

export default function FormLayout(props) {

  return (

    <div className="form-container">
    <div className="form-container-inner">
    {props.children}
    <style jsx global>{`
      body {
        
        width: 100vw;
         height: 100vh;
      }
      `}
    </style>
    <style jsx>{`
        .form-container-inner {
          background-color: #0000ff;
          width: 100vw;
          height: 100vh;
          overflow:scroll;
          display: flex;
          justify-content:center; 
          align-items:center;
          border-radius: 10%;
        }
        `}</style>
    </div>
    </div>
  );
}