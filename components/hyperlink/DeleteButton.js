const RedButton = (props) => {
	return (
		<button 
		className="red-button" 
		onClick={props.onClick}>
		{props.children}
		<style jsx>{`
			.red-button {
				background-color: red;
			}
			`}</style>
		</button>
	)
}

export default RedButton;