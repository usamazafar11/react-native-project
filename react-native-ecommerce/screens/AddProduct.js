import React, { useState } from "react";
import {
	TextInput,
	Button,
	StyleSheet,
	SafeAreaView,
	KeyboardAvoidingView,
	View,
} from "react-native";
import { addProduct } from "../services/ProductsService.js";
import { launchCameraAsync } from "expo-image-picker";

function AddProduct({ navigation }) {
	const [name, setName] = React.useState("");
	const [price, setPrice] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [selectedImage, setSelectedImage] = useState("");
	const options = {
		allowsEditing: true,
		quality: 0.5,
	};
	const pickImageAsync = async () => {
		let result = await launchCameraAsync(options);

		if (!result.canceled) {
			return setSelectedImage(result.assets[0].uri);
		} else {
			alert("You did not select any image.");
		}
	};
	const addProductHandler = () => {
		addProduct(name, Number(price), selectedImage, description);
		return navigation.navigate("Products");
	};

	return (
		<KeyboardAvoidingView>
			<SafeAreaView>
				<TextInput
					style={styles.input}
					onChangeText={setName}
					placeholder="Enter name of product"
					value={name}
				/>
				<TextInput
					style={styles.input}
					onChangeText={setPrice}
					placeholder="Enter price of product"
					value={price}
				/>
				<Button
					style={styles.button}
					title="Pick image"
					onPress={pickImageAsync}
				/>
				<TextInput
					style={styles.input}
					onChangeText={setDescription}
					placeholder="Enter description"
					value={description}
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
						onPress={addProductHandler}
						title="ADD PRODUCT"
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

export default AddProduct;
