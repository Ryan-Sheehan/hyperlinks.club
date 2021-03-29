
export default function Layout(props) {

  return (

    <div className="container">

    {props.children}
    
    <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
          overflow:scroll;
          display: flex;
          justify-content:flex-start;
          align-items:center;
          flex-direction:column;
          border-radius: 10%;
          padding: 0 5rem;
          padding-bottom: 5rem;
        }
        `}</style>

    </div>
  );
}