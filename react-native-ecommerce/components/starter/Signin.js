import React, { useState, useEffect } from "react";
import {
	TextInput,
	Button,
	Alert,
	StyleSheet,
	SafeAreaView,
	Text,
	Keyboard,
	View,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "AIzaSyCpcDXEA77zBt3Xj0fSPJDtsLnDBvc-Op4";
const BACKEND_URL =
	"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
	API_KEY;
function Signin({ navigation }) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [keyboardStatus, setKeyboardStatus] = useState("");
	// firing keyboard events

	useEffect(() => {
		const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardStatus("Keyboard Shown");
		});
		const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardStatus("Keyboard Hidden");
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	async function signInHandler() {
		if (password.length > 6 && email.includes("@")) {
			axios
				.post(BACKEND_URL, {
					email,
					password,
					returnSecureToken: true,
				})
				.then((res) => {
					console.log(res.data);
					AsyncStorage.setItem("isLoggedIn", "true");
					setEmail("");
					setPassword("");
					return navigation.navigate("Choice", { user_data: res.data });
				})
				.catch((err) => {
					console.log(err);
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
	const DONT_HAVE_ACCOUNT_TEXT = "Dont have account? Create One";

	return (
		<SafeAreaView>
			<TextInput
				style={styles.input}
				onChangeText={setEmail}
				placeholder="email"
				value={email}
				onSubmitEditing={Keyboard.dismiss}
				selectTextOnFocus
				placeholderTextColor="orange"
			/>
			<TextInput
				style={styles.input}
				onChangeText={setPassword}
				placeholder="Password"
				value={password}
				onSubmitEditing={Keyboard.dismiss}
				selectTextOnFocus
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
					onPress={signInHandler}
					title="Sign In"
					color="#ffa500"
					accessibilityLabel="Learn more about this purple button"
				/>
			</View>

			<Text style={{ textAlign: "center", padding: 10 }}>
				{DONT_HAVE_ACCOUNT_TEXT}
			</Text>
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
						navigation.navigate("SignUp");
					}}
					title="Create an Account"
					color="#ffa500"
					accessibilityLabel="Learn more about this purple button"
				/>
			</View>

			<Text style={{ textAlign: "center", padding: 10 }}>{keyboardStatus}</Text>
		</SafeAreaView>
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

export default Signin;
