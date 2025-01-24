import React, { useEffect, useState } from "react"

type ProductType = {
    id: number,
    name: string,
    price: number,
    category: string,
    image: string
}

const ProductCard = () => {
    const [searchText, setSearchText] = useState('')
    const [productStored, setProductStored] = useState<ProductType | null>()
    const [queuedProducts, setQueuedProducts] = useState<ProductType[]>([])
    const [error, setError] = useState<boolean>()

    const getProducts = async() => {
        const response = await fetch("/products.json")
        const data = await response.json()
        setQueuedProducts(data.products)
    }
    const searchProduct = () => {
        const got = queuedProducts.find(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
        if (got) {
            setProductStored(got)
            setError(false)
        } else {
            setProductStored(null)
            setError(true)
        }
    }

    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {setSearchText(e.target.value)}

    useEffect(()=>{getProducts()}, [])

    return (
        <div className="product-card">
            <label>Enter product name:</label>
            <div className="search-section">
                <input type="text" value={searchText} onChange={handleSearchTextChange}/>
                <button onClick={searchProduct}>Search</button>
            </div>
            <div className="results-section">
                {error ? (
                    <p className="error">No product was found with the given name</p>
                ) : productStored != null ? (
                    <>
                        <img className="product-image" src={productStored?.image}/>
                        <div className="product-info">
                            <div className="product-details">
                                <p>ID: {productStored?.id}</p>
                                <p>Name: {productStored?.name}</p>
                                <p>Price: ${productStored?.price}</p>
                                <p>Category: {productStored?.category}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default ProductCard