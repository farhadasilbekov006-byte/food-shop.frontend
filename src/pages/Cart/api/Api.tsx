type SelectedSize = {
    name: string
    price: number
}

export async function addToCart(productId: string, qty: number, selectedSize: SelectedSize) {
    const token = localStorage.getItem('token')

        console.log('DEBUG selectedSize:', selectedSize)
    console.log('DEBUG typeof price:', typeof selectedSize.price)
    console.log('DEBUG body string:', JSON.stringify({ productId, qty, selectedSize }))

    const res = await fetch('/api/cart/add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, qty , selectedSize})
    })
    if (!res.ok) {
        throw new Error(`Add to cart failed: ${res.status}`)
    }
    return res.json()
}