import { useState, useEffect } from "react";
import './API.css';

function APIcall () {

    const [dataShow, setDatashow] = useState([]);  
    const [newData, setNewdata] = useState([]);

    function filterData(move) {
        let data = dataShow.filter((item) => {
          if (item.name.toLowerCase().includes(move.toLowerCase())) {
            return true;
          }
          if(item.target.toLowerCase().includes(move.toLowerCase())){
            return true;
          }
        });
        setNewdata(data);
      }

    const getData = async ()=>{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3af7896136msh2df453589a7a778p1933e7jsn52dbdfd440cd',
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        };

        let response = await fetch(`https://exercisedb.p.rapidapi.com/exercises?limit=50`, options)
        let data = await response.json();
        setDatashow(data)
        setNewdata(data)
        // console.log(dataShow);
    }

    useEffect(()=>{
        getData()
    }, [])

    return ( <div>
        <h1>Your Fitness, Our Amenities, Your Effort & Gain, Our Achievement</h1>
        <input className = "input-box"
        type="text"
        name="search"
        placeholder="search for the move you like"
        onChange={(e) => {
            filterData(e.target.value);
          }}
        /> <button>Search</button>
        <div className = "container">
        {
            newData.map((e)=>{
                return ( 
                    <div key={e.index} className="each-container">
                        {/* {console.log("__  ",e)} */}
                    <h3>{e.name}</h3>
                    <img src={e.gifUrl} alt={e.bodyPart} className = "image"/>
                    <p>{e.target}</p>
                    </div>
                )
            })
        }
        </div>
        </div>
    )
}

export default APIcall