import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllTutorials,
  findTutorialsByTitle,
  retrieveTutorials,
} from "../slices/tutorials";
import { Link } from "react-router-dom";

const TutorialList = () => {
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const tutorials = useSelector((state) => state.tutorials);
  const dispatch = useDispatch();

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const inFetch = useCallback(() => {
    dispatch(retrieveTutorials());
  }, [dispatch]);

  useEffect(() => {
    inFetch();
  }, [inFetch]);

  const refreshData = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    dispatch(deleteAllTutorials())
      .then((response) => {
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findTutorialsByTitle({ title: searchTitle }));
  };

  return (
    <div>
      <div>
        <div>
          <input
            type="text"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <button type="button" onClick={findByTitle}>
            Search
          </button>
        </div>
        <div>
          <h4>Tutorial List</h4>

          <ul>
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  style={{
                    backgroundColor: index === currentIndex ? "blue" : "",
                  }}
                  key={tutorial.id}
                  onClick={() => setActiveTutorial(tutorial, index)}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>
          <button onClick={removeAllTutorials}>Remove All</button>
        </div>

        <div>
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "panding"}
              </div>

              <Link to={`/tutorials/${currentTutorial.id}`}>Edit</Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialList;
