import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#8257E5',
		flex: 1,
		justifyContent: 'center',
		padding: 40,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontFamily: 'Archivo_700Bold',
		fontSize: 32,
		lineHeight: 37,
		color: '#fff',
		maxWidth: 180,
	},
	description: {
		marginTop: 24,
		color: '#d4c2ff',
		fontSize: 16,
		lineHeight: 26,
		fontFamily: 'Poppins_400Regular',
		maxWidth: 240,
	},
	okButton: {
		marginVertical: 40,
		backgroundColor: '#06d361',
		height: 58,
		alignItems: 'center',
		justifyContent: 'center',
	},
	okButtonText: {
		color: '#fff',
		fontSize: 16,
		fontFamily: 'Archivo_700Bold',
	},
});

export default styles;