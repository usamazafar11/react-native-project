import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProductsList } from "./screens/ProductsList.js";
import { ProductDetails } from "./screens/ProductDetails.js";
import { Cart } from "./screens/Cart.js";
import { CartIcon } from "./components/CartIcon.js";
import { CartProvider } from "./CartContext.js";
import Signup from "./components/starter/Signup.js";
import Signin from "./components/starter/Signin.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StripeGateway from "./components/checkout/checkout.js";
import Choice from "./screens/Choice.js";
import AddProduct from "./screens/AddProduct.js";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
	"exported from 'deprecated-react-native-prop-types'.",
	"ViewPropTypes will be removed",
	"ColorPropType will be removed",
]);

const Stack = createNativeStackNavigator();

function App() {
	useEffect(() => {
		AsyncStorage.setItem("isLoggedIn", "false");
	}, []);
	const isLoggedIn = AsyncStorage.getItem("isLoggedIn");

	return (
		<>
			<CartProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="SignUp"
							component={Signup}
							options={() => ({
								title: "SHOP - Sign up here...",
							})}
						/>

						<Stack.Screen
							name="SignIn"
							component={Signin}
							options={() => ({
								title: "SHOP - Sign in here...",
							})}
						/>
						<Stack.Screen
							name="Choice"
							component={Choice}
							options={() => ({
								title: "Make choice here...",
							})}
						/>
						<Stack.Screen
							name="AddProduct"
							component={AddProduct}
							options={() => ({
								title: "Add Product here...",
							})}
						/>

						<Stack.Screen
							name="Products"
							component={ProductsList}
							options={({ navigation }) => ({
								title: "Products",
								headerTitleStyle: styles.headerTitle,
								headerRight: () => <CartIcon navigation={navigation} />,
							})}
						/>

						<Stack.Screen
							name="ProductDetails"
							component={ProductDetails}
							options={({ navigation }) => ({
								title: "Product details",
								headerTitleStyle: styles.headerTitle,
								headerRight: () => <CartIcon navigation={navigation} />,
							})}
						/>

						<Stack.Screen
							name="Cart"
							component={Cart}
							options={({ navigation }) => ({
								title: "My cart",
								headerTitleStyle: styles.headerTitle,
								headerRight: () => <CartIcon navigation={navigation} />,
							})}
						/>
						<Stack.Screen name="Checkout" component={StripeGateway} />
					</Stack.Navigator>
				</NavigationContainer>
			</CartProvider>
		</>
	);
}

const styles = StyleSheet.create({
	headerTitle: {
		fontSize: 20,
	},
});

export default App;
