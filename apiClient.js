import axios from "axios"; 
const url = "http://localhost:3001/";
const exerciseUrl = "http://localhost:3001/exercise/";
const foodUrl = "http://localhost:3001/food/";
const userUrl = "http://localhost:3001/user/";

export class ApiClient {

    constructor(tokenProvider, logoutHandler){ 
        this.tokenProvider = tokenProvider;
        this.logoutHandler = logoutHandler; 
    }

    authenticatedCall(method, url, data) {
        return axios({
            method, 
            url, 
            headers: {
                authorization: this.tokenProvider(),
            },
            data,
        }).catch((error) => {
          console.error(error)
            if(error.response.status === 403) {
                this.logoutHandler();
                return Promise.reject();
            } else {
                throw error;
            }
        })
    }

    getExercise() {
        return this.authenticatedCall("get", exerciseUrl);
      }
    
      addExercise(exercise, date, duration, calories) {
        return this.authenticatedCall("post", exerciseUrl, { exercise, date, duration, calories });
      }
    
      addUser(username, password, name, age, weight, height, gender, goal) {
        return this.authenticatedCall("post", userUrl, { username, password, name, age, weight, height, gender, goal });
      }

      getUser(id) {
        return this.authenticatedCall("get", `${userUrl}${id}`, { id })
          .then(response => {
            console.log("getUser response:", response.data);
            return response.data;
          })
          .catch(error => {
            console.error("getUser error:", error);
            throw error;
          });
      }
      
    
      getFood() {
        return this.authenticatedCall("get", foodUrl)
      }
    
      addFood(food, date, calories) {
        return this.authenticatedCall("post", foodUrl, { food, date, calories });
      }
    
      removeExercise(id) {
        return this.authenticatedCall("delete", `${exerciseUrl}${id}`); 
      }

      removeFood(id) {
        return this.authenticatedCall("delete", `${foodUrl}${id}`);
      }
    
      updateExercise(id, exercise, date, duration, calories) {
        return this.authenticatedCall("put", `${exerciseUrl}${id}`, { exercise, date, duration, calories });
      }
      updateFood(id, food, date, calories) {
        return this.authenticatedCall("put", `${foodUrl}${id}`, { food, date, calories });
      }
    
      async login(username, password) {
        return await axios({
          method: "post",
          url: `${url}auth`,
          data: { username, password },
        });
      }
    }