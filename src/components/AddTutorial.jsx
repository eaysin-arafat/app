import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTutorial } from "../slices/tutorials";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };

  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    const { title, description } = tutorial;

    dispatch(createTutorial({ title, description }))
      .unwrap()
      .then((data) => {
        console.log(data);
        setTutorial({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published,
        });
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button onClick={newTutorial}>Add</button>
        </div>
      ) : (
        <div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={tutorial.title || ""}
              onChange={handleInputChange}
              className="form"
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              value={tutorial.description || ""}
              id="description"
              name="description"
              required
              onChange={handleInputChange}
            />
          </div>
          <button onClick={saveTutorial}>Sumbit</button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
