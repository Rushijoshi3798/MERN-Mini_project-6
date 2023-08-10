import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AddUser.module.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const AddUser = ({ userID }) => {
  const [formData, SetformData] = useState({
    Fname: "",
    Lname: "",
    email: "",
    mobile: "",
    dob: "",
  });

  const navigate = useNavigate();

  const notifyUserUpdate = () => toast.success("User Details Updated Successfully!" , {
    autoClose: 2000, 
  });

  const notifyUserAdded = () => toast.success("New User Details Added to Database!" , {
    autoClose: 2000, 
  });

  const handleSubmit = async (e, userID, notifyUserAdded, notifyUserUpdate) => {
    e.preventDefault();
    console.log("hello world");
    //console.log(formData, userID);
    if (userID) {
      await axios.patch(
        `https://brainy-bull-threads.cyclic.app/users/update/${userID}`,
        { ...formData, mobile: +formData.mobile }
      );
      notifyUserUpdate();
      setTimeout(() => {
        navigate("/");
      }, 2500)
      
    } else {
      await axios.post("https://brainy-bull-threads.cyclic.app/users/add", {
        ...formData,
        mobile: +formData.mobile,
      });
      notifyUserAdded();
    }
  };

  const handleChange = (e) => {
    const field = e.target.name;
    console.log(field);

    if (field === "dob") {
      console.log(e.target.value, typeof e.target.value);
      SetformData({ ...formData, dob: `${e.target.value}` });
      console.log(formData);
    } else if (field === "mobile") {
      SetformData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData);
    } else {
      SetformData({ ...formData, [e.target.name]: e.target.value });
      console.log(formData);
    }
  };

  useEffect(() => {
    if (userID) {
      axios
        .get(`https://brainy-bull-threads.cyclic.app/users/${userID}`)
        .then((res) => {
          const userData = res.data;
          const obj = {
            Fname: userData.Fname,
            Lname: userData.Lname,
            email: userData.email,
            mobile: +userData.mobile,
            dob: userData.dob,
          };
          console.log(obj);
          SetformData(obj);
        });
    }
  }, [userID]);

  return (
    <div>
      <h1>Add New User</h1>
      <form onSubmit={(e) => handleSubmit(e, userID, notifyUserAdded, notifyUserUpdate)}>
        <input
          type="text"
          placeholder="First name"
          value={formData.Fname}
          name="Fname"
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          type="text"
          placeholder="Last name"
          value={formData.Lname}
          name="Lname"
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          name="email"
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          type="number"
          placeholder="Mobile"
          value={formData.mobile}
          name="mobile"
          onChange={(e) => handleChange(e)}
          required
        />
        <input
          type="date"
          max={new Date().toISOString().split('T')[0]}
          placeholder="Date of Birth"
          value={formData.dob}
          name="dob"
          onChange={(e) => handleChange(e)}
          required
        /><br />
        <input className={styles.submitBtn} type="submit" value="Submit" />
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddUser;
