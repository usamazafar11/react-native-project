import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";

import { CartContext } from "../CartContext";

export function Cart({ navigation }) {
	const { items, getTotalPrice, deleteFromCart } = useContext(CartContext);

	function Totals() {
		let [total, setTotal] = useState(0);
		useEffect(() => {
			setTotal(getTotalPrice());
		});

		return (
			<>
				<View style={styles.cartLineTotal}>
					<Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
					<Text style={styles.lineRight}>$ {total}</Text>
					<Text style={styles.lineRight}>
						<Button
							title="Check Out"
							color="#841584"
							accessibilityLabel="Learn more about this purple button"
							onPress={() => {
								return navigation.navigate("Checkout", { totalPrice: total });
							}}
						/>
					</Text>
				</View>
			</>
		);
	}

	function renderItem({ item }) {
		const pId = item.product.id;
		return (
			<View style={styles.cartLine}>
				<Text style={styles.lineLeft}>{item.product.name}</Text>
				<View>
					<Text style={styles.lineRight}>$ {item.totalPrice}</Text>
				</View>
				<View>
					<Button
						onPress={() => {
							deleteFromCart(pId);
							return navigation.navigate("Products");
						}}
						style={styles.delButton}
						title="Remove"
						color="red"
						accessibilityLabel="Learn"
					/>
				</View>
			</View>
		);
	}

	return (
		<FlatList
			style={styles.itemsList}
			contentContainerStyle={styles.itemsListContainer}
			data={items}
			renderItem={renderItem}
			keyExtractor={(item) => item.product.id.toString()}
			ListFooterComponent={Totals}
		/>
	);
}

const styles = StyleSheet.create({
	cartLine: {
		flexDirection: "row",
	},
	cartLineTotal: {
		flexDirection: "row",
		borderTopColor: "#dddddd",
		borderTopWidth: 1,
		padding: 10,
	},
	lineTotal: {
		fontWeight: "bold",
	},
	lineLeft: {
		fontSize: 20,
		lineHeight: 40,
		color: "#333333",
	},
	lineRight: {
		flex: 1,
		fontSize: 20,
		fontWeight: "bold",
		lineHeight: 40,
		color: "#333333",
		textAlign: "right",
	},
	itemsList: {
		backgroundColor: "#eeeeee",
	},
	itemsListContainer: {
		backgroundColor: "#eeeeee",
		paddingVertical: 8,
		marginHorizontal: 8,
	},
	checkout: {
		display: "block",
		backgroundColor: "#eeeeee",
		paddingVertical: 8,
		marginHorizontal: 8,
	},
	delButton: {
		height: 20,
	},
});
