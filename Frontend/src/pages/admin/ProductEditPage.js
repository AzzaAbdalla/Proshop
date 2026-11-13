import { useRef } from "react";
import {
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const isNew = productId === "new";

  const fileRef = useRef(null);
  const imageRef = useRef(null);

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId, { skip: isNew });

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const [uploadProductImage, { isLoading: isUploading }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const SubmiHandler = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const read = (key) =>
      String(form.querySelector(`[name="${key}"]`)?.value || "").trim();
    const nextName = read("name");
    const nextDescription = read("description");
    const nextBrand = read("brand");
    const nextCategory = read("category");
    let nextImage = read("image");
    const nextPrice = Number(read("price"));
    const nextCount = Number(read("countInStock"));

    if (!nextName || !nextDescription || !nextBrand || !nextCategory) {
      toast.error("Fill in the name, brand, category, and description.");
      return;
    }
    if (
      !Number.isFinite(nextPrice) ||
      nextPrice < 0 ||
      !Number.isFinite(nextCount) ||
      nextCount < 0 ||
      !Number.isInteger(nextCount)
    ) {
      toast.error("Price and stock must be zero or greater.");
      return;
    }

    const file = fileRef.current?.files?.[0];
    if (file && !nextImage && !/\.(jpe?g|png)$/i.test(file.name)) {
      toast.error("Please choose a JPG or PNG image. Videos cannot be the product photo.");
      return;
    }
    if (file && !nextImage) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const uploaded = await uploadProductImage(formData).unwrap();
        nextImage = uploaded.file;
        if (imageRef.current) imageRef.current.value = uploaded.file;
      } catch (err) {
        toast.error(err?.data?.message || "Image upload failed");
        return;
      }
    }

    if (!nextImage) {
      toast.error("Add an image before saving.");
      return;
    }

    const productData = {
      name: nextName,
      price: nextPrice,
      description: nextDescription,
      image: nextImage,
      brand: nextBrand,
      category: nextCategory,
      countInStock: nextCount,
    };

    try {
      if (isNew) {
        await createProduct(productData).unwrap();
      } else {
        await updateProduct({ productId, ...productData }).unwrap();
        refetch();
      }
      toast.success("Product saved");
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!/\.(jpe?g|png)$/i.test(file.name)) {
      toast.error("Please choose a JPG or PNG image. Videos cannot be the product photo.");
      e.target.value = "";
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadProductImage(formData).unwrap();
      if (res.error) {
        console.error(res.error);
      } else {
        toast.success("Image uploaded successfully");
        if (imageRef.current) imageRef.current.value = res.file;
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.data || "Image upload failed");
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="back-link">
        Back to products
      </Link>
      <FormContainer>
        <h1>{isNew ? "New product" : "Edit product"}</h1>
        {(isUpdating || isCreating || isUploading) && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={SubmiHandler} autoComplete="off" key={product?._id || "new"}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                autoComplete="off"
                defaultValue={product?.name || ""}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                min="0"
                step="0.01"
                autoComplete="off"
                placeholder="Enter product price"
                defaultValue={product?.price ?? ""}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                ref={imageRef}
                autoComplete="off"
                placeholder="Enter product image URL"
                defaultValue={product?.image || ""}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="productImageFile" className="mb-3">
              <Form.Label>Or upload an image</Form.Label>
              <Form.Control
                type="file"
                accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                ref={fileRef}
                label="Choose File"
                onChange={uploadFileHandler}
              />
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                autoComplete="off"
                placeholder="Enter product brand"
                defaultValue={product?.brand || ""}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                autoComplete="off"
                placeholder="Enter product category"
                defaultValue={product?.category || ""}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                name="countInStock"
                min="0"
                step="1"
                autoComplete="off"
                placeholder="Enter count in stock"
                defaultValue={product?.countInStock ?? ""}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                autoComplete="off"
                placeholder="Enter product description"
                defaultValue={product?.description || ""}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className="my-3"
              disabled={isUpdating || isCreating || isUploading}
            >
              {isNew ? "Save product" : "Save changes"}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
