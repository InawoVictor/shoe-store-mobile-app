import { 
    StyleSheet, 
    View, 
    Image, 
    FlatList, 
    useWindowDimensions, 
    Text,
    ScrollView,
    Pressable
} from 'react-native'
import products from "../data/products"
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../store/cartSlice';

const ProductDetailsScreen = () => {
    const dispatch = useDispatch()
    const product = useSelector(state => state.products.selectedProduct);
    const {width} = useWindowDimensions()

    const addToCart = () => {
        dispatch(addCartItem({product}))
    }

    return (
        <View>
            <ScrollView>
                <FlatList
                    data={product.images}
                    renderItem={({item}) => (
                        <Image source={{uri: item}}
                            style={{width, aspectRatio: 1}}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                />
                <View style={{padding: 20}}>
                    {/* Title */}
                    <Text style={styles.title}>{product.name}</Text>
                    {/* Price */}
                    <Text style={styles.price}>${product.price}</Text>
                    {/* Description */}
                    <Text style={styles.desc}>{product.description}</Text>
                </View>
            </ScrollView>

            {/* Add to cart button */}
            <Pressable onPress={addToCart} style={styles.button}>
                <Text style={styles.buttonText}>Add to cart</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: '500',
        marginVertical: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 1.5,
        color: 'brown'
    },
    desc: {
        fontSize: 17,
        fontWeight: '300',
        marginVertical: 10,
        lineHeight: 25
    },
    button: {
        position: "absolute",
        backgroundColor: "black",
        bottom: 30,
        width: "90%",
        alignSelf: "center",
        padding: 20,
        borderRadius: 100,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: "500",
        fontSize: 16,
    },
})

export default ProductDetailsScreen