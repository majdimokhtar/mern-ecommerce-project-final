import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"


// description fetch all products
// route get /api/products/
// access public route

const getProducts = asyncHandler (async (req,res)=>{
    const pageSize=8
    const page= Number(req.query.pageNumber) || 1



    const keyword=req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options:"i"
        }
    } : {}

    const count=await Product.countDocuments({...keyword})
    const products =await Product.find({...keyword}).limit(pageSize).skip
    (pageSize * (page-1))
    res.json({products,page,pages:Math.ceil(count/pageSize)})
})


// description fetch single product
// route get /api/products/:id
// access public route

const getProductById = asyncHandler (async (req,res)=>{
    const product =await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error ('Product not found')
    }
})



// description DELETE a product
// route DELETE /api/products/:id
// access admin/private route

const deleteProduct = asyncHandler (async (req,res)=>{
    const product =await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({message:"Product removed"})
    } else {
        res.status(404)
        throw new Error ('Product not found')
    }
})


// description create a product
// route POST /api/products
// access admin/private route

const createProduct = asyncHandler (async (req,res)=>{
    const product = new Product({
        name:"sample name",
        price:0,
        user:req.user._id,
        image: "/images/sample.jpg",
        brand:"sample brand",
        category:"sample category",
        countInStock:0,
        numReviews:0,
        description:"sample description",
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


// description update a product
// route PUT /api/products/:id
// access admin/private route

const updateProduct = asyncHandler (async (req,res)=>{
    const {name,price,description,image,brand,category,countInStock}=req.body
    const product = await Product.findById(req.params.id)
    if (product) {
    product.name=name
    product.price=price
    product.description=description
    product.image=image
    product.brand=brand
    product.category=category
    product.countInStock=countInStock
    

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error ("Product not found")
    }
})



// description create new review
// route PUT /api/products/:id/reviews
// access private route

const createProductReview = asyncHandler (async (req,res)=>{
    const {rating,comment}=req.body
    const product = await Product.findById(req.params.id)
    if (product) {
    const alreadyReviewed = product.reviews.find((r)=>r.user.toString()===req.user._id.toString())
    if (alreadyReviewed) {
        res.status(400)
        throw new Error("Product already reviewed")
    }
    const review= {
        name:req.user.name,
        rating:Number(rating),
        comment,
        user:req.user._id
    }
    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc,item)=>item.rating + acc, 0) / product.reviews.length

     await product.save()
     res.status(201).json({message:"Review added"})

    } else {
        res.status(404)
        throw new Error ("Product not found")
    }
})




// description GET top rated Product
// route PUT /api/products/top
// access public route

const getTopProducts = asyncHandler (async (req,res)=>{
    //sort it by rating -1
    const products = await Product.find({}).sort({rating:-1}).limit(3)

    res.json(products)
})








export {getProducts, 
        getProductById,
        deleteProduct,
        updateProduct,
        createProduct,
        createProductReview,getTopProducts}