import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


function Mainpage() {
  const [data, setdata] = useState(null);        /**A state to display data and search results */
  const[searchresults,setsearchresults]=useState(null)


  useEffect(() => {
    const fetchingdata = async () => {
      try {
        const link = await axios.get(                   /**Fetching the data using axios */
          "https://reactnd-books-api.udacity.com/books",
          { headers: { Authorization: "whatever-you-want" } }
        );
        setdata(link.data);
        setsearchresults(link.data)
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchingdata();
  }, []);

  const Accordingtoinput = (event) => {                    /**Filtering the data to display search results */
    const enterinput = event.target.value.toLowerCase();
      const findresults = searchresults.books.filter((k) => {
        return k.title.toLowerCase().startsWith(enterinput);
      });
      if(findresults.length===0){
        setdata({books:[{title: "No Results Found",imageLinks:""}]})
      }else{
        setdata({books:findresults});
      } 
  };
  return (
    <div>
      <nav>
        <div className="navbar">        
          <img
            src="https://kalvium.com/wp-content/uploads/2022/07/fav.png"
            alt=""
            className="logo"
          />
          <b className="title">Kalvium Books</b>
          <input
            type="text"
            placeholder="Search Books"
            className="search"
            onChange={Accordingtoinput}
          />
          <NavLink to="/Register"><button className="register">Register</button></NavLink>
        </div>
      </nav>
      <div>
        {data ? (
          <div className="table">
            {data.books.map((eachbook, id) => (
              <div key={id} className="book">
                <img
                  src={eachbook.imageLinks.smallThumbnail}
                  alt="" className="pic" height="130px"
                />
                <p>{eachbook.title}</p>
                <p className="cost">Free</p>
              </div>
            ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
export default Mainpage;
