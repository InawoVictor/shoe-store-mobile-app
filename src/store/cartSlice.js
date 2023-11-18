import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    deliveryFee: 15,
    freeDeliveryFrom: 200
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, {payload}) => {
            const newProduct = payload.product;
            const cartItem = state.items.find(
                item => item.product.id === newProduct.id
            )

            if(cartItem){
                cartItem.quantity += 1;
            } else {
                state.items.push({product: newProduct, quantity: 1})
            }
        },
        changeQuantity: (state, {payload}) => {
            const {productId, amount}  = payload
            const cartItem = state.items.find(item => item.product.id === productId);
            if(cartItem){
                cartItem.quantity += amount;
            }
            if(cartItem.quantity <= 0){
                state.items = state.items.filter(item => item !== cartItem)
            }
        }
    }
})

export const selectNumberOfItems = state => state.cart.items.length;
export const selectSubtotal = state => state.cart.items.reduce((sum, cartItem) => {
    return sum + cartItem.product.price * cartItem.quantity
}, 0)
export const {addCartItem, changeQuantity} = cartSlice.actions;
const cartSelector = (state) => state.cart
export const selectDeliveryPrice = createSelector(
    cartSelector,
    selectSubtotal,
    (cart, subtotal) => (subtotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFee)
)
export const selectTotal = createSelector(
    selectSubtotal,
    selectDeliveryPrice,
    (delivery, subtotal) => subtotal + delivery
)
export default cartSlice.reducer;