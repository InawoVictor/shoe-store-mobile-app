import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
// import cart from "../data/cart"
import CartListItem from "../components/CartListItem"

import { useSelector } from "react-redux"
import { selectDeliveryPrice, selectSubtotal, selectTotal } from "../store/cartSlice"

const ShoppingCartTotals = () => {
    const subtotal = useSelector(selectSubtotal) 
    const deliveryFee = useSelector(selectDeliveryPrice) 
    const total = useSelector(selectTotal) 
    return (
        <>
            <View style={styles.row}>
                <Text style={styles.text}>Subtotal:</Text>
                <Text style={styles.text}>{subtotal}US$</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Delivery:</Text>
                <Text style={styles.text}>{deliveryFee} US$</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textBold}>Total:</Text>
                <Text style={styles.textBold}>{total}US$</Text>
            </View>
        </>
    )
}

const ShoppingCartScreen = () => {
    const cartItems = useSelector(state => state.cart.items)

    return (
        <>            
            <FlatList
                data={cartItems}
                renderItem={({item}) => (
                    <CartListItem cartItem={item} />
                )}
                ListFooterComponent={() => (
                    <View style={styles.totalsContainer}>
                        <ShoppingCartTotals />
                    </View>
                )}
            />

            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Checkout</Text>
            </Pressable>

        </>
    )
}

const styles = StyleSheet.create({
    totalsContainer: {
        margin: 20,
        paddingTop: 10,
        borderColor: 'gainsboro',
        borderTopWidth: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },
    text: {
        fontSize: 16,
        color: 'gray,'
    },
    textBold: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        position: "absolute",
        backgroundColor: "black",
        bottom: 30,
        width: '90%',
        padding: 20,
        borderRadius: 100,
        alignSelf: "center",
        alignItems: "center",
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        letterSpacing: .5,
    },  
})

export default ShoppingCartScreen