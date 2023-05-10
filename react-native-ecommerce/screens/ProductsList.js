import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";

import { Product } from "../components/Product.js";
import { getProducts } from "../services/ProductsService.js";

export function ProductsList({ navigation }) {
	function renderProduct({ item: product }) {
		return (
			<TouchableOpacity>
				<Product
					{...product}
					onPress={() => {
						navigation.navigate("ProductDetails", {
							productId: product.id,
						});
					}}
				/>
			</TouchableOpacity>
		);
	}

	const [products, setProducts] = useState([]);
	useEffect(() => {
		setProducts(getProducts());
	});
	const TOTAL_LENGTH = `Total products (Length of FlatList) : ${products.length} `;

	return (
		<>
			<FlatList
				style={styles.productsList}
				contentContainerStyle={styles.productsListContainer}
				keyExtractor={(item) => item.id.toString()}
				data={products}
				renderItem={renderProduct}
			/>
			<Text style={{ textAlign: "center", fontStyle: "italic" }}>
				{TOTAL_LENGTH}
			</Text>
		</>
	);
}

const styles = StyleSheet.create({
	productsList: {
		backgroundColor: "#eeeeee",
	},
	productsListContainer: {
		backgroundColor: "#eeeeee",
		paddingVertical: 8,
		marginHorizontal: 8,
	},
});
