import axiosInstance from "../../AxiosInterceptor/AxiosInterceptors";
import axios from "../../AxiosInterceptor/AxiosInterceptors";
import { updateRedux } from "../Reducer/CommonReducer";
// import axios from "axios";
 const baseurl = process.env.REACT_APP_API_BASE_URL


// const baseurl = 'https://361f-103-70-197-230.ngrok-free.app'


// export const signUpUser = (body, callback) => (dispatch) => {
//     axios
//       .post(baseurl + '/account_backend/register/', body)
//       .then((response) => {
//         console.log('register sign', response)
//         dispatch(
//           updateRedux({
//             key: 'registraionDetails',
//             result: response.data,
//           }),
//         )
//         callback(response)
//       })
//       .catch((error) => {})
//   }




// export const monthlybaseplanstripepage = (callback) => (dispatch) => {
//     axios
//       .get(baseurl + '/membership_api/base-plan-create-monthly-checkout-page/')
//       .then((response) => {
//         console.log('baseplan checkout', response)
//         dispatch(
//           updateRedux({
//             key: 'monthlybaseplanstripepage',
//             result: response.data,
//           }),
//         )
//         callback(response)
//       })
//       .catch((error) => {
//         callback(error)
//       })
//   }


//  login api
export const loginUser = (body, callback) => (dispatch) => {
    axios
      .post(baseurl+'/usermanagement/login', body)
      .then((response) => {
        console.log(response);
        dispatch(
          updateRedux({
            key: 'loginDetails',
            result: response.data,
          }),
        )
        callback(response)
      })
      .catch((error) => {
        callback(error)
      })
  }

// asking questions api
export const queryQuestion = (body,callback) => (dispatch) => {
    axios
    .post(baseurl +'/ai_integration/query',body)
    .then( (response) => {
        // console.log(response);
        dispatch(
            updateRedux({
                key:'queryquestion',
                result:response.data,
            }),
        )
        callback( response)
    })
    .catch( (error) => {
        callback(error)
    })
}

// api to get all listed items

export const listedChats = (callback) => (dispatch) => {
    axios
      .get(baseurl + '/usermanagement/user-texts')
      .then((response) => {
        // console.log(response);
        dispatch(
          updateRedux({
            key: 'listedchats',
            result: response.data,
          }),
        )
        callback(response)
      })
      .catch((error) => {
        callback(error)
      })
  }







// export const listedChats = (callback) => (dispatch) => {
//   const customHeaderValue = true; // Replace with your desired value for ngrok-skip-browser-warning

//   const config = {
//     headers: {
//       'ngrok-skip-browser-warning': customHeaderValue
//     }
//   };

//   axios
//     .get(baseurl + '/usermanagement/user-texts', config) // Pass the custom header in the config
//     .then((response) => {
//       console.log(response);
//       dispatch(
//         updateRedux({
//           key: 'listedchats',
//           result: response.data,
//         }),
//       );
//       callback(response);
//     })
//     .catch((error) => {
//       callback(error);
//     });
// };


const customHeaderValue = true; // Replace with your desired value for ngrok-skip-browser-warning

const config = {
  headers: {
    'ngrok-skip-browser-warning': customHeaderValue
  }
};
// export const ngrokProcess = (callback) => (dispatch) => {
//   axios
//     .get('http://0a30-34-80-206-145.ngrok.io/process',config)
//     .then((response) => {
//       // console.log(response);
//       dispatch(
//         updateRedux({
//           key: 'ngrokprocess',
//           result: response.data,
//         }),
//       )
//       callback(response)
//     })
//     .catch((error) => {
//       callback(error)
//     })
// }
// Replace with your Flask API URL
const apiURL = 'http://b4be-34-142-228-13.ngrok.io/process';

// Custom headers for handling CORS
const customHeaders = new Headers({
  'Content-Type': 'application/json',
  'Origin': 'http://localhost:3000', // Replace with your frontend's origin
  // Add any other headers you need here
});

export const ngrokProcess = (callback) => (dispatch) => {
  fetch(apiURL, {
    method: 'GET',
    headers: customHeaders,
    mode: 'no-cors',
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Request failed with status code: ' + response.status);
      }
    })
    .then((data) => {
      dispatch(
        updateRedux({
          key: 'ngrokprocess',
          result: data,
        })
      );
      callback(data);
    })
    .catch((error) => {
      callback(error);
    });
};




