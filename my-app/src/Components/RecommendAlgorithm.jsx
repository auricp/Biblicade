import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../Components/RecommendAlgorithm.css";
import images from "./images";
import { Link } from "react-router-dom";

class Histogram {
  constructor() {
    this.data = {};
  }

  add(value) {
    this.data[value] = (this.data[value] || 0) + 1;
  }

  remove(value) {
    if (this.data[value] > 1) {
      this.data[value]--;
    } else {
      delete this.data[value];
    }
  }

  subtract(value) {
    if (this.data[value] > 1) {
      this.data[value]--;
    } else {
      delete this.data[value];
    }
}

  getFrequency(value) {
    return this.data[value] || 0;
  }

  getAllFrequencies() {
    return this.data;
  }

  sortFrequenciesByValue() {
    return Object.entries(this.data).sort((a, b) => b[1] - a[1]);
  }

  getLength() {
    return Object.keys(this.data).length;
  }

  isEmpty() {
    return Object.keys(this.data).length === 0;
  }
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Helper function to get parent index of a given index
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  // Helper function to get left child index of a given index
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  // Helper function to get right child index of a given index
  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  // Method to maintain heap property after adding a new element
  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      if (this.heap[currentIndex][1] > this.heap[parentIndex][1]) {
        // Swap current element with its parent if it's greater
        [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
        currentIndex = parentIndex;
      } else {
        break; // Heap property satisfied
      }
    }
  }

  // Method to add a new element to the heap
  insert(element) {
    this.heap.push(element);
    this.heapifyUp();
  }

  // Method to maintain heap property after removing the maximum element
  heapifyDown() {
    let currentIndex = 0;
    while (true) {
      const leftChildIndex = this.getLeftChildIndex(currentIndex);
      const rightChildIndex = this.getRightChildIndex(currentIndex);
      let maxIndex = currentIndex;
      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex][1] > this.heap[maxIndex][1]) {
        maxIndex = leftChildIndex;
      }
      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex][1] > this.heap[maxIndex][1]) {
        maxIndex = rightChildIndex;
      }
      if (maxIndex !== currentIndex) {
        // Swap current element with its larger child
        [this.heap[currentIndex], this.heap[maxIndex]] = [this.heap[maxIndex], this.heap[currentIndex]];
        currentIndex = maxIndex;
      } else {
        break; // Heap property satisfied
      }
    }
  }

  // Method to remove and return the maximum element from the heap
  extractMax() {
    if (this.heap.length === 0) {
      return null; // Heap is empty
    }
    if (this.heap.length === 1) {
      return this.heap.pop(); // Only one element in the heap
    }
    const maxElement = this.heap[0];
    // Replace the root with the last element
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return maxElement;
  }

  // Method to build a max-heap from an array
  buildHeap(array) {
    this.heap = array;
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  // Method to get the maximum element without removing it
  getMax() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // Method to check if the heap is empty
  isEmpty() {
    return this.heap.length === 0;
  }
}





