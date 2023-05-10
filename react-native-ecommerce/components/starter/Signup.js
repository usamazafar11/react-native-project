import React from "react";
import {
	TextInput,
	Button,
	Alert,
	StyleSheet,
	SafeAreaView,
	Text,
	KeyboardAvoidingView,
	View,
} from "react-native";
import axios from "axios";

// fire base api key
const API_KEY = "AIzaSyCpcDXEA77zBt3Xj0fSPJDtsLnDBvc-Op4";
// firebase auth key
const BACKEND_URL =
	"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY;

// signup component function
function Signup({ navigation }) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordConfirm, setPasswordConfirm] = React.useState("");

	// handling new user
	async function signUpHandler() {
		if (
			password.length > 6 &&
			password === passwordConfirm &&
			email.includes("@")
		) {
			console.log(email, password);
			axios
				.post(BACKEND_URL, {
					email,
					password,
					passwordConfirm,
				})
				.then((res) => {
					console.log(res);
					setEmail("");
					setPassword("");
					setPasswordConfirm("");
					if (res) {
						return navigation.navigate("SignIn", { user: res.data });
					}
				})
				.catch((err) => {
					Alert.alert("Try Different email", "Might contain some errors");
					console.log(err);
				});
		} else {
			Alert.alert(
				"Something went wrong",
				"Please!! Check your email & password",
				[
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel",
					},
					{ text: "OK", onPress: () => console.log("OK Pressed") },
				]
			);
		}
	}
	const HAVE_ACCOUNT = "Already have an account?";
	// signup ui components
	return (
		<KeyboardAvoidingView>
			<SafeAreaView>
				<TextInput
					style={styles.input}
					onChangeText={setEmail}
					placeholder="email"
					value={email}
					placeholderTextColor="orange"
				/>
				<TextInput
					style={styles.input}
					onChangeText={setPassword}
					placeholder="Password"
					value={password}
					secureTextEntry={true}
					placeholderTextColor="orange"
				/>
				<TextInput
					style={styles.input}
					onChangeText={setPasswordConfirm}
					placeholder="Repeat Password"
					value={passwordConfirm}
					secureTextEntry={true}
					placeholderTextColor="orange"
				/>
				<View
					style={{
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						style={styles.button}
						onPress={signUpHandler}
						title="Signup"
						color="#ffa500"
						accessibilityLabel="Learn more about this purple button"
					/>
				</View>

				<Text style={{ textAlign: "center", padding: 10 }}>{HAVE_ACCOUNT}</Text>
				<View
					style={{
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						style={styles.button}
						onPress={() => {
							navigation.navigate("SignIn");
						}}
						title="Take me to Login"
						color="#ffa500"
						accessibilityLabel="Learn more about this purple button"
					/>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	button: {
		padding: 5,
		margin: 12,
	},
});

export default Signup;
