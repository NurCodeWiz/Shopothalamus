

const NEW_PRODUCT_IMAGE = 'productsReducer/NEW_PRODUCT_IMAGE'

const newProductImage = (productId, image) => ({
    type: NEW_PRODUCT_IMAGE,
    productId,
    image
});




export const createImage = (post) => async (dispatch) => {
    const response = await fetch(`/images/new`, {
      method: "POST",
      body: post
    });

    if (response.ok) {
        const { resPost } = await response.json();
        dispatch(newProductImage(resPost));
    } else {
        console.log("There was an error making your post!")
    }
};
