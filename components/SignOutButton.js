const SignOutButton = ({onClick}) => {
	return (
		<button 
		className="delete-button" 
		onClick={onClick}>
		Sign Out
		<style jsx>{`
			.delete-button {
				background-color: red;
				font-family:Arial;
			}
			`}</style>
		</button>
	)
}

export default SignOutButton;