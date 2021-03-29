const LoginButton = ({onClick}) => {
	return (
		<button 
		className="delete-button" 
		onClick={onClick}>
		Log In
		<style jsx>{`
			.delete-button {
				background-color: green;
				font-family:Arial;
			}
			`}</style>
		</button>
	)
}

export default LoginButton;