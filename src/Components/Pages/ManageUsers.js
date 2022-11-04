import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fdelete, fget, fpost } from "../Shared/apiCalls";
import Error from "./Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import ReactTooltip from "react-tooltip";
import Swal from "sweetalert2";

function ManageUsers() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalItems, setTotalItems] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchUsers();
  }, []);
  const deleteUser = (id) => {
    Swal.fire({
      confirmButtonColor: "#4fbfa8",
      title: "Confirm Deletion",
      text: `Do you delete user #${id}`,
      icon: "question",
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        fdelete({
          url: `customer/deleteCustomerDetails/${id}/`,
        }).then(() => {
          Swal.fire({
            title: "User deleted",
            icon: "success",
            confirmButtonText: "Dismiss",
          });
          fetchUsers();
        });
      }
    });
  };
  const fetchUsers = () => {
    fpost({
      url: `customer/getCustomerDetails`,
      data: {},
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setTotalItems(
            result.info.sort(function (a, b) {
              if (a.id < b.id) return -1;
              if (a.id > b.id) return 1;
              return 0;
            })
          );
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  const RenderList = () => {
    return (
      <>
        {filteredUsers.map((element, index) => {
          if (index === 0) {
            return (
              <div
                className="row list-card pt-3"
                key={0}
                // onClick={() => navigate(`/action`)}
              >
                <div className="col text-center">
                  <p>ID</p>
                </div>
                <div className="col-3 text-center">
                  <p className="">First Name</p>
                </div>
                <div className="col text-center">
                  <p className="">Last Name</p>
                </div>
                <div className="col text-center">
                  <p className="">Email</p>
                </div>
                <div className="col text-center">
                  <p className="">User Type</p>
                </div>
                <div className="col text-center">
                  <p className="">Remove</p>
                </div>
              </div>
            );
          }
          return (
            <div
              className="row list-card1 pt-3"
              key={element.id}
              //   onClick={() => navigate(`/action/${element.id}`)}
            >
              <div className="col text-center">
                <p>
                  <FontAwesomeIcon icon={faHashtag} /> {element.id}
                </p>
              </div>
              <div className="col-3 text-center">
                <p className="name">{element.first_name}</p>
              </div>
              <div className="col text-center">
                <p className="">{element.last_name}</p>
              </div>
              <div className="col text-center">
                <p className="">{element.email}</p>
              </div>
              <div className="col text-center">
                <p className="">{element.user_type.toUpperCase()}</p>
              </div>
              <div
                className="col text-center "
                onClick={() => deleteUser(element.id)}
              >
                <p className="delete">
                  <FontAwesomeIcon icon={faTrashAlt} color="red" />
                </p>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  let filteredUsers = totalItems
    ? totalItems.filter((user) => {
        return (
          user.first_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      })
    : [];
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12">
          <div className="card my-2">
            <div className="card-body text-left">
              <p className="card-title display-6 gray text-center ">
                Manage Users
              </p>
              <hr />
              <div className="row">
                <div className="col-12 col-sm-3 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Search"
                    placeholder="Search first name"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col px-4">
                  {filteredUsers.length === 0 ? (
                    <div className="row list-card pt-3 text-uppercase text-center">
                      <p className="name">No user found</p>
                    </div>
                  ) : (
                    <RenderList />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
