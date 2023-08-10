import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import AddUser from "./AddUser";
import styles from "../styles/GetUser.module.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const GetUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");


  const notify = () => toast.error("Something Went Wrong!" , {
    autoClose: 2000, 
  });

  const SuccessDeleted = () => toast.success("User Details Deleted Successfully!", {
    autoClose: 2000
  })

  const handleUpdate = (id) => {
   setSelectedUser(id);
  };

  const handleDelete = async (id, SuccessDeleted) => {
    console.log(id);
    try {
      await axios.delete(
        `https://brainy-bull-threads.cyclic.app/users/delete/${id}/`
      );
      SuccessDeleted();
      getData();
    } catch (error) {
      console.log(error);
      notify();
    }
  };

  const getData = (notify) => {
    axios
      .get("https://brainy-bull-threads.cyclic.app/users/")
      .then((res) => {
        //console.log(res)
        setUsers(res.data);
      })
      .catch((err) => {console.log(err)
        notify();
      });
  };

  // let debounceSec = 2000;
  // let debounceTimer;

  // const handleSearch = (value) => {
  //   setSearch(value);

  //   clearTimeout(debounceTimer);

  //   debounceTimer = setTimeout((value) => {
  //     // Our Api call for Search - Query
  //     axios
  //       .get(`https://brainy-bull-threads.cyclic.app/users?q=${value}`)
  //       .then((res) => {
  //         console.log(res);
  //         setUsers(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, debounceSec);
  // };

  const searchClicked = (value, notify) => {
    console.log(value);
    axios
      .get(`https://brainy-bull-threads.cyclic.app/users?q=${value}`)
      .then((res) => {
        console.log(res);
        setUsers(res.data);
        setSearch("");
        
      })
      .catch((err) => {
        console.log(err)
        notify();
      });
  };

  useEffect(() => {
    getData(notify);
  }, [setUsers]);

  return (
    <div className={styles.parent}>
      {!selectedUser ? (
        <div>
          <section className={styles.inputBtnSection}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search with First Name / Last Name"
              value={search}
              onChange={(e) => {setSearch(e.target.value, notify); console.log(search);}}
            />
            <button onClick={() => searchClicked(search)}>Search</button>
          </section>
          <div className={styles.parentBox}>
            {users.length > 0 ? (
              users.map((el) => (
                <div key={el._id} className={styles.singleBox}>
                  <h3>Name: {`${el.Fname} ${el.Lname}`}</h3>
                  <p>Email: {el.email}</p>
                  <p>Mobile: {el.mobile}</p>
                  <p>Date of Birth: {el.dob}</p>
                  <div className={styles.updateDeleteBtns}>
                    <button onClick={() => handleUpdate(el._id)}>Update</button>
                    <button onClick={() => handleDelete(el._id, SuccessDeleted)}>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <h1>No User Available</h1>
            )}{" "}
          </div>
        </div>
      ) : (
        <AddUser userID={selectedUser} />
      )}
      <ToastContainer />
    </div>
  );
};

export default GetUser;