export default function RecommendAlgorithm({ user, start }) {
  const [gamingPreferences, setGamingPreferences] = useState([]);
  const [gamingHistory, setGamingHistory] = useState([]);
  const [userData, setUserData] = useState([]);
  const [gamesList, setGamesList] = useState([]);
  // const [recommendHeap, setRecommendHeap] = useState(new MaxHeap());
  const [currentStandards, setCurrentStandards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState([]);
  const [alreadySuggested, setAlreadySuggested] = useState([]);
  const [updateChanges, setUpdateChanges] = useState(0);
  const [gameIDCounter, setGameIDCounter] = useState(2);
  const userID = user.userID;
  // const implicitPreferredGenres = new Histogram();
  const recommendHeap = new MaxHeap();
  // var currentGame = gamesList[Math.floor(Math.random()*gamesList.length)];
  var randomNumber = Math.floor(Math.random()*gamesList.length);
  var currentGame = gamesList[randomNumber];
  var currentGameID = randomNumber;

  const getHistory = () => {
    Axios.get(`http://localhost:3001/history/${userID}`).then((response) => {
      setGamingHistory(response.data);
      // console.log("working");
      // console.log(response.data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }
  
  const getPreferences = () => {
    Axios.get(`http://localhost:3001/gamePreferences/${userID}`).then((response) => {
      setGamingPreferences(response.data);
      // console.log("working pref")
      // console.log(response.data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }

  const getUserData = () => {
    Axios.get(`http://localhost:3001/userPreferences/${userID}`).then((response) => {
      setUserData(response.data[0]);
      // console.log("working user data")
      // console.log(response.data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }

    // retrieve all games
    // Function to get all games
    const getGames = () => {
      Axios.get('http://localhost:3001/games').then((response) => {
          setGamesList(response.data);
          // console.log("working");
          // console.log(response.data);
        });
    }

    // first dial
    useEffect(() => {
      getGames();

      // fetch gaming history data
      getHistory();
      
      // fetch gaming preferences data
      getPreferences();

      // fetch user preferences data
      getUserData();       
    }, []);

    // consequent dials
    useEffect(() => {
      getGames();

      // fetch gaming history data
      getHistory();
      
      // fetch gaming preferences data
      getPreferences();

      // fetch user preferences data
      getUserData();    
      
      // setIsLoading(true);
    }, [updateChanges]);

    useEffect(() => {
      userAssessment();
    }, [userData]);

    useEffect(() => {
      // console.log('before');
      userAssessment();
      // console.log('after');
    }, [start]);

    // useEffect(() => {
    //   console.log('before');
    //   userAssessment();
    //   console.log('after');
    // }, [updateChanges]);
    
    const userAssessment = () => {
      const implicitPreferredGenres = new Histogram();
    // take first item
      // calculate user data
      const dateOfBirth = new Date(user.birthday);
      const currentDate = new Date();
      const differenceInMilliseconds = currentDate - dateOfBirth;
      const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25; 
      const ageLimit = Math.floor(differenceInMilliseconds / millisecondsInYear);
      // console.log(ageLimit);
      const userLikedScore = userData.prefScore;
      
      setCurrentStandards([ageLimit, userLikedScore, null, null, null, null, null]);


      // run initial assessment on user preference
      if (gamingHistory.length > 0) {
        for (let i = 0; i < gamingHistory.length; i++) {
          // console.log(array[i]);
          implicitPreferredGenres.add(gamingHistory[i].genre);
        }        
      }

      if (gamingPreferences.length > 0) {
        for (let i = 0; i < gamingPreferences.length; i++) {
          // console.log(array[i]);
          if (gamingPreferences[i].opinion === 'like') {
            implicitPreferredGenres.add(gamingPreferences[i].genre);
            // console.log('like');

          } else if (gamingPreferences[i].opinion === 'dislike') {
            implicitPreferredGenres.subtract(gamingPreferences[i].genre);
            // console.log("dislike");
          } else {
            // console.log("maybe");
          }        
        }        
      }
      // console.log(implicitPreferredGenres.sortFrequenciesByValue());

      if (implicitPreferredGenres.isEmpty()) {
        setIsNew(true);
      } else {
        // create standards
        // index 0 - age restriction
        // index 1 - pref score
        // index 2-6 - top 5 genre matching
        const topFiveGenres = [];
        const sortedTopGenres = implicitPreferredGenres.sortFrequenciesByValue();
        for (let i = 0; i < implicitPreferredGenres.getLength(); i++) {
          if (i > 5) {
            break;
          } else {
            topFiveGenres.push(sortedTopGenres[i][0]);
          }
          
        }

        const standardsRN = [ageLimit, userData.prefScore, ...topFiveGenres];
        setCurrentStandards(standardsRN);
      }
      // console.log("STANDARDS")
      // console.log(currentStandards);
    };

    const sendOpinions = (opinion) => {
      console.log(userID, currentGameID+1, opinion)

      Axios.post(`http://localhost:3001/gamePreferences/${userID}`, { gameFK: currentGameID+1, userFK: userID, opinionFK: opinion }).then(() => {
          console.log('Game added to preferences successfully');
      }).catch(error => {
          console.error('Error adding game to preferences:', error);
      });
    }

    const handleChanges = (opinion) => {

      // setUpdateChanges(updateChanges+1);
      userAssessment();
      const startIndex = (gameIDCounter < 3) ? 0 : (gameIDCounter - 3);
      const endIndex = Math.min(gameIDCounter, gamesList.length);
      setGameIDCounter(gameIDCounter+3);
      gameAssessment(startIndex, endIndex);
      // console.log(recommendHeap.extractMax());
      // console.log(recommendHeap);
      try {
        currentGame = recommendHeap.extractMax()[0];
      } catch {
        setIsLoading(false);
      }
      setIsLoading(true);
      if (currentGame === null) {
        setIsLoading(false);
      }
      // sync with Servers
      sendOpinions(opinion);
    }

    const gameAssessment = (starting, ending) => {
      for (let i = starting; i < ending; i++) {
        const game = gamesList[i];
        let likeliness = 0;
        if (currentStandards[0] > game.ageRestriction) {
          if ((game.ratingScore-15 < currentStandards[1]) && (currentStandards[1] < game.ratingScore+15)) {
            likeliness += (15-Math.abs(currentStandards[1]-game.ratingScore));
          } else {
            likeliness += (Math.ceil(Math.random()*5));
          }
          var multiplier = 10;
          currentStandards.slice(2,6).forEach((elt) => {
            if (elt === game.genre) {
              likeliness += (8+multiplier);
            }
            multiplier -= 2
          });
        }
        // continue from here
        const currentTuple = [game.gameID, likeliness];
        recommendHeap.insert(currentTuple);
        setUpdateChanges(updateChanges+1);
        

      }
    };

    if ((isLoading || !recommendHeap.isEmpty())) {
      //console.log(title);
      return <div id="MainContainer_RecAlg">
          <div className="recommendAlgoHeader">
            <h2>Recommend Algorithm (work in progress by Gavin)</h2>
            <p>These games are suggested based on your gaming preferences and history</p>
          </div>
      <div>
        <div className="gameSpecificItems">

          <img className="gameImage" src={images[currentGame.title]} alt={currentGame.title} width={'250px'}/>
          <Link to={`/GamePage/${currentGame.title}`} className='gameTitleH3'>{currentGame.title}</Link>
          <p>{currentGame.genre}</p>
        </div>
      </div>

      <div className="preferenceButtons">
        <div className="preferenceBot" onClick={() => {handleChanges('like')}}>
          <p>Like</p>
        </div>

        <div className="preferenceBot" onClick={() => {handleChanges('')}}>
          <p>Maybe</p>
        </div>

        <div className="preferenceBot" onClick={() => {handleChanges('dislike')}}>
          <p>Dislike</p>
        </div>
      </div>
  </div>
    }
  
  return (
    <div id="MainContainer_RecAlg">
        <div className="recommendAlgoHeader">
            <h2>Recommend Algorithm (work in progress by Gavin)</h2>
            <p>These games are suggested based on your gaming preferences and history</p>
          </div>
        <div className="preferenceButtons2">
          <div className="preferenceBot2" onClick={handleChanges}>
            <p>Give me the First Game!</p>
          </div>
        </div>
    </div>
  )
}
