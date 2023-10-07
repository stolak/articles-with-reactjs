import React, { useState, useRef, useEffect} from "react";
import { Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import UserService from "../services/user.service";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import reference  from "../services/auth.service";
const Profile = () => {
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [author, setAuthor] = useState("");
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [preference, setPreference] = useState({});
  const [error, setError] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setPreference(response.data.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

          setError(_content);
      }
    );
    UserService.getUserPreference().then(
      (response) => {
        setPreference(response.data.data);
        setCategory(response.data.data.category);
        setAuthor(response.data.data.author);
        setSource(response.data.data.source);
      }
    );
    UserService.getAuthors().then(
      (response) => {
        setAuthors(response.data.data);
      }
    );
    UserService.getCategories().then(
      (response) => {
        setCategories(response.data.data);
      }
    );
    UserService.getSources().then(
      (response) => {
        setSources(response.data.data);
      }
    );
  }, []);
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  
  const onChangeCategory = (e) => {
    const val = e.target.value;
    setCategory(val);
  };
  const onChangeAuthor = (e) => {
    const val = e.target.value;
    setAuthor(val);
  };
  const onChangeSource = (e) => {
    const val = e.target.value;
    setSource(val);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    UserService.savePreference({category, author, source})
        .then(
          (response) => {
            console.log("responce from reference saving", response.data);
          },
          (error) => {
            console.log("responce from reference saving error log...", error);
   
          }
        )
       
    // reference(category, author, source)
    //   .then(() => {
    //    console.log("jsdhsjh")
    //   })
    //     .catch(() => {
         
    //     });

    
  };
  
  return (
    <div className="container">
      
      <p>
       
      </p>
    
        
        <div className="col-md-12">
      <div className="card ard-container-profile">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.name}</strong> Feed preferences
        </h3>
      </header>

        <Form onSubmit={handleUpdate} >
          <div className="form-group">
            <label htmlFor="email">Category</label>
            <select
           value={category}
           onChange={onChangeCategory}
          >
          <option value=''>All</option>
            {categories.map((option) => (
              <option value={option.category}>{option.category}</option>
            ))}
          </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Author</label>
            <select
           value={author}
           onChange={onChangeAuthor}
          >
          <option value=''>All</option>
            {authors.map((option) => (
              <option value={option.author}>{option.author}</option>
            ))}
          </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Source</label>
            <select
           value={source}
           onChange={onChangeSource}
          >
          <option value=''>All</option>
            {sources.map((option) => (
              <option value={option.source}>{option.source}</option>
            ))}
          </select>
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" >
              
              <span>Login</span>
            </button>
          </div>

          
          <CheckButton style={{ display: "none" }}  />
        </Form>
      </div>
    </div>
    </div>
  );
};

export default Profile;