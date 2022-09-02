const mockResponse = {
    data:{
        id:"jnsaj",
        firstName:"Dane",
        lastName:"Jonas",
        email:"Dane.Jonas@gmail.com"
    }
}


// export default {
//     post: jest.fn().mockImplementation((url) => {
//         if(url == "https://demo-api.now.sh"){
//             return Promise.resolve(mockResponse);
//     }
//     }),
//     create: jest.fn().mockReturnValue({
//           interceptors: {
//             request: { use: jest.fn(), eject: jest.fn() },
//             response: { use: jest.fn(), eject: jest.fn() },
//           }
//         }),
// };

export default {
    defaults:{
        headers:{
            common:{
                "Content-Type":"",
                "Authorization":""
            }
        }
  },
  post: jest.fn().mockImplementation((url) => {
        if(url == "https://demo-api.now.sh"){
            return Promise.resolve(mockResponse);
    }
    }),
  create: jest.fn(function () {
      return {
          interceptors:{
              response : {  
                  use: jest.fn(() => Promise.resolve({ data: {} })),
              }
          },

          defaults:{
                headers:{
                    common:{
                        "Content-Type":"",
                        "Authorization":""
                    }
                }
          },
          get: jest.fn(() => Promise.resolve({ data: {} })),
          post: jest.fn().mockImplementation((url) => {
        if(url == "https://demo-api.now.sh"){
            return Promise.resolve(mockResponse);
    }
    }),
          put: jest.fn(() => Promise.resolve({ data: {} })),
          delete: jest.fn(() => Promise.resolve({ data: {} })),
      }
  })
};