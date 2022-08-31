import React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
  startAfter,
  endBefore,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "./../../firebase/config";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Electronics.css";

const Mobiles = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  let lang = useSelector((state) => state.lang.lang);
  useEffect(() => {
    let q2 = query(
      collection(db, "products"),
      where("ar.category", "==", "electronics")
    );
    getDocs(q2).then((data) => {
      data.docs.forEach((d) => {
        setProducts((prevState) => {
          return [
            ...prevState,
            {
              id: d.id,
              data: d.data(),
            },
          ];
        });
      });
    });
  }, []);
  function previousPage({ item }) {
    const fetchPreviousData = async () => {
      console.log(item);
      const q = await query(
        collection(db, "products"),
        orderBy("id", "desc"),
        endBefore(item.data.id),
        limit(12)
      );

      onSnapshot(q, (querySnapshot) => {
        setProducts(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        setPage(page - 1);
      });
    };
    fetchPreviousData();
  }

  function nextPage({ item }) {
    if (products.length === 0) {
      alert("Thats all we have for now !");
    } else {
      const fetchNextData = async () => {
        console.log(item);
        const q = await query(
          collection(db, "products"),
          orderBy("id", "desc"),
          startAfter(item.data.id),
          limit(12)
        );

        onSnapshot(q, (querySnapshot) => {
          setProducts(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setPage(page + 1);
        });
      };
      fetchNextData();
    }
  }
  // setLanguage(lang)
  console.log(products);
  return (
    <>
      <div className="row justify-content-around my-5">
        <div className="col-2"></div>
        <div className="col-10">
          <h2
            style={{
              fontWeight: "bold",
              padding: "15px",
              borderBottom: "2px solid grey",
            }}
          >
            Electronics
          </h2>
          <div className="row justify-content-around electronics ">
            {products.map((product, index) => {
              if (product.data.CateogryID == 8) {
                return (
                  <div className=" col-md-3 p-3 " key={index}>
                    <div className="card m-3 p-0 h-100">
                      <Link
                        to={`/electronics/${product.id}`}
                        className=" p-0 m-0"
                      >
                        <img
                          src={product.data.imgs[0]}
                          className="card-img-top p-5 w-100"
                          height={250}
                          alt="..."
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </Link>
                      <div className="card-body ">
                        <Link
                          to={`/electronics/${product.id}`}
                          style={{ color: "black", textDecoration: "none" }}
                        >
                          <h5
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: "2",
                              WebkitBoxOrient: "vertical",
                            }}
                            className="card-title"
                          >
                            {product.data.en.name}
                          </h5>
                        </Link>
                        <h5 className="card-title">{product.data.en.Brand}</h5>
                        <h2 className=" text-black">
                          <sup>EGP</sup> {product.data.Price}
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="row justify-content-around">
            {
              //show previous button only when we have items
              page === 1 ? (
                <button className="col-1 btn btn-danger my-5" disabled>
                  previous
                </button>
              ) : (
                <button
                  className="col-1 btn btn-danger my-5"
                  onClick={() => previousPage({ item: products[0] })}
                >
                  previous
                </button>
              )
            }

            {
              //show next button only when we have items
              products.length < 12 ? (
                <button className="col-1 btn btn-success my-5" disabled>
                  next
                </button>
              ) : (
                <button
                  className="col-1 btn btn-success my-5"
                  onClick={() =>
                    nextPage({ item: products[products.length - 1] })
                  }
                >
                  next
                </button>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Electronics;
