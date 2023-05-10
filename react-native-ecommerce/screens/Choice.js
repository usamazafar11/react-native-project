import React, { useState, useEffect } from "react";
import { Button, StyleSheet, SafeAreaView, Text, View } from "react-native";

function Choice({ route, navigation }) {
	const [tester, setTester] = useState(false);
	const [testerTwo, setTesterTwo] = useState(false);
	const [admin, setAdmin] = useState(false);
	const TEXT = "OR";
	const user = route.params;
	console.log(user);
	useEffect(() => {
		if (
			user.user_data.email === "tester_1@gmail.com" ||
			user.user_data.email === "ranausamazafar@gmail.com"
		) {
			setAdmin(true);
		}
	}, []);

	return (
		<SafeAreaView>
			{admin ? (
				<View
					style={{
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Button
						style={styles.button}
						title="ADD PRODUCT"
						color="#ffa500"
						onPress={() => {
							navigation.navigate("AddProduct");
						}}
						accessibilityLabel="Learn more about this purple button"
					/>
				</View>
			) : (
				<Text style={{ textAlign: "center", color: "orange" }}>WELLCOME</Text>
			)}

			{admin && (
				<Text style={{ textAlign: "center", padding: 10 }}>{TEXT}</Text>
			)}
			<View
				style={{
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
					padding: 20,
				}}
			>
				<Button
					style={styles.button}
					onPress={() => {
						navigation.navigate("Products");
					}}
					title="SEE PRODUCTS"
					color="#ffa500"
					accessibilityLabel="Learn more about this purple button"
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 5,
		margin: 12,
	},
});

export default Choice;
