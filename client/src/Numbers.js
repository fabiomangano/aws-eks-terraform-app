import { useCallback, useState, useEffect } from "react";
import NumberItem from "./NumberItem";
import axios from "axios";
import "./Numbers.css";

const Numbers = () => {
  const [isFetchingValues, setIsFetchingValues] = useState(false);
  const [values, setValues] = useState([]);
  const [value, setValue] = useState("");

  const getAllNumbers = useCallback(async () => {
    setIsFetchingValues(true);
    const data = await axios.get("/api/values/all");
    setValues(
      data.data.rows.map((row) => ({ number: row.number, id: row.id }))
    );
    setIsFetchingValues(false);
  }, []);

  useEffect(() => {
    getAllNumbers();
  }, [getAllNumbers]);

  const saveNumber = useCallback(
    async (event) => {
      event.preventDefault();
      await axios.post("/api/values", {
        value,
      });
      setValue("");
      getAllNumbers();
    },
    [value, getAllNumbers]
  );

  const deleteNumber = useCallback(
    (id) => async () => {
      await axios.delete(`/api/values/${id}`);
      getAllNumbers();
    },
    [getAllNumbers, value]
  );

  const updateNumber = useCallback(
    (id, value) => async () => {
      await axios.put(`/api/values/${id}`, { value });
      getAllNumbers();
    },
    []
  );

  return (
    <div>
      <div className="header">
        <span className="title">Values:</span>
        <button onClick={getAllNumbers}>Get all numbers</button>
      </div>

      <form className="form" onSubmit={saveNumber}>
        <div className="title">Insert a number:</div>
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <button>Add</button>
      </form>

      <div className="values">
        <span className="title">Your numbers:</span>
        {isFetchingValues && <div>Fetching data...</div>}
        {!isFetchingValues &&
          values.map((value) => (
            <NumberItem
              key={value.id}
              value={value}
              deleteNumber={deleteNumber}
              updateNumber={updateNumber}
            />
          ))}
      </div>
    </div>
  );
};

export default Numbers;
